import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { BookData } from '../../types';

const dataFilePath = path.join(process.cwd(), 'public/books.json');

export async function GET() {
    try {
        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const data: BookData = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading books.json:', error);
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: BookData = await request.json();

        // Validate basic structure (optional but good practice)
        if (!body.nodes || !Array.isArray(body.nodes)) {
            return NextResponse.json({ error: 'Invalid data structure. "nodes" array is required.' }, { status: 400 });
        }

        // Write back to file
        await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2), 'utf8');

        return NextResponse.json({ message: 'Data saved successfully' });
    } catch (error: any) {
        console.error('Error writing books.json:', error);
        return NextResponse.json({ error: `Failed to save data: ${error.message}` }, { status: 500 });
    }
}
