import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Draggable } from 'react-draggable';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridLayout from "react-grid-layout";



const Grid = () => {
  const gridSize = 25;
  const gridLayoutProps = {
    className: 'layout',
    cols: { lg: gridSize, md: gridSize, sm: gridSize, xs: gridSize, xxs: gridSize },
    rowHeight: 30,
    width: 1200,
  };

  const generateGridItems = () => {
    const elements = [
      { x: 2, y: 2, w: 1, h: 1, key: '1' },
      { x: 4, y: 4, w: 1, h: 1, key: '2' },
      { x: 6, y: 6, w: 1, h: 1, key: '3' },
    ];

    return elements.map((element) => (
      <Draggable key={element.key}>
        <div className="grid-item" data-grid={{element}} style={{ background: 'lightblue' }}>
          {element.key}
        </div>
      </Draggable>
    ));
  };

  return (
    <GridLayout className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: gridSize, md: gridSize, sm: gridSize, xs: gridSize, xxs: gridSize }}>
      {generateGridItems()}
    </GridLayout>
  );
};

export default Grid;
