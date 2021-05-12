var mediums = ['comic', 'book', 'film', 'misc', 'game', 'music']
var bubble_nodes_moden = [
	{
		'name': 'Fantastic Mr. Fox',
		'medium': 'film',
	},
	{
		'name': 'Fox in Socks',
		'medium': 'book',
	},
	{
		'name': 'Robin Hood',
		'medium': 'film',
	},
	{
		'name': 'The Fox and the Hound',
		'medium': 'film',
	},
	{
		'name': 'Zootopia (Nick)',
		'medium': 'film',
	},
	{
		'name': 'Dora the Explorer (Swiper)',
		'medium': 'film',
	},
	{
		'name': 'Pokemon (Vulpix, Ninetails, Eevee)',
		'medium': 'game',
	},
	{
		'name': 'Chainsaw Man (Fox Devil)',
		'medium': 'comic',
	},
	{
		'name': 'Aviary Attorney (Renard)',
		'medium': 'game',
	},
	{
		'name': 'Super Smash Bros. (Fox)',
		'medium': 'game',
	},
	{
		'name': 'Ōkami',
		'medium': 'game',
	},
	{
		'name': 'Firefox browser',
		'medium': 'misc',
	},
	{
		'name': 'Fox News',
		'medium': 'misc',
	},
	{
		'name': "The Fox's Wedding",
		'medium': 'music',
	},
	{
		'name': "What Does The Fox Say?",
		'medium': 'music',
	},
	{
		'name': "Animal Crossing (Crazy Red)",
		'medium': 'game',
	},
	{
		'name': "Sonic (Tails)",
		'medium': 'game',
	},
	{
		'name': "Aggretsuko (Ookami)",
		'medium': 'film',
	},
	{
		'name': "Fantastic Mr. Fox",
		'medium': 'book',
	},
	{
		'name': "The Little Prince",
		'medium': 'book',
	},
	{
		'name': "The Jungle Book",
		'medium': 'book',
	},
]

