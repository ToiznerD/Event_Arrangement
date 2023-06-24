import { useState, useContext} from "react";
import { useRouter } from 'next/router'
import Context from "../utils/context"

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { state, dispatch } = useContext(Context)
    const router = useRouter()
    
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logout = (e) => {
    e.preventDefault()
    const currentPath = router.pathname;
    localStorage.removeItem('user')
    if (currentPath === '/myaccount')
      dispatch({ type: "SET_VIEW", param: "myaccount" })
      if (currentPath === '/') {
        window.location.reload();
      } else {
        router.push('/');
      }
  }

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
                  <div className="text-white hover:font-bold cursor-pointer bg-blue-300 rounded-b-lg p-2" onClick={(e)=>logout(e)}>
                            Logout
                  </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;