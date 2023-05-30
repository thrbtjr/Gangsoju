var navViewTime = 1;//3초 후 top nav 사라짐
var mySwiperV = {};
var chkFooter = true;
var home_header_color = $('.header-fix').attr('class');
var newProductCategory = "";
var bestProductCategory = "";
var newProdCnt = new Array();
var cntDisplayYn = new Array();
var main_bul = true;//180909 메인 페이지인지 여부
var newBgColorCode = ""; //신상품 bg컬러
var bestBgColorCode = ""; //베스트 bg컬러
var main201909_swiper = {}; //뒤로가기
var refreshYn = true;  // 새로고침여부
var refreshIdx = -1;  // 새로고침인덱스
var refreshHeight = 150;
var refreshHeight_tv = 150;
var v_main = true;
var v_new = true;
var v_best = true;
var v_multibrd = true;
var v_tv = true;
var v_nowVideoPlayId = '';  // 현재 재생중인 비디오
var v_videoPlayYn = false;  // 현재 비디오 재생 여부

var h_exhibition = true;
var h_event = true;
var h_homeTv = true;
var sendGaEvent = false;
/* 세로 슬라이드 */
function main_Parent_Verti_slide(i){
  var idx = 0;
  var chkMultiBrd = false;
  if(i == 3){
      chkMultiBrd == true;
  }
  mySwiperV = new Swiper('.verticalSlide'+i+'.main1909_v', {
      speed: 500,
      direction: 'vertical',
      spaceBetween:0,
      resistance:false,
      simulateTouch:false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      preventInteractionOnTransition: chkMultiBrd,
      longSwipes: false,
      navigation: {
              nextEl: '.main1909_down_arr'+i + ', .next-button-ahead',
              prevEl: '.main1909_up_arr'+i,
      },
      // 20200917 메인 페이징 옵션
      pagination: {
          el: '.main-swiper-paging-wrap-'+i,
          type: 'bullets',
          dynamicBullets: true,
          dynamicMainBullets: 3,
      },
      on: {
          slideChange: function(){
              //+버튼 초기화
              $('.main1909_fix_b_btn_wrap ul').removeClass('active');
              $('.main1909_fix_b_btn_wrap .fix_b_btn').removeClass('spin');

              var tab_On_Index = $('#topNav1909 ul li.on').index();
              var $current_tab = $('.main-contents-wrap .hsomemain-contents-box').eq(tab_On_Index);
              
              var $home = $current_tab.attr('class').indexOf('home'),
              $new_item = $current_tab.attr('class').indexOf('new_item'),
              $best = $current_tab.attr('class').indexOf('best'),
              $multibrd = $current_tab.attr('class').indexOf('multibrd');
              $tv = $current_tab.attr('class').indexOf('tv');


              if ($home != -1) {
                  idx = 0;
              } else if ($new_item != -1) {
                  idx = 1;
              } else if ($best != -1) {
                  idx = 2;
              } else if ($multibrd != -1) {
                  idx = 3;
              } else if ($tv != -1) {
                  idx = 4;
              }

              var vTitle = "";
              var vParam = "";
              
              if(idx == 1) {
                  $('#contents-newitem .txt_newItemsbest_wrap_inner .gender li').each(function() {
                      if ( $(this).hasClass('on') ) {
                          vParam = $(this).attr("id");
                          vTitle = "메인>신상품_"+ $(this).find('a').text();
                          
                          if(vParam == "we"){
                              vParam = "women";
                          }else if(vParam == "me"){
                              vParam = "men";
                          }
                      }
                  });
                  
                  try{
                      ga('gp.send','pageview',{
                          'title':vTitle, //가상페이지 화면명
                          'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=new_' + vParam, //가상페이지URL
                          nonInteraction: true //비 상호작용
                      });
                  }catch(e) {
                      console.log(e);
                  }
              }else if(idx == 2) {
                  $('#contents-best .txt_on_newItems_best_wrap .gender li').each(function(){
                      if ( $(this).hasClass('on') ) {
                          vParam = $(this).attr("id");
                          vTitle = "메인>베스트_"+ $(this).find('a').text();
                          
                          if(vParam == "we"){
                              vParam = "women";
                          }else if(vParam == "me"){
                              vParam = "men";
                          }
                      }
                  });
                  
                  try{
                      ga('gp.send','pageview',{
                          'title':vTitle, //가상페이지 화면명
                          'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=best_' + vParam, //가상페이지URL
                          nonInteraction: true //비 상호작용
                      });
                  }catch(e) {
                      console.log(e);
                  }
              }
              
              if(idx != 4 && idx != 5) { //tv탭이 아닐때만,
                  // 화살표
                  var main1909HSwiper = document.querySelector('.verticalSlide'+idx).swiper;
                  window.sessionStorage.setItem('height',main1909HSwiper.activeIndex);
                  
                  var chkSwiperIdx = main1909HSwiper.activeIndex+1;
                  var main1909HSwiperLength = $('.verticalSlide'+idx+' > ul > li').length;

                  if( chkSwiperIdx >= 2 ) {
                      $('.main1909_down_arr'+idx).stop().hide();
                  }else{
                      $('.main1909_down_arr'+idx).stop().show();
                  }

                  // 20200917 메인 페이징
                  var main_V_slide_Leng = $('.verticalSlide'+idx+' ul > .swiper-slide').length;
                  if ( chkSwiperIdx == main_V_slide_Leng ) {
                      $('.main-swiper-paging-wrap-'+idx).find('span').eq(main_V_slide_Leng-2).addClass('on');
                  }else {
                      $('.main-swiper-paging-wrap-'+idx).find('span').eq(main_V_slide_Leng-2).removeClass('on');
                  }

                  //top 버튼 3번째페이지부터 노출
                  var currentSwiperV= document.querySelector('.verticalSlide'+idx).swiper;
                  if(currentSwiperV.activeIndex > 0){
                      $('.main1909_fix_b_btn_wrap .top_btn').addClass('active');
                  }else{
                      $('.main1909_fix_b_btn_wrap .top_btn').removeClass('active');
                  }
                  // 인기브랜드 슬라이드 첫번째로 이동
                  if (idx == 3) {
                      var checkFirst = $('.verticalSlide'+idx+' > ul > li').hasClass('swiper-slide-prev');
                      var pbrdSwiper = document.querySelector('#popMultiBrd').swiper;
                      if(checkFirst == false){
                          pbrdSwiper.slideTo(0,0);
                      }
                  }
                  
                  
                  var main1909HSwiperLength = $('.verticalSlide'+idx+' ul > li').length;
                  main1909HSwiperLength = main1909HSwiperLength - ($('#footer li').length) -1;
                  if(idx == 0){ //home > 기획전
                      main1909HSwiperLength = main1909HSwiperLength - $("#exhibitions li").length;
                  }else if(idx == 3){ //편집샵 
                      main1909HSwiperLength = main1909HSwiperLength - ($("#mutibrdMainSlider ul li").length + $("#mutiBrandSlider ul li").length + $("#popMultiBrd ul li").length);
                  }
                  if ( chkSwiperIdx == main1909HSwiperLength ) {
                      if (idx == 1 || idx == 2) {
                          $('.new_best_item_plus_btn').show();
                      }
                  } else {
                      if ( chkSwiperIdx > main1909HSwiperLength ) {   //footer
                          if (idx == 1 || idx == 2) {
                              $('.new_best_item_plus_btn').hide();
                          }
                      } else {
                          if (idx == 1 || idx == 2) {
                              $('.new_best_item_plus_btn').show();
                          }
                      }
                  }
              }
              
          },
          slidePrevTransitionStart: function(){
              $('.pop-multi-brd').find('.pop-multi-brd-in:last-child').removeClass('noswiping202103');
              var prevIndex = $('.verticalSlide1.main1909_v').find('li.swiper-slide-prev').length;
              if(prevIndex == 0){     
                  $("#contents-newitem .txt_on_newItems_best_wrap .gender ul li").each(function(i) {
                      if($(this).hasClass('on')) {
                          if(cntDisplayYn[i] == "0") {
                              $(".txt_newItemsbest_wrap_inner" ).css("top", "-1.25em");
                          }else {
                              if ($('.txt_newItemsbest_wrap_inner').hasClass('up')) {
                                  newTabNumSlideDown();
                              }
                          }
                      }
                  });
              }
              // 첫번째 슬라이드에서만 로고 노출 210322
              var checkFirst = $('.verticalSlide'+idx+' > ul > li').hasClass('swiper-slide-prev');
              if(checkFirst == false){
                  $('.header-fix').addClass('t-prent');
                  $('.header-fix').addClass('header-top');
                  $('.main1909_down_arr'+idx).show();
                  if(idx == 3 ){
                      $('.header-fix').addClass('white-header');
                  }
                  $('body').removeClass('sw_up');
              }else{
                  $('body').addClass('sw_up');
              }
          },
          slideNextTransitionStart: function(){
              var prevIndex = $('.verticalSlide1.main1909_v').find('li.swiper-slide-prev').length;
              if(prevIndex > 0){
                  $("#contents-newitem .txt_on_newItems_best_wrap .gender ul li").each(function(i) {
                      if($(this).hasClass('on')) {
                          if(cntDisplayYn[i] == "0") {
                              $(".txt_newItemsbest_wrap_inner" ).css("top", "-1.25em");
                          }else {
                              if (!$('.txt_newItemsbest_wrap_inner').hasClass('up')) {
                                  newTabNumSlideUp();
                              }
                          }
                      }
                  });
              }
              // 첫번째 슬라이드에서만 로고 노출 210322
              var verticalSwiper = document.querySelector('.verticalSlide'+idx).swiper;
              
              var checkFirst = $('.verticalSlide'+idx+' > ul > li').hasClass('swiper-slide-prev');
              if(checkFirst == true){
                  $('.header-fix').removeClass('t-prent');
                  $('.header-fix').removeClass('header-top');
                $('.header-fix').removeClass('white-header');
              }
              
              $('body').removeClass('sw_up');
          },
          slideChangeTransitionStart: function(){
              var tab_On_Index = $('#topNav1909 ul li.on').index();
              var $current_tab = $('.main-contents-wrap .hsomemain-contents-box').eq(tab_On_Index);
              var $home = $current_tab.attr('class').indexOf('home'),
                  $tv = $current_tab.attr('class').indexOf('tv');
              
              if ($tv != -1) {
                  idx = 4;
              }
              
              if(idx != 4 && idx != 5) { //tv탭이 아닐때만,

                  var checkFirst = $('.verticalSlide'+idx+' > ul > li').hasClass('swiper-slide-prev');
                  
                  if($home != -1 && checkFirst == false){
                      var whiteHeader = $('#mainList').find('div.swiper-slide-active').hasClass("WHITE");
                      if(whiteHeader){ //흰색
                          if(!$('.header-fix').hasClass('white-header')){
                              $('.header-fix').addClass('white-header');
                          }
                      }else { //검정
                          if($('.header-fix').hasClass('white-header')){
                              $('.header-fix').removeClass('white-header');    
                          }
                      }
                      
                      var previewBgBlack = $('#mainList').find('div.swiper-slide-active').hasClass("BG_BLACK");
                      if(previewBgBlack){ //검정
                          $("#magazinePreview").addClass("black-bg");
                      }else { //흰색
                          $("#magazinePreview").removeClass("black-bg");
                      }
                      
                      var previewBgTxt = $('#mainList').find('div.swiper-slide-active').hasClass("TXT_BLACK"); //text, pagination color
                      if(previewBgTxt){ //검정
                          $("#magazinePreview .tt").addClass("black");
                          $(".hori-pagination0").addClass("black");
                          $(".main1909_down_arr0").removeClass("white");
                          $(".main1909_down_arr0").addClass("black");
                      }else { //흰색
                          $("#magazinePreview .tt").removeClass("black");
                          $(".hori-pagination0").removeClass("black");
                          $(".main1909_down_arr0").removeClass("black");
                          $(".main1909_down_arr0").addClass("white");
                      }
                  }
                  
              }
              
              sendGaEvent = true;
          },
          slideChangeTransitionEnd: function(){
              if(idx != 4 && idx != 5) { //tv탭이 아닐때만,
                  //change시 최초1번 data setting.             
                  if(idx == 0) { //home tab
                      var main1909HSwiper = document.querySelector('.verticalSlide'+idx).swiper;
                      var chkSwiperIdx = main1909HSwiper.activeIndex;
                      home_hori_swiper = document.querySelector('.swiper-container.standard-sp').swiper;
                      
                      if(chkSwiperIdx == 1){
                          if(h_exhibition) {
                              h_exhibition = false;
                              getExhibitionBannerList(); //기획전
                          }
                      }else if(chkSwiperIdx == 2){
                          if(h_event){
                              h_event = false;
                              getEventList();       //이벤트
                          }else if(h_exhibition){
                              h_exhibition = false;
                              getExhibitionBannerList(); //기획전
                          }
                      }else if(chkSwiperIdx == 3){
                          if(h_homeTv) {
                              h_homeTv = false;
                              getMobileHomeTabTv(); //홈탭 tv
                          }else if(h_event){
                              h_event = false;
                              getEventList();       //이벤트
                          }
                      }
                      
                  }
                  
                  var tab_On_Index = $('#topNav1909 ul li.on').index();
                  var $current_tab = $('.main-contents-wrap .hsomemain-contents-box').eq(tab_On_Index);

                  var $home = $current_tab.attr('class').indexOf('home'),
                      $new_item = $current_tab.attr('class').indexOf('new_item'),
                      $best = $current_tab.attr('class').indexOf('best'),
                      $home = $current_tab.attr('class').indexOf('home'),
                      $multibrd = $current_tab.attr('class').indexOf('multibrd');

                  if($('.slide_border_box_icon').hasClass('spin2019')){
                      $('.slide_border_box_icon').removeClass('spin2019');
                  }
                  
                  if ($new_item != -1) {
                      var activeIndex = $('.verticalSlide1.main1909_v').find('li.swiper-slide-active').attr('data-index');
                      if(activeIndex == 0){
                              $('.newItems_main_slide1909 .main1909_count, .newItems_main_slide1909 .gender').show();
                              $('.newItems_main_slide1909 .slide_border_box_icon').addClass('spin2019');
                      }else{
                              $('.newItems_main_slide1909 .gender').hide();
                      }
                  }else if($best != -1) {
                      var activeIndex2 = $('.verticalSlide2.main1909_v').find('li.swiper-slide-active').attr('data-index');
                      if(activeIndex2 == 0){
                              $('.best_main_slide1909 .main1909_count, .best_main_slide1909 .gender').show();
                              $('.best_main_slide1909 .slide_border_box_icon').addClass('spin2019');
                      }else{
                              $('.best_main_slide1909 .main1909_count, .best_main_slide1909 .gender').hide();
                              $('.best_main_slide1909 .slide_border_box_icon').removeClass('spin2019');
                      }
                  }else if($multibrd != -1){
                      var activeIndex3 = $('.verticalSlide3.main1909_v').find('li.swiper-slide-active').index();
                      if(activeIndex3 == 0){
                          $('.multibrd .slide_border_box_icon').addClass('spin2019');
                      }else{
                          $('.multibrd .slide_border_box_icon').removeClass('spin2019');
                      }
                  } 
              }
          },
          reachEnd : function(){
              heightChange();
          },
          setTranslate : function(e) {
              if (e > Math.floor(refreshHeight)) {
                  this.allowTouchMove = false;
                  if ( refreshYn ) {
                      var tab_On_Index = $('#topNav1909 ul li.on').index();
                      var $current_tab = $('.main-contents-wrap .hsomemain-contents-box').eq(tab_On_Index);
                      
                      var $home = $current_tab.attr('class').indexOf('home'),
                      $new_item = $current_tab.attr('class').indexOf('new_item'),
                      $best = $current_tab.attr('class').indexOf('best'),
                      $multibrd = $current_tab.attr('class').indexOf('multibrd');
                      $tv = $current_tab.attr('class').indexOf('tv');

                      if ($home != -1) {
                          refreshIdx = 0;
                      } else if ($new_item != -1) {
                          refreshIdx = 1;
                      } else if ($best != -1) {
                          refreshIdx = 2;
                      } else if ($multibrd != -1) {
                          refreshIdx = 3;
                      }
                  }
              } else {
                  this.allowTouchMove = true;
              }
          },
          setTransition : function(e) {
              if (e == 0 && refreshYn) {
                  fn_refresh();
              }
          }
      }
  });
}

