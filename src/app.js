//importing requirements
const forcast=require("./utils/forecast.js")
const forlatlong=require("./utils/forlatlong.js")
const geocode=require('./utils/geocode.js')
const covid=require('./utils/covid.js')
const express=require('express')
const path=require('path')
const hbs=require('hbs')

const app=express()

//defining paths for express configuration 
const publicPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setting the express engine and configuring views and partials in templates dir
app.set('view engine','hbs')
app.set('views',viewPath)

hbs.registerPartials(partialsPath)

//serving static directories
app.use(express.static(publicPath))


// app.get('/',(req,res)=>{
//  console.log(req)
//  res.send("hello welsome to the express world")
// })

const obj={
    'index':'weather',
    'about':'about developer',
    'help':'To contact please mail us',
    'name':'Imraan Pattan',
}

app.get('',(req,res)=>{
    res.render("index")
})
app.get('/weather',(req,res)=>{
    if(!req.query.search){
        return res.send({
            'e':'Please enter a location'
        })
    }

            forcast(req.query.search,(e,jobj)=>{
                if(e===false){
                    jobj.sname=req.query.search
                    res.send(jobj)
                }
                else{
                    geocode(req.query.search,(e,lat,long)=>{
                        if(e===false){
                            forlatlong(lat,long,(e,jobj)=>{
                                if(e===false){
                                    jobj.sname=req.query.search
                                    res.send(jobj)
                                }
                                else{
                                    res.send(e)
                                }
                            })
                 
                        }
                        else{
                            res.send(e)
                        }
                
                    })
                   
                }
            })    
})

app.get('/about',(req,res)=>{
    res.render("about",obj)
})

app.get('/help',(req,res)=>{

        res.render("help",obj)
})

app.get('/covid',(req,res)=>{
    res.render('covid')
})

app.get('/covidjson',(req,res)=>{
   covid((jobj)=>{
        res.send(jobj)
   }) 
})

// app.get('',(req,res)=>{
//     if(!req.query.search){
//         return res.render("index")
//     }

    // geocode(req.query.search,(e,lat,long)=>{
    //     if(e===false){
    //         forcast(lat,long,(e,obj)=>{
    //             if(e===false){
    //                 obj.sname=req.query.search
    //                 res.render("index",obj)
    //             }
    //             else{
    //                 res.render("index",e)
    //             }
    //         })
 
    //     }
    //     else{
    //         res.render("index",e)
    //     }

    // })
    
// })

app.get('*',(req,res)=>{
    res.render("404")
})



app.listen(3000,()=>{
    console.log("server started at http://127.0.0.1:3000")
})