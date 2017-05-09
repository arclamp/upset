var $ = require('jquery');
require('font-awesome-webpack');
require('./css/html_styles.scss');
require('./css/set_view.scss');
require('./css/element_view.scss');
/**
 * author: Nils Gehlenborg - nils@hms.harvard.edu
*/

/** basic event bus (http://stackoverflow.com/questions/2967332/jquery-plugin-for-event-driven-architecture) */
var EventManager = {};

/** how to use:

 $(EventManager).bind("tabClicked", function() {
    // do something
});

 $(EventManager).trigger("tabClicked");

 $(EventManager).unbind("tabClicked");

 */
/**
 * Author: Nils Gehlenborg, nils@hms.harvard.edu
 */

/**
 * Venn Diagram
 * Based on https://gist.github.com/mbostock/1067636.
 */


var VennDiagram = function( element, radius ) {
	this.element = element;
	this.radius = radius;
};

VennDiagram.prototype.isActive = function( areaSets, highlightSubsets ) {
	var self = this;

	if ( !highlightSubsets ) {
		return false;
	}

	for ( var s = 0; s < highlightSubsets.length; ++s ) {
		var hitCounter = 0;
		for ( var i = 0; i < areaSets.length; ++i ) {
			if ( areaSets[i] === highlightSubsets[s].combinedSets[i] ) {
				++hitCounter;
			}
		}
		if ( hitCounter === areaSets.length ) {
			return ( true );
		}
	}

	return ( false );
};


VennDiagram.prototype.plot = function( highlightSubsets, setCount ) {
	var self = this;

	if ( setCount === 2 ) {
		self.plot2Set( highlightSubsets );
	}
	else if ( setCount === 3 ) {
		self.plot3Set( highlightSubsets );
	}
	else {
	//	console.error( "Venn diagram is only implemented for 2 or 3 sets." );
	}
}

VennDiagram.prototype.plot2Set = function( highlightSubsets ) {
	var self = this;

	var width = self.radius * 550/180 + self.radius;
	var height = self.radius * 200/180 + self.radius + .75*self.radius;

	d3.select(self.element).html("");

	var svg = d3.select(self.element).append("svg:svg")
	    .attr("width", width)
	    .attr("height", height);

	var vis = svg.append("svg:g")
	    .attr("width", width)
	    .attr("height", height)
	    //.attr( "transform", "scale(0.5)");

	vis.append("svg:rect")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", function() { return ( self.isActive( [0,0], highlightSubsets ) ? "venn-zero-set-area-active" : "venn-zero-set-area" ); } );

	var defs = svg.append("svg:defs");

	defs.append("svg:clipPath")
	    .attr("id", "circle1")
	  .append("svg:circle")
	    .attr("cx", self.radius * 350/180 - .5 * self.radius )
	    .attr("cy", self.radius * 200/180 + .25 * self.radius )
	    .attr("r", self.radius /*180*/);

	defs.append("svg:clipPath")
	    .attr("id", "circle2")
	  .append("svg:circle")
	    .attr("cx", self.radius * 550/180 - .5 * self.radius )
	    .attr("cy", self.radius * 200/180 + .25 * self.radius)
	    .attr("r", self.radius /*180*/);


	vis.append("svg:rect")
	    .attr("clip-path", "url(#circle1)")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", function() { return ( self.isActive( [1,0], highlightSubsets ) ? "venn-one-set-area-active" : "venn-one-set-area" ); } );

	vis.append("svg:rect")
	    .attr("clip-path", "url(#circle2)")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", function() { return ( self.isActive( [0,1], highlightSubsets ) ? "venn-one-set-area-active" : "venn-one-set-area" ); } );

	vis.append("svg:g")
	    .attr("clip-path", "url(#circle1)")
	  .append("svg:rect")
	    .attr("clip-path", "url(#circle2)")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", function() { return ( self.isActive( [1,1], highlightSubsets ) ? "venn-two-set-area-active" : "venn-two-set-area" ); } );
}


VennDiagram.prototype.plot3Set = function( highlightSubsets ) {
	var self = this;

	var width = self.radius * 550/180 + self.radius;
	var height = self.radius * 300/180 + self.radius + .5*self.radius;

	d3.select(self.element).html("");

	var svg = d3.select(self.element).append("svg:svg")
	    .attr("width", width)
	    .attr("height", height);

	var vis = svg.append("svg:g")
	    .attr("width", width)
	    .attr("height", height)
	    //.attr( "transform", "scale(0.5)");

	vis.append("svg:rect")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", function() { return ( self.isActive( [0,0,0], highlightSubsets ) ? "venn-zero-set-area-active" : "venn-zero-set-area" ); } );

	var defs = svg.append("svg:defs");

	defs.append("svg:clipPath")
	    .attr("id", "circle1")
	  .append("svg:circle")
	    .attr("cx", self.radius * 350/180 - .5 * self.radius )
	    .attr("cy", self.radius * 200/180 + .25 * self.radius )
	    .attr("r", self.radius /*180*/);

	defs.append("svg:clipPath")
	    .attr("id", "circle2")
	  .append("svg:circle")
	    .attr("cx", self.radius * 550/180 - .5 * self.radius )
	    .attr("cy", self.radius * 200/180 + .25 * self.radius)
	    .attr("r", self.radius /*180*/);

	defs.append("svg:clipPath")
	    .attr("id", "circle3")
	  .append("svg:circle")
	    .attr("cx", self.radius * 450/180 - .5 * self.radius )
	    .attr("cy", self.radius * 300/180 + .25 * self.radius)
	    .attr("r", self.radius /*180*/);

	vis.append("svg:rect")
	    .attr("clip-path", "url(#circle1)")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", function() { return ( self.isActive( [1,0,0], highlightSubsets ) ? "venn-one-set-area-active" : "venn-one-set-area" ); } );

	vis.append("svg:rect")
	    .attr("clip-path", "url(#circle2)")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", function() { return ( self.isActive( [0,1,0], highlightSubsets ) ? "venn-one-set-area-active" : "venn-one-set-area" ); } );

	vis.append("svg:rect")
	    .attr("clip-path", "url(#circle3)")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", function() { return ( self.isActive( [0,0,1], highlightSubsets ) ? "venn-one-set-area-active" : "venn-one-set-area" ); } );

	vis.append("svg:g")
	    .attr("clip-path", "url(#circle1)")
	  .append("svg:rect")
	    .attr("clip-path", "url(#circle2)")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", function() { return ( self.isActive( [1,1,0], highlightSubsets ) ? "venn-two-set-area-active" : "venn-two-set-area" ); } );

	vis.append("svg:g")
	    .attr("clip-path", "url(#circle2)")
	  .append("svg:rect")
	    .attr("clip-path", "url(#circle3)")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", function() { return ( self.isActive( [0,1,1], highlightSubsets ) ? "venn-two-set-area-active" : "venn-two-set-area" ); } );

	vis.append("svg:g")
	    .attr("clip-path", "url(#circle3)")
	  .append("svg:rect")
	    .attr("clip-path", "url(#circle1)")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", function() { return ( self.isActive( [1,0,1], highlightSubsets ) ? "venn-two-set-area-active" : "venn-two-set-area" ); } );

	vis.append("svg:g")
	    .attr("clip-path", "url(#circle3)")
	  .append("svg:g")
	    .attr("clip-path", "url(#circle2)")
	  .append("svg:rect")
	    .attr("clip-path", "url(#circle1)")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", function() { return ( self.isActive( [1,1,1], highlightSubsets ) ? "venn-three-set-area-active" : "venn-three-set-area" ); } );
}
/**
 * author: Nils Gehlenborg - nils@hms.harvard.edu
*/

var Utilities = function() {
};


Utilities.generateUuid = function() {
    // see broofa's answer in http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    return ( 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16) ;
    }) );
};

Utilities.truncate = function(textElement, w) {

  var too_large = true;

  if(textElement[0][0].getBBox().width<w)
    too_large = false;

  while(too_large) {

    var bbox = textElement[0][0].getBBox();
    var width = bbox.width;
    var height = bbox.height;

    textElement.text(textElement.text().substring(0, textElement.text().length-1));

    if(textElement[0][0].getBBox().width<w)
      too_large = false;

  }

  return textElement.text();
}

// attach the .compare method to Array's prototype to call it on any array
Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

//
Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};
/**
 * author: Nils Gehlenborg - nils@hms.harvard.edu
*/


var Attribute = function() {
	// nothing here
};

