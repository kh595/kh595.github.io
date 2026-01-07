import bookData from './books.json';
const fs = require('fs');

export async function GET(request) {
    let data = bookData.nodes
    return Response.json({ data });
}

export async function POST(request) {
    fs.writeFileSync('./app/network/api/example.json', JSON.stringify({'data':'save success'}));
    return Response.json({ "data": "post succeded" });
}
