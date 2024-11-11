const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/dbConnect')
const port = process.env.PORT || 5000

// connect to DB
connectDB()

// express
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// routes
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
// error handler
app.use(errorHandler)
// app server
app.listen(port, ()=>console.log(`Server is listening on port ${port}`) )
