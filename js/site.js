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
    //large charts
		q01_chart.width(chart_lg_width).height(chart_lg_height);
    //medium charts
		q02_chart.width(chart_med_width).height(chart_med_height);
		q03_chart.width(chart_med_width).height(chart_med_height);
    //small charts
    q04_chart.width(chart_small_width).height(chart_small_height);
    q05_chart.width(chart_small_width).height(chart_small_height);
    q06_chart.width(chart_small_width).height(chart_small_height);

    /*q07_chart.width(chart_small_width).height(chart_small_height);
    q08_chart.width(chart_small_width).height(chart_small_height);
    q09_chart.width(chart_small_width).height(chart_small_height);
    q10_chart.width(chart_small_width).height(chart_small_height);
    q11_chart.width(chart_small_width).height(chart_small_height);*/

		dc.renderAll();
	}, 400);
}

var chart_small_width, chart_small_height;
var chart_med_width, chart_med_height;
var chart_lg_width, chart_lg_height;

var size = function(){
	chart_small_width = $(".chart-small").width();
	chart_small_height = 200;

  chart_med_width = $(".chart-med").width();
  chart_med_height = 400;

  chart_lg_width = $(".chart-lg").width();
  chart_lg_height = 600;

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
  q04_chart = dc.rowChart('#q04_chart');
	q05_chart = dc.rowChart('#q05_chart');
	q06_chart = dc.rowChart('#q06_chart');
  q07_chart = dc.rowChart('#q07_chart');
	q08_chart = dc.rowChart('#q08_chart');
	/*q09_chart = dc.rowChart('#q09_chart');
  q10_chart = dc.rowChart('#q10_chart');
	q11_chart = dc.rowChart('#q11_chart');*/

	cf = crossfilter(csv);

	cf.q01 = cf.dimension(function(d) {
		return d["Q01"]; });
	cf.q02 = cf.dimension(function(d) {
		return d["Q02"]; });
	cf.q03 = cf.dimension(function(d) {
		return d["Q03"]; });
  cf.q04 = cf.dimension(function(d) {
    return d["Q04"]; });
  cf.q05 = cf.dimension(function(d) {
    return d["Q05"]; });
  cf.q06 = cf.dimension(function(d) {
    return d["Q06"]; });
  cf.q07 = cf.dimension(function(d) {
  	return d["Q07"]; });
	cf.q08 = cf.dimension(function(d) {
  	return d["Q08"]; });
  /*cf.q09 = cf.dimension(function(d) {
  	return d["Q09"]; });
  cf.q10 = cf.dimension(function(d) {
  	return d["Q10"]; });
	cf.q11 = cf.dimension(function(d) {
		return d["Q11"]; });*/



	var q01 = cf.q01.group();
	var q02 = cf.q02.group();
	var q03 = cf.q03.group();
  var q04 = cf.q04.group();
	var q05 = cf.q05.group();
	var q06 = cf.q06.group();
  var q07 = cf.q07.group();
	var q08 = cf.q08.group();
	/*var q09 = cf.q03.group();
  var q10 = cf.q01.group();
	var q11 = cf.q02.group();*/

	var all = cf.groupAll();

	q01_chart.width(chart_lg_width).height(chart_lg_height)
		.dimension(cf.q01).group(q01)
		.renderlet(function(){
			dc.events.trigger(function(){
				displayFilters("Lorem ipsum 1", q01_chart.filters());
			})
		})
		.colors(["#d01022"])
		.colorDomain([0])
		.colorAccessor(function(d, i){return 0;})
        //.xAxis(d3.scale.linear().domain([0, 100])).ticks(4);
        //.xAxis().tickFormat(function (v) {return v + '%'})
        //.xAxis()tickValues([25, 50, 75, 100]));
        //.xAxis().tickFormat(
            //function(d){return d + '%';});
    .elasticX(true).xAxis().ticks(4);
        //.xAxis(d3.svg.axis().tickValues([25, 50, 75, 100]));
	q02_chart.width(chart_med_width).height(chart_med_height)
		.dimension(cf.q02).group(q02)
		.renderlet(function(){
			dc.events.trigger(function(){
				displayFilters("Lorem ipsum 2", q02_chart.filters());
			})
		})
		.colors(["#d01022"])
		.colorDomain([0])
		.colorAccessor(function(d, i){return 0;})
		.elasticX(false).xAxis().ticks(4);
	q03_chart.width(chart_med_width).height(chart_med_height)
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
  q04_chart.width(chart_small_width).height(chart_small_height)
		.dimension(cf.q04).group(q04)
		.renderlet(function(){
			dc.events.trigger(function(){
				displayFilters("Lorem ipsum 4", q04_chart.filters());
			})
		})
		.colors(["#d01022"])
		.colorDomain([0])
		.colorAccessor(function(d, i){return 0;})
		.elasticX(true).xAxis().ticks(4);
  q05_chart.width(chart_small_width).height(chart_small_height)
    .dimension(cf.q05).group(q05)
    .renderlet(function(){
      dc.events.trigger(function(){
        displayFilters("Lorem ipsum 5", q05_chart.filters());
      })
    })
    .colors(["#d01022"])
    .colorDomain([0])
    .colorAccessor(function(d, i){return 0;})
    .elasticX(true).xAxis().ticks(4);
  q06_chart.width(chart_med_width).height(chart_med_height)
    .dimension(cf.q06).group(q06)
    .renderlet(function(){
      dc.events.trigger(function(){
        displayFilters("Lorem ipsum 6", q06_chart.filters());
      })
    })
    .colors(["#d01022"])
    .colorDomain([0])
    .colorAccessor(function(d, i){return 0;})
    .elasticX(true).xAxis().ticks(4);
  q07_chart.width(chart_med_width).height(chart_med_height)
    .dimension(cf.q07).group(q07)
    .renderlet(function(){
      dc.events.trigger(function(){
        displayFilters("Lorem ipsum 7", q07_chart.filters());
      })
    })
    .colors(["#d01022"])
    .colorDomain([0])
    .colorAccessor(function(d, i){return 0;})
    .elasticX(true).xAxis().ticks(4);
  q08_chart.width(chart_med_width).height(chart_med_height)
    .dimension(cf.q08).group(q08)
    .renderlet(function(){
      dc.events.trigger(function(){
        displayFilters("Lorem ipsum 8", q08_chart.filters());
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
