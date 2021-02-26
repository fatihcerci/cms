//$(function() {
//    var formula = localStorage.getItem("visualize_formula_json");
//});


function VisualNode(name, uuid, type) {
    this.name = name;
    this.uuid = uuid;
    this.type = type;
    this.children = new Array();
}



var formula = JSON.parse(localStorage.getItem("visualize_formula_json"));
var uuidValMap = JSON.parse(localStorage.getItem("visualize_uuidval_json"));

var variableMap = {};
var boxMap = {};
for (var i = 0; i < formula.variables.length; i++) variableMap[formula.variables[i].uuid] = formula.variables[i];
for (var i = 0; i < formula.layers.length; i++) {
    var layer = formula.layers[i];
    for (var j = 0; j < layer.boxes.length; j++) {
        var box = layer.boxes[j];
        boxMap[box.uuid] = box;
    }
}

var resultBox = formula.layers[0].boxes[0];
var dataResult = checkType(uuidValMap["ResultBox"]) === 'Object' ? JSON.stringify(uuidValMap["ResultBox"]) : uuidValMap["ResultBox"];
var resultBoxName = "SONUC_KUTU(" + dataResult + ")";
var rootVisualNode = new VisualNode(resultBoxName, resultBox.uuid, "box");
generateVisualNode(rootVisualNode, resultBox);

function generateVisualNode(vNode, box) {
    var inputs = box.inputs;
    var vChildNode, val, vNodeName;
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        val = uuidValMap[input.variableUUID];
        var name = variableMap[input.variableUUID] ? variableMap[input.variableUUID].name : "<Değer Adı>";
        vNodeName = name + "(" + val + ")";
        if (variableMap[input.variableUUID] && variableMap[input.variableUUID].name) {
            vChildNode = new VisualNode(vNodeName, input.variableUUID, "variable");
            vNode.children.push(vChildNode);
        }

    }

    var outputs = box.outputs;
    for (var i = 0; i < outputs.length; i++) {
        var output = outputs[i];

        var oBox = boxMap[output.variableUUID];
        if (oBox) {
            val = uuidValMap[output.variableUUID] ? uuidValMap[output.variableUUID] : "<Değer>";
            vNodeName = oBox["name"] ? oBox.name : "<Kutu>" + "(" + val + ")";
            vChildNode = new VisualNode(vNodeName, output.variableUUID, "box");
            vNode.children.push(vChildNode);
            generateVisualNode(vChildNode, boxMap[output.variableUUID]);
        }

    }
}



var margin = { top: 20, right: 120, bottom: 20, left: 120 },
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;

var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) {
        return [d.y, d.x];
    });

var svg = d3.select(".vis_area").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");





//Render Data..
root = rootVisualNode;
root.x0 = height / 2;
root.y0 = 0;

function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

root.children.forEach(collapse);
update(root);

d3.select(window.frameElement).style("height", "800px");

function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 180; });

    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function(d) {
            return d.id || (d.id = ++i);
        });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on("click", click);

    nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) {
            return d._children ? "lightsteelblue" : "#fff";
        });

    nodeEnter.append("text")
        .attr("x", function(d) {
            return d.children || d._children ? -10 : 10;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d) {
            return d.name;
        })
        .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

    nodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) {
            return d._children ? "lightsteelblue" : "#fff";
        });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link")
        .data(links, function(d) {
            return d.target.id;
        });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
            var o = { x: source.x0, y: source.y0 };
            return diagonal({ source: o, target: o });
        });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
            var o = { x: source.x, y: source.y };
            return diagonal({ source: o, target: o });
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}


// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}