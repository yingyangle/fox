// margins
var margin = {top: 20, right: 80, bottom: 20, left: 80},
	width = 660 - margin.left - margin.right,
	height = 700 - margin.top - margin.bottom

var data = [{"name": "red", "value": 1140, "type": "physical"}, {"name": "old", "value": 573, "type": "physical"}, {"name": "little", "value": 189, "type": "physical"}, {"name": "young", "value": 141, "type": "physical"}, {"name": "gray", "value": 155, "type": "physical"}, {"name": "great", "value": 127, "type": "physical"}, {"name": "bad", "value": 91, "type": "character"}, {"name": "black", "value": 64, "type": "physical"}, {"name": "arctic", "value": 61, "type": "physical"}, {"name": "fuzzy", "value": 47, "type": "physical"}, {"name": "white", "value": 46, "type": "physical"}, {"name": "poor", "value": 44, "type": "character"}, {"name": "dead", "value": 40, "type": "physical"}, {"name": "frisky", "value": 32, "type": "character"}, {"name": "smart", "value": 32, "type": "character"}, {"name": "big", "value": 32, "type": "physical"}, {"name": "frank", "value": 32, "type": "character"}, {"name": "wise", "value": 30, "type": "character"}, {"name": "long", "value": 28, "type": "physical"}, {"name": "hungry", "value": 26, "type": "physical"}, {"name": "sly", "value": 23, "type": "character"}, {"name": "good", "value": 23, "type": "character"}, {"name": "wild", "value": 22, "type": "physical"}, {"name": "wicked", "value": 22, "type": "character"}, {"name": "cunning", "value": 21, "type": "character"}, {"name": "common", "value": 18, "type": "physical"}, {"name": "fast", "value": 17, "type": "physical"}, {"name": "large", "value": 17, "type": "physical"}, {"name": "female", "value": 16, "type": "physical"}, {"name": "alone", "value": 15, "type": "physical"}, {"name": "silver", "value": 15, "type": "physical"}, {"name": "dear", "value": 14, "type": "physical"}, {"name": "wily", "value": 14, "type": "character"}, {"name": "angry", "value": 14, "type": "character"}, {"name": "mighty", "value": 13, "type": "character"}, {"name": "clever", "value": 13, "type": "character"}, {"name": "nice", "value": 13, "type": "character"}, {"name": "northern", "value": 12, "type": "physical"}, {"name": "quick", "value": 12, "type": "physical"}, {"name": "frightened", "value": 12, "type": "character"}, {"name": "afraid", "value": 11, "type": "character"}, {"name": "crafty", "value": 10, "type": "character"}, {"name": "yellow", "value": 10, "type": "physical"}, {"name": "small", "value": 9, "type": "physical"}, {"name": "surprised", "value": 9, "type": "character"}, {"name": "foolish", "value": 7, "type": "character"}]

// sort bars based on value
data = data.sort(function (a, b) {
	return d3.ascending(a.value, b.value);
})

// draw horizontal bar chart
function drawBar(data, element) {
	// filter data
	data = data.filter(x => x.value > 20)
	// initiate svg
	var svg = d3.select(element)
		.append('svg')
		.attr('class', 'barchart')
		.attr('viewBox', [0, 0, 
			width + margin.left + margin.right, 
			height + margin.top + margin.bottom])
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

	// x scale
	var x = d3.scale.linear()
		.range([0, width])
		.domain([0, d3.max(data, function (d) {
			return d.value
		})])

	// y scale
	var y = d3.scale.ordinal()
		.rangeRoundBands([height, 0], .2)
		.domain(data.map(function (d) {
			return d.name
		}))

	// make y axis to show bar names
	var yAxis = d3.svg.axis()
		.scale(y)
		.tickSize(8) // no tick marks
		.outerTickSize(1)
		.orient('left')

	var gy = svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis)

	var bars = svg.selectAll('.bar')
		.data(data)
		.enter()
		.append('g')

	// append rects
	bars.append('rect')
		.attr('class', 'bar')
		.attr('x', 0)
		.attr('y', function (d) {
			return y(d.name)
		})
		.attr('width', function (d) {
			return x(d.value)
		})
		.attr('height', y.rangeBand())
		.attr('fill', d => {
			if (d.type == 'physical') return '#B88846' // tan-light
			else return '#EEA849' // orange
		})

	// add a value label to the right of each bar
	bars.append('text')
		.attr('class', 'label')
		// y position of the label is halfway down the bar
		.attr('y', function (d) {
			return y(d.name) + y.rangeBand() / 2 + 4
		})
		// x position is 3 pixels to the right of the bar
		.attr('x', function (d) {
			return x(d.value) + 4
		})
		.text(function (d) {
			return d.value
		})
}

// EXECUTE
drawBar(data, '#adj')
drawBar(data, '#bar1')
drawBar(data, '#bar2')
