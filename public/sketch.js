var data;
var totalLevel=5;
var parameterIndex=0;
var parameters=["Convergence","First Step","Goal Count","Final Step","Final Goal Count","Null percent","Percent Increase"];
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
	drawCharts();
}
function drawCharts(){
	var levelIndex=0;
	for(var i=0;i<totalLevel;i++){
		var dataSet=prepareDataSet(levelIndex);
		drawChart(dataSet,"chartContainerLevel"+(i+1));
		levelIndex+=4;
	}
}
function setParameter(index){
	parameterIndex=index;
	drawCharts();
}
function prepareDataSet(levelIndex){
	var dataSet=new Object();
	dataSet.euclidean=[];
	dataSet.manhattan=[];
	for(var i=levelIndex;i<(levelIndex+4);i++){
		dataSet.euclidean[i-levelIndex]=new Object();
		dataSet.euclidean[i-levelIndex].label="Best Size "+parseInt(data[i+1][7]);
		dataSet.euclidean[i-levelIndex].y=parseFloat(data[i+1][parameterIndex]);
		dataSet.manhattan[i-levelIndex]=new Object();
		dataSet.manhattan[i-levelIndex].label="Best Size "+parseInt(data[i+21][7]);
		dataSet.manhattan[i-levelIndex].y=parseFloat(data[i+21][parameterIndex]);
	}
	return dataSet;
}
function drawChart(dataSet,chartDivId){
	var chart = new CanvasJS.Chart(chartDivId, {
		animationEnabled: true,
		title:{
			text: "Level "+chartDivId[chartDivId.length-1]+" "+parameters[parameterIndex] +" Chart"
		},	
		axisY: {
			title: parameters[parameterIndex],
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
			indexLabel:"{y}",
			showInLegend: true, 
			dataPoints:dataSet.euclidean
		},
		{
			type: "column",	
			name: "Manhattan",
			legendText: "Manhattan Distance",
			indexLabel:"{y}",
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