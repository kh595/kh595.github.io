import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SpriteText from 'three-spritetext';

const ForceGraph3D = dynamic(
  () => import("react-force-graph-3d"),
  { ssr: false }
)

export default function BookNetwork() {
  const [data, setData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    fetch('/books.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to load books data", err));
  }, []);

  if (!data.nodes.length) return <div>Loading...</div>;

  let processedData = { "nodes": [], "links": [] }
  processedData['links'] = [...data['links']] // Copy to avoid mutation issues if any
  processedData['nodes'] = [...data['nodes']]

  // Logic to add implicitly linked nodes based on group (User's existing logic)
  let groupData = Object.groupBy(data["nodes"], ({ group }) => group)
  for (const [key, value] of Object.entries(groupData)) {
    let book_list = [...new Set(value.map(item => item.id))]
    for (let i = 0; i < book_list.length; i++) {
      for (let j = 1; j < book_list.length; j++) {
        processedData['links'].push({ "source": book_list[i], "target": book_list[j] })
      }
    }
  }

  return (
    <ForceGraph3D
      graphData={processedData}
      nodeAutoColorBy="group"
      nodeThreeObject={node => {
        const sprite = new SpriteText(node.id);
        sprite.color = node.color;
        sprite.textHeight = 8;
        return sprite;
      }}
    />
  )
}
