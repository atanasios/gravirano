import Map from "../models/map.model.js";
import { uploadFile } from "../s3.js";

export const uploadMap = async() => {
    try {
        const {name, price, dimensions} = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "No image file provided! "});
        }

        const imageUrl = await uploadFile(req.file.buffer, req.file.originalName, req.file.mimetype);

        const newMap = new Map({
            name,
            price,
            image: imageUrl,
            dimensions
        });

        await newMap.save();
        
        res.status(201).json({ message: "Map uploaded successfully!", map: newMap })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to upload map!", error })
    }
}

export const getAllMaps = async() => {
    try {
        const maps = await Map.find();

        res.status(201).json(maps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to download maps!", error })
    }
}

export const getSingleMap = async() => {
    const { id } = req.params;
    try {
        const map = await Map.findById(id);

        if(!map) {
            return res.status(404).json({ message: "Map not found!" });
        }

        res.status(200).json(map);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to download map!", error});
    }
}