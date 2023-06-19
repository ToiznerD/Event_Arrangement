import { useState,useRef } from "react";
import  roundTable  from '../assets/roundTable.png';
import Image from 'next/image';
import Draggable from 'react-draggable';

export default function roundTableComponent (props) {
    const { text } = props;
    const [isDragging, setIsDragging] = useState(false);
    const refImage = useRef(null)
    const refText = useRef(null)

    const handleMouseDown = (event) => {
      event.preventDefault()
      setIsDragging(true);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleRowClick = (rowId) => {
        if(rowId === selectedRow)
            setSelectedRow(0)
        else
            setSelectedRow(rowId);
        console.log(rowId)
    };

    return (
      <div className="h-full">
          <Draggable onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} bounds="parent">
              <div className="absolute flex items-center justify-center text-base font-bold">
            <div className="relative">
              <Image className="cursor-pointer" src={roundTable} ref={refImage} alt="yaniv" />
                  <div className="absolute mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-lg font-bold">
                    10/15
                  </div>
            </div>
        </div>
            
          </Draggable>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          {text}
        </div>
      </div>
    );
  };