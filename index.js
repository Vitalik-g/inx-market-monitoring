const express = require('express')
const app = express()
const https = require('https')

const port = 3000
require('./module/selenium-start')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/data',(req,res)=>{
    try{
        res.send(arryMarketData)
    }catch(e){res.send([])}
    
})
app.get('/price',(req,res)=>{
    updateMarketPrice(res)
})

var data = {'time':00}
function updateMarketPrice(res){
    if(data.time+60000>Date.now()){
        res.send(data.data)
    }else{
        
        let options = {
            hostname: 'www.bitstamp.net',
            port: 443,
            path: '/api-internal/market/prices/?step=1800&start=2023-01-05T00:00:00.252Z&end=2023-01-05T00:00:00.252Z&pairs=btcusd&pairs=ethusd',
            method: 'GET'
        }
        let hreq = https.request(options, resp => {      
            resp.on('data', d => {
                data.time = Date.now()
                data.data=d.toString()
                res.send(data.data)
            })
        })
        hreq.on('error', error => {
            res.send('error')
        })
          
        hreq.end()
    }
}


app.set('view engine', 'ejs');
app.use(express.static('static'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