function slideToNew(){
  var mySwiperV = document.querySelector('.swiper-container-h.main1909_h').swiper;
  mySwiperV.slideTo(1);
}

$(document).ready(function(){
  
  try{
      ga('gp.send','pageview',{
          'title':'메인>홈탭>메인배너', //가상페이지 화면명
          'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=home', //가상페이지URL
          nonInteraction: true //비 상호작용
      });
  }catch(e) {
      console.log(e);
  }
  
  var todayDate = new Date();
  
  
  /************************************************************************************************
   * footer 한섬 copyright 눌렀을때 height 값 다시 적용.
  ************************************************************************************************/
  var menu_Langth = $('.top_nav1909 li').length;
  for(var i = 0; menu_Langth > i; i++) {
      $('#footer' + i + ' a.f_info_viewer').on('click', function(){
          $(this).toggleClass('active');
          $(this).next().slideToggle('fast',function(){
              chkFooter = false;
              heightChange();
          });
          return false;
      });
  }
  
});

// 홈 탭 > 메인배너리스트
function getMainBannerList(){
  $.ajax({
      type : "GET",
      url : "/ko/intro/getMobileNewMainList",
      async : false,
      success : function(data) {
          var rslts = data.rslt;
          if ( rslts != null && rslts.length > 0 ) {
              var html = '';
              for (var i = 0; i < rslts.length; i++) {
                  if(i > 9){ //10개까지 노출기준 변경(2021.11.03)
                      break;
                  }
                  html += '<div class="swiper-slide '+ rslts[i].menuTextColor+' BG_'+ rslts[i].mainListPreviewBg+' TXT_'+rslts[i].mainListPreviewTxtColor +'">';
                  
                  var videoCheck = false;
                  if ( rslts[i].mediaUrl ) {
                      var fileName = rslts[i].mediaUrl;
                      var videoFormat = "\.(mp4|MP4)";
                      if ( !(new RegExp(videoFormat,'i')).test(fileName)) {
                          videoCheck = false;
                      } else {
                          videoCheck = true;
                      }
                  }
                  if ( videoCheck ) {
                      var heightCSS = '';
                      if ( rslts[i].mediaType == 'HEIGHT' ) {
                          heightCSS = ' ver2001';
                      }
                      var backgroundUrl = 'http://cdn.thehandsome.comhttp://www.thehandsome.com/_ui/handsomemobile/images/@temp/main_video_back_img_200122.jpg';
                      if ( rslts[i].mediaImage != null ) {
                          backgroundUrl = 'http://image.thehandsome.com/sys_master/'+rslts[i].mediaImage;
                      }
                      html += '<a href="javascript:void(0);" class="link-box">';
                      html += '    <div class="video_main_wrap1909' + heightCSS +'" id="videoDiv1909_' + i + '" style="background:url(\''+backgroundUrl+'\') top center / 100% auto no-repeat;">';
                      html += '        <div class="vod_wrap2001" style="display: block;">';
                      html += '            <video id="video" class="video_area1909" width="100%" height="auto" onended="videoEnded(\'videoDiv1908\',0)" buffered playsinline muted loop onclick="videoMutedIconOn(this);">';
                      html += '                <source src="'+rslts[i].mediaUrl+'" type="video/mp4">';
                      html += '            </video>';
                      html += '            <div class="btn_mute2001" onclick="videoMutedControl(this);" style="display: none;"></div>';
                      html += '        </div>';
                      html += '    </div>';
                      html += '</a>';
                  } else {
                      html += '<a href="';
                      if ( rslts[i].bannerLinkUrl != null ) {
                          if(rslts[i].callWebBrowserYn != null && rslts[i].callWebBrowserYn == true) {
                              html += 'javascript:chkAppUrl(\''+rslts[i].bannerLinkUrl+'\');';
                          }else {
                              html += ''+rslts[i].bannerLinkUrl+'';
                          }
                      } else {
                          html += 'javascript:void(0);';
                      }
                      html += '"';
                      if ( rslts[i].linkNewWindowYn ) {
                          if(rslts[i].callWebBrowserYn == null || rslts[i].callWebBrowserYn == false){
                              html += ' target="_blank" ';        
                          }
                      }
                      if ( rslts[i].mainText != null ) {
                          var befText = rslts[i].mainText;
                          var aftText = "";
                          aftText = escape(befText.replace(/(<([^>]+)>)/ig," "));
                          html += 'onclick="GA_Event(\'메인\',\'메인배너_'+i+'\', \''+aftText+'\');\"';
                      }else{
                          if ( rslts[i].subText != null ) {
                              var befSubText = rslts[i].subText;
                              var aftSubText = "";
                              aftSubText = escape(befSubText.replace(/(<([^>]+)>)/ig," "));
                              html += 'onclick="GA_Event(\'메인\',\'메인배너_'+i+'\', \''+aftSubText+'\');\"';
                          }
                      }
                      
                      html += ' class="link-box">';
                      
                      var textHeightLineUp = "";
                      
                      if ( 'TOP' == rslts[i].textHeightLineUp ) {
                          textHeightLineUp = 'top ';
                      } else if ( 'BOTTOM' == rslts[i].textHeightLineUp ) {
                          textHeightLineUp = 'btm ';
                      } else {
                          textHeightLineUp = 'mid ';
                      }
                      
                      var textWidthLineUp = "";
                      
                      if ( 'LEFT' == rslts[i].textWidthLineUp ) {
                          textWidthLineUp = 'left';
                      } else if ( 'RIGHT' == rslts[i].textWidthLineUp ) {
                          textWidthLineUp = 'right';
                      } else {
                          textWidthLineUp = 'center';
                      }
                      
                      html += '   <div class="img">';
                      if ( 'FIX' == rslts[i].displayOrderType || i == 0 || i == 1) { // 고정이미지는 먼저 노출
                          html += '<img src="http://image.thehandsome.com/sys_master/'+rslts[i].bannerImage+'" alt="">';
                      } else {
                          html += '<img class="lazy_main" data-original="http://image.thehandsome.com/sys_master/'+rslts[i].bannerImage+'" alt="">';
                      }
                      html += '   </div>';
                      html += '   <div class="txt_area '+textHeightLineUp+' '+textWidthLineUp+'">';
                      html += '       <div class="txt_area_inner190820">';
                      if ( rslts[i].mainText != null ) {
                          html += '       <p class="txt">';
                          html += '         <span class="bar-in">';
                          html += '            <font color="'+ rslts[i].mainTextColor + '">' + rslts[i].mainText + '</font>';
                          html += '            <span class="ab-bar left" style="background-color:'+ rslts[i].mainTextColor + ';"></span>';
                          html += '            <span class="ab-bar right" style="background-color:'+ rslts[i].mainTextColor + ';"></span>';
                          html += '         </span>';
                          html += '       </p>';
                      }
                      if ( rslts[i].subText != null ) {
                          html += '       <p class="s_txt">';
                          html += '         <font color="'+ rslts[i].mainTextColor + '">' + rslts[i].subText + '</font>';
                          html += '       </p>';
                      }
                      html += '       </div>';
                      html += '   </div>';
                      html += '</a>';
                  }
                  html += '</div>';
              }
              
              $('#mainList').html(html);
              
              var horiSlider = document.querySelector('.horiSlide0.swiper-container.standard-sp').swiper;
              if ( typeof(horiSlider) != 'undefined' ) {
                  horiSlider.destroy();    
              }
              main_Home_Hori_Slide(0);
              
              $('img.lazy_main').lazyload({
                  placeholder : 'http://www.thehandsome.com/_ui/handsomemobile/images/common/no_img.gif', // 로딩이미지
                  event : 'imgLoad',
                  effect : 'fadeIn',
                  load : function (){ // 로딩시에 이벤트
                      $(this).attr('src',$(this).attr('data-original'));
                  }
              });
              
              $('img.lazy_main').trigger('imgLoad');
              
              refreshHeight = $('.verticalSlide0').height() / 4;
              refreshYn = true;
              refreshIdx = -1;
          }
      },
      error : function(e) {
          console.log(e);
      }
  });
}

