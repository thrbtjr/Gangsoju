/**
 * assist Methods (common)
 */

//common s -------------------------------------------------- */
$.urlParam = function(name){ //urlParam 가져오기
var results = new RegExp('[\?&]' + name + '=([^&]*)').exec(window.location.href);
	if (results==null){
  	return null;
	}
	else{
  	return results[1];
	}
}	
function objShow(obj){ //obj 보이기
	obj.css('display','block');
}
function objHide(obj){ //obj 숨기기
	obj.css('display','none');
}
function objSlideShow(obj){ //obj slide 보이기
	obj.stop().slideDown(200);
}
function objSlideHide(obj){ //obj slide 숨기기
	obj.stop().slideUp(200);
}
function holdBodyToggle(){ //body scroll 막기 토글
	$('body').toggleClass('hold_body');
}
function holdBodyShow(){ //body scroll 막기
	$('body').addClass('hold_body');
}
function holdBodyHide(){ //body scroll 막기해제
	$('body').removeClass('hold_body');
}
function goBack(n){ //뒤로가기
	if(n==undefined){
		n=-1;
	}
	window.history.go(n);	
	return false;
}
function setSelectbox(){ //selectbox http://rwdb.kr/selectjquery_plugin/ 참조
	if($('body').find('select.sodsb').length != 0){
		$('select.sodsb').selectOrDie();
	}	
}
function headerBorderReset(){ //header border 초기화
	$('.hsome_header').css('border-bottom','none');
}
function inNumber(obj){ //숫자만 입력
  obj.val(obj.val().replace(/[^0-9]/g,''));
}
function maxLengthCheck(obj){ //글자수제한
  if (obj.val().length > obj.attr('maxLength')) {
    obj.val(obj.val().slice(0, obj.attr('maxLength')));
  }    
}
function setComma(num){ // 숫자콤마
	return String(num).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'); // 정규식을 통한 콤마 넣기
}
function add_file_name(obj){ // 첨부파일 파일명만 보이기 함수
  var name_input=obj.parents('.hs_input_file_wrap').find('.file_name');
  var fPath=obj.val();
  var fValue=fPath.split("\\");
  var fName=fValue[fValue.length-1]; //파일명
  name_input.val(fName);    
  if(name_input.val() != ''){ // 파일 추가 되면 삭제 버튼 show
    obj.parents('.hs_input_file_wrap').find('.del').show();
  }
}  
function addPlcToTxtArea(){ // textarea placeholder 추가 함수(고객센터 1:1문의 수정 시 추가)
	// defaultValue 는 페이지에 하드 코딩
	var $txtArea = $('.txtArea');
	$txtArea.css('color','#aaa');
	$txtArea.focus(function(e) {
		e.target.value = '';      
		e.target.style.color='#222';
		if (e.target.value == e.target.defaultValue){
			e.target.value = '';
		}
	});
	$txtArea.blur(function(e) {
		if (e.target.value != ''){        
			e.target.style.color='#222';
		} else {
			e.target.value = e.target.defaultValue;
			e.target.style.color='#aaa';
		}
	});
}
function lastBoxActive(){ //last_box 클래스 삽입(.hsome_contents 내에서 .df_box가 마지막일때만 사용)
	var tempLastBoxIdx=Number($('.df_box').length)-1;
	// console.log("tempLastBoxIdx : "+ tempLastBoxIdx)
	$('.hsome_contents .df_box').eq(tempLastBoxIdx).addClass('last_box');
}
function setDatePick(){ //calender set
	$(".hs_datepicker").datepicker({
		dateFormat:'yy.mm.dd',
		// showAnimation:'slide',
		monthNames: ['1 월','2 월','3 월','4 월','5 월','6 월','7 월','8 월','9 월','10 월','11 월','12 월'], // 개월 텍스트 설정
    monthNamesShort: ['1 월','2 월','3 월','4 월','5 월','6 월','7 월','8 월','9 월','10 월','11 월','12 월'], // 개월 텍스트 설정
    dayNames: ['월요일','화요일','수요일','목요일','금요일','토요일','일요일'], // 요일 텍스트 설정
    dayNamesShort: ['월','화','수','목','금','토','일'], // 요일 텍스트 축약 설정&nbsp;   
    dayNamesMin: ['월','화','수','목','금','토','일'], // 요일 최소 축약 텍스트 설정
		showOtherMonths:false,
		selectOtherMonths:true,
		changeYear:true,
		changeMonth:true,
		showButtonPanel:false
	});
}
function currentQuickMenuOn(menu_class){ //현재 퀵메뉴 활성화
	$('.hsome_quickMenu li').removeClass('active');
	$('.hsome_quickMenu').find('.'+menu_class).addClass('active');
}
function chkEffwInview(){ //스크롤 위치 확인
	var win = $(window);
	var win_w = win.width();
	var win_h = win.height();
	var win_top = win.scrollTop();
	var fadeEff = $('.effw');
	var win_bottom = (win_top + win_h);

	$.each(fadeEff, function(){
		var elem = $(this);
		var elem_h = elem.outerHeight();
		var elem_top = elem.offset().top;
		var elem_bottom = (elem_top + elem_h);

		if ((elem_bottom >= win_top) && (elem_top <= win_bottom)){
			elem.addClass('in_view');
		}
		else{
			elem.removeClass('in_view');
		}
	});
}
function chkPromotionInview(){ //스크롤 위치 확인(사용안함:20180718)
	var win = $(window);
	var win_w = win.width();
	var win_h = win.height();
	var win_top = win.scrollTop();
	var chckObj = $('.promotion_wrap');
	var win_bottom = (win_top + win_h);

	$.each(chckObj, function(){
		var elem = $(this);
		var elem_h = elem.outerHeight();
		var elem_top = elem.offset().top;
		var elem_bottom = (elem_top + elem_h);

		if ((elem_bottom >= win_top) && (elem_top <= win_bottom)){
			// objHide($('.btn_hs_promotion'));
			// elem.addClass('in_view');
			$('.btn_hs_promotion').addClass('upper');
		}
		else{
			// objShow($('.btn_hs_promotion'));
			// elem.removeClass('in_view');
			$('.btn_hs_promotion').removeClass('upper');
		}
	});
}

//스타일 라이브 오프라인 로딩 추가 (2020-11-20) : S
function showLoadingLpSnsOff(){
	objShow($('.tab_loading_layer_wrap'));
	holdBodyShow();
}

function hideLoadingLpSnsOff(){
	objHide($('.tab_loading_layer_wrap'));
	holdBodyHide();
}
//스타일 라이브 오프라인 로딩 추가 (2020-11-20) : E

function showLoadingLp(){
	objShow($('.loading_layer_wrap'));
	holdBodyShow();
}
function showLoadingLpIdx(zidx){
	$('.loading_layer_wrap').css('z-index',zidx);
	objShow($('.loading_layer_wrap'));
	holdBodyShow();
}
function hideLoadingLp(){
	$('.loading_layer_wrap').css('z-index',1);
	objHide($('.loading_layer_wrap'));
	holdBodyHide();
}
// 원클릭 iframe 영역 노출 20200316 nih
function showIframePopupArea(){
	$('.iframe_popup_wrap').css("bottom","0px");
}

function showLoadingOrderProcessing(){
	objShow($('.pop_loading_oneclick200210_wrap'));
	holdBodyShow();
}
function hideLoadingOrderProcessing(){
	$('.pop_loading_oneclick200210_wrap').css('z-index',1);
	objHide($('.pop_loading_oneclick200210_wrap'));
	holdBodyHide();
}

function showSnsLoadingLp(type){
    if(type == "image"){
        $(".loading_layer_wrap2004 .loading_box2004 p").text("이미지가 업로드 중입니다.");
    }else if(type == "product"){
        $(".loading_layer_wrap2004 .loading_box2004 p").text("유사상품을 찾고 있습니다.");
    }
    
    objShow($('.loading_layer_wrap2004'));
    holdBodyShow();
}
function hideSnsLoadingLp(){
    $('.loading_layer_wrap2004').css('z-index',1);
    objHide($('.loading_layer_wrap2004'));
    holdBodyHide();
}

function scaling(obj){
	obj.addClass('scaling');
		setTimeout(function(){
			obj.removeClass('scaling');
		}, 400);
}
function valchck_shaking(obj){
	$('html, body').stop().animate({
		scrollTop: obj.offset().top - (($(window).height() - obj.outerHeight())/2)
	}, 400, function(){
		setTimeout(function(){
			obj.addClass('shaking');
		}, 200);
	});
	setTimeout(function(){
		obj.removeClass('shaking');
	}, 1520);
}
var timeCount=null;
function count_down(obj){ //시간 카운트 계산
	total_time--;
	hour=total_time/3600;
	minute=(total_time/60)%60;
	second=total_time%60;
	// obj.html(parseInt(total_time));
	obj.html(parseInt(minute)+":"+parseInt(second));
	if(total_time<0){
		clearInterval(timeCount);
		obj.html(parseInt(0));
	}
}
function time_count(obj){ //시간 카운트 실행
	var sec=obj.attr('data-left-time-sec');
	if(sec==null){
		total_time=60;
	}
	total_time=sec;
	clearInterval(timeCount);
	timeCount=setInterval(function(){count_down(obj);},1000);
}
function uiTabSlideAct(obj){
	var $append_cnt = 0;
	var $this = obj,
	$this_parent = $this.closest('.ui_tab');
	$this_parent.addClass('active');

	if (($append_cnt == 0) && ($this_parent.find('.fcs').length == 0)) {//180802 수정
		$this_parent.append('<li class="fcs"></li>');	
		$append_cnt = 1;
	}

	$this_parent.find('.fcs').css({
		transform: 'translateX('+ $this.position().left +'px)',
		// width: $this.outerWidth();
	});

	$this.parent('li').siblings('li').removeClass('on');
	$this.parent('li').addClass('on');

	activeCont = $this.attr('href');
	selectCont = $('.tab_cont .cont'+activeCont+'')

	selectCont.siblings('.cont').removeClass('on');
	$('.tab_cont '+activeCont+'').addClass('on');

	return false;
}
function setHeaderFix(){ //사이트 전체 header가 fixed로 변경되면서 사용 안함
	/*
	$('.hsome_allContents ').addClass('fixed_header_on');
	$('.hsome_header ').addClass('header_fixed').addClass('on');
	*/
}
function setCookieBtn(name){ //setCookie
	$.cookie(name,'no',{ path:'/', expires: 1 });
	var aa=$.cookie(name);
}
function getCookieBtn(name){ //getCookie
	var nameVal=$.cookie(name);
	if(nameVal == 'no'){
		return false;
	}else {
		return true;
	}	
}
function checkCookieBtn(className){ //cookie 확인하고 버튼 show/hide
	$.removeCookie(className, {path:'/'}); //cookes 삭제, 작업용 (추후삭제 필요)
	if(getCookieBtn(className)){
		objShow($("."+className));
	}else{
		objHide($("."+className));
	}
}
function noDragCopyActive(){ //우클릭드래그복사방지 함수
  $('body').attr('oncontextmenu','return false'); //우클릭방지
  $('body').attr('ondragstart','return false'); //드래그방지
  $('body').attr('onselectstart','return false'); //복사방지
}
//common e -------------------------------------------------- */

