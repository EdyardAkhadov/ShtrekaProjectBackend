import mongoose from "mongoose";

const StationSchema = new mongoose.Schema(
    {
        stationName: {
            type: String,
            required: true,
        },
        date:{
            type: String,
            required: true,
        },
        routes : {
            type: Array,
            required: true,
        },
        stationImage: {
            type: String,
            default: "https://static.nv.ua/shared/system/MediaPhoto/images/000/086/244/original/0bf1a6acdf74a4809fe691e99dcb8b42.png"
        }
    },
); 

export default mongoose.model('Station', StationSchema); 