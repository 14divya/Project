const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const app = express();
const mongoose = require('mongoose');
const Image = require('./models/Image');
const cors = require('cors');
const mongo = require('mongodb');
app.use(cors({
    origin:'http://127.0.0.1:3000'
}));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1/test', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const id = uuid();
        const filePath = `images/${id}${ext}`;
        const name = req.body.name;
    
        Image.create({name:name,filePath: filePath })

            .then(() => {
                cb(null,filePath)
            });
    }
})
const upload = multer({ storage }); // or simply { dest: 'uploads/' }
app.use(express.static('public'));
app.use(express.static('uploads'));

app.post('/upload', upload.array('avatar'), (req, res) => {
    return res.redirect('/');
});

app.get('/images', (req, res) => {
    Image.find()
        .then((images) => {
            
            return res.json({ status: 'OK', images});
        })
        
});
app.delete("/dodelete", (req,res)=>{
    const reqJson = req.body;
    console.log(new mongo.ObjectId(reqJson.id))
    console.log(reqJson.id);
    Image.deleteOne({
            '_id':new mongo.ObjectId(reqJson.id)
        }).then(()=>{
            console.log("Deleted");
        })
    
    
})
app.put("/doupdate", (req,res)=>{
    const reqJson = req.body;
    console.log(new mongo.ObjectId(reqJson.id))
    console.log(reqJson.id);
    console.log(reqJson.updated);
    Image.updateOne({
            '_id':new mongo.ObjectId(reqJson.id),
        },{$set:{'name':reqJson.updated}}).then(()=>{
            console.log("Updated");
        })
    
    
})
app.listen(3001);
