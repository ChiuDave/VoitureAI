import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from './composants/Accueil/Accueil';
import Dashboard from './composants/DashBoard/Dashboard';
import Details from './composants/Details/Details';
import ChatBot from "./composants/Chat/ChatBot";
import About from "./composants/About/About";
import Contact from "./composants/Contact/Contact";

function App() {

  return (
    <BrowserRouter basename="/VoitureAI">
        <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/details/:VIN" element={<Details />}/>
            <Route path="/chatbot" element={<ChatBot/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
