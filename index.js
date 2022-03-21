const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.Port || 8080
const messageService = require('./services/message')
const bodyParser = require('body-parser')
const routesController = require('./routes/v1')
const mw1 = require('./middleware/test_mw')
const mw2 = require('./middleware/test_mw1')
const middleware = ('./middleware/auth')
app.get('/',mw1.test_mw, (req,res) => {
    res.status(200).json({
        success: true,
        message: messageService.getUserMessage('GET')
    })
})
app.post('/',(req,res) => {
    res.status(200).json({
        success: true,
        message: messageService.getUserMessage('POST')
    })
})
app.use(bodyParser.json({extended: true}))
app.use('/api/v1',mw1.test_mw,mw2.test_mw1, routesController)
app.listen(port, () => {
    console.log('server has started and it is listen on port : ',port)
})