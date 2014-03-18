/**
 * Created by alex,nils,romain,hen
 */


var ctx = {
    majorPadding : 17,
    minorPadding : 2,
    cellDistance : 20,
    textHeight : 90,
    textSpacing : 3,

    setSizeWidth : 700,
    subSetSizeWidth : 300,

    leftOffset : 90,
    topOffset : 120,

    /** The width from the start of the set vis to the right edge */



    expectedValueWidth : 300,



    labelTopPadding : 15,

    paddingTop : 30,
    paddingSide : 20,

    truncateAfter : 25,

    setCellDistance : 12,
    setCellSize : 10,


//         subSetMatrixHeight;
//         h;
//         rowScale;

    svgHeight: 600, //height || 600;

    grays : [ '#f0f0f0', '#636363'],

    backHighlightColor:'#fed9a6',//'#fdbf6f'
    rowTransitions:true

};


//bindEvents();

function plot(){

    ctx.plot();
//    console.log("plot");
}

function UpSet(){

    // FAKE:
//    var usedSets = ["xx","zzz"];

    bindEvents();




    function setDynamicVisVariables(){
        // dynamic context variables
        ctx.cellSize = ctx.cellDistance; // - minorPadding,
        ctx.xStartSetSizes = ctx.cellDistance * usedSets.length + ctx.majorPadding;

        ctx.xStartExpectedValues = ctx.xStartSetSizes + ctx.subSetSizeWidth + 20;
        ctx.setVisWidth = ctx.expectedValueWidth + ctx.subSetSizeWidth
            + ctx.majorPadding + ctx.cellDistance + ctx.xStartSetSizes;

        console.log("viswidth",ctx);

        ctx.w =ctx.cellDistance * usedSets.length + ctx.majorPadding + ctx.leftOffset
            + ctx.subSetSizeWidth + ctx.expectedValueWidth + 50;
        ctx.setMatrixHeight = ctx.setCellDistance + ctx.majorPadding;

        ctx.intersectionClicked = function (d) {
            var selection = Selection.fromSubset(d.data);
            selections.addSelection(selection);
            selections.setActive(selection);
        }
    }

    // All global variables and SVG elements
    function init(){

        setDynamicVisVariables();

        // create SVG and VIS Element
        d3.select('#vis').select('svg').remove();
        ctx.svg = d3.select('#vis')
            .style('width', ctx.w + "px")
            .append('svg')
            .attr('width', ctx.w)
            .attr('height', ctx.svgHeight);

        ctx.vis = ctx.svg.append("g").attr({
            class: "visContainer",
            "transform": "translate(" + ctx.leftOffset + "," + ctx.topOffset + ")"
        });

        ctx.columnBackgroundNode = ctx.vis.append("g").attr({
            class:"columnBackgroundsGroup"

        })

        var foreignObject =ctx.vis.append("foreignObject")
            .attr("width", ctx.w)
            .attr("height", ctx.svgHeight)
            .attr("x", 0)//*cellSize)
            .attr("y", 210)//*cellSize)
        // Rows container for vertical panning
        ctx.gRows = foreignObject
      .append("xhtml:div")
        .style("position", "relative")
        .style("overflow-y", "scroll")
        .style("height", "600px")
        .on("mousemove", function() { 
            // Prevent global scrolling here?
        })
        .append("svg")
        .attr({
            height: subSets.length*ctx.cellSize,
            width: ctx.w //unusedSets.length*cellSize
        })
        .append('g')
            .attr({'class': 'gRows', "transform": "translate(90,-90)"})


        //####################### LogicPanel ##################################################

        ctx.logicPanelNode = ctx.vis.append("g").attr({
            class: "logicPanel",
            "transform": "translate(" + -ctx.leftOffset + "," + (ctx.textHeight + 5) + ")"
        })

        // TODO: give only context
        ctx.logicPanel = new LogicPanel(
            {width: ctx.setVisWidth + ctx.leftOffset,
                visElement: ctx.vis,
                panelElement: ctx.logicPanelNode,
                cellSize: ctx.cellSize,
                usedSets: usedSets,
                grays: ctx.grays,
                belowVis: foreignObject,
                buttonX: -ctx.leftOffset,
                buttonY: ctx.textHeight - 20,
                stateObject: UpSetState,
                subsets:subSets,
                callAfterSubmit: [updateState,rowTransition],
                ctx:ctx

            });
//            {
//                ctx:ctx
//            }
//        );

        ctx.tableHeaderNode = ctx.vis.append("g").attr({
            class:"tableHeader"
        })



        initRows();

        updateSetsLabels(ctx.tableHeaderNode);

        updateHeaders();


        plotSubSets();

        initCallback = [updateHeaders,plotSubSets] //TODO: bad hack !!!
    }

    // update svg size
    var updateSVG = function(width, height){
        ctx.w = width;
        ctx.svgHeight = height;

        ctx.svg
            .attr('width', ctx.w)
            .attr('height', ctx.svgHeight)

    }







    //####################### SETS ##################################################
    function updateSetsLabels(tableHeaderNode) {
        console.log("updatSetLabels");

        var setRowScale = d3.scale.ordinal().rangeRoundBands([0, usedSets.length * (ctx.cellDistance)],0);
        setRowScale.domain(usedSets.map(function(d){return d.id}))

        var setRows = tableHeaderNode.selectAll('.setRow')
            .data(usedSets, function(d){return d.elementName})

//        console.log("usedSets",usedSets);

        var setRowsEnter = setRows.enter()
            .append('g').attr({
                class:"setRow"
            })

        setRows.exit().remove();

        var setRects = setRows.selectAll("rect").data(function(d,i){return [d]})
           setRects.enter().append("rect").attr({
            class:"connection vertical"
           })
           .on('mouseover', mouseoverColumn)
           .on('mouseout', mouseoutColumn)


          setRects.exit().remove();

           setRects.attr({
            transform: function (d, i) {
                return 'skewX(45) translate(' + (ctx.cellDistance * i - ctx.leftOffset) + ', 0)';
            },
            width: ctx.cellSize,
            height: ctx.textHeight - 2
            })

        var setRowsText = setRows.selectAll("text").data(function(d){return [d]})
        setRowsText.enter().append("text").text(
            function (d) {
                return d.elementName.substring(0, ctx.truncateAfter);
            }).attr({
                class: 'setLabel',
                id: function (d) {
                    return d.elementName.substring(0, ctx.truncateAfter);
                },
                transform: function (d, i) {
                    return 'translate(' + (ctx.cellDistance * (i )) + ',' + (ctx.textHeight - ctx.textSpacing - 2) + ')rotate(45)';
                },
                'text-anchor': 'end'
            })
            .on('mouseover', mouseoverColumn)
            .on('mouseout', mouseoutColumn)

        setRowsText.attr({
            class: function(){if (ctx.cellSize>16) return 'setLabel'; else return 'setLabel small'}

        })



        setRows.attr({transform: function (d, i) {
//            console.log(d.id);
            return 'translate(' + setRowScale(d.id) + ', 0)';
            //  return 'translate(0, ' + ( cellDistance * (i)) + ')';
        },
            class: 'setRow'});




    }


    function updateHeaders(){
        setDynamicVisVariables()


        var tableHeaderGroup = ctx.tableHeaderNode.selectAll(".tableHeaderGroup").data([1]);
        var tableHeader = tableHeaderGroup.enter().append("g").attr({class:"tableHeaderGroup"});

        // ------------------- set size bars header --------------------

        // *** init Part
        tableHeader.append('rect')
            .attr({
                id:"subSetSizeLabelRect",
                class: 'labelBackground subsetSizeLabel sortIntersectionSizeGlobal'
            }).on(
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
            })
        ;

        tableHeader.append('text').text('Intersection Size')
            .attr({
                id:"subSetSizeLabelText",
                class: 'columnLabel subsetSizeLabel sortIntersectionSizeGlobal',
                "pointer-events": "none"
            });

        tableHeader.append('g').attr()
            .attr({
                id:"subSetSizeAxis",
                class: 'axis'
            });


        // *** update Part

        tableHeaderGroup.selectAll("#subSetSizeLabelRect").attr({
            transform: 'translate(' + ctx.xStartSetSizes + ',' + (ctx.labelTopPadding) + ')',
            height: '20',
            width: ctx.subSetSizeWidth
        });

        tableHeaderGroup.selectAll("#subSetSizeLabelText").attr({
            transform: 'translate(' + (ctx.xStartSetSizes + ctx.subSetSizeWidth / 2) + ','
                + (ctx.labelTopPadding + 10) + ')'
        });

        // scale for the size of the plottingSets TODO --> make own function
        ctx.subSetSizeScale = d3.scale.linear().domain([0, d3.max(dataRows, function (d) {
            return d.setSize;
        })]).nice().range([0, ctx.subSetSizeWidth]);

        var subSetSizeAxis = d3.svg.axis().scale(ctx.subSetSizeScale).orient('top').ticks(4);

        tableHeaderGroup.selectAll("#subSetSizeAxis").transition().attr({
            transform: 'translate(' + ctx.xStartSetSizes + ',' + (ctx.textHeight - 5) + ')'
        }).call(subSetSizeAxis);



        // ------------ expected value header -----------------------


        // *** init Part
        tableHeader.append('rect')
            .attr({
                id:"expectedValueLabelRect",
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

        tableHeader.append('text').text('Relevance')
            .attr({
                id:"expectedValueLabelText",
                class: 'columnLabel sortRelevanceMeasureGlobal',
                "pointer-events": "none"
            });

        tableHeader.append('g').attr()
            .attr({
                id:"expectedValueAxis",
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
            return d.expectedValueDeviation;
        });
        if (minDeviation > 0) {
            minDeviation = 0;
        }
        var maxDeviation = d3.max(dataRows, function (d) {
            return d.expectedValueDeviation;
        });

        ctx.expectedValueScale = d3.scale.linear().domain([minDeviation, maxDeviation]).nice().range([0, ctx.expectedValueWidth]);

        var expectedValueAxis = d3.svg.axis().scale(ctx.expectedValueScale).orient('top').ticks(4);

        tableHeaderGroup.select("#expectedValueAxis").transition().attr({
            transform: 'translate(' + ctx.xStartExpectedValues + ',' + (ctx.textHeight - 5) + ')'
        }).call(expectedValueAxis);


        updateSetsLabels(ctx.tableHeaderNode)

    }


    function initRows() {

        ctx.subSetMatrixHeight = renderRows.length * ctx.cellDistance;
        ctx.h = ctx.subSetMatrixHeight + ctx.textHeight;

        ctx.rowScale = d3.scale.ordinal().rangeRoundBands([ ctx.textHeight, ctx.h ], 0,0);

        ctx.rowScale.domain(renderRows.map(function (d) {
            return d.id;
        }));
    }


    function updateSubSetGroups(){
        // ------------------- the rows -----------------------
        var subSets = ctx.gRows.selectAll('.row')
            .data(renderRows, function (d, i) {
                return d.id;
            });

        subSets
            .enter()
            .append('g')
            .attr({transform: function (d) {
                if (d.data.type === ROW_TYPE.SUBSET)
                    return 'translate(0, ' + ctx.rowScale(d.id) + ')';
                else
                    return 'translate(0, ' + ctx.textHeight + ')';
            }, class: function (d) {
                return 'row ' + d.data.type;
            }
            }).style("opacity", function (d) {
                if (d.data.type === ROW_TYPE.SUBSET)
                    return ctx.gRows.selectAll('.row')[0].length == 0 ? 1 : 0;
                else
                    return ctx.gRows.selectAll('.row')[0].length ? 0 : 1;
            })

        subSets.exit().remove();


        var subSetTransition = subSets;
        if (ctx.rowTransitions)
            subSetTransition= subSets
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




        /*
         // add transparent background to make each row it sensitive for interaction
         combinationRows.selectAll('.backgroundRect').data(function (d) {
         return [d]
         })
         .enter().append("rect").attr({
         class: "backgroundRect",
         x: 0,
         y: 0,
         width: setVisWidth,
         height: cellSize
         })
         .style({
         "fill-opacity": 0,
         fill: "grey" // for debugging
         })
         .on({
         'mouseover': mouseoverRow,
         'mouseout': mouseoutRow
         });
         */

        return subSets;
    }

    function updateSubsetRows(subsetRows, setScale) {

        var backgrounds = subsetRows.selectAll(".backgroundRect").data(function(d){return [d]})
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
                fill:ctx.backHighlightColor // for debugging
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



        var combinationGroups = subsetRows.selectAll('g').data(function (d) {
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
            return d.map(function(dd,i){return {data: usedSets[i], value:dd}});
        })
        // ** init
        cells.enter()
            .append('circle')
            .on({
                'click': function (d) {

                    /* click event for cells*/
                },
                'mouseover': function(d,i){
                    mouseoverCell(d3.select(this).node().parentNode.parentNode.__data__,i)
                },
                'mouseout': mouseoutCell
            })
        cells.exit().remove()

        //** update
        cells.attr('cx', function (d, i) {
            return (ctx.cellDistance) * i + ctx.cellSize / 2;
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
        )
        //**init
        cellConnectors.enter().append("line").attr({
            class: "cellConnector",
            "pointer-events": "none"
        })
            .style({
                "stroke": setScale(1),
                "stroke-width": 3
            })
        cellConnectors.exit().remove();

        //**update
        cellConnectors.attr({
            x1: function (d) {
                return (ctx.cellDistance) * d[0] + ctx.cellSize / 2;
            },
            x2: function (d) {
                return (ctx.cellDistance) * d[1] + ctx.cellSize / 2;
            },
            y1: ctx.cellSize / 2,
            y2: ctx.cellSize / 2
        })

        /// --- the sizeBar


        var sizeBars = subsetRows.selectAll(".row-type-subset").data(function(d){return [d]})
            sizeBars.enter()
                .append('rect')
                .attr("class",  'subSetSize row-type-subset')
                .attr({
                    transform: function (d) {
                        var y = 1;
                        return   'translate(' + ctx.xStartSetSizes + ', ' + y + ')'; // ' + (textHeight - 5) + ')'
                    },

                    width: function (d) {
                        return ctx.subSetSizeScale(d.data.setSize);
                    },
                    height: function (d) {
                       return ctx.cellSize-2
                    }
                })
                .on('click', function (d) {
                    ctx.intersectionClicked(d);
                })
                .on('mouseover', mouseoverRow)
                .on('mouseout', mouseoutRow)
            sizeBars.exit().remove();

            sizeBars.transition().attr({
                //class: 'subSetSize',
                transform: function (d) {
                    var y = 1;
                    return   'translate(' + ctx.xStartSetSizes + ', ' + y + ')'; // ' + (textHeight - 5) + ')'
                },

                width: function (d) {
                    return ctx.subSetSizeScale(d.data.setSize);
                },
                height: function (d) {
                   return ctx.cellSize-2
                }
            })




    }

    function updateGroupRows(groupRows) {
        var groupsRect = groupRows.selectAll(".groupBackGround").data(function (d) {
            return [d];
        });
        //**init
        groupsRect.enter().append('rect').attr({
            class: 'groupBackGround',
            width: ctx.setVisWidth + ctx.leftOffset,
            height: ctx.cellSize,
            x: -ctx.leftOffset,
            y: 0
        }).on('click', function (d) {
                collapseGroup(d.data);
                rowTransition(false);
            });

        groupsRect.exit().remove();
        //**update
        groupsRect.attr({
            width: function(){return ctx.setVisWidth + ctx.leftOffset},
            height: ctx.cellSize,
            x: -ctx.leftOffset
        });

        //  console.log('g2: ' + groups);
        var groupsText = groupRows.selectAll("text").data(function (d) {
            return [d];
        });
        groupsText.enter().append('text')
            .attr({class: 'groupLabel',
                y: ctx.cellSize - 3,
                x: -ctx.leftOffset,
                'font-size': ctx.cellSize - 6

            });
        groupsText.exit().remove();

        //** update
        groupsText.text(function (d) {
            if (d.data.type === ROW_TYPE.GROUP)
                return d.data.elementName;
            else if (d.data.type === ROW_TYPE.AGGREGATE)
                return String.fromCharCode(8709) + '-subsets (' + d.data.subSets.length + ') ';
        }).attr({
                class: function(){if (ctx.cellDistance<14) return 'groupLabel small'; else return 'groupLabel'},
                y: ctx.cellSize - 3,
                x: -ctx.leftOffset,
                'font-size': ctx.cellSize - 6
            }).on('click', function (d) {
                collapseGroup(d.data);
                rowTransition(false);
            });
    }

    function updateRelevanceBars(allRows) {
        var expectedValueBars = allRows.selectAll(".expectedValueDeviation").data(function (d) {
            return [d]
        })

        expectedValueBars.enter()
            .append('rect')
            .attr({
                transform: function (d) {
                    var start = ctx.expectedValueScale(d3.min([0, d.data.expectedValueDeviation]));
                    start += ctx.xStartExpectedValues;
                    var y = 0;
                    if (d.data.type !== ROW_TYPE.SUBSET)
                        y = 1;//cellSize / 3 * 1.7;
                    return 'translate(' + start + ', ' + y + ')';
                },
                width:1,
                height: function (d) {
                    if (d.data.type === ROW_TYPE.SUBSET)
                        return ctx.cellSize-2;
                    else
                        return ctx.cellSize;// / 3;
                }
            })
            .on('mouseover', mouseoverRow)
            .on('mouseout', mouseoutRow)

        expectedValueBars.exit().remove()

        // transition for subsets
        changeTheValues(expectedValueBars.filter(function(d){
            return (d.data.type === ROW_TYPE.SUBSET)
        }).transition())

        // no transition for groups
        changeTheValues(expectedValueBars.filter(function(d){
            return (d.data.type !== ROW_TYPE.SUBSET)
        }))
//        expectedValueBars.transition()

        function changeTheValues(node){
            node.attr({
                class: function (d) {
                    return d.data.expectedValueDeviation < 0 ? 'expectedValueDeviation negative' : 'expectedValueDeviation positive';
                },
                transform: function (d) {
                    var start = ctx.expectedValueScale(d3.min([0, d.data.expectedValueDeviation]));
                    start += ctx.xStartExpectedValues;
                    var y = 0;
                    if (d.data.type == ROW_TYPE.SUBSET)
                        y = 1;//cellSize / 3 * 1.7;
                    return 'translate(' + start + ', ' + y + ')';
                },
                width: function (d) {
                    //  console.log(d.data.expectedValueDeviation)
                    return Math.abs(ctx.expectedValueScale(d.data.expectedValueDeviation) - ctx.expectedValueScale(0));
                },
                height: function (d) {
                    if (d.data.type === ROW_TYPE.SUBSET)
                        return ctx.cellSize-2;
                    else
                        return ctx.cellSize;// / 3;
                }
            })
        }
    }

    function updateOverlays(allRows) {
        if (selections.getSize() == 0) {
            allRows.selectAll(".what").remove();
            allRows.selectAll('.selectionIndicators').remove();
            return;
        }

        var selectionOverlay = allRows.selectAll(".what").data(function (d) {
            return [d]
        })
        selectionOverlay.enter().append('rect')
            .on('click', function (d) {
                if (d.data.type === ROW_TYPE.SUBSET) {
                    var selection = Selection.fromSubset(d.data);
                    selections.addSelection(selection);
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
                    if (d.data.type !== ROW_TYPE.SUBSET)
                        y = 0; //cellSize / 3 * .4;
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
                    d3.select(this).style("fill", selections.getColorFromUuid(usedID));
                    return   ctx.subSetSizeScale(s[usedID].length);
                },
                height: function (d) {
                    if (d.data.type === ROW_TYPE.SUBSET)
                        return ctx.cellSize;
                    else
                        return ctx.cellSize// / 3;

                }
            })


        // the triangles for the multiple selections

        var selectIndicators = allRows.selectAll('.selectionIndicators').data(function (d, i) {
            if (!d.data.selections)
                return [];
            var selectionIDs = Object.getOwnPropertyNames(d.data.selections);
            var selArray = selectionIDs.map(function (k) {
                return {uuid: k, items: d.data.selections[k]};
            });
            selArray = selArray.filter(function (d) {
                return d.items.length !== 0;
            })
            return selArray;
        })
        selectIndicators.enter()
            .append('path').attr({
                class: 'selectionIndicators'
            }).on('click', function (d) {
                selections.setActiveByUuid(d.uuid);
                updateOverlays(allRows);
            })
        selectIndicators.exit().remove();
        selectIndicators.attr({
            transform: function (d, i) {

                return 'translate(' + (ctx.xStartSetSizes + ctx.subSetSizeScale(d.items.length)) + ' , ' + 0 +
                    ')';
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

        barLabels.text(function (d) {
            return d.data.setSize;
        }).transition().attr({class: 'intersectionSizeText intersectionSizeLabel',
                y: ctx.cellSize /2,
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
                opacity:0
            })
        columnBackgrounds.exit().remove();
        columnBackgrounds.attr({
            'x': function (d, i) {
                return (ctx.cellDistance) * i ;
            },
            y: ctx.textHeight,
            height: ctx.h, //TODO: better value there
            width: ctx.cellDistance
        })
    }

    function plotSubSets() {

        setDynamicVisVariables();
        initRows();

        updateColumnBackgrounds();

        // generate <g> elements for all rows
        var allRows= updateSubSetGroups()

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


        // TODO: @Romain -- experiments??
        groupRows.each(function (e, j) {

            var g = d3.select(this);
            var max_scale = ctx.subSetSizeScale.domain()[1] - 10;

            var i = 0;
            var nbLevels = Math.ceil(e.data.setSize / max_scale);
            var data = d3.range(Math.ceil(e.data.setSize / max_scale)).map(function () {
                var f = JSON.parse(JSON.stringify(e))
//                console.log(e, f, i, e.data.setSize)
                if (i == nbLevels - 1)
                    f.data.setSize = (f.data.setSize % max_scale);
                else
                    f.data.setSize = max_scale;
//                console.log("aaa", i, nbLevels, f.data.setSize)
                i++;
                return f;
            })

            g.selectAll(".row-type-group").data(data).enter().append('rect')
                .on('click', function (d) {
                    var selection = Selection.fromSubset(d.data.subSets);
                    selections.addSelection(selection);
                    selections.setActive(selection);
                })
                .attr("class", function (d) {
                    return ( 'subSetSize row-type-group' );

                })
                .attr({
                    //class: 'subSetSize',
                    transform: function (d) {
                        var y = 0;
                        if (d.data.type !== ROW_TYPE.SUBSET)
                            y = 0;//cellSize / 3 * .4;
                        return   'translate(' + ctx.xStartSetSizes + ', ' + y + ')'; // ' + (textHeight - 5) + ')'
                    },

                    width: function (d) {
                        return ctx.subSetSizeScale(d.data.setSize);
                    },
                    height: function (d, i) {
                        return ctx.cellSize;
                    }
                })
                .style("opacity", function (d, i) {
                    return .5 + .5 * i / nbLevels;
                })
                .on('mouseover', mouseoverRow)
                .on('mouseout', mouseoutRow);




        })
//
        // Rendering the highlights and ticks for selections on top of the selected subsets
        updateOverlays(allRows);

        // ----------------------- expected value bars -------------------

        updateRelevanceBars(allRows);


//        // -------------------- panning -------------------
//
//        function panning(d) {
//
//            //    console.log("pann", d, d.y)
//            d3.event.scale = 1
//            var dy = d3.event.translate[0] - prev_y;
//            prev_y = d3.event.translate[0];
//
//            //    console.log("pann", d, d.y, dy, d3.event.translate, d3.event.translate*d3.event.scale)
//
//            d.y += dy;
//            d.y = Math.max(0, d.y);
//
//            // d.y = Math.min(Math.min(0, d.y), params.viewportHeight - params.rowsHeight);
//
//            var offset = params.viewportHeight - params.rowsHeight;
//            var offsetRemain = Math.min(params.viewportHeight - params.rowsHeight, 0);
//            //d.y = Math.min(0, d.y+offsetRemain);
//            //    console.log("ssss", d, d.y, d.y+offsetRemain, offsetRemain , d3.event.scale)
//
//            // console.log("trans", trans, Math.min(0, d3.event.translate[0]), Math.max(0, params.rowsHeight - params.viewportHeight))
//
//            // d3.event.translate[0] = Math.min(0, d3.event.translate[0]);
//            //if(params.rowsHeight>params.viewportHeight) {
//
//            // Moving rows containing the subsets
//            d3.select(this).attr('transform', 'translate(0, ' + -d.y + ')');
//
//            // Rows background should stick to his place
//            d3.select(".background-subsets").attr('transform', function (d, i) {
//                return 'translate(' + [ 0, d.y] + ')'
//            })
//
//            // Update the scrollbar
//            //scrollbar.setValue(d3.event.translate[0]);
//
//            //  console.log(params.rowsHeight, params.viewportHeight, subSets.length, setGroups.length, d3.transform(d3.select(this).attr("transform")).translate[1], trans)
//
//        }
//
//        /*
//         var pan = d3.behavior.zoom()
//         //  .scaleExtent([0, 10])
//         .on('zoom', panning);
//
//         var prev_y = 0;
//         d3.select('.gRows').call(pan);
//         */
//
//        // -------------------- scrollbar -------------------
//
//        /*
//         params = {
//         x: w - 20 - leftOffset,
//         y: 85,
//         height: svgHeight - 205,
//         viewportHeight: svgHeight - 210,
//         rowsHeight: subSetMatrixHeight,
//         parentEl: d3.select('.gScroll')
//         }
//
//         var scrollbar = new Scrollbar(params);
//         */

    }



    function bindEvents() {
        $(EventManager).bind("item-selection-added", function (event, data) {
            // console.log("Selection was added to selection list with color " + selections.getColor(data.selection) + ' and ' + data.selection.items.length + ' items.');

            data.selection.mapToSubsets(subSets);

            plotSelectionTabs("#selection-tabs", selections, data.selection);
            plotSelectedItems("#item-table", data.selection);
        });

        $(EventManager).bind("item-selection-updated", function (event, data) {
            //console.log('Selection was updated! New length is ' + data.selection.items.length + ' items.');

            data.selection.mapToSubsets(subSets);
            plot();
            plotSelectionTabs("#selection-tabs", selections, data.selection);
            plotSelectedItems("#item-table", data.selection);
            plotSetOverview();
        });

        $(EventManager).bind("item-selection-removed", function (event, data) {
//    console.log("Selection was removed from selection list.");

            data.selection.unmapFromSubsets(subSets);

            plot();
            plotSelectionTabs("#selection-tabs", selections, selections.getActive());
            plotSelectedItems("#item-table", selections.getActive());
            plotSetOverview();
        });

        $(EventManager).bind("item-selection-activated", function (event, data) {
            if (data.selection) {
                //       console.log('Selection ' + data.selection.id + ' was activated.');

                plot();
                plotSelectionTabs("#selection-tabs", selections, data.selection);
                plotSelectedItems("#item-table", data.selection);
                plotSetOverview();
            }
            else {
                plot();
                plotSelectionTabs("#selection-tabs", selections, data.selection);
                plotSelectedItems("#item-table", data.selection);
                plotSetOverview();
            }
        });

        $(EventManager).bind("ui-resize", function (event, data) {
            plot(Math.floor(data.newWidth * .66), Math.floor(data.newHeight));
            plotSetOverview();
        });

        $(EventManager).bind("ui-vertical-resize", function (event, data) {
            plot(undefined, Math.floor(data.newHeight));
            plotSetOverview();
        });

        $(EventManager).bind("ui-horizontal-resize", function (event, data) {
            plot(Math.floor(data.newWidth * .66), undefined);
            plotSetOverview();
        });

        $(EventManager).bind("loading-dataset-started", function (event, data) {
            $(".ui-fader").show();
            $("#data-loading-indicator").show();
        });

        $(EventManager).bind("loading-dataset-finished", function (event, data) {
            $(".ui-fader").fadeOut(1000);
            $("#data-loading-indicator").fadeOut(1000);
        });

        $(EventManager).bind("set-added", function (event, data) {
            if ( usedSets.length === 2 || usedSets.length === 3 ) {
                $("#venn-diagram-viewer").fadeIn( 500 );
                venn.plot(undefined, usedSets.length);
            }

            if ( usedSets.length !== 2 && usedSets.length !== 3 ) {
                $("#venn-diagram-viewer").fadeOut( 500 );
            }
        });

        $(EventManager).bind("set-removed", function (event, data) {
            if ( usedSets.length === 2 || usedSets.length === 3 ) {
                $("#venn-diagram-viewer").fadeIn( 500 );
                venn.plot(undefined, usedSets.length);
            }

            if ( usedSets.length !== 2 && usedSets.length !== 3 ) {
                $("#venn-diagram-viewer").fadeOut( 500 );
            }
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
    }

    function disableL2Equivalent(id) {
        var l2 = $(id);
        if (l2.prop('checked')) {
            $('#noGroupingL2').prop('checked', true);
        }
        l2.prop('disabled', true);
    }

    function setUpSortSelections() {


        // ----------- grouping L1 -------------------------

        d3.selectAll('#groupByIntersectionSize').on(
            'click',
            function (d) {
                UpSetState.grouping = StateOpt.groupByIntersectionSize;
                UpSetState.levelTwoGrouping = undefined;
                toggleGroupingL2(false);
                disableL2Equivalent('#groupByIntersectionSizeL2');

                updateState();
                rowTransition();
//                d3.selectAll('#groupByIntersectionSizeL2').attr('disabled', true);
            });

        d3.selectAll('#groupBySet').on(
            'click',
            function (d) {
                UpSetState.grouping = StateOpt.groupBySet;
                UpSetState.levelTwoGrouping = undefined;
                toggleGroupingL2(false);
                disableL2Equivalent('#groupBySetL2');

                updateState();
                rowTransition();
            });

        d3.selectAll('#groupByRelevanceMeasure').on(
            'click',
            function (d) {
                UpSetState.grouping = StateOpt.groupByRelevanceMeasure;
                UpSetState.levelTwoGrouping = undefined;
                toggleGroupingL2(false);
                disableL2Equivalent('#groupByRelevanceMeasureL2');
                updateState();
                rowTransition();
            });

        d3.selectAll('#noGrouping').on(
            'click',
            function (d) {
                UpSetState.grouping = undefined;
                UpSetState.levelTwoGrouping = undefined;
                UpSetState.forceUpdate = true;

                toggleGroupingL2(true);

                updateState();
                rowTransition();
            });

        // ---------------- Grouping L2 -----------

        d3.selectAll('#groupByIntersectionSizeL2').on(
            'click',
            function (d) {
                UpSetState.levelTwoGrouping = StateOpt.groupByIntersectionSize;
                updateState();
                rowTransition();
            });

        d3.selectAll('#groupBySetL2').on(
            'click',
            function (d) {
                UpSetState.levelTwoGrouping = StateOpt.groupBySet;
                updateState();
                rowTransition();
            });

        d3.selectAll('#groupByRelevanceMeasureL2').on(
            'click',
            function (d) {
                UpSetState.levelTwoGrouping = StateOpt.groupByRelevanceMeasure;
                updateState();
                rowTransition();
            });

        d3.selectAll('#noGroupingL2').on(
            'click',
            function (d) {
                UpSetState.levelTwoGrouping = undefined;
                updateState();
                rowTransition();
            });

        // ------- options ----

        d3.selectAll('#collapseAll').on(
            'click',
            function (d) {
                UpSetState.collapseAll = true;
                UpSetState.collapseChanged = true;
                updateState();
                rowTransition();
            });

        d3.selectAll('#expandAll').on(
            'click',
            function (d) {
                UpSetState.expandAll = true;
                UpSetState.collapseChanged = true;
                updateState();
                rowTransition();
            });

        // --------- sortings ------

        // sort based on occurrence of one specific data item
        d3.selectAll('.setLabel').on(
            'click',
            function (d) {

                UpSetState.sorting = StateOpt.sortBySetItem;
                UpSetState.grouping = undefined;
                UpSetState.levelTwoGrouping = undefined;
                updateState(d);
                rowTransition();
            });

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




    document.getElementById('rowSizeValue').addEventListener('input', function(){
        ctx.cellDistance= +(document.getElementById('rowSizeValue').value);
        console.log(ctx.cellSize);
        rowTransition();
    });

    var rowTransition = function(animateRows) {
        if (animateRows !=null) ctx.rowTransitions= animateRows;
        else ctx.rowTransitions= true;
        updateHeaders();
        plotSubSets();
        ctx.rowTransitions=true
    }


    bindEvents()
    setUpSortSelections()
    initData(ctx, [init]);
    ctx.updateHeaders = updateHeaders;
    ctx.plot = rowTransition
//    init();

}

UpSet();

