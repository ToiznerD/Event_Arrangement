import { useState } from "react";
import { styles } from '../utils/style';
import MessageDialog from "./message_dialog";

export default function TableDialog({ onCancel, subject, index, guestsInTable, removeGuest, removeTable }) {
  const [selectedRow, setSelectedRow] = useState(null)
  const [guests, updateGuests] = useState(guestsInTable())
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
  
  const handleOpenDialog = () => setIsDialogOpen(true)
  
  const handleCancelDialog = () => setIsDialogOpen(false)

  const handleCancel = () => {
    // Call the onCancel callback
    onCancel()
  }
  console.log(guests)


  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10 ">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 text-center">{subject}</h2>
        <div className="overflow-y-auto max-h-64 mb-4">
          <table className="w-full border-gray-500 border-4 text-center">
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
        </div>

        <div className="flex w-[420px] gap-5">
          <button onClick={() => deleteGuest(index, selectedRow)} className={styles.button}>
            {/* {"px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded w-1/2"} */}
            Remove
          </button>

          <button onClick={() => handleOpenDialog()} className={"px-4 py-2 bg-red-500 text-white font-bold hover:bg-red-700 rounded w-1/2"}>
            Delete Table
          </button>
          
          <button onClick={handleCancel} className={styles.button}>
            Close
          </button>
        </div>

      </div>
    </div>
    {isDialogOpen && <MessageDialog removeTable={removeTable} onCancel={handleCancelDialog} index={index} type="delete"/>}
    </>
  )
}