//레이어팝업관련 s ------------------------------------------ */
var curScrollPosition = 0; //현재 스크롤 위치
var hs_allCon = $('.hsome_allContents'); //all Contents
var layerPopConWrap = $('.hsome_layerpop_contents'); //레이어 팝업 wrap

function getLayerPopup(page_url,depth) { //레이어팝업 URL 불러오기
	//$('.hsome_layerpop_contents.lp_'+depth).html('<img src="../../images/common/ico_loader.gif" alt="loading" class="hsome_quickMenu_loader" />');
	//$('.hsome_layerpop_contents.lp_'+depth).html('<img src="/_ui/handsomemobile/images/common/ico_loader.gif" alt="loading" class="hsome_quickMenu_loader" />');
	// $('.hsome_layerpop_contents.lp_'+depth).html('<img src="/_ui/handsomemobile/images/common/Spinner-1s-200px.apng" alt="loading" class="hsome_quickMenu_loader" />');
	$('.hsome_layerpop_contents.lp_'+depth).html('<img src="/_ui/handsomemobile/images/common/Spinner-1s-200px.png" alt="loading" class="hsome_quickMenu_loader" />');
	jQuery.ajax({
		url: page_url,
		data:'',
		dataType:'',
		type: "get",
		success:function(data){
			// var parser = new DOMParser();
			// var doc = parser.parseFromString(data,"text/html");
			// var elem = $(doc).find('.layerpop_wrap');
			setTimeout(function(){
				$('.hsome_layerpop_contents.lp_'+depth).html(data);
				// $('.hsome_layerpop_contents.lp_'+depth).html(elem);
				$('.hsome_layerpop_contents').on('click', '.btn_lyrpp_close', function(){ //레이어팝업 닫기
					// clsPage(curScrollPosition);
					$('.hsome_layerpop_contents .fcs').hide();
					holdBodyHide();
					$(this).parents('.hsome_layerpop_contents').removeClass('visible');
					$(this).parents('.hsome_layerpop_contents').removeClass('active');
					//$('.hsome_allContents').show();
					hs_allCon.css({ marginTop: curScrollPosition*-1 });
					// hs_allCon.removeClass('disabled');
					setTimeout(function(){
						hs_allCon.css({ marginTop: 0 });
						$(window).scrollTop(curScrollPosition);
						$(this).parents('.hsome_layerpop_contents').empty();
					}, 400);
					return false;
				});
			}, 0);
		}
	});
}

function getiFrmLayerPopup(page_url,depth) { //레이어팝업 URL 불러오기
	$('.ifrm_layerpop.hsome_layerpop_contents.lp_'+depth).html('<img src="../../images/common/ico_loader.gif" alt="loading" class="hsome_quickMenu_loader" />');
	jQuery.ajax({
		url: page_url,
		data:'',
		dataType:'',
		type: "get",
		success:function(data){
			// var parser = new DOMParser();
			// var doc = parser.parseFromString(data,"text/html");
			// var elem = $(doc).find('.layerpop_wrap');
			setTimeout(function(){
				$('.ifrm_layerpop.hsome_layerpop_contents.lp_'+depth).html(data);
				// $('.hsome_layerpop_contents.lp_'+depth).html(elem);
				$('.ifrm_layerpop.hsome_layerpop_contents').on('click', '.btn_lyrpp_close', function(){ //레이어팝업 닫기
					// clsPage(curScrollPosition);
					$('.ifrm_layerpop.hsome_layerpop_contents .fcs').hide();
					holdBodyHide();
					$(this).parents('.ifrm_layerpop.hsome_layerpop_contents').removeClass('visible');
					$(this).parents('.ifrm_layerpop.hsome_layerpop_contents').removeClass('active');
					//$('.hsome_allContents').show();
					hs_allCon.css({ marginTop: curScrollPosition*-1 });
					// hs_allCon.removeClass('disabled');
					setTimeout(function(){
						hs_allCon.css({ marginTop: 0 });
						$(window).scrollTop(curScrollPosition);
						$(this).parents('.ifrm_layerpop.hsome_layerpop_contents').empty();
					}, 400);
					return false;
				});
			}, 0);
		}
	});
}

function callLayerPopup(targetUrl,depth,style){ //레이어팝업 불러오기
	$('.hsome_layerpop_contents.lp_'+depth).removeClass('lp_stl_black').removeClass('dir_w').removeClass('dir_h'); //초기화
	// console.log(targetUrl+"_"+depth+"_"+style)
	curScrollPosition = $(window).scrollTop();
	var $page_url = targetUrl;
	holdBodyShow();
	$('.hsome_layerpop_contents.lp_'+depth).addClass('dir_h'); //슬라이드방향	
	setTimeout(function(){
		getLayerPopup($page_url,depth);
		$('.hsome_layerpop_contents.lp_'+depth).addClass(style); //black 배경 활성화
		$('.hsome_layerpop_contents.lp_'+depth).addClass('visible');
		$('.hsome_layerpop_contents.lp_'+depth).addClass('active');
		// hs_allCon.addClass('disabled');
	}, 300);
	return false;
}

function calliFrmLayerPopup(targetUrl,depth,style){ //레이어팝업 불러오기
	$('.ifrm_layerpop.hsome_layerpop_contents.lp_'+depth).removeClass('lp_stl_black').removeClass('dir_w').removeClass('dir_h'); //초기화
	// console.log(targetUrl+"_"+depth+"_"+style)
	curScrollPosition = $(window).scrollTop();
	var $page_url = targetUrl;
	holdBodyShow();
	$('.ifrm_layerpop.hsome_layerpop_contents.lp_'+depth).addClass('dir_h'); //슬라이드방향	
	setTimeout(function(){
		getiFrmLayerPopup($page_url,depth);
		$('.ifrm_layerpop.hsome_layerpop_contents.lp_'+depth).addClass(style); //black 배경 활성화
		$('.ifrm_layerpop.hsome_layerpop_contents.lp_'+depth).addClass('visible');
		$('.ifrm_layerpop.hsome_layerpop_contents.lp_'+depth).addClass('active');
		// hs_allCon.addClass('disabled');
	}, 300);
	return false;
}

function lpSizeCheck(obj){
	var screenH=$(window).height();
	var lyrTopH=obj.find('.lyrpp_top').height();
	var lyrMidH=obj.find('.lyrpp_mid').height();
 	//console.log("obj:"+obj.attr("class")+" / screenH: "+screenH+" / lyrTopH: "+lyrTopH+" / lyrMidH: "+lyrMidH);
 	if(obj.find('.btm_fixed_wrap').length > 0){ // 하단 고정 버튼이 있을시 
	 	if((lyrTopH+lyrMidH+50) > screenH){
			var tempLyrMidH=screenH-150;
		 	 //console.log("tempLyrMidH: "+tempLyrMidH);
			obj.find('.lyrpp_mid').css('height',tempLyrMidH);
		}
 	}else{
 		if((lyrTopH+lyrMidH+50) > screenH){
			var tempLyrMidH=screenH-100;
		 	// console.log("tempLyrMidH: "+tempLyrMidH);
			obj.find('.lyrpp_mid').css('height',tempLyrMidH);
		}
 	}
}
//레이어팝업관련 e ------------------------------------------ */

//iFrame팝업관련 s ------------------------------------------ */
/*
var parentBody=$(top.document).contents().find('body');

$('body').on('click','.ifrmpop_wrap .btn_lyrpp_close', function(){
	window.parent.holdBodyHide();
	parentBody.find('.iframe_popup_wrap').removeClass('visible');
	parentBody.find('.iframe_popup_wrap').removeClass('active');
	parentBody.css({ marginTop: curScrollPosition*-1 });
	setTimeout(function(){
		parentBody.css({ marginTop: 0 });
		parentBody.scrollTop(curScrollPosition);
		// $(this).parents('.iframe_popup_wrap').empty();
		parentBody.find('.iframe_popup_wrap').find('iframe').attr('src','');
	}, 400);
	return false;
});

function calliFramePopup(targetUrl,depth,style){ //레이어팝업 불러오기
	$('.iframe_popup_wrap').removeClass('lp_stl_black').removeClass('dir_w').removeClass('dir_h'); //초기화
	// console.log(targetUrl+"_"+depth+"_"+style)
	curScrollPosition = $(window).scrollTop();
	var $page_url = targetUrl;
	holdBodyShow();
	$('.iframe_popup_wrap').addClass('dir_h'); //슬라이드방향	
	setTimeout(function(){
		getiFramePopup($page_url,depth);
		// $('.iframe_popup_wrap.lp_'+depth).find('iframe').attr('src',targetUrl);
		$('.iframe_popup_wrap').addClass(style); //black 배경 활성화
		$('.iframe_popup_wrap').addClass('visible');
		$('.iframe_popup_wrap').addClass('active');
		// hs_allCon.addClass('disabled');
	}, 300);
	return false;
}

function getiFramePopup(page_url,depth){
	setTimeout(function(){
		$('.iframe_popup_wrap').find('#ifrm_con').attr('src',page_url);
	}, 200);
	setTimeout(function(){
		$('.iframe_popup_wrap #ifrm_con').contents().find('body').addClass('hold_body');
	}, 2000);
	return false;
}
*/
//iFrame팝업관련 e ------------------------------------------ */

//swiper관련 s ---------------------------------------------- */
var trans ;
function swiperActive(obj){ //swiper 활성화 (ex.swiper_recommend_goods)
	var swiperObj = new Swiper('.'+obj+'.swiper-container', {
		slidesPerView:'auto',
		freeMode: true ,
		spaceBetween:5
	});
	swiperObj.on('sliderMove , transitionEnd', function() { 
		// trans = swiperObj.translate;
	});
}

function swiperPageActive(obj){ //swiper 활성화 (ex.swiper_promotion)
	var swiperObj_p = new Swiper('.'+obj+'.swiper-container', {
		loop: true,
		autoplay: {
			delay: 4000,
      autoplayDisableOnInteraction: true, // 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
    },
    speed: 500,
    spaceBetween:0,
		pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets'
    },
    parallax: true
	});
}

function swiperCardActive(obj){ //swiper 활성화 (ex.swiper_card_easy_pay )
	var swiperObj_c = new Swiper('.'+obj+'.swiper-container', {
		loop: false,
		slidesPerView:'auto',
		centeredSlides:true,
    speed: 500,
    spaceBetween:20,
		pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'progressbar'
    },
    parallax: true
	});
	swiperObj_c.on('slideChangeTransitionEnd', function() { //swiper 이벤트
		var all_slide=$('.'+obj+'.swiper-container .swiper-slide');
		var $current_slide = all_slide.eq(swiperObj_c.activeIndex);
		$current_slide.find('input[type=radio]').trigger('click');

		// 즉시할인 사용 페이지에서만 작동하도록 20191023
		if(typeof fn_updateDiscInfo === "function"){
			fn_updateDiscInfo();
		}
	});
}

