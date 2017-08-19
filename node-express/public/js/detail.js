$(function() {
	$('.do-comment').click(function(e) {
		let $this = $(this);
		let toId = $this.data('tid');
		let commentId = $this.data('cid');

		let inputCto = $('#comment-to'), inputCid = $('#comment-id');
		if (inputCto.length <= 0) {
			$('<input>').attr({
				type: 'hidden',
				id: 'comment-to',
				name: 'comment[tid]',
				value: toId
			}).appendTo('#commentForm');
		} else {
			inputCto.val(toId);
		}

		if (inputCid.length <= 0) {
			$('<input>').attr({
				type: 'hidden',
				id: 'comment-id',
				name: 'comment[cid]',
				value: commentId
			}).appendTo('#commentForm');		
		} else {
			inputCid.val(commentId);
		}
	})
})