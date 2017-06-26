queue()
    .defer(d3.json, "/crime")
    /*.defer(d3.json,"//!**!/")*/
    .await(makeGraphs);

function makeGraphs(error, new_dataJson) {
    document.getElementById("load").style.display = "none";
    document.getElementById("simon").style.display = "inline-block";
    document.onreadystatechange = function () {
        var state = document.readyState
        if (state == 'interactive') {
            document.getElementById('contents').style.visibility = "hidden";
        } else if (state == 'complete') {
            setTimeout(function () {
                document.getElementById('interactive');
                document.getElementById('load').style.visibility = "hidden";
                document.getElementById('contents').style.visibility = "visible";
            }, 1000);
        }
    };


    //Clean projectsJson data
    var crime_DataNew_Data = new_dataJson;
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    crime_DataNew_Data.forEach(function (d) {
        d["Attempts or threats to murder, assaults, harassments and related offences"] = +d["Attempts or threats to murder, assaults, harassments and related offences"];
    });


    //Creating Crossfilter
    var ndx = crossfilter(crime_DataNew_Data);

    //Define Dimensions
    var countyDim = ndx.dimension(function (d) {
        return d["County"]
    });
    var yearDim = ndx.dimension(function (d) {
        return d["Year"]
    });
    var attemptsDim = ndx.dimension(function (d) {
        return d["Attempts or threats to murder, assaults, harassments and related offences"];
    });
    var dNADim = ndx.dimension(function (d) {
        return d["Dangerous or negligent acts"];
    });

    var robberyDim = ndx.dimension(function (d) {
        return d["Robbery, extortion and hijacking offences"];
    });

    var weaponsDim = ndx.dimension(function (d) {
        return d["Weapons and Explosives Offences"]
    });

    var drugDim = ndx.dimension(function (d) {
        return d["Controlled drug offences"]
    });


    //Calculate metrics//
    var countyGroup = countyDim.group();

    var attemptsGroup = yearDim.group().reduceSum(function (d) {
        return d['Attempts or threats to murder, assaults, harassments and related offences'];
    });

    var dangerousGroup = yearDim.group().reduceSum(function (d) {
        return d['Dangerous or negligent acts']
    });

    var robberyGroup = yearDim.group().reduceSum(function (d) {
        return d['Robbery, extortion and hijacking offences']
    });

    var weaponsGroup = yearDim.group().reduceSum(function (d) {
        return d['Weapons and Explosives Offences']
    });

    var drugGroup = yearDim.group().reduceSum(function (d) {
        return d['Controlled drug offences']
    });

    var fraudGroup = yearDim.group().reduceSum(function (d) {
        return d['Fraud, deception and related offences']
    });

    var burglaryGroup = yearDim.group().reduceSum(function (d) {
        return d['Burglary and related offences']
    });

    var governmentGroup = yearDim.group().reduceSum(function (d) {
        return d['Offences against government, justice procedures and organisation of crime']
    });

    var propertyGroup = yearDim.group().reduceSum(function (d) {
        return d['Damage to property and to the environment']
    });

    var theftGroup = yearDim.group().reduceSum(function (d) {
        return d['Theft and related offences']
    });

    var kidnappingGroup = yearDim.group().reduceSum(function (d) {
        return d['Kidnapping and related offences']
    });

    var publicOrderGroup = yearDim.group().reduceSum(function (d) {
        return d['Public order and other social code offences']
    });

    var yearDim = ndx.dimension(function (d) {
        return d["Year"]
    });

    var yearGroup = yearDim.group();

    //Define values (to be used in charts)
    var minDate = yearDim.bottom(1)[0]["Year"];
    var maxDate = yearDim.top(1)[0]["Year"];


    //Charts
    var yearChart = dc.rowChart("#year-row-chart");
    var attemptsChart = dc.barChart("#attempts-chart");
    var dangerousChart = dc.lineChart("#dangerous-chart");
    var robberyChart = dc.lineChart("#robbery_chart");
    var weaponsChart = dc.lineChart("#weapons_chart");
    var drugChart = dc.lineChart("#drug_chart");
    var fraudChart = dc.lineChart("#fraud_chart");
    var burglaryChart = dc.lineChart("#burglary_chart");
    var governmentChart = dc.lineChart("#government_chart");
    var propertyChart = dc.lineChart("#property_chart");
    var theftChart = dc.lineChart("#theft_chart");
    var kidnappingChart = dc.lineChart("#kidnapping_chart");
    var publicOrderChart = dc.lineChart("#publicOrder_chart");

    selectField = dc.selectMenu('#menu-select')
        .dimension(countyDim)
        .group(countyGroup);

    /* selectField = dc.selectMenu('#year-row-chart')
     .dimension(yearDim)
     .group(yearGroup);*/


    yearChart
        .width(1100)
        .height(500)
        .dimension(yearDim)
        .group(yearGroup)
        .xAxis().ticks(10);

    attemptsChart
        .width(768)
        .height(380)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Fruit')
        .yAxisLabel('Quantity Sold')
        .dimension(yearDim)
        .barPadding(0.1)
        .outerPadding(0.05)
        .group(attemptsGroup);

    /* .width(800)
     .height(250)
     .margins({top: 10, right: 50, bottom: 30, left: 50})
     .dimension(yearDim)
     .group(attemptsGroup)
     .transitionDuration(500)
     .x(d3.scale.linear().domain([minDate, maxDate]))
     .elasticY(true)
     .xAxisLabel("Year")
     .yAxis().ticks(4);*/


    /*forBarChart
     .height(220)
     .radius(90)
     .innerRadius(40)
     .transitionDuration(1500)
     .dimension(yearDim)
     .group(attemptsGroup);*/

    /*/!*forLineChart
     .width(1200)
     .height(500)
     .dimension(yearDim)
     .group(attemptsGroup)
     .elasticY(true)
     .elasticX(true)
     .x(d3.scale.linear().domain([minDate, maxDate]));*/

    dangerousChart
        .width(1000)
        .height(500)
        .dimension(yearDim)
        .elasticY(true)
        .elasticX(true)
        .group(dangerousGroup)
        .x(d3.scale.linear().domain([minDate, maxDate]));

    robberyChart
        .width(1000)
        .height(500)
        .dimension(yearDim)
        .elasticY(true)
        .elasticX(true)
        .group(robberyGroup)
        .x(d3.scale.linear().domain([minDate, maxDate]));

    weaponsChart
        .width(1000)
        .height(500)
        .dimension(yearDim)
        .elasticY(true)
        .elasticX(true)
        .group(weaponsGroup)
        .x(d3.scale.linear().domain([minDate, maxDate]));

    drugChart
        .width(1000)
        .height(500)
        .dimension(yearDim)
        .elasticY(true)
        .elasticX(true)
        .group(drugGroup)
        .x(d3.scale.linear().domain([minDate, maxDate]));

    fraudChart
        .width(1000)
        .height(500)
        .dimension(yearDim)
        .elasticY(true)
        .elasticX(true)
        .group(fraudGroup)
        .x(d3.scale.linear().domain([minDate, maxDate]));

    burglaryChart
        .width(1000)
        .height(500)
        .dimension(yearDim)
        .elasticY(true)
        .elasticX(true)
        .group(burglaryGroup)
        .x(d3.scale.linear().domain([minDate, maxDate]));

    governmentChart
        .width(1000)
        .height(500)
        .dimension(yearDim)
        .elasticY(true)
        .elasticX(true)
        .group(governmentGroup)
        .x(d3.scale.linear().domain([minDate, maxDate]));

    propertyChart
        .width(1000)
        .height(500)
        .dimension(yearDim)
        .elasticY(true)
        .elasticX(true)
        .group(propertyGroup)
        .x(d3.scale.linear().domain([minDate, maxDate]));

    theftChart
        .width(1000)
        .height(500)
        .dimension(yearDim)
        .elasticY(true)
        .elasticX(true)
        .group(theftGroup)
        .x(d3.scale.linear().domain([minDate, maxDate]));

    kidnappingChart
        .width(1000)
        .height(500)
        .dimension(yearDim)
        .elasticY(true)
        .elasticX(true)
        .group(kidnappingGroup)
        .x(d3.scale.linear().domain([minDate, maxDate]));

    publicOrderChart
        .width(1000)
        .height(500)
        .dimension(yearDim)
        .elasticY(true)
        .elasticX(true)
        .group(publicOrderGroup)
        .x(d3.scale.linear().domain([minDate, maxDate]));

    dc.renderAll();
}


