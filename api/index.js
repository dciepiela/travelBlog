const express = require('express');
const cors = require('cors');
const mongoose  = require('mongoose');
const User = require('./models/User')
const Post = require('./models/Post')
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs'); //file system

const salt = bcrypt.genSaltSync(10);
const secret = 'asdasfdsfg43523423dgasdwerwfrwe';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));


mongoose.connect('mongodb+srv://blog:WSf1mACUDwK16sWD@cluster0.tljncqz.mongodb.net/test')

//rejestracja
app.post('/register',async (req,res) => {
    const {username,password} = req.body;
    try{
        const userDoc = await User.create({username, password:bcrypt.hashSync(password, salt),});
        res.json(userDoc);
    }
    catch(e){
        console.log(e);
        res.status(400).json(e);
    }
});

//logowanie
app.post('/login',async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    if (!userDoc) {
        return res.status(400).json('Złe dane logowania.');
    }
    const passOk = await bcrypt.compare(password, userDoc.password);
    if(!passOk){
        return res.status(400).json('Złe dane logowania.');
    }
    const token = jwt.sign({ username, id: userDoc._id }, secret, { expiresIn: '15m' });
    res.cookie('token', token, { secure: true }).json({ id: userDoc._id, username });
});

//profil po zalogowaniu
app.get('/profile', (req,res) =>{
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, information) =>{
        if(err) throw err;
        res.json(information);
    });
})

//wylogowanie
app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
})

//dodawanie posta
app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length -1];
    const newPath = path + '.' + extension;
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, information) =>{
        if(err) throw err;
        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            image: newPath,
            author: information.id,
        });
    res.json({postDoc});
    });
});

//aktualizacja
app.put('/post', uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null; 
    if(req.file){
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        newPath = path + '.' + extension;
        fs.renameSync(path, newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, information) =>{
        if(err) throw err;
        const {id, title, summary, content} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(information.id);
        if(!isAuthor){
            return res.status(400).json('Nie jesteś autorem tego posta!');
        }
        await postDoc.updateOne({
            title, 
            summary, 
            content, 
            image: newPath ? newPath:postDoc.image,
        });
        res.json({postDoc});
    });
})

app.get('/post', async (req,res) =>{
    const posts = await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: -1 })
    .limit(20);
    res.json(posts);
});

app.get('/post/:id', async(req, res) =>{
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})

app.listen(4000);
//mongodb+srv://blog:WSf1mACUDwK16sWD@cluster0.tljncqz.mongodb.net/test
//user: test password: test
