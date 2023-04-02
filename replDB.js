const Database = require("@replit/database");
const db = new Database();

async function addHttpServer(url) {
	
	let urls = await db.get("httpServers") || [];

	urls.push(url);
	let setOfUrls = new Set(urls);
	let values = setOfUrls.values();

	await db.set("httpServers",Array.from(values));
console.log(setOfUrls)
  
}
async function addHttpsServer(url) {
	
	let urls = await db.get("httpsServers") || [];

	urls.push(url);
	let setOfUrls = new Set(urls);
	let values = setOfUrls.values();

	await db.set("httpsServers",Array.from(values));
console.log(setOfUrls);
  
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