const request=require('request')
const url="https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true"
const covid=(callback)=>{
    request({url,json:true},(e,res)=>{
        if(e){
           callback({'e':'Unable to connect to get covid information'})
        }
        else{
       
           callback(res.body)
            
        }
    })
   
}
module.exports=covid