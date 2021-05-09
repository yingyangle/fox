var relationships_info = {
	'Wolf': 'Foxes and wolves are commonly described as enemies. See Isingrim the wolf from the Reynard Cycle. ',
	'Bear': 'The fox is frequently seen tricking the easily duped bear.',
	'Hare': 'Foxes hunt hares for food.',
	'Hedgehog': 'Foxes hunt hedgehogs using a clever trick.',
	'Raven': 'Foxes and ravens are allies and friends.',
	'Snake': 'Foxes and snakes are enemies.',
	'Kirkos': 'Foxes and kirkos are enemies.',
	'Bull': 'Foxes and bulls are enemies.',
	'Fish': 'Foxes use a clever trick to hunt fish..',
	'Wasp': 'Foxes use a clever trick to steal honey from the wasps.',
	'Hound': 'Foxes and hounds are enemies. Hounds are used to hunt foxes.',
	'Lion': 'Foxes and lions feature together frequently in fable, but not many real interactions are observed by natural philosophers. Foxes and lions feature together frequently in fable, but not many real interactions are observed by natural philosophers. Foxes and lions feature together frequently in fable, but not many real interactions are observed by natural philosophers. Foxes and lions feature together frequently in fable, but not many real interactions are observed by natural philosophers. Foxes and lions feature together frequently in fable, but not many real interactions are observed by natural philosophers. Foxes and lions feature together frequently in fable, but not many real interactions are observed by natural philosophers. Foxes and lions feature together frequently in fable, but not many real interactions are observed by natural philosophers. Foxes and lions feature together frequently in fable, but not many real interactions are observed by natural philosophers. Foxes and lions feature together frequently in fable, but not many real interactions are observed by natural philosophers. Foxes and lions feature together frequently in fable, but not many real interactions are observed by natural philosophers. ',
}

$('.relationships-animal').on('click', function() {
	var animal = $(this).attr('data-animal')
	$('#relationships-text').html(relationships_info[animal])
	$('#relationships-title').html(animal)
})