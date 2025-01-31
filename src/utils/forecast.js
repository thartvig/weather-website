const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=e77c3a375a58da936acfd5cefdee6cad&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Weather Services!', undefined)
        } else if (body.error) {
            callback('Unable to find weather for that location', undefined)
        } else {
            const { temperature: actualTemp, feelslike, weather_descriptions, observation_time } = body.current;
            const locationData = `${weather_descriptions[0]}: At ${observation_time} it was ${actualTemp} degrees out. It felt like ${feelslike} degrees out.`
            callback(undefined, locationData)
        }
    })
}

module.exports = forecast