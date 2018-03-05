const puppeteer = require('puppeteer');

const PAGE_URL = "https://www.okex.com/spot.html";

const watch = async ()=>{
    const box = await puppeteer.launch();
    const page = await box.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    

    await page.goto(PAGE_URL);
    //table[data-key="spot-btc"]

    const getTopDeals = ()=>{
        const btcSpotTable = document.querySelectorAll('div#coinBubble>table[data-key="spot-btc"]')[0];
        if (!btcSpotTable){
            throw new Exception("unable to find the body");
        }
        const topRows = Array.from(btcSpotTable.querySelectorAll('tbody>tr'));
        return topRows.map((row)=>{
            const percentChanged = parseFloat(row.querySelector('td#bannerChangePercentage>span').textContent);
            return { 
                symbol: row.dataset.symbol,
                percentChanged: percentChanged 
            }
        });
    }



    const test = async ()=>{
        const topDeals = await page.evaluate(getTopDeals);
        if (topDeals.length){
            // topDeals.slice(3).map(x=>{
                
            // })
            const x = topDeals[0];
            console.log('top', Date.now().toString(), x.symbol, x.percentChanged);
        }
    }

    page.on('response', ()=>{
        test();
    });
    
    
}

watch();