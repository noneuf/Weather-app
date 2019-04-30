const request = require('request')
const lowLevelError = `You do not have access to this service right now. Try again later`

const darkSky = (long, lat, location, callback) => {
    const url = `https://api.darksky.net/forecast/97aadae80f4eb990caff926d0196a637/${long},${lat}?units=auto&lang=en`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback(lowLevelError)
        } else if (body.error) {
            callback(body.error)
        } else {
            callback(undefined, `${body.daily.summary} It is currently ${body.currently.temperature} degrees in ${location} in time zone ${body.timezone}. There is a ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = darkSky