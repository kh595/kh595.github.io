'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  AutoColumnSize,
  Autofill,
  ContextMenu,
  CopyPaste,
  DropdownMenu,
  Filters,
  HiddenRows,
  registerPlugin,
} from 'handsontable/plugins';

import {
  CheckboxCellType,
  NumericCellType,
  registerCellType,
} from 'handsontable/cellTypes';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

registerCellType(CheckboxCellType);
registerCellType(NumericCellType);

registerPlugin(AutoColumnSize);
registerPlugin(Autofill);
registerPlugin(ContextMenu);
registerPlugin(CopyPaste);
registerPlugin(DropdownMenu);
registerPlugin(Filters);
registerPlugin(HiddenRows);

export default function Page() {
  const [data, setData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const hotRef = useRef(null);

  useEffect(() => {
    fetch('/books.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch data', err);
        setLoading(false);
      });
  }, []);

  const handleSave = () => {
    if (!hotRef.current) return;
    const hot = hotRef.current.hotInstance;
    const updatedNodes = hot.getSourceData();

    // We only edit nodes in the table. We need to preserve links.
    // Handsontable might modify the objects in place, but let's be safe.
    // Also, empty rows might be added, filter them if needed. (Optional)
    // For now, trust the data.

    const payload = {
      nodes: updatedNodes,
      links: data.links
    };

    fetch('/api/books/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          alert('Saved successfully!');
        } else {
          res.json().then(data => {
            alert(`Failed to save: ${data.error || res.statusText}`);
          }).catch(() => {
            alert('Failed to save: Unknown error');
          });
        }
      })
      .catch((err) => {
        console.error('Error saving:', err);
        alert(`Error saving data: ${err.message}`);
      });
  };

  const handleAdd = () => {
    if (!hotRef.current) return;
    const hot = hotRef.current.hotInstance;
    // Insert a new row at the bottom
    hot.alter('insert_row_below', hot.countRows(), 1);
    // Alternatively, we could update state, but direct manipulation is often smoother for HotTable
    // setData(prev => ({ ...prev, nodes: [...prev.nodes, { id: '', group: '', year: '' }] }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Book Network Editor</h1>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => window.location.href = '/network/edit'} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px', backgroundColor: '#666', color: 'white', border: 'none' }}>
          Back to Dashboard
        </button>
        <button onClick={handleSave} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}>
          Save Changes
        </button>
        <button onClick={handleAdd} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
          Add Book
        </button>
      </div>
      <HotTable
        ref={hotRef}
        data={data.nodes}
        colHeaders={['Title (ID)', 'Author (Group)', 'Year']}
        columns={[
          { data: 'id' },
          { data: 'group' },
          { data: 'year', type: 'numeric' },
        ]}
        colWidths={[300, 200, 100]}
        dropdownMenu={true}
        contextMenu={true}
        filters={true}
        rowHeaders={true}
        manualRowMove={true}
        autoWrapRow={true}
        autoWrapCol={true}
        licenseKey="non-commercial-and-evaluation"
        height="auto"
      />
    </div>
  );
}
