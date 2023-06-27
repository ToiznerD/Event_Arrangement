import { useRef, useState, useContext, useEffect } from "react";
import Context from "../utils/context";
import Layout from "./layout";
import { styles } from '../utils/style';
import editImg from '../assets/edit.png';
import removeImg from '../assets/remove.png';
import confirm from '../assets/confirm.png';
import InputDialog from "./input_dialog";
import Image from 'next/image';

export default function GuestsManager({data}) {
  const { state, dispatch } = useContext(Context);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const title = "Guests Manager";
  const editGuest = useRef()
  const [guests, setGuests] = useState({guests: [], amount: 0});
  const [editingGuestIndex, setEditingGuestIndex] = useState(null);


  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('user'))
    async function fetchData() {
      const response = await fetch('/api/guests', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: user.userId })
      })

      if (response.ok) {
        let res = await response.json();

        setGuests(res)
        
      }
    }
    fetchData()
}, [])


  const startEditingGuest = (index) => setEditingGuestIndex(index);

  const stopEditingGuest = () =>  setEditingGuestIndex(null);


  const handleOpenDialog = () => setIsDialogOpen(true);

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

  const handleCancelDialog = () =>  setIsDialogOpen(false);

  const updateGuest = (index) => {
    const amtToRemove = guests.guests[index].amount - editGuest.current.value
    guests.guests[index].amount = parseInt(editGuest.current.value)
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

  const saveChanges = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const response = await fetch('/api/update_guests', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: user.userId, guests: guests})
    })

    if (response.ok) {
      let res = await response.json();
      console.log(res)
      dispatch({type: "SET_ERROR", param: "Changes have been saved successfully"})
    }
  }
  

  return (
    <Layout title={title}>
      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 max-h-[500px] scrollbar-track-gray-100">
        <table>
          <thead>
            <tr className="text-gray-600 mt-2 md:text-2xl font-bold">
              <td className="px-4">Guest Name</td>
              <td className="px-4">Amount</td>
              <td className="px-4">Category</td>
            </tr>
          </thead>
          <tbody>
            { guests !== null && guests.guests.map((guest, index) => {
              console.log(guest);
              if (guest === null)
                return null
              return (
                <tr className={"text-gray-600 my-4 md:text-2xl"} key={index}>
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
                  <td className="px-4 whitespace-normal max-w-30 break-all">{guest.category}</td>
                  <td className="">
                    <Image alt="" title="Delete guest" src={removeImg} className="cursor-pointer md:w-4 sm:min-w-6" onClick={() => deleteGuest(index)} />
                  </td>
                </tr>
              )
            })}
            </tbody>
        </table>
      </div>
      <div className="flex flex-col justify-center">
        <div className={styles.subTitle + " mt-5 mx-auto"}>Total Amount: {guests.amount}</div>
        <button onClick={handleOpenDialog} className={styles.button + " mx-auto"}>Add Guest</button>
        <button onClick={saveChanges} className={"bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 mt-2 rounded" + " w-[200px] mx-auto text-center"}>Save Changes</button>

      </div>
      {isDialogOpen && <InputDialog onConfirm={handleConfirmDialog} onCancel={handleCancelDialog} />}
      
      </Layout>
  );

  
}