const express = require('express');
const app = express();
const port = 5623;
const https = require('https');
const http = require('http');
const cron = require('node-cron');
const repldb = require("./replDB.js")
const addLogs = require("./addLogs.js")


async function makeHttpRequest(){
  try{
    const allUrls = await repldb.getHttpUrl() || []
    if(allUrls.length === 0){
    // console.log("no urls for http")
    return
    }
    allUrls.map(url => { 
      http.get(url, (res) => {
        // console.log(`STATUS: ${res.statusCode}`);
        return ;
      }).on('error', (e) => {
        console.error(`ERROR: ${e.message}`);
      });
    })
  }catch(err){
    addLogs(2, `\nTime :- ${new Date().toISOString()}\n Error at makeHttpRequest :- ${err.message}`)
  }
}
async function makeHttpsRequest(){
  try{
    const allUrls = await repldb.getHttpsUrl() || []
    if(allUrls.length === 0){
       // console.log("no urls for https")
      return 
    }
    allUrls.map(url =>{
      https.get(url, (res) => {
        // console.log(`STATUS: ${res.statusCode}`);
        return;
      }).on('error', (e) => {
        console.error(`ERROR: ${e.message}`);
      });
    })
  }catch(err){
    addLogs(2, `\nTime :- ${new Date().toISOString()}\n Error at makeHttpsRequest :- ${err.message}`) 
  }
}

cron.schedule('*/1 * * * *',()=>{
  makeHttpsRequest();
  makeHttpRequest()
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/',async  (req, res) => {
  let url = req.body.url || ""
  if(url.length === 0){
    res.send("add a url to proceed")
    return 
  }
  let response = ""
  if (req.body.serverType == "http" ) {
    response = await repldb.addHttpServer(url)
  } else if (req.body.serverType == "https") {
    response = await repldb.addHttpsServer(url)
  } else {
    console.log(req.body);
  }
    res.send(response);
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
