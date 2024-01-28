'use client'
'use client'
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

function ExampleComponent(data) {
    const hotRef = useRef(null);

    useEffect(() => {
        const hot = hotRef.current.hotInstance;
        let saveClickCallback

        saveClickCallback = () => {
            // save all cell's data
            fetch('http://localhost:3000/newtork/api/', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: hot.getData() })
            })
                .then(response => {
                    setOutput('Data saved');
                    console.log('The POST request is only used here for the demo purposes');
                });
        };
    });

    return (
        <>
            <button onClick={onClick}>
                save
            </button>
            <HotTable
                data={data.data}
                rowHeaders={true}
                colHeaders={true}
                height="auto"
                licenseKey="non-commercial-and-evaluation" // for non-commercial use only
            />
        </>
    );
}

export default async function Home() {
    const data = await getData()

    return (
        <>
            <ExampleComponent data={data} />
        </>
    );
}
