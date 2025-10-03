import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Asteroid from "../Components/Asteroid";
import DateSelector from "../Components/DateSelector";
import { useState } from "react";
import DisplayInfo from "../Components/DisplayInfo";
import { DiameterContext } from "../Context/DiameterContext";
import { Link } from "react-router-dom";

const Configurator = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showSearch, setShowSearch] = useState(true);
  const selectedAsteroid = asteroids.find((a) => a.id == selectedId);

  const diameterKm = selectedAsteroid
    ? (selectedAsteroid.estimated_diameter.kilometers.estimated_diameter_min +
        selectedAsteroid.estimated_diameter.kilometers.estimated_diameter_max) /
      2
    : 1; // default scale when no asteroid selected

  const fetchAsteroids = async (startDate, endDate) => {
    setShowSearch(false);
    try {
      const apiKey = "ohVUtiXsz1afqFpmS5ktfSc4fdgf6B5IWIr7hXdC";
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
      );
      const json = await response.json();
      const objects = Object.values(json.near_earth_objects).flat();
      setAsteroids(objects);
      setSelectedId("");
    } catch (error) {
      console.log("Failed to fetch asteroids.", error);
      setAsteroids([]);
    }
  };

  return (
    <DiameterContext.Provider value={diameterKm}>
      <div className="relative w-screen h-screen">
        <Canvas camera={{ position: [5, 5, 5] }} className="bg-black">
          <OrbitControls />
          <ambientLight intensity={0.3} />
          <directionalLight intensity={1} />
          <Stars count={400} depth={200} />
          <Asteroid />
        </Canvas>
        {showSearch && <DateSelector onFetch={fetchAsteroids} />}
        {asteroids.length > 0 && !showSearch && (
          <div className="absolute top-30 left-1/9 bg-white/10 text-white p-4 rounded-md">
            <label htmlFor="asteroid" className="font-bold">
              Select Asteroid:{" "}
            </label>
            <select
              id="asteroid"
              value={selectedId}
              className="bg-gray-500 rounded-md"
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="" className="bg-gray-700 text-white">
                --Select--
              </option>
              {asteroids.map((asteroid) => (
                <option
                  id={asteroid.id}
                  key={asteroid.id}
                  value={asteroid.id}
                  className="bg-gray-700 text-white"
                >
                  {asteroid.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedAsteroid && !showSearch && (
          <div>
            <DisplayInfo selectedAsteroid={selectedAsteroid} />
            <Link
              to={"/deflect/simulation"}
              className="absolute bottom-50 left-1/9 font-bold text-lg text-white bg-green-600 p-3 cursor-pointer rounded-md"
            >
              Start Simulation
            </Link>
            <div className="absolute bottom-30 left-1/9 font-bold text-lg text-white">
              <button
                onClick={() => setShowSearch(true)}
                className="bg-white/10 p-3 cursor-pointer rounded-md"
              >
                Search New Asteroid
              </button>
            </div>
          </div>
        )}
      </div>
    </DiameterContext.Provider>
  );
};

export default Configurator;
