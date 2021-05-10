// load relationships text from .csv
d3v5.csv('data/relationships.csv', d3.autoType).then(data => {
	var relationships_info = data
	console.log(relationships_info)
	
	// click handler
	$('.relationships-animal').on('click', function() {
		var animal = $(this).attr('data-animal')
		var desc = relationships_info.filter(x => x.animal == animal)[0].description
		$('#relationships-text').html(desc)
		$('#relationships-title').html(animal)
		getCitations() // add citations functionality
	})
})



