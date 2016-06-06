var commas = d3.format(",");

d3.select(window).on("resize", throttle);
var timer1, timer2;
function throttle() {
  window.clearTimeout(timer1);
  timer1 = window.setTimeout(function() {
    size();
  }, 200);
	window.clearTimeout(timer2);
	timer2 = window.setTimeout(function() {
		q01_chart.width(chart_small_width).height(chart_small_height);
		q02_chart.width(chart_small_width).height(chart_small_height);
		q03_chart.width(chart_small_width).height(chart_small_height);

		dc.renderAll();
	}, 400);
}

var chart_small_width, chart_small_height;
var size = function(){
	chart_small_width = $(".chart-small").width();
	chart_small_height = 200;
}
size();


var csv;

function getData(){

  d3.csv("data/survey.csv", function(data) {
    csv = data;
    crunchData();
    $('#loader').hide();
    $('#explain').show();
  });

}

function forCSS(name) {
	return name.replace(/[^a-z0-9]/g, function(s) {
		var c = s.charCodeAt(0);
		if (c == 32) return '-';
		if (c >= 65 && c <= 90) return '_' + s.toLowerCase();
		return '__' + ('000' + c.toString(16)).slice(-4);
	});
}

function displayFilters(title, filters){
	var finder = "dc_" + forCSS(title);
	var searchStr = "." + finder;
	var element = $("#active-filters").find(searchStr);
	if(element.length === 0){
			$("#active-filters").append('<li class="' + finder + ' filter-div"></li>')
	}
	var elementHtml = (filters.length > 0 ) ? '<span class="active-title-text">' + title + ' --- </span> ' +
		'<span class="active-filters-text">' + filters.join('</span> &nbsp;<small>OR</small>&nbsp; <span class="active-filters-text">') + '</span>' : '';
	$("#active-filters").find(searchStr).html(elementHtml)
}

function crunchData(){

	q01_chart = dc.rowChart('#q01_chart');
	q02_chart = dc.rowChart('#q02_chart');
	q03_chart = dc.rowChart('#q03_chart');

	cf = crossfilter(csv);

	cf.q01 = cf.dimension(function(d) {
		return d["Q01"]; });
	cf.q02 = cf.dimension(function(d) {
		return d["Q02"]; });
	cf.q03 = cf.dimension(function(d) {
		return d["Q03"]; });

	var q01 = cf.q01.group();
	var q02 = cf.q02.group();
	var q03 = cf.q03.group();

	var all = cf.groupAll();;

	q01_chart.width(chart_small_width).height(chart_small_height)
		.dimension(cf.q01).group(q01)
		.renderlet(function(){
			dc.events.trigger(function(){
				displayFilters("Lorem ipsum 1", q01_chart.filters());
			})
		})
		.colors(["#d01022"])
		.colorDomain([0])
		.colorAccessor(function(d, i){return 0;})
		.elasticX(true).xAxis().ticks(4);
	q02_chart.width(chart_small_width).height(chart_small_height)
		.dimension(cf.q02).group(q02)
		.renderlet(function(){
			dc.events.trigger(function(){
				displayFilters("Lorem ipsum 2", q02_chart.filters());
			})
		})
		.colors(["#d01022"])
		.colorDomain([0])
		.colorAccessor(function(d, i){return 0;})
		.elasticX(true).xAxis().ticks(4);
	q03_chart.width(chart_small_width).height(chart_small_height)
		.dimension(cf.q03).group(q03)
		.renderlet(function(){
			dc.events.trigger(function(){
				displayFilters("Lorem ipsum 3", q03_chart.filters());
			})
		})
		.colors(["#d01022"])
		.colorDomain([0])
		.colorAccessor(function(d, i){return 0;})
		.elasticX(true).xAxis().ticks(4);

	dc.dataCount(".data-count")
		.dimension(cf)
	  .group(all);

	dc.renderAll();

}

getData();
