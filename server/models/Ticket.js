import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
    {
        passengerName: {
            type: String,
            required: true,
        },
        passengerSecondName: {
            type: String,
            required: true,
        },
        fromStation: {
            type: String,
            required: true,
        },
        toStation: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        fromTime:{
            type: String,
            required: true,
        },
        toTime:{
            type: String,
            required: true,
        },
        trainNumber: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        wagonNumber: {
            type: String,
        },
        wagonType: {
            type: String,
        },
        seatNumber: {
            type: String,
        },
        seatType: {
            type: String,
        },
       
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }, 
    {
        timestamps : true,
    },
); 

export default mongoose.model('Ticket', TicketSchema); 