//홈 탭 > THE 매거진
function getMagazineList() {
  $.ajax({
      type : "get",
      url : "/ko/intro/getNewMainMagazineList",
      dataType : "json",
      async : false,
      contentType : "application/json",
      error : function(request, status, error) {
          console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
      },
      success : function(data) {
          var category = "";
          var url = "";
          var listUrl = "";
          if(data != null){
              if(data.results.length > 0) {
                  var html = "";
                  for(var i = 0 ; i < data.results.length; i++) {
                      if(i > 4){ //5개까지 노출
                          break;
                      }
                      
                      var previewHtml = "";
                      if(i == 0) {
                          if(data.results[i].mainListPreviewTxt != null){
                              previewHtml += '<span class="tt">'+data.results[i].mainListPreviewTxt+'</span>';
                          }
                          if ( data.results[i].mobileMainTitle != null ) {
                              var befText = data.results[i].mobileMainTitle;
                              var aftText = "";
                              aftText = escape(befText.replace(/(<([^>]+)>)/ig," "));
                              $("#magazinePreview").attr("onclick","GA_Event('메인','메인배너_하단배너', '"+aftText+"')");
                          }
                          $("#magazinePreview").html(previewHtml);
                          
                          var previewBgTxt = $('#mainList').find('div.swiper-slide-active').hasClass("TXT_BLACK");  //text, pagination color
                          if(previewBgTxt){ //검정
                              $("#magazinePreview .tt").addClass("black");
                              $(".hori-pagination0").addClass("black");
                              $(".main1909_down_arr0").removeClass("white");
                              $(".main1909_down_arr0").addClass("black");
                          }else { //흰색
                              $("#magazinePreview .tt").removeClass("black");
                              $(".hori-pagination0").removeClass("black");
                              $(".main1909_down_arr0").removeClass("black");
                              $(".main1909_down_arr0").addClass("white");
                          }
                          
                          $("#magazinePreview").show(); 
                      }
                      
                      url = "/ko/magazine/editorials/" + data.results[i].pk + "?uiel=Mobile";
                      if(data.results[i].category == "커버스토리") {
                          listUrl = "/ko/magazine/coverstory";
                      }else if(data.results[i].category == "위클리 픽") {
                          listUrl = "/ko/magazine/weeklypick";
                      }else if(data.results[i].category == "셀렉션") {
                          listUrl = "/ko/magazine/selection";
                      }else if(data.results[i].category == "스타일 가이드") {
                          listUrl = "/ko/magazine/styleguide";
                      }else if(data.results[i].category == "뉴스") {
                          url = "/ko/magazine/newsDetail" + data.results[i].template + "?newsCode=" + data.results[i].pk + "&uiel=Mobile";
                          listUrl = "/ko/magazine/news";
                      }else if(data.results[i].category == "#SOME") {
                          listUrl = "/ko/magazine/some";
                      }
                      
                      html += '   <div class="swiper-slide sbetween">';
                      html += '       <a href="'+url+'" class="link-box radius-box shadow"';
                      if ( data.results[i].mobileTitle != null ) {
                          var befText = data.results[i].mobileTitle;
                          var aftText = "";
                          aftText = escape(befText.replace(/(<([^>]+)>)/ig," "));
                          html += 'onclick="GA_Event(\'메인\',\'THE매거진배너_'+i+'\', \''+aftText+'\');\"';                                  
                      }else {
                          html += '"';
                      }
                      html += '>';
                      
                      html += '           <div class="img">';
                      if(i == 0 || i == 1){
                          html += '          <img src="'+data.results[i].imageUrl+'"  alt="메인 더매거진 이미지">';
                      }else {
                          html += '          <img class="lazy_magazine" data-original="'+data.results[i].imageUrl+'"  alt="메인 더매거진 이미지">';
                      }
                      
                      
                      html += '           </div>';
                      html += '           <div class="banner-con-type">';
                      html += '               <strong class="tt">'+ data.results[i].mobileMainTitle + '</strong>';
                      html += '               <p class="sub-txt">';
                      if(data.results[i].subDescription01 != ""){
                          html +=             data.results[i].subDescription01;
                          if(data.results[i].subDescription02 != ""){
                              html += '       <br/>';
                              html +=         data.results[i].subDescription02;
                          }
                      }
                      html += '               </p>';
                      html += '           </div>';
                      html += '       </a>';
                      html += '   </div>';
                  }
                  
                  $("#magazineList").html(html);
                  
                  var horiSlider1 = document.querySelector('.horiSlide1.swiper-container.standard-sp').swiper;
                  if ( typeof(horiSlider1) != 'undefined' ) {
                      horiSlider1.destroy();
                      $(".horiSlide1").css("height", "calc(100% - 139px)");
                      $(".horiSlide1").css("margin", "0 -15px");
                      
                  }
                  
                  main_Home_Hori_Slide(1);
                  
                  $('img.lazy_magazine').lazyload({
                      placeholder : 'http://www.thehandsome.com/_ui/handsomemobile/images/common/no_img.gif', // 로딩이미지
                      event : 'imgLoad',
                      effect : 'fadeIn',
                      load : function (){ // 로딩시에 이벤트
                          $(this).attr('src',$(this).attr('data-original'));
                      }
                  });
              
                  $('img.lazy_magazine').trigger('imgLoad');
                  
                  refreshYn = true;
                  refreshIdx = -1;
              }
          }
      }
  });
}

