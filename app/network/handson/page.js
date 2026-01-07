'use client';

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
const { HotTable } = require('@handsontable/react');

import 'handsontable/dist/handsontable.full.css';
import data from '../books.json';

registerCellType(CheckboxCellType);
registerCellType(NumericCellType);

registerPlugin(AutoColumnSize);
registerPlugin(Autofill);
registerPlugin(ContextMenu);
registerPlugin(CopyPaste);
registerPlugin(DropdownMenu);
registerPlugin(Filters);
registerPlugin(HiddenRows);

function Grid({ data }) {
  const columns = [
    { data: 1 },
    { data: 2 },
    { data: 3 },
    { data: 5 },
    { data: 6, type: 'checkbox', className: 'htCenter' },
    { data: 7, type: 'numeric' },
    { data: 8, readOnly: true, className: 'htMiddle' },
    { data: 9, readOnly: true, className: 'htCenter' },
  ];

  return (
    <HotTable
      data={data}
      columns={columns}
      colWidths={[140, 126, 192, 100, 100, 90, 90, 110, 97]}
      colHeaders={[
        'Company name',
        'Country',
        'Name',
        'Sell date',
        'Order ID',
        'In stock',
        'Qty',
        'Progress',
        'Rating',
      ]}
      dropdownMenu={true}
      contextMenu={true}
      filters={true}
      rowHeaders={true}
      manualRowMove={true}
      navigableHeaders={true}
      autoWrapRow={true}
      autoWrapCol={true}
      licenseKey="non-commercial-and-evaluation"
    />
  );
}

export default function Page() {
  return <Grid data={data} />;
}
