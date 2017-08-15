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
	})
})