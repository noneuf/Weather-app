const path = require('path')
const express = require('express')
const hbs = require('hbs')

const darkSky = require('./utils/darksky')
const geoCode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') //return the path to the public folder
const viewsPath = path.join(__dirname, '../templates/views') //tells what is the path for the templates (instead of views which is by default)
const partialsPath = path.join(__dirname, '../templates/partials') //where I will put my partials

//Set handlebars (hbs) and views location
app.set('view engine', 'hbs') //tells express with which template we work (here hbs, handlebars)
app.set('views', viewsPath) //here we set the path to the views (if the name of the file that holds our templates is custom and not views (views is by default))
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //goes to the default page app.get('/'... in the browser we could type the name of the file we want to acces, for example about.html after the localhost:3000/
//static means the files they do not change

//this one is to render the hbs index file
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nathan Goel'
    }) //first arg is the name of the file we render. Second arg is an object that contains the values we want to inject dinamicly in the file.
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nathan Goel',
        img: './img/profil.jpg'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Nathan Goel'
    })
})


app.get('/weather', (req, res) => {

    const adresse = req.query.adresse

    if(!adresse) {
        return res.send({ //return is used here to provide the next res.send to run and provoque an error
            error: 'You must provide an adresse.'
        })
    }

    geoCode(adresse, (error, { longitude, latitude, location } = {} /* here with ={} we provide a default value in case the provided adresse in the query string isn't requognized (ex: adresse=??) */) => { 
        if(error) { 
            return res.send({ error })
        } else { 
            darkSky(longitude, latitude, location, (error, forecastData) => {
                if(error) {
                    res.send({ error })
                } else {
                    res.send({
                        location,
                        forecast: forecastData,
                        adresse
                    })
                }
            })
        }
    
    
    }) 

    // res.send({
    //     location: 'Paris',
    //     forecast: 'Sunny',
    //     adresse: req.query.adresse
    // })

})



app.get('/help/*', (req, res) => { //this needs to sit at the end of all the app.gets and it is for all not found pages after a specific path that exists.
    res.render('errPage', {
        title: '404',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => { //this needs to sit at the end of all the app.gets
    res.render('errPage', {
        title: '404',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})