function swiperRPActive(obj){ //swiper 활성화 (ex.swiper_rp_slide )
	var swiperObj_c = new Swiper('.'+obj+'.swiper-container', {
		loop: true,
    slidesPerView: 1, 
    spaceBetween:15
	});
}

function swiperDlvrActive(obj){ //swiper 활성화 (ex.swiper_oclk_delivery_list)
	var swiperObj = new Swiper('.'+obj+'.swiper-container', {
		slidesPerView:'auto',
		freeModeSticky: true,
		spaceBetween:20,
		// slidesOffsetBefore:15,
		parallax: true,
		centeredSlides: true,
		breakpoints: {
			320: {
				slidesOffsetBefore:-5,
				// slidesOffsetAfter:30,
			},
			375: {
				slidesOffsetBefore:-8,
				// slidesOffsetAfter:40,
			},
			414: {
				slidesOffsetBefore:-10,
				// slidesOffsetAfter:75,
			}
		}		
	});
	
	swiperObj.on('sliderMove , transitionEnd', function(obj) {
	   // khg 배송지 올라갈때 처리
		if(typeof obj == "undefined"){
	       $.ajax({
               type: "GET",
               url: "/ko/checkout/oneclick/deliveryMode",
               dataType: "json",
               data : {"zipcode":$('.oclk_delivery_list_wrap .swiper-slide-active').find(".none_delivery_zipcode").html()},
               success: function(data){
                  //배송비
                  if(typeof data.deliveryCost != "undefinded"){
                      if(Number(data.deliveryCost) > 0){
                          $(".price_summary .price_con").html("₩"+addComma(Number(data.lgdAmount)));
                          $("#total").val(data.lgdAmount);
                          $("#cartDeliveryCost").val(data.deliveryCost);
						  /* 즉시할인 다시 적용 20191111 남일희 */
						  fn_updateDiscInfo();
					  }
                  }
               },
               error: function(xhr,  Status, error) {
                   alert('sendRequest error : ' + xhr.status + " ( " + error + " ) " );
               }
           });
	   }
	});
}

function uiTabActive(obj,idx){ //swiper 연동 탭이동
	/*
	obj.find('li').removeClass('on');
	obj.find('li').eq(idx).addClass('on');
	obj.parent().find('.tab_cont .cont').removeClass('on');
	obj.parent().find('.tab_cont .cont').eq(idx).addClass('on');
	*/
	obj.find('> li').eq(idx).find('> a').trigger('click');
}

function swiperPointCardActive(obj){ //swiper 활성화 (ex.swiper_point_slide_wrap )
	var swiperObj_pc = new Swiper('.'+obj+'.swiper-container', {
		loop: false,
		slidesPerView:'auto',
		centeredSlides:true,
    speed: 500,
    spaceBetween:20,
		pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'progressbar'
    },
    parallax: true
	});
	$('body').on('click', '.mp_point_ui_tab.ui_tab li a', function(){  //한섬마일리지,기프트카드 탭 이벤트
		var clickIdx = $('.mp_point_ui_tab.ui_tab li').index($(this).parent());
		swiperObj_pc.slideTo(clickIdx);
	});
	swiperObj_pc.on('slideChangeTransitionEnd', function() { //swiper 이벤트
		uiTabActive($('.'+obj).parent().find('.ui_tab'), swiperObj_pc.activeIndex); //swiper 연동 탭이동
	});
}

function swiperCsGuideOrderPayActive(obj){ //swiper 활성화 (ex.swiper_csgd_order_pay_slide_wrap )
	var swiperObj_csgd = new Swiper('.'+obj+'.swiper-container', {
		loop: false,
		autoHeight:true,
		centeredSlides:true,
    speed: 500,
    spaceBetween:0
    // parallax: true
	});
	$('body').on('click', '.csgd_order_pay_tab li a', function(){  //도움말 탭 이벤트
		var clickIdx = $('.csgd_order_pay_tab li').index($(this).parent());
		swiperObj_csgd.slideTo(clickIdx);
		return false;
	});
	swiperObj_csgd.on('slideChangeTransitionStart', function(){ //swiper 이벤트
		$('html, body').stop().animate({scrollTop:0},200);		
	});
	swiperObj_csgd.on('slideChangeTransitionEnd', function(){ //swiper 이벤트
		uiTabActive($('.'+obj).parent().find('.csgd_order_pay_tab'), swiperObj_csgd.activeIndex); //swiper 연동 탭이동
	});
}
function swiperCsGuideDlvrSrvcActive(obj){ //swiper 활성화 (ex.swiper_csgd_dlvr_srvc_slide_wrap )
	var swiperObj_csgd = new Swiper('.'+obj+'.swiper-container', {
		loop: false,
		autoHeight:true,
		centeredSlides:true,
    speed: 500,
    spaceBetween:0
    // parallax: true
	});
	$('body').on('click', '.csgd_dlvr_srvc_tab li a', function(){  //도움말 탭 이벤트
		var clickIdx = $('.csgd_dlvr_srvc_tab li').index($(this).parent());
		swiperObj_csgd.slideTo(clickIdx);
		return false;
	});
	swiperObj_csgd.on('slideChangeTransitionStart', function(){ //swiper 이벤트
		$('html, body').stop().animate({scrollTop:0},200);		
	});
	swiperObj_csgd.on('slideChangeTransitionEnd', function(){ //swiper 이벤트
		uiTabActive($('.'+obj).parent().find('.csgd_dlvr_srvc_tab'), swiperObj_csgd.activeIndex); //swiper 연동 탭이동
	});
}
function swiperCsGuideSrvcActive(obj){ //swiper 활성화 (ex.swiper_csgd_srvc_slide_wrap )
	var swiperObj_csgs = new Swiper('.'+obj+'.swiper-container', {
		loop: false,
		autoHeight:true,
		centeredSlides:true,
    speed: 500,
    parallax: true,
    spaceBetween:0    
	});
	$('body').on('click', '.csgd_srvc_tab > li a', function(){  //서비스소개 탭 이벤트
		var clickIdx = $('.csgd_srvc_tab > li').index($(this).parent());
		if(clickIdx==0){
			swiperObj_csgs.slideTo(0);
		}
		if(clickIdx==1){
			swiperObj_csgs.slideTo(3);
		}
		if(clickIdx==2){
			swiperObj_csgs.slideTo(6);
		}
		return false;
	});
	$('body').on('click', '.slide_gray_box .sgb_tit', function(){ //df_box slide 클릭 이벤트
		$(this).parent().find('.sgb_con').stop().slideToggle(200);
		$(this).parent().toggleClass('slide_gray_box_on');
		setTimeout(function(){swiperObj_csgs.slideReset(500);}, 300);
	});
	$('body').on('click', '.slide_white_box .swb_tit', function(){ //df_box slide 클릭 이벤트
		$(this).parent().find('.swb_con').stop().slideToggle(200);
		$(this).parent().toggleClass('slide_white_box_on');
		setTimeout(function(){swiperObj_csgs.slideReset(500);}, 300);
	});
	swiperObj_csgs.on('slideChangeTransitionStart', function(){ //swiper 이벤트
		$('html, body').stop().animate({scrollTop:0},200);		
	});
	swiperObj_csgs.on('slideChangeTransitionEnd', function(){ //swiper 이벤트
		var i = swiperObj_csgs.activeIndex;
		var currentTabIdx=$('.csgd_srvc_tab > li').index($('.csgd_srvc_tab > li.on'));
		var currentTabSubIdx=$('.csgd_srvc_tab > li > .csgd_srvc_tab_sub > li').index($('.csgd_srvc_tab_sub > li.on'));
		// console.log("현재슬라이드 : "+i+" / 현재탭 : "+ currentTabIdx +" / 현재서브탭 : "+currentTabSubIdx);
		var tempIdx=0;
		var tempSubIdx=0;
		if(i >= 0 && i <= 2){
			tempIdx=0;
			tempSubIdx=i;
		}else if(i >= 3 && i <= 5){
			tempIdx=1;
			tempSubIdx=i - 3;
		}else  if(i >= 6 && i <= 8){
			tempIdx=2;
			tempSubIdx=i - 6;
		}
		// console.log("currentTabIdx : "+currentTabIdx+" / tempIdx : "+tempIdx+" / tempSubIdx : "+tempSubIdx);
		if(tempIdx == currentTabIdx){
			$('.'+obj).parent().find('.csgd_srvc_tab > li > .csgd_srvc_tab_sub > li').removeClass('on');
			$('.'+obj).parent().find('.csgd_srvc_tab > li.on > .csgd_srvc_tab_sub > li').eq(tempSubIdx).addClass('on');
		}
		if(tempIdx != currentTabIdx){
			$('.'+obj).parent().find('.csgd_srvc_tab > li').removeClass('on');
			$('.'+obj).parent().find('.csgd_srvc_tab > li').eq(tempIdx).addClass('on');
			$('.'+obj).parent().find('.csgd_srvc_tab > li > .csgd_srvc_tab_sub > li').removeClass('on');
			$('.'+obj).parent().find('.csgd_srvc_tab > li.on > .csgd_srvc_tab_sub > li').eq(tempSubIdx).addClass('on');
		}
	});
}
function swiperRoundListActive(obj){ //swiper 활성화 (ex.상풍평-연령)
	var swiperObj_age = new Swiper('.'+obj+'.swiper-container', {
		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 4
	});
}
var reviewImgSwiper = {};
var idx191216 = "";
function reviewImg191216(idx191216){//스타일라이브 상품평연계
    reviewImgSwiper = new Swiper('#reviewImg_'+idx191216, {
        autoHeight: true,
        pagination: {
            el: '.review_img_cont191216 .swiper-pagination',
            clickable: true
        },
    });
}
//swiper관련 e ---------------------------------------------- */

//주문관련 s ------------------------------------------------ */
function optionEditAreaHide(){ //옵션버튼 클릭 이벤트
	//objSlideHide($('.gl_tgl'));
	// [20180621] 디자인 : 애니메이션 효과 제거
	objHide($('.gl_tgl'));
}

function optionEditAreaShow(obj){ //옵션버튼 클릭 이벤트
	optionEditAreaHide();
	objSlideShow(obj);
}
/* //20180830 주석처리 완료
function optionEditGlCountNum(obj,icr){//수량 변경
	var maxNum=5;
	var crtNum=obj.val();
	switch (icr) {
		case "-":
			if(crtNum > 1){
				crtNum--;	
			}else {
				alert("수량은 1개 이상이여야 합니다.");
			}
			break;
		case "+":
			if(crtNum < maxNum){
				crtNum++;	
			}else {
				alert("재고수량 "+maxNum+"개 이하이여야 합니다.");
			}
			break;
		default:
			console.log("수량을 변경할 수 없습니다.");
	}
	obj.val(crtNum);	
}
*/
function setColorRadio(){ //색상 선택 라디오버튼 활성화
	$('.btn_color_wrap li').each(function(){ // 상품옵션변경 컬러 셋팅
		var clr_var=$(this).find('.gl_color_val').text();
		$(this).find('span').css('background',clr_var);
		$(this).find('span').css('border','1px solid'+clr_var);
		if(clr_var == "#ffffff"){ //컬러가 화이트인 경우
			$(this).find('span').css('border','1px solid #d1d1d1')	
		}
	})
}

