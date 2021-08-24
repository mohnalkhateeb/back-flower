'use strict'
const axios = require('axios')

module.exports = getAllFllowers

function getAllFllowers(req,res)
{
    axios
    .get(`https://flowers-api-13.herokuapp.com/getFlowers`)
    .then(tempArr=>{
        // console.log(tempArr.data)
        const newFllower = tempArr.data.flowerslist.map(fllower => new Fllower(fllower))
        res.send(newFllower)
    })
}

class Fllower {
    constructor(fllower)
    {
        this.name = fllower.name
        this.photo = fllower.photo
        this.instructions = fllower.instructions
    }
}