/* [신상품,베스트 카테고리 조회]
* 신상품 조회 : true
* 베스트 조회 : false
*/
function getCategoryList(displayType) {
  var viewType = "new";
  if(displayType == "true"){
      viewType = "new";
  }else if(displayType == "false"){
      viewType = "best";
  }
  
  if(v_new || v_best){ //카테고리조회는 1번만
      $.ajax({
          type : "get",
          url : "/ko/intro/mainCategoryList",
          async : false,
          contentType : "application/json",
          error : function(request, status, error)
          {
              console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
          },
          success : function(result)
          {
              if (result.length > 0) {
                  var newHtml = "";
                  var bestHtml = "";
                  var newCount = 0;
                  var bestCount = 0;
                  var isoCode = "ko";

                  for (var i = 0; i < result.length; i++) {
                      
                      if (isoCode == "ko") {
                          categoryName = result[i].categoryName;
                      } else if (isoCode == "en") {
                          categoryName = result[i].categoryNameEN;
                      } else if (isoCode == "zh") {
                          categoryName = result[i].categoryNameZH;
                      }

                      if (result[i].displayTypeYn == true) {
                          if (result[i].displayType == true) {
                              if(newBgColorCode == "" && result[i].bgColorCode != null){
                                  newBgColorCode = result[i].bgColorCode;
                              }
                              
                              //2021.05.10 신상품영역 개선 : 글로벌 카운트는 En기준으로 변경
                              if (isoCode == "ko") {
                                  newProdCnt[newCount] = result[i].newProdCnt == null || result[i].newProdCnt == "0" ? result[i].newOptProdCnt : result[i].newProdCnt;
                                  cntDisplayYn[newCount] = result[i].cntDisplayYn;
                              } else if (isoCode == "en") {
                                  newProdCnt[newCount] = result[i].newProdCntEn == null || result[i].newProdCntEn == "0" ? result[i].newOptProdCntEn : result[i].newProdCntEn;
                                  cntDisplayYn[newCount] = result[i].cntDisplayYnEn;
                              } else if (isoCode == "zh") {
                                  newProdCnt[newCount] = result[i].newProdCntEn == null || result[i].newProdCntEn == "0" ? result[i].newOptProdCntEn : result[i].newProdCntEn;
                                  cntDisplayYn[newCount] = result[i].cntDisplayYnEn;
                              }
                          
                              if (newCount == 0) {
                                  newProductCategory = result[i].categoryCode;
                                  newHtml += '<li class="on" id="'+ result[i].categoryCode.toLowerCase() + '">';
                              } else {
                                  newHtml += '<li id="'+ result[i].categoryCode.toLowerCase() + '">';
                              }
                          
                              newHtml += '    <a href="javascript:getNewProductList(\'' + result[i].categoryCode + '\')">' + categoryName + '</a>';
                              newHtml += '</li>';
                              newCount++;
                          }else if (result[i].displayType == false) {
                              if(bestBgColorCode == "" && result[i].bgColorCode != null){
                                  bestBgColorCode = result[i].bgColorCode;
                              }
                              
                              if (bestCount == 0) {
                                  bestProductCategory = result[i].categoryCode;
                                  bestHtml += '<li class="on" id="'+ result[i].categoryCode.toLowerCase() + '">';
                              } else {
                                  bestHtml += '<li id="'+ result[i].categoryCode.toLowerCase() + '">';
                              }
                          
                              bestHtml += '   <a href="javascript:getBestProductList(\'' + result[i].categoryCode + '\')">' + categoryName + '</a>';
                              bestHtml += '</li>';
                              bestCount++;
                          } 
                      }
                  }
                  $("#contents-newitem .txt_on_newItems_best_wrap .gender > ul").html(newHtml);
                  $("#contents-best .txt_on_newItems_best_wrap .gender > ul").html(bestHtml);
              }
          }
      });
  }
  
  if(viewType == "new"){
      mainNewTab();
      getNewProductList(newProductCategory);
  }else {
      mainBestTab();
      getBestProductList(bestProductCategory);
  }
  refreshYn = true;
  refreshIdx = -1;
}

//신상품 > 상품리스트
function getNewProductList(categoryCode) {
 var tab_On_Index = $('#topNav1909 ul li.on').index();
 var $current_tab = $('.main-contents-wrap .hsomemain-contents-box').eq(tab_On_Index);
 if($current_tab.attr('class').indexOf('new_item') != -1){
     if(categoryCode != null && categoryCode != ""){
         var vTitle = "";
         var vParam = "";
         if(categoryCode == "WE"){
             vTitle = "메인>신상품_여성";
             vParam = "women";
         }else if(categoryCode == "ME"){
             vTitle = "메인>신상품_남성";
             vParam = "men";
         }else {
             if(categoryCode != null && categoryCode != "") {
                 vParam = categoryCode.toLowerCase();
             }
             
             var title = $("#contents-newitem .txt_newItemsbest_wrap_inner .gender ul").find("#"+vParam).text();
             if(title != null && title != "") {
                 vTitle = "메인>신상품_"+ title.trim();
             }
         }
         
         try{
             ga('gp.send','pageview',{
                 'title':vTitle, //가상페이지 화면명
                 'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=new_' + vParam, //가상페이지URL
                 nonInteraction: true //비 상호작용
             });
         }catch(e) {
             console.log(e);
         }
     } 
 }
 
 $.ajax({
     type : "get",
     url : "/ko/intro/mainNewProductList" + "?categoryCode=" + categoryCode,
     dataType : "json",
     async : false,
     contentType : "application/json",
     error : function(request, status, error)
     {
         console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
     },
     success : function(result)
     {
         var html = "";
         var tempHtml = '<div class="txt_on_newItems_best_wrap" id="touchSwiperEvent1909_1">';
           tempHtml += $("#contents-newitem .txt_on_newItems_best_wrap").html();
           tempHtml += '</div>';
     
         var firstChk = false;
         if($("#newProductList").attr("style").indexOf("height") > -1){
             firstChk = true;
             var prodStyle = $("#newProductList").attr("style");
             html += '<div class="swiper-container swiper-container-v main1909_v main_wrapper_swiper1909 verticalSlide1" id="newProductList"style="'+prodStyle+'">';
         }
         
         if (result.length > 0) {
             window.sessionStorage.setItem('main_new_ecommerceDataList', JSON.stringify(result));
             html += '  <ul class="swiper-wrapper inner_vertical_slide_wrap">                                                         ';
             for (var i = 0; i < result.length; i++) {
                 if(i < 20){
                     html += '<li class="swiper-slide index_slide" data-index="'+i+'" style="background:'+newBgColorCode+'">                                                    ';
                     html += '   <div class="img_cover_div">                                                                              ';
                     if(i == 0){
                     html += '      <a href="/ko/p/' + result[i].productCode + '?uiel=Mobile" onclick="setEcommerceData('+ i +', \'NEW\', \''+categoryCode+'\');setCatogoryData(\''+categoryCode+'\');"><img src="'+result[i].T01imageUrl+'/dims/resize/600x904" alt="">';
                     }else{
                     html += '      <a href="/ko/p/' + result[i].productCode + '?uiel=Mobile" onclick="setEcommerceData('+ i +', \'NEW\', \''+categoryCode+'\');setCatogoryData(\''+categoryCode+'\');"><img class="lazy_new" data-original="'+result[i].T01imageUrl+'/dims/resize/600x904" alt="">';                            
                     }
                     html += '      <div class="main1909_item_info_wrap">                                                                 ';
                     html += '          <span class="brand">' + result[i].brandName + '</span>                                        ';
                     html += '          <p class="name">' + result[i].productName + '</p>                                             ';
                     html += '          <span class="price">' + addComma(result[i].price) + '</span>                                  ';
                     html += '      </div>                                                                                                ';
                     html += '      </a>                                                                                                  ';
                     html += '   </div>                                                                                                   ';
                     html += '</li>                                                                                                       ';  
                 }
             }
             
             html += '<li id="v_footer1" class="swiper-slide index_slide">';
             html += '    <footer id="footer1" class="hsome_footer new181127 footer_kr">';//footer_kr class 추가 : 20220406
             html += '    </footer>';
             html += '</li>';
             
             html += '  </ul>';
             
             if(firstChk == true){
                 html += '</div>';
                 html += '<div class="swiper-button-next main1909_down_arr main1909_down_arr1"><a href="#;">아래 슬라이드로</a></div>        ';
                 html += '<div class="swiper-button-prev main1909_up_arr main1909_up_arr1" style="display:none"><a href="#;">위로</a></div>  ';
             }
             
             html += '<div class="swiper-pagination main-swiper-paging-wrap-1 main-swiper-bullets"></div>';   
             
             html += tempHtml;
          
             if(firstChk == true){
                 $("#contents-newitem").html(html);
             }else{
                 $("#newProductList").html(html);
             }
             main_Parent_Verti_slide(1);
             mainNewTab();
             $("#contents-newitem .gender > ul li").each(function(i){
                 if($(this).hasClass("on")){
                     numberCounterExecute(i);
                 }
             });
         }else {
             $("#contents-newitem").html(html);
         }
         
         $('img.lazy_new').lazyload({
             placeholder : 'http://www.thehandsome.com/_ui/handsomemobile/images/common/no_img.gif', // 로딩이미지
             event : 'imgLoad',
             effect : 'fadeIn',
             load : function (){ // 로딩시에 이벤트
                 $(this).attr('src',$(this).attr('data-original'));
             }
         });
         $('img.lazy_new').trigger('imgLoad');
         $('#footer1').append($('#footer').html());
         
         $('#footer1 a.f_info_viewer').on('click', function(){
             $(this).toggleClass('active');
             $(this).next().slideToggle('fast',function(){
                 chkFooter = false;
                 heightChange();
             });
             return false;
         });
         refreshYn = true;
         refreshIdx = -1;
     }
 });
}

