const request = require('request')

const lowLevelError = `You do not have access to this service right now. Try again later`
const locationNotFound = `The location you requested couldn't be found.`

const geoCode = (adresse, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adresse)}.json?access_token=pk.eyJ1Ijoibm9uZXVmIiwiYSI6ImNqdXR6NjU4czA3NnQ0YnFlcTM1MGdja2MifQ.2fjTlB9_eXEsuX9Dm9YXMg&limit=1`
    request({url, json: true}, (error, { body }) => {
        if (error) {
           callback(lowLevelError, undefined)
        } else if (body.features.length === 0) {
            callback(locationNotFound, undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode