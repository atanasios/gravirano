import express from "express";
import { getAllMaps, getSingleMap, uploadMap } from "../controllers/maps.controller.js";


const router = express.Router();

router.get("/maps", getAllMaps);
router.get("/maps", getSingleMap)
router.post("/maps", uploadMap);

export default router;