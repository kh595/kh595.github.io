'use client'
import dynamic from "next/dynamic";
import {registerAllModules}  from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import data from '../books.json';

const HotTable = dynamic( () => import('@handsontable/react').then(mod=>{ return mod; }), { ssr: false } ); 

registerAllModules();

const ExampleComponent = () => {
  return (
      <HotTable
        // set `HotTable`'s props here
        // data={[
        //   ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
        //   ['2019', 10, 11, 12, 13],
        //   ['2020', 20, 11, 14, 13],
        //   ['2021', 30, 15, 12, 13]
        // ]}
        data = {data.nodes}
        rowHeaders={true}
        colHeaders={true}
        height="auto"
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
      />
  );
};

export default function Home() {
    return <ExampleComponent/>
}
