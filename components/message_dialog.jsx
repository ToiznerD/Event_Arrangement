import { useState } from "react";
import { styles } from '../utils/style';
import success from '../assets/success.png'
import Delete from '../assets/delete.png'
import Image from 'next/image'
export default function MessageDialog({ onCancel, index, removeTable, type, message }) {
  let title = ''
  const handleCancel = () => {
    // Call the onCancel callback
    onCancel()
  }

  const deleteTable = (index) => {
    removeTable(index)
    handleCancel()
  }

  
  
  return (
  <>
      {type === 'delete' &&
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg w-[500px]">
          <Image src={Delete} alt='delete' width={40}  className='mx-auto'/>
        <h2 className="text-3xl font-semibold mb-4 text-center">Are you sure you want to delete this table?</h2>
        {type === 'delete' &&
          <div className="flex gap-5 items-center justify-center">
            <button onClick={() => deleteTable(index)} className={"px-4 py-2 bg-red-500 text-white font-bold hover:bg-red-700 rounded w-[200px]"}>
              Yes
            </button>
          
            <button onClick={handleCancel} className={styles.button}>
              No
            </button>
          </div>
        }

      </div>
      </div>
      }
      {type === 'confirm' && 
         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <Image src={success} alt='positive' width={40}  className='mx-auto'/>
            <h2 className="text-xl font-semibold mb-4 text-center">{message}</h2>
             <div className="flex gap-5 items-center justify-center">
               <button onClick={handleCancel} className={styles.button}>
                 Close
               </button>
             </div>
   
         </div>
         </div>
      }
      
      </>
  )
}