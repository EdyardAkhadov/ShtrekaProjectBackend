import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema(
    {
        departureStation: {
            type: String,
            required: true,
        },
        departureTime: {
            type: String,
            required: true,
        },
        arrivalStation:{
            type: String,
            required: true,
        },
        arrivalTime:{
            type: String,
            required: true,
        },
        date : {
            type: String,
            required: true,
        },
        trainNumber : {
            type: String,
            required: true,
        },
        trainType : {
            type: String,
            required: true,
        },
        placesInfo : {
            type: Array,
        },
        places:{
            type: Array,
        },
        stations: {
            type: Array,
            required: true,
        }
    },
); 

export default mongoose.model('Route', RouteSchema); 