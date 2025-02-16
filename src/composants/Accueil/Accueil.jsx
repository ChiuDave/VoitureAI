import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import ContacterModal from "../ContacterModal";
import Footer from "../Footer/Footer";
import ChatBot from "../Chat/ChatBot";
import { Link } from "react-router-dom";

const Accueil = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (currentScrollY + windowHeight >= documentHeight - 10) {
        setShowNavbar(false);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_ROUTE}/api/database`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const shuffledCars = result.sort(() => 0.5 - Math.random()).slice(0, 8);
        setCars(shuffledCars);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className={`fixed top-0 w-full transition-transform duration-300 z-50 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-center h-screen px-10 bg-white">
          <div className="flex-1">
            <h1 className="text-4xl font-bold">Accueil</h1>
            <h2 className="text-3xl font-semibold mt-4">Un nouveau marché révolutionnaire</h2>
            <p className="text-lg mt-4">
              Un nouveau moyen pour effectuer vos achats en ligne. Notre petit robot vous aidera à choisir la voiture de vos rêves selon vos préférences.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="https://img.freepik.com/premium-vector/drawing-car-with-hood-open-front-windshield-open_1230457-34358.jpg" alt="Car" className="rounded-lg shadow-lg" />
          </div>
        </section>

        {/* Section: Voitures Aléatoires */}
        <section id="random-cars" className="py-20 bg-gray-100 text-center px-10">
          <h2 className="text-4xl font-semibold">Quelques Voitures Aléatoires</h2>
          <p className="text-lg mt-4 max-w-3xl mx-auto">
            Découvrez une sélection de voitures disponibles sur notre plateforme.
          </p>

          {/* Check if there are cars, if so show the grid */}
          {cars.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {cars.map((car) => (
                <div key={car.VIN} className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
                  <img
                    src={car.Image_Link || `https://source.unsplash.com/300x200/?car&sig=${car.VIN}`}
                    alt={`${car.Make} ${car.Model}`}
                    className="rounded-lg mb-4 w-full"
                  />
                  <h3 className="text-xl font-semibold">{car.Make} {car.Model}</h3>
                  <p className="text-gray-600 mt-2">{car.Year} - {car.Miles} miles</p>
                  <Link to={`/details/${car.VIN}`} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Voir Détails
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            // Loading message outside the grid
            <div className="flex items-center justify-center h-1/2 w-full bg-gray-100 text-center">
              <p className="text-gray-500">Chargement des voitures...</p>
            </div>
          )}
        </section>


         {/* Services Section */}
         <section id="services" className="py-20 bg-white text-center px-10">
          <h2 className="text-4xl font-semibold">Nos Services</h2>
          <p className="text-lg mt-4 max-w-3xl mx-auto">
            Découvrez nos solutions avancées, de la recommandation intelligente à la recherche simplifiée de véhicules.
          </p>

          {/* Services Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Achat et Vente de Voitures */}
            <div className="bg-gray-100 p-6 rounded-2xl shadow-lg flex flex-col items-center">
              <img src="https://media.istockphoto.com/id/1281648010/fr/vectoriel/car-deal-avec-lic%C3%B4ne-ou-le-logo-de-la-ligne-de-signe-de-secousse-de-main-concept-de.jpg?s=612x612&w=0&k=20&c=drRPfSpJs9wPcKSMxuNcBt-7_5ORkxGXyjtPR8mMsJw=" alt="Vente de voitures" className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold">Achat et Vente de Voitures</h3>
              <p className="text-gray-600 mt-2">
                Trouvez la voiture parfaite ou vendez votre véhicule en toute simplicité grâce à notre plateforme optimisée.
              </p>
            </div>

            {/* Card 2: Service Client de Qualité */}
            <div className="bg-gray-100 p-6 rounded-2xl shadow-lg flex flex-col items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/950/950299.png" alt="Service client" className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold">Service Client de Qualité</h3>
              <p className="text-gray-600 mt-2">
                Notre assistance est disponible 24/7 pour vous accompagner dans votre expérience d&apos;achat ou de vente.
              </p>
            </div>

            {/* Card 3: Recommandations Personnalisées */}
            <div className="bg-gray-100 p-6 rounded-2xl shadow-lg flex flex-col items-center">
              <img src="https://static.vecteezy.com/system/resources/previews/042/407/049/non_2x/trendy-ai-model-vector.jpg" alt="Recommandations intelligentes" className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold">Recommandations Intelligentes</h3>
              <p className="text-gray-600 mt-2">
                Grâce à l&apos;IA, nous vous suggérons des voitures adaptées à vos besoins et préférences en temps réel.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 flex flex-col justify-center items-center bg-gray-100 text-center px-10">
          <h2 className="text-4xl font-semibold">Contact</h2>
          <p className="text-lg mt-4 max-w-3xl">
            Vous avez une question ? Notre équipe est là pour vous aider à chaque étape.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Nous Contacter
          </button>
          <ContacterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
      </div>

      {/* Chatbot Integration */}
      <button onClick={() => setIsChatBotOpen(true)} className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full" style={isChatBotOpen ? { visibility: "hidden" } : { visibility: "visible" }}>💬</button>
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Accueil;
