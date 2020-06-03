const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&access_token=pk.eyJ1Ijoia3BhcmVlazI1OTIiLCJhIjoiY2swZTMwMTZ4MDQ4azNubnBxcnlseTA4MyJ9.VM8xIhGnM70QdfvdsL7UEA&limit=1`;

    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location service.', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try again.', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode