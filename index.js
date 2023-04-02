const express = require('express');
const app = express();
const port = 5623;
const https = require('https');
const http = require('http');
const cron = require('node-cron');
const repldb = require("./replDB.js")


async function makeHttpRequest(){
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
}
async function makeHttpsRequest(){
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

app.post('/', (req, res) => {
  if (req.body.serverType == "http" ) {
    repldb.addHttpServer(req.body.url)
  } else if (req.body.serverType == "https") {
    repldb.addHttpsServer(req.body.url)
  } else {
    console.log(req.body);
    
  }
    res.send('Data received');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});