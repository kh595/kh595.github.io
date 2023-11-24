import dynamic from 'next/dynamic';
import data from './books.json';
import { Chrono } from 'react-chrono';

const Timeline = () => {
  console.log(data["data"])
  return (
    <Chrono
      items={data['data'].sort((a,b)=>a.title - b.title)}
      mode="VERTICAL"
    />
  );
};

export default Timeline;