function orderBtnOn(){ //주문하기 버튼 show
	objHide($('.pymt_select_first'));
	objShow($('.pymt_order_apply'));
}

function orderBtnOff(){ //주문하기 버튼 hide
	objShow($('.pymt_select_first'));
	objHide($('.pymt_order_apply'));
}

function checkboxCheck(obj){ //체크박스 체크
	obj.prop("checked",true);
	// obj.parent().siblings('.txt_box_wrap').removeClass('hidden');
}

function checkboxUncheck(obj){ //체크박스 언체크
	obj.prop("checked",false);
	// obj.parent().siblings('.txt_box_wrap').addClass('hidden');
}

function checkboxCheckExe(obj){ //체크박스 체크유무 체크
	var checkIdx=0;
	$('.'+obj+' > li').each(function(){
			if($(this).find('.check_stl input[type="checkbox"]').is(':checked') && !($(this).find('.check_stl input[type="checkbox"]').is(':disabled'))){
				checkIdx++;
			}
	});
	if(checkIdx!=0){
		orderBtnOn();
	}else{
		orderBtnOff();
	}
}
function checkBoxCheckActive(obj){ //체크박스 체크유무 활성화
	checkboxCheckExe(obj); // 처음 load 시
	$('body').on('change', '.'+obj+' > li .check_stl input[type="checkbox"]', function(){ // click 이벤트 시
		checkboxCheckExe(obj);
	})	
}

function goodslistCheckboxRoof_all(obj){ //체크박스 확인
	var checkAllBln=0;
	var chk_list_all=$('.check_stl.gl_check_all_wrap input[type="checkbox"].gl_check_all');
	var chk_list_item=obj.find('li .check_stl input[type="checkbox"]');
	chk_list_item.each(function(){
		if(!($(this).is(':checked')) && !($(this).is(':disabled'))){ //체크되지 않은 체크박스
			checkAllBln++;
		}
	});
	// console.log("checkAllBln : "+checkAllBln);
	if(checkAllBln==0){ //uncheckbox 갯수 : 0
		checkboxCheck(chk_list_all);
		checkboxCheck(chk_list_item);
	}else if(checkAllBln!=0){ 
		checkboxUncheck(chk_list_all);
	}
	checkboxCheckExe(obj.attr('class')); //상품리스트 체크박스 체크유무 활성화
}

/* 주문관련 script 주석처리(개발에서 재정의 함) : 20180820 s */
/*
function inputValResetBtnCheck(obj){ //초기화버튼 체크
	if(obj.val()!=""){
		obj.siblings('.btn_input_reset').addClass('btn_input_reset_on');
	}else{
		obj.siblings('.btn_input_reset').removeClass('btn_input_reset_on');
	}
}
function toggleBtnInputApply(obj){ //적용, 취소버튼
	if(obj.hasClass('btn_input_apply')){
		obj.removeClass('btn_input_apply').addClass('btn_input_apply_cancel');
		obj.html('취소');
	}else{
		obj.removeClass('btn_input_apply_cancel').addClass('btn_input_apply');
		obj.html('적용');
	}
}
function pointValCheck(obj){ //포인트 
	if(obj.val()!=''){
		var inputVal=Number(obj.val().replace(/[^0-9]/g,''));
		var inputAllVal=Number(obj.parent().find('.check_stl label span').html().replace(/[^0-9]/g,''));
		if(inputAllVal > inputVal){
			obj.parent().find('.check_stl input').attr('checked',false);
		}else if(inputAllVal == inputVal){
			obj.val(setComma(inputAllVal) + " "+obj.attr('data-unit'));
			obj.parent().find('.check_stl input').attr('checked',true);
		}else if(inputAllVal < inputVal){
			obj.val(setComma(inputAllVal) + " "+obj.attr('data-unit'));
			obj.parent().find('.check_stl input').attr('checked',true);
		}
	}else{
		obj.parent().find('.check_stl input').attr('checked',false);
		obj.parent().find('.btnstl2').removeClass('btn_input_apply_cancel').addClass('btn_input_apply');
		obj.parent().find('.btnstl2').html('적용');
	}
	inputValResetBtnCheck(obj);
}
*/
/* 주문관련 script 주석처리(개발에서 재정의 함) : 20180820 e */
//주문관련 e ------------------------------------------------ */

//약관체크관련 s -------------------------------------------- */
function checkboxRoof_all(obj){ //체크박스 확인
	var checkAllBln=0;
	var checkMustBln=0;
	var checkSubMustBln1=0;
	var checkSubMustBln2=0;
	var chk_all_agree=$('input[type="checkbox"].chk_all_agree')
	var chk_must_agree=$('input[type="checkbox"].chk_must_agree')
	var chk_sub_must_agree1=$('input[type="checkbox"].chk_sub_must_agree_1')
	var chk_sub_must_agree2=$('input[type="checkbox"].chk_sub_must_agree_2')
	obj.find('.check_stl input[type="checkbox"]').each(function(){
		if(!($(this).is(':checked'))){ //체크되지 않은 체크박스
			checkAllBln++;
			if($(this).parent().hasClass('must')){
				checkMustBln++;
			}
			if($(this).parent().hasClass('sub_must1')){
				checkSubMustBln1++;
			}
			if($(this).parent().hasClass('sub_must2')){
				checkSubMustBln2++;
			}
		}
	});
	/*
	console.log("checkAllBln : "+checkAllBln);
	console.log("checkMustBln : "+checkMustBln);
	console.log("checkSubMustBln1 : "+checkSubMustBln1);
	console.log("checkSubMustBln2 : "+checkSubMustBln2);
	*/
	if(checkAllBln==0){ //uncheckbox 갯수 : 0
		checkboxCheck(chk_all_agree);
		checkboxCheck(chk_must_agree);
	}else if(checkAllBln!=0 && checkMustBln==0){ 
		checkboxUncheck(chk_all_agree);
		checkboxCheck(chk_must_agree);
		if(checkSubMustBln1==0 && checkSubMustBln2==0){
			if(obj.hasClass('certify_policy_wrap')){
				checkboxCheck(chk_all_agree);
			}			
			checkboxCheck(chk_sub_must_agree1);
			checkboxCheck(chk_sub_must_agree2);
		}else if(checkSubMustBln1==0 && checkSubMustBln2!=0){
			checkboxCheck(chk_sub_must_agree1);
			checkboxUncheck(chk_sub_must_agree2);
		}else if(checkSubMustBln1!=0 && checkSubMustBln2==0){
			checkboxUncheck(chk_sub_must_agree1);
			checkboxCheck(chk_sub_must_agree2);
		}else if(checkSubMustBln1!=0 && checkSubMustBln2!=0){
			 checkboxUncheck(chk_sub_must_agree1);
			 checkboxUncheck(chk_sub_must_agree2);
		}
	}else if(checkAllBln!=0 && checkMustBln!=0){ 
		checkboxUncheck(chk_all_agree);
		checkboxUncheck(chk_must_agree);
	}
}
//약관체크관련 e -------------------------------------------- */

//PG사관련 s ------------------------------------------------ */
function vkeypadPositionScrl(){
	var screenH=$(window).height();
	var vkpadH=$('.vkeypad_box').height();
	var lyrTopH=$('.lyrpp_top').height();
	var lyrMidH=$('.lyrpp_mid').height();
	var mrgbtm=Math.abs(screenH - (lyrTopH + lyrMidH + vkpadH));
	/*
	console.log(lyrTopH +"_"+ lyrMidH +"_"+ vkpadH)
	console.log((lyrTopH +lyrMidH + vkpadH))
	console.log(screenH)
	*/
	if((lyrTopH + lyrMidH + vkpadH) > screenH){
		$('.lyrpp_mid').css('margin-bottom',vkpadH+'px')
	}else{
		$('.lyrpp_mid').css('margin-bottom','0')
	}
}
//PG사관련 e ------------------------------------------------ */

//마이페이지관련 s ------------------------------------------ */
function slideListArrowChck(obj){ //slide list
	obj.find('li').each(function(){
  	if($(this).find('.q_hidden').height() <= 1){
  		$(this).find('.q_ttl').addClass('open');
  	}else{
  		$(this).find('.q_ttl').removeClass('open');
  	}
  })
}
function runChartStart(){ //등급 모션 시작
  chkEffwInview();
  var tempW = $('.lv_anchor').attr('data-value');
  var nidx= Math.floor(tempW / 33.33);
  runChartEnd(nidx);
  $('.lv_anchor').addClass('lv_anchor_'+String(nidx+1));
  $('.progressbar').css('width',tempW+'%');
   // setTimeout(function(){runChartEnd(nidx);}, 5000);
}
function runChartEnd(n){ //등급 모션 시작
  var $curStatus = $('.run_chart > li').eq(n);
  $('.run_chart > li').eq(n).addClass('on');
  $curStatus.prevAll().addClass('past');
  $curStatus.nextAll().addClass('future');
  $curStatus.parent('ul').next().find('li').eq(n).addClass('on');
}
function checkSwitchRoof_all(obj){
  var checkAllBln=0;
  obj.find('.sub_switch').each(function(){
    if(!($(this).is(':checked'))){ //체크되지 않은 체크박스
      checkAllBln++;
    }
  });
  // console.log("checkAllBln : "+checkAllBln);
  if(checkAllBln==0){ //uncheckbox 갯수 : 0
    checkboxCheck(obj.parents('.switch_group_wrap').find('#switch_all'));
  }else{
    checkboxUncheck(obj.parents('.switch_group_wrap').find('#switch_all'));
  }
}
//마이페이지관련 e ------------------------------------------ */

//멤버쉽관련 s ---------------------------------------------- */
function vvipMembershipAct(idx){
    //var obj=$('.omemship_graph_wrap.vvip1902 .graph_wrap .graph');
    var obj=$('.vvip1902 .graph_wrap .graph');
    $cur_graph_idx = idx;
    obj.eq(idx).parent().siblings().removeClass('active');
    obj.eq(idx).parent().addClass('active');
    //$('.cs_online_mbr_wrap .slide_border_box.grade').removeClass('active');
    $('.cs_online_mbr_wrap .vvip_tab .slide_border_box.grade').removeClass('active');
    if (obj.eq(idx).parent().hasClass('active')) {
        //var $grade_tab = $('.cs_online_mbr_wrap .slide_border_box.grade.g' + (idx + 1));
        var $grade_tab = $('.cs_online_mbr_wrap .vvip_tab .slide_border_box.grade.g' + (idx + 1));
        $grade_tab.addClass('active');
    }
}   

