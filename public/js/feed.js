function showMsg(msg){
	var col = document.getElementById('col3');
	var div = document.createElement('div');
	div.innerHTML = "<p></p>" + msg;
	clearDiv(col);
	col.appendChild(div);
	document.getElementById('msg-statistics').style="display:block";
	var letters = getLetters(msg).toLowerCase();
	createChart(letters);
}

function createChart(msg){
	var ctx = document.getElementById("chart-statistics").getContext('2d');
	ctx.canvas.width = 300;
	ctx.canvas.height = 500;

	//fill dictionary, key:letter, value: number of letter in msg
	var dict = getLettersStatistics(msg, msg.length);

	var myChart = new Chart(ctx, {
	  type: 'pie',
	  data: {
	    labels: Object.keys(dict),
	    datasets: [{
	      backgroundColor: backgroundColors,
	      data: Object.values(dict)
	    }]
	  }
	});
}

function getLettersStatistics(str, num){
	var map = {};
	//count letters in message
	for(i in str){
		if(map[str[i]]==undefined)
			map[str[i]] = 1;
		else{
			++map[str[i]];
		}
	}
	//number of letter to number of letters
	for (m in map){
		map[m] = (map[m] / num);
	}
	return map;
}

function getLetters(str){
	return str.replace(/[^A-Z]/gi, "");
}

//clear html element
function clearDiv(content){
	while (content.hasChildNodes()) {
		content.removeChild(content.firstChild);
	}
}

//array of background colors for Chart
backgroundColors = [
    "#2ecc71",
    "#3498db",
    "#95a5a6",
    "#9b59b6",
    "#f1c40f",
    "#e74c3c",
    "#344c5e",
    "#9b59a6",
    "#f1c42f",
    "#e74c1c",
    "#34195e",	        
    "#9b21b6",
    "#31c201",
    "#274b31",
    "#144a51",
    "#31a95e",	        
    "#9b2cc6",
    "#31cff1",
    "#aa4w31",
    "#1cc151",
    "#31a9aa",	        
    "#e2cc6a",
    "#a1cffc",
    "#ab2w3a",
    "#1ac121",
    "#aaaaaa",
]