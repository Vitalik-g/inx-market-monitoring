const {Builder, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');


let create = async ()=>{
     global['driver'] =await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
    require('./selenium-parsedate')
}
create()
