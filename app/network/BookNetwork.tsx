import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SpriteText from 'three-spritetext';
import { BookData, BookLink } from '../types';

const ForceGraph3D = dynamic(
  () => import("react-force-graph-3d"),
  { ssr: false }
)

export default function BookNetwork() {
  const [data, setData] = useState<BookData>({ nodes: [], links: [] });

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
  // @ts-ignore - Object.groupBy is essentially valid in newer Node/Browsers but TS might complain if target is old
  let groupData = Object.groupBy(data["nodes"], ({ group }) => group)
  for (const [key, value] of Object.entries(groupData as Record<string, any[]>)) {
    let book_list = Array.from(new Set(value.map(item => item.id))); // Fix iteration issue
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
      nodeThreeObject={(node: any) => {
        const sprite = new SpriteText(String(node.id)); // Fix type mismatch
        sprite.color = node.color;
        sprite.textHeight = 8;
        return sprite;
      }}
    />
  )
}
