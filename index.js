var express = require('express');
var feed = require('feed-read');
var app = express();

var urls = [
	"http://feeds.skynews.com/feeds/rss/technology.xml",
	"https://www.wired.com/category/gear/feed/",
	"http://www.economist.com/sections/science-technology/rss.xml",
	"https://habrahabr.ru/rss/hubs/all/"
]; 

app.use(express.static('public'));
app.set('view engine', 'ejs');

function countAuthors(articles){	
	var authors = new Set();
	for(i in articles)
		if(articles[i].author!='')
			authors.add(articles[i].author);
	return authors.size;
}

function showRSS(res, urlId){
	var content = [];
	feed(urls[urlId], function(err, articles) {
		if (err)
		    console.log(err);
		res.render('pages/index', 
			{urls: urls, content: articles, authorsCount: countAuthors(articles)});
	}); 
}

app.get('/', function (req, res) { 
	res.render('pages/index', {urls: urls});
});

app.get('/channel/add', function(req,res){
	var newChannel = req.param('newchannel');
	urls.push(newChannel);
  	res.redirect('/');
});

app.get('/channel/delete/:channelId', function(req,res){	
	var id = req.params['channelId'];
	urls.splice(id,1);
  	res.redirect('/');
});

app.get('/channel/:channelId', function (req, res) { 
	var id = req.params['channelId'];
	showRSS(res, id);
});


app.listen(3000, function () {
  console.log('listening on port 3000!');
});