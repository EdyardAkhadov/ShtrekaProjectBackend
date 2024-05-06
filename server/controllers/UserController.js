import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try{
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            phoneNumber: req.body.phoneNumber,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,  
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        }, 
        'secret123',
        {
            expiresIn: '30d'
        });

        const {passwordHash, ...userData} = user._doc; 

        res.json({
            ...userData,
            token,
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: "Нe вдалося зареєструватись!"
        })
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ phoneNumber:req.body.phoneNumber})
    if(!user){
        return res.status(404).json({
            message: 'Невірний логін або пароль!',
        });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if(!isValidPassword){
        return res.status(404).json({
            message: 'Невірний логін або пароль!',
        });
    }

    const token = jwt.sign({
        _id: user._id,
    }, 
    'secret123',
    {
        expiresIn: '30d'
    });

    const {passwordHash, ...userData} = user._doc; 

        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Нe вдалося увійти в аккаунт!"
        })
    }
}

export const getMe = async (req, res) => {
    try {
            const user = await UserModel.findById(req.userId);

            if(!user){
                return res.status(404).json({
                    message: 'Користувача не знайдено!'
                })
            }
            const {passwordHash, ...userData} = user._doc; 

            res.json(userData);
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Нeмає доступу!"
        })
    }
}