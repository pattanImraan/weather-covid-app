console.log("client side js")
function fun(){
    document.getElementById('in').innerHTML=""
    var name=document.getElementById('fname').value
    if(name==''){
        document.getElementById('in').innerHTML='<div class="formcontainer"><p style="color:rgb(228, 79, 42);">Please provide a search name </p></div>';
    }
    else{
        document.getElementById('in').innerHTML=""
        document.getElementById('in').innerHTML="<div class='loader'>Loading...</div>"
        var url='/weather?search='+name
        
        fetch(url).then((cres)=>{
            cres.json().then((data)=>{
                console.log(data)
                if(data.e){
                    s=data.e
                    document.getElementById('fname').value=""
                    document.getElementById('in').innerHTML=""
                    document.getElementById('in').innerHTML='<div class="formcontainer"><p style="color:rgb(228, 79, 42);">'+s+'</p></div>' 
                }
                else{
                    s=data.name+", "+data.region+", "+data.country
                    +"<br><br>Local_Time : "+data.time
                    +"<br><br><b>Temperature : "+data.temp+" °C</b>"
                    +"<br><br>Last_Updated : "+data.red
                    document.getElementById('fname').value=""
                    document.getElementById('in').innerHTML=""
                    document.getElementById('in').innerHTML='<div class="formcontainer"><p>'+s+'</p></div>'       
                }
            })
        })       
    }
}

//----------------------------------------------------------------------covid function
    var cov
function covidFun(){
    i=parseInt(document.getElementById('country').value)
    if(cov===undefined){
        document.getElementById('in').innerHTML=""
        document.getElementById('in').innerHTML="<div class='loader'>Loading...</div>"
    const covurl="https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true"
    fetch(covurl).then((cres)=>{
        cres.json().then((data)=>{
        cov=data   
        window.cov=data 
        document.getElementById('in').innerHTML=""
        data=cov.regionData[i]
        active=data.totalInfected-data.recovered-data.deceased
        s='<b>Region : '+data.region+'</b><br><br>Last_Updated : '+cov.lastUpdatedAtApify+'<br><br>Total_Infected : '+data.totalInfected+'<br><br>Recovered : '+data.recovered+'<br><br>Deaths : '+data.deceased+'<br><br><b>Present_Active_Cases : '+active+'</b>'
        document.getElementById('in').innerHTML='<div class="formcontainer"><p>'+s+'</p></div>'
        console.log(data) 
        })
    }) 
    }
    else{
        data=cov.regionData[i]
        active=data.totalInfected-data.recovered-data.deceased
        s='<b>Region : '+data.region+'</b><br><br>Last_Updated : '+cov.lastUpdatedAtApify+'<br><br>Total_Infected : '+data.totalInfected+'<br><br>Recovered : '+data.recovered+'<br><br>Deaths : '+data.deceased+'<br><br><b>Present_Active_Cases : '+active+'</b>'
        document.getElementById('in').innerHTML='<div class="formcontainer"><p>'+s+'</p></div>'
        console.log(cov)
    }
}

 

