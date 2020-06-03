const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0fad6077e5be566f1f8ffb631d3179db&query=${latitude},${longitude}`;

    request({url, json: true}, (error, {body} = {}) => {
    
        if(error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback(`${body.error.info}`, undefined)
        } else {
            console.log(body.current);
            callback(undefined, `It is currently ${body.current.temperature} degrees out there and there is ${body.current.humidity}% humidity. The temperature feels like ${body.current.feelslike} degrees.`)
        }
    })
}



//const url = 'http://api.weatherstack.com/current?access_key=0fad6077e5be566f1f8ffb631d3179db&query=37.8267,-122.4233';


// request({url: url, json: true}, (error, response) => {
//         if(error){
//             console.log('Unable to connect to weather service.');
//         } else if(response.body.error) {
//             console.log(response.body.error.info);
//         } 
//         else {
//             console.log(`It is currently ${response.body.current.temperature} degrees out there and there is ${response.body.current.precip} chances of rain.`);
//         }
// })

module.exports = forecast