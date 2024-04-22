require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const redisClient = require('./config/redisconnect')

app = express()

app.use(cors())
// app.use(bodyParser.body())
app.use(cookieParser())
// cookiee --> use 


// server -->  hash ()


app.get('/', async(req,res) => {
    let userId = req.cookies.userId;
    console.log('userId', userId)
    try {
        let one = await redisClient.get("1")
        let two = await redisClient.get("2")
        let three = await redisClient.get("3")

        one = !one ? 0 : parseInt(one)
        two = !two ? 0 : parseInt(two)
        three = !three ? 0 : parseFloat(three)


        console.log(one, two, three)
        // redis is empty and no request is served

        let response;
        let temp;

        if (one == 0) {
            response = await redisClient.set("1", "1")
            res.status(200).json({page:'one'})
        }

        if (two == 0) {
            response = await redisClient.set("2", "1")
            res.status(200).json({page:'two'})
        }

        if (three == 0) {
            response = await redisClient.set("3", "1")
            res.status(200).json({page:'three'})
        }

       
        if (one < two && one <= three) {
            response = await redisClient.set("1", parseInt(one) + 1)
            temp = 'one';
        } else if (two < one && two <= three) {
            response = await redisClient.set("2", parseInt(two) + 1)
            temp = 'two';
        } else if (three < one && three <= two) {
            response = await redisClient.set("3", parseInt(three) + 1)
            temp = 'three';
        } else {
            response = await redisClient.set("1", parseInt(one) + 1) // anyways save with one
            temp = 'one';
        }
        
        console.log('what page user should serve', temp)
        res.status(200).json({page:temp})
    } catch (error) {
        console.log('errorr', error)
        res.status(500).json({message : 'server is failing!'})
    }
})




module.exports = app;