//베스트 > 상품리스트
function getBestProductList(categoryCode) {
  var tab_On_Index = $('#topNav1909 ul li.on').index();
  var $current_tab = $('.main-contents-wrap .hsomemain-contents-box').eq(tab_On_Index);
  if($current_tab.attr('class').indexOf('best') != -1){
      if(categoryCode != null && categoryCode != ""){
          var vTitle = "";
          var vParam = "";
       if(categoryCode == "WE"){
           vTitle = "메인>베스트_여성";
           vParam = "women";
       }else if(categoryCode == "ME"){
           vTitle = "메인>베스트_남성";
           vParam = "men";
       }else {
           if(categoryCode != null && categoryCode != "") {
               vParam = categoryCode.toLowerCase();
           }
           
           var title = $("#contents-best .txt_on_newItems_best_wrap .gender ul").find("#"+vParam).text();
           if(title != null && title != "") {
               vTitle = "메인>베스트_"+ title.trim();
           }
       }
       
       try{
           ga('gp.send','pageview',{
               'title':vTitle, //가상페이지 화면명
               'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=best_' + vParam, //가상페이지URL
               nonInteraction: true //비 상호작용
           });
       }catch(e) {
           console.log(e);
       }
      }
  }
  
  $.ajax({
      type : "get",
      url : "/ko/intro/mainBestProductList" + "?categoryCode=" + categoryCode,
      dataType : "json",
      async : false,
      contentType : "application/json",
      error : function(request, status, error)
      {
          console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
      },
      success : function(result)
      {
          var html = "";
          var tempHtml = '<div class="txt_on_newItems_best_wrap">';
            tempHtml += $("#contents-best .txt_on_newItems_best_wrap").html();
            tempHtml += '</div>';
          
          var firstChk = false;
          if($("#bestProductList").attr("style").indexOf("height") > -1){
              firstChk = true;
              var prodStyle = $("#bestProductList").attr("style");
              html += '<div class="swiper-container swiper-container-v main1909_v main_wrapper_swiper1909 verticalSlide2" id="bestProductList" style="'+prodStyle+'">'; 
          }
          
          if (result.length > 0) {
              window.sessionStorage.setItem('main_best_ecommerceDataList', JSON.stringify(result));
              html += '<ul class="swiper-wrapper inner_vertical_slide_wrap">                                                           ';
              for (var i = 0; i < result.length; i++) {
                  if(i < 20){
                  html += '<li class="swiper-slide" data-index="'+i+'" style="background:'+bestBgColorCode+'">                                                                ';
                  html += '   <div class="img_cover_div">                                                                              ';
                  if(i == 0){
                  html += '      <a href="/ko/p/' + result[i].productCode + '?uiel=Mobile" onclick="setEcommerceData('+ i +', \'BEST\', \''+categoryCode+'\');setCatogoryData(\''+categoryCode+'\');"><img src="'+result[i].T01imageUrl+'/dims/resize/600x904" alt="">';
                  }else{
                  html += '      <a href="/ko/p/' + result[i].productCode + '?uiel=Mobile" onclick="setEcommerceData('+ i +', \'BEST\', \''+categoryCode+'\');setCatogoryData(\''+categoryCode+'\');"><img class="lazy_best" data-original="'+result[i].T01imageUrl+'/dims/resize/600x904" alt="">';                            
                  }
                  html += '         <div class="main1909_item_info_wrap">                                                                    ';
                  html += '           <span class="brand">' + result[i].brandName + '</span>                                                ';
                  html += '           <p class="name">' + result[i].productName + '</p>                                                     ';
                  html += '           <span class="price">' + addComma(result[i].price) + '</span>                                          ';
                  html += '         </div>                                                                                                   ';
                  html += '     </a>                                                                                                   ';
                  html += '   </div>                                                                                                   ';
                  html += '</li>                                                                                                       ';
                  }
              }
              
              html += '<li id="v_footer2" class="swiper-slide">';
              html += '    <footer id="footer2" class="hsome_footer new181127 footer_kr">';//footer_kr class 추가 : 20220406
              html += '    </footer>';
              html += '</li>';
              
              html += '</ul>';
  
              if(firstChk == true){
                  html += '</div>';
                  html += '<div class="swiper-button-next main1909_down_arr main1909_down_arr2"><a href="#;">아래 슬라이드로</a></div>        ';
                  html += '<div class="swiper-button-prev main1909_up_arr main1909_up_arr2" style="display:none"><a href="#;">위로</a></div>  ';
              }
              
              html += '<div class="swiper-pagination main-swiper-paging-wrap-2 main-swiper-bullets"></div>';  
              
              html += tempHtml;
              
              if(firstChk == true){
                  $("#contents-best").html(html);
              }else{
                  $("#bestProductList").html(html);
              }
              main_Parent_Verti_slide(2);
              mainBestTab();
          } else {
              $("#contents-best").html(html);
          }
          
          $('img.lazy_best').lazyload({
              placeholder : 'http://www.thehandsome.com/_ui/handsomemobile/images/common/no_img.gif', // 로딩이미지
              event : 'imgLoad',
              effect : 'fadeIn',
              load : function (){ // 로딩시에 이벤트
                  $(this).attr('src',$(this).attr('data-original'));
              }
          });
          $('img.lazy_best').trigger('imgLoad');
          $('#footer2').append($('#footer').html());
          
          $('#footer2 a.f_info_viewer').on('click', function(){
              $(this).toggleClass('active');
              $(this).next().slideToggle('fast',function(){
                  chkFooter = false;
                  heightChange();
              });
              return false;
          });
      }
  });
}

//신상품 > 카테고리탭 클릭시 on 처리
function mainNewTab(){
  var $newMenu = $("#contents-newitem .txt_on_newItems_best_wrap .gender");
  $newMenu.find('a').on('click', function()
  {
      $newMenu.find('li').removeClass('on');
      $(this).closest('li').addClass('on');
  });
}
//베스트 > 카테고리탭 클릭시 on 처리
function mainBestTab(){
  var $bestMenu = $("#contents-best .txt_on_newItems_best_wrap .gender");
  $bestMenu.find('a').on('click', function()
  {
      $bestMenu.find('li').removeClass('on');
      $(this).closest('li').addClass('on');
  });
}
function mainNewBestGender1909(){ // 신상품,베스트 - 여성남성 선택 on 띠부
  var $newBestGender = $('.txt_on_newItems_best_wrap .gender');
  $newBestGender.find('a').on('click', function()
  {
     $newBestGender.find('li').removeClass('on');
     $(this).closest('li').addClass('on');
  });
}

function mainNewBestPopOn1909(){ // 신상품,베스트 - 팝업 - on 띠부
  var $newBestList = $('#mainNewPopwrap201909 .list_wrap, #mainBestPopwrap201909 .list_wrap');
  $newBestList.find('a').on('click', function()
  {
     $newBestList.find('li').removeClass('on');
     $(this).closest('li').addClass('on');
  });
}

function numberCounter(target_frame, target_number) { //신상품 숫자 카운트효과
  this.count = 0; this.diff = 0;
  this.target_count = parseInt(target_number);
  this.target_frame = document.getElementById(target_frame);
  this.timer = null;
  this.counter();
};

function numberCounterExecute(prodNum){//신상품 숫자카운트 효과 실행
  var idx = prodNum;
  prodNum = newProdCnt[idx];
  var chkSpeed = 30; 
  var chkDiff = 100; 
  
  if( prodNum < 35 ) {
      //
  } else if(prodNum < 70 ){
      chkSpeed = 20;
  } else if(prodNum < 100 ){
      chkDiff = 50;
      chkSpeed = 12;
  } else if(prodNum < 150 ){
      chkDiff = 45;
      chkSpeed = 12;
  } else if(prodNum < 200 ){
      chkDiff = 45;
      chkSpeed = 10;
  } else {
      chkDiff = 45;
      chkSpeed = 8;
  }
  
  numberCounter.prototype.counter = function() {
      var self = this;
      this.diff = this.target_count - this.count;
  
      if(this.diff > 0) {
          self.count += Math.ceil(this.diff / chkDiff);
      }
  
      this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
      if(this.count < this.target_count) {
          this.timer = setTimeout(function() { self.counter(); }, chkSpeed);
      } else {
          clearTimeout(this.timer);
      }
  };
  
  if(cntDisplayYn[idx] == "0"){
      $("#counter1909_1").hide();
      $(".txt_newItemsbest_wrap_inner" ).css("top", "-1.25em");
  }else{
      $("#counter1909_1").show();
      $(".txt_newItemsbest_wrap_inner" ).css("top", "");
      new numberCounter("counter1909_1", prodNum);
  }
}

function newTabNumSlideUp(){//신상품 효과1
  //카운트 따라올라가는것으로 수치변경
  $( ".txt_on_newItems_best_wrap" ).animate({
      'top':'-10px'
  }, 700, function() {
      $(".txt_on_newItems_best_wrap").css("top","118px"); // 202103 신상품 top값 변경
      $(".txt_newItemsbest_wrap_inner").css("top","-4.05em");
    $(".txt_newItemsbest_wrap_inner").addClass('up');
  });
}

function newTabNumSlideDown(){//신상품 효과2
  //카운트 따라올라가는것으로 수치변경
  $( ".txt_newItemsbest_wrap_inner" ).css("top", "0px");
  $(".txt_on_newItems_best_wrap").css("top","-35px");
  
  $(".txt_on_newItems_best_wrap").animate({
      'top':'118px' // 202103 신상품 top값 변경
  }, 700, function() {
          $( ".txt_newItemsbest_wrap_inner" ).removeClass('up');
  });
  
}
function mainNewPopUp(){ //신상품 플러스 클릭시 팝업
  $(".new_items_pop1909 ul li").removeClass("on");
  $('#mainNewPopwrap201909').show();
  $('.hsome_main').css('margin-bottom','-3px');
  
  var tmpbar = $('#new_item .slide_border_box_icon .bar_horizontal');
  if (tmpbar.hasClass('plus')) {
      tmpbar.removeClass('plus');
      tmpbar.addClass('minus');
  } else {
      tmpbar.removeClass('minus');
      tmpbar.addClass('plus');
  }
  $('#new_item .new_best_item_plus_btn').toggleClass('active'); 
}
function mainBestPopUp(){//베스트 플러스 클릭시 팝업
  $(".best_pop1909 ul li").removeClass("on");
  $('#mainBestPopwrap201909').show();
  $('.hsome_main').css('margin-bottom','-3px');
  
  var tmpbar = $('#best .slide_border_box_icon .bar_horizontal');
  if (tmpbar.hasClass('plus')) {
      tmpbar.removeClass('plus');
      tmpbar.addClass('minus');
  } else {
      tmpbar.removeClass('minus');
      tmpbar.addClass('plus');
  }
  $('#best .new_best_item_plus_btn').toggleClass('active');
}
function closePopNew(){
  $('.pop_wrap190906').hide();
  $('.agree_more_btn .slide_border_box_icon .bar_horizontal').removeClass('minus');
  $('.agree_more_btn .slide_border_box_icon .bar.bar_horizontal').addClass('plus');
  $(".pop_wrap190906 li").removeClass("on");
}

