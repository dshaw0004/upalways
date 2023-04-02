const Database = require("@replit/database");
const db = new Database();
const addLogs = require("./addLogs.js")

async function addHttpServer(url) {
  try{
    let urls = await db.get("httpServers") || [];
	  urls.push(url);
	  let setOfUrls = new Set(urls);
    let values = setOfUrls.values();
	  await db.set("httpServers",Array.from(values));
    addLogs(1, `\nTime :- ${new Date().toISOString()}\n url added to HTTP :- ${url}`)
    return "your url is been added"
  }catch(err) {
    addLogs(2, `\nTime :- ${new Date().toISOString()}\n Error at HTTP :- ${err.message}`)
    return "something went wrong"
  }  
}
async function addHttpsServer(url) {
  try {
    let urls = await db.get("httpsServers") || [];
  	urls.push(url);
	  let setOfUrls = new Set(urls);
	  let values = setOfUrls.values();
  	await db.set("httpsServers",Array.from(values));
    addLogs(1, `\nTime :- ${new Date().toISOString()}\n url added to HTTP :- ${url}`)
    return "your url is been added"
  }catch(err) {
    addLogs(2, `\nTime :- ${new Date().toISOString()}\n Error at HTTPS :- ${err.message}`)
    return "something went wrong"
  } 
}
async function getHttpsUrl() {
	const allUrls =await db.get("httpsServers")
	return allUrls
}
async function getHttpUrl() {
	const allUrls =await db.get("httpServers")
	return allUrls
}

module.exports = { addHttpServer,addHttpsServer, getHttpUrl,getHttpsUrl};