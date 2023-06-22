import  roundTable  from '../assets/roundTable.png';
import Image from 'next/image';
import Draggable from 'react-draggable';

export default function roundTableComponent (props) {
    const { current_seats, guests_in_table, max_seats, subject, x, y, addGuest} = props

    const handleMouseDown = (event) => {
      event.preventDefault()
      addGuest()
    };

    return (
      <div className="h-full">
        <Draggable onMouseDown={handleMouseDown} bounds="parent">
            <div className="cursor-pointer absolute flex flex-col items-center justify-center font-bold my-1" style={{ left: `${x}px`, top: `${y}px` }}>
                <Image src={roundTable} alt="pic" style={{ width: '100px', height: '100px' }}/>
                <div className="absolute mb-4">
                  {current_seats}/{max_seats}
                </div>
                <div className="absoulute mt-[-10px]">
                {subject}
                </div>
            </div>
          </Draggable>
      </div>
    )
  }