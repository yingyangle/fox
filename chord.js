var opacityValueBase = 0.7
var matrix, group_labels, interactions

// chord diagram name labels and colors
// var group_labels = ['dog', 'donkey', 'eagle', 'farmer', 'fox', 'hermes', 'lion', 'man', 'sheep', 'snake', 'wolf', 'zeus']
var colors = ['#C4C4C4','#69B40F','#EC1D25','#C8125C','#008FC8','#10218B','#134B24','#737373', ]

// // chord diagram matrix data
// var matrix = [
// 	[0, 2, 0, 0, 2, 1, 1, 3, 4, 0, 5, 0], 
// 	[2, 0, 0, 0, 2, 0, 7, 2, 0, 0, 2, 0], 
// 	[0, 0, 0, 2, 3, 0, 1, 0, 0, 1, 0, 0], 
// 	[0, 0, 2, 0, 1, 0, 2, 0, 0, 3, 1, 0], 
// 	[2, 2, 3, 1, 0, 0, 11, 1, 0, 0, 7, 0], 
// 	[1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0], 
// 	[1, 7, 1, 2, 11, 0, 0, 2, 1, 0, 3, 0], 
// 	[3, 2, 0, 0, 1, 3, 2, 0, 0, 0, 1, 1], 
// 	[4, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0], 
// 	[0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 1], 
// 	[5, 2, 0, 1, 7, 0, 3, 1, 5, 0, 0, 0], 
// 	[0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0]
// ]

// load data
d3.json('data/chord_data.json', function (error, data) {
	console.log(data)
	group_labels = data['characters']
	matrix = data['matrix']
	interactions = data['interactions']

	// EXECUTE
	drawChord()
})

