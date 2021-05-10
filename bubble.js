var total_count = 3
var selected_type = 'nouns'
var bubble_nodes = {
	'nouns': 
	[
		{
			'name': 'clever',
			'type': 'character',
			'count': 16,

		},
		{
			'name': 'tricky',
			'type': 'character',
			'count': 10,

		},
		{
			'name': 'crafty',
			'type': 'character',
			'count': 10,

		},
		{
			'name': 'orange',
			'type': 'physical',
			'count': 10,

		},
		{
			'name': 'red',
			'type': 'physical',
			'count': 5,

		},
		{
			'name': 'tricky',
			'type': 'character',
			'count': 4,

		},
	],
	'verbs': [
		{
			'name': 'sneak',
			'type': 'character',
			'count': 12,

		},
		{
			'name': 'jump',
			'type': 'character',
			'count': 7,

		},
		{
			'name': 'trick',
			'type': 'character',
			'count': 5,

		},
	]
}

function createBubble() {
	let width = 400
	let height = 280
	var center = { x: 0 , y: 0 }

	// create svg
	const svg = d3v5.select('#bubble').append('svg')
		.attr('viewBox', [-width / 2, -height / 2, width, height])
	
	// filter and format data
	function get_data() {
		nodes = bubble_nodes[selected_type]
		var maxSize = d3v5.max(nodes, d => +d.count)
		var minSize = d3v5.min(nodes, d => +d.count)
		
		// size bubbles based on area
		var radiusScale = d3v5.scaleSqrt()
			.domain([minSize, maxSize])
			.range([10, 50])
		
		// format nodes info
		nodes = nodes.map(d => ({
			...d,
			radius: radiusScale(+d.count),
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
			.attr('fill', d => {
				if (d.type == 'physical') return '#B88846'
				else return '#EEA849'
			})
			.attr('opacity', 0.6)
			.call(drag(force))

		// circle labels
		let labels = node.append('text')
			.text(d => d.name)
			.style('font-size', '14px')
			.attr('class', 'nunito')
			.attr('fill', '#4d4b47')
			.attr('x', 0)
			.attr('dy', '.2em')
			.attr('text-anchor', 'middle')
			.call(drag(force))

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
	
	update()

	$('#sankey-range').on('change', () => {
		$('.sankey-node').on('click', () => {
			update()
		})
		update()
		// d3v5.select('rect[data-' + selected_type + '="' + d.name + '"]')
			
	})

	$('.sankey-node').on('click', () => {
		update()
	})

	$('#show-all-singulars').on('click', () => {
		selected_ending = ''
		selected_type = 'plural'
		selected_i = -1
		bubble_type = 'Singular'
		$('#selected-ending').html('All Singulars')
		$('#selected-type').html('')
		update()
	})

	$('#show-all-plurals').on('click', () => {
		selected_ending = ''
		selected_type = 'singular'
		selected_i = -1
		bubble_type = 'Plural'
		$('#selected-ending').html('All Plurals')
		$('#selected-type').html('')
		update()
	})

	// button handlers
	$('#bubble-nouns').on('click', () => {
		if (selected_type == 'nouns') return
		selected_type = 'nouns'
		$('#bubble-nouns').addClass('pressed')
		$('#bubble-verbs').removeClass('pressed')
		update()
	})
	$('#bubble-verbs').on('click', () => {
		if (selected_type == 'verbs') return
		selected_type = 'verbs'
		$('#bubble-nouns').removeClass('pressed')
		$('#bubble-verbs').addClass('pressed')
		update()
	})
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

