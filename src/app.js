const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()
const port=process.env.PORT || 3000

//Define path for express configuration
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>
{
    res.render('index',{
        title:'Weather',
        name:'Vivek Kumar Pandey'
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'About Me',
        name:'Vivek Kumar Pandey'
    })
})
app.get('/help',(req,res)=>
{
    res.render('help',{
        title:'Help',
        name:'Vivek Kumar Pandey'

    })
})

app.get('/weather',(req,res)=>
{
if(!req.query.address)
{
   return res.send({
        error:'Address must be provided.'
    })
}

const address=req.query.address
geocode(address,(error,{latitude,longitude,location}={})=>
{
if(error)
{
    return res.send({
        error
    })
}
forecast(latitude,longitude,(error,forecastData)=>
{if(error)
    {
        return res.send({error})
    }

res.send({
forecast:forecastData,location,address})
})

})
})


app.get('/help/*',(req,res)=>
{
    res.render('404',
    {
        errorMessage:'Help article not found',  name:'Vivek Kumar Pandey',
        title:'404'
    }
    

    )
})

app.get('*',(req,res)=>
{
    res.render('404',{
        errorMessage:'Page not found',
        name:'Vivek Kumar Pandey',
        title:'404'
    })
})

app.listen(port,()=>
{
    console.log('Server is up on port '+port)
})