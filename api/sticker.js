const express = require('express');
const route = express.Router();
const queries = require('../db/queryies');

const isValidId = (req, res, next) =>{
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'))
};

const validSticker = (sticker) => {
    const hasTile = typeof sticker.title == 'string' && sticker.title.trim() != '';
    const hasUrl = typeof  sticker.url == 'string' && sticker.url.trim() != '';
    return hasTile && hasUrl;
}


route.get('/',(req, res) => {
    queries.getAll().then(stickers =>{
        res.json(stickers);
    });
});

route.get('/:id', isValidId,(req, res, next) => {
    queries.getOne(req.params.id).then(sticker =>{
        if(sticker){
            res.json(sticker);
        }else{
            next();
        }
    })
})

route.post('/', (req, res, next) => {
    console.log(req.body);
    if(validSticker(req.body)){
        queries.create(req.body).then(stickers => {
            res.json(stickers[0]);
        });
    }else{
        next(new Error('invalid sticker'));
    }
})



module.exports = route;