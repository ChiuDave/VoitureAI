import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Filters from "./Filters/Filters";
import CarCard from "./CarCard/CarCard";
import ChatBot from "../Chat/ChatBot"

const Dashboard = () => {
  const [filteredCars, setFilteredCars] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [filters, setFilters] = useState({
    vin: "",
    name: "",
    make: "",
    year: "",
    miles: "",
    exteriorColor: "",
    interiorColor: "",
    fuelType: "",
    minPrice: "",
    maxPrice: "",
  });

  const [data, setData] = useState([]);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_ROUTE}/api/database`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setFilteredCars(result);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data;

    if (filters.vin) filtered = filtered.filter((car) => car.VIN === filters.vin);
    if (filters.name && filters.name !== "All Models") 
      filtered = filtered.filter((car) => car.Model.toLowerCase().includes(filters.name.toLowerCase()));
    if (filters.make && filters.make !== "All Brands") 
      filtered = filtered.filter((car) => car.Make.toLowerCase().includes(filters.make.toLowerCase()));
    if (filters.year) filtered = filtered.filter((car) => car.Year === parseInt(filters.year));
    if (filters.miles) filtered = filtered.sort((a, b) => Math.abs(a.Miles - filters.miles) - Math.abs(b.Miles - filters.miles));

    
    if (filters.exteriorColor) 
      filtered = filtered.filter((car) => (car.Ext_Color_Generic || "").toLowerCase().includes(filters.exteriorColor.toLowerCase()));

    if (filters.interiorColor) 
      filtered = filtered.filter((car) => (car.Int_Color_Generic || "").toLowerCase().includes(filters.interiorColor.toLowerCase()));

    if (filters.fuelType) 
      filtered = filtered.filter((car) => car.Fuel_Type.toLowerCase().includes(filters.fuelType.toLowerCase()));

    const min = filters.minPrice ? parseFloat(filters.minPrice) : 0;
    const max = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity;
    filtered = filtered.filter((car) => {
      let price = typeof car.SellingPrice === "number" ? car.SellingPrice.toString() : car.SellingPrice.replace(/[^\d.-]/g, "");
      return parseFloat(price) >= min && parseFloat(price) <= max;
    });

    setFilteredCars(filtered);
  }, [filters, data]);

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="pt-20 px-6 flex flex-col items-center">
        <Filters data={data} filters={filters} setFilters={setFilters} />
        <div className="w-full max-w-6xl mt-8">
          <h2 className="text-2xl font-semibold mb-4">Voitures</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredCars.slice(0, visibleCount).map((car) => (
              <CarCard key={car.VIN} car={car} />
            ))}
          </div>
          {visibleCount < filteredCars.length && (
            <button
              onClick={() => setVisibleCount(visibleCount + 20)}
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Voir plus
            </button>
          )}
        </div>
         {/* Additional Section for More Scrolling */}
         <div className="w-full max-w-6xl mt-16 mb-20">
          <h2 className="text-2xl font-semibold mb-4">Pourquoi nous choisir ?</h2>
          <p className="text-lg text-gray-700">
            Nous offrons une sélection de voitures adaptées à vos besoins avec une expérience d&apos;achat fluide et personnalisée.
            Nous offrons une sélection de voitures de qualité à des prix compétitifs. Trouvez la voiture de vos rêves grâce à nos filtres de recherche détaillés.
          </p>
        </div>
      </div>
      <button onClick={() => setIsChatBotOpen(true)} className="fixed bottom-6 right-6 flex justify-between items-center bg-blue-600 text-white p-3 rounded-full" style={isChatBotOpen ? {"visibility": "hidden"} : {"visibility": "visible"}}>💬</button>
      <div
        className={`fixed bottom-6 right-6 w-80 bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ${
          isChatBotOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center bg-blue-600 text-white p-3">
          <h3 className="text-lg font-semibold">Chatbot</h3>
          <button onClick={() => setIsChatBotOpen(false)} className="text-white text-xl font-bold">&times;</button>
        </div>
        <ChatBot />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
