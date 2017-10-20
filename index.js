const express = require('express');
const feed = require('feed-read');
const app = express();

let urls = [
	"http://feeds.skynews.com/feeds/rss/technology.xml",
	"https://www.wired.com/category/gear/feed/",
	"http://www.economist.com/sections/science-technology/rss.xml",
	"https://habrahabr.ru/rss/hubs/all/"
]; 

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) { 
	res.render('pages/index', {urls: urls});
});

app.get('/channel/add', function(req,res){
	const newChannel = req.param('newchannel');
	urls.push(newChannel);
  	res.redirect('/');
});

app.get('/channel/delete/:channelId', function(req,res){	
	const id = req.params['channelId'];
	urls.splice(id,1);
  	res.redirect('/');
});

app.get('/channel/:channelId', function (req, res) { 
	const id = req.params['channelId'];	
	feed(urls[id], function(err, articles) {
		res.render(
			'pages/index', 
			{
				urls: urls, 
				content: articles, 
				authorsCount: [...new Set(articles.map(article => article.author).filter(author => author!=''))].length
			}
		);
	}); 
});


app.listen(3000, function () {
  console.log('listening on port 3000!');
});