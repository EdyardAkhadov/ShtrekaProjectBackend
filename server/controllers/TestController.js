import TestModel from "../models/Test.js"

export const create = async (req, res) => {
    try {
        const doc = new TestModel({
            name: req.body.name,
            test: req.body.test,
        })

        const test = await doc.save();

        res.json(test)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося створити test!"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const test = await TestModel.find();

        res.json(test)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося отримати test!"
        })
    }
} 

export const getOneByTestName = async (req, res) => {
    try {
        const testName = req.params.name;
        
        TestModel.findOne(
            {
                name: testName,
            })
            .then(doc => res.json(doc))
            .catch(err => res.status(500).json({ message: "test не найдено" }))

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося знайти test!"
        })
    }
}