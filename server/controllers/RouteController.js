import { json } from "express";
import RouteModel from "../models/Route.js"
import mongoose from "mongoose";
import RouteSchema from "../models/Route.js"


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
            placesInfo: req.body.placesInfo,
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

export const getOne = async (req, res) => {
    try {
        const routeId = req.params.routeId;
        
        RouteModel.findById(routeId)
            .then(doc => res.json(doc))
            .catch(err => res.status(500).json({ message: "Статья не найдена" }))

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

export const getByStations = async (req, res) => {
    try {
        const fromStation = req.params.fromStation;
        const toStation = req.params.toStation;
        const date = req.params.date;
        
        RouteModel.find({ 'stations':{ $elemMatch: {'name': fromStation}}})
            .and({ 'stations':{ $elemMatch: {'name': toStation}}})
            .and({ $or : [{'date' : date} , { 'date' : "everyday"}]})
            .then((doc) => (doc != null) ? res.json(doc) : res.json("Маршруту не існує"))
            .catch(err => res.status(500).json({ message: "Станцію не найдено" }))

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося знайти станцію!"
        })
    }
}


export const routeWagonFind = async (req, res) => {
    try {
        const routeId = req.params.routeId; // Assuming train ID is in request params        
        const wagonIndex = parseInt(req.params.wagonNum) - 1; // Get wagon index from request params
        const seatIndex = parseInt(req.params.seatNum) - 1; // Get seat index from request params
      
        const updatedTrain = await RouteModel.findOneAndUpdate(
          { _id: routeId},
          {
            $set: {
                [`places.${wagonIndex}.seats.${seatIndex}.status`] : "occupied"

            }
          },
          { new: true } // Return updated document
        );
    
        if (!updatedTrain) {
          return res.status(404).json({ message: 'Поезд не найден' });
        }
    
        res.json(updatedTrain);
        console.log('Статус места успешно обновлен');
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка при обновлении статуса места' });
      }
}