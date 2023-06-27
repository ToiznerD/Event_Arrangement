import { useState } from "react";
import { styles } from '../utils/style';

export default function TableDialog({ onCancel, subject, index, guestsInTable, removeGuest }) {
  const [selectedRow, setSelectedRow] = useState(null)
  const [guests, updateGuests] = useState(guestsInTable)

  const handleRowClick = (rowId) => {
    if(rowId === selectedRow)
        setSelectedRow(null)
    else
        setSelectedRow(rowId);
  }

  const deleteGuest = (index, selectedRow) => {
    removeGuest(index, selectedRow)
    let updatedGuests = {...guests}
    delete updatedGuests[selectedRow]
    updateGuests(updatedGuests)
  }

  const removeAll = () => {

  }

  const handleCancel = () => {
    // Call the onCancel callback
    onCancel()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 text-center">Table {index} - {subject}</h2>

        <table className="w-full border-gray-500 border-4 mb-4">
        <thead>
            <tr>
              <th className={styles.td}>Name</th>
              <th className={styles.td}>Amount</th>
            </tr>
        </thead>
        <tbody>
        {guests !== null && Object.entries(guests).map(([key, guest]) => {
          return(
              <tr key={key} onClick={() => handleRowClick(key)} className={selectedRow === key ? styles.selectedRow : styles.normalRow} >
                <td className={styles.td}>{guest.guestName}</td>
                <td className={styles.td}>{guest.guestAmount}</td>
              </tr>
              )
          })}
        </tbody>
        </table>
        <button onClick={() => deleteGuest(index, selectedRow)} className={"px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded"}>
          Remove
        </button>
        <button onClick={() => removeAll()} className={"px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded ml-5"}>
          Remove all
        </button>
        <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded ml-5">
          Close
        </button>

      </div>
    </div>
  )
}