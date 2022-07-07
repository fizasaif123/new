jQuery(function () {
	initAjaxLoadPosts();
	initLoadMore();
	initPostsAutocomplete();
	initClientSuccessPostsSearch();
});

function GetURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}

function initAjaxLoadPosts() {
	jQuery('.posts-ajax-loader').each(function () {
		var loader = jQuery(this);
		var form = loader.find('form.posts-ajax-filter');
		var holder = loader.find('.posts-ajax-holder');
		form.on('change', 'select, input[type="radio"]', function (e) {
			jQuery.get({
				url: form.attr('action'),
				data: form.serialize(),
				success: function (data) {
					holder.html(data);
					initLoadMore();
				}
			});
		});

		form.on('change', '.video-types input[type="radio"]', function (e) {
			var current_type = jQuery(this).attr('value');
			form.find('#video-types option[value="' + current_type + '"]').attr('selected', 'selected');
		});

		var video_types = GetURLParameter('video-types'),
			video_tagline = GetURLParameter('video-tagline');

		if (video_types || video_tagline) {
			// alert(video_types);

			if (video_types) {
				form.find('#video-types option[value="' + video_types + '"]').attr('selected', 'selected');
			}

			if (video_tagline) {
				form.find('.video-tags input[value="' + video_tagline + '"]').attr('checked', 'checked');
			}

			jQuery.get({
				url: form.attr('action'),
				data: form.serialize(),
				success: function (data) {
					holder.html(data);
					initLoadMore();
					jcf.refresh('select');
				}
			});

			var uri = window.location.toString();
			if (uri.indexOf("?") > 0) {
				var clean_uri = uri.substring(0, uri.indexOf("?"));
				window.history.replaceState({}, document.title, clean_uri);
			}
		}

	});
}

function initLoadMore() {
	jQuery('.load-more-holder').loadMore({
		linkSelector: 'a.load-more',
		newContentTarget: '.new-content-target',
		scroll: true,
	});
}

function initPostsAutocomplete() {
	jQuery('input.posts-autocomplete').each(function () {
		var input = jQuery(this);
		var url = input.data('source');
		input.autocomplete({
			source: url,
			delay: 2000,
			minLength: 3,
			select: function (event, ui) {
				// window.location = ui.item.url;
				input.val(ui.item.value);
				input.parents('form').submit();
			},
		});
	});
}

function initClientSuccessPostsSearch() {
	var loadMoreWrap = jQuery('.load-more-holder');
	jQuery('.posts-ajax-filter.filter-form-wrap').submit(function () {
		var form = jQuery(this),
			url = form.attr('action'),
			data = form.serialize();
		jQuery.get({
			url: url,
			data: data,
			success: function (data) {
				loadMoreWrap.html(data);
				initLoadMore();
			}
		});
		return false;
	});
	jQuery('.search-js-event').click(function () {
		jQuery(this).parents('form').submit()
	});
}

jQuery('.posts-ajax-loader').on('click', '.link-radio-filter .radio-text', function () {
	var current_cat_id = jQuery(this).prev().val();
	jQuery('.filters-wrap label').removeClass('active');
	jQuery('.filters-wrap .radio-filter label[data-id="' + current_cat_id + '"]').addClass('active');
});

jQuery('.filters-wrap .radio-filter').on('click', 'label', function () {
	jQuery('.filters-wrap label').removeClass('active');
	jQuery(this).addClass('active');
});
