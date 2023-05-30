//181018 추가 시작
$(window).load(function(){
	$('.sch_searchTab').append('<li class="fcs"></li>');
	search_tab_u_posX($('.sch_searchTab'), 0);
});

function search_tab_u_posX ($this_parent, $idx){
	if ($this_parent.length > 0) {//180903 if문 추가
		var $this = $this_parent.find('li').eq($idx).find('a');
		$this_parent.find('.fcs').css({
			transform: 'translateX('+ $this.position().left +'px)',
			width: $this.outerWidth()
		});
		$(window).resize(function(){
			$this_parent.find('.fcs').css({
				transform: 'translateX('+ $this.position().left +'px)',
				width: $this.outerWidth()
			});
		});
	}
}

$(document).on('click', '.sch_searchTab li a', function(){
//$('.sch_searchTab li a').on('click', function(){//181008 수정
//$('.hs_product_list_wrap').on('click', '.sch_searchTab li a', function(){
	var $this = $(this),
		$this_parent = $this.closest('.sch_searchTab'),
		$idx = $this.parent().index();

		$this_parent.addClass('active');

	if ($this_parent.find('.fcs').length == 0) {
		$this_parent.append('<li class="fcs"></li>');
	}

	search_tab_u_posX($this_parent, $idx);

	$this.parent('li').siblings('li').removeClass('on');
	$this.parent('li').addClass('on');

	activeCont = $this.attr('href');
	selectCont = $('.tab_cont .cont'+activeCont+'')

	selectCont.siblings('.cont').removeClass('on');
	$('.tab_cont '+activeCont+'').addClass('on');

	return false;
});
//181018 추가 끝

$(document).ready(function(){

	var $slide_options = {//검색 결과 슬라이드 옵션
		slidesPerView:'auto',
		freeMode: true,
		spaceBetween: 5
	};
	var $swiper_slide = new Swiper('.top_item_slide.swiper-container', $slide_options);//연관상품
	var brandItemSwiper = new Swiper('.brand_item_slide.swiper-container', $slide_options);//브랜드 인기 상품 180627 추가
	var topSellerSwiper = new Swiper('.top_seller_slide.swiper-container', $slide_options);//180810 추가

	$('.sch_searchEndTab li a').click(function(){//검색 결과 탭 토글링 180810 수정
		$(this).parent('li').siblings('li').removeClass('on');
		$(this).parent('li').addClass('on');

		var activeCont = $(this).attr('href');
		var selectCont = $('.tab_cont .cont'+activeCont+'')

		selectCont.siblings('.cont').removeClass('on');
		$('.tab_cont '+activeCont+'').addClass('on');

		if ($(activeCont + ' .swiper-container').length > 0) {
			// $swiper_slide.destroy();
			if ($('.top_seller_slide').length > 0) {
				topSellerSwiper.update();	
			}
			$swiper_slide = new Swiper(activeCont + ' .swiper-container', $slide_options);
		}
		return false;
	});

	//브랜드 검색 토글링 180627 추가
	$('.sch_searchNorTit.tgTrigger').click(function(){
		$(this).toggleClass('off');
		$(this).next().slideToggle();
	});

	//180810 수정 시작
	$('.flag_wrap.case.search .flag a').click(function(){
		$('body').append('<div id="flying_tag_area"></div>');
		var $this = $(this),
			$input = $('.h_searchEngine .ipt'),
			$timing = 400;

		$this.clone().appendTo('#flying_tag_area');
		$('#flying_tag_area').addClass($this.parent().attr('class'));

		$('#flying_tag_area').css({
			transform: 'translate(' + $this.offset().left + 'px, ' + $this.offset().top + 'px) scale(1.1)'
		});

		setTimeout(function(){
			$('#flying_tag_area').css({
				transform: 'translate(' + $input.offset().left + 'px, ' + ($input.offset().top + 1) + 'px) scale(1)',
				transition: 'transform '+ $timing/1000 +'s ease-in-out'//180723 수정
			});
		}, 0);

		setTimeout(function(){
			location.href = $this.attr('href');
		}, $timing);
		return false;
	});

	$('.h_searchEngine .ipt input').on('keyup', function(){
		if ($(this).val() != '') {
			$(this).parent().find('a.del').fadeIn('fast');
		} else {
			$(this).parent().find('a.del').fadeOut('fast');
		}
	})
	$('.h_searchEngine .ipt a.del').on('click', function(){
		$(this).parent().find('input').val('');
		$(this).fadeOut('fast');
	})
	//180810 수정 끝

	// 181024 수정
	new Swiper('.hs_product_list .img_slide_wrap.active.swiper-container', {
		loop: true,
		observer: true,
		observeParents: true
	});
	// 181024 수정 end

	$(document).on('click', '.hs_product_list .info_cont .color_chip .chip', function(){
		$chipId = $(this).attr('id');
		$activeSlide = $(this).parents('li').find('.img_slide_contain').children('.'+$chipId+'');

		if($activeSlide.hasClass('active') == false){
			$(this).parents('li').find('.img_slide_contain .img_slide_wrap').removeClass('active');
			$activeSlide.addClass('active');
			new Swiper( $activeSlide , {
				loop: true
			});
		};
	});
	// 180727 수정 end

	// 180810 추가 시작
	$graph_area.hide();
	$graph_btn_area.addClass('off');
	// 180810 추가 끝
});

