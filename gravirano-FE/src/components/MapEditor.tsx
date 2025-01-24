import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Map {
  _id: string;
  name: string;
  dimensions: string;
  price: number;
  image: string;
}

const MapEditor: React.FC<{ map: Map }> = ({ map }) => {
    const navigate = useNavigate();
  const bucketName = "gravirano-maps";
  const region = "eu-north-1";
  const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${map.image}`;

  const handleDelete = async (map: Map) => {
    try {
        console.log(map._id);
        
        const response = await axios.delete(`http://localhost:3000/maps/${map._id}`);
        alert(response.data.message);
        navigate("/");
    } catch (error) {
        console.error(error);
        alert("Failed to delete map!");
    }
};

  return (
    <div className="bg-secondary/70 min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-secondary rounded-lg shadow-lg p-8 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-main text-center">{map.name}</h2>
          <button className="bg-main text-secondary py-2 px-6 rounded-lg hover:bg-opacity-80 transition duration-300">
            Edit
          </button>
          <button onClick={() => handleDelete(map)}>Delete</button>
        </div>

        <img
          className="w-full h-auto object-contain rounded-md shadow-md mb-6 bg-main"
          src={imageUrl}
          alt={map.name}
        />

        <div className="text-main text-lg font-medium text-center mb-6">
          <p className="mb-2">{map.dimensions}</p>
          <p className="text-2xl font-semibold">{map.price} BGN</p>
        </div>
      </div>
    </div>
  );
};

export default MapEditor;