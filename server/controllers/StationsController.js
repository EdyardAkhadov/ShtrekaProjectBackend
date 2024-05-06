import StationModel from "../models/Station.js"

export const create = async (req, res) => {
    try {
        const doc = new StationModel({
            stationName: req.body.stationName,
            date: req.body.date,
            routes: req.body.routes,
            stationImage: req.body.stationImage,
        })

        const station = await doc.save();

        res.json(station)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося створити пост!"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const stations = await StationModel.find();

        res.json(stations)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося отримати статті!"
        })
    }
} 

export const getOneByStationName = async (req, res) => {
    try {
        const stationName = req.params.stationName;
        
        StationModel.findOne(
            {
                stationName: stationName,
            })
            .then((doc) => (doc != null) ? res.json(doc) : res.json("Cтанції не існує"))
            .catch(err => res.status(500).json({ message: "Станцію не найдено" }))

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося знайти станцію!"
        })
    }
}