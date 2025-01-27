const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoicHJldHR5cG9uZXkxNiIsImEiOiJjbTVteGd3cGswNHpyMnNvcnlpcDk4dG14In0.R6NHA6cQwFd-DdtKii6qVA&limit=1'

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to geocoding service', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find a location. Try another search', undefined)
        } else {
            const { coordinates, full_address } = body.features[0].properties
            callback(undefined, {
                longitude: coordinates.longitude,
                latitude: coordinates.latitude,
                location: full_address
            })
        }
    })
}

module.exports = geocode