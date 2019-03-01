var data;
var levelIndex=0;
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
function setLevel(level){
    levelIndex=level;
    drawCharts();
}
function drawCharts(){
    var dataSet=prepareDataSet(levelIndex);
    var yLabel=["Convergence","First Step","First Goal count"];
    drawChart(dataSet.euclidean.convergence,dataSet.euclidean.firstStep,dataSet.euclidean.firstGoalCount,"chartContainerEuclideanFirst",levelIndex,yLabel,"Euclidean");
    drawChart(dataSet.manhattan.convergence,dataSet.manhattan.firstStep,dataSet.manhattan.firstGoalCount,"chartContainerManhattanFirst",levelIndex,yLabel,"Manhattan");
    yLabel=["Final Step","Percentange Incarese","Final Goal Count"];
    drawChart(dataSet.euclidean.finalStep,dataSet.euclidean.percentIncrease,dataSet.euclidean.finalGoalCount,"chartContainerEuclideanFinal",levelIndex,yLabel,"Euclidean");
    drawChart(dataSet.manhattan.finalStep,dataSet.manhattan.percentIncrease,dataSet.manhattan.finalGoalCount,"chartContainerManhattanFinal",levelIndex,yLabel,"Manhattan");
}
function prepareDataSet(levelIndex){
	var dataSet=new Object();
    dataSet.euclidean=new Object();
    dataSet.euclidean.convergence=[];
    dataSet.euclidean.firstStep=[];
    dataSet.euclidean.firstGoalCount=[];
    dataSet.euclidean.finalStep=[];
    dataSet.euclidean.finalGoalCount=[];
    dataSet.euclidean.percentIncrease=[];

    dataSet.manhattan=new Object();
    dataSet.manhattan.convergence=[];
    dataSet.manhattan.firstStep=[];
    dataSet.manhattan.firstGoalCount=[];
    dataSet.manhattan.finalStep=[];
    dataSet.manhattan.finalGoalCount=[];
    dataSet.manhattan.percentIncrease=[];
    
	for(var i=levelIndex;i<(levelIndex+4);i++){
        dataSet.euclidean.convergence[i-levelIndex]=new Object();
        dataSet.euclidean.convergence[i-levelIndex].label="Best Size "+parseInt(data[i+1][7]);
        dataSet.euclidean.convergence[i-levelIndex].y=parseFloat(data[i+1][0]);

        dataSet.euclidean.firstStep[i-levelIndex]=new Object();
        dataSet.euclidean.firstStep[i-levelIndex].label="Best Size "+parseInt(data[i+1][7]);
        dataSet.euclidean.firstStep[i-levelIndex].y=parseFloat(data[i+1][1]);

        dataSet.euclidean.firstGoalCount[i-levelIndex]=new Object();
        dataSet.euclidean.firstGoalCount[i-levelIndex].label="Best Size "+parseInt(data[i+1][7]);
        dataSet.euclidean.firstGoalCount[i-levelIndex].y=parseFloat(data[i+1][2]);
        
        dataSet.euclidean.finalStep[i-levelIndex]=new Object();
        dataSet.euclidean.finalStep[i-levelIndex].label="Best Size "+parseInt(data[i+1][7]);
        dataSet.euclidean.finalStep[i-levelIndex].y=parseFloat(data[i+1][3]);

        dataSet.euclidean.finalGoalCount[i-levelIndex]=new Object();
        dataSet.euclidean.finalGoalCount[i-levelIndex].label="Best Size "+parseInt(data[i+1][7]);
        dataSet.euclidean.finalGoalCount[i-levelIndex].y=parseFloat(data[i+1][4]);

        dataSet.euclidean.percentIncrease[i-levelIndex]=new Object();
        dataSet.euclidean.percentIncrease[i-levelIndex].label="Best Size "+parseInt(data[i+1][7]);
        dataSet.euclidean.percentIncrease[i-levelIndex].y=parseFloat(data[i+1][6]);

        dataSet.manhattan.convergence[i-levelIndex]=new Object();
        dataSet.manhattan.convergence[i-levelIndex].label="Best Size "+parseInt(data[i+21][7]);
        dataSet.manhattan.convergence[i-levelIndex].y=parseFloat(data[i+21][0]);

        dataSet.manhattan.firstStep[i-levelIndex]=new Object();
        dataSet.manhattan.firstStep[i-levelIndex].label="Best Size "+parseInt(data[i+21][7]);
        dataSet.manhattan.firstStep[i-levelIndex].y=parseFloat(data[i+21][1]);

        dataSet.manhattan.firstGoalCount[i-levelIndex]=new Object();
        dataSet.manhattan.firstGoalCount[i-levelIndex].label="Best Size "+parseInt(data[i+21][7]);
        dataSet.manhattan.firstGoalCount[i-levelIndex].y=parseFloat(data[i+21][2]);

        dataSet.manhattan.finalStep[i-levelIndex]=new Object();
        dataSet.manhattan.finalStep[i-levelIndex].label="Best Size "+parseInt(data[i+21][7]);
        dataSet.manhattan.finalStep[i-levelIndex].y=parseFloat(data[i+21][3]);

        dataSet.manhattan.finalGoalCount[i-levelIndex]=new Object();
        dataSet.manhattan.finalGoalCount[i-levelIndex].label="Best Size "+parseInt(data[i+21][7]);
        dataSet.manhattan.finalGoalCount[i-levelIndex].y=parseFloat(data[i+21][4]);

        dataSet.manhattan.percentIncrease[i-levelIndex]=new Object();
        dataSet.manhattan.percentIncrease[i-levelIndex].label="Best Size "+parseInt(data[i+21][7]);
        dataSet.manhattan.percentIncrease[i-levelIndex].y=parseFloat(data[i+21][6]);

	}
	return dataSet;
}
function drawChart(dataSetY1,dataSetY2,dataSetY3,chartDivId,level,yLabel,metric){
	var chart = new CanvasJS.Chart(chartDivId, {
		animationEnabled: true,
		title:{
            text: "Level "+(level+1)+" "+metric,
        },	
		axisY: {
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
			name: yLabel[0],
			legendText: yLabel[0],
			showInLegend: true, 
			dataPoints:dataSetY1
		},
		{
			type: "area",	
			name: yLabel[1],
			legendText: yLabel[1],
			showInLegend: true,
			dataPoints:dataSetY2
        },
        {
			type: "line",	
			name: yLabel[2],
			legendText: yLabel[2],
			showInLegend: true,
			dataPoints:dataSetY3
        }
    ]
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