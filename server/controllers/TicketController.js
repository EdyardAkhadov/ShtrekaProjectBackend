import TicketModel from "../models/Ticket.js"

export const create = async (req, res) => {
    try {
        const doc = new TicketModel({
            passengerName: req.body.passengerName,
            passengerSecondName: req.body.passengerSecondName,
            fromStation: req.body.fromStation,
            toStation: req.body.toStation,
            date: req.body.date,
            fromTime: req.body.fromTime,
            toTime: req.body.toTime,
            price: req.body.price,
            trainNumber: req.body.trainNumber,
            wagonNumber: req.body.wagonNumber,
            wagonType: req.body.wagonType,
            seatNumber: req.body.seatNumber,
            seatType: req.body.seatType,
            user: req.userId,
        })

        const ticket = await doc.save();

        res.json(ticket)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося створити білет!"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const tickets = await TicketModel.find();

        res.json(tickets)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося отримати квитки!"
        })
    }
} 

export const getByUserId = async (req, res) => {
    try {

        const userId = req.params.userId;

        TicketModel.find(
            {
                user : userId
            }).then(doc => res.json(doc))
            .catch(err => res.status(500).json({ message: "Квитки не знайдені" }))
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося отримати квитки!"
        })
    }
}  
