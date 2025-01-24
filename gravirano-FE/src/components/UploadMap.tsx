import axios from "axios";
import { useState, useRef } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

const UploadMap: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number | "">("");
    const [dimensions, setDimensions] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleClearImage = () => {
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !price || !dimensions || !image) {
            alert("Please fill out all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price.toString());
        formData.append("dimensions", dimensions);
        formData.append("image", image);

        try {
            const response = await axios.post("http://localhost:3000/maps", formData, {
                headers: {
                    "Key" : image.name,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert(response.data.message);
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to upload map!");
        }
    };

    return (
        <div>
            <Header />
            <Link to="../" className="ml-10 rounded-lg bg-secondary w-24 h-8 items-center text-main justify-center flex">Back</Link>
            <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-2/3 p-6 bg-white rounded-lg shadow-lg mx-auto"
        >
            <h2 className="text-2xl font-bold text-gray-800 text-center">Upload a Map</h2>

            <label className="flex flex-col gap-2 text-gray-600">
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter map name"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
            </label>

            <label className="flex flex-col gap-2 text-gray-600">
                Price:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Enter map price"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
            </label>

            <label className="flex flex-col gap-2 text-gray-600">
                Dimensions:
                <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="Enter map dimensions"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
            </label>

            <label className="flex flex-col gap-2 text-gray-600">
                Image:
                <div className="flex items-center gap-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-600 file:cursor-pointer focus:outline-none"
                    />
                    {image && (
                        <button
                            type="button"
                            onClick={handleClearImage}
                            className="px-3 py-2 text-sm font-medium text-main bg-red/80 rounded-lg hover:bg-red"
                        >
                            Clear Image
                        </button>
                    )}
                </div>
            </label>

            <button
                type="submit"
                className="w-full py-3 text-main font-semibold bg-secondary/80 rounded-lg hover:bg-secondary focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
                Upload Map
            </button>
        </form>
        </div>
    );
};

export default UploadMap;