const stocks=['AAPL','MSFT','GOOGL','AMZN','PYPL','TSLA','JPM','NVDA','NFLX','DIS'];
const request=fetch(`https://stocks3.onrender.com/api/stocks/getstocksprofiledata`)

const response=request.then((response)=>{
    return response.json();
})


//const details=document.querySelector(".stockdetail")
var stockInfo;
response.then((data)=>{
    stockInfo=data.stocksProfileData[0];
    //details.textContent=data.stocksProfileData[0].AAPL.summary;
})



/// Stock buttons
const stockButtons=document.querySelector(".stock-buttons");
let stockButton;

for(let stock of stocks)
{
    stockButton=document.createElement('button');
    stockButton.textContent=stock;
    stockButtons.appendChild(stockButton);
}


/// Stock price and profir

const stockPriceAndProfit=fetch(`https://stocks3.onrender.com/api/stocks/getstockstatsdata`);
const stockPriceAndProfitdata= stockPriceAndProfit.then((response)=>{
    return response.json();
})

const stockbookvalue=document.querySelector(".stock-bookvalue");
const stockprofit=document.querySelector(".stock-profit");

var prices;
stockPriceAndProfitdata.then((data)=>{
    prices=data.stocksStatsData[0];
    let stockPrice;
    let stockProfit;
    for(let stock of stocks)
    {   stockPrice=document.createElement('span');
        stockProfit=document.createElement('span');
        stockPrice.textContent=`$${prices[stock].bookValue}`
        stockProfit.textContent=`${(prices[stock].profit).toFixed(2)}%`;
        if((prices[stock].profit).toFixed(2) == 0.00 )
        stockProfit.style.color='red';
        else
        stockProfit.style.color='#85ea85';
        stockbookvalue.appendChild(stockPrice);
        stockprofit.appendChild(stockProfit);
    }
})


// Buttons events

const stockButtonsEv=document.querySelectorAll(".stock-buttons button");
let name1=document.querySelector(".name");
let profit=document.querySelector(".profit");
let price=document.querySelector(".marketprice");
const details=document.querySelector(".stockdetail");
for(let btn of stockButtonsEv)
{
    btn.addEventListener("click",()=>{
        name1.textContent=btn.textContent;
        profit.textContent=`${(prices[btn.textContent].profit).toFixed(5)}%`;
        if((prices[btn.textContent].profit).toFixed(5)== 0.00000)
        profit.style.color='red'
        else
        profit.style.color='#85ea85'
        price.textContent=`$${prices[btn.textContent].bookValue}`;
        details.textContent=stockInfo[btn.textContent].summary;
        default_graph()
    })
}


/// Chart 1 month, 3 month, 1 year, 5 year

let adddurationbtn=document.querySelector(".durationBtns");
const durations=['1 Month','3 Month','1 Year','5 Year']
let durationBtn;
for(let duration of durations)
{
    durationBtn=document.createElement('button');
    durationBtn.textContent=duration;
    adddurationbtn.appendChild(durationBtn);
}

const stats=fetch("https://stocks3.onrender.com/api/stocks/getstocksdata")

const res=stats.then((res)=>{
    return res.json();
})

var timestampdata;
res.then((data)=>{
    timestampdata=data.stocksData[0];
    default_graph()
})

let durationButtons=document.querySelectorAll(".durationBtns button");
let myPlot=document.querySelector(".grapg");

function default_graph(){
    console.log(`In default graph`)
    let stockName=name1.textContent;
    let oneMonthtime;
    let oneMonthValues;
    console.log(timestampdata)
    oneMonthtime=timestampdata[stockName]['1mo'].timeStamp;
    oneMonthtime=oneMonthtime.map((dt)=> new Date(dt * 1000).toLocaleDateString())
    oneMonthValues=timestampdata[stockName]['1mo'].value;
    oneMonthValues=oneMonthValues.map((val)=>val.toFixed(2))
    let sname=[];
    for(let i=oneMonthtime.length;i>0;i--)
    {
        sname.push(stockName);
    }
    console.log(sname)
    var data = [{
        x: oneMonthtime,
        y: oneMonthValues,   
        hoverinfo: 'text+y',
        text:sname,
        mode:"lines",
        hovertemplate: '<b>%{text}: $%{y}'
      }];
      var layout = {
        shapes: [{
          type: 'line',
          xref: 'x',
          yref: 'paper',
          x0: oneMonthtime[0],
          x1: oneMonthtime[0],
          y0: 0,
          y1: 1,
          line: {
            color: 'red',
            width: 2,
          }
        }]
      };
      console.log(`printing text value ${data[0].text}`)
      Plotly.newPlot("myPlot", data,layout);
      var myPlot = document.getElementById('myPlot');
myPlot.on('plotly_hover', function(data) {
var hoverX = data.points[0].x;
Plotly.relayout('myPlot', {'shapes[0].x0': hoverX, 'shapes[0].x1': hoverX});
});
}