//footer 부분 카피라이트 눌렀을때 footer height 값 변경 함수.
function heightChange(){
  var tab_On_Index = $('#topNav1909 ul li.on').index();
  var $current_tab = $('.main-contents-wrap .hsomemain-contents-box').eq(tab_On_Index);

  var $home = $current_tab.attr('class').indexOf('home'),
      $new_item = $current_tab.attr('class').indexOf('new_item'),
      $best = $current_tab.attr('class').indexOf('best'),
      $multibrd = $current_tab.attr('class').indexOf('multibrd');
      $tv = $current_tab.attr('class').indexOf('tv');

  var vIdx = 0;
  if($home != -1){
      vIdx = 0;
  }else if($new_item != -1){
      vIdx = 1;
  }else if($best != -1){
      vIdx = 2;
  }else if($multibrd != -1){
      vIdx = 3;
  }

  var main1909HSwiper = document.querySelector('.verticalSlide'+vIdx).swiper;
  var chkSwiperIdx = main1909HSwiper.activeIndex+1;

  var main1909HSwiperLength = $('.verticalSlide'+vIdx+'> ul li').length;
  main1909HSwiperLength = main1909HSwiperLength - ($('#footer li').length);
  
  if(vIdx == 0){ //home > 기획전
      main1909HSwiperLength = main1909HSwiperLength - $("#exhibitions li").length;
  }else if(vIdx == 3){ //편집샵 
      main1909HSwiperLength = main1909HSwiperLength - ($("#mutibrdMainSlider ul li").length + $("#mutiBrandSlider ul li").length + $("#popMultiBrd ul li").length);
  }

  
  if(chkSwiperIdx == main1909HSwiperLength){
      var footerHeight = $('#footer'+vIdx+'').outerHeight();
      $('#v_footer'+vIdx+'').css('height', footerHeight);
      var totalTranslate = ( -$('.verticalSlide'+vIdx+'> ul > li').height()*(main1909HSwiperLength-2) ) - footerHeight;
      main1909HSwiper.setTranslate(totalTranslate);
  }
}

var down = 0;
function touchSwiperTopNav(){
  var element = document.getElementById('main1909_h');
  
  element.addEventListener( 'touchstart', function( e ) {
      var touch = event.touches[0];
      touchstartX = touch.clientX;
      touchstartY = touch.clientY;
      
        if ( e.type === 'touchstart' && e.touches.length === 1 ) {
            
            //[footer] last slide일때,
            var tab_On_Index = $('#topNav1909 ul li.on').index();
            var $current_tab = $('.main-contents-wrap .hsomemain-contents-box').eq(tab_On_Index);
            

            var $home = $current_tab.attr('class').indexOf('home'),
                $new_item = $current_tab.attr('class').indexOf('new_item'),
                $best = $current_tab.attr('class').indexOf('best'),
                $multibrd = $current_tab.attr('class').indexOf('multibrd');
                $tv = $current_tab.attr('class').indexOf('tv');

            var vIdx = 0;
            if($home != -1){
                vIdx = 0;
            }else if($new_item != -1){
                vIdx = 1;
            }else if($best != -1){
                vIdx = 2;
            }else if($multibrd != -1){
                vIdx = 3;
            }else if($tv != -1){
                vIdx = 4;
            }
            
            var checkFirst = $('.verticalSlide'+vIdx+' > ul > li').hasClass('swiper-slide-prev');
            if(checkFirst == false){
                $('.hsome_main').addClass('update191029');
            }else {
                $('.hsome_main').removeClass('update191029');
            }
        }
  }, false );
  element.addEventListener( 'touchend', function( e ) {
      var chkDown = false;
      var chkUp = false;
      
      if(event.touches.length == 0) {
          var touch = event.changedTouches[event.changedTouches.length - 1];
          touchendX = touch.clientX;
          touchendY = touch.clientY;
          touchoffsetX = touchendX - touchstartX;
          touchoffsetY = touchendY - touchstartY;
          
          //[footer] last slide일때,
          var tab_On_Index = $('#topNav1909 ul li.on').index();
          var $current_tab = $('.main-contents-wrap .hsomemain-contents-box').eq(tab_On_Index);
          

          var $home = $current_tab.attr('class').indexOf('home'),
              $new_item = $current_tab.attr('class').indexOf('new_item'),
              $best = $current_tab.attr('class').indexOf('best'),
              $multibrd = $current_tab.attr('class').indexOf('multibrd');
              $tv = $current_tab.attr('class').indexOf('tv');

          var vIdx = 0;
          if($home != -1){
              vIdx = 0;
          }else if($new_item != -1){
              vIdx = 1;
          }else if($best != -1){
              vIdx = 2;
          }else if($multibrd != -1){
              vIdx = 3;
          }else if($tv != -1){
              vIdx = 4;
          }
          
          var main1909HSwiper = document.querySelector('.verticalSlide'+vIdx).swiper;
          var chkSwiperIdx = main1909HSwiper.activeIndex+1;

          var main1909HSwiperLength = $('.verticalSlide'+vIdx+' > ul li').length;
          main1909HSwiperLength = main1909HSwiperLength - ($('#footer li').length);
          if(vIdx == 0){ //home > 기획전
              main1909HSwiperLength = main1909HSwiperLength - $("#exhibitions li").length;
          }else if(vIdx == 3){ //편집샵 
              main1909HSwiperLength = main1909HSwiperLength - ($("#mutibrdMainSlider ul li").length + $("#mutiBrandSlider ul li").length + $("#popMultiBrd ul li").length);
          }
          
          if(chkSwiperIdx == main1909HSwiperLength){
              chkFooter = false;
              if ( vIdx == 3 ) {
                var defaultHeight = $('.verticalSlide'+vIdx+'> ul > li:eq(0)').outerHeight();
                var footerHeight = $('#footer'+vIdx+'').outerHeight();
                var winH = $(window).height() - 48;
                var setAutoH = (defaultHeight + footerHeight) - winH;
                $('#v_footer'+vIdx+'').css('height', footerHeight);
                var totalTranslate = -($('.verticalSlide'+vIdx+'> ul > li').outerHeight()*(main1909HSwiperLength-2) + setAutoH);
                main1909HSwiper.setTranslate(totalTranslate);

                $('.pop-multi-brd').find('.pop-multi-brd-in:last-child').addClass('noswiping202103');
              } else {
                   var footerHeight = $('#footer'+vIdx+'').outerHeight();
                   $('#v_footer'+vIdx+'').css('height', footerHeight);
                   var totalTranslate = ( -$('.verticalSlide'+vIdx+'> ul > li').height()*(main1909HSwiperLength-2) ) - footerHeight;
                   main1909HSwiper.setTranslate(totalTranslate);
              }
          }else{
              chkFooter = true;
              
              $('.pop-multi-brd').find('.pop-multi-brd-in:last-child').removeClass('noswiping202103');
          }

      }
      
  }, false ); //첫번째 슬라이드 스와프시 gnb 나타나도록 하려함.
}

//상단바로가기 퀵버튼
function goToTop(){
  var tab_On_Index = $('#topNav1909 ul li.on').index();
  var $current_tab = $('.main-contents-wrap .hsomemain-contents-box').eq(tab_On_Index);

  var $home = $current_tab.attr('class').indexOf('home'),
      $new_item = $current_tab.attr('class').indexOf('new_item'),
      $best = $current_tab.attr('class').indexOf('best'),
      $multibrd = $current_tab.attr('class').indexOf('multibrd');
      $tv = $current_tab.attr('class').indexOf('tv');

  var idx = 0;
  if ($home != -1) {
      idx = 0;
      $('img.lazy_main').trigger('imgLoad');
  } else if ($new_item != -1) {
      idx = 1;
  } else if ($best != -1) {
      idx = 2;
  } else if ($multibrd != -1) {
      idx = 3;
  }/*  else if ($tv != -1) {
      idx = 4;
  } */

  var homeSwiperV = document.querySelector('.verticalSlide'+idx).swiper;
  homeSwiperV.slideTo(0);
}

function fn_load(idx){
  $('.hsome_main').removeClass('update191029');
  
  if ( idx == 0 && v_main ) {  //홈탭 (메인배너, 더매거진, 기획전, tv, 이벤트)           
      v_main = false;
      getMainBannerList(); //메인배너
      getMagazineList();   //에디토리얼매거진
  } else if ( idx == 1 && v_new ) {  //신상품
      v_new = false;
      $('img.lazy_new').trigger('imgLoad');
      getCategoryList("true");
  } else if ( idx == 2 && v_best ) {  //베스트
      v_best = false;
      $('img.lazy_best').trigger('imgLoad');
      getCategoryList("false");
  } else if ( idx == 3 && v_multibrd ) {    //편집샵
      v_multibrd = false;
      getMobileEdBrand();
      getMobileEdPopularBrand();
  }
  
  
}

