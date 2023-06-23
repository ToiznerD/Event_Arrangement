import { useState } from "react";
import { styles } from '../utils/style';

export default function TableDialog({ onConfirm, onCancel, subject, index, guestsInTable }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("1");
  const [category, setCategory] = useState("");

  const handleConfirm = () => {
    // Validate input values here if needed

    // Call the onConfirm callback with the entered values
    onConfirm({ name, amount, category });

    // Reset input values
    setName("");
    setAmount("");
    setCategory("");
  };

  const handleCancel = () => {
    // Call the onCancel callback
    onCancel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Table {index} - {subject}</h2>

        <table className="w-full border-gray-500 border-4">
        <thead>
            <tr>
              <th className={styles.td}>Name</th>
              <th className={styles.td}>Amount</th>
            </tr>
        </thead>
        <tbody>
          {console.log(guestsInTable)}
        {guestsInTable !== null && Object.entries(guestsInTable).map(([key, guest]) => {
          return(
              <tr key={key}>
                <td className={styles.td}>{guest.guestName}</td>
                <td className={styles.td}>{guest.guestAmount}</td>
              </tr>
              )
          })}
        </tbody>
        </table>

        <button
            onClick={handleConfirm}
            className={styles.button}
          >
            Confirm
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-9"
          >
            Cancel
          </button>
        </div>
      </div>
  );
}