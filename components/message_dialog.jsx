import { useState } from "react";
import { styles } from '../utils/style';

export default function MessageDialog({ onCancel, index, removeTable, type}) {
    let title = ''
  const handleCancel = () => {
    // Call the onCancel callback
    onCancel()
  }

  const deleteTable = (index) => {
    removeTable(index)
    handleCancel()
  }

  type === 'delete' ? title = 'Are you sure you want to delete this table?' : title = 'none'
  
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-3xl font-semibold mb-4 text-center">{title}</h2>
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
  )
}