// 180810 추가 시작
var $graph_area = $('.sch_searchGraph'),
	$graph_btn_area = $graph_area.parent().find('.sch_searchNorTit.tgTrigger');
$(window).load(function(){
	$graph_area.slideDown(400, function(){
		search_text_report();
		setTimeout(function(){
			$graph_area.slideUp(400);
			$graph_btn_area.addClass('off');
		}, 1000);
	});
	$graph_btn_area.removeClass('off');
});
// 180810 추가 끝
	
//브랜드 인기 검색어 그래프 180627 추가
// search_text_report();//180810 삭제
function search_text_report(){
	if ($('#searchChartView').length > 0) {
		var searchChart = echarts.init(document.getElementById('searchChartView'));
		var searchChartOption = {
		    series: [
		        {
		            type:'pie',
		            radius: ['40%', '45%'],
		            label: {
		                normal: {
		                    formatter: '{abg|{b}}\n{d}%',
		                    textStyle: { // compat
		                        color: '#363636'
		                    },
		                    rich : {
		                    	abg: {
	                            fontSize: 13,
	                            fontWeight: 'bold',
	                            color: '#363636'
		                        },
		                    }
		                }
		            },
		            labelLine: {
		                lineStyle: {
		                    color: '#ccc'
		                }
		            },
		            data:[
		                {
		                	value:0.6,//50%
		                	name:'COAT',
		                	itemStyle: {
		                		normal: {
		                			color: '#e46764'
		                		}
		                	}
		                },
		                {
		                	value:0.1,//10%
		                	name:'아울렛',
		                	itemStyle: {
		                		normal: {
		                			color: '#d09e88'
		                		}
		                	}
		                },
		                {
		                	value:0.1,//10%
		                	name:'원피스',
		                	itemStyle: {
		                		normal: {
		                			color: '#fadad8'
		                		}
		                	}
		                },
		                {
		                	value:0.1,//10%
		                	name:'블라우스',
		                	itemStyle: {
		                		normal: {
		                			color: '#534847'
		                		}
		                	}
		                },
		                {
		                	value:0.1,//10%
		                	name:'구스',
		                	itemStyle: {
		                		normal: {
		                			color: '#9b8281'
		                		}
		                	}
		                }
		            ],
		            hoverAnimation: false
		        }
		    ]
		};
		searchChart.setOption(searchChartOption);
		window.onresize = function() {
		  searchChart.resize();
		};		
	}
}