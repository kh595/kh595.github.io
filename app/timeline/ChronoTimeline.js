import React, { useState, useEffect } from 'react';
import { Chrono } from 'react-chrono';

const Timeline = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/books.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.nodes) {
          const timelineItems = data.nodes
            .filter(node => node.year) // Only items with year
            .map(node => ({
              title: String(node.year),
              cardTitle: node.id,
              cardSubtitle: node.group,
            }))
            .sort((a, b) => parseInt(a.title) - parseInt(b.title));
          setItems(timelineItems);
        }
      })
      .catch(err => console.error("Failed to load books for timeline", err));
  }, []);

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      {items.length > 0 ? (
        <Chrono
          items={items}
          mode="VERTICAL"
          disableNavOnKey
          theme={{
            primary: "black",
            secondary: "white",
            cardBgColor: "white",
            cardForeColor: "black",
            titleColor: "black",
          }}
        />
      ) : (
        <div>Loading Timeline...</div>
      )}
    </div>
  );
};

export default Timeline;