var iPhoneYn = false;
// 메인 초기화
function mainInit() {
  var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
  
  if(varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {//IOS 일때 처리
      iPhoneYn = true; 
  }

  /************************************************************************************************
   * 초기 변수 선언
  ************************************************************************************************/
  var winH = $(window).height();
  var menu_Langth = $('.top_nav1909 li').length;
  var header_logoH = $('.header-fix').outerHeight();
  var guickH = $('.hsome_quickMenu1909').outerHeight();
  /************************************************************************************************
   * 초기 설정
  ************************************************************************************************/
  // 수직슬라이드 스와이퍼 container 부분에 높이값 전달.
  $('.main_wrapper_swiper1909').css('height',winH - guickH);
  // 신상품 & 베스트 팝업 최상단 박스 높이 세팅
  $('.pop_wrap190906').css('height',winH - header_logoH - guickH);
  
  /************************************************************************************************
   * lnb 메뉴 클릭 이벤트
  ************************************************************************************************/
  $('#topNav1909 ul li a').on('click', function(e) {
      
      var $this = $(this);
      var all_menu = $this.parents('#topNav1909').find('li');
      var contents_box = $('.hsomemain-contents-box');
      var id = $this.attr('href');

      // 메뉴 on 효과
      e.preventDefault();
      all_menu.removeClass('on');
      $(this).parent('li').addClass('on');
      contents_box.hide();
      $(id).show();
  
    $('html, body').scrollTop(0); //스크롤 오작동방지

    // 메뉴 이동 시 신상품, 베스트 효과
    var tab_On_Index = $('#topNav1909 ul li.on').index();
    var $current_tab = $('.main-contents-wrap .hsomemain-contents-box').eq(tab_On_Index);
    
    if(tab_On_Index == 4 || tab_On_Index == 5) {//tv클릭시, 링크이동으로변경. 뒤로가기시 홈으로 
        tab_On_Index = 0;
    }
    
    window.sessionStorage.setItem('width', tab_On_Index);
    
    var $home = $current_tab.attr('class').indexOf('home'),
        $new_item = $current_tab.attr('class').indexOf('new_item'),
        $best = $current_tab.attr('class').indexOf('best'),
        $multibrd = $current_tab.attr('class').indexOf('multibrd');
        $tv = $current_tab.attr('class').indexOf('tv');

    $('.main1909_up_arr').stop().hide();
    $('.hsome_header .top_nav1909 ul li').removeClass('on');

    if ($home != -1) {
        $('.hsome_header .top_nav1909 ul li').eq(0).addClass('on');
        $('.slide_border_box_icon').removeClass('spin2019');
        
        try{
              ga('gp.send','pageview',{
                  'title':'메인>홈탭>메인배너', //가상페이지 화면명
                  'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=home', //가상페이지URL
                  nonInteraction: true //비 상호작용
              });
          }catch(e) {
              console.log(e);
          }
          
          var checkFirst = $('.verticalSlide0 > ul > li').hasClass('swiper-slide-prev');

          if(checkFirst == false){
              var whiteHeader = $('#mainList').find('div.swiper-slide-active').hasClass("WHITE");
              if(whiteHeader){ //흰색
                  if(!$('.header-fix').hasClass('white-header')){
                      $('.header-fix').addClass('white-header');
                  }
              }else { //검정
                  if($('.header-fix').hasClass('white-header')){
                      $('.header-fix').removeClass('white-header');    
                  }
              }
              
              var previewBgBlack = $('#mainList').find('div.swiper-slide-active').hasClass("BG_BLACK");
              if(previewBgBlack){ //검정
                  $("#magazinePreview").addClass("black-bg");
              }else { //흰색
                  $("#magazinePreview").removeClass("black-bg");
              }
              
              var previewBgTxt = $('#mainList').find('div.swiper-slide-active').hasClass("TXT_BLACK");  //text, pagination color
              if(previewBgTxt){ //검정
                  $("#magazinePreview .tt").addClass("black");
                  $(".hori-pagination0").addClass("black");
                  $(".main1909_down_arr0").removeClass("white");
                  $(".main1909_down_arr0").addClass("black");
              }else { //흰색
                  $("#magazinePreview .tt").removeClass("black");
                  $(".hori-pagination0").removeClass("black");
                  $(".main1909_down_arr0").removeClass("black");
                  $(".main1909_down_arr0").addClass("white");
              }
          }
    } else if ($new_item != -1) {
        fn_load(1); // 신상품 조회
        $('.header-fix').removeClass('white-header');
        $("#contents-newitem .gender > ul li").each(function (i) {
            if ($(this).hasClass("on")) {
                numberCounterExecute(i);
            }
        });
        $('.hsome_header .top_nav1909 ul li').eq(1).addClass('on');

        $('.slide_border_box_icon').removeClass('spin2019');
        $('.newItems_main_slide1909 .slide_border_box_icon').addClass('spin2019');
        
        try{
              ga('gp.send','pageview',{
                  'title':'메인>신상품_여성', //가상페이지 화면명
                  'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=new_women', //가상페이지URL
                  nonInteraction: true //비 상호작용
              });
          }catch(e) {
              console.log(e);
          }
    } else if ($best != -1) {
        fn_load(2); // 베스트 조회
        $('.header-fix').removeClass('white-header');
        $('.hsome_header .top_nav1909 ul li').eq(2).addClass('on');

        $('.slide_border_box_icon').removeClass('spin2019');
        $('.best_main_slide1909 .slide_border_box_icon').addClass('spin2019');
        
        try{
              ga('gp.send','pageview',{
                  'title':'메인>베스트_여성', //가상페이지 화면명
                  'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=best_women', //가상페이지URL
                  nonInteraction: true //비 상호작용
              });
          }catch(e) {
              console.log(e);
          }
    } else if ($multibrd != -1) {
        fn_load(3); // 편집샵
        $('.header-fix').addClass('white-header');
        $('.hsome_header .top_nav1909 ul li').eq(3).addClass('on');

        $('.slide_border_box_icon').removeClass('spin2019');
        $('.multibrd .slide_border_box_icon').addClass('spin2019');
        
        try{
              ga('gp.send','pageview',{
                  'title':'메인>편집샵탭>메인배너', //가상페이지 화면명
                  'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=selectshop', //가상페이지URL
                  nonInteraction: true //비 상호작용
              });
          }catch(e) {
              console.log(e);
          }
    } else if ($tv != -1) {
        fn_load(4); // 핸썸TV
        $('.header-fix').addClass('white-header');
        $('.hsome_header .top_nav1909 ul li').eq(4).addClass('on');
        
        try{
              ga('gp.send','pageview',{
                  'title':'메인>핸썸TV', //가상페이지 화면명
                  'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=handsometv', //가상페이지URL
                  nonInteraction: true //비 상호작용
              });
          }catch(e) {
              console.log(e);
          }
    } else {
        $('.slide_border_box_icon').removeClass('spin2019');
    }

    // 첫번째 슬라이드에서만 로고 노출 210322
    if ($multibrd != -1 || $tv != -1) {
        $('.header-fix').addClass('t-prent header-top white-header');
    } else if($home != -1){
        $('.header-fix').addClass('t-prent header-top');
    } else {
        $('.header-fix').addClass('t-prent header-top');
        $('.header-fix').removeClass('white-header');
    }

    // 신상품 text 영역
    if($('.txt_newItemsbest_wrap_inner').hasClass('up')){
        $('.txt_newItemsbest_wrap_inner').removeClass('up');
        $('.txt_newItemsbest_wrap_inner').css('top',0);
    }

    // 메뉴 이동시 첫화면으로 변경
    for(var i=0;i<4;i++){
          $('.main-swiper-paging-wrap-'+i).find('span').removeClass('on');
          mySwiperV = document.querySelector('.verticalSlide'+i).swiper;
          if ( typeof(mySwiperV) != 'undefined' ) {
            mySwiperV.update();
            mySwiperV.slideTo(0,0);
          }
          if(tab_On_Index == 3) { //편집샵일때
              var mySwiperV3_v = document.querySelector('#popMultiBrd').swiper;
              if ( typeof(mySwiperV3_v) != 'undefined' ) {
                  mySwiperV3_v.slideTo(0,0);    
              }
          }
      }


    // 신상품 & 베스트 남성, 여성 on off
    $('.newItems_main_slide1909 .main1909_count, .newItems_main_slide1909 .gender').show();
    $('.best_main_slide1909 .main1909_count, .best_main_slide1909 .gender').show();
    
    // 첫화면에서 나오는 가이드 화살표
    $('.guide_arr190906').hide();

    // 내려가기 arrow 버튼
    $('.main1909_down_arr'+tab_On_Index).stop().show();
    

      // lnb 눌렀을때 스와이퍼 update.
      var i = $this.parent('li').index();
      if(i != 4 && i != 5) {
          mySwiperV = document.querySelector('.verticalSlide'+i).swiper;
          if ( typeof(mySwiperV) != 'undefined' ) {
              mySwiperV.update();
          }
      }else {
          window.sessionStorage.removeItem('height');
      } 
      
      if(i == 3){ // 메뉴 위치가 편집샵일 경우
          // 편집샵 메인 슬라이드 업데이트
          var mutibrdMain = document.querySelector('#mutibrdMainSlider').swiper;
          mutibrdMain.update();

          // 편집샵 브랜드 리스트 업데이트
          var mutibrdBrand = document.querySelector('.con-brand-list.swiper-container').swiper;
          mutibrdBrand.update();

          // 편집샵 인기브랜드 슬라이드 업데이트
          var multiBrdHot = document.querySelector('#popMultiBrd').swiper;
          if ( typeof(multiBrdHot) != 'undefined' ) {
              multiBrdHot.update();  
          }

          // 편집샵 인기브랜드 아이템 슬라이드 업데이트
          var hot_Length = $('.brand-pop-item-list-slider.swiper-container');
          hot_Length.each(function(i){
              main_multibrd_hotBrandItem_Slide(i);
          });
      }
  
  });
  
  /************************************************************************************************
   * 신상품 & 베스트 에서 플러스 버튼 눌렀을때 효과
  ************************************************************************************************/
  // 신상품 팝업 Open & Close.
  $('.newItems_main_slide1909 .new_best_item_plus_btn .plusminus_btn190923').click(function(e){
      e.preventDefault();
      $('#mainNewPopwrap201909').show();
//         $('.hsome_main').css('margin-bottom','-3px');
  });
  $('.new_items_pop1909 .pop_cls').click(function(e){
      e.preventDefault();
      $('.pop_wrap190906').hide();
//         $('.hsome_main').css('margin-bottom','60px');
      $('.agree_more_btn .slide_border_box_icon .bar_horizontal').removeClass('minus');
      $('.agree_more_btn .slide_border_box_icon .bar_horizontal').addClass('plus');
  });

  // 베스트 팝업 Open & Close.
  $('.best_main_slide1909 .new_best_item_plus_btn .plusminus_btn190923').click(function(e){
      e.preventDefault();
      $('#mainBestPopwrap201909').show();
//         $('.hsome_main').css('margin-bottom','-3px');
  });
  $('.best_pop1909 .pop_cls').click(function(e){
      e.preventDefault();
      $('.pop_wrap190906').hide();
//         $('.hsome_main').css('margin-bottom','60px');
      $('.agree_more_btn .slide_border_box_icon .bar_horizontal').removeClass('minus');
      $('.agree_more_btn .slide_border_box_icon .bar.bar_horizontal').addClass('plus');
  });
  
  $('.main202103-depth-title').off().on('click', '.more', function(){
      $(this).addClass('touch');
  });

  fn_load(0); // home
  main_Parent_Verti_slide(0); //스와이퍼
  
  touchSwiperTopNav();
  mainNewBestPopOn1909(); // 신상품,베스트 - 팝업 - on 띠부
}

window.onpageshow = function(e) {
  mainInit(); 
  
  if ( e.persisted || (window.performance && window.performance.navigation.type == 2)) {  // 뒤로가기
      if ( iPhoneYn && e.persisted ) {   // bfCache
          
          var v_width = 0;
          var v_height = 0;
          if ( window.sessionStorage.getItem('width') != null ) {
              v_width = window.sessionStorage.getItem('width');
          }
          if ( window.sessionStorage.getItem('height') != null ) {
              v_height = window.sessionStorage.getItem('height');
          }
          window.sessionStorage.setItem('moveYn', 'Y');
          window.sessionStorage.setItem('moveHeight', v_height);
          
          if ( v_width == 1 || v_width == 2 ) {
              if ( window.sessionStorage.getItem('categoryCode') != null ) {
                  window.sessionStorage.setItem('moveCategoryCode', window.sessionStorage.getItem('categoryCode'));
              }
          }
          location.reload();
      } else {
      
          if($("#mainNewPopwrap201909").css("display") == "block" || $("#mainBestPopwrap201909").css("display") == "block"){
              $('.slide_border_box_icon .bar_horizontal').removeClass("minus");
              $('.slide_border_box_icon .bar_horizontal').addClass("plus");
              $('.pop_wrap190906').hide();
              $(".pop_wrap190906 li").removeClass("on");
          }
          if($(".hsome_quickMenu_contents").hasClass("active") ){
              clsPage(0);
              $(".hsome_quickMenu").addClass("active");
          }
          
          var v_width = 0;  //탭 (홈/신상품/베스트/편집샵/tv)
          var v_height = 0; //세로
          var h_width = 0;  //가로 슬라이드
          if ( window.sessionStorage.getItem('width') != null ) {
              v_width = window.sessionStorage.getItem('width');
          }
          if ( window.sessionStorage.getItem('height') != null ) {
              v_height = window.sessionStorage.getItem('height');
          }
          if ( window.sessionStorage.getItem('h_width') != null) {
              h_width = window.sessionStorage.getItem('h_width');
          }
          window.sessionStorage.setItem('moveYn', 'Y');
          window.sessionStorage.setItem('moveHeight', v_height);
          
          if ( v_width == 1 || v_width == 2 ) {
              if ( window.sessionStorage.getItem('categoryCode') != null ) {
                  window.sessionStorage.setItem('moveCategoryCode', window.sessionStorage.getItem('categoryCode'));
              }
          }
          
          if ( v_width == 0) {
              mySwiperV = document.querySelector('.verticalSlide0').swiper;
              if ( window.sessionStorage.getItem('moveYn') != null && window.sessionStorage.getItem('moveYn') == 'Y' ) {
                  window.sessionStorage.removeItem('moveYn');
                  if ( window.sessionStorage.getItem('moveHeight') != null ) {
//                         $('.header-fix').removeClass('white-header');

                      fn_homeTab(); //홈탭 뒤로가기
                  
                  }

              } else {
                  mySwiperV.slideTo(0,0);
              }
          } else {
              try {
                  $("#topNav1909 ul li").eq(v_width).find("a").trigger("click"); //세로탭
                  mySwiperV = document.querySelector('.verticalSlide'+v_width).swiper;

                  if ( v_width == 1 || v_width == 2) {
                      fn_moveCategory(v_width);
                  }

                  mySwiperV.slideTo(v_height,0);
                  heightChange();
                  
                  if(v_width == 3){  //편집샵
                      var popIdx = window.sessionStorage.getItem('pop_height');
                      var popMultSwiper = document.querySelector('#popMultiBrd').swiper;
                      popMultSwiper.slideTo(popIdx,0);
                      if(document.querySelector('#popMultiBrd').swiper.isEnd){
                          $('.pop-multi-brd').find('.pop-multi-brd-in:last-child').addClass('noswiping202103');
                      }
                      
                      var multiBrdIdx =  window.sessionStorage.getItem('mbm_width');
                      var multSwiper = document.querySelector('#mutibrdMainSlider').swiper;
                      multSwiper.slideTo(multiBrdIdx,0);
                      heightChange();
                      
                      window.sessionStorage.removeItem('pop_height');
                      window.sessionStorage.removeItem('mbm_width');
                  }
              } catch(e) {
                  e.throws;
              }
          } 
      }
  } else {
      if ( iPhoneYn && window.sessionStorage.getItem('moveYn') != null ) {
          var v_width = 0;
          var v_height = 0;
          if ( window.sessionStorage.getItem('width') != null ) {
              v_width = window.sessionStorage.getItem('width');
          }
          if ( window.sessionStorage.getItem('height') != null ) {
              v_height = window.sessionStorage.getItem('height');
          }
          if ( window.sessionStorage.getItem('h_width') != null) {
              h_width = window.sessionStorage.getItem('h_width');
          }
          
          if ( v_width == 0) {
              mySwiperV = document.querySelector('.verticalSlide0').swiper;
              if ( window.sessionStorage.getItem('moveYn') != null && window.sessionStorage.getItem('moveYn') == 'Y' ) {
                  window.sessionStorage.removeItem('moveYn');
                  if ( window.sessionStorage.getItem('moveHeight') != null ) {
//                         $('.header-fix').removeClass('white-header');

                      fn_homeTab(); //홈탭 뒤로가기
                  }

              } else {
                  mySwiperV.slideTo(0,0);
              }
          } else {
              try {
                  $("#topNav1909 ul li").eq(v_width).find("a").trigger("click"); //세로탭
                  mySwiperV = document.querySelector('.verticalSlide'+v_width).swiper;
                  
                  if ( v_width == 1 || v_width == 2) {
                      fn_moveCategory(v_width);
                  }
                  
                  mySwiperV.slideTo(v_height,0);
                  heightChange();
                  
                  if(v_width == 3){  //편집샵
                      var popIdx = window.sessionStorage.getItem('pop_height');
                      var popMultSwiper = document.querySelector('#popMultiBrd').swiper;
                      popMultSwiper.slideTo(popIdx,0);
                      if(document.querySelector('#popMultiBrd').swiper.isEnd){
                          $('.pop-multi-brd').find('.pop-multi-brd-in:last-child').addClass('noswiping202103');
                      }
                      
                      var multiBrdIdx =  window.sessionStorage.getItem('mbm_width');
                      var multSwiper = document.querySelector('#mutibrdMainSlider').swiper;
                      multSwiper.slideTo(multiBrdIdx,0);
                      heightChange();
                      
                      window.sessionStorage.removeItem('pop_height');
                      window.sessionStorage.removeItem('mbm_width');
                  }
              } catch(e) {
                  e.throws;
              }
          }
      }
  }
  
  $('#mainList').show();
};
  
// 새로고침
function fn_refresh() {
  if ( refreshYn ) {
      var tab_On_Index = $('#topNav1909 ul li.on').index();
      var $current_tab = $('.main-contents-wrap .hsomemain-contents-box').eq(tab_On_Index);
      var $home = $current_tab.attr('class').indexOf('home'),
          $new_item = $current_tab.attr('class').indexOf('new_item'),
          $best = $current_tab.attr('class').indexOf('best'),
          $multibrd = $current_tab.attr('class').indexOf('multibrd');
          $tv = $current_tab.attr('class').indexOf('tv');

      var vIdx = 0;
      if($home != -1){
          vIdx = 0;
      }else if($new_item != -1){
          vIdx = 1;
      }else if($best != -1){
          vIdx = 2;
      }else if($multibrd != -1){
          vIdx = 3;
      }else if($tv != -1){
          vIdx = 4;
      }
      
      if ( vIdx == refreshIdx ) {
          refreshYn = false;
          if ( refreshIdx == 0 ) {
              v_main = true;
              
              h_exhibition = true;  //가로셋팅풀기
              h_event = true;
              h_homeTv = true;
              
              //s: lazy_load
              chkMain = true;
              chkMagazine = true; 
              chkExhibition = true;
              chkEvent = true;
              chkHomeTv = true;
              //e: lazy_load
              
              try{
                  ga('gp.send','pageview',{
                      'title':'메인>홈탭>메인배너', //가상페이지 화면명
                      'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=home', //가상페이지URL
                      nonInteraction: true //비 상호작용
                  });
              }catch(e) {
                  console.log(e);
              }
          } else if ( refreshIdx == 1 ) {
              $("#contents-newitem .gender ul li").removeClass("on");
              $("#contents-newitem .gender ul li:eq(0)").addClass("on");
              v_new = true;
              try{
                  ga('gp.send','pageview',{
                      'title':'메인>신상품_여성', //가상페이지 화면명
                      'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=new_women', //가상페이지URL
                      nonInteraction: true //비 상호작용
                  });
              }catch(e) {
                  console.log(e);
              }
          } else if ( refreshIdx == 2 ) {
              $("#contents-best .gender ul li").removeClass("on");
              $("#contents-best .gender ul li:eq(0)").addClass("on");
              v_best = true;
              try{
                  ga('gp.send','pageview',{
                      'title':'메인>베스트_여성', //가상페이지 화면명
                      'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=best_women', //가상페이지URL
                      nonInteraction: true //비 상호작용
                  });
              }catch(e) {
                  console.log(e);
              }
          } else if ( refreshIdx == 3 ) {
//                 chkEdPopular = true; //인기브랜드
              v_multibrd = true;
              try{
                  ga('gp.send','pageview',{
                      'title':'메인>편집샵탭>메인배너', //가상페이지 화면명
                      'location':window.location.protocol + '//' + window.location.host + decodeURI(window.location.pathname) + '?main_tab=selectshop', //가상페이지URL
                      nonInteraction: true //비 상호작용
                  });
              }catch(e) {
                  console.log(e);
              }
          }
          fn_load(refreshIdx);
      }
  }
}
