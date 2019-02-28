var data;
var totalLevel=4;
var config={
	delimiter: "",	// auto-detect
	newline: "",	// auto-detect
	quoteChar: '"',
	escapeChar: '"',
	header: false,
	transformHeader: undefined,
	dynamicTyping: false,
	preview: 0,
	encoding: "",
	worker: false,
	comments: false,
	step: undefined,
	complete: parsingComplete,
	error: undefined,
	download: true,
	skipEmptyLines: false,
	chunk: undefined,
	fastMode: undefined,
	beforeFirstChunk: undefined,
	withCredentials: undefined,
	transform: undefined,
	delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
};
function setup(){
    Papa.parse("https://raw.githubusercontent.com/NitheeshPrabu/NEATRacey/simulation/run-results/results.csv",config);
}
function parsingComplete(result,file){
    data=result.data;
	var levelIndex=0;
	for(var i=0;i<totalLevel;i++){
		var dataSet=prepareDataSet(levelIndex);
		drawChart(dataSet,"chartContainerLevel"+(i+1));
		levelIndex+=4;
	}
	
}
function prepareDataSet(levelIndex){
	var dataSet=new Object();
	dataSet.euclidean=[];
	dataSet.manhattan=[];
	for(var i=levelIndex;i<(levelIndex+4);i++){
		dataSet.euclidean[i-levelIndex]=new Object();
		dataSet.euclidean[i-levelIndex].label="Best Size "+parseInt(data[i+1][7]);
		dataSet.euclidean[i-levelIndex].y=parseInt(data[i+1][0]);
		dataSet.manhattan[i-levelIndex]=new Object();
		dataSet.manhattan[i-levelIndex].label="Best Size "+parseInt(data[i+17][7]);
		dataSet.manhattan[i-levelIndex].y=parseInt(data[i+17][0]);
	}
	return dataSet;
}
function drawChart(dataSet,chartDivId){
	var chart = new CanvasJS.Chart(chartDivId, {
		animationEnabled: true,
		title:{
			text: "Level "+chartDivId[chartDivId.length-1]+" Convergence Chart"
		},	
		axisY: {
			title: "Convergence",
			titleFontColor: "#4F81BC",
			lineColor: "#4F81BC",
			labelFontColor: "#4F81BC",
			tickColor: "#4F81BC"
		},	
		toolTip: {
			shared: true
		},
		legend: {
			cursor:"pointer",
			itemclick: toggleDataSeries
		},
		data: [{
			type: "column",
			name: "Euclidean",
			legendText: "Euclidean Distance",
			showInLegend: true, 
			dataPoints:dataSet.euclidean
		},
		{
			type: "column",	
			name: "Manhattan",
			legendText: "Manhattan Distance",
			showInLegend: true,
			dataPoints:dataSet.manhattan
		}]
	});
	chart.render();
	function toggleDataSeries(e) {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}
}