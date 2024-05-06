import { body } from "express-validator";

export const registerValidation = [
   body('phoneNumber', 'Неправильно вказаний номер!').isLength({min:10}),
    body('password', 'Пароль має бути мінімум 5 символів!').isLength({min:5}),
    body('firstName', 'Ім`я має бути мінімум 3 симоли!').isLength({min:3}),
    body('secondName', 'Прізвище має бути мінімум 3 симоли!').isLength({min:3}),
    body('avatarUrl', 'Неправильне посилання на фото!').optional().isURL(),
];

export const loginValidation = [
    body('phoneNumber', 'Неправильно вказаний номер!').isLength({min:10}),
    body('password', 'Пароль має бути мінімум 5 символів!').isLength({min:5}),
];

export const postCreateValidation = [
     body('title', 'Введіть заголовок статті!').isLength({min:3}).isString(),
     body('text', 'Введіть текст статті!').isLength({min:10}).isString(),
     body('tags', 'Неправильний формат тегів!').optional(),
     body('imageUrl', 'Невірно вказано посилання!').optional().isString(),
 ];

 export const stationCreateValidation = [
    body('stationName', 'Введіть заголовок статті!').isString(),
    body('date', 'Введіть текст статті!').isString(),
    body('routes', 'Неправильний формат тегів!'),
    body('stationImage', 'Невірно вказано посилання!').optional().isString(),
];

export const routeCreateValidation = [
    body('departureStation', 'Введіть станцію відправки!').isString(),
    body('departureTime', 'Введіть час на станцію відправки!').isString(),
    body('arrivalStation', 'ведіть станцію прибуття!').isString(),
    body('arrivalTime', 'Введіть час на станцію прибуття!').optional().isString(),
    body('date', 'Введіть дату!').isString(),
    body('trainNumber', 'Введіть номкр потягу!').isString(),
    body('trainType', 'Неправильний тип поїзда!').isString(),
    body('places', 'Невірно вказані місця!'),
    body('stations', 'Невірно вказані станції!'),
];

export const ticketCreateValidation = [
    body('passengerName', 'Введіть імя!').isString(),
    body('passengerSecondName', 'Введіть прізвище!').isString(),
    body('fromStation', 'Введіть станцію відправки!').isString(),
    body('toStation', 'Введіть станцію прибуття!').isString(),
    body('date', 'Введіть дату').isString(),
    body('fromTime', 'Введіть час відправки').isString(),
    body('toTime', 'Введіть час прибуття').isString(),
    body('trainNumber', 'Введіть номер потяга!').isString(),
    body('price', 'Введіть ціну!').isString(),
    body('wagonNumber', 'Введіть номер вагона!').optional().isString(),
    body('wagonType', 'Введіть тип вагону!').optional().isString(),
    body('seatNumber', 'Введіть номкр місця!').optional().isString(),
    body('seatType', 'Неправильний тип місця!').optional().isString(),
]

export const testCreateValidation = [
    body('name', 'Введіть заголовок name!').isString(),
    body('test', 'Введіть текст test!').isString(),
]