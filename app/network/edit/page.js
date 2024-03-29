'use client'
import { useEffect, useState, useRef } from 'react';
import dynamic from "next/dynamic";
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

const HotTable = dynamic(() => import('@handsontable/react').then(mod => { return mod; }), { ssr: false });
registerAllModules();

async function getData() {
    const res = await fetch('http://localhost:3000/network/api')

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Home() {
    const hotRef = useRef(null)
    const data = await getData()
    let onClick;

    useEffect(() => {
        const hot = hotRef.current.hotInstance;

        onClick = async (e) => {
            e.preventDefault();

            await fetch("http://localhost:3000/network/api/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: hot.getData() })
            });
        };
    })

    return (
        <>
            <button onClick={onClick}>
                save
            </button>
            <HotTable
                // set `HotTable`'s props here
                // data={[
                //   ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
                //   ['2019', 10, 11, 12, 13],
                //   ['2020', 20, 11, 14, 13],
                //   ['2021', 30, 15, 12, 13]
                // ]}
                data={data.data}
                rowHeaders={true}
                colHeaders={true}
                height="auto"
                licenseKey="non-commercial-and-evaluation" // for non-commercial use only
            />
        </>
    );
}
