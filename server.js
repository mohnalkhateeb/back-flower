'use strict'
const express = require('express');

const cors = require('cors');

const axios = require('axios');
const mongoose = require('mongoose')
require('dotenv').config();

const server = express();

server.use(cors());
const PORT = 3003
server.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/fllowers', { useNewUrlParser: true, useUnifiedTopology: true });
const userModel = require('./module/user')
const getAllFllowers = require('./module/allFllower')
server.get('/', handelOK)
server.post('/add', addFllowers)
server.delete('/delete/:Id', deleteFllowers)
server.put('/update/:Id', updateFllowers)
server.get('/fllower', getFllowers)
server.get('/all', getAllFllowers)
function seedUserCollection() {
    const Mohammad = new userModel({
        email: 'mhmmd.alkateeb@gmail.com', fllower: [{
            name: "Azalea",
            photo: "https://www.miraclegro.com/sites/g/files/oydgjc111/files/styles/scotts_asset_image_720_440/public/asset_images/main_021417_MJB_IMG_2241_718x404.jpg?itok=pbCu-Pt3",
            instructions: "Large double. Good grower, heavy bloomer. Early to mid-season, acid loving plants. Plant in moist well drained soil with pH of 4.0-5.5."
        }]
    })

    const Roaa = new userModel({
        email: 'roaa.abualeeqa@gmail.com', fllower: [{
            name: "Azalea",
            photo: "https://www.miraclegro.com/sites/g/files/oydgjc111/files/styles/scotts_asset_image_720_440/public/asset_images/main_021417_MJB_IMG_2241_718x404.jpg?itok=pbCu-Pt3",
            instructions: "Large double. Good grower, heavy bloomer. Early to mid-season, acid loving plants. Plant in moist well drained soil with pH of 4.0-5.5."
        }]
    })

    Mohammad.save()
    Roaa.save()
}

seedUserCollection()

function getFllowers(req, res) {
    let email = req.query.email
    userModel.find({ email: email }, function (error, fllowerData) {
        if (error) { res.send(error, 'error') }
        else {
            res.send(fllowerData[0].fllower)
        }
    })
}

function addFllowers(req, res) {
    let { email, name, photo, instructions } = req.body
    userModel.find({ email: email }, function (error, fllowerData) {
        if (error) { res.send(error, 'error') }
        else {
            fllowerData[0].fllower.push({
                name: name,
                photo: photo,
                instructions: instructions
            })

            fllowerData[0].save()
            res.send(fllowerData[0].fllower)
        }
    })
}

function deleteFllowers(req,res)
{
    let  email = req.query.email
    let index = Number(req.params.Id)
    userModel.find({ email: email }, function (error, fllowerData) {
        if (error) { res.send(error, 'error') }
        else {
            let delFllower = fllowerData[0].fllower.filter((item,idx)=>{
                if( index != idx ) return item
            })
            fllowerData[0].fllower = delFllower
            fllowerData[0].save()
            res.send(fllowerData[0].fllower)
        }
    })
}

function updateFllowers(req, res) {
    let { email, name, photo, instructions } = req.body
    let index = Number(req.params.Id)
    userModel.findOne({ email: email }, function (error, fllowerData) {
        if (error) { res.send(error, 'error') }
        else {
            fllowerData.fllower.splice(index,1,{
                name: name,
                photo: photo,
                instructions: instructions
            })

            fllowerData.save()
            res.send(fllowerData.fllower)
        }
    })
}
function handelOK(req, res) {
    res.send('OK')
}
server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})