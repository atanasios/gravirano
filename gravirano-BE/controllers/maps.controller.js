import Map from "../models/map.model.js";
import { deleteFile, uploadFile } from "../s3.js";

export const uploadMap = async(req, res) => {
    try {
        const {name, price, dimensions} = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "No image file provided! "});
        }

        console.log("req.file: ", req.file.originalname)

        const imageKey = req.file.originalname

        const imageUrl = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);

        const newMap = new Map({
            name,
            price,
            image: imageKey,
            imageUrl: imageUrl,
            dimensions
        });

        await newMap.save();
        
        res.status(201).json({ message: "Map uploaded successfully!", map: newMap })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to upload map!", error })
    }
}

export const getAllMaps = async(req, res) => {
    try {
        const maps = await Map.find();

        res.status(201).json(maps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to download maps!", error })
    }
}

export const getSingleMap = async(req, res) => {
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

export const deleteMap = async(req, res) => {
    const { id } = req.params;

    try {
        const map = await Map.findById(id);

        if(!map) {
            return res.status(404).json({ message: "Map not found!"});
        }

        await map.deleteOne();
        await deleteFile(map.image);

        res.status(200).json({ message: "Map deleted successfully!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Failed to delete map!", error})
    }
}