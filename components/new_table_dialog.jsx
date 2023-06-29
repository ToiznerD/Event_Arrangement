import { useState, useRef } from "react";
import { styles } from '../utils/style';

export default function NewTableDialog({ onCancel, addTable }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('option1');
  const inputRef = useRef()

  // Function to handle radio option change
  const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

  const handleAddTable = () => {
      // Call the addTable callback and pass the inputValue and selectedOption
      let subject = inputRef.current.value

      // Map selected option to "10" or "15" based on the value
      const tableSize = selectedOption === 'option1' ? 10 : 15;

      addTable(tableSize, subject);
      onCancel()
     };

     const handleSubmit = (event) => {
        event.preventDefault();
        // Check if input value is empty
        if (!inputValue) {
          return;
        } 
        handleAddTable();
      };

  const handleCancel = () => {
    // Call the onCancel callback
    onCancel()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 text-center">Table Details</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.subTitle}>Table category:</div>
          <input
            className={styles.textInput}
            required
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <div className={styles.subTitle}>Choose maximum table seats</div>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                value="option1"
                checked={selectedOption === 'option1'}
                onChange={handleOptionChange}
              />
              10
            </label>

            <label>
              <input
                type="radio"
                value="option2"
                checked={selectedOption === 'option2'}
                onChange={handleOptionChange}
              />
              15
            </label>
          </div>

          <div className="flex w-[420px] gap-5 mt-7">
            <button type="submit" className={styles.button}>
              Add table
            </button>
            <button onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white font-bold hover:bg-red-700 rounded w-1/2">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .radio-options {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}