Attribute.matchesType = function( sourceType, targetType ) {
	if ( sourceType === targetType ) {
		return true;
	}

	if ( sourceType === 'integer' ) {
		return targetType === 'numeric';
	}

	if ( sourceType === 'float' ) {
		return targetType === 'numeric';
	}

	return false;
};
var wordCloudConfiguration = {
    name: "Word Cloud",
    attributes: [{
            name: "Text",
            type: "id",
            variable: "text"
        }],
    parameters: [],
    render: function( elementId, selections, attributes, attributeMap, parameterMap ) {
        // based on https://github.com/jasondavies/d3-cloud/blob/master/examples/simple.html
        var attribute = attributes[attributeMap.text];

        var fill = d3.scale.category20();

        // create data structure: array of pair arrays for each selection
        var data = [];
        for ( var s = 0; s < selections.getSize(); ++s ) {

            var values = [];
            var selection = selections.getSelection(s);

            for ( var i = 0; i < selection.items.length; ++i ) {
                //console.log( attribute.values[selection.items[i]].split(" ") );
                values = values.concat( attribute.values[selection.items[i]].split(" ") );
            }


            values.color = selections.getColor( selection );
            data.push( values );
        }


        d3.select( elementId ).html("");
        d3.layout.cloud().size([300, 200])
            .words(data[0].map(function(d) {
            return {text: d, size: 3 + Math.random() * 7};
            }))
            .padding(5)
            //.timeInterval(1)
            .rotate(function() { return ~~(Math.random() * 2) * 30; })
            .font("Helvetica")
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

        function draw(words) {
            d3.select( elementId ).append("svg")
                .attr("width", 300)
                .attr("height", 200)
                .append("g")
                    .attr("transform", "translate(150,100)")
                    .selectAll("text")
                        .data(words)
                .enter().append("text")
                    .style("font-size", function(d) { return d.size + "px"; })
                    .style("font-family", "Helvetica")
                    .style("fill", function(d, i) { return fill(i); })
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                .text(function(d) { return d.text; });
        }
    }
};
var scatterplotConfiguration = {
    name: "Scatterplot",
    attributes: [{
            name: "x",
            type: "numeric",
            variable: "x"
        },
        {
            name: "y",
            type: "numeric",
            variable: "y"
        }],
    parameters: [{
            name: "Log Scale X",
            type: "boolean",
            variable: "logScaleX",
            default: false
        },
        {
            name: "Log Scale Y",
            type: "boolean",
            variable: "logScaleY",
            default: false
        }],
    render: function( elementId, selections, attributes, attributeMap, parameterMap ) {
        // based on http://bl.ocks.org/bunkat/2595950

        var data = [];

        var attributeX = attributes[attributeMap.x];
        var attributeY = attributes[attributeMap.y];

        // create data structure: array of pair arrays for each selection
        for ( var s = 0; s < selections.getSize(); ++s ) {

            var values = [];
            var selection = selections.getSelection(s);

            for ( var i = 0; i < selection.items.length; ++i ) {
                values.push( [ attributeX.values[selection.items[i]], attributeY.values[selection.items[i]]] );
            }

            values.color = selections.getColor( selection );

            data.push( values );
        }

        var margin = {top: 10, right: 20, bottom: 35, left: 45},
            width = 350 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        var x;

        if ( parameterMap.logScaleX ) {
            x = d3.scale.log()
                .domain([attributeX.min, attributeX.max])
                .range([0, width]);
        }
        else {
            x = d3.scale.linear()
                .domain([attributeX.min, attributeX.max])
                .range([0, width]);
        }

        var y;

        if ( parameterMap.logScaleY ) {
            y = d3.scale.log()
                .domain([attributeY.min, attributeY.max])
                .range([ height, 0 ]);
        }
        else {
            y = d3.scale.linear()
                .domain([attributeY.min, attributeY.max])
                .range([ height, 0 ]);
        }

        d3.select( elementId ).html("");

        var chart = d3.select( elementId )
        .append('svg:svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .attr('class', 'chart')

        var main = chart.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'main')

        // draw the x axis
        var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

        main.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .attr('class', 'main axis date')
            .call(xAxis)
            .append("text")
                .attr("transform", "translate(0," + 30 + ")" )
                .style("text-anchor", "start")
                .text(attributeX.name);



        // draw the y axis
        var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

        main.append('g')
            .attr('transform', 'translate(0,0)')
            .attr('class', 'main axis date')
            .call(yAxis)
            .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text( attributeY.name );

        var g = main.append("svg:g");

        var selectionGroup = g.selectAll( '.selection-group' )
            .data(data)
          .enter()
            .append( 'g' )
            .attr( 'class', '.selection-group' )
            .style('fill-opacity', 0.5 )
            .attr("fill", function(d) {  return ( d.color ); } );

        var marks = selectionGroup.selectAll( '.element-mark' )
                .data( function( d ) { return ( d ); } )
            .enter()
                .append("svg:circle")
                    .attr("cx", function (d,i) { return x(d[0]); } )
                    .attr("cy", function (d,i) { return y(d[1]); } )
                    .attr("r", 2);
    }
};
var histogramConfiguration = {
    name: "Histogram",
    attributes: [{
            name: "Variable",
            type: "numeric",
            variable: "variable"
        }],
    parameters: [/*{
            name: "Small Multiples?",
            type: "boolean",
            variable: "smallMultiples"
        }*/{
            name: "Bins",
            type: "integer",
            variable: "bins",
            default: 20
        },
        {
            name: "Frequency?",
            type: "boolean",
            variable: "isFrequency",
            default: false
        },
        {
            name: "Only active?",
            type: "boolean",
            variable: "isActiveOnly",
            default: false
        }],
    render: function( elementId, selections, attributes, attributeMap, parameterMap ) {

        var attribute = attributes[attributeMap.variable];

        // A formatter for counts.
        var format = d3.format(".00r");

        if ( attribute.type === "float" ) {
            format = d3.format(",.00r");
        }
        if ( attribute.type === "integer" ) {
            format = d3.format("d");
        }

        var margin = {top: 10, right: 20, bottom: 35, left: 45},
            width = 350 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        var x = d3.scale.linear()
            .domain([attribute.min, attribute.max])
            .range([0, width]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        // clear
        d3.select( elementId ).html("");

        var svg = d3.select( elementId ).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var histograms = [];

        // for each selection
        for ( var s = 0; s < selections.getSize(); ++s ) {

            var values = [];
            var selection = selections.getSelection(s);

            if ( parameterMap.isActiveOnly && !selections.isActive(selection) ) {
                    continue;
            }

            for ( var i = 0; i < selection.items.length; ++i ) {
                values.push( attribute.values[selection.items[i]] );
            }

            // Generate a histogram using twenty uniformly-spaced bins.
            var histogram = d3.layout.histogram()
                .frequency(parameterMap.isFrequency)
                .bins(x.ticks(parameterMap.bins))
                (values);

            // interleave by shifting bar positions and adjusting bar widths
            for ( var i = 0; i < histogram.length; ++i ) {
                histogram[i].color = selections.getColor( selection );
                if ( !parameterMap.isActiveOnly ) {
                    histogram[i].dx = histogram[i].dx/selections.getSize();
                }
                histogram[i].x = histogram[i].x + s*histogram[i].dx
            }

            histograms.push( histogram );
        }

        var y = d3.scale.linear()
            .domain([0, d3.max(histograms, function(histogram) { return d3.max( histogram, function(d) { return d.y; } ); })])
            .range([height, 0]);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var histogram = svg.selectAll(".histogram")
                .data( histograms )
            .enter().append("g")
                .attr("class", "histogram");

        var bar = histogram.selectAll(".bar")
                .data( function( d ) { return ( d ); } )
            .enter().append("g")
                .attr("class", "bar")
                .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

        bar.append("rect")
            .attr("x", 1)
            .attr("width", function(d) { return x(d.dx+attribute.min) - 1; }) //x(histograms[0].dx+attribute.min) - 1
            .attr("height", function(d) { return height - y(d.y); })
            .style('fill-opacity', 0.5 )
            .style('fill', function(d){ return (d.color) } );

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
                .attr("transform", "translate(0," + 30 + ")" )
                .style("text-anchor", "start")
                .text(attribute.name);

        svg.append("g")
            .attr("class", "x axis")
            //.attr('stroke-width','1')
            .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", -margin.left)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text(function() { return ( parameterMap.isFrequency ? "Frequency" : "Probability" ); } );


    }
};
var variantFrequencyConfiguration = {
    name: "Transition/Transversion Ratio",
    attributes: [{
            name: "Reference Allele",
            type: "string",
            variable: "reference"
        },
        {
            name: "Alternative Allele",
            type: "string",
            variable: "alternative"
        }],
    parameters: [{
            name: "Show Matrix",
            type: "boolean",
            variable: "showMatrix"
        }],
    render: function( elementId, selections, attributes, attributeMap, parameterMap ) {
        var data = [];

        var attributeReference = attributes[attributeMap.reference];
        var attributeAlternative = attributes[attributeMap.alternative];

        // create data structure: array of pair arrays for each selection
        for ( var s = 0; s < selections.getSize(); ++s ) {

            var max = 0;

            var values =
                [
                    [0,0,0,0], //A -> A, C, G, T
                    [0,0,0,0], //C -> A, C, G, T
                    [0,0,0,0], //G -> A, C, G, T
                    [0,0,0,0]  //T -> A, C, G, T
                ];

            var transitions = 0;
            var transversions = 0;

            var nucleotideIndexMap = { A: 0, C: 1, G: 2, T: 3 };

            var selection = selections.getSelection(s);

            for ( var i = 0; i < selection.items.length; ++i ) {
                var referenceIndex = nucleotideIndexMap[attributeReference.values[selection.items[i]]];
                var alternativeIndex = nucleotideIndexMap[attributeAlternative.values[selection.items[i]]];
                values[referenceIndex][alternativeIndex] += 1;

                if ( values[referenceIndex][alternativeIndex] > max ) {
                    max = values[referenceIndex][alternativeIndex];
                }

                var change = attributeReference.values[selection.items[i]] + attributeAlternative.values[selection.items[i]];

                if ( change === "AG" || change === "GA" || change === "CT" || change === "TC" ) {
                    transitions += 1;
                }
                else {
                    transversions += 1;
                }

            }

            values.color = selections.getColor( selection );
            values.transitions = transitions;
            values.transversions = transversions;
            values.max = max;

            data.push( values );
        }

        d3.select( elementId ).html( "" );
        var viewer = d3.select( elementId );

        viewer.selectAll( 'p' )
                .data( data )
            .enter()
                .append( 'p' )
                .html( function( d ) {  return ( 'ti/tv = ' + d3.round( d.transitions / d.transversions, 3 ) + ' (' + d.transitions + '/' + d.transversions + ')' ); } )
                .style( "color", function( d ) { return ( d.color ); } );

        if (!parameterMap.showMatrix) {
            return;
        }

        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var size = 20;

        for ( var s = 0; s < selections.getSize(); ++s ) {

            var x = d3.scale.ordinal()
                .domain(['A', 'C', 'G', 'T'])
                .rangePoints([0.5*size,3.5*size]);

            var y = d3.scale.ordinal()
                .domain(['A', 'C', 'G', 'T'])
                .rangePoints([0.5*size,3.5*size]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var color = d3.scale.linear()
                .domain([0,data[s].max])
                .range(["#e8e8e8", "#080808"]);

            var svg = d3.select(elementId).append("svg")
                .attr("width", size * 5 + margin.left + margin.right)
                .attr("height", size * 5 + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + size*4 + ")")
                .attr('stroke-width','0')
                .call(xAxis)
            .append("text")
              .attr("transform", "translate(0," + (size+10) + ")" )
              .style("text-anchor", "start")
              .text("Ref Allele");

            svg.append("g")
                .attr("class", "y axis")
                .attr('stroke-width','0')
                .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", -10-size)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Alt Allele");

            var hm = svg.append("svg:g");
            var hmrows = hm.selectAll("g")
                    .data(data)
                    .enter().append("svg:g")
                    .attr("transform", function(d, i) {
                            return "translate(0," + (size * i) + ")";
                        });

            var hmcells = hmrows.selectAll("g")
                    .data(function(d,i) { return d; })
                .enter().append("svg:g")
                    .attr("transform", function(d, i) {
                            return "translate(" + (size * i) + ",0)";
                        });

            hmcells = hmcells.selectAll('rect')
                    .data(function(d,i) { return d; })
                .enter().append("svg:rect")
                    .attr("width", size)
                    .attr("height", size)
                    .attr("transform", function(d, i) {
                            return "translate(0," + (size * i) + ")";
                        })
                    .attr('fill', function(d,i) { return( color(d) ); })
                    .attr('stroke', 'white');
        }
    }
};
/**
 * author: Nils Gehlenborg - nils@hms.harvard.edu
*/

var ElementViewerConfigurations = {
    scatterplot: scatterplotConfiguration,
    histogram: histogramConfiguration,
    wordCloud: wordCloudConfiguration,
    variantFrequency: variantFrequencyConfiguration,
};


$(EventManager).bind("element-viewer-removed", function (event, data) {
});


$(EventManager).bind("element-viewer-added", function (event, data) {
});


$(EventManager).bind("element-viewer-activated", function (event, data) {
    elementViewers.renderViewer();
});


var ElementViewerCollection = function( controllerElementId, viewerElementId ) {
    var self = this;

    self.list = [];
    self.activeIndex = undefined;

    self.controllerElementId = controllerElementId;
    self.viewerElementId = viewerElementId;
};

ElementViewerCollection.prototype.reset = function() {
    var self = this;

    self.list = [];
    self.activeIndex = undefined;
};



ElementViewerCollection.prototype.add = function( elementViewer, isActive ) {
    var self = this;

    isActive = isActive | false;

    self.list.push( elementViewer );

    $(EventManager).trigger("element-viewer-added", { viewer: elementViewer });

    if ( isActive ) {
        self.setActiveIndex( self.list.length - 1 );
    }
};


ElementViewerCollection.prototype.remove = function( elementViewer ) {
    var self = this;

    for ( var i = 0; i < self.list.length; ++i ) {
        if ( self.list[i].uuid === elementViewer.uuid ) {
            self.list.splice(i, 1);

            $(EventManager).trigger("element-viewer-removed", { viewer: elementViewer });

            if ( i === self.activeIndex ) {
                if (self.list.length > 0) {
                    self.setActiveIndex( i - 1 );
                }
                else {
                    self.setActiveIndex(undefined);
                }
            }
        }
    }
};


ElementViewerCollection.prototype.activateNext = function() {
    var self = this;

    if ( self.activeIndex < self.list.length - 1 ) {
        self.setActiveIndex( self.activeIndex + 1 );
    }
    else if ( self.activeIndex === self.list.length -1 ) {
        self.setActiveIndex( 0 );
    }
    else {
        self.setActiveIndex( undefined );
    }
};

ElementViewerCollection.prototype.activatePrevious = function() {
    var self = this;

    if ( self.activeIndex > 0 ) {
        self.setActiveIndex( self.activeIndex - 1 );
    }
    else if ( self.activeIndex === 0 ) {
        self.setActiveIndex( self.list.length - 1 );
    }
    else {
        self.setActiveIndex( undefined );
    }
};


ElementViewerCollection.prototype.getIndex = function( elementViewer ) {
    var self = this;

    for ( var i = 0; i < self.list.length; ++i ) {
        if ( this.list[i].uuid === elementViewer.uuid ) {
            return ( i );
        }
    }

    return ( undefined );
};


ElementViewerCollection.prototype.setActiveIndex = function( index ) {
    var self = this;

    if ( index < self.list.length && index >= 0 && self.activeIndex !== index ) {
        self.activeIndex = index;

        $(EventManager).trigger("element-viewer-activated", { viewer: self.list[self.activeIndex], index: index });
    }
};


ElementViewerCollection.prototype.setActive = function( elementViewer ) {
    var self = this;

    var index = self.getIndex( elementViewer );

    if ( index ) {
        self.setActiveIndex( index );
    }

    return ( index );
};


ElementViewerCollection.prototype.getActive = function() {
    var self = this;

    if ( self.activeIndex === undefined ) {
        return undefined;
    }

    return ( self.list[self.activeIndex] );
};

// render the controller (i.e. list of viewers that can be added and a "new" button)
ElementViewerCollection.prototype.renderController = function() {
    var self = this;
    var controllerElement = d3.select( self.controllerElementId );

    controllerElement.html("");

    // create header and controls
    var viewerElementHeaderLeft = controllerElement.append( "div" ).attr( "class", "element-viewer-header" );

    viewerElementHeaderLeft.append( "div" )
            .attr( "class", "element-viewer-editor-button level-1-button" )
            .attr( "id", "element-viewer-add" )
            .on( "click", function() {
                var selector = document.getElementById( 'element-viewer-selector' );
                var elementViewerConfiguration = selector.options[selector.selectedIndex].__data__;
                var elementViewer = new ElementViewer( attributes, selections, elementViewerConfiguration );
                self.add( elementViewer );
                var index = self.getIndex( elementViewer );
                self.activeIndex = index;
                self.renderViewer( true );
            })
        .append( "i" ).
            attr( "class", "fa fw fa-plus" );

    var select = controllerElement.append('select');

    // convert ElementViewerConfiguration into array
    var viewerConfigurationList = $.map(ElementViewerConfigurations, function(value, index) {
        return [value];
    });

    select.attr('id', 'element-viewer-selector')
        .selectAll('option')
            .data( viewerConfigurationList )
        .enter()
            .append('option')
            .attr('value', function (d, i) {
                return i;
            })
        .text(function (d) {
            return d.name;
        });

    var viewerElementHeaderRight = controllerElement.append( "div" ).attr( "class", "element-viewer-header" );

    viewerElementHeaderRight.append( "div" )
            .attr( "class", "element-viewer-editor-button level-1-button" )
            .attr( "id", "element-viewer-previous" )
            .on( "click", function() {
                self.activatePrevious();
            })
        .append( "i" ).
            attr( "class", "fa fw fa-arrow-left" );

    viewerElementHeaderRight.append( "div" )
            .attr( "class", "element-viewer-editor-button level-1-button" )
            .attr( "id", "element-viewer-next" )
            .on( "click", function() {
                self.activateNext();
            })
        .append( "i" ).
            attr( "class", "fa fw fa-arrow-right" );


    viewerElementHeaderRight.append( "div" )
            .attr( "class", "element-viewer-editor-button level-1-button" )
            .attr( "id", "element-viewer-edit" )
            .on( "click", function() {
                self.renderViewer( true );
            })
        .append( "i" ).
            attr( "class", "fa fw fa-pencil" );

    viewerElementHeaderRight.append( "div" )
            .attr( "class", "element-viewer-editor-button level-1-button" )
            .attr( "id", "element-viewer-remove" )
            .on( "click", function() {
                self.remove( self.getActive() );
                self.renderViewer();
            })
        .append( "i" ).
            attr( "class", "fa fw fa-times-circle" );

};

// render the active viewer
ElementViewerCollection.prototype.renderViewer = function( showEditor ) {
    var self = this;

    var viewerElement = d3.select( self.viewerElementId );

    // clear element
    viewerElement.html("");
    viewerElement = viewerElement.append( "div" ).attr( "class", "element-viewer-active" );

    // check if there is a viewer
    if ( self.list.length === 0 ) {
        viewerElement.append( "div" ).attr( "class", "info-message" ).html( 'No visualizations configured. Click <i class="fa fw fa-plus"></i> button to add a new visualization.' );

        return self;
    }

    // if no active viewer is set, use the first one in the list
    if ( self.activeIndex === undefined ) {
        self.activeIndex = 0;
    }

    // === render active viewer ===

    // create viewer
    var id = "element-viewer-" + self.getActive().uuid;

    // create element and render viewer
    viewerElement.append( "div" ).attr( "id", id );

    if ( !showEditor ) {
        self.getActive().renderViewer( '#' + id );
    }
    else {
        self.getActive().renderEditor( '#' + id );
    }

    return self;
};


var ElementViewer = function( attributes, selections, configuration, editorElementId, viewerElementId  ) {
    var self = this;

    self.attributes = attributes;
    self.selections = selections;
    self.editorElementId = editorElementId;
    self.viewerElementId = viewerElementId;
    self.configuration = configuration;
    self.uuid = Utilities.generateUuid();
    self.attributeMap = {};
    self.parameterMap = {};

    self.initializeParameterMap();
};

ElementViewer.prototype.initializeParameterMap = function() {
    var self = this;

    for ( var i = 0; i < self.configuration.parameters.length; ++i ) {
        var parameter = self.configuration.parameters[i];

        self.parameterMap[parameter.variable] = parameter.default;
    }
}


ElementViewer.prototype.renderViewer = function( viewerElementId ) {
    var self = this;

    viewerElementId = viewerElementId || self.viewerElementId;

    try {
        self.configuration.render( viewerElementId, self.selections, self.attributes, self.attributeMap, self.parameterMap )
    }
    catch ( error ) {
        console.error( error );
    }
};


ElementViewer.prototype.renderEditor = function( editorElementId ) {
    var self = this;

    editorElementId = editorElementId || self.editorElementId;

    var element = d3.select( editorElementId );

    element.html( "" );

    var editor = element.append('div').attr( 'id', 'element-viewer-editor-' + self.uuid );

    editor.html( '<div>' +
        '<div class="element-viewer-title">' + self.configuration.name +'</div>' +
        '&nbsp;<span class="element-viewer-editor-button level-2-button element-viewer-editor-save" data-viewer-uuid="' + self.uuid + '""><i class="fa fw fa-check"></i></span>' +
        '&nbsp;<span class="element-viewer-editor-button level-2-button element-viewer-editor-cancel" data-viewer-uuid="' + self.uuid + '""><i class="fa fw fa-times"></i></span>' +
        '</div>');

    d3.selectAll( '.element-viewer-editor-save' ).on( 'click', function(event){
        // parse changes, then render the viewer
        self.parseParameterValues();
        self.parseAttributeValues();

        self.renderViewer( editorElementId );
    });

    d3.selectAll( '.element-viewer-editor-cancel' ).on( 'click', function(event){
        // ignore changes, just render the viewer
        self.renderViewer( editorElementId );
    });

    for ( var i = 0; i < self.configuration.attributes.length; ++i ) {
        var attribute = self.configuration.attributes[i];
        var attributeEditor = editor.append( 'div' ).style( "margin-left", "10px");
        self.renderAttributeEditor( attributeEditor, self.attributes, attribute, self.attributeMap[attribute.variable] );
    }

    for ( var i = 0; i < self.configuration.parameters.length; ++i ) {
        var parameter = self.configuration.parameters[i];
        var parameterEditor = editor.append( 'div' ).style( "margin-left", "10px");
        self.renderParameterEditor( parameterEditor, parameter, self.parameterMap[parameter.variable] );
    }
};


ElementViewer.prototype.parseParameterValues = function() {
    var self = this;
    var parameters = self.configuration.parameters;

    for ( var i = 0; i < parameters.length; ++i ) {
        var value = self.parseParameterValue( parameters[i].variable, parameters[i].type );

        if ( value !== undefined ) {
            //console.log( 'Replacing ' + parameters[i].variable + ' (' + parameters[i].type + ') = "' + self.parameterMap[parameters[i].variable] + '" with "' + value + '"' );
            self.parameterMap[parameters[i].variable] = value;
        }
    }
}

ElementViewer.prototype.parseAttributeValues = function() {
    var self = this;
    var attributes = self.configuration.attributes;

    for ( var i = 0; i < attributes.length; ++i ) {
        var value = self.parseAttributeValue( attributes[i].variable );

        if ( value !== undefined ) {
            //console.log( 'Replacing ' + attributes[i].variable + ' = "' + self.attributeMap[attributes[i].variable] + '" with "' + value + '"' );
            self.attributeMap[attributes[i].variable] = value;
        }
    }
}

ElementViewer.prototype.parseParameterValue = function( parameterVariable, parameterType ) {
    var editor = d3.select('#element-viewer-editor-' + self.uuid );
    if ( editor.length === 0 ) {
        return undefined;
    }

    var value = undefined;

    switch ( parameterType ) {
        case 'float':
            var editor = $('[data-element-viewer-parameter-variable="' + parameterVariable + '"]' );
            value = parseFloat( $( editor ).val() );
            break;
        case 'integer':
            var editor = $('[data-element-viewer-parameter-variable="' + parameterVariable + '"]' );
            value = parseInt( $( editor ).val(), 10 );
            break;
        case 'boolean':
            var editor = $('[data-element-viewer-parameter-variable="' + parameterVariable + '"]' );
            value = Boolean( $( editor ).is( ':checked' ) );
            break;
        case 'string':
            // fall-through
        default:
            var editor = $('[data-element-viewer-parameter-variable="' + parameterVariable + '"]' );
            value = $( editor ).val();
            break;
    }

    return ( value );
}


ElementViewer.prototype.parseAttributeValue = function( attributeVariable ) {
    var editor = d3.select('#element-viewer-editor-' + self.uuid );
    if ( editor.length === 0 ) {
        return undefined;
    }

    var value = undefined;

    editor = $('[data-element-viewer-attribute-variable="' + attributeVariable + '"]' );

    value = parseInt( $( editor ).val(), 10 );

    return ( value );
}


ElementViewer.prototype.renderParameterEditor = function( element, parameter, value ) {
    var self = this;
    var s = "";

    s += '<div data-element-viewer-parameter-type="' + parameter.type + '">';

    switch ( parameter.type ) {
        case 'float':
            s += parameter.name + ' ' + '<input data-element-viewer-parameter-variable="' + parameter.variable + '" type="number" step="0.1" value="' + d3.format('f')(value) + '"></input>';
            break;
        case 'integer':
            s +=  parameter.name + ' ' + '<input data-element-viewer-parameter-variable="' + parameter.variable + '" type="number" step="1" value="' + d3.format('d')(value) + '"></input>';
            break;
        case 'boolean':
            s +=  parameter.name + ' ' + '<input data-element-viewer-parameter-variable="' + parameter.variable + '" type="checkbox" ' + ( value ? 'checked' : '' ) + '></input>';
            break;
        case 'string':
            // fall-through
        default:
            s += parameter.name + ' ' + '<input data-element-viewer-parameter-variable="' + parameter.variable + '" type="text" value="' + value + '"></input>';
            break;
    }

    s += '</div>';

    // add to DOM
    element.html(s);

    // attach events ...
    // none right now
};


ElementViewer.prototype.renderAttributeEditor = function( element, attributes, attribute, value ) {
    var self = this;
    var s = "";

    s += '<div data-element-viewer-attribute-type="' + attribute.type + '">';

    s += '<b>' + attribute.name + '</b>' + '<select data-element-viewer-attribute-variable="' + attribute.variable +'">';
    for ( var i = 0; i < attributes.length; ++i ) {
        if ( Attribute.matchesType( attributes[i].type, attribute.type ) ) {
            if ( value && value === i ) {
                s += '<option value="' + i + '" selected>' + attributes[i].name + '</option>';
            }
            else {
                s += '<option value="' + i + '">' + attributes[i].name + '</option>';
            }
        }
    }
    s += "</select>";
    s += '</div>';

    // add to DOM
    element.html(s);

    // attach events ...
    // none right now
};
/**
 * author: Alexander Lex - alex@seas.harvard.edu
 * author: Nils Gehlenborg - nils@hms.harvard.edu
 * author: Hendrik Srtobelt - strobelt@seas.harvard.edu
 * author: Romain Vuillemot - romain.vuillemot@gmail.com
 */

var dataSetDescriptions = []
var queryParameters = {};
var initCallback; // function to call when dataset is loaded
var globalCtx;

function initData(ctx, callback, datasets) {
    dataSetDescriptions = [];

    retrieveQueryParameters();
    setUpGUIElements();

    initCallback = callback;
    globalCtx = ctx;
    if (!datasets) {
        $.when($.ajax({ url: 'datasets.json', dataType: 'json' })).then(
            function (data, textStatus, jqXHR) {
                loadDataSetDescriptions(data);
            },
            function (data, textStatus, jqXHR) {
                console.error('Error loading "' + this.url + '".');
            });
    } else {
        loadDataSetDescriptions(datasets);
    }

    /// registering custom dataset function
    $("#custom-dataset-submit").on('click', function () {
        var url = $("#custom-dataset-url").val();
        if (url != null) {
            loadDataSetDescriptions([url], true);
            queryParameters['dataset'] = dataSetDescriptions.length;
        }
    })

}

var handleDatasetDescription = function (result) {
    if (result != undefined) {
        dataSetDescriptions.push(result);
    }
}

var loadDataAfterAjaxComplete = function () {

}

var populateDSSelector = function () {

    // updating the drop-down box
    d3.select("#header-ds-selector")
        .selectAll('option').data(dataSetDescriptions).enter().append('option')
        .attr('value', function (d, i) {
            return i;
        })
        .attr('id', 'dataSetSelector')
        .text(function (d) {
            return d.name + ' ' + '(' + getNumberOfSets(d) + ' sets, ' + getNumberOfAttributes(d) + ' attributes' + ')';
        })
        .property('selected', function (d, i) {
            return (i === queryParameters['dataset'])
        });

    d3.select("#header-ds-selector").on('change', setQueryParametersAndChangeDataset);
}

function loadDataSetDescriptions(dataSetList) {

    var descriptions = [];
    //  var descriptionDeferreds = [];
    var requests = [];
    // launch requests to load data set descriptions
    for (var i = 0; i < dataSetList.length; ++i) {
        var url = dataSetList[i];
        if ($.type(url) === 'string') {
            requests.push($.ajax({ url: url, dataType: 'json', success: handleDatasetDescription}));
        } else {
            handleDatasetDescription(url);
        }
    }

    $.when.apply(undefined, requests).then(loadDataSetFromQueryParameters, handleDataSetError);
}

var handleDataSetError = function (jqXHR, textStatus, errorThrown) {
    alert("Could not load dataset. \n Error: " + errorThrown)
}

function loadDataSetFromQueryParameters() {
    populateDSSelector();
    $(EventManager).trigger("loading-dataset-started", { description: dataSetDescriptions[queryParameters['dataset']]  });
    //(queryParameters['dataset']);
    changeDataset();
}

var setQueryParametersAndChangeDataset = function () {
    queryParameters['dataset'] = this.options[this.selectedIndex].value;
    changeDataset();
}

/**
 * Replace or load a new dataset based on the dataset index in the query parameters
 */
var changeDataset = function () {

    $(EventManager).trigger("loading-dataset-started", { description: dataSetDescriptions[queryParameters['dataset']]  });

    sets.length = 0;
    subSets.length = 0;
    usedSets.length = 0;
    dataRows.length = 0;
    depth = 0;
    allItems.length = 0;
    attributes.length = 0;
    selectedAttributes = {};
    previousState = undefined;

    UpSetState.logicGroups = [];
    UpSetState.logicGroupChanged = true;

    loadDataSet(queryParameters['dataset']);

    // updateQueryParameters();

    clearSelections();
}

function loadDataSet(index) {
    processDataSet(dataSetDescriptions[index]);
}

function processDataSet(dataSetDescription) {
    if (dataSetDescription.file) {
        d3.text(dataSetDescription.file, 'text/csv', function (data) {
            parseDataSet(data, dataSetDescription);
            run();
        });
    } else {
      parseDataSet(dataSetDescription.data, dataSetDescription);
      run();
    }
}

/**
 * Setting up the html GUI elements
 */
var setUpGUIElements = function () {

    var maxCardSpinner = document.getElementById('maxCardinality');
    var minCardSpinner = document.getElementById('minCardinality');

    var updateCardinality = function (e) {
        UpSetState.maxCardinality = maxCardSpinner.value;
        UpSetState.minCardinality = minCardSpinner.value;
        UpSetState.forceUpdate = true;
        run();
    };

    maxCardSpinner.addEventListener('input', updateCardinality);
    minCardSpinner.addEventListener('input', updateCardinality);

    var hideEmptiesCheck = document.getElementById('hideEmpties');

    var hideEmptiesFu = function (e) {
        UpSetState.hideEmpties = hideEmptiesCheck.checked;
        updateState();
        // TODO: need to call updateTransition instead, but this needs to be exposed first
        plot();
        plotSetOverview();
    };
    hideEmptiesCheck.addEventListener('click', hideEmptiesFu);

    var dataSelect = d3.select("#dataset-selector").append('div');

    var select = dataSelect.append('select').attr("id", "header-ds-selector");

    dataSelect.append('span').attr("class", "header-right").text('Choose Dataset');
}

function retrieveQueryParameters() {

    // Variables from query string
    var queryString = location.search.substring(1),
        re = /([^&=]+)=([^&]*)/g, m;

    // Creates a map with the query string parameters
    while (m = re.exec(queryString)) {
        queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    queryParameters['dataset'] = parseInt(queryParameters['dataset']) || 0;
    queryParameters['duration'] = queryParameters['duration'] || 1000;
    queryParameters['orderBy'] = queryParameters['orderBy'] || "subsetSize"; // deviation, intersection, specific set
    queryParameters['grouping'] = queryParameters['grouping'] == "undefined" ? undefined : queryParameters['grouping'] || "groupBySet"; // groupByIntersectionSize,
    queryParameters['selection'] = queryParameters['selection'] || "";
    // Missing item space query..

}

function updateQueryParameters() {
    var urlQueryString = "";
    if (Object.keys(queryParameters).length > 0) {
        urlQueryString = "?";
        for (var q in queryParameters) {
            urlQueryString += (q + "=" + queryParameters[q]) + "&";
        }
        urlQueryString = urlQueryString.substring(0, urlQueryString.length - 1);
    }

    history.replaceState({}, 'Upset', window.location.origin + window.location.pathname + urlQueryString);
}

function clearSelections() {
    selections = new SelectionList();
}

function createInitialSelection() {
    var selection = new Selection(allItems, new FilterCollection("#filters-controls", "#filters-list"));

    selections.addSelection(selection, true);
    selections.setActive(selection);
}

function run() {

    elementViewers.reset();

    setUpSubSets();
    // setUpGroupings();
    updateState();
    initCallback.forEach(function (callback) {
        callback();
    })
//    plot();

//    plotSetSelection();
    selections.setActive();
    //createInitialSelection();
    plotSetOverview({initialize: true});

    $(EventManager).trigger("loading-dataset-finished", { });
}

function getNumberOfSets(dataSetDescription) {
    var sets = 0;

    for (var i = 0; i < dataSetDescription.sets.length; ++i) {
        var setDefinitionBlock = dataSetDescription.sets[i];

        if (setDefinitionBlock.format === 'binary') {
            sets += setDefinitionBlock.end - setDefinitionBlock.start + 1;
        }
        else {
            console.error('Set definition format "' + setDefinitionBlock.format + '" not supported');
        }
    }

    return ( sets );
}

function getNumberOfAttributes(dataSetDescription) {
    return ( dataSetDescription.meta.length );
}

function getIdColumn(dataSetDescription) {
    for (var i = 0; i < dataSetDescription.meta.length; ++i) {
        if (dataSetDescription.meta[i].type === "id") {
            return dataSetDescription.meta[i].index;
        }
    }

    // id column not defined, assume 0
    return 0;
}

function parseDataSet(data, dataSetDescription) {
    // the raw set arrays
    var rawSets = [];
    var setNames = [];

    var file;
    if ($.type(data) === 'string') {
        var dsv = d3.dsv(dataSetDescription.separator, 'text/plain');
        file = dsv.parseRows(data);
    } else {
        file = data;
    }

    // the names of the sets are in the columns
    var header = file[dataSetDescription.header];

    // remove header
    file.splice(dataSetDescription.header, 1);

    // load set assignments
    var processedSetsCount = 0;
    for (var i = 0; i < dataSetDescription.sets.length; ++i) {
        var setDefinitionBlock = dataSetDescription.sets[i];

        if (setDefinitionBlock.format === 'binary') {
            var setDefinitionBlockLength = setDefinitionBlock.end - setDefinitionBlock.start + 1;

            // initialize the raw set arrays
            for (var setCount = 0; setCount < setDefinitionBlockLength; ++setCount) {
                rawSets.push(new Array());
            }

            var rows = file.map(function (row, rowIndex) {
                return row.map(function (value, columnIndex) {

                    if (columnIndex >= setDefinitionBlock.start && columnIndex <= setDefinitionBlock.end) {
                        var intValue = parseInt(value, 10);

                        if (isNaN(intValue)) {
                            console.error('Unable to convert "' + value + '" to integer (row ' + rowIndex + ', column ' + columnIndex + ')');
                        }

                        return intValue;
                    }

                    return null;
                });
            });
            // iterate over columns defined by this set definition block
            for (var r = 0; r < rows.length; r++) {
                // increment number of items in data set
                // only increment depth when we are processing the first set definition block (we will already iterate overall rows)
                if (i === 0) {
                    allItems.push(depth++);
                }

                for (var s = 0; s < setDefinitionBlockLength; ++s) {
                    rawSets[processedSetsCount + s].push(rows[r][setDefinitionBlock.start + s]);

                    if (r === 1) {
                        setNames.push(header[setDefinitionBlock.start + s]);
                    }
                }
            }

            processedSetsCount += setDefinitionBlockLength;
        }
        else {
            console.error('Set definition format "' + setDefinitionBlock.format + '" not supported');
        }
    }

    // initialize sets and set IDs
    var setPrefix = "S_";
    //var setID = 1;
    for (var i = 0; i < rawSets.length; i++) {
        var combinedSets = Array.apply(null, new Array(rawSets.length)).map(Number.prototype.valueOf, 0);
        combinedSets[i] = 1;
        var set = new Set(setPrefix + i, setNames[i], combinedSets, rawSets[i]);
        setIdToSet[setPrefix + i] = set;
        sets.push(set);
        if (i < nrDefaultSets) {
            set.isSelected = true;
            usedSets.push(set);
        }
        // setID = setID << 1;
    }

    // initialize attribute data structure
    attributes.length = 0;
    for (var i = 0; i < dataSetDescription.meta.length; ++i) {
        var metaDefinition = dataSetDescription.meta[i];

        attributes.push({
            name: metaDefinition.name || header[metaDefinition.index],
            type: metaDefinition.type,
            values: [],
            sort: 1
        });
    }

    // add implicit attributes
    var setCountAttribute = {
        name: 'Set Count',
        type: 'integer',
        values: [],
        sort: 1,
        min: 0
    };

    for (var d = 0; d < depth; ++d) {
        var setCount = 0;
        for (var s = 0; s < rawSets.length; s++) {
            setCount += rawSets[s][d];
        }
        setCountAttribute.values[d] = setCount;
    }
    attributes.push(setCountAttribute);

    var setsAttribute = {
        name: 'Sets',
        type: 'sets',
        values: [],
        sort: 1
    };

    for (var d = 0; d < depth; ++d) {
        var setList = [];
        for (var s = 0; s < rawSets.length; s++) {
            if (rawSets[s][d] === 1) {
                //setList.push(Math.floor(Math.pow(2, s)));
                setList.push(sets[s].id)
            }
        }
        setsAttribute.values[d] = setList;
    }
    attributes.push(setsAttribute);

    // load meta data
    for (var i = 0; i < dataSetDescription.meta.length; ++i) {
        var metaDefinition = dataSetDescription.meta[i];

        attributes[i].values = file.map(function (row, rowIndex) {
            var value = row[metaDefinition.index];
            switch (metaDefinition.type) {
                case 'integer':
                    var intValue = parseInt(value, 10);
                    if (isNaN(intValue)) {
                        console.error('Unable to convert "' + value + '" to integer.');
                        return NaN;
                    }
                    return intValue;
                case 'float':
                    var floatValue = parseFloat(value, 10);
                    if (isNaN(floatValue)) {
                        console.error('Unable to convert "' + value + '" to float.');
                        return NaN;
                    }
                    return floatValue;
                case 'id':
                // fall-through
                case 'string':
                // fall-through
                default:
                    return value;
            }

        });
    }

    var max

    // add meta data summary statistics
    for (var i = 0; i < attributes.length; ++i) {

        if (attributes[i].type === "float" || attributes[i].type === "integer") {
            // explictly defined attributes might have user-defined ranges
            if (i < dataSetDescription.meta.length) {
                attributes[i].min = dataSetDescription.meta[i].min || Math.min.apply(null, attributes[i].values);
                attributes[i].max = dataSetDescription.meta[i].max || Math.max.apply(null, attributes[i].values);
            }
            // implicitly defined attributes
            else {
                attributes[i].min = attributes[i].min || Math.min.apply(null, attributes[i].values);
                attributes[i].max = attributes[i].max || Math.max.apply(null, attributes[i].values);
            }
        }
    }

    UpSetState.maxCardinality = attributes[attributes.length - 2].max;
    if (isNaN(UpSetState.maxCardinality)) {
        // fixme hack to make it work without attributes
        UpSetState.maxCardinality = sets.length;
    }
    var maxCardSpinner = document.getElementById('maxCardinality');
    maxCardSpinner.value = UpSetState.maxCardinality;
    maxCardSpinner.max = UpSetState.maxCardinality;
    var minCardSpinner = document.getElementById('minCardinality');
    minCardSpinner.max = UpSetState.maxCardinality;

    updateDatasetInformation(dataSetDescription)

}

var updateDatasetInformation = function (dataSetDescription) {

    var infoBox = $('#dataset-info-content');
    infoBox.empty();
    //infoBox.append('<hr><br />');
    infoBox.append('<p style="padding-bottom: 5px">');
    infoBox.append("<b>Name:</b> " + dataSetDescription.name + "<br />");
    infoBox.append("<b># Sets:</b> " + sets.length + "<br />");
    infoBox.append("<b># Attributes</b>: " + attributes.length + "<br />");
    infoBox.append("<b># Elements:</b> " + depth + "<br />");
    infoBox.append('</p> <p style="padding-bottom: 10px">');
    if (dataSetDescription.author) {
        infoBox.append("<b>Author</b>: " + dataSetDescription.author + "<br />");
    }
    if (dataSetDescription.description) {
        infoBox.append("<b>Description:</b> <br />" + dataSetDescription.description + "<br />");
    }
    if (dataSetDescription.source) {
        if (dataSetDescription.source.indexOf("http://") == 0) {
            var urlText = dataSetDescription.source;
            var numCharacters = 22;
            if (urlText.length > numCharacters) {
                urlText = urlText.substring(0, numCharacters) + ".."
            }

            infoBox.append("<b>Source:</b> <br /><a href=\"" + dataSetDescription.source + "\">" + urlText + "</a><br />");

        } else {
            infoBox.append("<b>Source:</b> <br />" + dataSetDescription.source + "<br />");
        }
    }

    infoBox.append('</p>');

}

function createSignature(listOfUsedSets, listOfSets) {
    return listOfUsedSets.map(function (d) {
        return (listOfSets.indexOf(d) > -1) ? 1 : 0
    }).join("")

}

function setUpSubSets() {

    $(EventManager).trigger("computing-subsets-started", undefined);

    combinations = Math.pow(2, usedSets.length) - 1;

    subSets.length = 0;

    var aggregateIntersection = {}

    var listOfUsedSets = usedSets.map(function (d) {
        return d.id
    })

    var setsAttribute = attributes.filter(function (d) {
        return d.type == "sets"
    })[0];

    var signature = "";

    var itemList;
    //HEAVY !!!
    setsAttribute.values.forEach(function (listOfSets, index) {
        signature = createSignature(listOfUsedSets, listOfSets)
        itemList = aggregateIntersection[signature];
        if (itemList == null) {
            aggregateIntersection[signature] = [index];
        } else {
            itemList.push(index);
        }
    })

    // used Variables for iterations
    var tempBitMask = 0;
    var usedSetLength = usedSets.length
    var combinedSetsFlat = "";
    var actualBit = -1;
    var names = [];

    if (usedSetLength > 20) { // TODo HACK !!!!
        Object.keys(aggregateIntersection).forEach(function (key) {
            var list = aggregateIntersection[key]

            var combinedSets = key.split("");

            //combinedSetsFlat = combinedSets.join("");

//            if (card>UpSetState.maxCardinality) continue;//UpSetState.maxCardinality = card;
//            if (card<UpSetState.minCardinality) continue;//UpSetState.minCardinality = card;

            names = [];
            var expectedValue = 1;
            var notExpectedValue = 1;
            // go over the sets
            combinedSets.forEach(function (d, i) {
                    if (d == 1) { // if set is present
                        names.push(usedSets[i].elementName);
                        expectedValue = expectedValue * usedSets[i].dataRatio;
                    } else {
                        notExpectedValue = notExpectedValue * (1 - usedSets[i].dataRatio);
                    }
                }
            );

            //        console.log(expectedValue, notExpectedValue);
            expectedValue *= notExpectedValue;

            //        console.log(combinedSetsFlat);

            var name = "";
            if (names.length > 0) {
                name = names.reverse().join(" ") + " " // not very clever
            }

            //        var arghhList = Array.apply(null,new Array(setsAttribute.values.length)).map(function(){return 0})
            //        list.forEach(function(d){arghhList[d]=1});

//            console.log(parseInt(key,2), name, combinedSets, list, expectedValue);

            var subSet = new SubSet(bitMask, name, combinedSets, list, expectedValue);
            subSets.push(subSet);

        })

    } else {
        for (var bitMask = 0; bitMask <= combinations; bitMask++) {
            tempBitMask = bitMask;//originalSetMask

            var card = 0;
            var combinedSets = Array.apply(null, new Array(usedSetLength)).map(function () {  //combinedSets
                actualBit = tempBitMask % 2;
                tempBitMask = (tempBitMask - actualBit) / 2;
                card += actualBit;
                return +actualBit
            }).reverse() // reverse not necessary.. just to keep order

            combinedSetsFlat = combinedSets.join("");

            if (card > UpSetState.maxCardinality) continue;//UpSetState.maxCardinality = card;
            if (card < UpSetState.minCardinality) continue;//UpSetState.minCardinality = card;

            names = [];
            var expectedValue = 1;
            var notExpectedValue = 1;
            // go over the sets
            combinedSets.forEach(function (d, i) {


                    //                console.log(usedSets[i]);
                    if (d == 1) { // if set is present
                        names.push(usedSets[i].elementName);
//                    expectedValue*=expectedValueForOneSet;
                        expectedValue = expectedValue * usedSets[i].dataRatio;
                    } else {
                        notExpectedValue = notExpectedValue * (1 - usedSets[i].dataRatio);
                    }
                }
            );

            //        console.log(expectedValue, notExpectedValue);
            expectedValue *= notExpectedValue;

            //        console.log(combinedSetsFlat);
            var list = aggregateIntersection[combinedSetsFlat];
            if (list == null) {
                list = [];
            }

            var name = "";
            if (names.length > 0) {
                name = names.reverse().join(" ") + " " // not very clever
            }

            //        var arghhList = Array.apply(null,new Array(setsAttribute.values.length)).map(function(){return 0})
            //        list.forEach(function(d){arghhList[d]=1});

            var subSet = new SubSet(bitMask, name, combinedSets, list, expectedValue);
            subSets.push(subSet);
        }
    }
    aggregateIntersection = {};

//    var subSet = new SubSet(originalSetMask, name, combinedSets, combinedData, expectedValue);
//    subSets.push(subSet);
//
//    for (var i = 0; i <= combinations; i++) {
//        makeSubSet(i)
//    }

    $(EventManager).trigger("computing-subsets-finished", undefined);

}

function updateSetContainment(set, refresh) {
    if (!set.isSelected) {
        set.isSelected = true;
        usedSets.push(set);
        $(EventManager).trigger("set-added", { set: set });
    }
    else {
        set.isSelected = false;

        var index = usedSets.indexOf(set);
        if (index > -1) {
            usedSets.splice(index, 1);
            $(EventManager).trigger("set-removed", { set: set });
        }
    }

    if (refresh) {
        subSets.length = 0;
        dataRows.length = 0;
        setUpSubSets();
        //  setUpGroupings();
        previousState = undefined;
        updateState();

//        ctx.updateHeaders();
//
//        plot();
//        plotSetSelection();
        plotSetOverview();
        initCallback.forEach(function (callback) {
            callback();
        })

//        ctx.svg.attr("width", ctx.w)
//        d3.selectAll(".svgGRows, .foreignGRows").attr("width", ctx.w)
//        d3.selectAll(".backgroundRect").attr("width", ctx.w - ctx.leftOffset)
    }
}

function addSet(set) {

}

function removeSet(set) {
    console.log('Not implemented');
}
/**
 * author: Nils Gehlenborg - nils@hms.harvard.edu
*/


$(EventManager).bind("filter-removed", function (event, data) {
    selections.getActive().filterCollection.renderFilters();
});


$(EventManager).bind("filter-added", function (event, data) {
});


$(EventManager).bind("filter-activated", function (event, data) {
});

var FilterConfigurations = {
    // subset filter
    subset: {
      name: "Subset",
      types: ["sets"],
      parameters: [ { name: "Subset", type: "subset", variable: "subset" } ],
      test: function( item, attribute, parameters ) {
            /* subset definition example:
                key = set id, value = yes or no
                { 0: 1, 1: 1, 4: 0, 512: 1 }
                sets not listed are treated as "*" (do not care)
             */

            var itemSets = attribute.values[item];

            // iterate over keys in subset definitions
            for (var id in parameters.subset) {
                if (parameters.subset.hasOwnProperty(id)) {
                    // set id is 1 => set is selected
                    if ( parameters.subset[id] === 1 && itemSets.indexOf( id ) < 0 ) {
                        // set id is selected but not found in item sets
                        return false;
                    }

                    if ( parameters.subset[id] === 0 && itemSets.indexOf( id ) >= 0 ) {
                        // set id is not selected but found in item sets
                        return false;
                    }
                }
            }

            return true;
        }
    },
    // string match filter
    stringMatch: {
      name: "Contains",
      types: ["string", "id"],
      parameters: [ { name: "String", type: "string", variable: "pattern", default: "" } ],
      test: function( item, attribute, parameters ) {
            return ( attribute.values[item].indexOf( parameters.pattern ) >= 0 );
        }
    },
    // exact string length filter
    stringLength: {
      name: "String Length",
      types: ["string", "id"],
      parameters: [ { name: "Length", type: "integer", variable: "len", default: 0 } ],
      test: function( item, attribute, parameters ) {
            return ( attribute.values[item].length === parameters.len );
        }
    },
    // string match filter
    stringRegex: {
      name: "Regular Expression",
      types: ["string", "id"],
      parameters: [ { name: "Pattern", type: "string", variable: "pattern", default: "." } ],
      test: function( item, attribute, parameters ) {
            return ( attribute.values[item].match( parameters.pattern ) !== null );
        }
    },
    // numeric range filter
    numericRange: {
      name: "Range",
      types: ["float", "integer"],
      parameters: [ { name: "Minimum", type: "float", variable: "min", default: 0 }, { name: "Maximum", type: "float", variable: "max", default: 1 } ],
      test: function( item, attribute, parameters ) {
            return ( attribute.values[item] >= parameters.min && attribute.values[item] <= parameters.max );
        }
    },
    // numeric minimum filter
    numericMinimum: {
      name: "Minimum",
      types: ["float", "integer"],
      parameters: [ { name: "Minimum", type: "float", variable: "min", default: 0 } ],
      test: function( item, attribute, parameters ) {
            return ( attribute.values[item] >= parameters.min );
        }
    },
    // numeric maximum filter
    numericMaximum: {
      name: "Maximum",
      types: ["float", "integer"],
      parameters: [ { name: "Maximum", type: "float", variable: "max", default: 0 } ],
      test: function( item, attribute, parameters ) {
            return ( attribute.values[item] <= parameters.max );
        }
    }
};



var FilterCollection = function( controllerElementId, filterElementId ) {
    var self = this;

    self.list = [];

    self.controllerElementId = controllerElementId;
    self.filterElementId = filterElementId;
};


FilterCollection.prototype.add = function( filter ) {
    var self = this;

    self.list.push( filter );

    $(EventManager).trigger("filter-added", { viewer: filter });
};


FilterCollection.prototype.remove = function( filter ) {
    var self = this;

    for ( var i = 0; i < self.list.length; ++i ) {
        if ( self.list[i].uuid === filter.uuid ) {
            self.list.splice(i, 1);

            $(EventManager).trigger("filter-removed", { viewer: filter });
        }
    }
};


FilterCollection.prototype.getIndex = function( filter ) {
    var self = this;

    for ( var i = 0; i < self.list.length; ++i ) {
        if ( self.list[i].uuid === filter.uuid ) {
            return ( i );
        }
    }

    return ( undefined );
};


FilterCollection.prototype.get = function( uuid ) {
    var self = this;

    for ( var i = 0; i < self.list.length; ++i ) {
        if ( self.list[i].uuid === uuid ) {
            return ( self.list[i] );
        }
    }

    return ( undefined );
};



// render the controller (i.e. list of viewers that can be added and a "new" button)
FilterCollection.prototype.renderController = function() {
    var self = this;
    var controllerElement = d3.select( self.controllerElementId );

    controllerElement.html("");

    // create header and controls
    var viewerElementHeader = controllerElement.append( "div" ).attr( "class", "filter-header" );

    viewerElementHeader.append( "div" )
            .attr( "class", "filter-editor-button level-1-button" )
            .attr( "id", "filter-add" )
            .on( "click", function() {
                var filterSelector = document.getElementById( 'filter-selector' );
                var configuration = filterSelector.options[filterSelector.selectedIndex].__data__;
                var attributeSelector = document.getElementById( 'attribute-selector' );
                var attribute = attributeSelector.options[attributeSelector.selectedIndex].__data__;
                var filter = new Filter( attribute, configuration );

                // if this is the first filter, make sure that the parent element (filters-list) is empty
                if ( self.list.length == 0 ) {
                    d3.select('#filters-list').html("");
                }

                self.add( filter );

                // add DOM nodes for filter viewer and editor
                d3.select(self.filterElementId).insert( 'div' ).attr('class', 'filter-editor').attr( 'id', filter.editorElementId.substring(1) );
                filter.renderEditor( d3.select( filter.editorElementId ), selections.getActive() );
            })
        .append( "i" ).
            attr( "class", "fa fw fa-plus" );

    var attributeSelect = controllerElement.append('select');
    var filterSelect = controllerElement.append('select');
    filterSelect.attr('id', 'filter-selector');

    attributeSelect.attr('id', 'attribute-selector')
        .selectAll('option')
            .data( attributes )
        .enter()
            .append('option')
            .attr('value', function (d, i) {
                return i;
            })
        .text(function (d) {
            return d.name;
        });

    attributeSelect.on('changeDataset', self.initializeFilterList );
    self.initializeFilterList();

};

FilterCollection.prototype.initializeFilterList = function() {
    var filterSelect = d3.select( "#filter-selector");
    filterSelect.html("");
    filterSelect.selectAll('option')
            .data( function() {
                // convert FilterConfiguration into array
                // return only those filters that can be applied to the selected attribute
                return $.map(FilterConfigurations, function(value, index) {
                    var selector = document.getElementById( 'attribute-selector' );
                    var attribute = selector.options[selector.selectedIndex].__data__;
                    if ( value.types.indexOf( attribute.type ) >= 0 ) {
                        return [value];
                    }
                });
            })
        .enter()
            .append('option')
            .attr('value', function (d, i) {
                return i;
            })
        .text(function (d) {
            return d.name;
        });
};

// render the active viewer
FilterCollection.prototype.renderFilters = function() {
    var self = this;

    var filterElement = d3.select( self.filterElementId );

    // clear element
    filterElement.html("");
    filterElement = filterElement.append( "div" ); //.attr( "class", "filter-active" );

    // check if there is a viewer
    if ( self.list.length === 0 ) {
        filterElement.append( "div" ).attr( "class", "info-message" ).html( 'No filters configured. Click <i class="fa fw fa-plus"></i> button to add a new filter.' );

        return self;
    }
    else {
        for ( var f = 0; f < self.list.length; ++f ) {
            var filter = self.list[f];
            filterElement.append( 'div' ).attr( 'id', filter.editorElementId.substring(1) );
            filter.renderViewer( d3.select( filter.editorElementId ), selections.getActive() );
        }
    }

    return self;
};

var Filter = function(attribute, configuration,parameterMap) {
    var self = this;

    self.attribute = attribute;
    self.uuid = Utilities.generateUuid();
    self.editorElementId = '#filter-editor-' + self.uuid;
    //self.viewerElementId = '#filter-viewer-' + self.uuid;
    self.configuration = configuration;
    self.parameterMap = {};

    if ( !parameterMap ) {
        self.initializeParameterMap();
    }
    else {
        self.parameterMap = parameterMap;
    }
};

Filter.prototype.initializeParameterMap = function() {
    var self = this;

    for ( var i = 0; i < self.configuration.parameters.length; ++i ) {
        var parameter = self.configuration.parameters[i];

        self.parameterMap[parameter.variable] = parameter.default;
    }
};

/*
Filter.prototype.getList = function( type ) {
    var typeList = [];

    if ( !type ) {
        for (var filter in this.list) {
            if (this.list.hasOwnProperty(filter)) {
                typeList.push(filter);
            }
        }
    }
    else {
        for (var filter in this.list) {
            if (this.list.hasOwnProperty(filter)) {
                if ( this.list[filter].types.indexOf( type ) >= 0 ) {
                    typeList.push(filter);
                }
            }
        }
    }

    return typeList;
};
*/


Filter.prototype.renderViewer = function( element, selection ) {
    var self = this;

    var parameters = self.parameterMap;
    var filterViewer = element;

    filterViewer.attr( 'class', 'filter-viewer' );

    filterViewer.html( '<div>' +
        '<span class="filter-button level-2-button filter-remove" data-filter-uuid="' + self.uuid + '""><i class="fa fw fa-times-circle"></i></span>' +
        '<span class="filter-button level-2-button filter-edit" data-filter-uuid="' + self.uuid + '""><i class="fa fw fa-pencil"></i></span>' +
        '&nbsp;<b>' + self.configuration.name + '</b>&nbsp;|&nbsp;' + self.attribute.name +'</div>');

    $('.filter-edit[data-filter-uuid="' + self.uuid + '"]').on( 'click', function(){
        self.renderEditor( element, selection, self.uuid );
    });

    $( '.filter-remove[data-filter-uuid="' + self.uuid + '"]').on( 'click', function(){
        $( self.editorElementId ).remove();
        selection.filterCollection.remove( self );
        selection.applyFilters();
    });


    var parameterType = undefined;
    var parameterName = undefined;
    for ( var parameterVariable in parameters ) {
        if ( parameters.hasOwnProperty(parameterVariable) ) {
            var parameterViewer = filterViewer.append( 'div' ).attr( 'class', 'filter-parameter-viewer' );

            // look up parameter type in filter instance
            for ( var p = 0; p < self.configuration.parameters.length; ++p ) {
                if ( self.configuration.parameters[p].variable === parameterVariable ) {
                    parameterType = self.configuration.parameters[p].type;
                    parameterName = self.configuration.parameters[p].name;
                }
            }

            this.renderParameterViewer( parameterViewer, parameterName, parameterType, parameters[parameterVariable] );
        }
    }
};

Filter.prototype.renderEditor = function( element, selection ) { // filterId, attributeId, parameters
    var self = this;

    var parameters = self.parameterMap;
    var filterEditor = element;

    filterEditor.html( '<div>' +
        '<span class="filter-button level-2-button filter-cancel" data-filter-uuid="' + self.uuid + '""><i class="fa fw fa-times"></i></span>' +
        '<span class="filter-button level-2-button filter-save" data-filter-uuid="' + self.uuid + '""><i class="fa fw fa-check"></i></span>' +
        '&nbsp;<b>' + self.configuration.name + '</b>&nbsp;|&nbsp;' + self.attribute.name +'</div>');

    $('.filter-save[data-filter-uuid="' + self.uuid + '"]').on( 'click', function(){
        self.parseParameterValues( selection );
        selection.applyFilters();
        self.renderViewer( element, selection );
    });

    $('.filter-cancel[data-filter-uuid="' + self.uuid + '"]').on( 'click', function(){
        self.renderViewer( element, selection );
    });

    var parameterType = undefined;
    var parameterName = undefined;
    for ( var parameterVariable in parameters ) {
        if ( parameters.hasOwnProperty(parameterVariable) ) {
            var parameterEditor = filterEditor.append( 'div' );

            // look up parameter type in filter instance
            for ( var p = 0; p < self.configuration.parameters.length; ++p ) {
                if ( self.configuration.parameters[p].variable === parameterVariable ) {
                    parameterType = self.configuration.parameters[p].type;
                    parameterName = self.configuration.parameters[p].name;
                }
            }

            self.renderParameterEditor( parameterEditor, parameterName, parameterType, parameters[parameterVariable], parameterVariable );
        }
    }
};


Filter.prototype.renderParameterViewer = function( element, parameterName, parameterType, parameterValue ) {

    switch ( parameterType ) {
        case 'float':
            element.html( '<i>' + parameterName + '</i> = ' + d3.format('f')(parameterValue) );
            break;
        case 'integer':
            element.html( '<i>' + parameterName + '</i> = ' + d3.format('d')(parameterValue) );
            break;
        case 'subset':
            var s = "";
            var subset = parameterValue;

            for (var id in subset) {
                if (subset.hasOwnProperty(id)) {
                    s += '<span title="' + setIdToSet[id].elementName + '">' + '<i class="' + this.subsetStateToClass( subset[id] ) + '"></i>';
                    s += '</span>&nbsp;';
                }
            }
            element.html( s );
            break;
        case 'string':
            // fall-through
        default:
            element.html( '<i>' + parameterName + '</i> = "' + parameterValue + '"' );
            break;
    }
};

Filter.prototype.parseParameterValues = function( selection ) {
    var self = this;
    var filterParameters = self.configuration.parameters;
    var filterInstanceParameters = self.parameterMap;

    for ( var i = 0; i < filterParameters.length; ++i ) {
        var value = self.parseParameterValue( filterParameters[i].variable, filterParameters[i].type );

        if ( value ) {
    //        console.log( 'Replacing ' + filterParameters[i].variable + ' (' + filterParameters[i].type + ') = "' + filterInstanceParameters[filterParameters[i].variable] + '" with "' + value + '"' );
            filterInstanceParameters[filterParameters[i].variable] = value;
        }
    }
}

Filter.prototype.parseParameterValue = function( parameterVariable, parameterType ) {
    var self = this;

    var filterEditor = $( self.editorElementId );

    var value = undefined;

    switch ( parameterType ) {
        case 'float':
            var parameterEditor = filterEditor.find('[data-filter-parameter-variable="' + parameterVariable + '"]' );
            value = parseFloat( $( parameterEditor ).val() );
            break;
        case 'integer':
            var parameterEditor = filterEditor.find('[data-filter-parameter-variable="' + parameterVariable + '"]' );
            value = parseInt( $( parameterEditor ).val(), 10 );
            break;
        case 'subset':
            value = {};
            var parameterEditor = filterEditor.find( ".subset-state-toggle-button" ).each(function() {
                value[this.dataset.subset] = +this.dataset.subsetState;
            });
         //   console.log( value );
            break;
        case 'string':
            // fall-through
        default:
            var parameterEditor = filterEditor.find('[data-filter-parameter-variable="' + parameterVariable + '"]' );
            value = $( parameterEditor ).val();
            break;
    }

    return ( value );
}

Filter.prototype.renderParameterEditor = function( element, parameterName, parameterType, parameterValue, parameterVariable ) {
    var self = this;
    var s = "";

    s += '<div data-filter-parameter-type="' + parameterType + '">';

    switch ( parameterType ) {
        case 'float':
            s += '<i>' + parameterName + '</i> = ' + '<input data-filter-parameter-variable="' + parameterVariable + '" type="number" step="0.1" value="' + d3.format('f')(parameterValue) + '"></input>';
            break;
        case 'integer':
            s +=  '<i>' + parameterName + '</i> = ' + '<input data-filter-parameter-variable="' + parameterVariable + '" type="number" step="1" value="' + d3.format('d')(parameterValue) + '"></input>';
            break;
        case 'subset':
            var subset = parameterValue;
            for (var id in subset) {
                if (subset.hasOwnProperty(id)) {
                    s += '<span class="subset-state-toggle-button" data-subset="' + id + '" data-subset-state="' + subset[id] + '">' + '<i class="' + this.subsetStateToClass( subset[id] ) + '"></i>';
                    s += ' ' + setIdToSet[id].elementName + ' <small>' + (setIdToSet[id].setSize === 0 ? '<i class="fa fa-warning"></i> 0 items' : '') + '</small>' + '</span><br>';
                }
            }
            break;
        case 'string':
            // fall-through
        default:
            s += '<i>' + parameterName + '</i> = ' + '<input data-filter-parameter-variable="' + parameterVariable + '" type="text" value="' + parameterValue + '"></input>';
            break;
    }

    s += '</div>';

    // add to DOM
    element.html(s);

    // attach events ...
    d3.selectAll( ".subset-state-toggle-button").on( "click", function(event) {
        this.dataset.subsetState = ( this.dataset.subsetState+1) % 3;
        d3.select(this).select('i').attr( "class", self.subsetStateToClass( this.dataset.subsetState ) );
    });
};


Filter.prototype.subsetStateToClass = function( state ) {
    var s = "";

    switch ( "" + state ) {
        case "0":
            s += 'fa fw fa-circle-o';
            break;
        case "1":
            s += 'fa fw fa-circle';
            break;
        case "2":
            s += 'fa fw fa-dot-circle-o';
            break;
        default:
            s += 'fa fw fa-question-circle';
            break;
    }

    return ( s );
}
/**
 * author: Nils Gehlenborg - nils@hms.harvard.edu
 */


var Selection = function (items, filterCollection) {
    this.items = items || [];
    //this.filters = filters || [];
    this.filterCollection = filterCollection;
    this.id = undefined;
};

Selection.createSubsetDefinition = function (subsets) {

    if (!(subsets[0] instanceof Object)) {
        var newSubsets = [];
        newSubsets.push(subsets);
        subsets = newSubsets;
    }
    else {
        //subsets = subsets[0];
    }

    //console.log( "subsets" );
    //console.log( subsets );

    var subsetDefinition = {};

    for (var s = 0; s < subsets.length; ++s) {
        var subset = subsets[s].combinedSets;

        //console.log( "subset" );
        //console.log( subset );

        for (var x = 0; x < subset.length; ++x) {
            if (subsetDefinition.hasOwnProperty(usedSets[x].id)) {
                if (subsetDefinition[usedSets[x].id] !== subset[x]) {
                    subsetDefinition[usedSets[x].id] = 2;
                }
            }
            else {
                subsetDefinition[usedSets[x].id] = subset[x];
            }
        }
    }

    //console.log( "subsetDefinition" );
    //console.log( subsetDefinition );

    return ( subsetDefinition );
};

/** Create a selection from a subset */
Selection.fromSubset = function (subsets) {
    var self = this;

    // extract a subset definition for use with the subset filter
    var subsetDefinition = Selection.createSubsetDefinition(subsets);

    /*
     var subsetDefinition = {};
     for (var x = 0; x < subset.length; ++x) {
     subsetDefinition[usedSets[x].id] = subset[x];
     }
     */

    // create subset filter and create new selection based on all items
    var selection = new Selection(allItems, new FilterCollection("#filters-controls", "#filters-list"));

    selection.filterCollection.add(new Filter(attributes[attributes.length - 1], FilterConfigurations.subset, { subset: subsetDefinition }));
    selection.applyFilters();

    return selection;
};

Selection.prototype.createSelection = function (attributeId, filterId, parameters) {
    var newItems = [];
    var filterInstance = filter.get(filterId);
    for (var i = 0; i < this.items.length; ++i) {
        if (filterInstance.test(this.items[i], attributes[attributeId], parameters)) {
            newItems.push(this.items[i]);
        }
    }
    //console.log(filter);
    return ( new Selection(newItems, this.filters.concat([
        { id: filterId, parameters: parameters, attributeId: attributeId, uuid: Utilities.generateUuid() }
    ])) );
};

Selection.prototype.applyFilters = function () {
    var self = this;

    // start over with all items in the data set
    self.items = allItems;

    for (var f = 0; f < self.filterCollection.list.length; ++f) {
        var filterInstance = self.filterCollection.list[f];
        var newItems = [];

        for (var i = 0; i < self.items.length; ++i) {
            if (filterInstance.configuration.test(self.items[i], filterInstance.attribute, filterInstance.parameterMap)) {
                newItems.push(self.items[i]);
            }
        }

        self.items = newItems;
    }

    $(EventManager).trigger("item-selection-updated", { selection: self });
}

Selection.prototype.mapToSubsets = function (subsetList) {
    for (var i = 0; i < subsetList.length; ++i) {
        var subset = subsetList[i];

        // ignore empty subsets
        if (subset.setSize == 0) {
            continue;
        }

        var subsetDefinition = {};
        for (var x = 0; x < subset.combinedSets.length; ++x) {
            subsetDefinition[usedSets[x].id] = subset.combinedSets[x];
        }

        var subsetFilter = FilterConfigurations.subset;
        var mappedItems = [];

        for (var j = 0; j < this.items.length; ++j) {
            if (subsetFilter.test(this.items[j], attributes[attributes.length - 1], { 'subset': subsetDefinition })) {
                mappedItems.push(this.items[j]);
            }
            else {

            }
        }

        subset.selections[this.id] = mappedItems;
    }
}

Selection.prototype.unmapFromSubsets = function (subsetList) {
    for (var i = 0; i < subsetList.length; ++i) {
        var subset = subsetList[i];

        delete subset.selections[this.id];
    }
}

Selection.prototype.getFilter = function (uuid) {
    var self = this;

    return self.filterCollection.get(uuid);
}

// should be a singleton
var SelectionList = function (palette) {
    var self = this;

    self.list = [];
    self.colors = {};
    self.active = {};
    self.palette = palette || d3.scale.category10().range().slice();

    //  console.log("Palette Length " + self.palette);
};

SelectionList.prototype.getSelections = function () {
    var self = this;
    return selections.list;
}

SelectionList.prototype.addSelection = function (selection) {
    var self = this;

    selection.id = self._nextId();
    self.list.push(selection);

    self.colors[selection.id] = self._nextColor();

    $(EventManager).trigger("item-selection-added", { selection: selection });

    return self;
};

SelectionList.prototype.removeSelection = function (selection) {
    var self = this;

    for (var i = 0; i < this.list.length; ++i) {
        if (self.list[i] === selection) {
//            console.log('Deleting selection ' + i + '.');

            // remove selection from list
            self.list.splice(i, 1);

            // return color to palette
            self.palette.push(self.colors[selection.id]);

            // remove selection from color map
            delete self.colors[selection.id];

            $(EventManager).trigger("item-selection-removed", { selection: selection, index: i });

            if (self.isActive(selection)) {
                if (self.list.length > 0) {
                    self.setActive(( i > 0 ? self.list[i - 1] : self.list[0] ));
                }
                else {
                    self.setActive(undefined);
                }
            }

            return;
        }
    }

    // console.log('Unable to delete selection.');
};

SelectionList.prototype.getSelectionIndex = function (selection) {
    var self = this;

    for (var i = 0; i < self.list.length; ++i) {
        if (self.list[i] === selection) {
            return i;
        }
    }

    return undefined;
};

SelectionList.prototype.getSelectionIndexFromUuid = function (uuid) {
    var self = this;

    for (var i = 0; i < self.list.length; ++i) {
        if (self.list[i].id === uuid) {
            return i;
        }
    }

    return undefined;
};

SelectionList.prototype.getSelectionFromUuid = function (uuid) {
    var self = this;

    try {
        return ( self.list[self.getSelectionIndexFromUuid(uuid)] );
    }
    catch (error) {
        // ignore
    }

    return undefined;
};

SelectionList.prototype.getSelection = function (index) {
    var self = this;

    try {
        return ( self.list[index] );
    }
    catch (error) {
        // ignore
    }

    return undefined;
};

SelectionList.prototype.getColorFromUuid = function (uuid) {
    var self = this;

    try {
        return ( self.colors[uuid] );
    }
    catch (error) {
        // ignore
    }

    return undefined;
};

SelectionList.prototype.getColor = function (selection) {
    var self = this;

    try {
        return ( self.colors[selection.id] );
    }
    catch (error) {
        // ignore
    }

    return undefined;
};

SelectionList.prototype.getSize = function () {
    var self = this;

    return self.list.length;
};

SelectionList.prototype.isActive = function (selection) {
    var self = this;

    return ( self.active === selection );
};

SelectionList.prototype.isActiveByUuid = function (uuid) {
    var self = this;
    if (!self.active) {
        return false;
    }
    return ( self.active.id === uuid );
};

SelectionList.prototype.getActive = function () {
    var self = this;

    return ( self.active );
};

SelectionList.prototype.setActive = function (selection) {
    var self = this;

    self.active = selection;

    $(EventManager).trigger("item-selection-activated", { selection: selection });

    return ( self );
};

SelectionList.prototype.setActiveByUuid = function (uuid) {
    var self = this;

    self.active = self.getSelectionFromUuid(uuid);

    $(EventManager).trigger("item-selection-activated", { selection: self.active });

    return ( self );
};

SelectionList.prototype._nextColor = function () {
    var self = this;

    // use color pool and return black once pool is empty
    if (self.palette.length > 0) {
        // first available color
        return self.palette.splice(0, 1)[0];
    }

    return "#000";
};

SelectionList.prototype._nextId = function () {
    return Utilities.generateUuid();
};
/**
 * Created by Alexander Lex on 2/4/14.
 */


var ROW_TYPE =
{
    SET: 'SET_TYPE',
    SUBSET: 'SUBSET_TYPE',
    GROUP: 'GROUP_TYPE',
    AGGREGATE: 'AGGREGATE_TYPE',
    QUERY_GROUP: 'QUERY_GROUP_TYPE',
    SEPARATOR: 'SEPARATOR',
    UNDEFINED: 'UNDEFINED'}

/** the user interface */
var ui; // initialized on document ready event

/** The input datasets */
var sets = [];
var setIdToSet = {};
/** The sets currently in use */
var usedSets = [];
/** The ordered and grouped subsets */
var dataRows = [];
/** Same as dataRows but including a wrapper for the data */
var renderRows = [];
/** The dynamically created subSets */
var subSets = [];
/** The labels of the records */
var labels = [];
/** meta data attributes of the records/items */
var attributes = [];
/** attributes selected by the user (for item visualizations) */
var selectedAttributes = {};
/** The number of combinations that are currently active */
var combinations = 0;

var depth = 0;

/** The depth of the dataset, i.e., how many records it contains */

/** an array representing all items */
var allItems = [];

//var filter = new Filter();

/** Indices of selected items **/
var selectedItems = [];

var selections = new SelectionList(); //an array of selection

var elementViewers = new ElementViewerCollection( "#element-viewers-controls", "#element-viewers-visualization" );

/** The list of available datasets */
var dataSets;

/** Groups of subsets driven by group size */
//var sizeGroups = [];

/** Groups of subsets driven by set containment */
//var setGroups = [];

/** Venn diagram for tutorial mode */
var venn = new VennDiagram("#venn-vis", 40);

/** The current primary grouping */
var levelOneGroups;
/** The smart filter groups */
var filterGroups;

/** How many sets do we want to see by default */
var nrDefaultSets = 6;

/**
 * The base element for all rows (sets, groups, subsets, aggregates)
 * @param id
 * @param elementName
 * @constructor
 */
function Element(id, elementName) {
    this.id = id;
    this.elementName = elementName;
    /** The indices of the data items in this set */
    this.items = [];
    /** The number of elements in this (sub)set */
    this.setSize = 0;
    /** The ratio of elements that are contained in this set */
    this.dataRatio = 0.0;
}

function Separator(id, elementName) {
    Element.call(this, id, elementName);

    this.type = ROW_TYPE.SEPARATOR;

}

Separator.prototype = Element;
Separator.prototype.constructor = Element;
/**
 * Base class for Sets, subsets, groups.
 *
 * The setID is set to Element.id and is a binary representation of the contained set
 * @param setID
 * @param setName
 * @param combinedSets
 * @param setData
 * @constructor
 */
function BaseSet(setID, setName, combinedSets, setData, fake) {
    Element.call(this, setID, setName);

    /** An array of all the sets that are combined in this set. The array contains a 1 if a set at the corresponding position in the sets array is combined. */
    this.combinedSets = combinedSets;

    /** The number of combined dataRows */
    this.nrCombinedSets = 0;

    for (var i = 0; i < this.combinedSets.length; i++) {
        if (this.combinedSets[i] !== 0) {
            this.nrCombinedSets++;
        }
    }
//    console.log(this.nrCombinedSets);

    for (var i = 0; i < setData.length; i++) {
            this.items.push(setData[i]);
            this.setSize++;
    }

//    for (var i = 0; i < setData.length; i++) {
//        if (setData[i] !== 0) {
//            this.items.push(i);
//            this.setSize++;
//        }
//    }

    this.dataRatio = this.setSize / depth;
}

BaseSet.prototype = Element;
BaseSet.prototype.constructor = Element;

function Set(setID, setName, combinedSets, itemList) {
    BaseSet.call(this, setID, setName, combinedSets,[],1);
        for (var i = 0; i < itemList.length; i++) {
        if (itemList[i] !== 0) {
            this.items.push(i);
            this.setSize++;
        }
    }
    this.dataRatio = this.setSize / depth;

    this.type = ROW_TYPE.SET;
    /** Array of length depth where each element that is in this subset is set to 1, others are set to 0 */
    this.itemList = itemList;
    this.isSelected = false;

}

Set.prototype = BaseSet;
Set.prototype.constructor = BaseSet;

function SubSet(setID, setName, combinedSets, itemList, expectedProb) {
    BaseSet.call(this, setID, setName, combinedSets, itemList);
    this.type = ROW_TYPE.SUBSET;
    this.expectedProb = expectedProb;
    this.selections = {};

    var observedProb = this.setSize*1.0 / depth;

//    this.disproportionality =

    this.disproportionality =  observedProb-expectedProb;
//    if (this.disproportionality<1 && this.disproportionality>0) this.disproportionality=-(1/this.disproportionality);
//    if (this.disproportionality>10) this.disproportionality=20;
//    if (this.disproportionality<-10) this.disproportionality=-20;

}

SubSet.prototype.toString = function () {
    return 'Subset + ' + this.id + ' Nr Combined Sets: ' + this.nrCombinedSets;
}

// Not sure how to do this properly with parameters?
SubSet.prototype = Set;
SubSet.prototype.constructor = SubSet;

function Group(groupID, groupName, level) {
    Element.call(this, groupID, groupName);
    this.type = ROW_TYPE.GROUP;

    this.isCollapsed = false;

    this.nestedGroups = undefined;

    /** the nesting level of the group, 1 is no nesting, 2 is one level down */
    this.level = 1;
    if (level) {
        this.level = level;
    }

    /** all subsets */
    this.subSets = [];
    /** the visible subsets */
    this.visibleSets = [];
    this.aggregate = new Aggregate('empty' + groupID, ' Subsets', level + 1);
    /** the hidden/aggregated subsets */
    this.hiddenSets = [];

    //this.setSize = 0;
    this.expectedProb = 0;
    this.disproportionality = 0;
    this.disproportionalitySum =0;

    this.addSubSet = function (subSet) {
        this.subSets.push(subSet);
        if (subSet.setSize > 0) {
            this.visibleSets.unshift(subSet);

        }
        else {
            this.hiddenSets.unshift(subSet);
            this.aggregate.addSubSet(subSet);
        }
        this.items = this.items.concat(subSet.items);
        this.setSize += subSet.setSize;
        this.expectedProb += subSet.expectedProb;
        this.disproportionality += subSet.disproportionality;
//        if (this.subSets.length>0)
//            this.disproportionality = this.disproportionalitySum/this.subSets.length;

//        this.disproportionality += subSet.disproportionality;
    }

    this.contains = function (element) {
        if (subSets.indexOf(element) >= 0) {
            return true;
        }
        if (element === this.aggregate) {
            return true;
        }
        return false;

    }
}

Group.prototype = Element;
Group.prototype.constructor = Element;

function QueryGroup(groupID, groupName, orClauses) {
    this.type = ROW_TYPE.QUERY_GROUP;
    Group.call(this, groupID, groupName, 1);
    this.orClauses = orClauses;
    // if simple OR Group.. create combinedSet Element
    if (orClauses.length==1){
        this.combinedSets=Object.keys(orClauses[0]).map(function(key){
            return orClauses[0][key].state
        })
    }
}

QueryGroup.prototype = Group;
QueryGroup.prototype.constructor = Group;

function Aggregate(aggregateID, aggregateName, level) {
    Element.call(this, aggregateID, aggregateName);
    this.type = ROW_TYPE.AGGREGATE;
    this.subSets = [];

    this.isCollapsed = true;

    /** the nesting level of the group, 1 is no nesting, 2 is one level down */
    this.level = level;

    //this.setSize = 0;
    this.expectedProb = 0;
    this.disproportionality = 0;

    this.addSubSet = function (subSet) {
        this.subSets.push(subSet);
        this.items = this.items.concat(subSet.items);
        this.setSize += subSet.setSize;
        this.expectedProb += subSet.expectedProb;
        this.disproportionality += subSet.disproportionality;
    }
}

Aggregate.prototype = Element;
Aggregate.prototype.constructor = Element;

function makeSubSet(setMask) {

    var bitMask = 1;
    var tempMask = setMask;
    var sum = 0;
    for (var i = 0; i < usedSets.length; i++) {
        if ((tempMask & bitMask) === 1) {
            sum += 1;
            if (sum > UpSetState.maxCardinality) {
                return;
            }
        }
        tempMask = tempMask >> 1;
    }
    if (sum < UpSetState.minCardinality) {
        return;
    }
    var originalSetMask = setMask;

    var combinedSets = Array.apply(null, new Array(usedSets.length)).map(Number.prototype.valueOf, 0);
//    console.log("combinedSets:",combinedSets);

    var combinedData = Array.apply(null, new Array(depth)).map(Number.prototype.valueOf, 1);

    var isEmpty = true;
    var expectedValue = 1;
    var notExpectedValue = 1;
    var name = '';
    for (var setIndex = usedSets.length - 1; setIndex >= 0; setIndex--) {
        var data = usedSets[setIndex].itemList;
        if ((setMask & bitMask) === 1) {
            combinedSets[setIndex] = 1;
            expectedValue  = expectedValue *  usedSets[setIndex].dataRatio;
            name += usedSets[setIndex].elementName + ' ';
        }
        else {
            notExpectedValue = notExpectedValue * (1- usedSets[setIndex].dataRatio);
        }
        for (i = 0; i < data.length; i++) {
            if ((setMask & bitMask) === 1) {
                if (!(combinedData[i] === 1 && data[i] === 1)) {
                    combinedData[i] = 0;
                }
            }
            else {
                // remove the element from the combined data if it's also in another set
                if ((combinedData[i] === 1 && data[i] === 1)) {
                    combinedData[i] = 0;
                }
            }
        }

        // update the set mask for the next iteration
        setMask = setMask >> 1;
    }


//    console.log(expectedValue, notExpectedValue);
//    console.log("combinedData:", combinedData);
    expectedValue *= notExpectedValue;
  //  console.log(originalSetMask,name,combinedSets,combinedData,expectedValue);
    var subSet = new SubSet(originalSetMask, name, combinedSets, combinedData, expectedValue);
    subSets.push(subSet);
}

/** takes  a list l of arrays a(i) which represent disjunctive normal form: a(i) OR a(i+1) OR...
 a(i) represents a setMask: 0 - NOT, 1 - MUST, 2- DONTCARE
 if callFunction is null a list of matching subsets is returned
 */
var getSubsetsForMaskList = function (subsets, maskList, callFunction) {
    var res = [];

    var clauseMatches = true;
    var isAhit = false;
    subsets.forEach(function (subset) {

        isAhit = false;
        var combinedSets = subset.combinedSets;
        maskList.forEach(function (compare) {
            if (isAhit == false) {
                var csLength = combinedSets.length
                clauseMatches = (csLength == compare.length)
                if (clauseMatches) {
                    for (var i = 0; i < csLength; i++) {
                        clauseMatches &= (
                            (combinedSets[i] == compare[i])
                                || compare[i] == 2 );
                    }
                }
                if (clauseMatches) {
                    isAhit = true;
                }
            }
        })

        if (isAhit && callFunction != null) {
            callFunction(subset);

        } else if (isAhit) {
            res.push(subset);
        }
    })
    return res;
}
/**
 * author: Nils Gehlenborg - nils@hms.harvard.edu
 */

var Ui = function() {
    var self = this;

    self.lastWindowWidth = 0;
    self.lastWindowHeight = 0;

    // needs to be called
    self.initialize();
    self.initWidthHandler();
};

/**
 * update container sizes
 */
Ui.prototype.resize = function( event ) {
    if ( ( self.lastWindowWidth != $(window).width() ) && ( self.lastWindowHeight != $(window).height() ) ) {
        $(EventManager).trigger( "ui-resize", { newWidth: $(window).width(), oldWidth: self.lastWindowWidth, newHeight: $(window).height(), oldHeight: self.lastWindowHeight } );

        self.lastWindowHeight = $(window).height();
        self.lastWindowWidth = $(window).width();

        return;
    }

    if ( self.lastWindowWidth != $(window).width() ) {
        $(EventManager).trigger( "ui-horizontal-resize", { newWidth: $(window).width(), oldWidth: self.lastWindowWidth } );

        self.lastWindowWidth = $(window).width();

        return;
    }

    if ( self.lastWindowHeight != $(window).height() ) {
        $(EventManager).trigger( "ui-vertical-resize", { newHeight: $(window).height(), oldHeight: self.lastWindowHeight } );

        self.lastWindowHeight = $(window).height();

        return;
    }
}


Ui.prototype.updateFixedHeightContainers = function() {
    var fixedYContainers = $('.fixed-y-container');
    fixedYContainers.map( function(index) {
        var paddingBottom = parseInt( $(fixedYContainers[index]).css( 'padding-bottom' ) ) || 0;
       // console.log( paddingBottom );
        var targetHeight = ( $(window).height() - $(this).offset().top - paddingBottom ) * parseFloat( $(fixedYContainers[index]).attr("data-height-ratio") );
        var minHeight = parseInt( $('.fixed-y-container').css( "min-height" ) );
        var maxHeight = parseInt( $('.fixed-y-container').css( "max-height" ) ) || targetHeight;


        var newHeight = Math.min( Math.max( targetHeight, minHeight ), maxHeight );
        $(this).css('height', newHeight + 'px');
    });
}


Ui.prototype.initialize = function() {
    var self = this;

    self.lastWindowHeight = $(window).height();
    self.lastWindowWidth = $(window).width();

    self.createHeader();
    self.hideMenu();
    self.updateFixedHeightContainers();

}

Ui.prototype.createHeader = function() {
    var self = this;

    $( "#load-data-header").on( "click", function( event ){
        self.toggleMenu();
    });
}

Ui.prototype.showMenu = function() {
    var self = this;

    $(".ui-menu").show();
}

Ui.prototype.hideMenu = function() {
    var self = this;

    $(".ui-menu").hide();
}

Ui.prototype.toggleMenu = function() {
    var self = this;

    $(".ui-menu").slideToggle( { step: self.updateFixedHeightContainers } );

    //$( "#show-menu-button").toggleClass( "fa-spin");
}


Ui.prototype.initWidthHandler = function(){
    $("#moveHandle").on("drag")

    $(function() {
        var isDragging = false;
        var startX = undefined;
        var endX = undefined;
        var leftWidth = undefined;
        var rightLeft = undefined;

        $("#moveHandle")
            .mousedown(function(event) {
                event.stopPropagation()
              //  console.log("MD");
                if ( !isDragging ) {
                    startX = event.clientX; //#set-vis-container
                    leftWidth = $(".ui-layout-center").width();
                    rightLeft = $(".ui-layout-east").offset().left;
                    isDragging = true;
                }

            });

        $(window).mouseup(function() {
            if ( isDragging ) {
//                endX = event.clientX;
//                $(".ui-layout-center").width( leftWidth + (endX - startX) );
//                   $("#right").offset( { left: rightLeft + (endX - startX) } );
//                   $("#right").width( rightLeft - (endX - startX) );
                isDragging = false;
            }


        });

        $(window).mousemove(function(event) {

            if ( isDragging ) {
                endX = event.clientX;

                event.stopPropagation()

                $(".ui-layout-center").width( leftWidth + (endX - startX) );
                $("#vis").width( leftWidth + (endX - startX) );
//                $("#vis svg").width( leftWidth + (endX - startX) );
//                $("#right").offset( { left: rightLeft + (endX - startX) } );
//                $("#right").width( rightLeft - (endX - startX) );

                $(EventManager).trigger( "vis-svg-resize", { newWidth:+(leftWidth + (endX - startX)) });

            }
        });

    });






}
/**
 * Created by romain & hen (hendrik.strobelt.com)
 */

function plotSetOverview() {

    var initialize = false;
    var animate = false;


    if (arguments[0]){
        console.log(arguments[0]);
        initialize = arguments[0].initialize || false;

        if (initialize){
            ctx.setSelection.mode = "none"
            ctx.setSelection.modeChange = false;
            ctx.setSelection.multiSelIn = d3.set();
            ctx.setSelection.multiSelOut = d3.set();
        }
//        animate = arguments[0].animate || false;
//        mode = arguments[0].mode || "none";
    }

    console.log("plotSetOverview");

    var majorPadding = 5;
    var minorPadding = 2;
    var cellDistance = 20;
    var cellSize = cellDistance;// - minorPadding;
    var setCellDistance = 12;
    var setCellSize = 10;

    var differenceForMultiSel = 7;
    var textHeight = 62-differenceForMultiSel;
    var truncateAfter = 7;
    var distanceUsedMenu = 15;
    var paddingForPaginationRight = 115;
    var paddingForPaginationRightExtra = (ctx.setSelection.mode==="none")?0:100;
    const paginationLinespace = 14;

    var headerSVG = d3.select('#headerVis').select('svg');

    // calculate widths
    var svgWidth = headerSVG.attr("width");
    var menuOffset = usedSets.length*cellSize + distanceUsedMenu;
    var maxWidthUnused = svgWidth - menuOffset - paddingForPaginationRight - paddingForPaginationRightExtra-distanceUsedMenu-cellDistance;

    var unusedSets = sets.filter(function(n) {
        return usedSets.indexOf(n) == -1
    });




    // --- INIT the SVG structure (d3 version)


    var setSelectionGroup = headerSVG.selectAll(".setSelection").data([1]);
    setSelectionGroup.enter().append("g").attr({
        class: "setSelection",
        "transform": "translate(" + 0 + "," + 0 + ")"
    })


    // scale for the size of the subSets, also used for the sets
    var setSizeScale = d3.scale.linear().domain([0, d3.max(sets, function (d) {
        return d.setSize;
    })]).nice().range([0, textHeight]);


    function updateUsedSets() {
        // ----------------------------
        ///-- Render the used Sets
        // ----------------------------
        var usedSetsVis = setSelectionGroup.selectAll(".usedSets").data([1]);
        usedSetsVis.enter().append("g").attr("class", "usedSets");

        usedSetsVis.attr({
            "transform":"translate("+0+","+differenceForMultiSel+")"
        })

        var usedSetsLabels = usedSetsVis
            .selectAll('.setLabel')
            .data(usedSets, function (d) {
                return d.elementName;
            })
        usedSetsLabels.exit().remove();
        var usedSetsLabelsEnter = usedSetsLabels.enter().append("g").attr("class", "setLabel").attr({
            transform: function (d, i) {
                return 'translate(' + (cellDistance * (i )) + ', 0)'
            },
            opacity: .1

        });
        usedSetsLabelsEnter
            .append('rect')
            .attr({
                class: 'setSizeBackground',
                height: (textHeight + 1),
                width: cellSize//setRowScale.rangeBand()
            })
            .on('click', setClicked)
            .on('mouseover', function (d, i) {
                mouseoverColumn(d, i);
            })
            .on('mouseout', function (d, i) {
                mouseoutColumn(d, i);
            });
        // background bar
        usedSetsLabelsEnter
            .append('rect')
            .attr({
                class: 'setSizeRect setSize',
                x: 1,
                width: cellSize - 2//setRowScale.rangeBand()
            })
            //  .attr("transform", "skewX(45)")
            .on('mouseover', mouseoverColumn)
            .on('mouseout', mouseoutColumn)
            .on('click', setClicked)
        // *** update sizes (might happen when changing datasets)
        d3.selectAll(".usedSets .setSize").transition().duration(1000).attr({
            y: function (d) {
                return (textHeight - (setSizeScale(d.setSize)));
            },
            height: function (d) {
                return setSizeScale(d.setSize);
            }
        });
        usedSetsLabelsEnter.transition().duration(400).delay(400).attr({
            opacity: 1
        })
        // *** update group position
//        usedSetsLabels
//            .attr({
//                transform: function (d, i) {
//                        return 'translate(' + (cellDistance * i) + ', 0)'
//                }
//            })

        usedSetsLabels.attr({
            transform: function (d, i) {
                if (ctx.setSelection.mode==="multiSel"){
                    if (ctx.setSelection.multiSelOut.has(d.elementName)) {
                        return 'translate(' + (cellDistance * i ) + ', -'+differenceForMultiSel+')'
                    }else{
                        return 'translate(' + (cellDistance * i ) + ', 0)'
                    }

                }else{
                    return 'translate(' + (cellDistance * i)  + ', 0)'
                }

            }
        })

        usedSetsLabels.selectAll(".setSizeRect")
            .attr({
                "class":function(d){
                    if (ctx.setSelection.multiSelOut.has(d.elementName)) {
                        return 'setSizeRect unusedSetSize'
                    }else{
                        return 'setSizeRect setSize'
                    }


                }


            })


    }

    updateUsedSets();



    function updateUnusedSets(){
        // ----------------------------
        ///-- Render the unused Sets
        // ----------------------------
        var sortSize = function (a, b) {
            return b.setSize - a.setSize;
        };

        var sortName = function (a, b) {
            return d3.ascending(a.elementName, b.elementName);
        };

        var sortFn;

        if (ctx.setSelection.setOrder === "name") {
            sortFn = sortName;
        }  else {
            sortFn = sortSize;
        }

        var unuseedSetsOffset = menuOffset+paddingForPaginationRight+paddingForPaginationRightExtra +distanceUsedMenu;


        unusedSets.sort(sortFn);

        var unusedSetsGroup = setSelectionGroup.selectAll(".unusedSets").data([1])
        unusedSetsGroup.enter().append("g").attr("class","unusedSets")

        unusedSetsGroup.attr({
            "transform":function(d){
                if (ctx.setSelection.mode==="multiSel"){
                    return 'translate('+ unuseedSetsOffset+', 0)'
                }else{
                    return 'translate('+ unuseedSetsOffset +', '+differenceForMultiSel+')'
                }
            }
        })





        if (maxWidthUnused<cellDistance){


            unusedSetsGroup.selectAll('.unusedSetLabel').remove();

        }else{

            /*
             * add only if there is enough space !!!
             * */

            console.log(maxWidthUnused, cellDistance);
            var paginationDistance = Math.floor(maxWidthUnused/cellDistance);

            console.log(maxWidthUnused, cellDistance, paginationDistance);
            if (initialize){
                ctx.setSelection.paginationStart=+0;
            }
            ctx.setSelection.paginationEnd=+ctx.setSelection.paginationStart+paginationDistance;

            var unusedSetsFiltered = unusedSets.filter(
                function(d,i){
                    return ((ctx.setSelection.paginationStart<=i) && (i<=ctx.setSelection.paginationEnd));
                }
            )


            /*
             * create buttons for pagination
             * */
            updatePaginationDecoration();


            var unusedSetsLabels = unusedSetsGroup
                .selectAll('.unusedSetLabel')
                .data(unusedSetsFiltered, function(d){return d.elementName;})

            unusedSetsLabels.exit().remove();


            var unusedSetsLabelsEnter = unusedSetsLabels.enter().append("g").attr("class","unusedSetLabel").attr({
                transform: function (d, i) {
                    return 'translate(' + (cellDistance * (i ) ) + ', -10)'
                },
                opacity:.1
            });
            unusedSetsLabelsEnter
                .append('rect')
                .attr({
                    class: 'unusedSetSizeBackground',
//                transform: function (d, i) {
//                    return 'translate(' + (cellDistance * (i )) + ', 20)'
//                },
                    height: textHeight-2,
                    width: cellSize
                })
                .on('click', setClicked)

            unusedSetsLabelsEnter
                .append('rect')
                .attr({
                    class: 'setSizeRect unusedSetSize',
                    transform: function (d, i) {
                        return 'translate(1, ' + ( textHeight - setSizeScale(d.setSize)) + ')'
                    }, // ' + (textHeight - 5) + ')'
                    height: function (d) {
                        return setSizeScale(d.setSize);
                    },
                    width: cellSize-2
                })
                .on('click', setClicked)
//        .append("svg:title")
//        .text(function(d, i) { return d.elementName + " (" +d.setSize+ ")"; });;


            unusedSetsLabelsEnter
                .append('text').text(function (d) {
                    if (d.elementName.length > (truncateAfter+3)){
                        var str = d.elementName.substring(0, truncateAfter)
                        if(str.length<d.elementName.length)
                            str = str.trim() + "...";
                    }else{
                        str= d.elementName.trim();
                    }

                    return str;
                })
                .attr({
                    class: 'setLabel',
                    transform: function (d, i) {
                        return 'translate(' + (cellDistance + 5) + ', 0) rotate(90)'
                    },
                    y: cellSize - 3,
                    x: 3,
                    height: textHeight-4,
                    'text-anchor': 'start'

                })
                .on('click', setClicked)
                .append("svg:title")
                .text(function(d, i) { return d.elementName + " (" +d.setSize+ ")"; });


//            console.log("animate:", animate);
//            var updateUnusedPos =unusedSetsLabelsEnter;
//            if (animate){
//                updateUnusedPos= unusedSetsLabelsEnter
//                    .transition().duration(400).delay(400)
//            }
//            updateUnusedPos.attr({
//                opacity:1,
//                transform: function (d, i) {
//                    return 'translate(' + (cellDistance * (i ) + unusedLabelOffset) + ', 0)'
//                }
//            })

            unusedSetsLabels.attr({
                transform: function (d, i) {
                    if (ctx.setSelection.mode==="multiSel"){
                        if (ctx.setSelection.multiSelIn.has(d.elementName)) {
                            return 'translate(' + (cellDistance * (i ) ) + ', '+differenceForMultiSel+')'
                        }else{
                            return 'translate(' + (cellDistance * (i ) ) + ', 0)'
                        }

                    }else{
                        return 'translate(' + (cellDistance * (i ) ) + ', 0)'
                    }

                },
                opacity:1
            })


            unusedSetsLabels.selectAll(".setSizeRect")
                .attr({
                  "class":function(d){
                      if (ctx.setSelection.multiSelIn.has(d.elementName)) {
                          return 'setSizeRect setSize'
                      }else{
                          return 'setSizeRect unusedSetSize'
                      }


                  }


                })



        }
    }

    updateUnusedSets();





    function updatePaginationDecoration() {
        var internalLeftPadding = 0 // only local
        var setsRight = unusedSets.length - ctx.setSelection.paginationEnd;
        var setsLeft = ctx.setSelection.paginationStart;

        var middlePos = ((paddingForPaginationRight - internalLeftPadding) / 2 + internalLeftPadding);
        var paginationDistance = Math.floor(maxWidthUnused/cellDistance);

        var pagi = headerSVG.selectAll(".pagination")
            .data([{countRight: setsRight, countLeft: setsLeft, distance: paginationDistance}])
        var pagiGroup = pagi.enter().append("g").attr({
            "class":"pagination"
        })

//        var finalPos = svgWidth-paddingForPaginationRight;
        var finalPos = menuOffset;
//        console.log("finalpos", finalPos);
        if (ctx.setSelection.mode !== "none"){
            finalPos+=paddingForPaginationRightExtra;
        }

        if (ctx.setSelection.modeChange){
            pagi.transition().attr({
                "transform":"translate("+(finalPos)+",0)"
            })

        }else{
            pagi.attr({
                "transform":"translate("+(finalPos)+",0)"
            })
        }


        pagiGroup.append("text")
        .style({
            "text-anchor": "middle",
            "cursor": "default",
                "font-weight":"bold"
        }).attr({
            "transform": function () {

                return "translate(" + ( middlePos) + "," + (.8*paginationLinespace) + ")";
            }
        }).text("Set Selection")


        pagiGroup.append("rect")
            .attr({
                "class":"selectionRect setSelectionArea",
                x:-5,
                width:paddingForPaginationRight-internalLeftPadding+5,
                height:paginationLinespace *.9,
                opacity:0
            })




        pagiGroup.append("text").attr({
            "class": "right setSelectionLabelAwesome"
        }).style({
            "text-anchor": "end"
        }).attr({
            "transform": function () {
                return "translate(" + (paddingForPaginationRight - 2) + "," + (2*paginationLinespace) + ")";
            }
        })

        pagiGroup.append("text").attr({
            "class": "left setSelectionLabelAwesome"
        }).style({
            "text-anchor": "start"
        }).attr({
            "transform": function () {
                return "translate(" + (internalLeftPadding+2) + "," + (2 * paginationLinespace) + ")";
            }
        })


        pagiGroup.append("text").attr({
            "class": "info_distance"
        }).style({
            "text-anchor": "middle",
            "cursor": "default"
        }).attr({
            "transform": function (d) {
                return "translate(" + (middlePos) + ","
                    + (2 * paginationLinespace) + ")";
            }
        })

        pagiGroup.append("rect").attr({
            "class": "multiSelect setSelectionButton"
        }).attr({
            "transform": "translate(" + (internalLeftPadding+2) + "," + (2.3*paginationLinespace) + ")",
            width: paddingForPaginationRight-internalLeftPadding-4,
            height:.9*paginationLinespace,
            rx:5,
            ry:5
        })
            .on({
                "click": function () {
                    if (ctx.setSelection.mode=="none"){
                        ctx.setSelection.mode = "multiSel";
                        ctx.setSelection.modeChange = true;
                        plotSetOverview();
                    }else if (ctx.setSelection.mode === "multiSel"){
                        ctx.setSelection.multiSelIn = d3.set();
                        ctx.setSelection.multiSelOut = d3.set();
                        ctx.setSelection.mode = "none";
                        ctx.setSelection.modeChange = true;
                        plotSetOverview();
                    }
                }
            })

        pagiGroup.append("text").attr({
            "class": "multiSelect setSelectionButtonText"
        }).style({
            "text-anchor": "middle",
            "cursor": "pointer",
            "pointer-events":"none"
        }).attr({
            "transform": "translate(" + (middlePos) + "," + (3.0*paginationLinespace) + ")"
        }).text("Batch Add Sets")


        pagiGroup.append("rect").attr({
            "class": "sortFilter setSelectionButton"
        }).attr({
            "transform": "translate(" + (internalLeftPadding+2) + "," + (3.3*paginationLinespace) + ")",
            width: paddingForPaginationRight-internalLeftPadding-4,
            height:.9*paginationLinespace,
            rx:5,
            ry:5
        })
            .on({
                "click": function () {
                    if (ctx.setSelection.mode == "none") {
                        ctx.setSelection.mode = "sortFilter";
                        ctx.setSelection.modeChange = true;
                        plotSetOverview();
                    } else if (ctx.setSelection.mode === "sortFilter") {
                        ctx.setSelection.mode = "none";
                        ctx.setSelection.modeChange = true;
                        plotSetOverview();
                    }
                }
            })


        pagiGroup.append("text").attr({
            "class": "sortFilter setSelectionButtonText"
        }).style({
            "text-anchor": "middle",
            "cursor": "pointer",
            "pointer-events":"none"
        }).attr({
            "transform": "translate(" + (middlePos) + "," + (4*paginationLinespace) + ")"
        }).text("Sort Sets")


        // --- UPDATES

        pagi.select(".right").text(function (d) {
//            if (d.countRight < 1) return '-|'
//            else return '>>';
            if (d.countRight < 1) return ''
            else return '\uf0a9';
        }).on({
            "click": function (d) {
                if (d.countRight > 0) {
                    ctx.setSelection.paginationStart = ctx.setSelection.paginationStart + d.distance;

                    plotSetOverview({animate: false});
                } else {
                    return;
                }
            }
        })


        pagi.select(".left")
             .text(function (d) {
//                if (d.countLeft < 1) return '|-'
//                else return '<<'; })
                if (d.countLeft < 1) return ''
                else return '\uf0a8'; })

                //&#f053

            .on({
                "click": function (d) {
                    if (d.countLeft > 0) {
                        ctx.setSelection.paginationStart = Math.max(ctx.setSelection.paginationStart - d.distance, 0);
                        plotSetOverview({animate: false});
                    } else {
                        return;
                    }
                }
            })


        pagi.select(".info_distance").text(function (d) {
            return ctx.setSelection.paginationStart+ " - " +
                Math.min(ctx.setSelection.paginationEnd,unusedSets.length)
        })

//        pagi.select(".multiSelect").style({
//            "font-weight": function () {
////                if (ctx.setSelection.mode === "multiSel"){
////                    return "bold"
////                }else{
//                    return "normal"
////                }
//            }
//        })


        var selRectPos = 0;
        var selRectOpa = 0;
        if (ctx.setSelection.mode==="multiSel"){
            selRectPos = 2.3*paginationLinespace;
            selRectOpa = 1;
        }else if (ctx.setSelection.mode==="sortFilter"){
            selRectPos = 3.3*paginationLinespace;
            selRectOpa = 1;
        }


        if (ctx.setSelection.modeChange){
            pagi.select(".selectionRect").transition().duration(200)
                .attr({
                y:selRectPos,
                opacity:selRectOpa
            })

        }else{
            pagi.select(".selectionRect").attr({
                y:selRectPos,
                opacity:selRectOpa
            })
        }

        updateSecondMenu();

        // only one pass of mode change rendering
        ctx.setSelection.modeChange = false;


    }



    function updateSecondMenu(){

        var menuContent = []
        if (ctx.setSelection.mode === "multiSel"){
            menuContent =
                [[
                    {name:"Add All Sets", func: function(){
                        unusedSets.forEach(function(d){ctx.setSelection.multiSelIn.add(d.elementName);});
                        ctx.setSelection.multiSelOut = d3.set();
                        plotSetOverview();
                    }},
                    {name:"Clear All Sets", func: function(){
                        ctx.setSelection.multiSelIn = d3.set();
                        usedSets.forEach(function(d){ctx.setSelection.multiSelOut.add(d.elementName);});

                        plotSetOverview()
                    }},
                    {name:"Cancel", func: function(){
                        ctx.setSelection.multiSelIn = d3.set();
                        ctx.setSelection.multiSelOut = d3.set();

                        //close multiselect panel
                        ctx.setSelection.mode ="none"
                        ctx.setSelection.modeChange= true
                        plotSetOverview();
                    }, fontawe:"\uf00d"},
                    {name:"Confirm", func: bulkChange, fontawe:"\uf00c"}
                ]]

        } else if (ctx.setSelection.mode === "sortFilter"){
            menuContent =
                [[
                    {name:"by Size", func: function(){
                        ctx.setSelection.setOrder = "size"
                        ctx.setSelection.mode = "none"
                        ctx.setSelection.modeChange = true
                        plotSetOverview();
                    }},
                    {name:"by Name", func: function(){
                        ctx.setSelection.setOrder = "name"
                        ctx.setSelection.mode = "none"
                        ctx.setSelection.modeChange = true
                        plotSetOverview()
                    }}
                ]]

        }

        var menuExtra = headerSVG.selectAll(".setMenuExtra").data(menuContent);
        menuExtra.exit().remove();
        var menuExtraGroup = menuExtra.enter().append("g").attr("class","setMenuExtra").attr({
            opacity:.1
        })

        menuExtraGroup.append("rect").attr({
            "class":"setSelectionArea",
            x:5,
            width:paddingForPaginationRightExtra-10,
            height:textHeight+5
        })

        if (ctx.setSelection.modeChange){
            menuExtra.transition().duration(500)
                .attr({
                    opacity:1
                });
        }

        menuExtra
            .attr({
                "transform":"translate("+(menuOffset)+","+0+")"
            });


        var menuExtraGroupEntries = menuExtraGroup.selectAll(".menuExtraEntry").data(function(d){return d;})
        menuExtraGroupEntries.enter().append("text")
            .attr({
                "class": function (d) {
                   if ('fontawe' in d){
                       return "menuExtraEntry setMenuExtraAwesome"
                   }else{
                       return "menuExtraEntry"
                   }
                }  ,
                "transform":function(d,i) {
                    return "translate("+(paddingForPaginationRightExtra/2)+","+((1+(i*1.0))*paginationLinespace)+")";
                }
            })
            .style({
                "cursor":"pointer",
                "text-anchor":"middle"
            })
            .text(function(d){
                if ('fontawe' in d) {
                    return  d.fontawe + " "+ d.name;
                }else{
                    return d.name;
                }
            })
            .on("click", function(d){ d.func();})





    }



//    // -- update position !!!

//    var unusedSetsLabels =  overview.append("foreignObject")
//        .attr("width", 710)
//        .attr("height", textHeight+20)
//        .attr("x", usedSets.length*cellSize)
//        .attr("y", 40)
//      .append("xhtml:div")
//        .style("overflow-x", "auto")
//        .append("svg")
//        .attr({
//            height: textHeight+20,
//            width: unusedSets.length*cellSize
//        })
//        .append("g")
//        //.attr("transform", "translate(-50)")
//        .attr("class", "unusedSets")
//        .selectAll('.unusedSetsLabels')
//        .data(unusedSets)
//        .enter();
//
//    unusedSetsLabels
//            .append('rect')
//            .sort(sortFn)
//            .attr({
//                class: 'unusedSetSizeBackground',
//                transform: function (d, i) {
//                    return 'translate(' + (cellDistance * (i )) + ', 20)'
//                },
//                height: textHeight-2,
//                width: cellSize
//            })
//            .on('click', setClicked)
//
//
//    // background bar
//    unusedSetsLabels
//        .append('rect')
//        .sort(sortFn)
//        .attr({
//            class: 'unusedSetSize',
//            transform: function (d, i) {
//                return 'translate(' + (cellDistance * i) + ', ' + ( textHeight - minorPadding - setSizeScale(d.setSize) + 21) + ')'
//            }, // ' + (textHeight - 5) + ')'
//            height: function (d) {
//                return setSizeScale(d.setSize);
//            },
//            width: cellSize
//        })
//       // .on('mouseover', mouseoverColumn)
//       // .on('mouseout', mouseoutColumn)
//        .on('click', setClicked)
//
//    unusedSetsLabels
//        .append('text').text(function (d) {
//
//          //var tmpText = d3.select("svg").append("text").attr("id", "tmpText").text(d.elementName.substring(0, truncateAfter))
//          //var str = Utilities.truncate(tmpText, 70)
//          //tmpText.remove();
//          var str = d.elementName.substring(0, truncateAfter)
//          if(str.length<d.elementName.length)
//            str = str.trim() + "...";
//
//            return str;
//          })
//        .sort(sortFn)
//        .attr({
//            class: 'setLabel',
//         // Not sure we need this..
//         //   id: function (d) {
//         //       return d.elementName.substring(0, truncateAfter);
//         //   },
//                transform: function (d, i) {
//                    return 'translate(' + (cellDistance * (i + 1) + 5) + ', 20) rotate(90)'
//                },
//            y: cellSize - 3,
//            x: 3,
//            height: textHeight-4,
//            'text-anchor': 'start'
//
////            transform: function (d, i) {
////                return 'translate(' + (cellDistance * (i ) + cellDistance / 2) + ',' + (setMatrixHeight + textHeight - textSpacing) + ')rotate(270)';
////            }
//      })
//      .on('click', setClicked)
//      .append("svg:title")
//      .text(function(d, i) { return d.elementName + " (" +d.setSize+ ")"; });

    function setClicked(d, i) {

        if (ctx.setSelection.mode === "multiSel"){
            if (d.isSelected){
                // for usedSets:
                if (ctx.setSelection.multiSelOut.has(d.elementName)){
                    ctx.setSelection.multiSelOut.remove(d.elementName);
                }else{
                    ctx.setSelection.multiSelOut.add(d.elementName);
                }
            }else{
                // for UNusedSets:
                if (ctx.setSelection.multiSelIn.has(d.elementName)){
                    ctx.setSelection.multiSelIn.remove(d.elementName);
                }else{
                    ctx.setSelection.multiSelIn.add(d.elementName);
                }
            }
            plotSetOverview();
        }else{
            updateSetContainment(d, true);
        }


//               d3.selectAll(".bulkCheck").transition().remove();
    }


    function bulkChange(){

        var list_update =
            sets.filter(function(d){
                return ctx.setSelection.multiSelIn.has(d.elementName) ||
                    ctx.setSelection.multiSelOut.has(d.elementName)
            })


        ctx.setSelection.multiSelIn = d3.set();
        ctx.setSelection.multiSelOut = d3.set();

        //close multiselect panel
        ctx.setSelection.mode ="none"
        ctx.setSelection.modeChange= true

        if (list_update.length>0){
            // updateSetCon will call plot again
            list_update.map(function(d, i) { updateSetContainment(d, i==list_update.length-1); });
        }else{
            plotSetOverview()
        }


    }



}

//    overview.on('mouseover', function(d, i) {
//
//      // Remove current transitions
//      d3.selectAll(".bulkCheck").transition();
//
//        var sortFn;
//
//        if (ctx.setOrder === "name") {
//          sortFn = sortName;
//        }  else {
//          sortFn = sortSize;
//        }
//
//      if(d3.selectAll(".bulkCheck")[0].length>5)
//        return;
//
//        usedSets.filter(function(d, ii) {
//
//          d3.select(".usedSets")
//            .append("foreignObject")
//            .datum([d])
//            .attr("width", 100)
//            .attr("height", 100)
//            .attr("class", "bulkCheck")
//            .attr("y", 40)
//            .attr("x", function(d, i) {
//              return cellDistance * (ii);
//            })
//            .html("<form><input type=checkbox value=setcheck id=setcheck_"+ii+" checked/></form>")
//
//        })
//
//        var unusedSetsCheck = unusedSets.sort(sortFn).filter(function(d, ii) {
//
//          d3.select(".unusedSets")
//            .append("foreignObject")
//            .datum([d])
//            .attr("width", 100)
//            .attr("height", 100)
//            .attr("class", "bulkCheck unusedSets")
//            .attr("y", 0)
//            .attr("x", function(d, i) {
//              return cellDistance * (ii);
//            })
//            .html("<form><input type=checkbox value=setcheck id="+ii+" /></form>")
//
//        })
//
//         d3.select("#headerVis").select("svg")
//            .append("foreignObject")
//            .attr("width", 100)
//            .attr("height", 100)
//            .attr("class", "bulkCheck")
//            .attr("y", 20)
//            .attr("x", function(d, i) {
//              return 0;//ctx.w- usedSets.length*cellDistance-100;
//            })
//            .html("<form><input type=button value=update /></form>")
//            .on("click", setClickedByBulk);
//
//         d3.select("#headerVis").select("svg")
//            .append("foreignObject")
//            .attr("width", 100)
//            .attr("height", 100)
//            .attr("class", "bulkCheck")
//            .attr("y", 20)
//            .attr("x", function(d, i) {
//              return 60;//ctx.w- usedSets.length*cellDistance-100;
//            })
//            .html("<form><input type=button value='all' /></form>")
//            .on("click", function() {
//              d3.selectAll("input[value=setcheck]").property("checked", true);
//            });
//
//         d3.select("#headerVis").select("svg")
//            .append("foreignObject")
//            .attr("width", 100)
//            .attr("height", 100)
//            .attr("class", "bulkCheck")
//            .attr("y", 20)
//            .attr("x", function(d, i) {
//              return 95;//ctx.w- usedSets.length*cellDistance-100;
//            })
//            .html("<form><input type=button value='none' /></form>")
//            .on("click", function() {
//              d3.selectAll("input[value=setcheck]").property("checked", false);
//            });
//
//         d3.select("#headerVis").select("svg")
//            .append("foreignObject")
//            .attr("width", 200)
//            .attr("height", 100)
//            .attr("class", "bulkCheck")
//            .attr("y", 20)
//            .attr("x", function(d, i) {
//              return 145;//ctx.w- usedSets.length*cellDistance-100;
//            })
//            .html("<form style='font-size:12px'>Order by: <input type=radio name='order' value='size' "+ (ctx.setOrder == 'size' ? 'checked' : '') +"/> Size <input type=radio name='order' value='name' "+ (ctx.setOrder == 'name' ? 'checked' : '') +"/> Name</form>")
//            .on("click", function() {
//              d3.select(this).selectAll("input").each(orderChange);
//            });
//
//           d3.selectAll(".bulkCheck").on("mouseenter", function() {
//            // Remove current transitions
//            d3.selectAll(".bulkCheck").transition();
//          })
//
//        })
//        .on('mouseout', function(d, i) {
//            mouseoutColumn(d, i);
//            d3.selectAll(".bulkCheck").transition().duration(1500).remove();
//        })




//function orderChange() {
//    if(!this.checked)
//        return;
//
//    var sortFn;
//
//    if (this.value === "name") {
//        sortFn = sortName;
//        ctx.setOrder = "name";
//    }  else {
//        sortFn = sortSize;
//        ctx.setOrder = "size";
//    }
//
//    d3.selectAll(".unusedSets .unusedSetSizeBackground")
//        .sort(sortFn)
//        .transition().duration(500).delay(function(d, i) {
//            return i * 500 / unusedSets.length;
//        })
//        .attr("transform", function (d, i) {
//            return 'translate(' + (cellDistance * (i )) + ', 20)'
//        })
//    d3.selectAll(".unusedSets .unusedSetSize")
//        .sort(sortFn)
//        .transition().duration(500).delay(function(d, i) {
//            return i * 500 / unusedSets.length;
//        })
//        .attr("transform", function (d, i) {
//            return 'translate(' + (cellDistance * i) + ', ' + ( textHeight - minorPadding - setSizeScale(d.setSize) + 20) + ')'
//        })
//
//    d3.selectAll(".unusedSets .setLabel")
//        .sort(sortFn)
//        .transition().duration(500).delay(function(d, i) {
//            return i * 500 / unusedSets.length;
//        })
//        .attr("transform", function (d, i) {
//            return 'translate(' + (cellDistance * (i + 1) + 5) + ', 20) rotate(90)'
//        })
//
//    d3.selectAll(".unusedSets .bulkCheck").remove();
//
//    unusedSets.sort(sortFn).filter(function(d, ii) {
//
//        d3.select(".unusedSets")
//            .append("foreignObject")
//            .datum([d])
//            .attr("width", 100)
//            .attr("height", 100)
//            .attr("class", "bulkCheck")
//            .attr("y", 0)
//            .attr("x", function(d, i) {
//                return cellDistance * (ii);
//            })
//            .html("<form><input type=checkbox value=setcheck id="+ii+" /></form>")
//
//    })
//
//}
/**
 * Created by Alexander Lex on 3/4/14.
 */

var SET_SIZE_GROUP_PREFIX = 'SetSizeG_';
var EMPTY_GROUP_ID = 'EmptyGroup';
var SET_BASED_GROUPING_PREFIX = "SetG_";

var handleLogicGroups = function (subsets, level, parentGroup) {
    filterGroups = [];
    var deleteCandidates =[];
    UpSetState.logicGroups.forEach(function (d) {
        var maskList = d.getListOfValues();
        var group = new QueryGroup(d.id, d.groupName, d.orClauses);
        getSubsetsForMaskList(subsets, maskList, function (d) {
            group.addSubSet(d);
        });

        if (group.subSets.length>0){
            filterGroups.push(group)
        }else{
            deleteCandidates.push(d);
        }
    })

    // TODO: HAS TO BE IMPROVED !!!
    deleteCandidates.forEach(function(d){
        UpSetState.logicGroups.slice(UpSetState.logicGroups.indexOf(d),1);
    })


}

var groupByOverlapDegree = function (subSets, level, parentGroup) {
    var degree = 2;
    if (level == 1) {
        degree = UpSetState.levelOneDegree;
    }
    else if (level == 2) {
        degree = UpSetState.levelTwoDegree;
    }
    var newGroups = []

    var defaultMask;
    if (parentGroup) {
        defaultMask = parentGroup.combinedSets;
    }

    var combinations = Math.pow(2, usedSets.length) - 1;

    var queries = []
    for (var i = 0; i <= combinations; i++) {
        fillMasks(i, usedSets.length, degree, queries, defaultMask);
    }
    for (var i = 0; i < queries.length; i++) {
        var name = "";
        for (var j = 0; j < queries[i].length; j++) {
            if (queries[i][j] === 1) {
                if (parentGroup.elementName !== usedSets[j].elementName)
                    name += usedSets[j].elementName + " ";
            }
        }
        var group = new Group("Overlap_G_" + i + "_" + parentGroup.id, name);
        group.level = level;
        group.combinedSets = queries[i];
        getSubsetsForMaskList(subSets, [queries[i]], function (d) {
            group.addSubSet(d);
        });
        if (group.subSets.length > 0) {
            newGroups.unshift(group);
        }
    }

    return newGroups;
//    console.log(queries);

//    for (var i = 0; i < subSets.length; i++) {
//        mask = Array.apply(null, new Array(subSets.length)).map(Number.prototype.valueOf, 0);
//        mask[i] = 1;
//    }

}

var fillMasks = function (setMask, length, minSets, queries, defaultMask) {

    var bitMask = 1;

    var query;
    if (defaultMask) {
        var query = defaultMask.slice(0);
    }
    else {
        query = Array.apply(null, new Array(length)).map(Number.prototype.valueOf, 0);
    }
    var memberCount = 0;

    for (var setIndex = length - 1; setIndex >= 0; setIndex--) {
        if (query[setIndex] === 1) {
            // true if this element is in the default mask
            memberCount++;
        }
        else if ((setMask & bitMask) === 1) {
            query[setIndex] = 1;
            memberCount++;
        }
        else {
            query[setIndex] = 2;
        }
        setMask = setMask >> 1;
    }
    if (memberCount == minSets) {
        // FIXME this is to remove duplicates. We shouldn't produce them in the first place
        var duplicate = false;
        for (var i = 0; i < queries.length; i++) {
            if (queries[i].compare(query)) {
                duplicate = true;
                break;
            }
        }
        if (!duplicate) {
            queries.push(query);
        }
    }

//    var resultMasks = [];
//    for (var maskCount = 0; maskCount < length; maskCount++) {
//        for (var i = 0; i < length; i++) {
//            var newMask = masks[maskCount].slice(0);
//
//
//        }
//    }
}

var groupByRelevanceMeasure = function (subSets, level, parentGroup) {
    var newGroups = [];
    newGroups.push(new Group('GROUP_POS_DEV' + parentGroup.id, 'Positive Expected Value', level));
    newGroups.push(new Group('GROUP_NEG_DEV' + parentGroup.id, 'Negative Expected Value', level));
    newGroups.push(new Group(EMPTY_GROUP_ID + parentGroup.id, 'As Expected', level));
    for (var i = 0; i < subSets.length; i++) {
        var index = 0
        if (subSets[i].disproportionality > 0) {
            index = 0;
        }
        else if (subSets[i].disproportionality < 0) {
            index = 1;
        }
        else {
            index = 2;
        }
        newGroups[index].addSubSet(subSets[i])
    }
    return newGroups;
}

var groupByIntersectionSize = function (subSets, level, parentGroup) {
    var newGroups = [];
    newGroups.push(new Group(EMPTY_GROUP_ID + parentGroup.id, 'Degree 0 (in no set)', level));
    var maxSetSize = Math.min(usedSets.length, UpSetState.maxCardinality);
    for (var i = UpSetState.minCardinality; i < maxSetSize; i++) {
        newGroups.push(new Group(SET_SIZE_GROUP_PREFIX + (i + 1) + '_' + parentGroup.id, 'Degree ' + (i + 1) + " (" + (i + 1) + " set intersect.)", level));
    }
    subSets.forEach(function (subSet) {
        var group = newGroups[subSet.nrCombinedSets];
        if (group != null)
            group.addSubSet(subSet);
//        else
//            console.log('Fail ' + group + subSet.nrCombinedSets);
    })
    return newGroups;
}

/**
 * Creates groups for all sets containing all subsets of this set
 */
var groupBySet = function (subSets, level, parentGroup) {

    var newGroups = [];
    var noSet = new Group(EMPTY_GROUP_ID, 'No Set', level);
    newGroups.push(noSet);

    for (var i = 0; i < usedSets.length; i++) {
        var group = new Group(SET_BASED_GROUPING_PREFIX + (i + 1) + parentGroup.id, usedSets[i].elementName, level);
        group.combinedSets = Array.apply(null, new Array(usedSets.length)).map(Number.prototype.valueOf, 2);
        group.combinedSets[i] = 1;
        newGroups.push(group);

        subSets.forEach(function (subSet) {
            if (subSet.combinedSets[i] !== 0) {
                group.addSubSet(subSet);
            }

        });

    }

    subSets.forEach(function (subSet) {
        if (subSet.id == 0) {
            noSet.addSubSet(subSet);
            noSet.combinedSets = subSet.combinedSets;
        }
    });

    return newGroups;
};

/** Collapse or uncollapse group */
var collapseGroup = function (group) {
    group.isCollapsed = !group.isCollapsed;

    UpSetState.collapseChanged = true;
    updateState();
    return;

};

var collapseAggregate = function (aggregate) {
    aggregate.isCollapsed = !aggregate.isCollapsed;
    updateState();
};

// ----------------------- Sort Functions ----------------------------

/** Filters the provided list of subsets to include only those of length >0. If no list of subsets is provided the global list is used. */
function getFilteredSubSets(subSetsToFilter) {
    if (!subSetsToFilter) {
        subSetsToFilter = subSets;
    }
    if (!UpSetState.hideEmpties) {
        return subSetsToFilter.slice(0);
    }
    var filteredSubSets = []
    for (var i = 0; i < subSetsToFilter.length; i++) {
        if (subSetsToFilter[i].items.length > 0) {
            filteredSubSets.push(subSetsToFilter[i]);
        }
    }
    return filteredSubSets;
}

var sortBySetItem = function (subSets, set) {
    if (!set) {
        set = usedSets[0];
    }
    var dataRows = getFilteredSubSets(subSets);
    var setIndex = usedSets.indexOf(set);
    dataRows.sort(function (a, b) {
        // move all elements that contain the clicked set to the top
        if (b.combinedSets[setIndex] !== a.combinedSets[setIndex]) {
            return b.combinedSets[setIndex] - a.combinedSets[setIndex];
        }
        // move all elements with fewer intersections to the top
        if (a.nrCombinedSets !== b.nrCombinedSets) {
            return a.nrCombinedSets - b.nrCombinedSets;
        }
        // if the number of combined sets is identical, we can pick the largest one
        return b.id - a.id;
    });
    return dataRows;
}

var sortByCombinationSize = function (subSets) {
    var dataRows = getFilteredSubSets(subSets);

// sort by number of combinations
    dataRows.sort(function (a, b) {
        if (a.nrCombinedSets !== b.nrCombinedSets) {
            return a.nrCombinedSets - b.nrCombinedSets;
        }
        // if the number of combined sets is identical, we can pick the largest one
        return b.id - a.id;
    });
    return dataRows;
}

/** sort by size of set overlap */
var sortBySubSetSize = function (subSets) {
    var dataRows = getFilteredSubSets(subSets);
    dataRows.sort(function (a, b) {
        return b.setSize - a.setSize;
    });
    return dataRows;
}

/** sort by size of set overlap */
var sortByExpectedValue = function (subSets) {
    var dataRows = getFilteredSubSets(subSets);

    dataRows.sort(function (a, b) {
        return Math.abs(b.disproportionality) - Math.abs(a.disproportionality);
    });
    return dataRows;
}

/**
 * Takes a list of groups and writes them into an array, according to the nesting & collapse rules
 * @param groupList
 * @returns {*}
 */
var unwrapGroups = function (groupList) {
    var dataRows = []
    for (var i = 0; i < groupList.length; i++) {
        var group = groupList[i];
        // ignoring an empty empty group
        if (group.id === EMPTY_GROUP_ID && group.setSize === 0 || (group.visibleSets.length === 0 && UpSetState.hideEmpties)) {
            continue;
        }
        dataRows.push(group);
        if (UpSetState.collapseAll && !(UpSetState.levelTwoGrouping && group.nestedGroups )) {
            group.isCollapsed = true;
        }
        if (UpSetState.expandAll) {
            group.isCollapsed = false;
        }
//        if (UpSetState.levelTwoGrouping && group.nestedGroups && (!group.isCollapsed || UpSetState.collapseAll)) {
        if (UpSetState.levelTwoGrouping && group.nestedGroups && !group.isCollapsed) {

            dataRows = dataRows.concat(unwrapGroups(group.nestedGroups, []));
            continue;
        }
        if (!group.isCollapsed) {
            dataRows = dataRows.concat(StateMap[UpSetState.sorting](group.visibleSets));

            if (group.aggregate.subSets.length > 0 && !UpSetState.hideEmpties) {
                dataRows.push(group.aggregate);
                if (!group.aggregate.isCollapsed) {
                    for (var k = 0; k < group.aggregate.subSets.length; k++) {
                        dataRows.push(group.aggregate.subSets[k]);
                    }
                }
            }
        }
    }

    return dataRows;
};

var StateMap = {
    groupByIntersectionSize: groupByIntersectionSize,
    groupBySet: groupBySet,
    groupByRelevanceMeasure: groupByRelevanceMeasure,
    groupByOverlapDegree: groupByOverlapDegree,

    sortByCombinationSize: sortByCombinationSize,
    sortBySubSetSize: sortBySubSetSize,
    sortByExpectedValue: sortByExpectedValue,
    sortBySubSetSize: sortBySubSetSize,
    sortBySetItem: sortBySetItem
};

var StateOpt = {
    groupByIntersectionSize: 'groupByIntersectionSize',
    groupBySet: 'groupBySet',
    groupByRelevanceMeasure: 'groupByRelevanceMeasure',
    groupByOverlapDegree: 'groupByOverlapDegree',

    sortByCombinationSize: 'sortByCombinationSize',
    sortBySubSetSize: 'sortBySubSetSize',
    sortByExpectedValue: 'sortByExpectedValue',
    sortBySetItem: 'sortBySetItem'
};

var UpSetState = {
    collapseAll: false,
    expandAll: false,
    // collapseChanged: false,

    grouping: queryParameters["grouping"] || StateOpt.groupByIntersectionSize,
    levelTwoGrouping: undefined,

    /** the degree used in case of groupByOverlapDegree on L1 */
    levelOneDegree: 2,
    /** the degree used in case of groupByOverlapDegree on L2 */
    levelTwoDegree: 2,

    sorting: StateOpt.sortByCombinationSize,

    /** hide empty subsets, groups and aggregates */
    hideEmpties: true,

    /** Sets the upper threshold of cardinality of subsets */
    maxCardinality: undefined,
    /** Sets the lower threshold of cardinality of subsets */
    minCardinality: 0,

    forceUpdate: false,

    /** user defined logic groups **/
    logicGroups: [],
    logicGroupChanged: false

};

var previousState = false;

var updateState = function (parameter) {
    var forceUpdate = !previousState || UpSetState.forceUpdate || (UpSetState.hideEmpties != previousState.hideEmpties);

    // true if pure sorting - no grouping
    if ((UpSetState.sorting && !UpSetState.grouping) && (forceUpdate || (previousState && previousState.sorting !== UpSetState.sorting))) {
        dataRows = StateMap[StateOpt[UpSetState.sorting]](subSets, parameter);
    }
    else if (UpSetState.grouping && (forceUpdate || (previousState && previousState.grouping !== UpSetState.grouping || previousState.levelTwoGrouping !== UpSetState.levelTwoGrouping))) {
        levelOneGroups = StateMap[StateOpt[UpSetState.grouping]](subSets, 1, "");

        if (UpSetState.levelTwoGrouping) {
            levelOneGroups.forEach(function (group) {
                group.nestedGroups = StateMap[StateOpt[UpSetState.levelTwoGrouping]](group.subSets, 2, group);
            });
        }
        dataRows = unwrapGroups(levelOneGroups);

    }
    else if (UpSetState.collapseChanged && UpSetState.grouping) {
        dataRows = unwrapGroups(levelOneGroups);
    }

    if (UpSetState.logicGroupChanged) {
        handleLogicGroups(subSets, 1);
        UpSetState.logicGroupChanged = false;

    }

    if (filterGroups && filterGroups.length > 0) {
        var filteredRows = unwrapGroups(filterGroups);
        var separator = new Separator("FILTER_SEPARATOR", 'Natural Intersections');
        filteredRows.push(separator);
        dataRows = filteredRows.concat(dataRows);
    }

    UpSetState.forceUpdate = false;
    UpSetState.expandAll = false;
    UpSetState.collapseAll = false;
    UpSetState.collapseChanged = false;

    renderRows.length = 0;

    var registry = {};
    var prefix = "";

    var count = 1;
    dataRows.forEach(function (element) {
        var wrapper = {};

        if (UpSetState.grouping === StateOpt.groupBySet || UpSetState.levelTwoGrouping === StateOpt.groupBySet) {
            if (element.type === ROW_TYPE.SUBSET) {
                wrapper.id = prefix + element.id;
            }
            else {
                prefix = element.id + "_";
                wrapper.id = element.id;
            }
        }
        else {

            if (registry.hasOwnProperty(element.id)) {
                count = registry[element.id];
                count += 1;
                registry[element.id] = count;
            }
            else {
                registry[element.id] = 1;
            }

            wrapper.id = element.id + '_' + count;
        }
        wrapper.data = element;
        renderRows.push(wrapper);

    });
    previousState = JSON.parse(JSON.stringify(UpSetState));

    queryParameters["grouping"] = UpSetState.grouping;
    // updateQueryParameters();

};

// external events that influence sort.js
function bindEventsForSort() {
    $(EventManager).bind("set-added", function (event, data) {
        UpSetState.logicGroups.forEach(function(lg){
            lg.orClauses.forEach(function(orClause){
                orClause[data.set.id] = {state:ctx.logicStates.DONTCARE};
            })
        })
        UpSetState.logicGroupChanged = true;

    })

    $(EventManager).bind("set-removed", function (event, data) {
        UpSetState.logicGroups.forEach(function(lg){

            lg.orClauses.forEach(function(orClause){
                delete orClause[data.set.id];
            })
        })
        UpSetState.logicGroupChanged = true;

    })


}

bindEventsForSort();

function mouseoverColumn(d,i){
    var combinedSets = usedSets.map(function(dd,ii){
        return (dd.id== d.id)?1:0
    })
    mouseoverColumnImpl(combinedSets);


}

function mouseoverColumnImpl(combinedSets) {

    d3.selectAll(".connection, .combination rect, .setSize")
    //    .style("opacity", .3)
    .style("stroke", "white")

    d3.selectAll(".connection.diagonal").filter(function (dd, ii) {
        return combinedSets[ii];
//        return dd.id== d.id;
    })
        .style("opacity", 1)
        .style("stroke", "black")


//    d3.selectAll(".combination").selectAll("rect").filter(function (dd, ii) {
//        return combinedSets[ii];
////        return dd.id== d.id;
//    })
//        .style("opacity", 1)
//        .style("stroke", ctx.backHighlightColor)

//    d3.selectAll(".setSize").filter(function (dd, ii) {
//        return combinedSets[ii];
////        return dd.id== d.id;
//    })
//        .style("opacity", 1)
//        .style("stroke", "black")

    d3.selectAll(".setSizeBackground").filter(function (dd, ii) {
        return combinedSets[ii];
//        return dd.id== d.id;
    })
        .style("opacity", 1)
        .style("fill", ctx.backHighlightColor)

    d3.selectAll(".connection.vertical").filter(function (dd, ii) {
        return combinedSets[ii];
//        return dd.id== d.id;
    })
        .style("opacity", 1)
//        .style("stroke", "black")
        .style("fill",ctx.backHighlightColor)



    ctx.columnBackgroundNode.selectAll(".columnBackground").style({
        opacity:function(dd,i){
            var value = combinedSets[i];
            switch (value){
                case 2:
                    return 0; break;
                default:
                    return value;

            }
        }
    })

}

function mouseoutColumn() {

    d3.selectAll(".connection, .combination rect")
        .style("opacity", 1)
        .style("stroke", "none")

    d3.selectAll((".setSizeBackground")).style({
        "stroke": "none",
        "fill":ctx.grays[0]
    })

    ctx.tableHeaderNode.selectAll(".connection")
        .style("fill", ctx.grays[0])

    ctx.columnBackgroundNode.selectAll(".columnBackground").style({
        opacity:0,
        stroke:"none"
    })

}

function mouseoverRow(d,i){
    mouseoverRowImpl(d, d.data.combinedSets);
}

function mouseoverRowImpl(d, combinedSets) {


    // plot Venn diagram with highlighting of selected subset
    if ( d.data.type === 'SUBSET_TYPE') {
        if ( usedSets.length === 2 || usedSets.length === 3 ) {
            venn.plot( [ d.data ], usedSets.length );
        }
    }

    if ( d.data.type === 'GROUP_TYPE') {
        if ( usedSets.length === 2 || usedSets.length === 3 ) {
            venn.plot( d.data.subSets, usedSets.length );
        }
    }

    d3.selectAll(".row .backgroundRect")
        .style({
        "stroke":function(dd){
                    if (d.id == dd.id) return "black";
                    else null;
                 },
        "fill-opacity":function(dd){
                   if (d.id == dd.id) return .7;
                    else return 0.001;
                }

        })





//    mouseoverColumn(d.data.combinedSets)
    mouseoverColumnImpl(combinedSets)

}

function mouseoutRow() {

    // plot Venn diagram without highlighting
    venn.plot(null, usedSets.length );

    d3.selectAll(".row .backgroundRect")
        .style({"stroke":null,
            "fill-opacity":0
        })
    mouseoutColumn();
}

function mouseoverCell(rowData, columnIndex) {

    var combinedSets = rowData.data.combinedSets.map(function(d,i){
        if (i==columnIndex) return 1;
        else return d;
    })



    mouseoverRowImpl(rowData, combinedSets)

    var columnBackgrounds = ctx.columnBackgroundNode.selectAll(".columnBackground").style({
        stroke:function(dd,i){if (i==columnIndex) return 1; else return "none"}
    })

    d3.selectAll(".setSize").style({
        stroke:function(dd,i){if (i==columnIndex) return "black"; else return "white"}
    })
//        .style("opacity", 1)
//        .style("fill", ctx.backHighlightColor)
//



    d3.selectAll(".connection.vertical")
        .style("stroke",function(d,i){
            return (i==columnIndex)?"black":"none";
        })



//    columnBackgrounds.filter(function(d,i){return i==columnIndex})
//        .style({
//            opacity:1
//        })

}

function mouseoutCell() {

    mouseoutRow()

}
function Scrollbar(params) {

	this.parentEl = params.parentEl;
	this.x = params.x;
	this.y = params.y;
	this.width = params.width || 20;
  this.height = params.height || 200;
	this.value = params.initValue || 0;

	this.rowsHeight = params.rowsHeight || 200;
	this.viewportHeight = params.viewportHeight;

	if(this.rowsHeight < this.viewportHeight)
		this.thumbHeight = this.height; // Nothing to scroll
	else
		this.thumbHeight = this.height - this.height*(this.rowsHeight - this.viewportHeight) / this.rowsHeight; // Test

	// Ideally we should have some listeners
	this.listeners = [];

	this.min = params.min;
	this.max = params.max;

	// In case we want some ticks on the scrollbar
	this.ordinal_axis = d3.scale.ordinal().domain(d3.range(this.min, this.max+1)).rangePoints([0, this.height]);
	this.linear_axis = d3.scale.linear().domain([this.min, this.max]).range([0, this.height]);

	this.scale = d3.scale.linear().domain([0, this.viewportHeight-this.rowsHeight]).range([0,	this.height*(this.rowsHeight - this.viewportHeight) / this.rowsHeight]);

	var that = this;

  var dragScrollbar = d3.behavior.drag()
          .origin(Object)
          .on("dragstart", dragstartScrollbar)
          .on("drag", dragScrollbar)
          .on("dragend", dragendScrollbar);

   var backgroundScrollbar = this.parentEl.append("rect").attr({
      width: 20,
      height: params.height,
      fill: 'lightgray',
      class: "scrollbar-background",
      x: params.x,
      y: params.y
    });

  this.parentEl.selectAll(".scrollbar-thumb").remove()

  this.gThumb = this.parentEl.selectAll(".scrollbar-thumb")
      .data([{value: this.value, dx:0, x:0, y:0}])
      .enter()
      .append("g")
      .attr("class", "scrollbar-thumb")
      .on("mouseover", function(d){
          d3.select(this).style("cursor", "pointer")
      })
      .call(dragScrollbar);

   this.gThumb.append("rect")
        .attr("width", 20)
        .attr("height", this.thumbHeight)
        .attr("x", params.x)
        .attr("y", params.y)
        .attr("rx", 20)
        .attr("ry", 10)
        .attr("fill", "gray")

    function dragstartScrollbar(d) {
      d.dx = 0;
    }


    function dragendScrollbar(d) {

    }

    function dragScrollbar(d) {
      d.y += d3.event.dy;
      d.y = Math.max(0, Math.min(d.y, that.height-that.thumbHeight))

      that.gThumb.attr("transform", "translate("+[0, d.y]+")");

      d3.select(".gRows").attr('transform', 'translate(0, ' + that.scale.invert(d.y) + ')');

      // Subset background should stick to his place
      d3.select(".background-subsets").attr('transform', function (d, i) {
          return 'translate(' + [ 0, d.y ] + ')'
      });
    }

 }

Scrollbar.prototype.setValue = function(value) {
	this.value = value;
	var new_y = this.scale(value);
	this.gThumb.attr("transform", function(d) {
		d.y = Math.min(0, new_y);
		return "translate("+[0, -d.y]+")";
	})
}
function plotSelectionTabs( element, selections, activeSelection ) {
    // clear target element
    d3.select(element).html("");

    if ( selections.getSize() <= 0 ) {
        d3.select(element).append('div' )
            .attr( 'class', 'info-message' )
            .html( 'No queries. Click <i class="fa fw fa-plus"></i> button to add a new query.' );

        d3.select('#filters-list').html("");
        d3.select('#filters-list').append( "div" ).attr( "class", "info-message" ).html( 'No active query.' );
        d3.select('#filters-controls').html("");
    }
    else {
        var table = d3.select(element)
            .append("table")
            .attr("class", "selection-tab-list");

        var tbody = table.append("tbody");

        var tabs = tbody.append("tr")
                .selectAll("td")
                .data(selections.list)
            .enter()
                .append("td")
                    .attr("class", "selection-tab")
                    .classed( { 'active': function(d,i) { return ( selections.isActive(d) ); } } )
                    .on("click", function(k) { // is attribute object
                        // check if selection has been deleted or not
                        if ( selections.getSelectionFromUuid( k.id ) ) {
                            selections.setActive( k );
                        }
                    });

                tabs.append("i")
                    .attr( "class", "fa fa-square" )
                    .style("color", function(d,i) { return ( selections.getColor( d ) ); } )
                    .style( "margin-right", "2px");
                tabs.append("span")
                    .text(function(d) { return d3.format("5d")( d.items.length ); });
                tabs.append("i")
                    .attr( "class", "fa fa-times-circle" )
                    .style( "margin-left", "5px")
                    .on("click", function(k) { // is attribute object
                        selections.removeSelection( k );
                    });
    }



    d3.select('#selection-controls').html("");
    d3.select('#selection-controls')
        .append('div')
        .attr('class', 'selection-button level-1-button')
        .attr('title', 'Create element query' )
        .html('<i class="fa fw fa-plus"></i>')
        .on("click", function(event){
            createInitialSelection();
        });
}


function plotSelectedItems( elementId, selection ) {

    var element = d3.select(elementId);
    // clear target element
    element.html("");

    if ( !selection || selections.getSize() === 0 || !selections.getColor( selection ) ) {
        element.append( "div" ).attr( "class", "info-message" ).html( 'No active query.' );
        return;
    }

    //d3.select(element).html('<p>' + selection.items.length + ' of ' + depth + ' selected</p>')

    /*
    for ( var i = 0; i < selection.filters.length; ++i ) {
        filter.renderViewer(element, selection, selection.filters[i].uuid );
    }
    */
    selection.filterCollection.renderController(d3.select("filters-controller"));

    var table = element.append("table");
    var thead = table.append("thead");
    var tbody = table.append("tbody");

    var selectionColor = parseInt( selections.getColor( selection ).substring(1), 16 );
    //console.log( selectionColor + " --- " + selections.getColor( selection ) + " --- " + ( ( selectionColor << 24 ) >>> 24 ).toString(16) );
    //console.log( 'rgba(' + ( ( ( selectionColor << 8 ) >> 24 ) >>>0 ) + ',' + ( ( ( selectionColor << 16 ) >> 24 ) >>> 0 ) + ',' + ( ( ( selectionColor << 24 ) >> 24 ) >>> 0 ) + ', 0.25)' );

    thead.append("tr")
            .selectAll("th")
            .data(attributes.slice(0,attributes.length-1)) // don't show set column
        .enter()
            .append("th")
                .style("background-color", 'rgba(' + ( ( ( selectionColor << 8 ) >> 24 ) >>>0 ) + ',' + ( ( ( selectionColor << 16 ) >> 24 ) >>> 0 ) + ',' + ( ( selectionColor << 24 ) >>> 24 ) + ', 0.5)' )
                .style("border-bottom", "3px solid " + selections.getColor( selection ) )
                .attr("class", "item-table-header" )
                .text(function(d) { return d.name; })
                .on("click", function(k) { // is attribute object

                    thead.selectAll('th').data(attributes).text(function(d) { return d.name; });
                    d3.select(this).html( ( k.sort > 0 ? "&#x25B2;" : "&#x25BC;" ) + " " + k.name );
                    rows.sort( function(a, b) {
                        switch ( k.type ) {
                            case 'integer':
                                // fall-through
                            case 'float':
                                return k.sort * ( k.values[a] - k.values[b] );
                            case 'id':
                                // fall-through
                            case 'string':
                                // fall-through
                            default:
                                if ( k.values[a] < k.values[b] ) {
                                    return k.sort * -1;
                                }
                                if ( k.values[a] > k.values[b] ) {
                                    return k.sort * 1;
                                }

                                return 0;
                        }
                    });
                    // switch sort order
                    k.sort = k.sort * -1;
                });

    var rows = tbody.selectAll("tr")
            .data(selection.items.slice(0,100))
        .enter()
            .append("tr")
            .each(function(d,i) {
                d3.select(this).selectAll("td")
                    .data(attributes.slice(0,attributes.length-1))
                .enter()
                    .append("td")
                    .text(function(a) { return a.values[selection.items[i]] });
            });
}
/**
 * Created by Hendrik Strobelt on 3/11/14.
 */



function SetGrouping(params){
    var width = params.width+10;
    var gQuery = params.queryElement;
    var vis = params.visElement;
    var cellSize = params.cellSize;
    var usedSets = params.usedSets;

//    console.log(globalContext);

    // to be bound !!
    var grays = ['#f0f0f0', '#636363'];
    var groupingByList = [
        {name:"by set size", groupFunction:function(){console.log("by set size");}},
        {name:"by sets", groupFunction:function(){console.log("by size");}},
        {name:"by weather", groupFunction:function(){console.log("by size");}}
    ]



    var collapseHeight = cellSize+5;
    var uncollapseHeight = 70;
    var isCollapsed = true;

    var toggleState = {}





    var init = function(){

//        vis.attr({
//            "transform":"translate("+0+","+(collapseHeight+6)+")"
//        })

        gQuery.append("rect").attr({
            class:"menuPlaceholder menuPlaceholderRect",
            width:width,
            height:collapseHeight
        })
        .style({
            fill:"none",
            stroke: grays[1]
        })


        gQuery.append("rect").attr({
            class:"menuPlaceholder collapseButton",
            x:width/2-50,
            y:2,
            width:100,
            height: collapseHeight-4
        })
            .style({
                "fill":"white"
            }).on({
                "click":function(d){ toggleMenu()}

            })

        gQuery.append("text").text("vvvv  detail").attr({
            class:"menuPlaceholder menuPlaceholderText columnLabel",
            "text-anchor":"middle",
            "transform":"translate("+(width-10)+","+(collapseHeight/2)+")"
        })
            .style({
//                "font-size":"8pt",
                "text-anchor":"end"
            })
            .on({
                "click":function(d){toggleMenu()}

            })


        var patternDef = gQuery.append("defs").append("pattern").attr({
            id:"HalfSelectPattern",
            patternUnits:"userSpaceOnUse",
            x:"0",
            y:"0",
            width:cellSize,
            height:cellSize
        })
        patternDef.append("rect").attr({
                x:cellSize/2,
                y:"0",
                width:cellSize/2,
                height:cellSize

            }).style({
                fill: grays[1]
            })
        patternDef.append("rect").attr({
            x:0,
            y:"0",
            width:cellSize/2,
            height:cellSize

        }).style({
                fill: grays[0]
            })


        var groupSelector = gQuery.append("g").attr({
           class:"groupSelector",
            "transform":"translate("+5+","+2+")"

        })
        usedSets.forEach(function(d){
            toggleState[d.id]=2;
        })

        groupSelector.selectAll(".selectorCircle").data(usedSets.map(function(d){return d.id;})).enter()
           .append("circle").attr({
                class:"selectorCircle",
                cx:function(d,i){return (i*cellSize)+cellSize/2},
                cy:function(d,i){return cellSize/2},
                r: cellSize/2-1
            })
            .style({
//                stroke:grays[1],
                fill:function(d){
                    switch(toggleState[d])
                    {
                        case 0:
                            return grays[0]
                            break;
                        case 1:
                            return grays[1]
                            break;
                        default:
                            return "url(#HalfSelectPattern)"
                    }}
            })
            .on({
                "click":function(d){toggleCircle(d);}

            })

        var xoffset = usedSets.length*cellSize +5;
        var buttonWidth = 70
        groupSelector.append("text").text("filter").attr({
            class:"columnLabel",
            x: xoffset,
            y: cellSize/2
        }).style({
                "text-anchor":"start"
        })

        groupSelector.selectAll(".groupAction").data(groupingByList).enter()
            .append("text")
            .text(function(d){return d.name})
            .attr({
                class:"groupAction columnLabel",
                x: function(d,i){return xoffset + (i+1)*(buttonWidth+3)},
                y: cellSize/2
            })




    }

    init();




    var toggleCircle= function(id){
        toggleState[id] = (toggleState[id]+1) % 3;

        gQuery.selectAll(".selectorCircle").style({
            fill:function(d){
       //         console.log(d);
                switch(toggleState[d])
            {
                case 0:
                    return grays[0]
                    break;
                case 1:
                    return grays[1]
                    break;
                default:
                    return "url(#HalfSelectPattern)"
            }}
        })


    }


    var toggleMenu= function(){

        if (isCollapsed){
            gQuery.select(".menuPlaceholderRect").transition().attr({
                height:uncollapseHeight
            })

            gQuery.select(".menuPlaceholderText").text(" ^^^^  detail")

            vis.transition().attr({
                "transform":"translate("+0+","+(uncollapseHeight+2)+")"
            })


            isCollapsed=false;
        }else{
            gQuery.select(".menuPlaceholderRect").transition().attr({
                height:collapseHeight
            })

            gQuery.select(".menuPlaceholderText").text("vvvv  detail")

            vis.transition().attr({
                "transform":"translate("+0+","+(collapseHeight+2)+")"
            })

            isCollapsed=true;

        }





    }


//    vis.append("rect").attr({
//
//
//
//    })
//







}
/**
 * Created by hen (hendrik.strobelt.com)
 */

function LogicPanel(params){

    var width = params.width;          // width for the whole row
    var vis = params.visElement;       // the node for whole vis
    var panel = params.panelElement;    // panel element
    var cellSize = params.cellSize;     // cell size for a particular subset indicator (circle)
    var usedSets = params.usedSets;     // all used Sets
    var grays = params.grays;           // range of grays used for dot labeling
    var belowVis = params.belowVis;     // the vis node below the panel (to be translated)
    var buttonX = params.buttonX;       // button X coordinate
    var buttonY = params.buttonY;       // button Y coordinate
    var subsets = params.subsets;
    var cellWidth = params.cellWidth; // width of cells
    var ctx = params.ctx

    var stateObject= params.stateObject
    var callAfterSubmit = params.callAfterSubmit;


    // to be bound !!
//    var grays = ['#f0f0f0', '#636363'];
//    var groupingByList = [
//        {name:"by set size", groupFunction:function(){console.log("by set size");}},
//        {name:"by sets", groupFunction:function(){console.log("by size");}},
//        {name:"by weather", groupFunction:function(){console.log("by size");}}
//    ]


    this.logicState = ctx.logicStates;

    var me = this;


    var setNames= {}
    var collapseHeight = cellSize;
    var uncollapseHeight = 95;
    var isCollapsed = true;
    var toggleState = {}
    var isNewPanel = true;
    var belowVisRestoreTranslate = "translate(0, 90)"

    var actualGroupLabel = "Query"

//    var getListOfValues = function(){
//        console.log(this);
//        var compareList= []
//        this.orClauses.forEach(function(orClause){
//
//            var compareObject = []
//            for (key in orClause){
//                compareObject.push(orClause[key].state);
//            }
//            compareList.push(compareObject)
//        })
//
//        return compareList;
//    }


    var logicExpression = {}
    var actualOrClause = 1;

    var initLogicExpression = function(){
        logicExpression = {
            groupName:"",
            orClauses:[],
            getListOfValues:function(){

                var compareList= []
                this.orClauses.forEach(function(orClause){

                    var compareObject = []
                    for (key in orClause){
                        compareObject.push(orClause[key].state);
                    }
                    compareList.push(compareObject)
                })

                return compareList;
            }
        }


    }



    // the color for logic related stuff (highlighting & button)
    const logicColor = "#a1d99b";

    var addLogicButton = {}


    var init = function(){
        //### add button ##
        addLogicButton = vis.append("g").attr({
            class:"logicAddButton",
            "transform":"translate("+buttonX+","+buttonY+")"
        })

//        addLogicButton.append("rect").attr({
//            width:60,
//            height:18
//        }).style({fill: logicColor })
//            .on("click", addLogic)

        addLogicButton.append("rect").attr({
            width:20,
            height:20,
            x:0,
            y:0,
            rx:5,
            ry:5

        }).style({fill: logicColor, "cursor":"pointer", opacity:.5 })
            .on("click", addLogic)
            .on("mouseover",function(){d3.select(this).style("opacity",1);})
            .on("mouseout",function(){d3.select(this).style("opacity",.5);})

        addLogicButton.append("text").attr({
            class:"selection-button",
            "transform":"translate("+3+","+16+")",
            "pointer-events":"none"
        }).style({
                "font-family":"FontAwesome"

            })
            .text('\uf067')



        addLogicButton.append("text").attr({
            class:"addButton",
            x:25,
            y:10
        }).style({ fill:"black", "text-anchor":"start", "cursor":"auto" })
            .text("Query")
//            .on("click", addLogic)


        defineDontCarePattern(panel,cellSize,grays);

        initLogicExpression();

    }


    var defineDontCarePattern = function(gQuery, cellSize, grays){
        var patternDefAll = gQuery.selectAll("defs").data([cellSize], function(d){return d;})
        patternDefAll.exit().remove();


//        if (removed.length<1){
        var patternDef = patternDefAll.enter().
        append("defs").append("pattern").attr({
                id:"DontCarePattern",
//            patternUnits:"userSpaceOnUse",
                patternContentUnits:"objectBoundingBox",
                x:"0",
                y:"0",
                width:1,
                height:1
            })


        patternDef.append("rect").attr({
            x:0,
            y:0,
            width:1,
            height:1,
            fill: grays[0]
        })
        patternDef.append("circle").attr({
            cx:.5,
            cy:.5,
            r:.2,
            fill: grays[1]

        })




//        patternDef.append("rect").attr({
//            x:.5,
//            y:0,
//            width:.5,
//            height:1,
//            fill: grays[1]
//        })
//        patternDef.append("rect").attr({
//            x:0,
//            y:0,
//            width:.5,
//            height:1,
//            fill: grays[0],
//            transform:"rotate(45)"
//        })
    }


    var addLogic = function(){

        addLogicButton.attr({
            "opacity":0
        })
        belowVisRestoreTranslate= +belowVis.attr("y");


        // define first orClause as dontcare ANDs
        logicExpression.orClauses[0] = {};
        usedSets.forEach(function(d){
            logicExpression.orClauses[0][d.id]={state:me.logicState.DONTCARE};
//            logicExpression.orClauses[0][d.id]={state:Math.floor(Math.random()*3)};
        })

        logicExpression["id"] = "LogicGroup_"+(new Date().getTime())

        actualOrClause=0;
        isNewPanel= true;

        setNames={}
        usedSets.forEach(function(d){
            setNames[d.id] = d.elementName
        })
        actualGroupLabel = "Query"

        renderActualPanel();
    }

    var addOrClause = function(){

        var id = logicExpression.orClauses.length;
        logicExpression.orClauses[id] = {};
        usedSets.forEach(function(d){
            logicExpression.orClauses[id][d.id]= {state:me.logicState.DONTCARE};
//            logicExpression.orClauses[id][d.id]={state:Math.floor(Math.random()*3)};
        })
        actualOrClause= id;
        renderActualPanel();
    }


    var selectRow = function(index){
        if (index != actualOrClause){
            actualOrClause= index;
            renderActualPanel();
        }else{
            actualOrClause = -1;
            renderActualPanel();
        }
    }

    var removeRow = function(index){
        logicExpression.orClauses.splice(index,1)
        actualOrClause=actualOrClause-1;
        if (logicExpression.orClauses.length==0) destroyPanel();
        else renderActualPanel();
    }


    function changeState(orClause, id, state) {
         logicExpression.orClauses[actualOrClause][id] = {state:state};

//        console.log("here");
         panel.selectAll(".logicPanelRow").filter(function(d,i){return (i==actualOrClause)})
             .each(function(d){
                 renderSelectorTable(this, true, false, actualOrClause);
                })

    }

    this.getTextDescription = function(actualOrClause){
        var actualClause = logicExpression.orClauses[actualOrClause]
        var collectExpressions = {}

        Object.keys(actualClause).forEach(function(d){

            var setList = collectExpressions[actualClause[d].state]
            if (setList==null){
                setList=[setNames[d]]
            }else{
                setList.push(setNames[d])
            }
            collectExpressions[actualClause[d].state] = setList

        })

        //console.log("expression",collectExpressions);

        var setNameListLength = Object.keys(setNames).length;
        var expression = "";

        Object.keys(me.logicState).forEach(function (dd){
            var d = me.logicState[dd];
            if (collectExpressions[d]!=null && collectExpressions[d].length ==setNameListLength){
                switch(d){
                    case me.logicState.NOT:
                        expression=  "the intersection that does not intersect with any selected set";
                        break;
                    case me.logicState.DONTCARE:
                        expression =  "all intersections of all selected sets";
                        break;
                    case me.logicState.MUST:
                        expression = "the intersection of all selected sets";
                        break;
                    default : break;
                }
            }
        })

        if (expression.length<1){
            expression = "intersections of  ";

            var but = "";
            if (collectExpressions[me.logicState.MUST]!=null){
                expression += "set"+((collectExpressions[me.logicState.MUST].length>1)?"s ":" ")
                expression += collectExpressions[me.logicState.MUST].map(function(d){return "["+d+"]"}).join(" and ")
                but=" but "
            }
            if (collectExpressions[me.logicState.NOT]!=null){
                expression += but+"excluding "+ "set"+((collectExpressions[me.logicState.NOT].length>1)?"s ":" ");
                expression += collectExpressions[me.logicState.NOT].map(function(d){return "["+d+"]"}).join(" and ")
            }


        }


//            console.log(collectExpressions);

        return expression;


    }



    function changeStateAll(actualOrClause, state) {
        var actualClause = logicExpression.orClauses[actualOrClause]
        Object.keys(actualClause).forEach(function(d){
           actualClause[d]= {state:state};
        })

        //console.log("here");
        panel.selectAll(".logicPanelRow").filter(function(d,i){return (i==actualOrClause)})
            .each(function(d){
                renderSelectorTable(this, true, false, actualOrClause);
            })
    }


//    function createLineWrapperField(d3Node){
//        d3Node.html(
//                '<g requiredFeatures="http://www.w3.org/Graphics/SVG/feature/1.2/#TextFlow"> \
//                    <textArea width="200" height="auto" class="logicPanelActualText"> \
//                    Text goes here \
//                    </textArea>\
//                </g>\
//                <foreignObject width="200" height="200" class="logicPanelActualText"\
//                requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">\
//                    <p xmlns="http://www.w3.org/1999/xhtml">Text goes here</p>\
//                </foreignObject>'
//        )
//
//
//
//
//    }

    function wrap(text, width) {

        text.each(function() {
            var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");

            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }


    function renderSelectorTable(node, isExpanded, animated, rowIndex) {
        //console.log("textexprssion",getTextDescription(actualOrClause));

//        logicPanelSelectionTable
//        logicPanelSelectionHeader
//

        var nodeSelector = d3.select(node);
        var noOfSets = Object.keys(node.__data__).length

//        console.log(node.__data__);
        var panelTableHeader = nodeSelector.select(".logicPanelSelectionHeader");
        panelTableHeader.attr({
            "transform":"translate("+90+","+0+")"
        })
        panelTableHeader.on({
            click:function(d) {selectRow(rowIndex);}
        })
        var infoBarGroup = panelTableHeader.selectAll(".logicPanelHeaderBarGroup").data(function(){
            var countRation =0;
            var count =0;
            getSubsetsForMaskList(subsets,[logicExpression.getListOfValues()[rowIndex]], function(d){
//                console.log(d);
                countRation+= d.dataRatio;
                count+= d.items.length;
            })

        //    console.log(countRation,logicExpression.getListOfValues()[rowIndex] );
            return [{countRatio:countRation,count:count}]; ///subsets.length
        })
            infoBarGroup.enter().append("g").attr({
                class:"logicPanelHeaderBarGroup"
            })

        var infoBar =  infoBarGroup.selectAll(".logicPanelHeaderBar").data(function(d){return [d]})

        infoBar.enter().append("rect").attr({
            class:"logicPanelHeaderBar",
            x:function(d){return (ctx.xStartSetSizes);},
            y:2,
            height:cellSize-4
        }).style({
                fill:logicColor
            })

        infoBar.transition().attr({
            width:(function(d){return d.countRatio*ctx.subSetSizeScale.range()[1]})
        })



        infoBarGroup.selectAll(".logicPanelHeaderBarLabel").data(function(d){return [d]}).enter().append("text").attr({
            class:"logicPanelHeaderBarLabel addButton",
            y:(cellSize-4),
            x:function(d){return (ctx.xStartSetSizes) + d.countRatio*ctx.subSetSizeScale.range()[1]+5;}
        })
        .style({
            "text-anchor":"start",
            "dominant-baseline": "auto"
        })
        .text(function(d){return d.count;})

        infoBarGroup.selectAll(".logicPanelHeaderBarLabel").transition().attr({
            x:function(d){return (ctx.xStartSetSizes) + d.countRatio*ctx.subSetSizeScale.range()[1]+5;}
        })
            .text(function(d){return d.count;})



        var headerCircles = panelTableHeader
            .selectAll(".logicPanelHeaderCircle")
            .data(function(d){return Object.keys(d).map(function(dd){
                        return {subsetID:dd, state: d[dd].state}
                    })})
         headerCircles.enter().append("circle").attr({
                class:"logicPanelHeaderCircle",
                cx:function(d,i){return (i*cellWidth)+cellWidth/2}, // TODO: add 90 as params!!
                cy:function(d,i){return cellSize/2},
                r: cellSize/2-3
            })
         headerCircles.style({
//                stroke:grays[1],
                fill:function(d){
                    switch(d.state)
                    {
                        case me.logicState.NOT:
                            return grays[0]
                            break;
                        case me.logicState.MUST:
                            return grays[1]
                            break;
                        default: // me.logicState.DONTCARE
                            return "url(#DontCarePattern)"
                    }},
                stroke:grays[1]//function(){if (isExpanded) return logicColor; else return grays[1];}
            })


    if (isExpanded){
        var textDescriptionPanel = nodeSelector.selectAll(".logicPanelActualText").data(function(d){
            return [me.getTextDescription(actualOrClause)]
        });
        textDescriptionPanel.enter().append("text").attr({
            class:"logicPanelActualText addButton",
            "transform":"translate("+(noOfSets*cellWidth+5+90)+","+0+")",
            y:cellSize,
            dy:1
        }).style({
                "text-anchor":"start",
                "dominant-baseline": "auto"
            });

        textDescriptionPanel.text(function(d){return d}).call(wrap,width-((noOfSets*cellSize+5+90+100)));

        var g= nodeSelector.select(".logicPanelSelectionTable");
        var nodeData = g.node().__data__
        var clausesList = Object.keys(nodeData).map(function(d){
            return {subsetID:d, state:nodeData[d].state}
        })




//        console.log("clist:",clausesList);
        var matrix = Object.keys(me.logicState).map(function(d){
            return {

                state:me.logicState[d],
                selectors:clausesList.map(function(dd){

                    return{
                        state:me.logicState[d],
                        id:dd.subsetID,
                        isSelected:function(){return (me.logicState[d]==dd.state)}
                    }
                })

            }
        })



        var tableRows = g.selectAll(".logicTableRow").data(matrix)

        var trEnter =tableRows.enter().append("g").attr({
            "class":"logicTableRow"
        })
        trEnter.append("text").text(function(d,i){
            switch(d.state)
            {
                case me.logicState.NOT:
                    return "not";
                    break;
                case me.logicState.MUST:
                    return "must";
                    break;
                default: // me.logicState.DONTCARE
                    return "maybe"
            }}).attr({
                x:-4,
                y:cellSize/2,
                class:"addButton"
            }).style({
                    "text-anchor":"end"
            }).on({
                click:function(d){changeStateAll(actualOrClause, d.state)}

            })

        trEnter.each(function(d,i){
            if (i==0)
                    d3.select(this).append("rect").attr({
                        x: 0,
                        y: -3,
                        width: cellSize*(clausesList.length),
                        height: 1

                    })
            })


        tableRows.exit().remove();
        tableRows.attr({
            "transform":function(d,i){return "translate("+(90)+","+
                ((animated)?(0.0*cellSize):((i+1.0)*cellSize +5))
//                ((i+1.0)*cellSize +5)
                +")"}
//            ,opacity:0.0001

        })



        var circles = tableRows.selectAll("circle").data(function(d){return d.selectors})
        circles.enter()
            .append("circle").attr({
            class:"logicPanelCircle",
            cx:function(d,i){return (i+.5)*cellWidth}, // TODO: add 90 as params!!
            cy: .5*cellSize,
//                if (animated) return 0.5*cellSize;
//                else return (i+1.5)*cellSize +5},
            r: cellSize/2-2
        })

         circles.style({
                fill:function(d){
                    switch(d.state)
                    {
                        case me.logicState.NOT:
                            return grays[0]
                            break;
                        case me.logicState.MUST:
                            return grays[1]
                            break;
                        default: // me.logicState.DONTCARE
                            return "url(#DontCarePattern)"
                    }},
                stroke:function(d){
                    if (d.isSelected()) return logicColor;
                    else return grays[1];
                }

         })  .on({
                 "click":function(d){changeState(actualOrClause, d.id, d.state)}
             })


           if (animated){
               tableRows.transition().attr({
                   "transform":function(d,i){return "translate("+(90)+","+
                       ((i+1.0)*cellSize +5)
                       +")"}
               })
           }


//          .style({
//                "stroke-width":2,
//                fill:"red"
//            })

//        columns.transition().delay(50).attr({
//            opacity:1
//        })


        }else{
            d3.select(node).select(".logicPanelSelectionTable").selectAll(".logicTableRow").remove();
            d3.select(node).select(".logicPanelActualText").remove();
        }

    }

    function submitExpression() {
        logicExpression.groupName = actualGroupLabel;

        stateObject.logicGroups.push(logicExpression);
        stateObject.logicGroupChanged=true;
        stateObject.forceUpdate= true;
        if (callAfterSubmit!=null)
            callAfterSubmit.forEach(function(d){
                d();
            })

       // console.log(logicExpression);
//        console.log(logicExpression.getListOfValues())
        destroyPanel();
    }

    function changeGroupLabel() {
//        console.log("enter");
        var label = prompt("Group label:",actualGroupLabel);
        if (label !=null){
            actualGroupLabel = label
            panel.select("#fakeGroup").select(".groupLabel").text(actualGroupLabel);
        }

    }

    var renderActualPanel= function(){
        cellSize = ctx.cellDistance

        defineDontCarePattern(panel,cellSize,grays);

        if (isNewPanel){
            var fakeGroup = panel.append("g").attr({id:"fakeGroup"})
            fakeGroup.append("rect").attr({
                x:0,
                y:0,
                width:width,
                height:cellSize,
                class:"groupBackGround"
            })
            var labelText = fakeGroup.append("text")
            labelText.append("tspan").attr({
                x:12,
                y:cellSize-3,
                class:"groupLabel"
            }).text(actualGroupLabel)


            fakeGroup.append("text").text("\uf057").attr({
                id:"logicPanelCancelText",
                class:"groupDeleteIcon",
                "transform": "translate(" + (ctx.xStartSetSizes +ctx.leftOffset- 12) + "," + (ctx.cellSize / 2 + 4) + ")" //TODO: needs context
            }).style({
                  "fill": "#f46d43"
                })
                .on({
                    "click":function(){destroyPanel();}
                })

            labelText.append("tspan").text(" \uf040").attr({
                id:"logicPanelLabelChangeText",
                class:"logicButton filter-button"
            }).style({
                    "font-size":"9pt",
                    "dominant-baseline":"auto"
                })
                .on({
                    "click":function(){changeGroupLabel();}
                })
        }


        // calculate y positions
        var yCummulate =cellSize;
        var yOffsets = logicExpression.orClauses.map(function(d,i){
                var returnValue = yCummulate;
                yCummulate+=(i==actualOrClause)?uncollapseHeight:collapseHeight;
                return returnValue;
        })

        var logicPanelRows = panel.selectAll(".logicPanelRow").data(logicExpression.orClauses)

        // the newly appended row is allways uncollapsed !!
        var logicPanelRowEnter = logicPanelRows.enter().append("g").attr({
            class:"logicPanelRow",
            "transform":function(d,i){
                return "translate("+0+","+yOffsets[i]+")"
            }
        }).style("opacity",0.000001)

        // add row buttons
        logicPanelRowEnter.append("text").text("V")
            .attr("class","logicButton logicPanelSelect ")
            .style("text-anchor","start")
            .on("click", function(d,i){selectRow(i)});
        logicPanelRowEnter.append("text").text("\uf057")
            .attr("class","logicButton logicPanelRemove")
            .style("text-anchor","start")
            .on("click", function(d,i){removeRow(i)});







        logicPanelRowEnter.append("rect").attr({
            class:"logicPanelRect",
            width:width,
            height:function(d,i){
                return uncollapseHeight
            }
            }).style({
                fill:"none",
                stroke:"lightgray"
            })
        logicPanelRowEnter.append("g").attr("class","logicPanelSelectionTable")
        logicPanelRowEnter.append("g").attr("class","logicPanelSelectionHeader")


        logicPanelRows.exit().remove();

        logicPanelRows.transition().attr({
            "transform":function(d,i){
                return "translate("+0+","+(yOffsets[i])+")"
            },
            height:function(d,i){
                return (i==actualOrClause)?uncollapseHeight:collapseHeight
            }
        }).style("opacity",1);

        logicPanelRows.select(".logicPanelSelect").transition().attr({
            x:10,
            y: function(d,i){
//                if (actualOrClause==i) return uncollapseHeight/2;
//                else
                    return collapseHeight/2;
            }
        }).text(function(d,i){
                if (actualOrClause==i) return "^";
                else return "";
            })

        logicPanelRows.select(".logicPanelRemove").transition().attr({
            x:ctx.leftOffset-14,
            y: function(d,i){
//                if (actualOrClause==i) return uncollapseHeight/2;
//                else
                    return collapseHeight/2;
            }
        })

        logicPanelRows.select(".logicPanelRect").transition().attr({
                height:function(d,i){
                    return (i==actualOrClause)?uncollapseHeight:collapseHeight}
        })


        logicPanelRows.each(function(d,i){
            renderSelectorTable(this, i==actualOrClause, true, i);
        })


        var endOfPanel = yCummulate+10
        if (isNewPanel){
            var buttonGroup =  panel.append("g").attr({
                id:"logicPanelButtons"
            }).attr({
                    "transform":"translate("+0+","+endOfPanel+")"
                })

            buttonGroup.append("text").text("\uf067").attr({
                id:"logicPanelAddText",
                class:"logicButton",
                x:25
//                "transform":"translate("+0+","+endOfPanel+")"
            }).style({
//                    "text-anchor":"start"
                })
                .on({
                    "click":function(){addOrClause();}
                })

            buttonGroup.append("text").text("\uf00c").attr({
                id:"logicPanelSubmitText",
                class:"logicButton",
                x:70
//                "transform":"translate("+35+","+endOfPanel+")"
            }).style({
                   "fill":logicColor
                })
                .on({
                    "click":function(){submitExpression();}
                })



        }else{
            panel.select("#logicPanelButtons").transition().attr({
                "transform":"translate("+0+","+endOfPanel+")"
            })
        }

        isNewPanel=false;




//
//        // add uncollapsed panel
//        panel.append("rect").attr({
//            class:"menuPlaceholder menuPlaceholderRect",
//            width:width,
//            height:uncollapseHeight
//        })
//            .style({
//                fill:"none",
//                stroke: grays[1]
//            })
//
        belowVis.transition().attr({
            "transform":"translate("+params.leftAlignment+","+(endOfPanel+15)+")"
        })

//        belowVis.transition().attr({
//            "y":+(endOfPanel+belowVisRestoreTranslate+15)
//        })






    }

    var destroyPanel = function(){
        panel.selectAll(".logicPanelRow").remove();
        panel.select("#logicPanelButtons").remove();
        panel.select("#fakeGroup").remove();


        belowVis.transition().attr({
            "transform":"translate("+params.leftAlignment+","+0+")"
        })
//        belowVis.transition().attr({
//            "y":belowVisRestoreTranslate
//        })
        addLogicButton.attr({
            "opacity":1
        })
        initLogicExpression();
    }


    init();


}
/**
 * Created by hen on 3/18/14.
 */

function BrushableScale(ctx, svg, width, updateFunctionNameInCtx, redrawFunctionNameInCtx, scaleNameInCtx, params){



//    var svg = d3.select("#vis").append("svg").attr({
//        width:800,
//        height:800
//    })

    var offsetX=0,
        offsetY=0;

    var distanceBetweenAxis = 25; // distance between two scales
    var distanceBetweenUpperAndLower = 20 // should be fix !!
//        height=20;


    var width = width;

    var xScale = d3.scale.pow().exponent(2).domain([1,width]).range([0, width])
    var xOverViewAxisUpper = d3.svg.axis().scale(xScale);
    var xOverViewAxisLower = d3.svg.axis().scale(xScale).orient("top").tickFormat(function(d){return ""});


    var xDetailScale = d3.scale.linear().domain([0,width]).range([0,width]).clamp(true)
    var xDetailAxisUpper = d3.svg.axis().scale(xDetailScale).ticks(5);
    var xDetailAxisLower = d3.svg.axis().scale(xDetailScale).orient("top").tickFormat(function(d){return ""}).ticks(5);

    var param = param

    var columnLabel ="ABC";

    var maxValue = 100;

    var labels=[
        {name: "largest intersection",id:"I", value:100 },
        {name: "largest group",id:"G", value:200 },
        {name: "largest set",id:"S", value:300 },
        {name: "all items",id:"A", value:400 }
    ]


    var actionsTriggeredByLabelClick=params.actionsTrioggeredByLabelClick;


    var connectionAreaData =[
        [0,-distanceBetweenAxis],
        [100,-distanceBetweenAxis],
        [width,0]
    ]


    // add axis
    svg.append("g").attr({
        "class":"x overviewAxisUpper axis",
        "transform":"translate("+offsetX+","+offsetY+")"
    }).call(xOverViewAxisUpper)


    svg.append("g").attr({
        "class":"x overviewAxisLower axis",
        "transform":"translate("+offsetX+","+(offsetY+distanceBetweenUpperAndLower)+")"
    }).call(xOverViewAxisLower)

    svg.append("g").attr({
        "class":"x detailAxisUpper axis",
        "transform":"translate("+offsetX+","+(offsetY+distanceBetweenAxis+distanceBetweenUpperAndLower)+")"
    }).call(xDetailAxisUpper)

    svg.append("g").attr({
        "class":"x detailAxisLower axis",
        "transform":"translate("+offsetX+","+(offsetY+distanceBetweenAxis+2*distanceBetweenUpperAndLower)+")"
    }).call(xDetailAxisLower)

//    svg.append("path").attr({
//        class:"connectionArea",
//        "transform":"translate("+offsetX+","+offsetY+")"
//    })


    var sliders;
    var overViewBrushDef;
    var overviewBrush;
    var redrawFunction = ctx[redrawFunctionNameInCtx];


    // brushed function
    var brushed = function(){
        var endRange = overViewBrushDef.extent()[1];
        if (endRange<5){
            endRange =5;
            overViewBrushDef.extent([0,5]);

        }


        svg.select(".drawBrush").attr({
            width:xScale(endRange)
        });

        xDetailScale.domain([0,endRange]);
        xDetailAxisUpper.scale(xDetailScale);
        xDetailAxisLower.scale(xDetailScale);

        svg.selectAll(".detailAxisUpper").call(xDetailAxisUpper);
        svg.selectAll(".detailAxisLower").call(xDetailAxisLower);

        connectionAreaData[1][0]= xScale(endRange);
        updateConnectionArea()
        if (redrawFunction!=null) redrawFunction();
        ctx[scaleNameInCtx] = xDetailScale;
    };

    var setBrush= function(size){
//        var sizeB =xScale(size);
        overViewBrushDef.extent([0,size]);
//        overviewBrush.select(".e").attr({
//            "transform":"translate("+xScale(size)+","+0+")"
//        })
        overviewBrush.call(overViewBrushDef)
        brushed();
    }


    function updateColumnLabel() {
        svg.select(".columnLabelGroup").select("rect").attr({
            width:width
        })

        svg.select(".columnLabelGroup").select("text").attr({
            x:width/2
        })

    }

    var update = function(params){

        if (params.maxValue !=null) maxValue= params.maxValue;
        if (params.labels !=null) labels = params.labels;
        if (params.width != null) width = params.width;

        updateScales();
        updateSliderLabels();
        updateColumnLabel();
    }

    function init(){
        if (params.columnLabel != null) columnLabel = params.columnLabel;

        // define slider
        overViewBrushDef = d3.svg.brush()
            .x(xScale)
            .extent([0, 100])
            .on("brush", brushed)
            .on("brushstart", function(){
                svg.selectAll(".columnLabelGroup").transition().duration(100).style({
                    opacity:0
                })
                svg.selectAll(".connectionArea").transition().duration(100).style({
                    opacity:.2
                })

            })
            .on("brushend", function(){
                svg.selectAll(".columnLabelGroup").transition().duration(500).style({
                    opacity:1
                })
                svg.selectAll(".connectionArea").transition().duration(500).style({
                    opacity:.00001
                })
            });

        sliders = svg.append("g").attr({
            class: "sliderGroup",
            "transform": "translate(" + offsetX + "," + (offsetY) + ")"
        });

        sliders.append("path").attr({
            class:"connectionArea"
        }).style({
                opacity:.00001
            })

        var labelHeight = 20;

        var columnLabelGroup = svg.append("g").attr({
            class:"columnLabelGroup",
            "transform":"translate("+(0)+","+(distanceBetweenUpperAndLower+(distanceBetweenAxis-labelHeight)/2)+")" //Math.floor
        })

        columnLabelGroup.append("rect").attr({
            class:"labelBackground",
            x:0,
            y:0,
            width:width,
            height:labelHeight// TODO magic number
        }).on({
                "click": function(){ actionsTriggeredByLabelClick.forEach(function(d){d();})}
            })

        columnLabelGroup.append("text").attr({
            class:"columnLabel",
            "pointer-events":"none",
            x:width/2,
            y:labelHeight/2
        })
//            .style({
//                "font-size":"1em"
//            })
            .text(columnLabel);


        sliders.append("rect").attr({
            class:"drawBrush",
            x:0,
            y:0,
            height:distanceBetweenUpperAndLower,
            width:overViewBrushDef.extent()[1]
        })

        overviewBrush = sliders.append("g").attr({
            class:"slider"
        }).call(overViewBrushDef)

        overviewBrush.selectAll(".w, .extent,  .background").remove();

        overviewBrush.selectAll("rect").attr({
            height:50,
            width:20
        })
        overviewBrush.selectAll(".e")
            .append("rect")
            .attr({
                "class":"handle"
            })
        overviewBrush.selectAll("rect").attr({
            transform:"translate(0,"+(distanceBetweenUpperAndLower/2)+")rotate(45)",
            x:-5,
            y:-5,
            height:10,
            width:10
        })

        sliders.append("g").attr({
            class:"labels"
        })

    }

    function updateScales(){

        var brushedValue = d3.min([overViewBrushDef.extent()[1], maxValue]);
        var optimalExponent = getOptimalExponent(maxValue,width);
        xScale.domain([0,maxValue]).range([0, width]).exponent(optimalExponent);

        // Heavy label stuff
        var formatFunction = null;
        var tickValues = xScale.ticks(10);
        tickValues.push(maxValue);
        var tickValuesReverse = tickValues.reverse();
        var drawLabels = {};

        var numberWidth = 6/2;// TODO magic Number 6
        var maxSpace = width-maxValue.toString(10).length* numberWidth;

        drawLabels[maxValue]=true;
        tickValuesReverse.forEach(function(label){

            if (xScale(label)+label.toString(10).length*numberWidth<maxSpace){
                maxSpace = xScale(label)-label.toString(10).length*numberWidth;
                drawLabels[label] = true;
            }
        })

        formatFunction = function(d,i){return (d in drawLabels)?d:"";}
        // kill last regular tick if too close to maxValue
//        if (xScale(tickValuesReverse[0])<  width-maxValue.toString(10).length* numberWidth){
//            tickValues.slice()
//        }




//        if (optimalExponent>.8){
//            tickValues = xScale.ticks(6);
//            formatFunction = function(d,i){return d;}
//             //[0,Math.floor(maxValue/3),Math.floor(maxValue*2/3),maxValue]
//        }else{
//            tickValues = xScale.ticks(8);
//            formatFunction = function(d,i){return (i%2==0 || i<4 || i==(tickValues.length-1))?d:"";}
//        }
//        tickValues.pop();
        tickValues.push(maxValue);


        xOverViewAxisUpper.scale(xScale).tickValues(tickValues).tickFormat(formatFunction);
        xOverViewAxisLower.scale(xScale).tickValues(tickValues);

        xDetailScale.range([0,width])
        xDetailAxisUpper.scale(xDetailScale);
        xDetailAxisLower.scale(xDetailScale);
        connectionAreaData[2] =  [width,0];

        svg.select(".x.overviewAxisUpper.axis").call(xOverViewAxisUpper)
        svg.select(".x.overviewAxisLower.axis").call(xOverViewAxisLower)
        svg.select(".x.detailAxisUpper.axis").call(xDetailAxisUpper)
        svg.select(".x.detailAxisLower.axis").call(xDetailAxisLower)

        // do NOT redraw !
        overViewBrushDef.x(xScale)
        var saveRedraw = redrawFunction;
        redrawFunction = null;
        setBrush(brushedValue);
        redrawFunction = saveRedraw;

    }

    function updateSliderLabels(){


        // slider labels
        var sliderLabels = sliders.select(".labels").selectAll(".sliderLabel").data(labels, function(d){return d.name})
        sliderLabels.exit().remove();
        var sliderLabelsEnter = sliderLabels.enter().append("g").attr({
            class:"sliderLabel"
        });

        sliderLabelsEnter.append("rect").attr({
            x:-5,
            y:0,
            width:10,
            height:15
        })

            .append("svg:title").text( function(d){return d.name})

        sliderLabelsEnter.append("line").attr({
            x1:0,
            x2:0,
            y1:15,
            y2:20
        })
        sliderLabelsEnter.append("text").text(function(d){return d.id}).attr({
            dy:"1em",
            "pointer-events":"none"
        })

        sliderLabels.attr({
            "transform":function(d){return "translate("+xScale(d.value)+","+(-20)+")"}
        }).on({
                "click":function(d){setBrush(d.value);}
            })

    }


    function getOptimalExponent(maxValue, width){

        if (maxValue<=width) return 1;
        else{
            // ensure that value 5 has at least 5 pixel
            var deltaValue = 5;
            var deltaPixel = 5;


            var optimalExponent = Math.log(deltaPixel/width)/Math.log(deltaValue/maxValue);

            return optimalExponent;

        }




    }


    function updateConnectionArea(){
        var cAreaNode = svg.selectAll(".connectionArea").data([connectionAreaData])
        cAreaNode.exit().remove();
        cAreaNode.enter().append("path")
            .attr({
                class:"connectionArea",
                 "transform":"translate("+offsetX+","+(offsetY+distanceBetweenUpperAndLower+distanceBetweenAxis)+")"

            })
        cAreaNode.attr({
            "transform":"translate("+offsetX+","+(offsetY+distanceBetweenUpperAndLower+distanceBetweenAxis)+")",
            d:d3.svg.area()
        })

    }


    init();

    updateSliderLabels();
    updateConnectionArea();
//    updateScales();

    ctx[updateFunctionNameInCtx]=function(d,params){update(params);};

}
/**
 * Created by hen on 3/24/14.
 */


function StatisticGraphs(){
    this.statistics = {};

    this.scale = d3.scale.linear().domain([0,1]).rangeRound([0,1]);
    this.axis = d3.svg.axis().scale(this.scale).orient("top");


    // expects a list of data containing key and value attributes
    // creates an internal map with statistics



}

StatisticGraphs.prototype.updateStatistics= function(subsetData, subsetIDselector, itemIDselector, itemData, attributeIDSelector,attributeValueSelector, attributeID ){

    var min = undefined;
    var max = undefined;

    var collector= {}

    subsetData.forEach(function(subset){

        var attributeColumn = {}
        itemData.forEach(function(d){
            if (d[attributeIDSelector]== attributeID) attributeColumn =d[attributeValueSelector];
        })

//        console.log("attr",attributeColumn);

        var itemIDSelectors = itemIDselector.split(".")

        var actualSubset = subset;
        itemIDSelectors.forEach((function(selector){
            actualSubset = actualSubset[selector];
        }))
//        console.log(actualSubset);

        var itemList = actualSubset.map(function(itemID){
            return +attributeColumn[itemID]
        })

//        console.log(itemList);

        var summaryStatistics ={
            min:0,
            max:0,
            median:0,
            lowerQuartile:0,
            upperQuartile:0

        }
        itemList.sort(d3.ascending);


        if (itemList.length!=0){
            var extent = d3.extent(itemList)
            summaryStatistics.min = extent[0];
            summaryStatistics.max = extent[1];

            summaryStatistics.median =d3.median(itemList);
            summaryStatistics.lowerQuartile =d3.quantile(itemList,0.25);
            summaryStatistics.upperQuartile =d3.quantile(itemList, 0.75);
            //.. see D3

            summaryStatistics.numberElements = itemList.length;


            if (min==undefined || min>summaryStatistics.min){
                min = summaryStatistics.min;
            }
            if (max==undefined || max<summaryStatistics.max){
                max = summaryStatistics.max;
            }


        }




        collector[subset[subsetIDselector]] = summaryStatistics;

    })

    this.statistics=collector;
    this.scale.domain([min,max]);
    this.axis.scale(this.scale)

}

StatisticGraphs.prototype.renderAxis = function(g,x,y,w){

    this.scale.rangeRound([0,w]);
    this.axis.scale(this.scale).ticks(Math.ceil(w/50)); //Math.ceil(w/50)

    var detailStatAxisVis = g.selectAll(".axis").data(["summary"])
    detailStatAxisVis.enter().append("g").attr({
        class:"axis",
        "transform":"translate("+x+","+y+")"
    }).call(this.axis)

    detailStatAxisVis.exit().remove();
    detailStatAxisVis.transition().call(this.axis);

}


StatisticGraphs.prototype.renderBoxPlot = function(id, g, x,y,w,h,classID){
    var actualStat = this.statistics[id];
    var diffY=2;


    if (actualStat!=null){
        var dS = g.selectAll("."+classID).data([actualStat])
        dS.exit().remove();


        var dSEnter = dS.enter().append("g").attr({
            class:""+classID
        })
        dSEnter.append("line").attr({
            class:"boxPlot centralLine"
        })
        dSEnter.append("line").attr({
            class:"boxPlot minLine"
        })
        dSEnter.append("line").attr({
            class:"boxPlot maxLine"
        })
        dSEnter.append("rect").attr({
            class:"boxPlot quartile"
        }).append("title").text(function(d){return "|"+ d.min+" --["+ d.lowerQuartile+" |"+ d.median+"| "+ d.upperQuartile+"]-- "+ d.max+"|"})

        dSEnter.append("line").attr({
            class:"boxPlot medianLine"
        })


        var localScale = this.scale

        dS.select("rect").transition().attr({
            x:function(d){
                return x+localScale(d.lowerQuartile)
            },
            y:(y+diffY),
            width:function(d){
                return localScale(d.upperQuartile)-localScale(d.lowerQuartile);
            },
            height:(h-(2*diffY))
        }).attr({
                opacity:function(d){return (d.numberElements>4)?1:0.0001}
            })

        dS.select(".boxPlot.centralLine").transition().attr({
            x1:function(d){return x+localScale(d.min)},
            x2:function(d){return x+localScale(d.max)},
            y1:(y+h/2),
            y2:(y+h/2)
        })

        dS.select(".boxPlot.minLine").transition().attr({
            x1:function(d){return x+localScale(d.min)},
            x2:function(d){return x+localScale(d.min)},
            y1:(y+diffY),
            y2:(y+h-diffY)
        })

        dS.select(".boxPlot.maxLine").transition().attr({
            x1:function(d){return x+localScale(d.max)},
            x2:function(d){return x+localScale(d.max)},
            y1:(y+diffY),
            y2:(y+h-diffY)
        })

        dS.select(".boxPlot.medianLine").transition().attr({
            x1:function(d){return x+localScale(d.median)},
            x2:function(d){return x+localScale(d.median)},
            y1:y,
            y2:y+h
        }).attr({
                opacity:function(d){return (d.numberElements==3 || d.numberElements >4)?1:0}
            })



    }else{
        var nullVis =  g.selectAll(".detailStatistics").data("null")
        nullVis.exit().remove();
        nullVis.enter().append("g").attr({
            class:"detailStatistics"
        }).append("line").attr({
                x1:x+1,
                x2:x+w-1,
                y1:y+h/2,
                y2:y+h/2
            })

        nullVis.select("line").attr({
            x1:x+1,
            x2:x+w-1,
            y1:y+h/2,
            y2:y+h/2
        })



    }




}

window.StatisticGraphs = StatisticGraphs;
/**
 * Created by alex,nils,romain,hen
 */


var ctx = {
    majorPadding: 25,
    minorPadding: 2,
    cellDistance: 20,
    textHeight: 90,
    textSpacing: 3,

    setSizeWidth: 700,
    subSetSizeWidth: 200,
    subSetSizeWidthMax: 200,

    leftOffset: 90,
    leftIndent: 10,
    topOffset: 120,

    /** The width from the start of the set vis to the right edge */

    cellSizeShrink: 3,
    maxLevels: 3,

    expectedValueWidth: 150,
    expectedValueWidthMax: 150,

    labelTopPadding: 20+22,

    paddingTop: 30,
    paddingSide: 20,



    truncateAfter: 20,
    truncateGroupAfter: 30,

    setCellDistance: 12,
    setCellSize: 10,
    cellWidth: 20,

//         tableBodyHeight;
//         h;
//         rowScale;

    svgHeight: 600, //height || 600;

    grays: [ '#f0f0f0', '#636363'],

    backHighlightColor: '#fed9a6',//'#fdbf6f'
    rowTransitions: true,
    barTransitions: true,

    globalStatistics: [
        {name: "largest intersection", id: "I", value: 100 },
        {name: "largest aggregate", id: "A", value: 200 },
        {name: "largest set", id: "S", value: 300 },
        {name: "universal set", id: "U", value: 400 }
    ],

    nameForRelevance:"Disproportionality",

    summaryStatisticVis : [{
        attribute:"",
        visObject:{}
    }],// list of all statistic graphs TODO: make dynamic !!!
    summaryStatisticsWidth:100,


    // GROUPING OPTIONS
    groupingOptions : {},

    setSelection: {
        paginationStart:0,
        paginationEnd:10,
        mode:"none", // special modes are: "multiSel", "sortFilter"
        modeChange: false,// only true if mode changed and re-rendering
        multiSelIn:d3.set(),
        multiSelOut:d3.set(),
        setOrder: 'size' // options: size or name
    },

    logicStates: {
        NOT:0,
        DONTCARE:2,
        MUST:1
    }


};

//bindEvents();

function plot() {
    ctx.plot();
}

function UpSet(datasets) {

    // FAKE:
//    var usedSets = ["xx","zzz"];

    bindEvents();

    function setDynamicVisVariables() {

        ctx.tableBodyHeight = renderRows.length * (ctx.cellDistance+4);
//        ctx.h = ctx.tableBodyHeight + ctx.textHeight;

        ctx.rowScale = d3.scale.ordinal().rangeRoundBands([ 0, ctx.tableBodyHeight], 0, 0);
        ctx.rowScale.domain(renderRows.map(function (d) {
            return d.id;
        }));


        // dynamic context variables
        ctx.cellSize = ctx.cellDistance; // - minorPadding,

        ctx.xStartSetSizes = ctx.cellWidth * usedSets.length + ctx.majorPadding;



        ctx.xStartExpectedValues = ctx.xStartSetSizes + ctx.subSetSizeWidth + ctx.majorPadding;

        ctx.setVisWidth = ctx.expectedValueWidth + ctx.subSetSizeWidth
            + ctx.majorPadding + ctx.cellDistance + ctx.xStartSetSizes+ctx.summaryStatisticVis.length*(ctx.summaryStatisticsWidth+ctx.majorPadding);// TODO HACK !!!

        ctx.w = ctx.cellWidth * usedSets.length + ctx.majorPadding + ctx.leftOffset
            + ctx.subSetSizeWidth + ctx.expectedValueWidth + 50 +ctx.summaryStatisticVis.length*(ctx.summaryStatisticsWidth+ctx.majorPadding);
        ctx.setMatrixHeight = ctx.setCellDistance + ctx.majorPadding;

        ctx.svgHeight = /*renderRows.length * ctx.cellSize*/ctx.rowScale.rangeExtent()[1];// TODO: Duplicate to ctx.tableBodyHeight

        ctx.intersectionClicked = function (d) {
            var selection = Selection.fromSubset(d.data);
            selections.addSelection(selection, false);
            selections.setActive(selection);
        }


        ctx.xStartStatisticColumns = ctx.xStartExpectedValues+ ctx.expectedValueWidth+ctx.majorPadding // TODO: HACK!!!


        ctx.horizonBarGrays = d3.scale.linear().domain([0,1,2]).range(["#bdbdbd","#888888","#252525" ])

    }

    function calculateGlobalStatistics() {
        var collector = {allItems: 1};
        dataRows.forEach(function (d) {

            var setSize = d.setSize;
            var type = d.type;

            var maxValue = collector[ type];
            if (maxValue == null) {
                collector[type] = setSize;
            }
            else if (maxValue < setSize) {
                collector[type] = setSize;
            }
//            console.log(d.type);
//            if (d.type === ROW_TYPE.SUBSET) {
//                console.log("iS Before", collector.allItems);
//                collector.allItems += setSize;
//                console.log("iS", collector.allItems);
//            }

        })

//        d3.max(usedSets, function(d){})

//    console.log(usedSets);

//        {name: "largest intersection",id:"I", value:100 },
//        {name: "largest group",id:"G", value:200 },
//        {name: "largest set",id:"S", value:300 },
//        {name: "all items",id:"A", value:400 }

        ctx.globalStatistics.forEach(function (d) {
            switch (d.id) {
                case "I":
                    d.value = collector[ROW_TYPE.SUBSET];
                    break;
                case "A":
                    d.value = collector[ROW_TYPE.GROUP];
                    break;
                case "U":
                    d.value = allItems.length;
                    break;
                case "S":
                    d.value = d3.max(usedSets, function (d) {
                        return d.items.length
                    })
                    break;
                default:
                    break;
            }

        })

    }

    // All global variables and SVG elements
    function init() {

        setDynamicVisVariables();

        // create SVG and VIS Element
        d3.select('#bodyVis').select('svg').remove();
        ctx.svgBody = d3.select('#bodyVis')
//            .style('width', ctx.w + "px")
            .append('svg')
            .attr('width', ctx.w)
            .attr('height', renderRows.length * ctx.cellDistance);

//        ctx.vis = ctx.svgBody.append("g").attr({
//            class: "svgRows",
//            "transform": "translate(" + ctx.leftOffset + "," + ctx.topOffset + ")"
//        });

        // -- the background highlights
        ctx.columnBackgroundNode = ctx.svgBody.append("g").attr({
            class: "columnBackgroundsGroup"

        }).attr({
           "transform":"translate("+ctx.leftOffset+","+0+")"
        })

        // Rows container for vertical panning
        ctx.gRows = ctx.svgBody
            .append('g')
            .attr({
                'class': 'gRows',
                "transform":"translate("+ctx.leftOffset+","+0+")"
            })

        // tooltips on top !
        ctx.toolTipLayer = ctx.svgBody.append("g").attr({class:"toolTipLayer"});



        d3.select("#headerVis").select("svg").remove();
        ctx.svgHeader = d3.select("#headerVis").append('svg')
            .attr('width', ctx.w)
            .attr('height', 65+ctx.textHeight);
//            .style({
//                "top":"",
//                "position":"relative"
//            });


        //####################### LogicPanel ##################################################

        ctx.logicPanelNode = ctx.svgBody.append("g").attr({
            class: "logicPanel",
            "transform": "translate(" + 0 + "," + 0 + ")"
        })

        // TODO: give only context
        ctx.logicPanel = new LogicPanel(
            {width: ctx.setVisWidth + ctx.leftOffset,
                visElement: ctx.svgHeader,
                panelElement: ctx.logicPanelNode,
                cellSize: ctx.cellSize,
                usedSets: usedSets,
                grays: ctx.grays,
                belowVis: ctx.gRows,
                buttonX: 0,
                buttonY: ctx.svgHeader.attr("height")-20,
                stateObject: UpSetState,
                subsets: subSets,
                callAfterSubmit: [updateState, updateStatistics, rowTransition],
                leftAlignment:ctx.leftOffset,
                ctx: ctx,
                cellWidth: ctx.cellWidth

            });
//            {
//                ctx:ctx
//            }
//        );




        ctx.tableHeaderNode = ctx.svgHeader.append("g").attr({
            class: "tableHeader",
            "transform":"translate("+ctx.leftOffset+","+(ctx.svgHeader.attr("height")-ctx.textHeight)+")"
        })

//        ctx.tableHeaderNode.append("g")

//        ctx.vis.append
//        ctx.brushedScale = new BrushableScale(ctx,)

        // For horizon subset size
        ctx.svgBody.append('defs')
            .append('pattern')
            .attr('id', 'diagonalHatch_0')
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 8)
            .attr('height', 8)
            .append('path')
            .attr('d', 'M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4')
            .attr('stroke', "blue")
            .attr('stroke-width', 1);




//        ctx.summaryStatisticVis[0].attribute = attributes.filter(function(d){
//            return d.type=="integer" || d.type=="float"
//        })[0].name
//        ctx.summaryStatisticVis[0].visObject = new StatisticGraphs();

//        updateStatistics();

        dataSetChanged();

        updateSetsLabels(ctx.tableHeaderNode);

        updateHeaders();

        plotSubSets();

        initCallback = [dataSetChanged] //TODO: bad hack !!!

        updateFrames($(window).height(), null);

        updateFrames(null,$(".ui-layout-center").width());

//        updateWidthHandle()
    }

//    // update svg size
//    var updateSVG = function (width, height) {
//        ctx.w = width;
//        ctx.svgHeight = height;
//
//        ctx.svg
//            .attr('width', ctx.w)
//            .attr('height', ctx.svgHeight)
//
//    }


    function dataSetChanged(){
//        ctx.summaryStatisticVis[0].attribute = attributes.filter(function(d){
//            return d.type=="integer" || d.type=="float"
//        })[0].name

        ctx.summaryStatisticVis=[];
        attributes.filter(function(d){
            return (d.type=="integer" || d.type=="float") && (d.name!="Set Count")
        }).forEach(function(attribute,i){

                ctx.summaryStatisticVis.push({
                    attribute: attribute.name,
                    visObject:new StatisticGraphs()
                })
//                ctx.summaryStatisticVis[i].attribute = name;
            })




        updateStatistics()
        setDynamicVisVariables()

        ctx.svgBody.attr({
            width: (Math.max(ctx.w, 400))
        })

        updateHeaders();
        plotSubSets();

    }

    //####################### SETS ##################################################
    function updateSetsLabels(tableHeaderNode) {

        var setRowScale = d3.scale.ordinal().rangeRoundBands([0, usedSets.length * (ctx.cellWidth)], 0);
        setRowScale.domain(usedSets.map(function (d) {
            return d.id
        }))

        var setRows = tableHeaderNode.selectAll('.setRow')
            .data(usedSets, function (d) {
                return d.elementName
            })

        var setRowsEnter = setRows.enter()
            .append('g').attr({
                class: "setRow"
            })

        setRows.exit().remove();

        var setRects = setRows.selectAll(".sortBySet.connection.vertical").data(function (d, i) {
            return [d]
        })
        setRects.enter().append("rect").attr({
            class: "sortBySet connection vertical"
        })
        .on('mouseover', mouseoverColumn)
        .on('mouseout', mouseoutColumn)

        setRects.exit().remove();

        setRects.attr({
            transform: function (d, i) {
                return 'skewX(45) translate(' + (- ctx.leftOffset) + ', 0)';
            },
            width: ctx.cellWidth,
            height: ctx.textHeight - 2
        })

        var setRowsText = setRows.selectAll("text").data(function (d) {
            return [d]
        })
        setRowsText.enter().append("text").text(
            function (d) {

              var str = d.elementName.substring(0, ctx.truncateAfter);
              if(str.length<d.elementName.length)
                str = str.trim() + "...";

              return str;
            }).attr({
                class: 'setLabel sortBySet',
                //  "pointer-events": "none",
                id: function (d) {
                    return d.elementName.substring(0, ctx.truncateAfter);
                },
                transform: function (d, i) {
                    return 'translate(0,' + (ctx.textHeight - ctx.textSpacing - 2) + ')rotate(45)';
                },
                'text-anchor': 'end'
            })
            .style({
                'cursor':'s-resize'
            })
            .on('mouseover', mouseoverColumn)
            .on('mouseout', mouseoutColumn)
            .append("svg:title")
            .text(function (d, i) {
                return d.elementName;
            })

        setRowsText.attr({
            class: function () {
                if (ctx.cellWidth > 16) return 'setLabel'; else return 'setLabel small'
            }

        })

        setRows.attr({transform: function (d, i) {

            return 'translate(' + setRowScale(d.id) + ', 0)';
            //  return 'translate(0, ' + ( cellDistance * (i)) + ')';
        },
            class: 'setRow'});


        d3.selectAll('.sortBySet, .setRow .setLabel').on(
            'click',
            function (d) {
                UpSetState.sorting = StateOpt.sortBySetItem;
                UpSetState.grouping = undefined;
                UpSetState.levelTwoGrouping = undefined;
                UpSetState.forceUpdate = true;
                updateState(d);
                rowTransition();
            }).style({
                'cursor':'s-resize'
            });


    }


    function updateStatistics(){
        ctx.summaryStatisticVis.forEach(function(sumStat,i){
            sumStat.visObject.updateStatistics(renderRows, "id", "data.items", attributes,"name","values", sumStat.attribute)
        });
//        ctx.summaryStatisticVis[0].visObject.updateStatistics(subSets, "id", "items", attributes,"name","values", ctx.summaryStatisticVis[0].attribute)
    }



    function addStatisticColumn(){
        var allAttributes = attributes.filter(function(d){
            return d.type=="integer" || d.type=="float"
        })

        allAttributes.unshift(ctx.nameForRelevance);
        // find first not-used


        var delList = allAttributes.map(function(d){return d})

        ctx.summaryStatisticVis.forEach(function(stat){
            delList.remove(stat.attribute);
        })

        //console.log(delList);


    }


    function updateHeaders() {
        setDynamicVisVariables()
        calculateGlobalStatistics();


        // -- Create Table Header:
        var tableHeaderGroup = ctx.tableHeaderNode.selectAll(".tableHeaderGroup").data([1]);
        var tableHeaderGroupEnter = tableHeaderGroup.enter().append("g").attr({class: "tableHeaderGroup"});



        //------------ subSet value header -----------------------

        tableHeaderGroupEnter.append('g').attr()
            .attr({
                id: "subSetSizeAxis",
                class: 'axis',
                "transform":"translate("+0+","+20+")"
            }).each(function () {
                ctx.brushableScaleSubsetUpdate = function () {

                };
                ctx.brushableScaleSubset = new BrushableScale(
                    ctx,
                    d3.select(this),
                    ctx.subSetSizeWidth,
                    "brushableScaleSubsetUpdate", "plotTable", "subSetSizeScale", {columnLabel:"Cardinality",
                        actionsTrioggeredByLabelClick:[function(){
                            UpSetState.sorting = StateOpt.sortBySubSetSize;
                            UpSetState.grouping = undefined;
                            UpSetState.levelTwoGrouping = undefined;
                            UpSetState.forceUpdate = true;
                            $('#noGrouping').prop('checked', true);
                            $('#sortRelevanceMeasure').prop('checked', true);
                            toggleGroupingL2(true);
                            updateState();
                            rowTransition();
                        }]})
            });

        // *** update Part

//        tableHeaderGroup.selectAll("#subSetSizeLabelRect").attr({
//            transform: 'translate(' + ctx.xStartSetSizes + ',' + (ctx.labelTopPadding) + ')',
//            height: '20',
//            width: ctx.subSetSizeWidth
//        });
//
//        tableHeaderGroup.selectAll("#subSetSizeLabelText").attr({
//            transform: 'translate(' + (ctx.xStartSetSizes + ctx.subSetSizeWidth / 2) + ','
//                + (ctx.labelTopPadding + 10) + ')'
//        });

        var maxValue = d3.max(ctx.globalStatistics, function (d) {
            return d.value
        });

        tableHeaderGroup.selectAll("#subSetSizeAxis").transition().attr({
            transform: 'translate(' + ctx.xStartSetSizes + ',' + (ctx.textHeight - 70) + ')' // TODO magic number
        }).call(ctx.brushableScaleSubsetUpdate,
            {
                maxValue: maxValue,
                labels: ctx.globalStatistics

            })


        // ------------ expected value header -----------------------

        // *** init Part
        tableHeaderGroupEnter.append('rect')
            .attr({
                id: "expectedValueLabelRect",
                class: 'labelBackground expectedValueLabel sortRelevanceMeasureGlobal'
            }).on(
            'click',
            function () {
                UpSetState.sorting = StateOpt.sortByExpectedValue;
                UpSetState.grouping = undefined;
                UpSetState.levelTwoGrouping = undefined;
                UpSetState.forceUpdate = true;
                $('#noGrouping').prop('checked', true);
                $('#sortRelevanceMeasure').prop('checked', true);
                toggleGroupingL2(true);
                updateState();
                rowTransition();
            });

        tableHeaderGroupEnter.append('text').text('Deviation')
            .attr({
                id: "expectedValueLabelText",
                class: 'columnLabel sortRelevanceMeasureGlobal',
                "pointer-events": "none"
            });

        tableHeaderGroupEnter.append('g').attr()
            .attr({
                id: "expectedValueAxis",
                class: 'axis'
            });

        // *** update Part
        tableHeaderGroup.selectAll("#expectedValueLabelRect").attr({
            transform: 'translate(' + ctx.xStartExpectedValues + ',' + ( ctx.labelTopPadding) + ')',
            height: '20',
            width: ctx.expectedValueWidth
        });

        tableHeaderGroup.selectAll("#expectedValueLabelText").attr({
            transform: 'translate(' + (ctx.xStartExpectedValues + ctx.expectedValueWidth / 2) + ','
                + ( ctx.labelTopPadding + 10) + ')'
        });

        // scale for the size of the plottingSets
        var minDeviation = d3.min(dataRows, function (d) {
            return d.disproportionality;
        });
        if (minDeviation > 0) {
            minDeviation = 0;
        }
        var maxDeviation = d3.max(dataRows, function (d) {
            return d.disproportionality;
        });

        var bound = d3.max([Math.abs(minDeviation), Math.abs(maxDeviation)]);
        if (bound < 0.1) {
            bound = 0.1;
        }

        ctx.expectedValueScale = d3.scale.linear().domain([-bound, bound]).nice().range([0, ctx.expectedValueWidth]);

//        var formatPercent = d3.format(".0 ");
        var formatPercent = d3.format("%");

        var expectedValueAxis = d3.svg.axis().scale(ctx.expectedValueScale).orient('top').ticks(4).tickFormat(formatPercent);

        tableHeaderGroup.select("#expectedValueAxis").transition().attr({
            transform: 'translate(' + ctx.xStartExpectedValues + ',' + (ctx.textHeight - 5) + ')'
        }).call(expectedValueAxis);



        // some statistics
        var sumStatFO = tableHeaderGroup.selectAll(".summaryStatisticsFO").data(ctx.summaryStatisticVis, function(d,i){return d.attribute+i})

        sumStatFO.exit().remove();
        var sumStatFOHTML = sumStatFO.enter().
            append("foreignObject").attr({
                class:"summaryStatisticsFO",
                width:120,
                height:30,
                x:function(d,i){return ctx.xStartStatisticColumns+i*(ctx.summaryStatisticsWidth+ctx.majorPadding)},
                y:ctx.labelTopPadding-5

            }).append("xhtml:body")//.attr("xmlns","http://www.w3.org/1999/xhtml")

        sumStatFO.attr({
            x:function(d,i){return ctx.xStartStatisticColumns+i*(ctx.summaryStatisticsWidth+ctx.majorPadding)}
        })



//        sumStatFO.append("h1").text("Hal2")
//        sumStatFO.html("<h1>HALLO</h1>")
//
        sumStatFOHTML.append("select").attr({
//            id:"sumStatAttributeSelector"
                class:"columnLabel"
        }).style({
                width:ctx.summaryStatisticsWidth+"px",
                "background":"transparent",
                border: "1px solid #ccc",
                "-webkit-appearance": "none",
                "padding":"5px"

            })
        .on({
            "change":function(d,i){

                d.attribute = d3.event.target.value;
                updateStatistics();
                updateHeaders();
                plotSubSets();

            }
        })


        var attSel = sumStatFO.selectAll("select")
          .selectAll("option").data(attributes.filter(function(d){return d.type=="integer" || d.type=="float"}))




        attSel.exit().remove();
        attSel.enter().append("option")
        attSel.attr({
            "value":function(d,i){
                return d.name
            },
            "selected":function(d,i){
                return (d.name == d3.select(this.parentNode).datum().attribute)?"selected":null;
            }
        }).text(function(d){return d.name})


        var sumStatAxis = tableHeaderGroup.selectAll(".summaryStatisticsAxis").data(ctx.summaryStatisticVis,function(d,i){return d.attribute+i})
        sumStatAxis.exit().remove();
        sumStatAxis.enter().append("g").attr({
            class:"summaryStatisticsAxis"
        })
        sumStatAxis.attr({
            "transform":function(d,i){return "translate("+(ctx.xStartStatisticColumns+(i*(ctx.summaryStatisticsWidth+ctx.majorPadding)))+","+(ctx.textHeight-5)+")"}
        }).each(function(d,i){
                d.visObject.renderAxis(d3.select(this),0,0,ctx.summaryStatisticsWidth);
            })


//        ctx.summaryStatisticVis.forEach(function(sumStat,i){
//            sumStat.visObject.renderAxis(tableHeaderGroup,ctx.xStartStatisticColumns+(i*100),ctx.textHeight-5,95);
//
//        })

        updateSetsLabels(ctx.tableHeaderNode)

    }

    function updateSubSetGroups() {

      // ------------------- the rows -----------------------
      var subSets = ctx.gRows.selectAll('.row')
          .data(renderRows, function (d, i) {
              return d.id;
          });

//        console.log("rr:",renderRows);
//        console.log("rr2:",ctx.rowScale.domain());

      var rowSubSets = subSets
          .enter()
          .append('g')
          .attr({transform: function (d) {

              if (d.data.type === ROW_TYPE.SUBSET || d.data.type === ROW_TYPE.GROUP) {
                  return 'translate(0, ' + ctx.rowScale(d.id) + ')';
              }else {
                  var offset_y = ctx.textHeight;
                  if (d.data.level == 2)
                      offset_y += 10
                  return 'translate(0, ' + offset_y + ')';
              }
          }, class: function (d) {
              return 'row ' + d.data.type;
          }
          }).style("opacity", function (d) {
              if (d.data.type === ROW_TYPE.SUBSET || d.data.type === ROW_TYPE.GROUP)
                  return ctx.gRows.selectAll('.row')[0].length == 0 ? 1 : 0;
              else
                  return ctx.gRows.selectAll('.row')[0].length ? 0 : 1;
          })

      // Anticipating future overlays
      rowSubSets.append("g").attr("class", "gBackgroundRect")
      rowSubSets.append("g").attr("class", "gHorizon")
      rowSubSets.append("g").attr("class", "gOverlays")
      rowSubSets.append("g").attr("class", "gIndicators")

      subSets.exit().remove();

      var subSetTransition = subSets
      if (ctx.rowTransitions && usedSets.length<10)
          subSetTransition = subSets
              .transition().duration(function (d, i) {
                  if (d.data.type === ROW_TYPE.SUBSET)
                      return queryParameters['duration'];
                  else
                      return queryParameters['duration'];
              })
      subSetTransition.attr({transform: function (d) {
        return 'translate(0, ' + ctx.rowScale(d.id) + ')';

      }, class: function (d) {
          return 'row ' + d.data.type;
      }}).transition().duration(100).style("opacity", 1);

      return subSets;
    }

    function updateSubsetRows(subsetRows, setScale) {

        var backgrounds = subsetRows.select(".gBackgroundRect").selectAll(".backgroundRect").data(function (d) {
            return [d]
        })
        backgrounds.enter()
            .append("rect").attr({
                class: "backgroundRect",
                x: 0,
                y: 0,
                width: ctx.setVisWidth,
                height: ctx.cellSize
            })
            .style({
                "fill-opacity": 0.0001,
                fill: ctx.backHighlightColor // for debugging
            })
            .on({
                'mouseover': mouseoverRow,
                'mouseout': mouseoutRow
            })
        backgrounds.exit().remove();
        backgrounds.attr({
            width: ctx.setVisWidth,
            height: ctx.cellSize
        })

        var combinationGroups = subsetRows.selectAll('g.combination').data(function (d) {
                // binding in an array of size one
                return [d.data.combinedSets];
            }
        )

        combinationGroups.enter()
            .append('g')
            .attr({class: 'combination'
            })
        combinationGroups.exit().remove();

        var cells = combinationGroups.selectAll('.cell').data(function (d) {
            return d.map(function (dd, i) {
                return {data: usedSets[i], value: dd}
            });
        })
        // ** init
        cells.enter()
            .append('circle')
            .on({
                'click': function (d) {

                    /* click event for cells*/
                },
                'mouseover': function (d, i) {
                    mouseoverCell(d3.select(this).node().parentNode.parentNode.__data__, i)
                },
                'mouseout': mouseoutCell
            })
        cells.exit().remove()

        //** update
        cells.attr('cx', function (d, i) {
            return (ctx.cellWidth) * i + ctx.cellWidth / 2;
        })
            .attr({
                r: ctx.cellSize / 2 - 1,
                cy: ctx.cellSize / 2,
                class: 'cell'
            })
            .style('fill', function (d) {
                return setScale(d.value);

            })

        // add the connecting line for cells
        var cellConnectors = combinationGroups.selectAll('.cellConnector').data(
            function (d) {
                // get maximum and minimum index of cells with value 1
                var extent = d3.extent(
                    d.map(function (dd, i) {
                        if (dd == 1) return i; else return -1;
                    })
                        .filter(function (dd, i) {
                            return dd >= 0;
                        })
                )

                // dont do anything if there is only one (or none) cell
                if (extent[0] == extent[1]) return [];
                else return [extent];
            }
        );
        //**init
        cellConnectors.enter().append("line").attr({
            class: "cellConnector",
            "pointer-events": "none"
        })
            .style({
                "stroke": setScale(1),
                "stroke-width": 3
            });
        cellConnectors.exit().remove();

        //**update
        cellConnectors.attr({
            x1: function (d) {
                return (ctx.cellWidth) * d[0] + ctx.cellWidth / 2;
            },
            x2: function (d) {
                return (ctx.cellWidth) * d[1] + ctx.cellWidth / 2;
            },
            y1: ctx.cellSize / 2,
            y2: ctx.cellSize / 2
        })

        /// --- the sizeBar

/*
         var sizeBars = subsetRows.selectAll(".row-type-subset").data(function (d) {
         return [d]
         })
         sizeBars.enter()
         .append('rect')
         .attr("class", 'subSetSize row-type-subset')
         .attr({
         transform: function (d) {
         var y = 1;
         return   'translate(' + ctx.xStartSetSizes + ', ' + y + ')'; // ' + (textHeight - 5) + ')'
         },

         width: function (d) {
         return ctx.subSetSizeScale(d.data.setSize);
         },
         height: function (d) {
         return ctx.cellSize - 2
         }
         })
         .on('click', function (d) {
         ctx.intersectionClicked(d);
         })
         .on('mouseover', mouseoverRow)
         .on('mouseout', mouseoutRow)
         sizeBars.exit().remove();


         var sizeBarsChanges = sizeBars
         if (ctx.barTransitions) sizeBarsChanges.transition()
        sizeBarsChanges.attr({
         //class: 'subSetSize',
        transform: function (d) {
          var y = 1;
         return   'translate(' + ctx.xStartSetSizes + ', ' + y + ')'; // ' + (textHeight - 5) + ')'
        },
        width: function (d) {
          return ctx.subSetSizeScale(d.data.setSize);
        },
        height: function (d) {
          return ctx.cellSize - 2
        }
      })

*/



        subsetRows.each(function (e, j) {

            var g = d3.select(this);
            var max_scale = ctx.subSetSizeScale.domain()[1];

            var i = 0, is_overflowing = false;
            var nbLevels = Math.min(ctx.maxLevels, Math.ceil(e.data.setSize / max_scale));

            var data = d3.range(nbLevels).map(function () {

                var f = {};
                f.data = {};
                f.data.type = e.data.type;

               // Prevent empty bar when right on 1-level value
                if(nbLevels==1 && e.data.setSize > 0 && (e.data.setSize % max_scale == 0)) {
                  f.data.setSize = e.data.setSize;
                  return f;
                }

                if (i == nbLevels - 1 && Math.ceil(e.data.setSize / max_scale) < nbLevels + 1)
                    f.data.setSize = (e.data.setSize % max_scale);
                else
                    f.data.setSize = max_scale;
                i++;
                return f;
            })

            g.selectAll(".cutlines").remove();

            if (Math.ceil(e.data.setSize / max_scale) > ctx.maxLevels) {
                var g_lines = g.selectAll(".cutlines").data([e.id]).enter().append("g").attr("class", "cutlines")

                g_lines.append("line")
                    .attr({x1: ctx.xStartSetSizes + ctx.subSetSizeWidth-15, x2: ctx.xStartSetSizes + ctx.subSetSizeWidth-5, y1: 0, y2: 20})
                    .style({'stroke': 'white', 'stroke-width': 1})

                g_lines.append("line")
                    .attr({x1: ctx.xStartSetSizes + ctx.subSetSizeWidth-20, x2: ctx.xStartSetSizes + ctx.subSetSizeWidth-10, y1: 0, y2: 20})
                    .style({'stroke': 'white', 'stroke-width': 1})
            }

            // Add new layers
            var layers_enter = g.selectAll(".gHorizon").selectAll(".row-type-subset").data(data).enter()

            layers_enter.append('rect')
                .attr("class", function (d) {
                    return ( 'subSetSize row-type-subset' );

                })

            // Remove useless layers
            g.selectAll(".row-type-subset").data(data).exit().remove()

            // Update current layers
            g.selectAll(".row-type-subset")
                .attr({
                    transform: function (d, i) {
                        var y = 0;
                        if (d.data.type !== ROW_TYPE.SUBSET)
                            y = 0;//cellSize / 3 * .4;
                        return   'translate(' + (ctx.xStartSetSizes) + ', ' + (y + ctx.cellSizeShrink * i + 1) + ')'; // ' + (textHeight - 5) + ')'
                    },

                    width: function (d, i) {
                        return ctx.subSetSizeScale(d.data.setSize);
                    },
                    height: function (d, i) {
                        return ctx.cellSize - ctx.cellSizeShrink * 2 * i - 2;
                    }
                })
                .style({
                    fill:function(d,i){ return ctx.horizonBarGrays(i);}
                })
//                .style("opacity", function (d, i) {
//                    if (nbLevels == 1)
//                        return .8;
//                    else if (nbLevels == 2)
//                        return .8 + i * .2;
//                    else
//                        return .4 + i * .4;
//                })
                .on('click', function () {
                  //console.log("e", e, d3.select(this).node().parentNode.__data__)
                  ctx.intersectionClicked(e);
                })
                .on('mouseover', function () {
                    mouseoverRow(e);
                })
                .on('mouseout', function () {
                    mouseoutRow(e);
                })

        })



    }

    function updateGroupRows(groupRows) {
        var groupsRect = groupRows.select(".gBackgroundRect").selectAll(".groupBackGround").data(function (d) {
            return [d];
        });
        //**init
        groupsRect.enter().append('rect').attr({
            class: function (d) {
                if (d.data instanceof QueryGroup) {
                    return 'groupBackGround filterGroup';
                } else {
                    if (d.data.level>1) return 'groupBackGround secondLevel';
                    else return 'groupBackGround'
                }
            },
            rx:5,
            ry:10,
            width: ctx.setVisWidth + ctx.leftOffset,
            height: ctx.cellSize,
            x: -ctx.leftOffset,
            y: 0
        })
//            .on('click', function (d) {
//                collapseGroup(d.data);
//                updateStatistics();
//
//                rowTransition(false);
//            });

        groupsRect.exit().remove();
        //**update
        groupsRect.attr({
            width: function (d) {
                return ctx.setVisWidth + ctx.leftOffset - (d.data.level - 1) * ctx.leftIndent;
            },
            height: ctx.cellSize,
            x: function (d) {
                return (d.data.level - 1) * ctx.leftIndent - ctx.leftOffset
            }
        });

        //  console.log('g2: ' + groups);
        var groupsText = groupRows.selectAll(".groupLabel.groupLabelText").data(function (d) {
            return [d];
        });
        groupsText.enter().append('text')
            .attr({class: 'groupLabel groupLabelText',
                y: ctx.cellSize - 3,
                x: function (d) {
                    return (-ctx.leftOffset + 12) + (d.data.level - 1) * ctx.leftIndent;
                },
                'font-size': ctx.cellSize - 6

            });
        groupsText.exit().remove();

        var queryGroupDecoItems = [
//            {id:"I", action:1, color:"#a1d99b"},
            {id: "X", action: 2, color: "#f46d43"}
        ];

        //** update
        groupsText.text(function (d) {

//            if (d.data instanceof QueryGroup){
//                return "@ "+d.data.elementName;
//            }
//            if (d.data.type === ROW_TYPE.GROUP)
//                return d.data.elementName;

            if (d.data.type === ROW_TYPE.AGGREGATE)
                return String.fromCharCode(8709) + '-subsets (' + d.data.subSets.length + ') ';
            else {
                var truncateLength = 0;
              if (d.data.type === ROW_TYPE.GROUP && typeof(d.data.combinedSets) != "undefined") {
                truncateLength = 10;
              } else {
                truncateLength = ctx.truncateGroupAfter;
              }
              var str = d.data.elementName.substring(0, truncateLength);
              if(str.length<d.data.elementName.length)
                str = str.trim() + "...";
              return str;
            }
        }).attr({
                class: function () {
                    if (ctx.cellDistance < 14) return 'groupLabel groupLabelText small'; else return 'groupLabel groupLabelText'
                },
                y: ctx.cellSize - 3,
                x: function (d) {
                    return (-ctx.leftOffset + 15) + (d.data.level - 1) * ctx.leftIndent;
                }

            })
        .on('click', function (d) {
                collapseGroup(d.data);
                updateStatistics();
                rowTransition(false);
            })
        .append("svg:title")
            .text(function (d, i) {
                return d.data.elementName;
            })

        var collapseIcon = groupRows.selectAll(".collapseIcon").data(function (d) {
            return [d];
        })
        collapseIcon.enter()
            .append("text")
            .attr({
                class: "collapseIcon"
            }).on('click', function (d) {
                collapseGroup(d.data);
                updateStatistics();
                rowTransition(false);
            });

        collapseIcon
            .text(function (d) {
                if (d.data.isCollapsed == 0) return "\uf0dd";//return "\uf147";
                else return "\uf0da";//return "\uf196"
            })
            .attr({"transform": function (d) {
                return "translate(" + (-ctx.leftOffset + 2 + 5 + (d.data.level - 1) * ctx.leftIndent) + "," + (ctx.cellSize / 2 + 5) + ")"
            }
            }).style({
                "font-size": "10px"
            })

        // -- Decoration for Filter Groups
        var allQueryGroups = groupRows.filter(function (d) {
            return (d.data instanceof QueryGroup)
        })
        var groupDeleteIcon = allQueryGroups.selectAll(".groupDeleteIcon").data(function (d) {
            return [d]
        })
        var groupDeleteIconEnter = groupDeleteIcon.enter().append("g").attr({
            class: "groupDeleteIcon"
        })
//        groupDeleteIconEnter.append("rect").attr({
//            x:-5,
//            y:-10,
//            width:10,
//            height:10,
//            fill:"#f46d43"
//        })
        groupDeleteIconEnter.append("text")
            .text("\uf057") // uf057 uf05e
            .on({
                "click": function (d) {

                    var index = -1;
                    UpSetState.logicGroups.forEach(function (dd, i) {

                        if (dd.id == d.id) index = i;
                    })

                    UpSetState.logicGroups.splice(index, 1);

                    UpSetState.logicGroupChanged = true;
                    UpSetState.forceUpdate = true;

                    updateState();
                    rowTransition();
                }
            }).style({ "fill": "#f46d43"})

        groupDeleteIcon.attr({
            "transform": "translate(" + (ctx.xStartSetSizes - 12) + "," + (ctx.cellSize / 2 + 4) + ")"
        })


        // --- circles for Groups with combinedSets element set --- ///

        function decorateGroupsWithCells(){
            var nonLogicGroups =  groupRows.filter(function (d) {
                return  ("combinedSets" in d.data); //!(d.data instanceof QueryGroup) &&
            })
            var combinationGroups = nonLogicGroups.selectAll('g.combination').data(function (d) {
                    // binding in an array of size one
                    return [d.data.combinedSets];
                }
            )

            combinationGroups.enter()
                .append('g')
                .attr({class: 'combination'
                })
            combinationGroups.exit().remove();


            var cells = combinationGroups.selectAll('.cell').data(function (d) {

                return d.map(function (dd, i) {
                    return {data: usedSets[i], value: dd}
                });
            })
            // ** init
            cells.enter()
                .append('circle')
            .on({
                'mouseover': function (d, i) {
                    mouseoverCell(d3.select(this).node().parentNode.parentNode.__data__, i)
                },
                'mouseout': mouseoutCell
            })
            cells.exit().remove()

            //** update
            cells.attr('cx', function (d, i) {
                return (ctx.cellWidth) * i + ctx.cellWidth / 2;
            })
                .attr({
                    r: ctx.cellSize / 2 - 3,
                    cy: ctx.cellSize / 2,
                    class: 'cell'
                })
                .style('fill', function (d) {
                    switch(d.value)
                    {case 0: //logicState.NOT
                        return ctx.grays[0]
                        break;
                        case 1: //logicState.MUST
                            return ctx.grays[1]
                            break;
                        default: // logicState.DONTCARE
                            return "url(#DontCarePattern)"}
                }
            )
                .style({
                    "stroke":function(d){if (d.value ==0) return ctx.grays[1]; else return "none"}//ctx.grays[1]
                })



        }

        decorateGroupsWithCells();


        function decorateComplexQueries() {
            var complexLogicGroups =  groupRows.filter(function (d) {
                return  ("orClauses" in d.data && d.data.orClauses.length>1); //!(d.data instanceof QueryGroup) &&
            })
            var combinationGroups = complexLogicGroups.selectAll('g.complexCombination').data(function (d) {
                    // binding in an array of size one
                    return [d.data.orClauses];
                }
            )
            combinationGroups.enter()
                .append('g')
                .attr({class: 'complexCombination'
                })
            combinationGroups.exit().remove();


            combinationGroups.selectAll("text").data(function(d){return [d]}).enter().append("text")
                .attr({
                    class: function () {
                        if (ctx.cellDistance < 14) return 'groupLabel small'; else return 'groupLabel'
                    },
                    x:(usedSets.length*ctx.cellWidth *.5),
                    y: ctx.cellWidth-3
                })
                .style({
                    cursor:"pointer",
                    "text-anchor":"middle"
                })
                .text(function(d){return "combination";})
                .on({
                    "mouseover":function(d){
                        var xy = d3.select(this.parentNode.parentNode).attr("transform").split(/[,()]/);
                   //     console.log(d3.select(this.parentNode.parentNode).attr("transform"),d);
//                        console.log(xy.split(/[,()]/));
                        if (xy.length==4){
                            var infoGroup = ctx.toolTipLayer.append("g").attr({
                                class:"toolTipQuery",
                                "transform":"translate("+
                                    (+xy[1]+ctx.leftOffset-5)+","+
                                    (+xy[2]-ctx.textHeight+ctx.cellSize+5)+")"})
                            infoGroup.style({
                                "opacity":.00001
                            }).transition().style({
                                "opacity":1
                            });

//                            b.append("circle").attr({
//                                cx:5,
//                                cy:5,
//                                r:3
//                            })

//                            console.log(b);

//                            var infoGroup = ctx.toolTipLayer.select("#toolTipQuery");
                            infoGroup.append("rect").attr({
//                                class:"groupBackGround",
                                width:(usedSets.length*ctx.cellWidth+10),
                                height: d.length*ctx.cellSize+10,
                                rx:10,
                                ry:10
                            }).style({
                                    "stroke-width":2,
                                    "stroke":ctx.grays[1],
                                    "fill":ctx.grays[0]
                                })



                       //     console.log(infoGroup);

                            d.forEach(function(row,index){
                                var y = index*ctx.cellSize;

                                var actualRow = infoGroup.append("g").attr({
                                    class:"combination",
                                    "transform":"translate("+0+","+y+")"
                                })

                                actualRow.selectAll('.cell').data(function (d) { return Object.keys(row).map(function(key){return row[key];})})
                                .enter()
                                    .append('circle')
                                    .attr('cx', function (d, i) {
                                        return (ctx.cellWidth) * i + ctx.cellWidth / 2+5;
                                    })
                                    .attr({
                                        r: ctx.cellSize / 2 - 3,
                                        cy: ctx.cellSize / 2+5,
                                        class: 'cell'
                                    })
                                    .style('fill', function (d) {

                                        switch(d.state)
                                        {case 0: //logicState.NOT
                                            return ctx.grays[0]
                                            break;
                                            case 1: //logicState.MUST
                                                return ctx.grays[1]
                                                break;
                                            default: // logicState.DONTCARE
                                                return "url(#DontCarePattern)"}
                                    }
                                )
                                    .style({
                                        "stroke":function(d){if (d.value ==0) return ctx.grays[1]; else return "none"}//ctx.grays[1]
                                    })


                            })



                        }


                    },
                    "mouseout":function(){
                        ctx.toolTipLayer.selectAll(".toolTipQuery").transition().attr({opacity:.0001}).remove();
                    }

                })
            ;

//            var cells = combinationGroups.selectAll('.cell').data(function (d) {
//
//                return d.map(function (dd, i) {
//                    return {data: usedSets[i], value: dd}
//                });
//            })
//            // ** init
//            cells.enter()
//                .append('circle')
//                .on({
//                    'mouseover': function (d, i) {
//                        mouseoverCell(d3.select(this).node().parentNode.parentNode.__data__, i)
//                    },
//                    'mouseout': mouseoutCell
//                })
//            cells.exit().remove()
//
//            //** update
//            cells.attr('cx', function (d, i) {
//                return (ctx.cellWidth) * i + ctx.cellWidth / 2;
//            })
//                .attr({
//                    r: ctx.cellSize / 2 - 3,
//                    cy: ctx.cellSize / 2,
//                    class: 'cell'
//                })
//                .style('fill', function (d) {
//                    switch(d.value)
//                    {case 0: //logicState.NOT
//                        return ctx.grays[0]
//                        break;
//                        case 1: //logicState.MUST
//                            return ctx.grays[1]
//                            break;
//                        default: // logicState.DONTCARE
//                            return "url(#DontCarePattern)"}
//                }
//            )
//                .style({
//                    "stroke":function(d){if (d.value ==0) return ctx.grays[1]; else return "none"}//ctx.grays[1]
//                })

        }

        decorateComplexQueries();



//        var circles = tableRows.selectAll("circle").data(function(d){return d.selectors})
//        circles.enter()
//            .append("circle").attr({
//                class:"logicPanelCircle",
//                cx:function(d,i){return (i+.5)*cellWidth}, // TODO: add 90 as params!!
//                cy: .5*cellSize,
////                if (animated) return 0.5*cellSize;
////                else return (i+1.5)*cellSize +5},
//                r: cellSize/2-2
//            })
//
//        circles.style({
//            fill:function(d){
//                switch(d.state)
//                {
//                    case logicState.NOT:
//                        return grays[0]
//                        break;
//                    case logicState.MUST:
//                        return grays[1]
//                        break;
//                    default: // logicState.DONTCARE
//                        return "url(#DontCarePattern)"
//                }},
//            stroke:function(d){
//                if (d.isSelected()) return logicColor;
//                else return null;
//            }
//
//        })




        // --- Horizon Bars for size.

        groupRows.each(function (e, j) {

            var g = d3.select(this);
            var max_scale = ctx.subSetSizeScale.domain()[1];

            var i = 0, is_overflowing = false;
            var nbLevels = Math.min(ctx.maxLevels, Math.ceil(e.data.setSize / max_scale));

            var data = d3.range(nbLevels).map(function () {

                var f = {};
                f.data = {};
                f.data.type = e.data.type;

                // Prevent empty bar when right on 1-level value
                if(nbLevels==1 && e.data.setSize > 0 && (e.data.setSize % max_scale == 0)) {
                  f.data.setSize = e.data.setSize;
                  return f;
                }

                if (i == nbLevels - 1 && Math.ceil(e.data.setSize / max_scale) < nbLevels + 1)
                    f.data.setSize = (e.data.setSize % max_scale);
                else
                    f.data.setSize = max_scale;
                i++;
                return f;
            })

            g.selectAll(".cutlines").remove();

            if (Math.ceil(e.data.setSize / max_scale) > ctx.maxLevels) {
                var g_lines = g.selectAll(".cutlines").data([e.id]).enter().append("g").attr("class", "cutlines")

                g_lines.append("line")
                    .attr({x1: ctx.xStartSetSizes + ctx.subSetSizeWidth-15, x2: ctx.xStartSetSizes + ctx.subSetSizeWidth-5, y1: 0, y2: 20})
                    .style({'stroke': 'white', 'stroke-width': 1})

                g_lines.append("line")
                    .attr({x1: ctx.xStartSetSizes + ctx.subSetSizeWidth-20, x2: ctx.xStartSetSizes + ctx.subSetSizeWidth-10, y1: 0, y2: 20})
                    .style({'stroke': 'white', 'stroke-width': 1})
            }

            // Add new layers
            var layers_enter = g.select(".gHorizon").selectAll(".row-type-group").data(data).enter()

            layers_enter.append('rect')
                .attr("class", function (d) {
                    return ( 'subSetSize row-type-group' );

                })

            // Remove useless layers
            g.selectAll(".row-type-group").data(data).exit().remove()

            // Update current layers
            g.selectAll(".row-type-group")
                .attr({
                    transform: function (d, i) {

                        return   'translate(' + (ctx.xStartSetSizes) + ', ' + (ctx.cellSizeShrink * i+2) + ')'; // ' + (textHeight - 5) + ')'

                    },

                    width: function (d, i) {
                        return ctx.subSetSizeScale(d.data.setSize);
                    },
                    height: function (d, i) {

                        return ctx.cellSize-4 - ctx.cellSizeShrink * 2 * i;

                    }
                })       .style({
                    fill:function(d,i){ return ctx.horizonBarGrays(i);}
                })
//                .style("opacity",function (d, i) {
//                    if (nbLevels == 1)
//                        return 1;
//                    else if (nbLevels == 2)
//                        return .8 + i * .2;
//                    else
//                        return .4 + i * .4;
//                })
            .on('click', function (d) {
                    var selection = Selection.fromSubset(d3.select(this).node().parentNode.__data__.data.subSets);
                    selections.addSelection(selection, true);
                    selections.setActive(selection);
                })

        })

    }

    function updateRelevanceBars(allRows) {
        var expectedValueBars = allRows.selectAll(".disproportionality").data(function (d) {
            return [d]
        })

        expectedValueBars.enter()
            .append('rect')
            .attr({
                transform: function (d) {
                    var start = ctx.expectedValueScale(d3.min([0, d.data.disproportionality]));
                    start += ctx.xStartExpectedValues;
                    var y = 2;
                    if (d.data.type === ROW_TYPE.SUBSET)
                        y = 1;//cellSize / 3 * 1.7;
                    return 'translate(' + start + ', ' + y + ')';
                },
                width: 1,
                height: function (d) {
                    if (d.data.type === ROW_TYPE.SUBSET)
                        return ctx.cellSize - 2;
                    else
                        return ctx.cellSize-4;// / 3;
                }
            })
            .on('mouseover', mouseoverRow)
            .on('mouseout', mouseoutRow)

        expectedValueBars.exit().remove()

        // transition for subsets
        changeTheValues(expectedValueBars.filter(function (d) {
            return (d.data.type === ROW_TYPE.SUBSET)
        }).transition())

        // no transition for groups
        changeTheValues(expectedValueBars.filter(function (d) {
            return (d.data.type !== ROW_TYPE.SUBSET)
        }))
//        expectedValueBars.transition()

        function changeTheValues(node) {
            node.attr({
                class: function (d) {
                    return d.data.disproportionality < 0 ? 'disproportionality negative' : 'disproportionality positive';
                },
                transform: function (d) {
                    if (isNaN(d.data.disproportionality)) {
                        return 'translate(' + 0 + ', ' + 0 + ')';
                    }
                    var start = ctx.expectedValueScale(d3.min([0, d.data.disproportionality]));
                    start += ctx.xStartExpectedValues;
                    var y = 2;
                    if (d.data.type == ROW_TYPE.SUBSET)
                        y = 1;//cellSize / 3 * 1.7;
                    return 'translate(' + start + ', ' + y + ')';
                },
                width: function (d) {
                    if (isNaN(d.data.disproportionality)) {
                        return 0;
                    }
                    //  console.log(d.data.disproportionality)
                    return Math.abs(ctx.expectedValueScale(d.data.disproportionality) - ctx.expectedValueScale(0));
                },
                height: function (d) {
                    if (d.data.type === ROW_TYPE.SUBSET)
                        return ctx.cellSize - 2;
                    else
                        return ctx.cellSize-4;// / 3;
                }
            })
        }
    }

    function updateAttributeStatistic(allRows){
        allRows.each(function(row,j){
            if (row.data.type == ROW_TYPE.SEPARATOR) return;

            var rowElement = d3.select(this);

            var detailStatisticElements = rowElement.selectAll(".detailStatistic").data(ctx.summaryStatisticVis,function(d,i){return d.attribute+i});
            detailStatisticElements.exit().remove();
            detailStatisticElements.enter().append("g").attr({
                class:function(d){return "detailStatistic"}
            })



            detailStatisticElements.each(function(d,i){

                d.visObject.renderBoxPlot(row.id,d3.select(this),ctx.xStartStatisticColumns+i*(ctx.summaryStatisticsWidth+ctx.majorPadding),2,null,ctx.cellSize-4,"detail"+i); //  function(id, g, x,y,w,h)

            })

        })




    }


    function updateOverlays(allRows) {
        if (selections.getSize() == 0) {
            allRows.selectAll(".what").remove();
            allRows.selectAll(".newOverlay").remove();
            allRows.selectAll('.selectionIndicators').remove();
            return;
        }

        var currentRowSize = 0

        allRows.each(function (e, j) {

            var g = d3.select(this);
            var max_scale = ctx.subSetSizeScale.domain()[1];


          if(e.data.type==ROW_TYPE.GROUP) {

            e.data.selections = {};
            e.data.selections.setSize = e.data.setSize;
            currentRowSize = e.data.setSize;

            e.data.subSets.map(function(s, k) {

              if(typeof(e.data.selections) == "undefined")
                e.data.selections = {};

                for (var p in s.selections) {
                  if(typeof(e.data.selections[p]) == "undefined")
                    e.data.selections[p] = [];

                  e.data.selections[p] = e.data.selections[p].concat(s.selections[p]);

              }
            });

          }
            // FIND UUID
             var usedID = false;
            //   var alternativeID;
            var sIDs = Object.getOwnPropertyNames(e.data.selections);
            var s = e.data.selections;
            sIDs.forEach(function (prop) {
                var length = s[prop].length;
                if (selections.isActiveByUuid(prop)) {
                    usedID = prop;
                }
            });
            if (!usedID) {
                return 0;
            }

            currentRowSize =  s[usedID].length;
            if(e.data.type==ROW_TYPE.GROUP)
              e.data.selections.setSize =currentRowSize;


            var i = 0, is_overflowing = false;
            var nbLevels = Math.min(ctx.maxLevels, Math.ceil(currentRowSize / max_scale));
            var data = d3.range(nbLevels).map(function () {

                var f = {};
                f.data = {};
                f.data.setSize = currentRowSize
                f.data.type = e.data.type;
               // Prevent empty bar when right on 1-level value
                if(nbLevels==1 && currentRowSize > 0 && (currentRowSize % max_scale == 0)) {
                  f.data.setSize = currentRowSize;
                  return f;
                }

                if (i == nbLevels - 1 && Math.ceil(currentRowSize / max_scale) < nbLevels + 1)
                    f.data.setSize = (currentRowSize % max_scale);
                else
                    f.data.setSize = max_scale;
                i++;


                return f;
            })

            // Add new layers
            var layers_enter = g.selectAll(".gOverlays").selectAll(".newOverlay").data(data).enter()

            layers_enter.append('rect')
                .attr("class", "newOverlay")

            // Remove useless layers
            g.selectAll(".newOverlay").data(data).exit().remove()

            // Update current layers
            g.selectAll(".newOverlay")
                .attr({
                    transform: function (d, i) {
                     //   var y = 0;
                     //   if (d.data.type !== ROW_TYPE.SUBSET)
                     //       y = 0;//cellSize / 3 * .4;
                        return   'translate(' + (ctx.xStartSetSizes) + ', ' + (ctx.cellSizeShrink * i + 1) + ')'; // ' + (textHeight - 5) + ')'
                    },

                    width: function (d, i) {

                     return ctx.subSetSizeScale(d.data.setSize);

                  },
                    height: function (d, i) {
                        return ctx.cellSize - ctx.cellSizeShrink * 2 * i - 2;
                    },
                   fill: function(d) {
                     var usedID = false;
                    //   var alternativeID;
                    var sIDs = Object.getOwnPropertyNames(e.data.selections);
                    var s = e.data.selections;
                    sIDs.forEach(function (prop) {
                        var length = s[prop].length;
                        if (selections.isActiveByUuid(prop)) {
                            usedID = prop;
                        }
                    });
                    if (!usedID) {
                        return 0;
                    }

                    return selections.getColorFromUuid(usedID)//"url(#diagonalHatch_0)"
                   }

                })
                .style("opacity", function (d, i) {

                    if (nbLevels == 1)
                        return .5;
                    else if (nbLevels == 2)
                        return .5 + i * .2;
                    else
                        return .2 + i * .3;
                })
                .on('click', function () {
                  ctx.intersectionClicked(e);
                })
                .on('mouseover', function () {
                    mouseoverRow(e);
                })
                .on('mouseout', function () {
                    mouseoutRow(e);
                })

        })


/*
        var selectionOverlay = allRows.selectAll(".what").data(function (d) {
            return [d]
        })
        selectionOverlay.enter().append('rect')
            .on('click', function (d) {
                if (d.data.type === ROW_TYPE.SUBSET) {
                    var selection = Selection.fromSubset(d.data);
                    selections.addSelection(selection, true);
                    selections.setActive(selection);
                }
            })
            .on('mouseover', mouseoverRow)
            .on('mouseout', mouseoutRow)
            .attr("class", "what");

        selectionOverlay
            .attr({
                transform: function (d) {
                    var y = 0;
                    if (d.data.type == ROW_TYPE.SUBSET)
                        y = 1; //cellSize / 3 * .4;
                    return   'translate(' + ctx.xStartSetSizes + ', ' + y + ')'; // ' + (textHeight - 5) + ')'
                },

                width: function (d) {
                    var s = d.data.selections;
                    if (typeof s !== 'object') {
                        return 0;
                    }

                    var usedID = false;
                    //   var alternativeID;
                    var sIDs = Object.getOwnPropertyNames(s);
                    sIDs.forEach(function (prop) {
                        var length = s[prop].length;
                        if (selections.isActiveByUuid(prop)) {
                            usedID = prop;
                        }
                    });
                    if (!usedID) {
                        return 0;
                    }
                   // d3.select(this).style("fill", selections.getColorFromUuid(usedID));
                    return   ctx.subSetSizeScale(s[usedID].length);
                },
                height: function (d) {
                    return ctx.cellSize - 2// / 3;

                }
            })
*/
        // the triangles for the multiple selections

        //allRows.data(["indicators"]).enter().append("g").attr("class", "gIndicators")


        var selectIndicators = allRows.select('.gIndicators').selectAll('.selectionIndicators').data(function (d, i) {
            if (!d.data.selections)
                return [];
            var selectionIDs = Object.getOwnPropertyNames(d.data.selections);
            var selArray = selectionIDs.map(function (k) {
                return {uuid: k, items: d.data.selections[k]};
            });
            selArray = selArray.filter(function (d) {
                return d.items.length !== 0 && d.uuid != "undefined" && d.uuid != "setSize"; // prevents useless black indicators.. + Bug
            })
            var max_scale = ctx.subSetSizeScale.domain()[1];
            return selArray;
        })
        selectIndicators.enter()
            .append('path').attr({
                class: 'selectionIndicators'
            }).on('click', function (d) {
                selections.setActiveByUuid(d.uuid);
                updateOverlays(allRows);
            }).on('mouseenter', function() {
              d3.select(this).attr("transform", function (d, i) {
                //UPDATE
                return 'translate(' + d3.transform(d3.select(this).attr("transform")).translate + ') scale(1.5) rotate('+d3.transform(d3.select(this).attr("transform")).rotate+')';
              })
            }).on('mouseout', function() {
              //UPDATE
              d3.select(this).attr("transform", function (d, i) {
                return 'translate(' + d3.transform(d3.select(this).attr("transform")).translate + ') scale(1) rotate('+d3.transform(d3.select(this).attr("transform")).rotate+')';
            })})
        selectIndicators.exit().remove();
        selectIndicators.attr({
            transform: function (d, i) {

              var nbLevels = Math.floor(d.items.length / ctx.subSetSizeScale.domain()[1]);
              var subSetSize = d.items.length % ctx.subSetSizeScale.domain()[1];
              var rotate = 0;
              if(nbLevels>=ctx.maxLevels) {
                subSetSize = ctx.subSetSizeScale.domain()[1]
                nbLevels = ctx.maxLevels-1;
                rotate = -90;
              }
                return 'translate(' + (ctx.xStartSetSizes + ctx.subSetSizeScale(subSetSize)) + ' , ' + (nbLevels*ctx.cellSizeShrink) +
                    ') rotate(' + rotate + ')';
            },
            d: function (d) {
                return  " M -5 0  L  5 0  L 0 6 z M 0 6 L 0 " + ctx.cellSize;
            },

            stroke: 'white',
            "stroke-width": 1,
            fill: function (d, i) {
                return selections.getColorFromUuid(d.uuid);
            }
        })
    }

    function updateBarLabels(allRows) {
        var barLabels = allRows.selectAll(".intersectionSizeLabel").data(function (d) {
            return[d]
        })
        barLabels.enter().append('text')
            .attr({class: 'intersectionSizeText intersectionSizeLabel'})
            .on('click', function (d) {
                ctx.intersectionClicked(d)
            });
        barLabels.exit().remove();

        var barLabelChanges = barLabels.text(function (d) {
            return d.data.setSize;
        })
        if (ctx.barTransitions) barLabelChanges.transition()
        barLabelChanges.attr({class: 'intersectionSizeText intersectionSizeLabel',
            y: ctx.cellSize / 2,
            x: function (d) {
                return ctx.xStartSetSizes + ctx.subSetSizeScale(d.data.setSize) + 2;
            }

        });
    }

    function updateColumnBackgrounds() {
        var columnBackgrounds = ctx.columnBackgroundNode.selectAll(".columnBackground").data(usedSets);
        columnBackgrounds.enter().append("rect").attr({
            class: "columnBackground"
        }).style({
                "stroke": "none",
                fill: ctx.backHighlightColor,
                opacity: 0
            })
        columnBackgrounds.exit().remove();
        columnBackgrounds.attr({
            'x': function (d, i) {
                return (ctx.cellWidth) * i;
            },
//            y: ctx.textHeight,
            height: ctx.tableBodyHeight,
            width: ctx.cellWidth
        })
    }

    function plotSubSets() {



//        console.log("plot");
        setDynamicVisVariables();
        ctx.svgBody.attr({
            height:ctx.rowScale.rangeExtent()[1]
        })

//        // to limit the foraignobject again
//        updateFrames($(window).height(), null);

        updateColumnBackgrounds();

        var separatorRow = null;
        // generate <g> elements for all rows
        var allRows = updateSubSetGroups().filter(function(r){
            if (r.data.type==ROW_TYPE.SEPARATOR){
                separatorRow= d3.select(this);
                return false;
            }else return true;
        })

        var setScale = d3.scale.ordinal().domain([0, 1]).range(ctx.grays);

        var subSetRows = allRows.filter(function (d) {
            return d.data.type === ROW_TYPE.SUBSET;
        })

        // decorate subset rows
        updateSubsetRows(subSetRows, setScale);

        var groupRows = allRows.filter(function (d, i) {
            if (d.data.type === ROW_TYPE.GROUP || d.data.type === ROW_TYPE.AGGREGATE)
                return true;
            return false;
        })

        // decorate GroupRows
        updateGroupRows(groupRows);

        // add BarLabels to all bars
        updateBarLabels(allRows);

//
        // Rendering the highlights and ticks for selections on top of the selected subsets
        updateOverlays(allRows);

        // ----------------------- expected value bars -------------------

        updateRelevanceBars(allRows);

        // ----------------------- all Rows -------------------
        updateAttributeStatistic(allRows);


//        var separatorColumns = renderRows.filter(function(d){return (d.data instanceof Separator)});
//        separatorColumns.append("")

        if (separatorRow!=null){
            var sepRowLine = separatorRow.selectAll(".gSeparatorLine").data([1])
            sepRowLine.enter().append("line").attr({
                    class:"gSeparatorLine"
                })

            sepRowLine.attr({
                x1:-ctx.leftOffset,
                x2:ctx.w,
                y1:ctx.cellSize/2,
                y2:ctx.cellSize/2
            })

        }



        // Adjust the row height
        d3.select(".divForeign").select("svg").attr("height", renderRows.length * ctx.cellDistance);
    }

    function bindEvents() {
        $(EventManager).bind("item-selection-added", function (event, data) {
            //console.log("Selection was added to selection list with color " + selections.getColor(data.selection) + ' and ' + data.selection.items.length + ' items.');

            data.selection.mapToSubsets(subSets);

            plotSelectionTabs("#selection-tabs", selections, data.selection);
            plotSelectedItems("#item-table", data.selection);
            elementViewers.renderViewer();
        });

        $(EventManager).bind("item-selection-updated", function (event, data) {
            //console.log('Selection was updated! New length is ' + data.selection.items.length + ' items.');

            data.selection.mapToSubsets(subSets);
            plot();
            plotSelectionTabs("#selection-tabs", selections, data.selection);
            plotSelectedItems("#item-table", data.selection);
            elementViewers.renderViewer();

            plotSetOverview();
        });

        $(EventManager).bind("item-selection-removed", function (event, data) {
            //console.log("Selection was removed from selection list.");
            data.selection.unmapFromSubsets(subSets);

            if ( selections.list.length === 0 ) {
                $( '#filters-list' ).html("");
                $( '#filters-controls' ).html("");
            }

            plot();
            plotSelectionTabs("#selection-tabs", selections, selections.getActive());
            plotSelectedItems("#item-table", selections.getActive());
            elementViewers.renderViewer();
            plotSetOverview();
        });

        $(EventManager).bind("item-selection-activated", function (event, data) {
            if (data.selection) {
                //console.log('Selection ' + data.selection.id + ' was activated.');

                plot();
                plotSelectionTabs("#selection-tabs", selections, data.selection);
                data.selection.filterCollection.renderFilters();
                plotSelectedItems("#item-table", data.selection);
                plotSetOverview();
            }
            else {
                plot();
                plotSelectionTabs("#selection-tabs", selections, data.selection);
                plotSelectedItems("#item-table", data.selection);
                plotSetOverview();
            }
            elementViewers.renderViewer();
        });

        $(EventManager).bind("ui-resize", function (event, data) {
            ctx.resizeSetView(data.newHeight, null)
//            plot(Math.floor(data.newWidth * .66), Math.floor(data.newHeight));
            plotSetOverview();
        });

        $(EventManager).bind("ui-vertical-resize", function (event, data) {

            ctx.resizeSetView(data.newHeight, null)
//            plot(undefined, Math.floor(data.newHeight));
            plotSetOverview();
        });

//        $(EventManager).bind("ui-horizontal-resize", function (event, data) {
//            plot(Math.floor(data.newWidth * .66), undefined);
//            plotSetOverview();
//        });

        $(EventManager).bind("loading-dataset-started", function (event, data) {
            $(".ui-fader").show();
            $("#data-loading-indicator").show();
        });

        $(EventManager).bind("loading-dataset-finished", function (event, data) {
            $(".ui-fader").fadeOut(1000);
            $("#data-loading-indicator").fadeOut(1000);

            elementViewers.renderController();
            elementViewers.renderViewer();
        });

        $(EventManager).bind("set-added", function (event, data) {
            if (usedSets.length === 2 || usedSets.length === 3) {
                $("#venn-diagram-viewer").fadeIn(500);
                venn.plot(undefined, usedSets.length);
            }

            if (usedSets.length !== 2 && usedSets.length !== 3) {
                $("#venn-diagram-viewer").fadeOut(500);
            }
        });

        $(EventManager).bind("set-removed", function (event, data) {
            if (usedSets.length === 2 || usedSets.length === 3) {
                $("#venn-diagram-viewer").fadeIn(500);
                venn.plot(undefined, usedSets.length);
            }

            if (usedSets.length !== 2 && usedSets.length !== 3) {
                $("#venn-diagram-viewer").fadeOut(500);
            }
        });

        $(EventManager).bind("vis-svg-resize", function (event, data) {
            //vis-svg-resize", { newWidth:+(leftWidth + (endX - startX)) });
            updateFrames(null, data.newWidth);
            updateHeaders()
            plotSubSets()
            plotSetOverview()

        });
    }

    /** Passing true will disable the group */
    function toggleGroupingL2(disable) {
        var noGroupingL2 = $('#noGroupingL2');

        if (disable) {
            noGroupingL2.prop('checked', true);
        }
        noGroupingL2.prop('disabled', disable);

        $('#groupByIntersectionSizeL2').prop('disabled', disable);
        $('#groupBySetL2').prop('disabled', disable);
        $('#groupByRelevanceMeasureL2').prop('disabled', disable);
        $('#groupByOverlapDegreeL2').prop('disabled', disable);
    }

    function disableL2Equivalent(id) {
        var l2 = $(id);
        if (l2.prop('checked')) {
            $('#noGroupingL2').prop('checked', true);
        }
        l2.prop('disabled', true);
    }

    function updateL2Grouping(){

        if (UpSetState.grouping==undefined){
            d3.select("#secondLevelGroupingSelect").attr({disabled:true})
        }else{
            d3.select("#secondLevelGroupingSelect").attr({disabled:null})
            var selectableOptions = {};
            Object.keys(ctx.groupingOptions).forEach(function(key){
                if (key!=UpSetState.grouping) selectableOptions[key] = ctx.groupingOptions[key];
            })

         //   console.log("updateL2:",selectableOptions);

    //        UpSetState.grouping = StateOpt.groupByRelevanceMeasure;
    //        UpSetState.levelTwoGrouping = undefined;

            var l2GroupingSelect = d3.select("#secondLevelGrouping").selectAll("select").data([selectableOptions]);
            l2GroupingSelect.exit().remove();
            l2GroupingSelect.enter().append("select").attr({
                id: "secondLevelGroupingSelect",
                class:"groupingSelect"
            }).on({
                    "change": function () {
                        var value = this.options[this.selectedIndex].value;
                        ctx.groupingOptions[value].l2action();
                        updateCardinalitySpinners();
                        updateState();
                        updateStatistics();
                        rowTransition();
                    }
                });


            // has to be deleted to keep order in list :((
            d3.select("#secondLevelGroupingSelect").selectAll("option").remove();
            var l2GroupingOptions = d3.select("#secondLevelGroupingSelect").selectAll("option")
                .data(
                    function (d) { return Object.keys(d).map(function (key) { return {key: key, data: d[key]} }) },
                    function(d){ return d.key})
                .enter().append("option").attr({
                    value:function(d){return d.key;},
                    selected:function(d){return (d.key==UpSetState.levelTwoGrouping || (d.key=="dont" && UpSetState.levelTwoGrouping==undefined))?"selected":null}
                }).text(function(d){return d.data.name});

        }
    }

    function updateCardinalitySpinners(){
        //  <div id='firstLevelMinCardinality' hidden>min: <input id='firstLevelMinCardinalityInput' type='number' min='0' max='12' value='0'>
        d3.select("#firstLevelMinCardinality").attr({
            hidden:((UpSetState.grouping == StateOpt.groupByOverlapDegree)?null:"true")
        }).select("input").attr({
                value:UpSetState.levelOneDegree,
                min: 1,
                max: usedSets.length
            }).on({
                "change":function(d){
                    UpSetState.levelOneDegree = +(d3.select(this).node().value);
                    UpSetState.forceUpdate=true;
                    updateState();
                    updateStatistics();
                    rowTransition();
                }


            })



        //<div id='secondLevelMinCardinality' hidden>min: <input id='secondLevelMinCardinalityInput' type='number' min='0' max='12' value='0'>
        d3.select("#secondLevelMinCardinality").attr({
            hidden:((UpSetState.levelTwoGrouping== StateOpt.groupByOverlapDegree)?null:"true")
        }).select("input").attr({
                value:UpSetState.levelTwoDegree,
                min: 1,
                max: usedSets.length
            }).on({
                "change":function(d){
                    UpSetState.levelTwoDegree = +(d3.select(this).node().value);
                    UpSetState.forceUpdate=true;
                    updateState();
                    updateStatistics();
                    rowTransition();
                }


            })

    }


    function setUpSortSelections() {

        // groupingDefinitions
        ctx.groupingOptions[StateOpt.groupByIntersectionSize] = { name: "Degree", l1action:function(){},l2action:function(){} };
        ctx.groupingOptions[StateOpt.groupBySet]={ name: "Sets", l1action:function(){},l2action:function(){} };
        ctx.groupingOptions[StateOpt.groupByRelevanceMeasure] ={ name: "Deviation", l1action:function(){}, l2action:function(){} };
        ctx.groupingOptions[StateOpt.groupByOverlapDegree] = { name: "Overlaps", l1action:function(){}, l2action:function(){} };
        ctx.groupingOptions["dont"] ={ name: "Don't Aggregate", l1action:function(){}, l2action:function(){} };





       // ---- define L1 actions

       ctx.groupingOptions[StateOpt.groupByIntersectionSize]
           .l1action = function(){
               UpSetState.grouping = StateOpt.groupByIntersectionSize;
               UpSetState.levelTwoGrouping = undefined;
           }

       ctx.groupingOptions[StateOpt.groupBySet]
           .l1action= function () {
               UpSetState.grouping = StateOpt.groupBySet;
               UpSetState.levelTwoGrouping = undefined;
           };


        ctx.groupingOptions[StateOpt.groupByRelevanceMeasure]
            .l1action=function () {
                UpSetState.grouping = StateOpt.groupByRelevanceMeasure;
                UpSetState.levelTwoGrouping = undefined;
            };

        ctx.groupingOptions[StateOpt.groupByOverlapDegree]
            .l1action=function () {
                UpSetState.grouping = StateOpt.groupByOverlapDegree;
                UpSetState.levelTwoGrouping = undefined;
            };

        ctx.groupingOptions["dont"]
            .l1action=function () {
                UpSetState.grouping = undefined;
                UpSetState.levelTwoGrouping = undefined;
                UpSetState.forceUpdate = true;
            };


       // --- define L2 actions


        // ---------------- Grouping L2 -----------

        ctx.groupingOptions[StateOpt.groupByIntersectionSize]
            .l2action=function () {
                UpSetState.levelTwoGrouping = StateOpt.groupByIntersectionSize;
            };

        ctx.groupingOptions[StateOpt.groupBySet]
            .l2action=function () {
                UpSetState.levelTwoGrouping = StateOpt.groupBySet;
            };

        ctx.groupingOptions[StateOpt.groupByOverlapDegree]
            .l2action=function () {
                UpSetState.levelTwoGrouping = StateOpt.groupByOverlapDegree;
            };

        ctx.groupingOptions[StateOpt.groupByRelevanceMeasure]
            .l2action=function () {
                UpSetState.levelTwoGrouping = StateOpt.groupByRelevanceMeasure;
            };

        ctx.groupingOptions["dont"]
            .l2action=function () {
                UpSetState.levelTwoGrouping = undefined;
            };



        // ----------- grouping L1 -------------------------

        var l1GroupingSelect = d3.select("#firstLevelGrouping").selectAll("select").data([ctx.groupingOptions]);
        l1GroupingSelect.exit().remove(); // will not be called
        l1GroupingSelect.enter().append("select").attr({
            id: "firstLevelGroupingSelect",
            class:"groupingSelect"
        }).on({
                "change": function () {
                    var value = this.options[this.selectedIndex].value;
                    ctx.groupingOptions[value].l1action();
                    updateL2Grouping();
                    updateCardinalitySpinners();
                    updateState();
                    updateStatistics();
                    rowTransition();

                }
            });

        var l1GroupingOptions = l1GroupingSelect.selectAll("option")
            .data(function (d) {return Object.keys(d).map(function (key) { return {key: key, data: d[key]} }) });
        l1GroupingOptions.exit().remove();
        l1GroupingOptions.enter().append("option").attr({
            value:function(d){return d.key;}
        }).text(function(d){return d.data.name});

        // ----------- grouping L2 as update as it depends on L1 -------------------------
        updateL2Grouping();
        updateCardinalitySpinners();





        // ------- options ----

        d3.selectAll('#collapseAll').on(
            'click',
            function (d) {
                UpSetState.collapseAll = true;
                UpSetState.collapseChanged = true;
                updateState();
                updateStatistics();
                rowTransition();
            });

        d3.selectAll('#expandAll').on(
            'click',
            function (d) {
                UpSetState.expandAll = true;
                UpSetState.collapseChanged = true;
                updateState();
                updateStatistics();
                rowTransition();
            });

        // --------- sortings ------

        // sort based on occurrence of one specific data item
        //d3.selectAll('.sortBySet, .setLabel').on(
        //   'click',
        //    function (d) {
        //        UpSetState.sorting = StateOpt.sortBySetItem;
        //        UpSetState.grouping = undefined;
        //        UpSetState.levelTwoGrouping = undefined;
        //        updateState(d);
        //        rowTransition();
        //    });

        d3.selectAll('#sortNrSetsInIntersection').on(
            'click',
            function (d) {
                UpSetState.sorting = StateOpt.sortByCombinationSize;
//                UpSetState.grouping = undefined;
//                UpSetState.levelTwoGrouping = undefined;
                UpSetState.forceUpdate = true;
                updateState();
                rowTransition();
            });

        d3.selectAll('.sortIntersectionSizeGlobal').on(
            'click',
            function (d) {
                UpSetState.sorting = StateOpt.sortBySubSetSize;
                UpSetState.grouping = undefined;
                UpSetState.levelTwoGrouping = undefined;
                UpSetState.forceUpdate = true;
                $('#noGrouping').prop('checked', true);
                toggleGroupingL2(true);
                $('#sortIntersectionSize').prop('checked', true);

                updateState();
                rowTransition();
            });

        d3.selectAll('#sortIntersectionSize').on(
            'click',
            function (d) {
                UpSetState.sorting = StateOpt.sortBySubSetSize;
                UpSetState.forceUpdate = true;
                updateState();
                rowTransition();
            });

        // Not preserving the grouping
        d3.selectAll('.sortRelevanceMeasureGlobal').on(
            'click',
            function () {
                UpSetState.sorting = StateOpt.sortByExpectedValue;
                UpSetState.grouping = undefined;
                UpSetState.levelTwoGrouping = undefined;
                UpSetState.forceUpdate = true;
                $('#noGrouping').prop('checked', true);
                $('#sortRelevanceMeasure').prop('checked', true);
                toggleGroupingL2(true);
                updateState();
                rowTransition();
            });

        // Preserving the grouping
        d3.selectAll('#sortRelevanceMeasure').on(
            'click',
            function () {
                UpSetState.sorting = StateOpt.sortByExpectedValue;
                UpSetState.forceUpdate = true;
                updateState();
                rowTransition();
            });

    }

    document.getElementById('rowSizeValue').addEventListener('changeDataset', function () {
        ctx.cellDistance = +(document.getElementById('rowSizeValue').value);
        rowTransition();
    });

//    document.getElementById('rowPaddingValue').addEventListener('input', function () {
//        ctx.cellDistance = +(document.getElementById('rowPaddingValue').value);
//        //console.log(ctx.cellSize);
//        rowTransition();
//    });

    var rowTransition = function (animateRows) {
        if (animateRows != null) ctx.rowTransitions = animateRows;
        else ctx.rowTransitions = true;
        updateHeaders();
        plotSubSets();
        ctx.rowTransitions = true
    }

    ctx.updateHeaders = updateHeaders;
    ctx.plot = rowTransition
    ctx.plotTable = function () {
        ctx.barTransitions = false;
        plotSubSets();
        ctx.barTransitions = true;
    }

    ctx.resizeSetView = updateFrames
//    function(windowHeight, windowWidth){
//        updateFrames(windowHeight, windowWidth);
//        rowTransition(false);
//    }

    function updateFrames(windowHeight, windowWidth) {
        if (windowWidth == null) {
            d3.select(".matrixTableContainer")
                .style({
                    height: windowHeight+"px"
                })

            d3.select('#bodyVis')
                .style({
//                    height: (windowHeight-2*ctx.textHeight-40)+"px" // TODO: HACK
                    height: (windowHeight-300)+"px" // TODO: HACK
                })

//            ctx.svgBody.attr({
//                height: (windowHeight - 70)
//            })
            var tmc = d3.select(".matrixTableContainer")

            var visHeight = windowHeight - ctx.textHeight - 70;

//            ctx.foreignObject.attr({
//                height: visHeight
//            })
//
//            ctx.foreignDiv.style("height", +(visHeight - ctx.textHeight) + "px")
        } else if (windowHeight == null) {
            ctx.svgBody.attr({
                width: (Math.max(windowWidth, 400))
            })
            ctx.svgHeader.attr({
                width: (Math.max(windowWidth, 400))
            })



            var totalWidthMax = ctx.cellWidth * usedSets.length + ctx.majorPadding + ctx.leftOffset
                + ctx.subSetSizeWidthMax + ctx.expectedValueWidthMax + 50+ctx.summaryStatisticVis.length*(ctx.summaryStatisticsWidth+ctx.majorPadding);

            ctx.subSetSizeWidth = d3.scale.linear()
                .domain([totalWidthMax-(ctx.expectedValueWidthMax-100), totalWidthMax-(ctx.expectedValueWidthMax-100)-(ctx.subSetSizeWidthMax-100)]).range([ctx.subSetSizeWidthMax, 100]).clamp(true)(windowWidth);

            ctx.expectedValueWidth = d3.scale.linear()
                .domain([totalWidthMax, totalWidthMax-(ctx.expectedValueWidthMax-100)]).range([ctx.expectedValueWidthMax, 100]).clamp(true)(windowWidth);

            ctx["brushableScaleSubsetUpdate"](null, {
                width: ctx.subSetSizeWidth
            });
        }
    }

    setUpSortSelections()
    initData(ctx, [init], datasets);
//    init();

}
module.exports = {
  UpSet: UpSet,
  Ui: Ui
};
