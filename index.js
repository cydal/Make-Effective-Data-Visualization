/**
 * Created by sijuade on 23/05/2015.
 */
function draw(geo_data) {
    "use strict";
    var margin = 75,
        width = 1400 - margin,
        height = 600 - margin;

    d3.select("body")
        .append("h2")
        .text("World CO2 Emission (in Kilotonnes) ")


    var emissions = "emissions1.csv";

    //Creating dictionaries to hold first year
    //and current year emissions to pass to tooltip
    var firstYear = {}
    var currentYear = {}

    //Creating tooltip to show Country name
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            var diff = currentYear[0].values[d.properties.name] - firstYear[0].values[d.properties.name];
            var returned = "";
            if (diff < 0) {
                diff = firstYear[0].values[d.properties.name] - currentYear[0].values[d.properties.name];
                diff = ((diff/firstYear[0].values[d.properties.name]) * 100).toFixed(2);
                returned = d.properties.name + " - Fell by " + diff + "%";
            } else if (diff > 0) {
                diff = ((diff/currentYear[0].values[d.properties.name]) * 100).toFixed(2);
                returned = d.properties.name + " - UP by " + diff + "%";
            } else {
                returned = d.properties.name;
            }
            return returned;
        });

    //Declare SVG
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
        .append('g')
        .attr('class', 'map');

    //Call tooltip
    svg.call(tip);

    var projection = d3.geo.mercator()
        .scale(160)
        .translate([width/2, height/1.2]);

    var path = d3.geo.path().projection(projection);

    //Map rendering
    var map = svg.selectAll('path')
        .data(geo_data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('fill', 'grey')
        .style('stroke', 'green')
        .style('stroke-width', 0.7);

    //Time format
    var format = d3.time.format("X%Y");

    var filler;

    //Helper function for data munging
    function premunging(data) {
        data['Year'] = format.parse(data['Year']);
        data['Emissions_Capita'] = +data['Emissions_Capita'];
        data['Emissions_Yearly_Total'] = +data['Emissions_Yearly_Total'];
        data['Global_Pop'] = +data['Global_Pop'];
        data['Populations'] = +data['Populations'];
        return data;
    }

    function rolledup(leaves) {
        var yearLeaf = [];

        leaves.forEach(function(d) {
            var coords = projection([d['LONG'], d['LAT']]);

            var each = {
                "LONG": coords[0],
                "LAT": coords[1],
                "Country": d["Country"],
                "EmitCapita": d["Emissions_Capita"],
                "EmitYearly": d["Emissions_Yearly_Total"],
                "GlobePop": d["Global_Pop"],
                "CountryPop": d["Populations"]
            }
            yearLeaf.push(each);
        });
        return yearLeaf;
    }

    //Sets color for level of emissions
    function colorRolledUp(leaves) {

        var each = [];
        leaves.forEach(function(d) {
            each[d['Country']] = d['Emissions_Yearly_Total'];
        });
        return each;
    }

    d3.csv(emissions, premunging, function(d) {
        var nested = d3.nest()
            .key(function(d) {
                return d.Year.getUTCFullYear();
            })
            .rollup(rolledup)
            .entries(d);

        //removing years 2010 & 2011 as it contains too few data
        nested.pop();
        nested.pop();

        var colorNested = d3.nest()
            .key(function(d) {
                return d.Year.getUTCFullYear();
            })
            .rollup(colorRolledUp)
            .entries(d);

        //removing years for color too
        colorNested.pop();
        colorNested.pop();


        //Setting extent for emissions feature
        var color_extent = d3.extent(nested, function(d, i) {
            return d['values'][i]['EmitYearly'];
        });


        //Categorical color scale for emissions yearly
        var color = d3.scale.quantize()
            .range(colorbrewer.Greens[9])
            .domain(color_extent);




        function keyfunc(d) {
            return d['Country'];
        }


        //Fills countries with color based on emissions yearly color scale
        svg.selectAll('path')
            .style("fill", function(d) {
                var name = d['properties']['name'];
                return color(colorNested[0]['values'][name]);

            })

        //Creating legend
        var legend = svg.append('g')
            .attr('class', 'g')
            .attr("transform", "translate(" + (width - 2370) + "," + (height - 110) + ")")
            .selectAll('g')
            .data(colorbrewer.Greens[9])
            .enter()
            .append('g');



        legend.append('rect')
            .attr('x', width - 240)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", function(d) {
                return d;
            })
            .attr('y', function(d, i) {
                return i * 20;
            });
        legend.append('text')
            .attr('x', width - 200)
            .attr("y", function(d, i) {

                return i * 20 + 20;
            })
            .attr("fill", "white")
            .text(function(d, i) {
                switch(i) {
                    case 0:
                        return "Under 70, 000 Kilotonnes";
                    case 1:
                        return "Between 70,000 and 140,000 Kilotonnes";
                    case 2:
                        return "Between 140,000 and 200,000 Kilotonnes";
                    case 3:
                        return "Between 200,000 and 270,000 Kilotonnes";
                    case 4:
                        return "Between 270,000 and 350,000 Kilotonnes";
                    case 5:
                        return "Between 350,000 and 415,000 Kilotonnes";
                    case 6:
                        return "Between 415,000 and 500,000 Kilotonnes";
                    case 7:
                        return "Between 500,000 and 550,000 Kilotonnes";
                    case 8:
                        return "Over 550,000 Kilotonnes";
                }
            });

        function update(year) {
            var filtered = nested.filter(function(d) {
                return new Date(d['key']).getUTCFullYear() == year;
            });

            var colorfiltered = colorNested.filter(function(d) {
                return new Date(d['key']).getUTCFullYear() == year;
            });

            firstYear = colorNested.filter(function(d) {
                return new Date(d['key']).getUTCFullYear() == 1960;
            });
            currentYear = colorfiltered;

            var countrylist = Object.keys(colorfiltered[0]['values']);


            filler = svg.selectAll('path')
                .style("fill", function(d) {
                    var name = d['properties']['name'];
                    if (countrylist.indexOf(d.properties.name !== -1)) {
                        return color(colorfiltered[0]['values'][name]);
                    }
                    else {
                        return "#474747";
                    }
                })
            d3.select('h2')
                .text('World CO2 Emission (in Kilotonnes)' + "-" + year);
        }

        var years = [];

        for(var i in nested) {
            years.push(nested[i]['key']);
        }


        var year_idx = 9;
        var yearInterval = setInterval(function(d) {
            update(years[year_idx]);
            year_idx += 10;



            if(year_idx >= years.length) {
                clearInterval(yearInterval);

                var buttons = d3.select('body')
                    .append('div')
                    .attr("class", "years_button")
                    .selectAll('div')
                    .data(years)
                    .enter()
                    .append('div')
                    .text(function(d) {
                        return d;
                    });


                filler.on("mouseover", tip.show);

                buttons.on("mouseover", function(d) {
                    d3.select(".years_button")
                        .selectAll('div')
                        .style("cursor", "pointer");
                });

                buttons.on("click", function(d) {
                    d3.select(".years_button")
                        .selectAll("div")
                        .style("background", "#BDD09F");

                    d3.select(this)
                        .style("background", "#668D3C");
                    update(d);
                });

            }
        }, 700);
    });
}
