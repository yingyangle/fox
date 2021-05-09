var sources_dict = {
	'aristotle-gen': 1,
}

var sources = $('#sources-list li')
console.log(sources)

$('.citation').each(function(d) {
	// get reference number
	var source = $(this).attr('data-source')
	if (!(source in sources_dict)) source = 3
	else source = sources_dict[source]
	$(this).html(source)
	// hover text
	$(this).on('mouseover mousemove', () => {
		var tooltip_text = $(this).attr('data-tooltip')
		console.log(tooltip_text)
		$('#tooltip').html(tooltip_text)
	})

	// find source in bibliography
	if ($(this).hasClass('sources-citation')) {
		$(this).on('click', () => {
			source = parseInt(source)
			// highlight selected source
			var ref = sources[source-1]
			$(ref).addClass('source-highlighted')
			console.log(ref)

			// scroll to selected source
			$('html, body').animate({
				scrollTop: $(ref).offset().top
			}, 0)
		})
	}
})

// citation tooltip hover
$('.citation')
	.on('mouseover mousemove', () => {
		$('#tooltip')
			.addClass('tooltip-hover')
			.css('left', (event.pageX - $('#tooltip').width() / 2 - 10) + 'px')
			.css('top', (event.pageY - $('#tooltip').height() - 40) + 'px')
	})
	.on('mouseout', () => {
		$('#tooltip')
			.removeClass('tooltip-hover')
	})

// un-highlight selected source
$('#sources-list').on('click', function() {
	sources.removeClass('source-highlighted')
})