const { wc } = require('wc');
const WebSocket = require('ws')

function checkStart(){
    var ws = new WebSocket('wss://one.inx.co/socket.io/?EIO=4&transport=websocket', {
        perMessageDeflate: false  
    });
    let stop = false

    let i = 0

    let markets = []
    let marketsarray =[]

    ws.on('message', function message(data) {
        if (i==0){
            ws.send('40')
            i++
        }else if(i==1){
            ws.send('42["/ticker/subscribeTicker"]')
            i++
        }
        else if(i==2){
            let infoMarkets = JSON.parse(data.toString().substring(2))[1].payload
            infoMarkets.map((element)=>{
                markets.push(element[0])
            })
            i += 5
            start()
        }
        else if (i > 5){
            try{
                let infoMarket = JSON.parse(data.toString().substring(2))
                if (infoMarket[0] == 'ORDER_BOOK' && !stop){
                    // console.log(infoMarket[1]); 
                    let price = 0
                    try{
                        price = infoMarket[1].BUY[0].price
                    }catch{}
                    if(price == 0){
                        return
                    }
                    let market  = {
                        "name":infoMarket[1].marketName,
                        "buyBookSize":infoMarket[1].BUY.length,
                        "sellBookSize":infoMarket[1].SELL.length,
                        "price":price,
                        "url":"https://one.inx.co/trading/"+infoMarket[1].marketName
                     }
                    marketsarray.push(market)
                    //console.log(infoMarket[1].BUY[0]);
                }
            }catch{
                global["arryMarketData"] = marketsarray
                //console.log('erroe');
                stop = true
                ws.close()
            }
            
        }
        // console.log(data.toString());
    });

    function start(){
        markets.map((element)=>{
            ws.send(`42["/orderBook/subscribeOrderBook",{"marketName":"${element}","precisionOffset":0,"depth":25}]`)
        })
    }
}
checkStart()
setInterval(()=>{
    checkStart()
},5000)
