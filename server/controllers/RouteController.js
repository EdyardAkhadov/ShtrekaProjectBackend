import RouteModel from "../models/Route.js"

export const create = async (req, res) => {
    try {
        const doc = new RouteModel({
            departureStation: req.body.departureStation,
            departureTime: req.body.departureTime,
            arrivalStation: req.body.arrivalStation,
            arrivalTime: req.body.arrivalTime,
            date: req.body.date,
            trainNumber: req.body.trainNumber,
            trainType: req.body.trainType,
            places: req.body.places,
            stations: req.body.stations,
        })

        const route = await doc.save();

        res.json(route)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося створити пост!"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const routes = await RouteModel.find();

        res.json(routes)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося отримати статті!"
        })
    }
} 

export const getOneByRouteName = async (req, res) => {
    try {
        const departureStation = req.params.departureStation;
        const arrivalStation = req.params.arrivalStation;
        
        RouteModel.findOne()
            .and([{"departureStation": departureStation},{"arrivalStation": arrivalStation}])
            .then((doc) => (doc != null) ? res.json(doc) : res.json("Маршруту не існує"))
            .catch(err => res.status(500).json({ message: "Станцію не найдено" }))

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося знайти станцію!"
        })
    }
}