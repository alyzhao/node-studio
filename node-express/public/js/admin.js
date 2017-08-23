$(function() {
	$('.btn.btn-danger').on('click', function(e) {
		let $this = $(this);
		let id = $this.data('id');
		$.ajax({
			type: 'delete',
			url: '/admin/delete/?id=' + id
		})
		.done(data => {
			if (data.success == 1) {
				console.log('delete success!');
				$('.item-id-' + id).remove();
			}
		})
	});

	$('#inputDouban').on('blur', function() {
		let $this = $(this),
			did = $this.val();
		$.ajax({
			url: 'https://api.douban.com/v2/movie/subject/' + did,
			cache: true,
			type: 'get',
			dataType: 'jsonp',
			crossDomain: true,
			jsonp: 'callback',
			success: function(data) {
				$('#inputTitle').val(data.title);
				$('#inputDoctor').val(data.directors[0].name);
				$('#inputCountry').val(data.countries[0]);
				// $('#inputLanguage').val(data);
				$('#inputPoster').val(data.images.large);
				// $('#inputFlash').val(data);
				$('#inputYear').val(data.year);
				$('#inputSummary').val(data.summary);
			}
		})
	});
})