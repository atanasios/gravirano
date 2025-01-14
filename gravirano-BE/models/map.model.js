import mongoose from "mongoose";

const mapSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    dimensions: [
        {
            width: { type: Number, required: true },
            height: { type: Number, required: true }
        }
    ]
}, { timestamps: true });

const Map = mongoose.model("Map", mapSchema);

export default Map;