function createBubble() {
	let width = 400
	let height = 340
	var center = { x: 0 , y: 0 }

	// create svg
	const svg = d3v5.select('#bubble-modern').append('svg')
		.attr('viewBox', [-width / 2, -height / 2, width, height])

	var colorScale = d3v5.scaleOrdinal()
		.domain(mediums)
		// .range(d3v5.schemeTableau10)
		.range(["#4e79a7", "#f28e2c", "#76b7b2", "#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"])
	
	// filter and format data
	function get_data() {
		var nodes = bubble_nodes_moden

		// format nodes info
		nodes = nodes.map(d => ({
			...d,
			radius: 30,
			size: +d.count,
			x: Math.random() * -200,
			y: Math.random() * 100
		}))

		// console.log('bubble nodes', nodes)
		return nodes
	}

	// update bubble chart
	function update() {
		nodes = get_data()

		// clear svg contents
		svg.selectAll('*').remove()

		// charge is dependent on size of the bubble, so bigger towards the middle
		function charge(d) {
			return Math.pow(d.radius, 2.0) * 0.01
		}

		const force = d3v5.forceSimulation(nodes)
			.force('charge', d3v5.forceManyBody().strength(charge))
			.force('center', d3v5.forceCenter(center.x, center.y))
			.force('x', d3v5.forceX().strength(0.07).x(center.x))
			.force('y', d3v5.forceY().strength(0.07).y(center.y))
			.force('collision', d3v5.forceCollide().radius(d => d.radius + 1))

		force.stop()
		
		// create node as circles
		var node = svg.selectAll('g')
			.data(nodes)
			.enter()
			.append('g')

		let bubbles = node.append('circle')
			.classed('bubble', true)
			.attr('class', 'node')
			.attr('r', d => d.radius)
			.attr('fill', d => colorScale(d.medium))
			.attr('opacity', 0.6)
			.call(drag(force))

		// circle labels
		let labels = node.append('text')
			.text(d => d.name)
			.style('font-size', '8px')
			.attr('class', 'nunito')
			.attr('fill', '#4d4b47')
			// .attr('x', 0)
			.attr('dy', '.2em')
			.attr('text-anchor', 'middle')
			.call(drag(force))
			// .each(insertLinebreaks)
			// .call(wrap, 300)
			// .each(wrap)

		// legend
		var legend = svg.append('g')
			.attr('class', 'legend')
			.attr('height', 100)
			.attr('width', 100)
			.attr('transform', 'translate(-20,50)')
			
		legend.selectAll('rect')
			.data(mediums)
			.enter()
			.append('rect')
			.attr('x', -180)
			.attr('y', (d,i) => (i * 10) - 200)
			.attr('width', 7)
			.attr('height', 7)
			.attr('fill', d => colorScale(d))
			.attr('opacity', 0.6)

		legend.selectAll('text')
			.data(mediums)
			.enter()
			.append('text')
			.attr('x', -180 + 10)
			.attr('y', (d,i) => (i * 10) -200 + 6)
			.attr('font-size', '8')
			// .attr('font-family', 'Nunito Sans')
			.text(function(d) {
				let text = d;
				return text;
			});

		var tooltip = d3v5.select('.tooltip')

		// // title
		// svg.append('text')
		// 	.attr('x', 0)
		// 	.attr('y', -120)
		// 	.attr('text-anchor', 'middle')
		// 	.style('font-size', '24px')
		// 	.style('fill', '#4d4b47')
		// 	.text('title')


		// called each time the simulation ticks
		// each tick, take new x and y values for each link and circle, x y values calculated by d3v5 and appended to our dataset objects
		force.on('tick', () => {
			bubbles
				.attr('cx', d => d.x)
				.attr('cy', d => d.y)

			labels
				.attr('x', d => d.x)
				.attr('y', d => d.y)
			})
			.restart()

		// console.log('UPDATED BUBBLE !')
	}

	var insertLinebreaks = function(d) {
		var el = d3.select(this);
		var words = $(this).html().split('_');
		el.text('');
	
		for (var i = 0; i < words.length; i++) {
			var tspan = el.append('tspan').text(words[i]);
			if (i > 0)
				tspan.attr('x', 0).attr('dy', '15');
				// tspan.attr('y', 0).attr('dx', '15');
		}
	};
	
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
			tspan = text.text(null).append("tspan").attr("x", 10).attr("y", y).attr("dy", dy + "em");
		while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(" "));
			if (tspan.node().getComputedTextLength() > (width-7.5)) {
			line.pop();
			tspan.text(line.join(" "));
			line = [word];
			tspan = text.append("tspan").attr("x", 10).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			}
		}
		});
	}


	// function wrap(d) {
	// 	var text = d3.select(this),
	// 	width = d.r * 2,
	// 	x = d.x,
	// 	y = d.y,
	// 	words = text.text().split(/\s+/).reverse(),
	// 	word,
	// 	line = [],
	// 	lineNumber = 0,
	// 	lineHeight = 1.1,
	// 	tspan = text.text(null).append("tspan").attr("x", x).attr("y", y);
	// 	while (word = words.pop()) {
	// 		line.push(word);
	// 		tspan.text(line.join(" "));
	// 		if (tspan.node().getComputedTextLength() > width) {
	// 			line.pop();
	// 			tspan.text(line.join(" "));
	// 			line = [word];
	// 			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + "em").text(word);
	// 		}
	// 	}
	// }

	
	update()

}

// drag
drag = simulation => {

	function dragstarted(d) {
		if (!d3v5.event.active) simulation.alphaTarget(0.3).restart()
		d.fx = d.x
		d.fy = d.y
	}

	function dragged(d) {
		d.fx = d3v5.event.x
		d.fy = d3v5.event.y
	}

	function dragended(d) {
		if (!d3v5.event.active) simulation.alphaTarget(0)
		d.fx = null
		d.fy = null
	}

	return d3v5.drag()
		.on('start', dragstarted)
		.on('drag', dragged)
		.on('end', dragended)
}

createBubble()

