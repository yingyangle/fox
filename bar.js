// margins
var margin = {top: 60, right: 80, bottom: 60, left: 80},
	width = 660 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom

var data = [{
		'name': 'crafty',
		'value': 20,
		'type': 'character',
},
	{
		'name': 'sneaky',
		'value': 12,
		'type': 'character',
},
	{
		'name': 'sly',
		'value': 19,
		'type': 'character',
},
	{
		'name': 'tricky',
		'value': 5,
		'type': 'character',
},
	{
		'name': 'lithe',
		'value': 16,
		'type': 'physical',
},
	{
		'name': 'orange',
		'value': 26,
		'type': 'physical',
},
	{
		'name': 'swift',
		'value': 30,
		'type': 'character',
}]

// sort bars based on value
data = data.sort(function (a, b) {
	return d3.ascending(a.value, b.value);
})

// draw horizontal bar chart
function drawBar(data, element) {
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
			if (d.type == 'physical') return '#B88846'
			else return 'orange'
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
