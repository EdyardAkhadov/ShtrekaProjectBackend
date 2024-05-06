import PostModel from "../models/Post.js"

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося отримати статті!"
        })
    }
}  

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        
        PostModel.findOneAndUpdate(
            { _id: postId } ,{ $inc: { viewsCount: 1 } },{ returnDocument: "After" } )
            .then(doc => res.json(doc))
            .catch(err => res.status(500).json({ message: "Статья не найдена" }))

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося отримати статті!"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete(
        { _id:postId })
        .then(res.json({success:true,}))
        .catch(error => res.status(500).json({message: "Статья не найдена"}))

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося видалити статтю!"
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save();

        res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося створити пост!"
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId,   
        }, {
            user: req.userId,
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
        })

        res.json({
            success:true,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Нe вдалося оновити пост!"
        });
    }
}