import { useState } from "react";
import { styles } from '../utils/style';

export default function InputDialog({ onConfirm, onCancel }) {
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
        <h2 className="text-xl font-semibold mb-4">Enter Guest Details</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onInput={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount:</label>
          <input
            type="number"
            value={amount}
            onInput={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category:</label>
          <input
            type="text"
            value={category}
            onInput={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={styles.button}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}