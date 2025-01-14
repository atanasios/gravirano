import express from "express";
import { getAllMaps, getSingleMap, uploadMap } from "../controllers/maps.controller.js";
import multer from "multer";


const router = express.Router();
const upload = multer();

router.get("/maps", getAllMaps);
router.get("/maps", getSingleMap)
router.post("/maps", upload.single("image"), uploadMap);

export default router;