function onlineMembershipAct(idx){
	//var obj=$('.omemship_graph_wrap.online1902 .graph_wrap .graph');
	var obj=$('.online1902 .graph_wrap .graph');
	$cur_graph_idx = idx;
	obj.eq(idx).parent().siblings().removeClass('active');
	obj.eq(idx).parent().addClass('active');
	//$('.cs_online_mbr_wrap .slide_border_box.grade').removeClass('active');    
	$('.cs_online_mbr_wrap .onlineMembership_tab .slide_border_box.grade').removeClass('active');
	if (obj.eq(idx).parent().hasClass('active')) {
	    //var $grade_tab = $('.cs_online_mbr_wrap .slide_border_box.grade.g' + (idx + 1));
	    var $grade_tab = $('.cs_online_mbr_wrap .onlineMembership_tab .slide_border_box.grade.g' + (idx + 1));
	    $grade_tab.addClass('active');
	}
}

function styleLiveLevelAct(idx){
    var obj=$('.snsLevel2003 .graph_wrap .graph');
    $cur_graph_idx = idx;
    obj.eq(idx).parent().siblings().removeClass('active');
    obj.eq(idx).parent().addClass('active');
}
		
//멤버쉽관련 s ---------------------------------------------- */

//고객센터관련 s -------------------------------------------- */
function tabScrollActive(obj){ // 플로팅 탭 활성화
	var win = $(window);
	var win_top = win.scrollTop();
	// console.log("win_top : "+win_top);
	if ((win_top >= 45)){
		obj.addClass('flt_tab');
	}
	else{
		obj.removeClass('flt_tab');
	}
}
function toTargetSlide(idx){ //targetSlide 추출 후 이동
	if(idx != null){
		$('.csgd_srvc_tab > li').eq(idx).find('> a').trigger('click');
	}
}
function toTargetSlide2(idx){ //targetSlide 추출 후 이동
	if(idx != null){
		$('.csgd_dlvr_srvc_tab > li').eq(idx).find('> a').trigger('click');
	}
}
//고객센터관련 s -------------------------------------------- */

//버튼활성화_for_common s ----------------------------------- */
function btnActive_for_common(){
	// common s ----------------------------------------------- */
	if($('body').find('.btm_fixed_wrap').length > 0){ // 하단 고정 버튼이 있을시 
		$('.hsome_allContents').addClass('fixed_btn_on'); //본문 하단 여백 추가
		$('a.hsome_topBtn').css('bottom','60px'); // 탑버튼 위치 조정
	}
	$('body').on('change', 'select', function(){ //select placeholder color
		$(this).parents('.select_box').addClass('select_box_selected');
	});
	$('body').on('click', '.certi_num_send', function(){
		if(true){
			alert("인증번호가 발송되었습니다.");
			time_count($(this).parent().next('li').find('.left_time_val'));
		}		
	});
	//hold_body 스크롤 막기
	/*
	$('html').on('scroll mousewheel', '.hold_body', function(e){
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	*/
	$('html').on('scroll touchmove mousewheel', 'body', function(){
		var hsc = document.querySelectorAll('.hsome_contents');
		if(hsc.length!=0){
			hsc[0].addEventListener('touchmove', function(e){
				if($('body').hasClass('hold_body')){				
					e.preventDefault();
				}
			}, {						
				passive:false			
			});
		}
	});
	// common e ----------------------------------------------- */
	
	// header s ----------------------------------------------- */
	/*
	$('.h_prev').on('click', function(){ //뒤로가기
		goBack();
	});
	*/
	// header e ----------------------------------------------- */
	
	//input관련 s ------------------------------------------------ */
	$('body').on('keyup', 'input.only_number', function(){ // input 숫자만 입력
		inNumber($(this));
	});
	$('body').on('keyup', 'input[maxlength]', function(){ // 글자수 제한
		maxLengthCheck($(this));
	});
	$('body').on('change', '.attach_file_wrap .file_input input[type="file"]', function(){ //첨부파일 파일명으로 업로드 
		add_file_name($(this));
	}); 
	$('body').on('click', '.attach_file_wrap .del', function(){ //첨부파일 삭제
    $(this).prev('input').val('');
    $(this).hide();
    return false;
  });
  /*
  $('body').on('click', '.hs_datepicker', function(){ //datepicker : 사용안함
  	$(this).datepicker("show");
  });
  */
  $('body').on('change', '.input_email_stl .select_box select', function(){ //이메일 도메인 선택
  	var slctObj=$(this).parents('.input_email_stl');
  	var tempVal=$(this).find(':selected').html();
  	var tempIdx=$(this).parent().find('option').index($(this).find(':selected'));
  	if(tempIdx==0){
  		slctObj.find('.inp_email3 input').val("");
  	}else{
  		slctObj.find('.inp_email3 input').val(tempVal);
  	}
  });
	//input관련 e ------------------------------------------------ */
	
	//탭관련 s ------------------------------------------------ */
	$('.tab_head').on('click', 'li a', function(){ //탭 관련
		$(this).parent('li').siblings('li').removeClass('on');
		$(this).parent('li').addClass('on');
		activeCont = $(this).attr('href');
		selectCont = $('.tab_cont .cont'+activeCont+'')
		selectCont.siblings('.cont').removeClass('on');
		$('.tab_cont '+activeCont+'').addClass('on');
		return false;
	});
	//탭관련 e ------------------------------------------------ */
	
	//divpopup관련 s ------------------------------------------ */
	$('body').on('click', '.btn_popup', function(e) { // divpopup 호출
		e.preventDefault();
		var poptarget=$(this).attr('data-poptarget');
		if(poptarget==undefined){
			// alert("팝업을 찾을 수 없습니다.");
		}else{
			var bpop=$('.divpop_wrap.'+poptarget).bPopup({
				follow: [false, false], 
				escClose:false,
				modalClose:false,
				opacity:0.7,
				positionStyle: 'fixed',
				position:["50%","50%"],
				onClose: function(){holdBodyHide();}
			});
			bpop.show();
			var pstTop="-"+ ((bpop.height()/2)+20) + "px";
			var pstLeft="-"+ ((bpop.width()/2)+20) + "px";
			$('.divpop_wrap.'+poptarget).css('margin-top',pstTop);
			$('.divpop_wrap.'+poptarget).css('margin-left',pstLeft);
			holdBodyShow();
		}
		return false;
	});
	//divpopup관련 e ------------------------------------------ */
	
	//툴팁관련 s ---------------------------------------------- */
	$(document).on('click','.btn_tooltip', function(e){ // 툴팁 열기
		e.preventDefault();
		var tooltipTarget=$(this).attr('data-tooltip-target');
		if(tooltipTarget==undefined){
			alert("팝업을 찾을 수 없습니다.");
		}else{
			var tempHtml=$('.'+tooltipTarget).parent().html();
			$(this).parents().siblings('.tooltip_contens').empty().html(tempHtml);
		}
		objSlideShow($(this).parents().siblings('.tooltip_contens').find('.tooltip_wrap'));
		return false;
	});
	$(document).on('click','.tooltip_contens', function(){ // 툴팁 닫기
		objSlideHide($(this).find('.tooltip_wrap'));
		return false;
	});
	$(document).on('click','.tooltip_contens', '.btn_tltp_close', function(){ // 툴팁 닫기
		objSlideHide($(this).parents('.tooltip_wrap'));
		return false;
	});
	//툴팁관련 e ---------------------------------------------- */
	
	//layerpopup관련 s ---------------------------------------- */
	$('body').on('click', '.btn_layerpopup_call', function(){ //layer_popup 호출
		var targetUrl=$(this).attr('href');
		var targetDepth=$(this).attr('data-layerpop-depth');
		var targetStyle=$(this).attr('data-layerpop-style');
		callLayerPopup(targetUrl,targetDepth,targetStyle);
		return false;
	});
	$('body').on('click', '.btn_ifrm_layerpopup_call', function(){ //layer_popup 호출
		var targetUrl=$(this).attr('href');
		var targetDepth=$(this).attr('data-layerpop-depth');
		var targetStyle=$(this).attr('data-layerpop-style');
		calliFrmLayerPopup(targetUrl,targetDepth,targetStyle);
		return false;
	});
	$('body').on('click', '.zipcode_list_wrap a', function(){ //우편번호찾기 : 리스트클릭
		var tempDetail=$(this).parents('.lyrpp_mid').find('.detail_addrs_wrap');
		var tempZipcode=$(this).find('.zpcl_code').html();
		var tempAddrs=$(this).find('.zpcl_adrs_name .zpcl_con').html();
		objHide($(this).parents('.search_box_wrap'));
		objShow(tempDetail);
		tempDetail.find('.detail_addrs_1').val("["+tempZipcode+"] "+tempAddrs);
		tempDetail.find('.detail_addrs_2').focus();
	});
	//layerpopup관련 e ---------------------------------------- */

	//iFramepopup관련 s --------------------------------------- */
	$('body').on('click', '.btn_ifrmpopup_call', function(){ //layer_popup 호출
		var targetUrl=$(this).attr('href');
		var targetDepth=$(this).attr('data-layerpop-depth');
		var targetStyle=$(this).attr('data-layerpop-style');
		calliFramePopup(targetUrl,targetDepth,targetStyle);
		return false;
	});
	//iFramepopup관련 e --------------------------------------- */
}
//버튼활성화_for_common e ---------------------------------------------- */

