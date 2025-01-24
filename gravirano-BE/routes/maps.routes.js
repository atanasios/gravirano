import express from "express";
import { deleteMap, getAllMaps, getSingleMap, uploadMap } from "../controllers/maps.controller.js";
import multer from "multer";


const router = express.Router();
const upload = multer();

router.get("/maps", getAllMaps);
router.get("/maps/:id", getSingleMap)
router.post("/maps", upload.single("image"), uploadMap);
router.delete("/maps/:id", deleteMap);

export default router;