function drawChord() {
		
	// color scale
	var colorScale = d3.scale.ordinal()
		.domain(d3.range(group_labels.length))
		.range(colors)
		
	// margins
	var margin = {top: 30, right: 25, bottom: 20, left: 25},
		width = 650 - margin.left - margin.right,
		height = 600 - margin.top - margin.bottom,
		innerRadius = Math.min(width, height) * .39,
		outerRadius = innerRadius * 1.1 // change multiply factor to change node width

	// initiate svg
	var svg = d3.select('#fable-interactions').append('svg:svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('svg:g')
		.attr('transform', 'translate(' + (margin.left + width/2) + ',' + (margin.top + height/2) + ')')

	// initiate chord diagram
	var chord = d3.layout.chord()
		.padding(.06)
		.sortSubgroups(d3.descending) // sort chords inside each arc from high to low
		.sortChords(d3.descending) // which chord is shown on top when chords cross -> biggest chord at bottom
		.matrix(matrix)

	// outer arcs
	var arc = d3.svg.arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius)
		
	var g = svg.selectAll('g.group')
		.data(chord.groups)
		.enter()
		.append('svg:g')
		.attr('class', 'group')
		.attr('data-character', d => group_labels[d.index])
		
	g.append('svg:path')
		.attr('class', 'arc')
		.style('stroke', function(d) { return colorScale(d.index); })
		.style('fill', function(d) { return colorScale(d.index); })
		.attr('d', arc)

	// node labels
	g.append('svg:text')
		.each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
		.attr('dy', '.35em')
		.attr('class', 'titles')
		.attr('text-anchor', function(d) { return d.angle > Math.PI ? 'end' : null; })
		.attr('transform', function(d) {
				return 'rotate(' + (d.angle * 180 / Math.PI - 90) + ')'
				+ 'translate(' + (innerRadius + 30) + ')' // add to innerRadius to adjust spacing
				+ (d.angle > Math.PI ? 'rotate(180)' : '')
		})
		.text(function(d,i) { return group_labels[i]; });  

	// inner chords
	var chords = svg.selectAll('path.chord')
		.data(chord.chords)
		.enter().append('svg:path')
		.attr('class', 'chord')
		.style('stroke', function(d) { return d3.rgb(colorScale(d.source.index)).darker(); })
		.style('fill', function(d) { return colorScale(d.source.index); })
		.style('fill-opacity', opacityValueBase)
		.attr('d', d3.svg.chord().radius(innerRadius))
	// show all arcs
	svg.selectAll('g.group').select('path')
		.style('opacity', opacityValueBase + 0.1)
	// show all chords
	chords.style('opacity', opacityValueBase)

	// show all the text
	d3.selectAll('g.group')
		.selectAll('line')
		.style('stroke','#000')
	// show names of each arc
	svg.selectAll('g.group')
		.selectAll('.titles')

	// // hover fade effect for each group
	// d3.selectAll('.group')
	// 	.on('mouseover', fade(0.1))
	// 	.on('mouseout', fade(opacityValueBase))
	// // hover fade effect for each path link
	// d3.selectAll('path.chord')
	// 	.on('mouseover', fadePath(0.1))
	// 	.on('mouseout', fadePath(opacityValueBase))

	
	// hover fade effect for each group
	d3.selectAll('.group')
		.on('mouseover', (d,i) => {
			fade(0.1, d, i)
			var chara = group_labels[d.index]
			var count = Object.values(interactions[chara]).reduce((a, b) => a + b, 0)
			$('#tooltip')
				.css('opacity', 0.9)
				.css('left', (event.pageX + 20) + 'px')
				.css('top', (event.pageY + 20) + 'px')
				.html(`${count} fables featuring ${chara}`)
		})
		.on('mousemove', d => {
			$('#tooltip')
				.css('opacity', 0.9)
				.css('left', (event.pageX + 20) + 'px')
				.css('top', (event.pageY + 20) + 'px')
		})
		.on('mouseout', (d,i) => {
			fade(opacityValueBase, d, i)
			$('#tooltip').css('opacity', 0)
		})
	// hover fade effect for each path link
	d3.selectAll('path.chord')
		.on('mouseover', (d,i) => {
			fadePath(0.1, d, i)
			var source = group_labels[d.source.index]
			var target = group_labels[d.target.index]
			var count = matrix[d.source.index][d.target.index]
			$('#tooltip')
				.css('opacity', 0.9)
				.css('left', (event.pageX + 20) + 'px')
				.css('top', (event.pageY + 20) + 'px')
				.html(`${count} fables featuring ${source} and ${target}`)
		})
		.on('mousemove', d => {
			$('#tooltip')
				.css('opacity', 0.9)
				.css('left', (event.pageX + 20) + 'px')
				.css('top', (event.pageY + 20) + 'px')
		})
		.on('mouseout', (d,i) => {
			fadePath(opacityValueBase, d, i)
			$('#tooltip').css('opacity', 0)
		})

	/*//////////////////////////////////////////////////////////
	////////////////// Extra Functions /////////////////////////
	//////////////////////////////////////////////////////////*/

	// returns an event handler for fading a given chord group
	function fade(opacity, d, i) {
		svg.selectAll('path.chord')
				.filter(d => d.source.index != i && d.target.index != i)
				.transition()
				.duration(70)
				.style('stroke-opacity', opacity)
				.style('fill-opacity', opacity)
	}

	// returns an event handler for fading a given path
	function fadePath(opacity, d, i) {
		var source = d.source.index
			var target = d.target.index
			svg.selectAll('path.chord')
				.filter(d => d.source.index != source || d.target.index != target)
				.transition()
				.duration(70)
				.style('stroke-opacity', opacity)
				.style('fill-opacity', opacity)
	}

	// taken from http://bl.ocks.org/mbostock/7555321
	// wrap svg text
	function wrap(text, width) {
		var text = d3.select(this)[0][0],
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.4, 
			y = text.attr('y'),
			x = text.attr('x'),
			dy = parseFloat(text.attr('dy')),
			tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em')
			
		while (word = words.pop()) {
			line.push(word)
			tspan.text(line.join(' '))
			if (tspan.node().getComputedTextLength() > width) {
				line.pop()
				tspan.text(line.join(' '))
				line = [word]
				tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word)
			}
		}
	}

}
