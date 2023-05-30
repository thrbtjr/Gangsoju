;(function ( $ ) {
	$(document).ready(function(){
		var $filter_toggle_wrapper = $('.product_filter_pop .toggle_list');

		/*2depth toggle*/
		$(this).on('click', '.ui_toggle .depth1_link', function(){
			if($(this).hasClass('on')){
				$(this).removeClass('on');
				$(this).next().slideUp(300);
			}else{
				$filter_toggle_wrapper.find('.depth1_link').removeClass('on');
				$(this).addClass('on');
				$filter_toggle_wrapper.find('.depth2_cont').slideUp(300);
				$(this).next().slideDown(300);
			}
			return false;
		});

		/*3depth toggle*/
		$(this).on('click', '.ui_toggle .depth2_link', function(){
			if($(this).hasClass('on')){
				$(this).removeClass('on');
				$(this).next().slideUp(300);
			}else{
				$filter_toggle_wrapper.find('.depth2_link').removeClass('on');
				$(this).addClass('on');
				$filter_toggle_wrapper.find('.depth2_cont .hs_check_list').slideUp(300);
				$(this).next().slideDown(300);
			}
			return false;
		});

		/*filter tag add*/
		$(this).on('click', '.product_filter_pop .toggle_list .hs_check01 input, .product_filter_pop .toggle_list .hs_color_check input, .product_filter_pop .toggle_list .hs_box_check input', function(){
			var $this = $(this);
			var $this_tag = '';
			if ($this.is(':checked')) {
				$this_tag = $this.parent().find('label').text();

				if ($this.closest('.depth1_cont_inner').find('.depth1_link').length > 0) {
					$this_tag = $this.closest('.depth1_cont_inner').find('.depth1_link').text() + 
								'&gt;' + 
								$this.closest('.depth2_cont_inner').find('.depth2_link').text() + 
								'&gt;' + 
								$this_tag;
				}
				$this.closest('li.lists').find('.check_txt').append('<em class="'+ $this.attr('id') +'">'+ $this_tag +'</em>');
				setTimeout(function(){
					$this.closest('li.lists').find('.check_txt em.' + $this.attr('id')).addClass('active');
				}, 0);
			} else {
				$this.closest('li.lists').find('.check_txt em.' + $this.attr('id')).removeClass('active');
				setTimeout(function(){
					$this.closest('li.lists').find('.check_txt em.' + $this.attr('id')).remove();
				}, 300);
			}
		});

		/* search delete button toggle */
		$('.sch_searchEngine .ipt input').on('keyup', function(){
			if ($(this).val() != '') {
				$(this).parent().find('a.del').fadeIn('fast');
			} else {
				$(this).parent().find('a.del').fadeOut('fast');
			}
		});
		$('.sch_searchEngine .ipt a.del').on('click', function(){
			$(this).parent().find('input').val('');
			$(this).fadeOut('fast');
		});

	});

	$(window).load(function(){
		
	});
})( jQuery );

$(document).ready(function(){
	
});