for(let btn of durationButtons)
{
    
    btn.addEventListener("click",()=>{
        let stockName=name1.textContent;
        let oneMonthtime;
        let oneMonthValues;
        console.log(`Button value  ${btn.textContent}`)
        if(btn.textContent === '1 Month')
        {
            console.log(timestampdata)
        oneMonthtime=timestampdata[stockName]['1mo'].timeStamp;
        oneMonthtime=oneMonthtime.map((dt)=> new Date(dt * 1000).toLocaleDateString())
        oneMonthValues=timestampdata[stockName]['1mo'].value;
        oneMonthValues=oneMonthValues.map((val)=>val.toFixed(2))
        }
        else if (btn.textContent === '3 Month')
        {
            console.log("in 3 month")
            oneMonthtime=timestampdata[stockName]['3mo'].timeStamp;
            oneMonthtime=oneMonthtime.map((dt)=> new Date(dt * 1000).toLocaleDateString())
            oneMonthValues=timestampdata[stockName]['3mo'].value;
            oneMonthValues=oneMonthValues.map((val)=>val.toFixed(2))
        }
        else if (btn.textContent === '1 Year')
        {
            console.log("in one year")
            oneMonthtime=timestampdata[stockName]['1y'].timeStamp;
            oneMonthtime=oneMonthtime.map((dt)=> new Date(dt * 1000).toLocaleDateString())
            oneMonthValues=timestampdata[stockName]['1y'].value;
            oneMonthValues=oneMonthValues.map((val)=>val.toFixed(2))
        }
        else if (btn.textContent === '5 year')
        {
            oneMonthtime=timestampdata[stockName]['5y'].timeStamp;
            oneMonthtime=oneMonthtime.map((dt)=> new Date(dt * 1000).toLocaleDateString())
            oneMonthValues=timestampdata[stockName]['5y'].value;
            oneMonthValues=oneMonthValues.map((val)=>val.toFixed(2))
        }
        else
        {
            oneMonthtime=timestampdata[stockName]['1mo'].timeStamp;
            oneMonthtime=oneMonthtime.map((dt)=> new Date(dt * 1000).toLocaleDateString())
            oneMonthValues=timestampdata[stockName]['1mo'].value;
            oneMonthValues=oneMonthValues.map((val)=>val.toFixed(2))
        }
        //console.log(oneMonthtime,"  ",oneMonthValues)
        let sname=[];
        for(let i=oneMonthtime.length;i>0;i--)
        {
            sname.push(stockName);
        }
        console.log(sname)
        var data = [{
            x: oneMonthtime,
            y: oneMonthValues,   
            hoverinfo: 'text+y',
            text:sname,
            mode:"lines",
            hovertemplate: '<b>%{text}: $%{y}'
          }];
          var layout = {
            shapes: [{
              type: 'line',
              xref: 'x',
              yref: 'paper',
              x0: oneMonthtime[0],
              x1: oneMonthtime[0],
              y0: 0,
              y1: 1,
              line: {
                color: 'red',
                width: 2,
              }
            }]
          };
          console.log(`printing text value ${data[0].text}`)
          Plotly.newPlot("myPlot", data,layout);
          var myPlot = document.getElementById('myPlot');
  myPlot.on('plotly_hover', function(data) {
    var hoverX = data.points[0].x;
    Plotly.relayout('myPlot', {'shapes[0].x0': hoverX, 'shapes[0].x1': hoverX});
  });

        

    })
}


