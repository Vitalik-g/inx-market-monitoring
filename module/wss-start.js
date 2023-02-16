const WebSocket = require('ws')

function checkStart(){
    try{
        var ws = new WebSocket('wss://one.inx.co/socket.io/?EIO=4&transport=websocket', {
            perMessageDeflate: false  
        });
    }  catch{
        console.log("Error connect socket");
    }
    let stop = false

    let i = 0

    let markets = [
        'BTC-USD',   'ETH-USD',   'ZEC-USD',
        'LTC-USD',   'ETH-BTC',   'LTC-BTC',
        'ZEC-BTC',   'ETH-USDC',  'USDC-USD',
        'BTC-USDC',  'ZUSD-USD',  'BTC-ZUSD',
        'BTC-GYEN',  'ZUSD-GYEN', 'USD-GYEN',
        'AVAXC-USD', 'AVAXC-BTC', 'SAND-USD',
        'MANA-USD',  'LINK-USD',  'MATIC-USD',
        'FTM-USD',   'YFI-USD',   'UNI-USD',
        'CRV-USD',   'AAVE-USD',  'COMP-USD',
        'INX-USD',   'MSTO-USD'
    ]
    let marketsarray =[]

    ws.on('message', (data)=> {
        if (i==0){
            //Якась внутрішня перевірка ІНХ (Без не працює)
            ws.send('40')
            i++
        }else if(i==1){
            //Якась внутрішня перевірка ІНХ (Без не працює)
            ws.send('42["/ticker/subscribeTicker"]')
            i++
        }
        else if(i==2){
            /*
                Розкоментувати якщо хочемо отримувати маркети відразу від ІНХ
            */

            // let infoMarkets = JSON.parse(data.toString().substring(2))[1].payload
            // infoMarkets.map((element)=>{
            //     markets.push(element[0])
            // })
            i += 5
            start()
        }
        else if (i > 5){
            try{
                let infoMarket = JSON.parse(data.toString().substring(2))
                if (infoMarket[0] == 'ORDER_BOOK' && !stop){ 
                    let price = "No Data"
                    try{
                        price = infoMarket[1].BUY[0].price
                    }catch{}
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
                stop = true
                ws.close()
            }
            
        }
        // console.log(data.toString());
    });
    ws.on("error", (data)=>{
        console.log("Web socket error");
        console.log(data);
    })
    function start(){
        markets.map((element)=>{
            try{
                ws.send(`42["/orderBook/subscribeOrderBook",{"marketName":"${element}","precisionOffset":0,"depth":25}]`)
            }catch{
                console.log("Unable to create request 42 /orderBook/subscribeOrderBook");
            }
        })
    }
}
checkStart()
setInterval(()=>{
    checkStart()
},5000)
