import { useRef, useState, useContext, useEffect } from "react";
import Context from "../utils/context";
import Layout from "./layout";
import { styles } from '../utils/style';
import editImg from '../assets/edit.png';
import removeImg from '../assets/remove.png';
import confirm from '../assets/confirm.png';
import InputDialog from "./input_dialog";
import Image from 'next/image';

export default function GuestsManager() {
  const { state, dispatch } = useContext(Context);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const title = "Guests Manager";
  const editGuest = useRef()
  const initGuests = {
    guests: [
      { name: 'shmiloviz', amount: 7, category: "bride's family" },
      { name: "haimovich", amount: 6, category: "grooms family" },
      { name: "ori sason", amount: 2, category: "grooms friends" },
      { name: "shiry shimshon", amount: 3, category: "grooms friends" },
      { name: "Leonardo messi", amount: 2, category: "bride's ex's" },
      { name: "Kylian Mbape", amount: 2, category: "bride's ex's" },
      { name: "Omer Atzili", amount: 2, category: "grooms coworkers" },
      { name: "Dolev Haziza", amount: 2, category: "grooms coworkers" },
      { name: "Abdulai Seck", amount: 2, category: "grooms coworkers" }
    ],
    amount: 28
  };

  const [guests, setGuests] = useState(initGuests);

  const [editingGuestIndex, setEditingGuestIndex] = useState(null);

  const startEditingGuest = (index) => {
    setEditingGuestIndex(index);
  };

  const stopEditingGuest = () => {
    setEditingGuestIndex(null);
  };


  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDialog = (data) => {
    // Validate the entered data if needed
  
    const newGuest = {
      name: data.name,
      amount: parseInt(data.amount),
      category: data.category,
    };
  
    const updatedGuests = {
      ...guests,
      guests: [...guests.guests, newGuest],
      amount: guests.amount + parseInt(data.amount),
    };
  
    setGuests(updatedGuests);
  
    // Close the dialog
    setIsDialogOpen(false);
  };

  const handleCancelDialog = () => {
    // Close the dialog
    setIsDialogOpen(false);
  };


  const updateGuest = (index) => {
    const amtToRemove = guests.guests[index].amount - editGuest.current.value
    guests.guests[index].amount = editGuest.current.value
    const updatedGuests = { ...guests };
    updatedGuests.amount = updatedGuests.amount - amtToRemove

    setGuests(updatedGuests);
    stopEditingGuest();
  }


  const deleteGuest = (index) => {
    const amt = guests['guests'][index].amount
    const updatedGuests = { ...guests };
    const updatedGuestList = updatedGuests.guests.filter((_, i) => i !== index);
    updatedGuests.amount -= amt
    updatedGuests.guests = updatedGuestList;

    setGuests(updatedGuests);
  };

  return (
    <Layout title={title}>
      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 w-[600px]">
        <table>
          <thead>
            <tr className={styles.label}>
              <td className="px-4">Guest Name</td>
              <td className="px-4">Amount</td>
              <td className="px-4">Category</td>
            </tr>
          </thead>
          <tbody>
          {guests.guests.map((guest, index) => (
            <tr className={styles.simplelabel} key={guest.name}>
              <td className="px-4">{guest.name}</td>
              <td className="px-4 my-1 flex items-center">
                {editingGuestIndex === index ? (
                  <>
                    <input type="text" defaultValue={guest.amount} className="w-[45px] h-[30px]" ref={editGuest} autoFocus />
                    <Image alt="" title="Edit amount of guests" className="ml-2 cursor-pointer" src={confirm} onClick={() => updateGuest(index)} width={15} height={15} />
                  </>
                ) : (
                  <>
                    {guest.amount}
                    <Image alt="" title="Edit amount of guests" className="ml-2 cursor-pointer" src={editImg} onClick={() => startEditingGuest(index)} width={15} height={15} />
                  </>
                )}
              </td>
              <td className="px-4">{guest.category}</td>
              <td className="px-4">
                <Image alt="" title="Delete guest" src={removeImg} className="cursor-pointer" onClick={() => deleteGuest(index)} width={15} height={15} />
              </td>
            </tr>
          ))}
            </tbody>
        </table>
      </div>
      <div className="flex flex-col justify-center">
        <div className={styles.subTitle + " mt-5"}>Total Amount: {guests.amount}</div>
        <button onClick={handleOpenDialog} className={"bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" + " w-[200px] mx-auto text-center"}>Add Guest</button>
      </div>
      {isDialogOpen && <InputDialog onConfirm={handleConfirmDialog} onCancel={handleCancelDialog} />}
      
    </Layout>
  );
}
