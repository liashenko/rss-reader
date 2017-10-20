function showMsg(msg){
	const div = document.createElement('div');
	div.innerHTML = "<p></p>" + msg;
	const col = document.getElementById('col3');
	clearDiv(col);
	col.appendChild(div);
	document.getElementById('msg-statistics').style="display:block";
	const letters = msg.replace(/[^A-Z]/gi, "").toLowerCase();
	createChart(letters);
}

function createChart(letters){
	let ctx = document.getElementById("chart-statistics").getContext('2d');
	ctx.canvas.width = 300;
	ctx.canvas.height = 500;

	//key : letter, value : frequency of letter to total number of letters
	const dict = getLettersStatistics(letters, letters.length);

	const myChart = new Chart(ctx, {
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

function getLettersStatistics(text, charsNumber){
	let frequency = {};
	text.split('').forEach(function(s) {
	   frequency[s] ? frequency[s]++ : frequency[s] = 1;
	});	
	for (key in frequency){
		frequency[key] = (frequency[key] / charsNumber);
	}
	return frequency;
}

//clear html element
function clearDiv(content){
	while (content.hasChildNodes()) {
		content.removeChild(content.firstChild);
	}
}

//array of background colors for Chart
const backgroundColors = [
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