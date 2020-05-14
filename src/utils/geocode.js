const request=require('request')
const geo = (name, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(name) + ".json?access_token=pk.eyJ1IjoiNzc5MzkzMTQyOSIsImEiOiJjazlvNXI5czIwNWluM2RsOWFjZDhwY3NtIn0.axEI8_MiwWTSnn_7prs-Ww&limit=1"

    request({ url: url, json: true }, (e, r) => {
        
        if (e) {
            callback({'e':"unable to connect to fetch location details"},0,0)
        }
        else if (r.body.features.length === 0) {
            callback({'e':'No data found. Please try with another search name or recheck the spelling of the location'}, 0, 0)
        }
        else {
            lat = r.body.features[0].center[1] 
            long = r.body.features[0].center[0] 
            console.log(lat, long)
            callback(false, lat, long)
        }

    })
}
module.exports=geo