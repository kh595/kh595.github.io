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

export default function LinksPage() {
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
        const updatedLinks = hot.getSourceData();

        // Preserve nodes, update links
        const payload = {
            nodes: data.nodes,
            links: updatedLinks
        };

        fetch('/api/books/', { // Note trailing slash
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
        hot.alter('insert_row_below', hot.countRows(), 1);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Edit Links</h1>
            <div style={{ marginBottom: '10px' }}>
                <button onClick={() => window.location.href = '/network/edit'} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px', backgroundColor: '#666', color: 'white', border: 'none' }}>
                    Back to Dashboard
                </button>
                <button onClick={handleSave} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}>
                    Save Changes
                </button>
                <button onClick={handleAdd} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
                    Add Link
                </button>
            </div>
            <HotTable
                ref={hotRef}
                data={data.links}
                colHeaders={['Source (ID)', 'Target (ID)', 'Description']}
                columns={[
                    { data: 'source' },
                    { data: 'target' },
                    { data: 'description' },
                ]}
                colWidths={[200, 200, 300]}
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
