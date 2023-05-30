;(function ( $ ) {
	$(document).ready(function() {
		/*ui_toggle*/
		$(document).on('click', '.ui_toggle .toggle_link', function(){
			if($(this).parent('.lists').hasClass('on')){
				$(this).parent('.lists').removeClass('on');
				$(this).next('.toggle_cont').slideUp(300);
			}else{
				$('.product_filter_pop .toggle_list .lists').removeClass('on');
				$(this).parent('.lists').addClass('on');
				$('.product_filter_pop .toggle_list .toggle_cont').slideUp(300);
				$(this).next('.toggle_cont').slideDown(300);
			}
			return false;
		});

		/*like 180706 수정*/
		var $isLike = false;
		if (handsomeUserLoginYn == "Y") {
			$(document).on('click', '.hs_product_list .like, .hs_special_viewTitle .like, .magazine_comm_list .like', function(){
				if ($isLike) {
					return;
				}
				$isLike = true;
	
				$(this).toggleClass('on');
	
				if($(this).hasClass('on')){
					
					heart_add_init($(this));//180719 추가
	
					// $('.hs_like_info_txt').remove(); 180727 삭제
					// $("<p class='hs_like_info_txt'>위시리스트에 담았습니다.</p>").appendTo('body'); 180727 삭제
	
					setTimeout(function() {
					 	// $('.hs_like_info_txt').remove(); 180727 삭제
					 	$isLike = false;
					}, 1500);
				}else{
					heart_remove_init($(this));//180719 추가
	
					// $('.hs_like_info_txt').remove(); 180727 삭제
					$isLike = false;
				}
	
				/*hsome_quickMenu 체크*/
				// 180727 삭제
				// if($('.hsome_quickMenu').hasClass('active')){
				// 	$('.hs_like_info_txt').addClass('quick_active');
				// }else{
				// 	$('.hs_like_info_txt').removeClass('quick_active');
				// }
				// 180727 삭제 end
	
				return false;
			});
		}
		$(window).scroll(function(){
			// $('.hs_like_info_txt').remove(); 180727 삭제
			$('.hs_follow_info_txt').remove(); // 180727_팔로우 토스트팝업 추가
			$isLike = false;
		});

		/*tooltip*/
		$(document).on('click', '.hs_tooltip_wrap .ico_btn', function(){
			if($(this).next('.tooltip_cont').hasClass('on')){
				$(this).next('.tooltip_cont').removeClass('on');
			}else{
				$('.hs_tooltip_wrap .tooltip_cont').removeClass('on');
				$(this).next('.tooltip_cont').addClass('on');
			}

			return false;
		});

		$(document).on('click', '.hs_tooltip_wrap .tooltip_cont .close', function(){
			$(this).parent('.tooltip_cont').removeClass('on');
			return false;
		}); 

		// 180727_팔로우 토스트팝업 추가
		/*$(document).on('click', '.hs_sns_post_cont .follow , .hs_sns_member_list .follow , .h_gnbMenu.sns .follow , .hs_sns_wrap .hs_ico_follow', function(){
			$('.hs_follow_info_txt').remove();

			if($(this).hasClass('on')){
	    	$("<p class='hs_follow_info_txt'>팔로우를 시작했습니다.</p>").appendTo($('.hs_sns_wrap'));
	    }else{
	    	$("<p class='hs_follow_info_txt'>팔로우를 취소했습니다.</p>").appendTo($('.hs_sns_wrap')); 
	    }

	    if($('.hsome_quickMenu').hasClass('active')){
				$('.hs_follow_info_txt').addClass('quick_active');
			}else{
				$('.hs_follow_info_txt').removeClass('quick_active');
			};

			if($(this).parents().is('.hsome_layer_popup')){
				$('.hs_follow_info_txt').removeClass('quick_active');
			}
		});*/
		// 180727_팔로우 토스트팝업 추가 end
	});

})( jQuery );

//180719 추가 시작
function heart_add_init(el){
	el.find('.bt_inner_hearts').remove();
	var $ani = ['heartFlying', 'heartFlyingLeft', 'heartFlyingBottom'];
	el.append('<span class="bt_inner_hearts"></span>');

	var $item = '';
	for (var i = 0; i < Math.floor((Math.random()*6) + 3); i++) {
		$item = $item + ('<i class="heart"></i>' + '\n');
	}
	el.find('.bt_inner_hearts').append($item);
	var $idx = Math.floor(Math.random()*3);
	el.find('.bt_inner_hearts .heart:nth-child(even)').css({ 'animation-name' : $ani[$idx] + 'Even' });
	el.find('.bt_inner_hearts .heart:nth-child(odd)').css({ 'animation-name' : $ani[$idx] + 'Odd' });
}
function heart_remove_init(el){
	el.find('.bt_inner_hearts').remove();
}
//180719 추가 끝