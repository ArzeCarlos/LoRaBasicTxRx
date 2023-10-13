"use strict";
const MAX_DATA_COUNT = 20;
var myCircle1=Circles.create({
	id:'circles-1',
	radius:45,
	value:60,
	maxValue:100,
	width:7,
	text: 5,
	colors:['#f1f1f1', '#FF9E27'],
	duration:400,
	wrpClass:'circles-wrp',
	textClass:'circles-text',
	styleWrapper:true,
	styleText:true
});
var myCircle2=Circles.create({
	id:'circles-2',
	radius:45,
	value:70,
	maxValue:100,
	width:7,
	text: 36,
	colors:['#f1f1f1', '#2BB930'],
	duration:400,
	wrpClass:'circles-wrp',
	textClass:'circles-text',
	styleWrapper:true,
	styleText:true
});
var myCircle3=Circles.create({
	id:'circles-3',
	radius:45,
	value:12,
	maxValue:100,
	width:7,
	text: 12,
	colors:['#f1f1f1', '#F25961'],
	duration:400,
	wrpClass:'circles-wrp',
	textClass:'circles-text',
	styleWrapper:true,
	styleText:true
});
//Notify
$.notify({
	icon: 'flaticon-alarm-1',
	title: 'Info',
	message: 'Hello! Please emphasize that you never provide your username and password to any user.',
},{
	type: 'info',
	placement: {
		from: "bottom",
		align: "right"
	},
	time: 1000,
});

// JQVmap
$('#map-example').vectorMap(
{
	map: 'world_en',
	backgroundColor: 'transparent',
	borderColor: '#fff',
	borderWidth: 2,
	color: '#e4e4e4',
	enableZoom: true,
	hoverColor: '#35cd3a',
	hoverOpacity: null,
	normalizeFunction: 'linear',
	scaleColors: ['#b6d6ff', '#005ace'],
	selectedColor: '#35cd3a',
	selectedRegions: ['BO'],
	showTooltip: true,
	onRegionClick: function(element, code, region)
	{
		return false;
	}
});

//Chart

var ctx = document.getElementById('statisticsChart').getContext('2d');

var statisticsChart = new Chart(ctx, {
	type: 'line',
	data: {
		datasets: [ {
			label: "CO",
			borderColor: '#f3545d',
			pointBackgroundColor: 'rgba(243, 84, 93, 0.6)',
			pointRadius: 0,
			backgroundColor: 'rgba(243, 84, 93, 0.4)',
			legendColor: '#f3545d',
			fill: true,
			borderWidth: 2,
		}],
	},
	options : {
		responsive: true, 
		maintainAspectRatio: false,
		legend: {
			display: false
		},
		tooltips: {
			bodySpacing: 4,
			mode:"nearest",
			intersect: 0,
			position:"nearest",
			xPadding:10,
			yPadding:10,
			caretPadding:10
		},
		layout:{
			padding:{left:5,right:5,top:15,bottom:15}
		},
		scales: {
			yAxes: [{
				ticks: {
					fontStyle: "500",
					beginAtZero: false,
					maxTicksLimit: 5,
					padding: 10
				},
				gridLines: {
					drawTicks: false,
					display: false
				}
			}],
			xAxes: [{
				gridLines: {
					zeroLineColor: "transparent"
				},
				ticks: {
					padding: 10,
					fontStyle: "500"
				}
			}]
		}, 
		legendCallback: function(chart) { 
			var text = []; 
			text.push('<ul class="' + chart.id + '-legend html-legend">'); 
			for (var i = 0; i < chart.data.datasets.length; i++) { 
				text.push('<li><span style="background-color:' + chart.data.datasets[i].legendColor + '"></span>'); 
				if (chart.data.datasets[i].label) { 
					text.push(chart.data.datasets[i].label); 
				} 
				text.push('</li>'); 
			} 
			text.push('</ul>'); 
			return text.join(''); 
		}  
	}
});
function addData(label, data) {
	statisticsChart.data.labels.push(label);
	statisticsChart.data.datasets.forEach((dataset) => {
	  dataset.data.push(data);
	});
	statisticsChart.update();
  }
function removeFirstData() {
	statisticsChart.data.labels.splice(0, 1);
	statisticsChart.data.datasets.forEach((dataset) => {
	  dataset.data.shift();
	});
}
const options = {
	connectTimeout: 4000,
  
	// Authentication
	clientId: "iotmc",
	username: "web_client",
	password: "123456",
  
	keepalive: 60,
	clean: true,
};
var connected = false;
const WebSocket_URL = "ws://localhost:8083/mqtt";
const client = mqtt.connect(WebSocket_URL, options);
client.on("connect", () => {
  console.log("Mqtt conectado por WS!");
  client.subscribe("values", { qos: 0 }, (error) => {
    if (!error) {
      console.log("Suscripción exitosa!");
    } else {
      console.log("Suscripción fallida!");
    }
  });
  client.subscribe("values2", { qos: 0 }, (error) => {
    if (!error) {
      console.log("Suscripción exitosa2!");
    } else {
      console.log("Suscripción fallida2!");
    }
  });
  // publish(topic, payload, options/callback)
  client.publish("fabrica", "esto es un verdadero éxito", (error) => {
    console.log(error || "Mensaje enviado!!!");
  });
});
var myLegendContainer = document.getElementById("myChartLegend");

// generate HTML legend
myLegendContainer.innerHTML = statisticsChart.generateLegend();

// bind onClick event to all LI-tags of the legend
var legendItems = myLegendContainer.getElementsByTagName('li');
for (var i = 0; i < legendItems.length; i += 1) {
	legendItems[i].addEventListener("click", legendClickCallback, false);
}
client.on("message", (topic, message) => {
	console.log(
	  "Mensaje recibido bajo tópico: ",
	  topic,
	  " -> ",
	  message.toString()
	);
	if (statisticsChart.data.labels.length > MAX_DATA_COUNT) {
	  removeFirstData();
	}
	addData(new Date().getTime(), message.toString());
	myCircle3._text=message.toString();
	myCircle3._value=message.toString();
	myCircle3._generate().update(true);
	var elemento=document.getElementById("nodeState4");
    elemento.innerHTML=`${message.toString()}`;
  });
  
  client.on("reconnect", (error) => {
	console.log("Error al reconectar", error);
  });
  
  client.on("error", (error) => {
	console.log("Error de conexión:", error);
  });
  