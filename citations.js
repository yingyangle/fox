var sources_dict = {} // dict mapping source code to id order
var sources_elements // list of li elements in sources list
var save_spot // location of clicked citation
var scroll_ready = 0 // whether we've arrived at scrolling to the selected source 

// populate sources list
d3v5.csv('data/citations.csv', d3.autoType).then(data => {
	// load and sort data
	var sources_data = data
	sources_data.sort((a, b) => (a.sort > b.sort) ? 1 : -1)
	console.log(sources_data)

	// for each source
	for (var i = 0; i < sources_data.length; i++) {
		// add to sources list
		var source = sources_data[i]
		$('#sources-list').append(`<li data-source="${source.code}">${source.citation}</li>`)
		// add to sources_dict
		sources_dict[source.code] = parseInt(i)
	}

	getCitations()
	sources_elements = $('#sources-list li')
})

function getCitations() {
	$('.citation').each(function(d) {
		// get reference number
		var source = $(this).attr('data-source')
		if (!(source in sources_dict)) source = 999
		else source = sources_dict[source]
		// set reference number as citation text
		if (!$(this).hasClass('text-citation')) {
			$(this).html(source+1)
			// hover text
			$(this).on('mouseover mousemove', () => {
				var tooltip_text = $(this).attr('data-tooltip')
				console.log(tooltip_text)
				$('#tooltip').html(tooltip_text)
			})
		}

		// find source in bibliography
		if ($(this).hasClass('sources-citation')) {
			$(this).on('click', () => {
				// highlight selected source
				source = parseInt(source)
				var ref = sources_elements[source]
				// console.log(ref)
				$(ref).addClass('source-highlighted')
				// console.log(ref)

				// save this spot
				save_spot = this

				// scroll to selected source
				$('html, body').animate({
					scrollTop: $(ref).offset().top
				}, 0)

				// button to scroll back up to current anchor position
				$('#back-to-text').css('display', 'block') // show button
				$('#back-to-text').on('click', () => {
					var ref = $(save_spot)
					// scroll to position
					$('html, body').animate({
						scrollTop: $(ref).offset().top
					}, 0)
					// hide button again
					$('#back-to-text').css('display', 'none')
				})
			})
		}
	})

	// citation tooltip hover
	$('.citation:not(.text-citation)')
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

	// un-highlight selected source if click anywhere outside the highlighted source
	$(document).click(function (event) {
		var clickover = $(event.target)
		if (!clickover.hasClass('source-highlighted') && !clickover.hasClass('citation')) {
			sources_elements.removeClass('source-highlighted')
		}
	})

}