import Home from '../components/home'
import Dashboard from '../components/dashboard'
import Register from '../components/register'
import GuestsManager from '../components/guests_manager'
import Login from '../components/login'
import About from '../components/about'
import Gallery from '../components/gallery'
import Contact from '../components/contact'
import Layout from '../components/layout'
export const pages = {
    home: <Home />,
    login: <Login />,
    dashboard: <Dashboard />,
    register: <Register />,
    guests_manager: <GuestsManager />,
    about: <About />,
    gallery: <Gallery />,
    contact: <Contact />,
    myaccount: <Layout />
}