import Create from '../components/create'
import Existing from '../components/existing'
import Home from '../components/home'
import Home2 from '../components/home2'
import Dashboard from '../components/dashboard'
import Register from '../components/register'
import GuestsManager from '../components/guests_manager'
import Login from '../components/login'
import About from '../components/about'
import Gallery from '../components/gallery'
import Contact from '../components/contact'
import Layout from '../components/layout'
export const pages = {
    create: <Create />,
    existing: <Existing />,
    home: <Home />,
    home2: <Home2 />,
    login: <Login />,
    dashboard: <Dashboard />,
    register: <Register />,
    guests_manager: <GuestsManager />,
    about: <About />,
    gallery: <Gallery />,
    contact: <Contact />,
    myaccount: <Layout />
}