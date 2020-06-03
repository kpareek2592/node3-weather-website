const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views loctaion
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kaushal Pareek'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kaushal Pareek'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!!',
        name: 'Kaushal Pareek',
        message: 'Drop an email for help'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    
        if(error) {
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, forcastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                address: req.query.address,
                forecast: forcastData,
                location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: "Help article not found",
        name: 'Kaushal Pareek'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: "This page is not available",
        name: 'Kaushal Pareek'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})