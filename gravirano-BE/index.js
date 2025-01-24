import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mapRoutes from "./routes/maps.routes.js";
import connectToMongoDB from './DB/connectToMongoDB.js';

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.use(express.json())

app.use(mapRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
