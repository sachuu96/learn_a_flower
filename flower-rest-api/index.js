//import required module
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //post body handler
const Sequelize = require('sequelize'); //Database ORM
const { check, validationResult } = require('express-validator/check'); //form validation
const { matchedData, sanitize } = require('express-validator/filter'); //sanitize form params
const multer  = require('multer'); //multipar form-data
const path = require('path');
const crypto = require('crypto');

//Set body parser for HTTP post operation
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//set static assets to public directory
app.use(express.static('public'));
const uploadDir = '/img/';
const storage = multer.diskStorage({
    destination: "./public"+uploadDir,
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)  

        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
})

const upload = multer({storage: storage, dest: uploadDir });

//Setup for app configuration before connecting
const port = 3000;
const baseUrl = 'http://localhost:'+port;

//Connect to database
const sequelize = new Sequelize('flowerstore', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

//Define model
const flower = sequelize.define('flower', {
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'fno': Sequelize.STRING,
    'name': Sequelize.STRING,
    'description': Sequelize.TEXT,
    'image': {
        type: Sequelize.STRING,
        //Set custom getter for flower image using URL
        get(){
            const image = this.getDataValue('image');
            return uploadDir+image;
        }
    },
    'createdAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },    
    'updatedAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },   
    
    
}, {
    //prevent sequelize transform table name into plural
    freezeTableName: true,
});

//get all flowers
app.get('/flower/', (req, res) => {
    flower.findAll().then(flower => {
        res.json(flower)
    })
})

//get flower by fno
app.get('/flower/:fno', (req, res) => {
    flower.findOne({where: {fno: req.params.fno}}).then(flower => {
        res.json(flower)
    })
})

//Insert operation
app.post('/flower/add', [
    //File upload
    upload.single('image'),

    //Set form validation rule
    check('fno')
        .isLength({ min: 2 })
        .isNumeric()
        .custom(value => {
            return flower.findOne({where: {fno: value}}).then(b => {
                if(b){
                    throw new Error('Flower Number already in use');
                }            
            })
        }
    ),
    check('name')
        .isLength({min: 2}),
    check('description')
     .isLength({min: 10})

],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ status: 'error', message:"Form error", data:null, errors: errors.mapped() });
    }

    flower.create({
        name: req.body.name,
        fno:req.body.fno,
        description: req.body.description,
        image: req.file === undefined ? "" : req.file.filename
    }).then(newFlower => {
        res.json({
            "status":"success",
            "message":"Flower added",
            "data": newFlower
        })
    })
})



//Update operation
app.post('/flower/:fno/update', [
    //File upload
    upload.single('image'),

    //Set form validation rule
    check('fno')
        .isLength({ min: 2 })
        .isNumeric()
        .custom(value => {
            return flower.findOne({where: {fno: value}}).then(b => {
                if(!b){
                    throw new Error('Flower Number not found');
                }            
            })
        }
    ),
    check('name')
        .isLength({min: 2}),
    check('description')
     .isLength({min: 10})

],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ status: 'error', message:"Form error", data:null, errors: errors.mapped() });
    }

    let prevImage = null;
    flower.findOne({where: {fno: req.body.fno}}).then(b => {
        
        let newThumbnail = '';
        console.log("Req.file", req.file);


        if(req.file === undefined || req.file.filename ===""){
            let parts = b.image.split('/');            
            newThumbnail = parts[parts.length - 1];
        }else{
            newThumbnail = req.file.filename;
        }

        console.log("newThumbnail", newThumbnail);
        
        const update = {
            name: req.body.name,
            fno: req.body.fno,
            description: req.body.description,
            image: newThumbnail
        }

        flower.update(update,{where: {fno: req.body.fno}})
            .then(affectedRow => {
                return flower.findOne({where: {fno: req.body.fno}})      
            })
            .then(b => {
                res.json({
                    "status": "success",
                    "message": "Flower updated",
                    "data": b
                })
            })
        })    
})


app.post('/flower/:fno/delete',[
    //Set form validation rule
    check('fno')
        .isNumeric()
        .custom(value => {
            return flower.findOne({where: {fno: value}}).then(b => {
                if(!b){
                    throw new Error('Flower Number not found');
                }            
            })
        }
    ),
], (req, res) => {
    flower.destroy({where: {fno: req.params.fno}})
        .then(affectedRow => {
            if(affectedRow){
                return {
                    "status":"success",
                    "message": "Flower deleted",
                    "data": null
                } 
            }

            return {
                "status":"error",
                "message": "Failed",
                "data": null
            } 
                
        })
        .then(r => {
            res.json(r)
        })
})

app.listen(port, () => console.log("flower-rest-api run on "+baseUrl ))