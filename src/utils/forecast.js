const request=require('request')



const forecast=(latitude,longitude,callback)=>
{const url='http://api.weatherstack.com/current?access_key=a84cd99045443297c78ca4a5e94060be&query='+ latitude +','+ longitude 
request({url:url,json:true},(error,{body}={})=>
{if(error)
    {
        callback('Unable to connect to weather service!.',undefined)
    }
    else if(body.error)
    {
        callback('Unable to find location.',undefined)
    }
    else
    {

    
    callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+ ' degrees out.It feels like '+body.current.feelslike+' degrees out.Humidity is '+body.current.humidity+'%.')
    }
})
}
module.exports=forecast
