import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SpriteText from 'three-spritetext';
import { BookData, BookLink } from '../types';
import { processGraphData } from '../lib/graphUtils';

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

  // Use the utility function to process data (includes implicit link generation)
  const processedData = processGraphData(data);

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
