const request=require('request')
const geo=require('./geocode.js')
const whe = (lat,long,callback) => {
    
             const url = "http://api.weatherstack.com/current?access_key=7c9db7c67ef9f1607b149a38056ba74e&query=" + lat + "," + long
              //const url = "http://api.weatherstack.com/current?access_key=7c9db7c67ef9f1607b149a38056ba74e&query=" + name
                request({ url: url, json: true }, (error, j) => {
                    if (error) {
                        console.log(error)
                        console.log("unable to connect to weather app")
                        
                        callback({'e':"Unable to connect to weather app. Please check your internet connection"})
                    }
                    else if (j.body.success === false) {
                        console.log("No data found....please try with another search name")
                        callback({'e':"No data found. Please try with another search name or recheck the spelling of the location"})
                    }
                    else {
                        console.log(j.body.location.name + ", " + j.body.location.region + ", " + j.body.location.country)
                        console.log(j.body.location.localtime)
                        console.log(j.body.current.temperature)
                        callback(false,{
                            'name':j.body.location.name,
                            'region':j.body.location.region,
                            'country':j.body.location.country,
                            'time':j.body.location.localtime,
                            'temp':j.body.current.temperature,
                            'red':j.body.current.observation_time
                        })

                    }
            

                })
}

module.exports=whe
    