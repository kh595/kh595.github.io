import dynamic from 'next/dynamic';
import SpriteText from 'three-spritetext';
import data from './books.json';

const ForceGraph3D = dynamic(
    () => import("react-force-graph-3d"),
    { ssr: false }
  )

export default function BookNetwork() {
  let processedData = { "nodes": [], "links": [] }
  processedData['links'] = data['links']
  processedData['nodes'] = data['nodes']
  
  let groupData = Object.groupBy(data["nodes"], ({ group }) => group)  
  for (const [key, value] of Object.entries(groupData)) {
    let book_list = [...new Set(value.map(item => item.id))]
    for (let i=0; i < book_list.length; i++) {
      for (let j=1; j < book_list.length; j++) {
        processedData['links'].push({"source":book_list[i], "target":book_list[j]})   
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
