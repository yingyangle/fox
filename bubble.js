var total_count = 3
var selected_type = 'nouns'
var bubble_nodes = {
	'nouns': 
	[{"name": "sly", "count": 19, "type": "character"}, {"name": "sneaky", "count": 11, "type": "character"}, {"name": "smart", "count": 8, "type": "character"}, {"name": "cute", "count": 16, "type": "character"}, {"name": "antisocial", "count": 1, "type": "character"}, {"name": "red", "count": 10, "type": "physical"}, {"name": "striped", "count": 1, "type": "physical"}, {"name": "four-legged", "count": 1, "type": "physical"}, {"name": "cunning", "count": 17, "type": "character"}, {"name": "clever", "count": 8, "type": "character"}, {"name": "deviant", "count": 1, "type": "character"}, {"name": "evil", "count": 1, "type": "character"}, {"name": "sharp", "count": 3, "type": "character"}, {"name": "tricky", "count": 2, "type": "character"}, {"name": "shrewd", "count": 1, "type": "character"}, {"name": "untrustworthy", "count": 1, "type": "character"}, {"name": "nimble", "count": 2, "type": "physical"}, {"name": "fast", "count": 7, "type": "physical"}, {"name": "devious", "count": 2, "type": "character"}, {"name": "furry", "count": 8, "type": "physical"}, {"name": "crafty", "count": 2, "type": "character"}, {"name": "frisky", "count": 2, "type": "character"}, {"name": "shifty", "count": 1, "type": "character"}, {"name": "pointy", "count": 1, "type": "physical"}, {"name": "wild", "count": 1, "type": "physical"}, {"name": "greedy", "count": 1, "type": "character"}, {"name": "beautiful", "count": 3, "type": "character"}, {"name": "orange", "count": 12, "type": "physical"}, {"name": "small", "count": 5, "type": "physical"}, {"name": "loud", "count": 1, "type": "physical"}, {"name": "territorial", "count": 1, "type": "character"}, {"name": "deceptive", "count": 1, "type": "character"}, {"name": "disguised", "count": 1, "type": "character"}, {"name": "two-faced", "count": 1, "type": "character"}, {"name": "smooth", "count": 1, "type": "physical"}, {"name": "tailed", "count": 1, "type": "physical"}, {"name": "cuddly", "count": 1, "type": "character"}, {"name": "quick", "count": 4, "type": "physical"}, {"name": "agile", "count": 1, "type": "physical"}, {"name": "soft", "count": 2, "type": "physical"}, {"name": "playful", "count": 1, "type": "character"}, {"name": "mystical", "count": 2, "type": "character"}, {"name": "scary", "count": 1, "type": "character"}, {"name": "deceitful", "count": 1, "type": "character"}, {"name": "cautious", "count": 1, "type": "character"}, {"name": "silly", "count": 1, "type": "character"}, {"name": "fluffy", "count": 4, "type": "physical"}, {"name": "happy", "count": 1, "type": "character"}, {"name": "squeaky", "count": 1, "type": "physical"}, {"name": "sleazy", "count": 1, "type": "character"}, {"name": "wily", "count": 1, "type": "character"}, {"name": "mysterious", "count": 3, "type": "character"}, {"name": "thieving", "count": 1, "type": "character"}, {"name": "stealthy", "count": 1, "type": "character"}, {"name": "snowy", "count": 1, "type": "physical"}, {"name": "curious", "count": 1, "type": "character"}, {"name": "ugly", "count": 1, "type": "physical"}, {"name": "swift", "count": 1, "type": "physical"}, {"name": "duo-toned", "count": 1, "type": "physical"}, {"name": "teethy", "count": 1, "type": "physical"}, {"name": "elegant", "count": 1, "type": "character"}, {"name": "huggable", "count": 1, "type": "character"}, {"name": "adorable", "count": 1, "type": "character"}, {"name": "squishy", "count": 1, "type": "physical"}],
	'verbs': [{"name": "bark", "count": 1}, {"name": "beguile", "count": 1}, {"name": "bite", "count": 4}, {"name": "bound", "count": 1}, {"name": "burrow", "count": 1}, {"name": "catch", "count": 1}, {"name": "chasing", "count": 2}, {"name": "cheat", "count": 1}, {"name": "claw", "count": 1}, {"name": "crafty", "count": 1}, {"name": "creep", "count": 1}, {"name": "crouch", "count": 1}, {"name": "dance", "count": 1}, {"name": "dash", "count": 2}, {"name": "deceive", "count": 2}, {"name": "dig", "count": 2}, {"name": "dive", "count": 2}, {"name": "doge", "count": 1}, {"name": "eat", "count": 9}, {"name": "float", "count": 1}, {"name": "forage", "count": 2}, {"name": "giggle", "count": 2}, {"name": "growl", "count": 2}, {"name": "guide", "count": 1}, {"name": "head", "count": 1}, {"name": "hide", "count": 8}, {"name": "hop", "count": 2}, {"name": "hunt", "count": 9}, {"name": "investigate", "count": 1}, {"name": "jump", "count": 11}, {"name": "kick", "count": 1}, {"name": "kill", "count": 3}, {"name": "laugh", "count": 4}, {"name": "leap", "count": 1}, {"name": "lie", "count": 3}, {"name": "live", "count": 1}, {"name": "look", "count": 2}, {"name": "mark", "count": 1}, {"name": "move", "count": 1}, {"name": "nap", "count": 1}, {"name": "play", "count": 2}, {"name": "plot", "count": 1}, {"name": "pounce", "count": 2}, {"name": "prowl", "count": 1}, {"name": "reach", "count": 1}, {"name": "roam", "count": 1}, {"name": "run", "count": 24}, {"name": "say", "count": 1}, {"name": "scamper", "count": 2}, {"name": "scheme", "count": 1}, {"name": "scream", "count": 1}, {"name": "shout", "count": 1}, {"name": "sleep", "count": 4}, {"name": "slink", "count": 1}, {"name": "smile", "count": 1}, {"name": "smirk", "count": 1}, {"name": "sneak", "count": 10}, {"name": "solve", "count": 1}, {"name": "squat", "count": 1}, {"name": "squeal", "count": 1}, {"name": "stalk", "count": 2}, {"name": "stare", "count": 1}, {"name": "steal", "count": 9}, {"name": "strike", "count": 1}, {"name": "survive", "count": 1}, {"name": "swipe", "count": 4}, {"name": "talk", "count": 1}, {"name": "think", "count": 1}, {"name": "throw", "count": 1}, {"name": "tiptoe", "count": 2}, {"name": "trap", "count": 1}, {"name": "trick", "count": 7}, {"name": "trot", "count": 3}, {"name": "wag", "count": 1}, {"name": "wait", "count": 1}, {"name": "watch", "count": 3}, {"name": "whine", "count": 1}, {"name": "yap", "count": 1}, {"name": "yip", "count": 1}, {"name": "zoom", "count": 1}]
}

function createBubble() {
	let width = 400
	let height = 340
	var center = { x: 0 , y: 0 }

	// create svg
	const svg = d3v5.select('#bubble').append('svg')
		.attr('viewBox', [-width / 2, -height / 2, width, height])
	
	// filter and format data
	function get_data() {
		nodes = bubble_nodes[selected_type]
		// filter nodes
		nodes = nodes.filter(x => x.count > 1)

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

