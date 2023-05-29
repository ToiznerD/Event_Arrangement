import { useState, useContext} from "react";
import Link from 'next/link'
import { styles } from '../utils/style'
import { useRouter } from 'next/router'
import Context from "../utils/context"

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { state, dispatch } = useContext(Context)
    const router = useRouter()
    
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between px-4  text-white focus:outline-none"
        onClick={toggleDropdown}
      >
        <span className={`ml-2 ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>
      {isOpen && (
        <div className="absolute text-white rounded-md shadow-lg">
                  {/* Dropdown menu items here */}
                  <div className="text-white bg-gray-800 rounded-b-lg p-2" onClick={async (e) => {
                        e.preventDefault();
                        const response = await fetch('/api/logout', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify()
                        })
                      if (response.ok) {
                          dispatch({type: "SET_VIEW", param: "myaccount"})
                          router.push('/')
                      }
                        }}>
                            Logout
                        </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;