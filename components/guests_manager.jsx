import { useRef, useState, useContext, useEffect } from "react";
import Context from "../utils/context";
import Layout from "./layout";
import { styles } from '../utils/style';
import editImg from '../assets/edit.png';
import removeImg from '../assets/remove.png';
import confirm from '../assets/confirm.png';
import InputDialog from "./input_dialog";
import Image from 'next/image';
import MessageDialog from "./message_dialog";

export default function GuestsManager({data}) {
  const { state, dispatch } = useContext(Context);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const title = "Guests Manager";
  const editGuest = useRef()
  const [guests, setGuests] = useState({ guests: {}, amount: 0});
  const [editingGuestIndex, setEditingGuestIndex] = useState(null);
  const [key, setKey] = useState(0)
  const [tables, setTables] = useState({tables: {}, amount: 0})

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('user'))
    async function fetchData() {
      let response = await fetch('/api/guests', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: user.userId })
      })

      if (response.ok) {
        let res = await response.json();

        setGuests(res)
        setKey(res.guests !== null ? res.guests.key+1 : 0)
      }

      //Get user's tables info
      response = await fetch('/api/tables', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: user.userId })
      })

      if (response.ok) {
        let res = await response.json();
        setTables(res)
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
      table: 0
    };
  
    const updatedGuests = {
      ...guests,
      guests: { ...guests.guests, [key]: newGuest, key: key },
      amount: guests.amount + parseInt(data.amount),
    };
    setGuests(updatedGuests);
    setKey(key+1)
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
    const amt = guests.guests[index].amount
    let tableIndex = guests.guests[index].table
    const updatedGuests = { ...guests };
    delete updatedGuests.guests[index]
    updatedGuests.amount -= amt
    setGuests(updatedGuests);
    if (tableIndex !== 0) {
      const updatedTables = { ...tables }
      updatedTables.tables[tableIndex].guests = updatedTables.tables[tableIndex].guests.filter(element => element !== parseInt(index))
      updatedTables.tables[tableIndex].current_seats -= amt
      setTables(updatedTables)
    }
  };

  const saveChanges = async () => {
    const user = JSON.parse(localStorage.getItem('user'))

    let response = await fetch('/api/update_guests', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: user.userId, guests: guests })
    })

    if (response.ok) {
      if (tables) {
        response = await fetch('/api/update_table', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId: user.userId, tables: tables })
        })

        if (response.ok) {
          let res = await response.json();
        }
        else {
          alert("ERROR WITH TABLES")
        }
      }
    }
    setIsConfirmDialogOpen(true)
  }
  
  console.log('guests:')
    console.log(guests)
  return (
    <Layout title={title} back='dashboard'>
      <div className="overflow-y-auto mx-auto scrollbar-thin scrollbar-thumb-gray-300 max-h-[500px] scrollbar-track-gray-100">
        <table className="mx-auto">
          <thead>
            <tr className="text-gray-600 mt-2 md:text-2xl font-bold">
              <td className="px-4">Guest Name</td>
              <td className="px-4">Amount</td>
              <td className="px-4">Category</td>
            </tr>
          </thead>
          <tbody>
            {guests.guests !== undefined && Object.entries(guests.guests).map((entry) => {
              let guest = entry[1]
              let index = entry[0]
              console.log(guest)
              // if(index === '0') return
              if (index === 'key') return
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
        <button onClick={saveChanges} className={styles.button + " mx-auto my-2"}>Save Changes</button>

      </div>
      {isDialogOpen && <InputDialog onConfirm={handleConfirmDialog} onCancel={handleCancelDialog} />}
      {isConfirmDialogOpen && <MessageDialog type="confirm" message="The guest list has been updated successfully!" onCancel={() => setIsConfirmDialogOpen(false)} />}
      
      </Layout>
  );

  
}