//버튼활성화_for_assist s ----------------------------------- */
function btnActive_for_assist(){
	//약관체크관련 s ------------------------------------------ */
	$('body').on('change' ,'.chk_agree_wrap.view_more .check_stl input[type="checkbox"]', function(){	//개별 동의 항목 토글
		if(!$(this).hasClass('chk_sub_must_agree')){
			 checkboxRoof_all($('.chk_agree_wrap.view_more'));
		}		
	});
	$('body').on('change' ,'.chk_agree_wrap input[type="checkbox"].chk_all_agree', function(){	//전체 동의 항목 토글
		var all_checkbox=$(this).parents('.chk_agree_wrap').siblings('.view_more').find('.check_stl input[type="checkbox"]');
		if($(this).is(':checked')){
			checkboxCheck(all_checkbox);
		}else{
			checkboxUncheck(all_checkbox);
		}
		checkboxRoof_all($('.chk_agree_wrap.view_more'));
	});
	$('body').on('change' ,'.chk_agree_wrap input[type="checkbox"].chk_must_agree', function(){	//필수 동의 항목 토글
		var must_checkbox=$(this).parents('.chk_agree_wrap').siblings('.view_more').find('.check_stl.must input[type="checkbox"]');
		var optional_checkbox=$(this).parents('.chk_agree_wrap').siblings('.view_more').find('.check_stl.optional input[type="checkbox"]');
		if($(this).is(':checked')){
			checkboxCheck(must_checkbox);
			checkboxUncheck(optional_checkbox);
		}else{
			checkboxUncheck(must_checkbox);
			checkboxUncheck(optional_checkbox);
		}
		checkboxRoof_all($('.chk_agree_wrap.view_more'));
	});
	$('body').on('change' ,'.chk_agree_wrap input[type="checkbox"].chk_sub_must_agree', function(){	//하위 필수 동의 항목 토글
		var sub_must_checkbox=$(this).parents('.chk_agree_sub_wrap').find('.check_stl.sub_must input[type="checkbox"]');
		var sub_optional_checkbox=$(this).parents('.chk_agree_sub_wrap').find('.check_stl.sub_optional input[type="checkbox"]');
		if($(this).is(':checked')){
			checkboxCheck(sub_must_checkbox);
			checkboxUncheck(sub_optional_checkbox);
		}else{
			checkboxUncheck(sub_must_checkbox);
			checkboxUncheck(sub_optional_checkbox);
		}
		checkboxRoof_all($('.chk_agree_wrap.view_more'));
	});
	$('body').on('click', '.chk_agree_wrap .btn_policy_show', function(){ //이용약관동의 > 약관보기
		var targetPolicy=$(this).parents('.chk_agree_wrap').parent().find('.chk_agree_wrap.view_more');
		targetPolicy.find('.txt_box_wrap').removeClass('hidden');
	});
	$('body').on('click', '.chk_agree_wrap .btn_policy_show2', function(){ //본인인증 > 약관보기
		// 20180903 전체약관동의 버튼 수정 s
		/*
		var targetPolicy=$(this).parents('.chk_agree_wrap').parent().find('.chk_agree_wrap.view_more');
		$('.certify_policy_wrap').stop().slideToggle(200);
		if($('.certify_policy_wrap').height()>1){
			$(this).html("약관보기");
			$(this).parents('.certify_chk_wrap').removeClass('on');
		}else{
			$(this).html("약관접기");
			$(this).parents('.certify_chk_wrap').addClass('on');
		}
		*/
		var targetPolicy=$(this).parents('.chk_agree_wrap').parent().find('.chk_agree_wrap.view_more.certify_policy_wrap');
		targetPolicy.stop().slideToggle(200);
		if(targetPolicy.height()>100){
			$(this).html("약관보기");
			$(this).parents('.view_policy_btn').removeClass('on');
		}else{
			$(this).html("약관접기");
			$(this).parents('.view_policy_btn').addClass('on');
		}
		// 20180903 전체약관동의 버튼 수정 e
	});
	$('body').on('click', '.chk_agree_wrap.view_more .agree_more_btn', function(){ //본인인증 > 약관내용보기
		var tmpbar = $(this).find('.slide_border_box_icon .bar_horizontal');
		if (tmpbar.hasClass('plus')) {
			tmpbar.removeClass('plus')	
			tmpbar.addClass('minus')
		} else {
			tmpbar.removeClass('minus')	
			tmpbar.addClass('plus')
		}
		var tempTextBox=$(this).parent().siblings('.txt_box_wrap');
		if($(this).hasClass('active')){
			// $(this).parent().siblings('.txt_box_wrap').removeClass('hidden');
			objSlideHide(tempTextBox);
		}else{
			// $(this).parent().siblings('.txt_box_wrap').addClass('hidden');
			objSlideShow(tempTextBox);
		}
		$(this).toggleClass('active');
	});
	//약관체크관련 e ------------------------------------------ */
	
	//주문관련 s ---------------------------------------------- */
	$('body').on('click', '.btn_hs_promotion', function(){ //promotion 플루팅 버튼
		$(this).addClass('upper');
		var targetPst=$('#promotion_wrap').offset().top;
		$('html, body').stop().animate({scrollTop:targetPst - (($(window).height() - $('#promotion_wrap').outerHeight())/2)},500);
		objHide($(this));
		setCookieBtn('btn_hs_promotion'); //setCookies
	});
	$('body').on('change' ,' .check_stl.gl_check_all_wrap input[type="checkbox"].gl_check_all', function(){	//전체상품 체크박스
		var obj=$('.goods_list_wrap');
		var chk_gl_item=obj.find('li .check_stl input[type="checkbox"]');
		if($(this).is(':checked')){
			checkboxCheck(chk_gl_item);
		}else{
			checkboxUncheck(chk_gl_item);
		}
		goodslistCheckboxRoof_all(obj);	
	});
	$('body').on('change' ,'.goods_list_wrap li .check_stl input[type="checkbox"]', function(){	//개별상품 체크박스
		var obj=$(this).parents('ul');
		goodslistCheckboxRoof_all(obj);	
	});
	$('body').on('click', '.goods_list_wrap .gl_top_btns a', function(){ //상품 리스트 상단 버튼
		//$(this).toggleClass('icon_btn_on');
	});
	$('body').on('click', '.goods_list_wrap .btn_option_edit', function(){ //옵션변경 영역 활성화
		var targetObj=$(this).parents('.gl_item').find('.gl_tgl.gl_tgl_option');
		if(targetObj.css('display')!="none"){
			$(this).removeClass('on');
			objSlideHide(targetObj);
		}else{
			$(this).addClass('on');
			optionEditAreaShow(targetObj);
		}
	});
	$('body').on('click', '.goods_list_wrap .gl_count_edit .btn_minus', function(){ //옵션 수량 - 변경
		//optionEditGlCountNum($(this).parent().find('.gl_count_num input[type="text"]'),"-"); //20180830 주석처리 완료
		scaling($(this)); //scale interaction
	});
	$('body').on('click', '.goods_list_wrap .gl_count_edit .btn_plus', function(){ //옵션 수량 + 변경
		//optionEditGlCountNum($(this).parent().find('.gl_count_num input[type="text"]'),"+");  //20180830 주석처리 완료
		scaling($(this)); //scale interaction
	});
	$('body').on('click', '.goods_list_wrap .gl_tgl_btns .btn_cancel', function(){ //옵션변경 영역 비활성화
		optionEditAreaHide();
	});
	$('body').on('click', '.goods_list_wrap .btn_store_edit', function(){ //옵션변경 영역 활성화
		optionEditAreaShow($(this).parents('.gl_item').find('.gl_tgl.gl_tgl_store'));
	});
	$('body').on('click', '.df_box_slide .df_box_tit', function(){ //df_box slide 클릭 이벤트
		$(this).parent().find('.df_box_slide_con').stop().slideToggle(200);
		$(this).parent().toggleClass('df_box_slide_on');
		
		if($(this).parent().hasClass("df_box_slide_on")){
    		if($(".df_box_slide .pre_order_txt1903_s").length > 0){
    		    $(".df_box_slide .pre_order_txt1903_s").show();
    		}
		}else{
		    if($(".df_box_slide .pre_order_txt1903_s").length > 0){
		        $(".df_box_slide .pre_order_txt1903_s").hide();
		    }
		}
	});
	$('body').on('click', '.df_box_slide_v2 .df_box_slide_v2_anchor', function(){ //df_box slide_v2 클릭 이벤트
		$(this).parent().find('.df_box_slide_con').stop().slideToggle(200);
		$(this).parent().toggleClass('df_box_slide_on');
	});
	
	$('body').on('click', '.select_list_wrap .slcted_item', function(){ //select_list_wrap slide 클릭이벤트
		$(this).parent().find('.slct_list_con').stop().slideToggle(200);
		$(this).parent().toggleClass('select_list_wrap_on');
	});
	$('body').on('change', '.select_list_wrap .radio_stl input[type="radio"]', function(){ //select_list_wrap slide 클릭이벤트(배송지정보)
		// 211026 공동현관 출입방법 S
		if($(this).parents('.select_list_wrap').hasClass('enter-door211026')) return;
		// 211026 공동현관 출입방법 E
		
		if($(this).is(':checked')){
		    if($(this).parent().find('.slct_con').attr('deliveryRequestMessage') == undefined 
	                        || $(this).parent().find('.slct_con').attr('deliveryRequestMessage') == ""
	                        || $(this).parent().find('.slct_con').attr('deliveryRequestMessage') == null){
		        var tempSlted=$(this).parent().find('.slct_con').html();
		    }else{
		        // 배송 요청 메세지 개편 된 페이지만 적용
	    		var tempSlted = $(this).parent().find('.slct_con').attr('deliveryRequestMessage');
		    	if($(this).parent().find('.slct_con').data('messageType') == 'recentDelivery'){
		    		if($(this).parent().parent().hasClass('slct_list_item_self')){
		    			tempSlted = '직접입력';
		    			var tempOrderr = $(this).parent().find('.slct_con').attr('deliveryRequestMessage');
		    			$(this).parents('.ipt_con').find('#orderr').val(tempOrderr);
		    		}
		    	}
		        
		    }
		}
		$(this).parents('.select_list_wrap').find('.slcted_item .slct_con').html(tempSlted);
		$(this).parents('.select_list_wrap').removeClass('select_list_wrap_on');
		objSlideHide($(this).parents('.select_list_wrap').find('.slct_list_con'));
	});
	$('body').on('click', '.select_list_dlvr_msg .slct_list_con .slct_list_item', function(){ //select_list_wrap slide 클릭이벤트(배송메세지 > 직접입력)
		if($(this).hasClass('slct_list_item_self')){
			objSlideShow($('.slct_list_item_self_input'));

			// 211026 공동현관 출입방법 S
			objSlideHide($('.enter-door211026'));
			// 211026 공동현관 출입방법 E

		}else {
			objSlideHide($('.slct_list_item_self_input'));

			// 211026 공동현관 출입방법 S
			objSlideShow($('.enter-door211026'));
			// 211026 공동현관 출입방법 E
		}
	});

	/* 주문관련 script 주석처리(개발에서 재정의 함) : 20180820 s */
	/*
	$('body').on('blur', '.mpg_list_wrap .mpg_input input.set_comma', function(){ // 포인트사용관련 : blur
		if($(this).val()!=""){
			$(this).val(setComma($(this).val()) + " "+$(this).attr('data-unit'));
		}
		inputValResetBtnCheck($(this));
		pointValCheck($(this));
	});
	$('body').on('focus', '.mpg_list_wrap .mpg_input input.set_comma', function(){ // 포인트사용관련 : focus
		inNumber($(this));
		inputValResetBtnCheck($(this));
	});
	$('body').on('change', '.mpg_list_wrap .mpg_input .check_stl input', function(){ // 포인트사용관련 : 전액사용
		var tempVal=$(this).siblings('label').find('span').html();
		var tempInput=$(this).parents('.mpg_input').find('input.set_comma');
		if($(this).is(':checked')){
			tempInput.val(setComma(tempVal) + " "+tempInput.attr('data-unit'));
			inputValResetBtnCheck(tempInput);
		}else{
			tempInput.val("");
			inputValResetBtnCheck(tempInput);
		}
	});
	$('body').on('click', '.mpg_list_wrap .mpg_input .btn_input_reset', function(){ // 포인트사용관련 : 초기화
		$(this).parent().find('.set_comma').val('');
		pointValCheck($(this).parent().find('.set_comma'));
	});	
	$('body').on('click', '.mpg_list_wrap .mpg_input .btn_input_apply', function(){ // 포인트사용관련 : 적용버튼
		toggleBtnInputApply($(this));
	});
	$('body').on('click', '.mpg_list_wrap .mpg_input .btn_input_apply_cancel', function(){ // 포인트사용관련 : 취소버튼
		toggleBtnInputApply($(this));
		$(this).parent().find('.set_comma').val('');
		pointValCheck($(this).parent().find('.set_comma'));
	});
	$('body').on('change', '.coupon_list_wrap .check_stl input[type="checkbox"]', function(){ // 쿠폰적용관련 : 체크박스 하나만 유지
		var tempIdx=$('.coupon_list_wrap li').index($(this).parents('li'));
		$('.coupon_list_wrap li').each(function(i){
			if(i!=tempIdx){
				$(this).find('.check_stl input[type="checkbox"]').attr("checked",false);
			}
		});
	});
	$('body').on('blur', '.coupon_insert input[type="text"]', function(){ // 쿠폰적용관련 : blur
		inputValResetBtnCheck($(this));
	});
	$('body').on('click', '.coupon_insert .btn_input_reset', function(){ // 쿠폰적용관련 : 초기화
		$(this).parent().find('input[type="text"]').val('');
		inputValResetBtnCheck($(this).parent().find('input[type="text"]'));
		$(this).parent().find('.btnstl2').removeClass('btn_input_apply_cancel').addClass('btn_input_apply');
		$(this).parent().find('.btnstl2').html('적용');
	});
	$('body').on('click', '.coupon_insert .btn_input_apply', function(){ // 쿠폰적용관련 : 적용버튼
		toggleBtnInputApply($(this));
	});
	$('body').on('click', '.coupon_insert .btn_input_apply_cancel', function(){ // 쿠폰적용관련 : 취소버튼
		toggleBtnInputApply($(this));
	});
	*/
	/* 주문관련 script 주석처리(개발에서 재정의 함) : 20180820 e */

//	$('body').on('click', '.pct2', function(){ //일반결제 탭 클릭
//	    var nowDate = new Date(), smile202011StartDate = new Date('2020/11/02 09:00:00'), smile202011EndDate = new Date('2020/11/30 23:59:59');
//        if( nowDate.getTime() >= smile202011StartDate.getTime() && nowDate.getTime() <= smile202011EndDate.getTime() ){
//            $(".smilepay_banner_wrap").find("img").attr("src","http://cdn.thehandsome.com/mobile/event/detail/image/m_banner_smilepay_201028.jpg?v=201028");
//        }
//	})
	
	$('body').on('click', '.general_pay_list > li a', function(){ //일반결제 종류 선택
		var tempVal=$(this).attr('data-g-pay-kind');
		
		if(tempVal == "redvoucher") {
			var hasClass = $(this).hasClass("disable");
			if(hasClass) {
				return false;
			}
		}
		
		$('.general_pay_list li').removeClass('on');
		$('.general_pay_desc').removeClass('on');
		$(this).parent().addClass('on');
		if($("#quickTime").length < 1){
		    $('.general_pay_desc.gpd_con_'+tempVal).addClass('on');
		}
		
		$("#redVoucherBenefit").hide(); // 레드 바우처 NOTICE
        $(".hyRed_banner_wrap").hide(); // 레드 바우처 이벤트 배너
        $(".smilepay_banner_wrap").hide(); // 스마일페이 이벤트 배너
        $(".tosspay_banner_wrap").hide(); // 토스페이 이벤트 배너
        $(".payco_banner_wrap").hide(); // 페이코 이벤트 배너
        $(".hympoint_banner_wrap").hide();// 현대 M포인트 이벤트 배너
        $("#cardBenefit").hide(); // 카드 행사 혜택
    	$(".NEWhyRed_banner_wrap").hide();// 현대카드 3,4,5 배너
        $("#NEWredVoucherBenefit").hide();// 현대카드 3,4,5 NOTICE
        
        
        if(tempVal == "credit"){
            $("#cardBenefit").show();
            $(".hympoint_banner_wrap").show();
        }else if(tempVal == "smilepay"){
        	// 20220526 스마일페이 배너 2022년 6월 01일 자정부터 삭제
			var nowDate = new Date();
			var testDate = $.urlParam('testDate');
			var smilePayBannerEndDate = null;
			if(testDate != null){
				var splitDate = testDate.split('-');
				if(splitDate.length == 3){
					smilePayBannerEndDate = new Date(parseInt(splitDate[0]),parseInt(splitDate[1])-1,parseInt(splitDate[2]));
				}else{
					smilePayBannerEndDate = new Date(2022,5,01);
				}
			}else{
				smilePayBannerEndDate = new Date(2022,5,01);
			}
			
			if(nowDate < smilePayBannerEndDate){
				$(".smilepay_banner_wrap").show();
			}else{
				$("#cardBenefit").show();
			}
        }else if(tempVal == "redvoucher") {
        	var nowDate = new Date();
        	var newDate = new Date('2022-06-30 10:00:00');
        	if(nowDate.getTime() <= newDate.getTime()){
            $(".hyRed_banner_wrap").show();
            $("#redVoucherBenefit").show();
        	}else{
        	$(".NEWhyRed_banner_wrap").show();
            $("#NEWredVoucherBenefit").show();
        	}
        }else if(tempVal == "tosspay"){
            // 토스 이벤트 배너 이벤트 기간에만 노출
            var nowDate = new Date();
            var tossEventStartDate = new Date(2020, 6, 01);
            var tossEventEndDate = new Date(2020, 6, 31);
            
            // 토스 이벤트 배너 추가 시 여기 작업
            if(tossEventStartDate <= nowDate && nowDate < tossEventEndDate ){
                $("#cardBenefit").show();
                $(".tosspay_banner_wrap").show();
            }else{
                $("#cardBenefit").show();
            }
            // 토스트 이벤트 배너 노출 기간 아닐때 카드 행사 혜택만 노출
            //$("#cardBenefit").show();
        }else if(tempVal == "kakakopay"){
            $("#cardBenefit").show();
        }else if(tempVal == "payco"){
        	//#3068 [수정] 결제수단 선택 영역 띠배너 & 노티스 문구 수정 (현대카드, 페이코) hyunbae 20220620
        	$(".payco_banner_wrap").show();
        }else{
            $("#cardBenefit").show();
        }
        
		if(tempVal == "virtual_account"){
		    $("#virtualText").show();
		    if('true' == $(this).attr('data-g-order-stop')){
		        var lc = new layerAlert("고객님은 [가상계좌 주문] 이용불가 대상입니다.<BR>다른 결제수단 이용 부탁드립니다. 감사합니다.");
		        lc.confirmAction = function(){
		        };
		    }
		}else{
		    $("#virtualText").hide();
		}
	});
	$('body').on('click', '.receive_store_info_wrap .btn_receive_date_edit', function(){ // 수령일변경 활성화
		objSlideHide($('.receive_store_info_tgl'));
		$(this).parents('.df_box').siblings('.tgl_receive_date_edit').stop().slideToggle(200);
	});
	$('body').on('click', '.receive_store_info_tgl .btn_cancel', function(){ // 수령일변경 비활성화
		objSlideHide($(this).parents('.receive_store_info_tgl'));
	});

	/* 주문관련 script 주석처리(개발에서 재정의 함) : 20180820 s */
	/*
	$('body').on('click', '.receive_store_info_wrap .location_btn', function(){ // 수령매장 지도 활성화
		objSlideHide($('.receive_store_info_tgl'));
		$(this).parents('.df_box').siblings('.tgl_receive_store_map').stop().slideToggle(200);
	});
	*/
	/* 주문관련 script 주석처리(개발에서 재정의 함) : 20180820 e */

	$('body').on('change', '.delivery_date_time_wrap .radio_stl input[type="radio"]', function(){ // 앳홈 배송일자 시간 선택
		var bln_chck=0;
		$('.delivery_date_time_wrap input[type="radio"]').each(function(){
			if($(this).is(':checked')){
				bln_chck++;
			}
		});
		if(bln_chck>0){
			objShow($('.pymt_apply_athome'));
			objHide($('.pymt_select_delivery_date'));
		}else{
			objHide($('.pymt_apply_athome'));
			objShow($('.pymt_select_delivery_date'));
		}
	});
	$('body').on('click', '.mpg_select_wrap .mpg_select_ui li a', function(){ // 원클릭결제 쿠폰/포인트 선택
		$('.mpg_select_wrap .mpg_select_ui li').removeClass('on');
		$(this).parents('li').addClass('on');
	});	
	//주문관련 e ---------------------------------------------- */
	
	//멤버쉽관련 s -------------------------------------------- */
	// 20180730 수정 
	// $('body').on('change', '.input_group input', function(){ // input 텍스트 값 존재 여부 체크
	// 	var str = $(this);
	// 	if(str.val().length > 0){
	// 		str.addClass('input_active');
	// 	}else {
	// 		str.removeClass('input_active');
	// 	}
	// });
	$('body').on('change', '.nonmember_wrap .input_group > div', function(){ // 주문번호 uppercase
		$(this).find('input.login_ord_num').addClass('txt_upr');
	});
	$('body').on('click', '.hsmember_wrap .find_opt.certi > li', function(){ //본인인증 방법 선택
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
	});
	$('body').on('click', '.idpw_find_result .ui_tab li', function(){  //아이디 찾기 결과 페이지에서 통합회원찾기 영역 숨김
		var $curTab = $(this).find('a').attr('href'),
				$resId = '#tab_01',
				$findLogin = $('.login_find_area');					
		// console.log($curTab != $resId);	
		if($curTab != $resId){
			$findLogin.show();
		} else{
			$findLogin.hide();
		}
	});
	$('body').on('click', '.omemship_graph_wrap.vvip1902 .graph_wrap .graph', function(){
      vvipMembershipAct($(this).parent().index()); // 한섬 VVIP
	});
	$('body').on('click', '.omemship_graph_wrap.online1902 .graph_wrap .graph', function(){
	    onlineMembershipAct($(this).parent().index()); // 온라인 멤버쉽
	});
	$('body').on('click', '.omemship_graph_wrap.snsLevel2003 .graph_wrap .graph', function(){
        styleLiveLevelAct($(this).parent().index()); // 스타일라이브 레벨
    });
	//멤버쉽관련 e -------------------------------------------- */
	
	//고객센터관련 s -------------------------------------------- */
	$('body').on('click', '.cs_list_hd', function(){// list 내용 토글
    $(this).next('.cs_list_ct').slideToggle(200);
  });
  $('body').on('keyup', '.search_box_v2 .search_box_input', function(){ //검색어 입력 이벤트
  	var tempWord=$(this).val();
  	if(tempWord!=""){
  		$(this).parent().addClass('searching');
  	}else{
  		$(this).parent().removeClass('searching');
  	}
  });
  $('body').on('click', '.search_box_v2.searching .keyword_reset_btn', function(){ //검색어 입력 이벤트
  	$(this).parent().find('.search_box_input').val("");
  	$(this).parent().removeClass('searching');
  });
  $('body').on('keyup', '.search_box_v3 .search_box_input', function(){ //검색어 입력 이벤트
  	var tempWord=$(this).val();
  	if(tempWord!=""){
  		$(this).parent().addClass('searching');
  	}else{
  		$(this).parent().removeClass('searching');
  	}
  });
  $('body').on('click', '.search_box_v3.searching .keyword_reset_btn', function(){ //검색어 입력 이벤트
  	$(this).parent().find('.search_box_input').val("");
  	$(this).parent().removeClass('searching');
  });
	$('body').on('click', '.search_result_list .del', function(){ //상품 검색 결과 목록 삭제
    $(this).parents('.search_res_prod').remove();
    return false;
	});
	$('body').on('click', '.cs_online_mbr_wrap .btn_more', function(){
      $(this).parents('.df_box').find('.tgl_box').toggleClass('on');
      $(this).toggleClass('on');
    });
	$('.csgd_benefit_tab').on('click', 'li a', function(){ //탭 관련
		var li_idx=$('.csgd_benefit_tab li').index($(this).parent()) + 1;
		$(this).parents('.csgd_benefit_tab').removeClass('crrt_item_1 crrt_item_2 crrt_item_3 crrt_item_4');
		$(this).parents('.csgd_benefit_tab').addClass('crrt_item_'+li_idx);
		$(this).parent('li').siblings('li').removeClass('on');
		$(this).parent('li').addClass('on');
		activeCont = $(this).attr('href');
		selectCont = $('.tab_cont .cont'+activeCont+'')
		selectCont.siblings('.cont').removeClass('on');
		$('.tab_cont '+activeCont+'').addClass('on');
		return false;
	});
	$('body').on('click', '.csgd_order_pay_tab li a', function(){  //도움말(주문/결제) 탭 이벤트
		var li_idx=$('.csgd_order_pay_tab li').index($(this).parent());
		$('.csgd_order_pay_tab_desc li').removeClass('on');
		$('.csgd_order_pay_tab_desc li').eq(li_idx).addClass('on');
		$(this).parent('li').siblings('li').removeClass('on');
		$(this).parent('li').addClass('on');
		return false;
	});
	$('body').on('click', '.csgd_dlvr_srvc_tab li a', function(){  //도움말(딜리버리서비스) 탭 이벤트
		$(this).parent('li').siblings('li').removeClass('on');
		$(this).parent('li').addClass('on');
		return false;
	});
	$('body').on('click', '.csgd_srvc_tab > li a', function(){  //도움말 탭 이벤트
		$(this).parent('li').siblings('li').removeClass('on');
		$(this).parent('li').addClass('on');
		return false;
	});
	$('body').on('click', '.slide_gray_box .sgb_tit', function(){ //df_box slide 클릭 이벤트
		// $(this).parent().find('.sgb_con').stop().slideToggle(200);
		// $(this).parent().toggleClass('slide_gray_box_on');
	});
  //고객센터관련 e -------------------------------------------- */
  
  //마이페이지관련 s ------------------------------------------ */
  $('body').on('click', '.time_line_wrap .ntfc_item_slide', function(){ //알림 클릭
  	if($(this).hasClass('on')){
  		objSlideHide($(this).find('.ntfc_txt_detail_con'));
  	}else{
  		objSlideShow($(this).find('.ntfc_txt_detail_con'));
  	}
  	$(this).toggleClass('on')
  });
  $('body').on('click', '.btn_more_action', function(){ //주문상태 변경 버튼
  	$(this).parents('.mp_order_dlvr_list_wrap').find('.more_action_ul_wrap').hide();
  	$(this).next('.more_action_ul_wrap').show();
  });
  $('body').on('click', '.more_action_ul_wrap .btn_more_action_ul_close', function(){ //주문상태 변경 레이어팝업 닫기
  	$(this).parents('.more_action_ul_wrap').hide();
  });
  $('body').on('click', '.slide_border_box .sbb_tit', function(){ //slide_border_box 클릭이벤트
  	var tmpbar = $(this).find('.slide_border_box_icon .bar_horizontal');
		if (tmpbar.hasClass('plus')) {
			tmpbar.removeClass('plus')	
			tmpbar.addClass('minus')
		} else {
			tmpbar.removeClass('minus')	
			tmpbar.addClass('plus')
		}
  	$(this).parents('.slide_border_box').toggleClass('slide_border_box_on');
  	$(this).next('.sbb_slide_con').slideToggle(200);

  });
  var $sla_cur_index, $sla_pre_index;
  $('body').on('click','.slide_list_arrow_wrap .qna_l_list li > a', function(){ //slide_list_arrow style (ex. 1:1문의, 상품문의)
    $sla_cur_index = $(this).parent().index();
    if ($sla_cur_index == $sla_pre_index) {
      $(this).next().stop(false, true).slideToggle('fast');
      $('.qna_l_list li.on').toggleClass('on');
    } else {
      $('.qna_l_list li .q_hidden').stop(false, true).slideUp('fast');
      $('.qna_l_list li.on').removeClass('on');
      $('.qna_l_list li').eq($sla_cur_index).find('.q_hidden').stop(false, true).slideDown('fast');
      $('.qna_l_list li').eq($sla_cur_index).addClass('on');
    }
    $sla_pre_index = $sla_cur_index;
    slideListArrowChck($(this).parents('.qna_l_list'));
    return false;
  });
  $('body').on('click', '.grid_4 li > a', function(e){ // 기간 조건검색시 날짜선택 박스 show/hide
  	$(this).parents('ul').find('li').removeClass('on');
  	$(this).parent().addClass('on');
    if(e.target.className != 'sort_date'){
      objSlideHide($(this).parents('ul').next('.sort_date_input_wrap'));
    } else{          
      objSlideShow($(this).parents('ul').next('.sort_date_input_wrap'));
    }        
  })
  $('body').on('click', '.grid_3 li > a', function(e){ // egift 탭버튼 추가
  	$(this).parents('ul').find('li').removeClass('on');
  	$(this).parent().addClass('on');
  })
  $('body').on('click','.mp_wishlist_wrap .ui_tab.red_border_tab li', function(){ //위시리스트 탭 클릭시 fixed_btn_on 토글
  	var tempIdx=$('.mp_wishlist_wrap .ui_tab.red_border_tab li').index($(this));
  	//console.log(tempIdx);
  	if(tempIdx==0){
  		$('.hsome_allContents').addClass('fixed_btn_on');
  	}else if(tempIdx==1){
  		$('.hsome_allContents').removeClass('fixed_btn_on');
  	}
  });
	$('body').on('click', '.select_list_back_reason.slct_depth_1 .slct_list_con .slct_list_item', function(){ //반품사유 depth1 관련
			objSlideShow($('.select_list_back_reason.slct_depth_2'));
			objSlideHide($('.select_list_back_price'));
			objSlideHide($('.slct_list_item_self_input'));
			/*
			if($(this).hasClass('slct_list_item_backprice') && $(this).find('input').is(':checked')){
				objSlideShow($('.select_list_back_price'));
			}else {
				objSlideHide($('.select_list_back_price'));
			}
			*/
	});
	$('body').on('click', '.select_list_back_reason.slct_depth_2 .slct_list_con .slct_list_item', function(){ //반품사유 depth2 관련
			if($(this).hasClass('slct_list_item_etc') && $(this).find('input').is(':checked')){
				objSlideShow($('.slct_list_item_self_input'));
			}else {
				objSlideHide($('.slct_list_item_self_input'));
			}
			if($('.select_list_back_reason.slct_depth_1 .slct_list_item_backprice input').is(':checked')){
				objSlideShow($('.select_list_back_price'));
			}else {
				objSlideHide($('.select_list_back_price'));
			}
	});
	$('body').on('click', '.benefit_list > li > a', function(){ //회원등급 슬라이드 리스트
    if($(this).parent('li').hasClass('on')){
    	objSlideHide($(this).parent('li').find('.bf_txt'));
    	$(this).parent('li').removeClass('on');
    }else{
    	objSlideShow($(this).parent('li').find('.bf_txt'));
    	$(this).parent('li').addClass('on');
    }    
  });
  $('body').on('click', '.my_size_wrap .my_size_set', function(){ //나의 사이즈 설정 토글
    if($(this).parent('.my_size_wrap').hasClass('on')){
    	objSlideHide($(this).parent('.my_size_wrap').find('.hs_form_list'));
    	objSlideHide($(this).parent('.my_size_wrap').find('.btn_wrap'));
    	$(this).find('.my_size_title').text('자세히 보기');
    }else{
    	objSlideShow($(this).parent('.my_size_wrap').find('.hs_form_list'));
    	objSlideShow($(this).parent('.my_size_wrap').find('.btn_wrap'));
    	swiperRoundListActive('rd_box_radio_wrap.age'); //swiper 활성화
    	swiperRoundListActive('rd_box_radio_wrap.case'); //swiper 활성화
    	$(this).find('.my_size_title').text('닫기');
    }
    $(this).parent('.my_size_wrap').toggleClass('on');
  });
  $('body').on('click', '.review_con_wrap', function(){ //상품평 펼쳐보기
  	if($(this).hasClass('on')){
  		//objSlideHide($(this).find('.review'));
  		//objSlideShow($(this).find('.review_thumb'));

  		$(this).parent().find('.review_info_box > ul').hide();
  		$(this).parent().find('.review_contop_wrap .mpord_goods_item.gl_item').removeAttr('style'); // 추가 190731
  		$(this).find('.review').hide(); // 수정 190903
  		$(this).find('.review_thumb').show(); // 수정 190903
  	}else{

	  	$(this).parent().find('.review_info_box > ul').show();
  		$(this).parent().find('.review_contop_wrap .mpord_goods_item.gl_item').css('border-bottom','none');
  		objHide($('.review_con_wrap.on .review'));
	  	objShow($('.review_con_wrap.on .review_thumb'));
	  	$('.review_con_wrap.on').removeClass('on');
	  	objHide($(this).find('.review_thumb'));
	  	objSlideShow($(this).find('.review'));
	  	if($(this).find('.review_img_cont191216').find('ul').children('li').length > 1){
            var thisId = $(this).find('.review_img_cont191216').attr('id');
            var idx191216 = thisId.replace(/[^0-9]/g,'');
            if(!$(this).find('.review_img_cont191216').find('.swiper-pagination').hasClass('swiper-pagination-bullets')){
                setTimeout(function(){
                    reviewImg191216(idx191216);
                },500);
            }else{
                reviewImgSwiper = document.querySelector('#reviewImg_'+idx191216).swiper;
                reviewImgSwiper.slideTo(0,0);
            }
        }
  	}
  	$(this).toggleClass('on');
  });
  $('body').on('change', '#switch_all', function(){ //환경설정 스위치 전체
    var subSwitch=$(this).parents('.switch_group_wrap').find('.sub_switch_wrap .sub_switch');
    if($(this).is(':checked')){
      checkboxCheck(subSwitch);
    }else{
      checkboxUncheck(subSwitch);
    }
  });
  $('body').on('change', '.sub_switch', function(){ //환경설정 서브스위치
    checkSwitchRoof_all($(this).parents('.sub_switch_wrap'));
  });
  //마이페이지관련 e ------------------------------------------ */
  
  //글로벌 s -------------------------------------------------- */
  $('body').on('blur', '.monetary_input_wrap .monetary_input.set_comma', function(){
  	obj.val(setComma(inputAllVal));
  });
  //글로벌 e -------------------------------------------------- */
}
//버튼활성화_for_assist e ----------------------------------- */

//ready s --------------------------------------------------- */
$(document).ready(function() {
	setSelectbox(); //셀렉트박스 플러그인
	btnActive_for_common(); //버튼 활성화
	// noDragCopyActive(); //드래그복사방지 활성화(오픈 후  활성화 예정)
});
//ready e --------------------------------------------------- */
