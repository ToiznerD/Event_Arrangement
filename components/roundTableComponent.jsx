import { useState,useRef } from "react";
import roundTable from '../assets/roundTable.png';
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
                {refImage && refImage.current && <p className={"absolute left-[" + refImage.current.offsetWidth + "px] top-[100px]"}>raz</p>}
                    <Image className="cursor-pointer" src={roundTable} ref={refImage}/>
                    {refImage && refImage.current &&
                    <div className={"absolute block text-center left-0 top-0 w-[" + refImage.current.offsetWidth + "px] h-[" + refImage.current.    offsetHeight + "px]"}>center
                    </div>}
                    
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