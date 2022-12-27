let links = ['https://one.inx.co/trading/BTC-USD',
'https://one.inx.co/trading/ETH-USD',
'https://one.inx.co/trading/ETH-BTC',
'https://one.inx.co/trading/USDC-USD',
'https://one.inx.co/trading/BTC-USDC',
'https://one.inx.co/trading/ETH-USDC',
'https://one.inx.co/trading/ZEC-USD',
'https://one.inx.co/trading/LTC-USD',
'https://one.inx.co/trading/ZEC-BTC',
'https://one.inx.co/trading/LTC-BTC',
'https://one.inx.co/trading/USD-GYEN',
'https://one.inx.co/trading/BTC-GYEN',
'https://one.inx.co/trading/ZUSD-GYEN',
'https://one.inx.co/trading/ZUSD-USD',
'https://one.inx.co/trading/BTC-ZUSD',
'https://one.inx.co/trading/AVAXC-BTC',
'https://one.inx.co/trading/SAND-USD',
'https://one.inx.co/trading/MATIC-USD',
'https://one.inx.co/trading/MANA-USD',
]








const {By,Key, Actions} = require('selenium-webdriver');
let createTabs = async ()=>{
    driver.get(links[0])
    for(let i=1; i!=links.length;i++){
        await driver.switchTo().newWindow('tab');
        
        driver.get(links[i])
        
    }      
    startParse ()
}
createTabs()


function startParse (){
    var doneFlag = true
    setInterval(async()=>{
        if(!doneFlag){
            return
        }
        doneFlag = false
        var localarryMarketData = []
        // console.log( await driver.findElement(By.className('orderBookTable_chart__3geWV')).getAttribute('innerHTML'));
        let arryTabs = await driver.getAllWindowHandles()
        for(let i=0; i!= arryTabs.length; i++) {
            await driver.switchTo().window(arryTabs[i]);
            let url = await driver.getCurrentUrl()
            
                
                let orderBookArry = await driver.findElement(By.className('orderBook_content__K0Dbc')).findElements(By.className('vtable_sizer__F5wqW'))
                let nameMarket = url.replace('https://one.inx.co/trading/','')
                let jsonTemp = {
                    
                    name:  nameMarket,
                    graf:await driver.findElement(By.className('orderBookTable_chart__UpNt9')).getAttribute('innerHTML'),
                    buyBookSize: pidarArryCount(await orderBookArry[0].findElements(By.className('orderBookTable_tableRow__yCKbq'))),
                    sellBookSize:pidarArryCount(await orderBookArry[1].findElements(By.className('orderBookTable_tableRow__yCKbq'))),
                    price: await driver.findElement(By.className('orderBook_header__value__NsTcZ')).getAttribute('innerHTML')
                }
            
                localarryMarketData.push(jsonTemp)
            
        }
        global['arryMarketData'] = localarryMarketData
        // console.log(global['arryMarketData'])
        doneFlag = true;
        
    },500)    
}

function pidarArryCount(arry){
    for(var i=0; i<1000;i++){
        if(arry[i]==undefined){
            return i
        }
    }
}
function array_diff(a, b) {
    return a.filter(function(value) {
        return (b.indexOf(value) === -1);
    });
}
console.log(array_diff(["a", "b", "c"], ["a", "b"]));
