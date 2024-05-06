import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'

import {registerValidation, loginValidation, postCreateValidation, stationCreateValidation, testCreateValidation, routeCreateValidation, ticketCreateValidation} from './server/validations/validations.js';
import {checkAuth, handleValidationErrors} from './server/midleware/indexMidleware.js';
import {
    UserController,
    PostController, 
    StationController, 
    TestController, 
    RouteController,
    TicketController}  from './server/controllers/indexControllers.js';

mongoose
    .connect('mongodb+srv://akhadoveduard:MoyParo1@shtrekadb.ugnhe5j.mongodb.net/ShtrekaDB?retryWrites=true&w=majority&appName=ShtrekaDB',)
    .then(() => console.log("DB is starting!"))
    .catch((err) => console.log('DB error!', err));

const app = express();



app.use(express.json());

app.use(cors())

app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidation, handleValidationErrors , UserController.login)
app.post('/auth/register',  registerValidation, handleValidationErrors , UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/route', routeCreateValidation, handleValidationErrors, RouteController.create);
app.get('/route', RouteController.getAll);
app.get('/route/:departureStation/:arrivalStation', RouteController.getOneByRouteName);

app.post('/ticket', checkAuth, ticketCreateValidation, handleValidationErrors , TicketController.create);
app.get('/tickets', checkAuth, TicketController.getAll);
app.get('/tickets/:userId', TicketController.getByUserId);

app.post('/test', testCreateValidation, handleValidationErrors, TestController.create);
app.get('/test', TestController.getAll);
app.get('/test/:name', TestController.getOneByTestName);


app.post('/stations', stationCreateValidation, handleValidationErrors, StationController.create);
app.get('/stations', StationController.getAll);
app.get('/stations/:stationName', StationController.getOneByStationName);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors , PostController.create);
app.delete('/posts/:id',checkAuth, PostController.remove);
app.patch('/posts/:id',checkAuth, handleValidationErrors , PostController.update);

app.listen(4444, (err)=>{
    if(err){
        return console.log(err);
    }
    console.log('Server is starting!')
});