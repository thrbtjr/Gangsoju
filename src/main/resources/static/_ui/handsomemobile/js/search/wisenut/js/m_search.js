/***************************************************************************
 * Section 1: 전역변수 모음
 ***************************************************************************/
var paramCate = ""; // 전체, 카테고리
var paramBrand =""; // 브랜드
var paramPrice = ""; // 가격
var paramColor =""; // 색상
var paramSize =""; // 사이즈
var paramMixed =""; // 혼용률
var paramLang ="product_ko"; // 언어선택
var paramSort =""; // 정렬
var paramReQuery ="" // 재정렬
var paramReSearch ="0" // 재검색 탭 구분자(0: 결과내 재검색, 1: 검색어 제외)
var param1Depth = ""; // 1depth 텍스트
var paramPage = "0";

/***************************************************************************
 * Section 2: Util 함수 모음
 ***************************************************************************/
//String util 함수 추가(김형준)
//속도향상을 위해 자바와 유사한 StringBuilder 객체 추가
var StringBuilder = function(){ 
    this.buffer = new Array();  
} 

// 순서대로 문자열을 추가한다.
StringBuilder.prototype.Append = function( strValue ) { 
    this.buffer[this.buffer.length] = strValue;
} 

// 문자열의 형식을 지정해서 추가한다. 
StringBuilder.prototype.AppendFormat = function() { 
    var count = arguments.length;
    if( count < 2 ) return ""; 
    var strValue = arguments[0];
    for(var i=1; i<count; i++) 
        strValue = strValue.replace("{"+ (i-1) + "}", arguments[i] );
    this.buffer[this.buffer.length] = strValue;
} 

// 해당하는 위치에 문자열을 추가한다. (문자위치가 아님);
StringBuilder.prototype.Insert = function( idx, strValue ) { 
    this.buffer.splice( idx, 0, strValue );
}

// 해당문자열을 새로운 문자열로 바꾼다. 
// (배열방 단위로 바꾸므로 배열방 사이에 낀 문자열은 바꾸지 않음)
StringBuilder.prototype.Replace = function( from, to , one) { 
    for( var i=this.buffer.length-1; i>=0; i--)
        this.buffer[i] = this.buffer[i].replace(new RegExp(from, "g"), to);
}

// 문자열로 반환한다.
StringBuilder.prototype.ToString = function() { 
        return this.buffer.join("");
} 

//괄호 제거 함수
String.prototype.truncateBracket = function () {
    return this.replace(/(\(*)/g, "").replace(/(\)*)/g , "");
};

//괄호 제거 + ! 제거 함수
String.prototype.truncateBracketAndExcla  = function () {   
    return this.replace(/(\(*)/g, "").replace(/(\)*)/g , "").replace(/(\!*)/g , "");
};

//브랜드 체크박스
var sb_brand = new StringBuilder();
var count_brand = 0;

// 가격 체크박스
var sb_price= new StringBuilder();
var count_price = 0;

//사이즈 체크박스
var sb_size = new StringBuilder();
var count_size = 0;

// 혼용률 체크박스
var sb_mixed = new StringBuilder();
var count_mixed = 0;

// 천단위 콤마 찍기
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//기간 설정
function setDate(range) {

    var startDate = "";
    var endDate = "";
    
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() +1;
    var day = currentDate.getDate();

    if (parseInt(month) < 10) {
        month = "0" + month;
    }

    if (parseInt(day) < 10) {
        day = "0" + day;
    }

    var toDate = year + "." + month + "." + day;

    // 기간 버튼 이미지 초기화
    for (i = 1;i < 5 ;i++) {
        $("#range"+i).attr ("src", "resources/images/btn_term" + i + ".gif");
    }
    
    // 기간 버튼 이미지 선택
    if (range == "D") {
        startDate = getAddDay(currentDate, -0);
        $("#range2").attr ("src", "resources/images/btn_term22.gif");
    } else if (range == "W") {
        startDate = getAddDay(currentDate, -6);
        $("#range3").attr ("src", "resources/images/btn_term32.gif");
    } else if (range == "M") {
        startDate = getAddDay(currentDate, -29);
        $("#range4").attr ("src", "resources/images/btn_term42.gif");
    } else {
        startDate = "1970.01.01";
        endDate = toDate;
        $("#range1").attr ("src", "resources/images/btn_term12.gif");
    }
    
    if (range != "A" && startDate != "") { 
        year = startDate.getFullYear();
        month = startDate.getMonth()+1; 
        day = startDate.getDate();

        if (parseInt(month) < 10) {
            month = "0" + month;
        }

        if (parseInt(day) < 10) {
            day = "0" + day;
        }

        startDate = year + "." + month + "." + day;             
        endDate = toDate;
    }
    
    $("#range").val(range);
    $("#startDate").val(startDate);
    $("#endDate").val(endDate);
}

// 일주일전 날짜 가져오기
var prevWeek = function getPrevWeek() {
    
    var date = new Date();
    date.setDate(date.getDate()-7);
    
    var year = date.getFullYear();
    var month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    
    var rtnStr = year + '.' + month + '.' + day;
    
    return rtnStr;  
}

// 현재 일자
var realTime = function getRealTime() {
    
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth(); 
    var dt = today.getDate(); 
    var dw = today.getDay(); //요일
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    month = month +1;
    
    
    //요일처리 
    var dayweek = new Array(7);
    var monthArray = new Array(7);
    var targetUrl = $(".m_search_box_wrap #search").attr("action");
    var returnString = "";

    if(targetUrl.indexOf("en") > -1){ //en
        dayweek[0] = "(SUN)"
        dayweek[1] = "(MON)"
        dayweek[2] = "(TUE)"
        dayweek[3] = "(WED)"
        dayweek[4] = "(THU)"
        dayweek[5] = "(FRI)"
        dayweek[6] = "(SAT)"  
        d = dayweek[dw];
        
        monthArray[1] = "January";
        monthArray[2] = "February";
        monthArray[3] = "March";
        monthArray[4] = "April";
        monthArray[5] = "May";
        monthArray[6] = "June";
        monthArray[7] = "July";
        monthArray[8] = "August";
        monthArray[9] = "September";
        monthArray[10] = "October ";
        monthArray[11] = "November";
        monthArray[12] = "December";
        
        returnString = "As of "+monthArray[month]+" "+ dt + d +", "+ year;
    }else if(targetUrl.indexOf("zh") > -1){ //zh
        dayweek[0] = "(日)"
        dayweek[1] = "(月)"
        dayweek[2] = "(火)"
        dayweek[3] = "(水)"
        dayweek[4] = "(木)"
        dayweek[5] = "(金)"
        dayweek[6] = "(土)"   
        d = dayweek[dw];
        returnString = year + '年 ' + month +'月 ' + dt + '日 '+d +" 为基准";
    }else{ //ko
        dayweek[0] = "(일)"
        dayweek[1] = "(월)"
        dayweek[2] = "(화)"
        dayweek[3] = "(수)"
        dayweek[4] = "(목)"
        dayweek[5] = "(금)"
        dayweek[6] = "(토)"   
        d = dayweek[dw];
        returnString = year + '년 ' + month +'월 ' + dt + '일 '+d +" 기준";
    }
    
    
    // 출력
    return returnString;    
}

// 날짜 계산
function getAddDay ( targetDate, dayPrefix ) {
    
    var newDate = new Date( );
    var processTime = targetDate.getTime ( ) + ( parseInt ( dayPrefix ) * 24 * 60 * 60 * 1000 );
    newDate.setTime ( processTime );
    return newDate;
}

//Replace All
function replaceAll(str, orgStr, repStr) {
    return str.split(orgStr).join(repStr);
}

//문자열 숫자 비교
function compareStringNum(str1, str2, repStr) {
    
    var num1 =  parseInt(replaceAll(str1, repStr, ""));
    var num2 = parseInt(replaceAll(str2, repStr, ""));

    if (num1 > num2) {
        return false;
    } else {
        return true;
    }
}

//쿠키값 추출
function getCookie(c_name) {
    
    var i;
    var x;
    var y;
    
    var cookies = document.cookie.split(";");   
    
    for (i=0;i<cookies.length;i++) {
        x = cookies[i].substr(0,cookies[i].indexOf("="));
        y = cookies[i].substr(cookies[i].indexOf("=")+1);
        x = x.replace(/^\s+|\s+$/g,"");
        if (x==c_name) {
            return unescape(y);
        }
    }
}

// 쿠키 설정
function setCookie(c_name,value,exdays) {

    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}



/***************************************************************************
 * Section 3: 왼쪽 메뉴 그룹핑 영역 User's Action Handler
 ***************************************************************************/   

var targetLang = "ko";

$(document).ready(function() {
    
    var targetUrl = $(".m_search_box_wrap #search").attr("action");
    targetLang = handsomeIsoCode;
    
    // 결과내검색어, 검색어제외 구분
    $('input[name=re_sr_sel]').on("click", function() {
        
        var title = $('input[name=re_sr_sel]:checked').val();
        
        if(title == "add"){ 
            paramReSearch = "0";
        } else if(title == "remove"){
            paramReSearch = "1";
        } else {
            
        }
    });
    
    // 언어선택
    $('#langSearch').on("change", function() {  
        
        var paramStr = $('#langSearch').val();

        $("#selectedLang").val("product_"+paramStr);
        
        paramLang = "product_"+paramStr;
        $("#lang").val(paramStr);

    }); 
    
    // 정렬
    $('#sortSearch > li').find("a").on("click", function() {
        
        $('#sortSearch > li > a').removeClass();
        
        var title = String($(this).attr("title"));
        
        if(title == "newest"){
            paramSort = "DATE/DESC";
            $("#sr_sortby_state").text(mobileNewest);
            $(this).addClass("on");
        } else if(title == "lowPrice"){
            paramSort = "SALEPRICE/ASC";
            $("#sr_sortby_state").text(mobileLowprice);
            $(this).addClass("on");
        } else if(title == "highPrice"){
            paramSort = "SALEPRICE/DESC";
            $("#sr_sortby_state").text(mobileHighprice);
            $(this).addClass("on");
        } else if(title == "sell"){
            paramSort = "SELLCNT/DESC";
            // 2018.09.04 수정
            $("#sr_sortby_state").text(mobilebestseller);
            //$("#sr_sortby_state").text(mobilesalefirst);
            $(this).addClass("on");
        } else if(title == "accuracy"){
            paramSort = "RANK/DESC,SELLCNT/DESC";
            $("#sr_sortby_state").text(mobilebestmatch);
            $(this).addClass("on");
        }  else if(title == "sail"){
        	// 2018.09.04 수정
        	paramSort = "SALERATE/DESC,SALEPRICE/ASC";
            //paramSort = "SELLCNT/ASC";
        	$("#sr_sortby_state").text(mobilesalefirst);
            //$("#sr_sortby_state").text(mobilebestseller);
            $(this).addClass("on");
        } else {
            paramSort = "DATE/DESC";
            $("#sr_sortby_state").text(mobileNewest);
            $('#sortSearch > li > a').removeClass();
        }

        paramReQuery = "";

    });
});

// 고정 카테고리 선택: 3depth 클릭시
// 브랜드, 가격, 사이즈, 색상, 컬러칩 변경한다.
$(document).on("click",".filter_3depth_search_fix > a",function(){  
    
    var paramStr = String($(this).children("span:eq(0)").text());
    
    if($(this).hasClass("on")){
        $('.selectedSearch').detach();
        $(".cate_one").parent().detach();
        $('#selectedSearchCondition').after("<li class=\"swiper-slide selectedSearch\"><span class=\"cate_one\">"+paramStr+"</span><a href=\"#\" class=\"btn_close\"><img src=\"/_ui/mobile/common/images/common/ico_close_white.png\" alt=\"close\"></a></li>");
        
        paramCate = paramStr;
        param1Depth = paramStr.substring(0, paramStr.indexOf(">"));

    } else {
        // 선택한 조건 삭제
        $('.selectedSearch > span').each(function(i,v){
            if(paramStr == $(this).text()){
                $(this).parent().detach();
                $(this).parent().removeClass("on");
            }
        });
        
        paramCate = "";
    }
});

//고정 카테고리 선택: 전체 클릭시
$(document).on("click","#filter_cate_fix > a",function(){ 
    
    $('.selectedSearch').detach();
    $(".cate_one").parent().detach();
    
});

//유동 카테고리 선택: 1depth 클릭시
// 2depth 펼쳐짐, 브랜드, 가격, 사이즈, 색상, 컬러칩만 변경한다.
$(document).on("click",".filter_cate_upd > a",function(){ 
    
    var anchorStr = String($(this).text());
    var spanStr = String($(this).children("span").text());
    var paramStr = anchorStr.replace(spanStr, "").replace(/(\"*)/g, "").replace(/(\s*)/g, "");
    
    $('.selectedSearch').detach();
    $(".cate_one").parent().detach();
    //$('#selectedSearchCondition').after("<li class=\"swiper-slide selectedSearch\"><span class=\"cate_one\">"+paramStr+"</span><a href=\"#\" class=\"btn_close\"><img src=\"/_ui/mobile/common/images/common/ico_close_white.png\" alt=\"close\"></a></li>");
    
    param1Depth = paramStr;
    paramCate = "";
    doMenuGroupDraw();  
});

// 유동 카테고리 선택: 2depth 클릭시
// 3depth 펼쳐짐, 브랜드, 가격, 사이즈, 색상, 컬러칩 변경한다.
$(document).on("click",".filter_cate_2depth_upd > a:first-child",function(){  
    
    var anchorStr = String($(this).text());
    var spanStr = String($(this).children("span").text());
    var paramStr = anchorStr.replace(spanStr, "");
    
    $('.selectedSearch').detach();
    $(".cate_one").parent().detach();
    $('#selectedSearchCondition').after("<li class=\"swiper-slide selectedSearch\"><span class=\"cate_one\">"+paramStr+"</span><a href=\"#\" class=\"btn_close\"><img src=\"/_ui/mobile/common/images/common/ico_close_white.png\" alt=\"close\"></a></li>");
    
    paramCate = paramStr;
    
    doMenuGroupDrawSub();
});

//유동 카테고리 선택: 3depth 클릭시
// 브랜드, 가격, 사이즈, 색상, 컬러칩만 변경한다.
$(document).on("click",".filter_cate_3depth_upd > a",function(){ 
    
    var paramStr = String($(this).children("span:eq(0)").text());
    
    if($(this).hasClass("on")){
        // 선택한 조건 삭제
        $('.selectedSearch > span').each(function(i,v){
            if(paramStr == $(this).text()){
                $(this).parent().detach();
            }
        });
        
        paramCate = "";

        $(this).removeClass("on");
    } else {
        var paramStr = String($(this).children("span:eq(0)").text());
        $('.selectedSearch').detach();
        $(".cate_one").parent().detach();
        $('#selectedSearchCondition').after("<li class=\"swiper-slide selectedSearch\"><span class=\"cate_one\">"+paramStr+"</span><a href=\"#\" class=\"btn_close\"><img src=\"/_ui/mobile/common/images/common/ico_close_white.png\" alt=\"close\"></a></li>");
        
        paramCate = paramStr;
        param1Depth = paramStr.substring(0, paramStr.indexOf(">"));
        
        $(".sr_category_menu_dep3 > li > a").removeClass("on");
        $(this).addClass("on");
    }   
    
    doMenuGroupDrawSub();
});

// 브랜드      
$(document).on("change",'input:checkbox[name="brand_ck"]',function(){
    
    //"TIME,MINE,SYTEM;"
    if($(this).prop('checked')) {

        // 선택한 조건에 추가
        $('#selectedSearchCondition').after("<li class=\"swiper-slide selectedSearch\"><span class=\"reset01\">"+$(this).val()+"</span><a href=\"#\" class=\"btn_close\"><img src=\"/_ui/mobile/common/images/common/ico_close_white.png\" alt=\"close\"></a></li>");
        
        // 전역변수 파라미터 추가
        if(count_brand == 0){
            
            sb_brand.Append($(this).val());
        } else {
            sb_brand.Append(","+$(this).val());
        }
        count_brand++;
        
        paramBrand = sb_brand.ToString();
        
    } else {
        
        count_brand--;
        
        var str = $(this).val();
        
        // 선택한 조건 삭제
        $('.selectedSearch > span').each(function(i,v){
            if(str == $(this).text()){
                $(this).parent().detach();
            }
        });
        
        // 전역변수 파라미터 삭제
        if(count_brand == 0){    
            sb_brand = new StringBuilder();
        } else {                
            sb_brand.Replace(","+$(this).val(),"");
        }
        
        // 같은 문자 없는 경우 (같은 문자 모두 제거되는 방지 장치)
        if (sb_brand.ToString().indexOf($(this).val()) == -1) {
            sb_brand.Replace($(this).val(), "");
        }

        paramBrand = sb_brand.ToString();

        if (sb_brand.ToString().indexOf($(this).val()) == -1) {

            if(sb_brand.ToString().substring(0,1) == ","){              
                paramBrand = sb_brand.ToString().substring(1, sb_brand.ToString().length);              
            }
        }
    }
});

//가격
$(document).on("change",'input:checkbox[name="price_ck"]',function(){
    
    var paramStr = "";
    
    if($(this).val() =="A"){
        paramStr = "10만원 이하";
        
    } else if($(this).val() =="B"){
        paramStr = "10만원~30만원";
        
    } else if($(this).val() =="C"){
        paramStr = "30만원~50만원";
        
    } else if($(this).val() =="D"){
        paramStr = "50만원~100만원";
        
    } else if($(this).val() =="E"){
        paramStr = "100만원 이상";      
    }

    if($(this).prop('checked')) {
        
        // 선택한 조건에 추가
        $('#selectedSearchCondition').after("<li class=\"swiper-slide selectedSearch\"><span class=\"reset02\">"+paramStr+"</span><a href=\"#\" class=\"btn_close\"><img src=\"/_ui/mobile/common/images/common/ico_close_white.png\" alt=\"close\"></a></li>");
        
        // 전역변수 파라미터 추가
        if(count_price == 0){
            sb_price.Append($(this).val());
        } else {
            sb_price.Append(","+$(this).val());
        }
        count_price++;
        paramPrice = sb_price.ToString();
        
    } else {
        
        count_price--;
        
        // 선택한 조건 삭제
        $('.selectedSearch > span').each(function(i,v){
            if(paramStr == $(this).text()){
                $(this).parent().detach();
            }
        });
        
        // 전역변수 파라미터 삭제
        sb_price.Replace(","+$(this).val(),"");
        sb_price.Replace($(this).val(), "");
        
        paramPrice = sb_price.ToString();
        
        if(sb_price.ToString().substring(0,1) == ","){              
            paramPrice = sb_price.ToString().substring(1, sb_price.ToString().length);              
        }
    }
});      

// 뒤로 가기 클릭시 메뉴 전환
$(document).on("click",".sliding_menu > .bk_btn",function(){    
    $(".sr_category_menu_dep1").animate({"left":"-100%"},"fast").clearQueue();
    $(this).parent(".sliding_menu").hide();
});

// 2depth 클릭시 메뉴 펼치기
/*$(document).on("click",".filter_cate_2depth_upd > a",function(){ 
    if($(this).hasClass("on")){
      $(this).removeClass("on");
      if($(this).next(".sr_category_menu_dep3").length > -1){
        $(this).next(".sr_category_menu_dep3").slideUp("fast");
      }
    }else{
      $(".categorys .sr_category_menu_dep2 > li > a").removeClass("on");
      $(".sr_category_menu_dep3").slideUp("fast");
      $(this).addClass("on");
      $(this).next(".sr_category_menu_dep3").slideDown("fast");
    }
});*/

// 색상
$(document).on("click","#filter_color_search > li > a",function(){      

    var paramStr = String($(this).text());
    
    $('#selectedSearchCondition').after("<li class=\"swiper-slide m_color_chip selectedSearch\"><span class=\"reset03\" style=\"background:"+paramStr+";border:1px solid #e3e3e3;display:block;text-indent:-999em;width:20px;height:20px;\">"+paramStr+"</span><a href=\"#\" class=\"btn_close\"><img src=\"/_ui/mobile/common/images/common/ico_close_white.png\" alt=\"close\"></a></li>");
//    $('#selectedSearchCondition').after("<li class=\"swiper-slide m_color_chip selectedSearch\"><span class=\"reset03\">"+paramStr+"</span><a href=\"#\" class=\"btn_close\"><img src=\"/_ui/mobile/common/images/common/ico_close_white.png\" alt=\"close\"></a></li>");
    
    $('.selectedSearch > .reset03').each(function(i,v){

        if(paramStr != $(v).text()){

            $(".reset03:contains("+$(v).text()+")").parent().detach();
        } else {
            $(".reset03:contains("+$(v).text()+")").parent().prev().not("#selectedSearchCondition").detach();
        }
    }); 
    
    paramColor = paramStr;
});
    
// 사이즈
$(document).on("change","input:checkbox[name='size_ck']",function(){        

    var paramStr = String($(this).val());
    
    // 선택한 조건에 추가
    $('#selectedSearchCondition').after("<li class=\"swiper-slide selectedSearch\"><span class=\"reset04\">"+paramStr+"</span><a href=\"#\" class=\"btn_close\"><img src=\"/_ui/mobile/common/images/common/ico_close_white.png\" alt=\"close\"></a></li>");
    
    // 선택한 조건 삭제
    $('.selectedSearch > .reset04').each(function(i,v){

        if(paramStr != $(v).text()){

            $(".reset04:contains("+$(v).text()+")").parent().detach();
        } else {
            $(".reset04:contains("+$(v).text()+")").parent().prev().not("#selectedSearchCondition").detach();
        }
    }); 

    paramSize = paramStr;
});
    
// 혼용률
$(document).on("change","input:checkbox[name='mixed_ck']",function(){   

    if($(this).prop('checked')) {
        
        // 선택한 조건에 추가
        $('#selectedSearchCondition').after("<li class=\"swiper-slide selectedSearch\"><span class=\"reset05\">"+$(this).val()+"</span><a href=\"#\" class=\"btn_close\"><img src=\"/_ui/mobile/common/images/common/ico_close_white.png\" alt=\"close\"></a></li>");
        
        // 전역변수 파라미터 추가
        if(count_mixed == 0){
            sb_mixed.Append($(this).val());
        } else {
            sb_mixed.Append(","+$(this).val());
        }

        count_mixed++;
        
        paramMixed = sb_mixed.ToString();
        
    } else {
        
        count_mixed--;
        
        var str = $(this).val();
        
        // 선택한 조건 삭제
        $('.selectedSearch > span').each(function(i,v){
            if(str == $(this).text()){
                $(this).parent().detach();
            }
        });   
        
        // 전역변수 파라미터 삭제
        sb_mixed.Replace(","+$(this).val(),"");
        sb_mixed.Replace($(this).val(), "");
        
        paramMixed = sb_mixed.ToString();
        
        if(sb_mixed.ToString().substring(0,1) == ","){              
            paramMixed = sb_mixed.ToString().substring(1, sb_mixed.ToString().length);              
        }
        
    }
});

//색깔구분 : 동적으로 태그 추가된 경우 해당 요소를 선택하기 위함 
/*$(document).on("click","#searchProductlistBody .item_box > .color_more_wrap > a",function(){
    console.log($(this).index());
    $(this).parent().parent().find(".item_info1 > .item_img > .respon_image").siblings().css("display","none");
    $(this).parent().parent().find(".item_info1 > .item_img > .respon_image").filter(":eq("+$(this).index()+")").css("display","block");
    
    var url = $(this).parent().parent().find("> a ").attr("href");
    var urlTemp = url.split("/");
    var code = urlTemp[urlTemp.length - 1];
    
    if(code != ""){
        var codeTemp = $(this).parent().parent().find("> a > .item_img > img").filter(":eq("+$(this).index()+")").attr("src").split("/"); 
        var colorCode_temp = codeTemp[codeTemp.length - 1];

        var temp = colorCode_temp.split("_");
        var colorCode = temp[0]+"_"+temp[1];
    
        $(this).parent().parent().find("> a ").attr("href", url.replace(code, colorCode));
    }
});*/

function chgColorChip(index, code) {
    $("#T01_IMG_"+index).attr("src",code);
    var parent = $("#T01_IMG_"+index).parent().parent().parent();
    var pCode = code.substring(code.lastIndexOf('/'), code.lastIndexOf('_'));
    $(parent).attr('href', '/p' + pCode);
    $(parent).parent().find('.info_cont > a').attr('href', '/p' + pCode);
    
    var colorCode = pCode.split("/")[1];
    var getIndex = index != 0 ? index-1 : index;

    $(parent).parent().find('button.like').attr('data-value', colorCode);
    
    if($("#price_"+colorCode).length == 0){
        $.ajax({
            url: "/"+targetLang+"/c/getProductPrice",
            type: "GET",
            data: {productCode: colorCode},
            success: function(data){
                
                var priceHtml = "";
                simbol = $("#simbol").val();
                
                if(data.productPrice == undefined){
                    return;
                }
                
                if(targetLang == 'ko'){
                    priceHtml += "<span id=\"price_"+colorCode+"\">";
                    priceHtml += "<span>￦"+ numberWithCommas(data.productPrice)+"</span>";
                    if(data.productNormalityPrice != undefined && data.productNormalityPrice != ""){
                        var productSalePerCent = (data.productNormalityPrice*1 - data.productPrice*1) / (data.productNormalityPrice*1);
                        priceHtml += "<strike>￦" + numberWithCommas(data.productNormalityPrice)+"</strike><span class=\"sale\">"+getDecimalToString(productSalePerCent*100,1,1)+"%</span>";
                    }
                    priceHtml += "</span>";
                    
                }else {
                    priceHtml += "<span id=\"price_"+colorCode+"\">";
                    priceHtml += "<span>"+ simbol + numberWithCommas(exchangeRatePrice(data.productPrice))+"</span>";
                    if(data.productNormalityPrice != undefined && data.productNormalityPrice != ""){
                        var productSalePerCent = (data.productNormalityPrice*1 - data.productPrice*1) / (data.productNormalityPrice*1);
                        priceHtml += "<strike>"+ simbol + numberWithCommas(exchangeRatePrice(data.productNormalityPrice))+"</strike><span class=\"sale\">"+getDecimalToString(productSalePerCent*100,1,1)+"%</span>";
                    }
                    priceHtml += "</span>";
                }

                $("#searchProductlistBody li").eq(getIndex).find(".info_cont .price [id^=price_]").css("display","none");
                $("#searchProductlistBody li ").eq(getIndex).find(".info_cont .price [id^=price_]").last().after(priceHtml);
                
                if($("#searchProductlistBody li").length == 0 && $("#search_topSeller li").length > 0) {  //검색결과 없을때
                    priceHtml = "";
                    priceHtml += "<span id=\"price_"+colorCode+"\">";
                    priceHtml += "<span>"+ simbol + numberWithCommas(exchangeRatePrice(data.productPrice))+"</span>";
                    priceHtml += "</span>";
                    
                    $("#search_topSeller li").eq(getIndex).find(".info_cont .price [id^=price_]").css("display","none");
                    $("#search_topSeller li ").eq(getIndex).find(".info_cont .price [id^=price_]").last().after(priceHtml);
                }
                
            },
            error: function(xhr, Status, error) {}
       });
    }else{
         $("#searchProductlistBody li").eq(getIndex).find(".info_cont .price [id^=price_]").css("display","none");
         $("#searchProductlistBody li").eq(getIndex).find(".info_cont .price").find("#price_"+colorCode).css("display", "inline-block");
         
         if($("#searchProductlistBody li").length == 0 && $("#search_topSeller li").length > 0) { //검색결과 없을때
             $("#search_topSeller li").eq(getIndex).find(".info_cont .price [id^=price_]").css("display","none");
             $("#search_topSeller li").eq(getIndex).find(".info_cont .price").find("#price_"+colorCode).css("display", "inline-block");
         }
         
//         $("#price_"+colorCode).css("display", "inline-block");
    }

}

//컬러칩 변경
$(document).on("click",".chip",function(){
	$(this).parent().find('button').removeClass('on');
	$(this).addClass('on');
});

//스타일 서치 파라미터 수집
$(document).on("click",".keyword_link > span ",function(){  
    var paramStr = String($(this).text());
    var trimStr = paramStr.trim();
    doDynamicSearch(trimStr);
});

//연관 검색어 밑 스타일 서치 검색 기능
$(document).on("click","#search_style_menu > li > a", function() {
    var paramStr = $(this).text();
    doDynamicSearchStyle(paramStr);
});

//그룹별 초기화 (모바일 미사용)
function groupReset(param){
    
    switch (param) {
        
        // 브랜드 초기화
        case '01' : paramBrand ="";
                    count_brand = 0;
                    sb_brand= new StringBuilder();
                    $('input:checkbox[name="brand_ck"]').prop("checked",false);
                    $('.selectedSearch > span').filter(".reset01").parent().detach();                   
        break;
          
        // 가격 초기화
        case '02' : paramPrice = "";
                    count_price = 0;
                    sb_price= new StringBuilder();
                    $('input:checkbox[name="price_ck"]').prop("checked",false);
                    $('.selectedSearch > span').filter(".reset02").parent().detach();   
        break;
          
        // 색상 초기화
        case '03' : paramColor ="";
                    $('.selectedSearch > span').filter(".reset03").parent().detach();   
        break;
          
        // 사이즈 초기화
        case '04' : paramSize ="";
                    $('input:checkbox[name="size_ck"]').prop("checked",false);
                    $('.selectedSearch > span').filter(".reset04").parent().detach();   
        break;
        
        // 혼용율 초기화 
        case '05' : paramMixed ="";
                    count_mixed = 0;
                    sb_mixed= new StringBuilder();
                    $('input:checkbox[name="mixed_ck"]').prop("checked",false);
                    $('.selectedSearch > span').filter(".reset05").parent().detach();   
        break;
          
    }

    doAsyncSearch();    
}

// 뒤로 가기
$(".btn").filter(".back").click(function(){
    history.go("-1");       
});

//선택한 조건 : 동적으로 태그 추가된 경우 해당 요소를 선택하기 위함
$(document).on("click",".selectedSearch > a",function(){  
    
    // 1) .selectedSearch에서 선택된 span 요소의 text를 가져옴
    var selectedStr = $(this).siblings().text();

    // [브랜드] 2) brand_ck checkbox의 배열요소 value값 추출
    $('input:checkbox[name="brand_ck"]').each(function(i,v){
        
        // 3) price_ck 요소를 for문 돌려서 selectedStr 값이 같은걸 추출
        if(selectedStr == v.value){         
            if($("input:checkbox[name='brand_ck'][value='"+v.value+"']").is(":checked") == true){
                
                // 4) checkbox를 해제
                $("input:checkbox[name='brand_ck'][value='"+v.value+"']").prop("checked",false);
                
                // 5) 전역변수의 paramPrice의 값도 clear
                count_brand--;
                sb_brand.Replace(","+$(this).val(),"");
                sb_brand.Replace($(this).val()+",", "");
                sb_brand.Replace($(this).val(), "");
                paramBrand = sb_brand.ToString();               
            }                   
        }
    });

    // [가격] 2) price_ck checkbox의 배열요소 value값 추출
    $('input:checkbox[name="price_ck"]').each(function(i,v){
        
        // 3) price_ck 요소를 for문 돌려서 selectedStr 값이 같은걸 추출
        var paramStr = "";
        
        if(selectedStr =="10만원 이하"){
            paramStr = "A";         
        } else if(selectedStr =="10만원~30만원"){
            paramStr = "B";         
        } else if(selectedStr =="30만원~50만원"){
            paramStr = "C";         
        } else if(selectedStr =="50만원~100만원"){
            paramStr = "D";         
        } else if(selectedStr =="100만원 이상"){
            paramStr = "E";         
        } 
        
        if(paramStr == v.value){    

            if($("input:checkbox[name='price_ck'][value='"+paramStr+"']").is(":checked") == true){
                
                // 4) checkbox를 해제
                $("input:checkbox[name='price_ck'][value='"+paramStr+"']").prop("checked",false);
                
                // 5) 전역변수의 paramPrice의 값도 clear
                count_price--;
                sb_price.Replace(","+paramStr,"");
                sb_price.Replace(paramStr+",", "");
                sb_price.Replace(paramStr, "");
                paramPrice = sb_price.ToString();
            }                   
        }
    });
    
    // [사이즈] 2) size_ck checkbox의 배열요소 value값 추출
    $('input:checkbox[name="size_ck"]').each(function(i,v){
        // 3) price_ck 요소를 for문 돌려서 selectedStr 값이 같은걸 추출
        if(selectedStr == v.value){         
            if($("input:checkbox[name='size_ck'][value='"+v.value+"']").is(":checked") == true){
                
                // 4) checkbox를 해제
                $("input:checkbox[name='size_ck'][value='"+v.value+"']").prop("checked",false);
                
                // 5) 전역변수의 paramMixed의 값도 clear
                count_size--;
                sb_size.Replace(","+$(this).val(),"");
                sb_size.Replace($(this).val()+",", "");
                sb_size.Replace($(this).val(), "");
                paramMixed = sb_size.ToString();                
            }                   
        }
    });
    
    // [혼용율] 2) mixed_ck checkbox의 배열요소 value값 추출
    $('input:checkbox[name="mixed_ck"]').each(function(i,v){
        // 3) price_ck 요소를 for문 돌려서 selectedStr 값이 같은걸 추출
        if(selectedStr == v.value){         
            if($("input:checkbox[name='mixed_ck'][value='"+v.value+"']").is(":checked") == true){
                
                // 4) checkbox를 해제
                $("input:checkbox[name='mixed_ck'][value='"+v.value+"']").prop("checked",false);
                
                // 5) 전역변수의 paramMixed의 값도 clear
                count_mixed--;
                sb_mixed.Replace(","+$(this).val(),"");
                sb_mixed.Replace($(this).val()+",", "");
                sb_mixed.Replace($(this).val(), "");
                paramMixed = sb_mixed.ToString();               
            }                   
        }
    });

    // 전체, 카테고리
    if(selectedStr == paramCate){
        paramCate = "";
    }
    
    // 색상
    if(selectedStr == paramColor){
        paramColor = "";
    }
    
    $(this).parent().detach();

});

//전체 초기화
function allReset(){
    
    paramCate = ""; // 카테고리
    paramBrand =""; // 브랜드
    paramPrice = ""; // 가격
    paramColor =""; // 색상
    paramSize =""; // 사이즈
    paramMixed =""; // 혼용률
    paramLang =""; // 언어선택
    paramSort =""; // 정렬
    paramReQuery ="" // 재정렬
//    param1Depth = ""; // 1depth 텍스트
        
        
    //브랜드 체크박스
    sb_brand = new StringBuilder();
    count_brand = 0;

    // 가격 체크박스
    sb_price= new StringBuilder();
    count_price = 0;

    //사이즈 체크박스
    sb_size = new StringBuilder();
    count_size = 0;

    // 혼용률 체크박스
    sb_mixed = new StringBuilder();
    count_mixed = 0;
        
    
    // [브랜드] brand_ck checkbox 전체 해제
    $('input:checkbox[name="brand_ck"]').prop("checked",false);
    
    // [사이즈] price_ck checkbox 전체 해제
    $('input:checkbox[name="price_ck"]').prop("checked",false);
    
    // [사이즈] size_ck checkbox 전체 해제
    $('input:checkbox[name="size_ck"]').prop("checked",false);
    
    // [혼용율] mixed_ck checkbox 전체 해제
    $('input:checkbox[name="mixed_ck"]').prop("checked",false);
    
    // 선택한 조건 전체 해제
    $('.selectedSearch').detach();  
    
    doAsyncSearch();
    
    goFirstCondition();
}

function goFirstCondition(){
    //전체 초기화 후 조건 초기 상태로 복귀
    $(".sr_category_menu_dep1").animate({"left":0},"fast").clearQueue();
    $(".sr_category_menu_dep1 h3").removeClass("on");
    $(this).parent(".dropdown_menu_wrap").hide();
}


/***************************************************************************
 * Section 4: 검색 처리 기능 관련 함수 모음
 ***************************************************************************/
// 검색
function doSearch() {
    
    var searchForm = document.search; 
    var searchwords = searchForm.query.value.replace(/(^\s*)|(\s*$)/g,"");
    
    if (searchwords == "") {
        alert("검색어를 입력하세요.");
        searchForm.query.focus();
        return;
    }

    // 로그인 상태 플래그
//    if($("#loginState").val() == "loginOn"){
//        // 내가 찾은 검색어(로그인 상태) : set, get in cookie
//        getLoginMyKeyWord($("#query").val());
//    // 비로그인 상태 플래그
//    } else {
//        // 내가 찾은 검색어(비로그인 상태) set, get in DB
//        getNotLoginMyKeyWord($("#query").val(), 10);            
//    }
    
    if(searchForm.sort.value != "RANK") {
      getNotLoginMyKeyWord($("#query").val(), 10);    
    }
    
    searchForm.collection.value = searchForm.selectedLang.value;
    searchForm.identity.value = "united";
    searchForm.startDate.value = "";
    searchForm.endDate.value = "";
    searchForm.range.value = "A";
    searchForm.startCount.value = 0;
    searchForm.searchField.value = "ALL";
    searchForm.sort.value = "DATE/DESC";
    searchForm.submit();    
}


//결과 내 재검색
function doSearchRe() {
 
 var searchForm = document.searchRe; 

 if (searchForm.reQuery.value == "") {
     //alert(typingWord);
     searchForm.reQuery.focus();
     return false;
 }
 
 // 구분탭이 '결과내 재검색'인 경우
 if(paramReSearch == "0"){
     searchForm.query.value = searchForm.prefixQuery.value + " ("+ searchForm.reQuery.value +")";
     
 // 구분탭이 '검색어 제외'인 경우
 } else if(paramReSearch == "1"){
     searchForm.query.value = searchForm.prefixQuery.value +"!"+ searchForm.reQuery.value;
 } else {
     searchForm.query.value = searchForm.prefixQuery.value + " ("+ searchForm.reQuery.value +")";
 }
 
 //searchForm.query.value = searchForm.reQuery.value;
 searchForm.identity.value = "each";
 searchForm.collection.value = searchForm.selectedLang.value;
 searchForm.startDate.value = "";
 searchForm.endDate.value = "";
 searchForm.range.value = "A";
 searchForm.startCount.value = 0;
 searchForm.searchField.value = "ALL"; 
 searchForm.sort.value = "DATE/DESC";
 searchForm.submit();
}


//동적 검색
function doDynamicSearch(str){   

    var $form = $("<form></form>");
    
    $form.attr("action", "searchCount");
    $form.attr("method", "post");
    $form.appendTo("body");    
    
    var query = $("<input type=\"hidden\" name=\"query\" value=\""+str+"\" />");
    var collection = $("<input type=\"hidden\" name=\"collection\" value=\""+$("#selectedLang").val()+"\" />");
    var lang = $("<input type=\"hidden\" name=\"lang\" value=\""+$("#lang").val()+"\" />");
    var token = $("<input type=\"hidden\" name=\"CSRFToken\" value=\""+$("#CSRFForm [name='CSRFToken']").first().val()+"\" />");
    
    $form.append(query).append(collection).append(lang).append(token);
    $form.submit();
}

//메뉴 비동기 통신시 새롭게 그리기 (1depth 클릭시)
function doMenuGroupDraw(){
    
    /*console.log("==================doMenuGroupDraw================");
    console.log("sort===="+paramSort);
    console.log("collection===="+paramLang);
    console.log("query===="+$("#prefixQuery").val());
    console.log("reQuery===="+paramReQuery);
    console.log("realQuery===="+ $("#realQuery").val());
    console.log("catequery_cate_1st===="+param1Depth);
    console.log("catequery_cate===="+paramCate);
    
    console.log("==================doMenuGroupDraw================");*/
    
    $.ajax({
        type : "get",
        url : "/"+targetLang+"/hssearch/asyncSearch",
        data : {
             sort : paramSort
            ,collection : paramLang
            ,query : $("#prefixQuery").val()
            ,reQuery : paramReQuery
            ,realQuery : $("#realQuery").val()
            ,catequery_cate_1st : param1Depth
            ,catequery_cate : paramCate
        },
        dataType : "json",
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        success : function(data) {  

            if(data.totalCount == 0 || data.totalCount < 1){
                return false;
            }
            
            $(".sr_category_menu_dep2 .filter_cate_2depth_upd").detach();
            $("#filter_brand_search").empty();
            $("#filter_color_search").empty();
            $("#filter_size_search").empty();
            $("#filter_mixed_search").empty();
            
            var sb = new StringBuilder();
            var sb_brand = new StringBuilder();
            var sb_color = new StringBuilder();
            var sb_size = new StringBuilder();
            var sb_mixed = new StringBuilder();

            $.each(data.category2, function(key5, value5){
                sb.Append("<li class=\"filter_cate_2depth_upd\">");
                sb.Append("<a href=\"#;\">"+value5.CATEGORY+"<span>("+value5.CNT+")</span></a><a href=\"#;\" class=\"btn_depth3\">arrow</a>");
                
                var s_menuDepth2 = value5.CATEGORY;
                var s_menuDepth2Length = s_menuDepth2.length;
                var s_menuDepth2Index = s_menuDepth2.indexOf('>');
                 
                sb.Append("<ul class=\"sr_category_menu_dep3\">");
                
                $.each(data.category3, function(key6, value6){
                    
                    var s_menuDepth3 = value6.BRANDNAME;
                    var s_menuDepth3Length = s_menuDepth3.length;

                    if(s_menuDepth3.search(s_menuDepth2) > -1){

                        sb.Append("<li class=\"filter_cate_3depth_upd\">");
                        sb.Append("<a href=\"#;\">"+s_menuDepth3.substring(s_menuDepth3.substring(0, s_menuDepth3.lastIndexOf(">"))));
                        sb.Append("<span style=\"display:none;\">"+value6.BRANDNAME+"</span>");
                        sb.Append("<span> ("+value6.CNT+")</span>");
                        sb.Append("</a>");
                        sb.Append("</li>");
                    }
                });
                
                sb.Append("</ul>");
                sb.Append("</li>");
            });
            
            // check
            $(".filter_cate_2depth_upd_inject_point").after(sb.ToString());

            // 브랜드
            if(data.totalCount > 0){
                $.each(data.cateBrand, function(key, value){
                    sb_brand.Append("<li><input type=\"checkbox\" id=\"brand_ck"+(key+1)+"\" name=\"brand_ck\" value=\""+value.BRANDNAME+"\">");
                    sb_brand.Append("<label for=\"brand_ck"+(key+1)+"\">"+value.BRANDNAME+"<span>&nbsp;("+value.CNT+")</span></label></li>");
                });
            }
            
            // 색상       
            if(data.totalCount > 0){
                $.each(data.cateColor, function(key2, value2){
                    sb_color.Append("<li><a href=\"#;\" class=\"c_bg\" style=\"background:"+value2.COLOR+"\">"+value2.COLOR+"</a></li>");
                });
            }

            // 사이즈
            if(data.totalCount > 0){
                $.each(data.cateSize, function(key3, value3){
                    sb_size.Append("<li><input type=\"checkbox\" id=\"size_ck"+(key3+1)+"\" name=\"size_ck\" value=\""+value3.SIZE+"\" \>");
                    sb_size.Append("<label for=\"size_ck"+(key3+1)+"\">"+value3.SIZE+"</label></li>");
                });
            }
            
            //혼용율
            if(data.totalCount > 0){
                $.each(data.cateMatter, function(key4, value4){
                    sb_mixed.Append("<li><input type=\"checkbox\" id=\"mixed_ck"+(key4+1)+"\" name=\"mixed_ck\" value=\""+value4.MATTER+"\">");
                    sb_mixed.Append("<label for=\"mixed_ck"+(key4+1)+"\">"+value4.MATTER+"</label></li>");
                });
            }
            
            $("#filter_brand_search").html(sb_brand.ToString());
            $("#filter_color_search").html(sb_color.ToString());
            $("#filter_size_search").html(sb_size.ToString());
            $("#filter_mixed_search").html(sb_mixed.ToString());
            
            //sortby();
            toggleClassOn2();
            
        },
        error: function(request,status,error){      
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

//메뉴 비동기 통신시 새롭게 그리기(2,3depth 클릭시만)
function doMenuGroupDrawSub(){
    
    /*console.log("==================doMenuGroupDraw3Depth================");
    console.log("sort===="+paramSort);
    console.log("collection===="+paramLang);
    console.log("query===="+$("#prefixQuery").val());
    console.log("reQuery===="+paramReQuery);
    console.log("realQuery===="+ $("#realQuery").val());
    console.log("catequery_cate_1st===="+param1Depth);
    console.log("catequery_cate===="+paramCate);
    
    console.log("==================doMenuGroupDraw3Depth================");*/
    
    $.ajax({
        type : "get",
        url : "/"+targetLang+"/hssearch/asyncSearch",
        data : {
             sort : paramSort
            ,collection : paramLang
            ,query : $("#prefixQuery").val()
            ,reQuery : paramReQuery
            ,realQuery : $("#realQuery").val()
            ,catequery_cate_1st : param1Depth
            ,catequery_cate : paramCate
        },
        dataType : "json",
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        success : function(data) {  
            
            if(data.totalCount == 0 || data.totalCount < 1){
                return false;
            }
            
            $("#filter_brand_search").empty();
            $("#filter_color_search").empty();
            $("#filter_size_search").empty();
            $("#filter_mixed_search").empty();
            
            var sb_brand = new StringBuilder();
            var sb_color = new StringBuilder();
            var sb_size = new StringBuilder();
            var sb_mixed = new StringBuilder();

            // 브랜드
            if(data.totalCount > 0){
                $.each(data.cateBrand, function(key, value){
                    sb_brand.Append("<li><input type=\"checkbox\" id=\"brand_ck"+(key+1)+"\" name=\"brand_ck\" value=\""+value.BRANDNAME+"\">");
                    sb_brand.Append("<label for=\"brand_ck"+(key+1)+"\">"+value.BRANDNAME+"<span>&nbsp;("+value.CNT+")</span></label></li>");
                });
            }
            
            // 색상       
            if(data.totalCount > 0){
                $.each(data.cateColor, function(key2, value2){
                    sb_color.Append("<li><a href=\"#;\" class=\"c_bg\" style=\"background:"+value2.COLOR+"\">"+value2.COLOR+"</a></li>");
                });
            }

            // 사이즈
            if(data.totalCount > 0){
                $.each(data.cateSize, function(key3, value3){
                    sb_size.Append("<li><input type=\"checkbox\" id=\"size_ck"+(key3+1)+"\" name=\"size_ck\" value=\""+value3.SIZE+"\" \><label for=\"size_ck"+(key3+1)+"\">"+value3.SIZE+"</label></li>");
                });
            }
            
            //혼용율
            if(data.totalCount > 0){
                $.each(data.cateMatter, function(key4, value4){
                    sb_mixed.Append("<li><input type=\"checkbox\" id=\"mixed_ck"+(key4+1)+"\" name=\"mixed_ck\" value=\""+value4.MATTER+"\">");
                    sb_mixed.Append("<label for=\"mixed_ck"+(key4+1)+"\">"+value4.MATTER+"</label></li>");
                });
            }
            
            $("#filter_brand_search").html(sb_brand.ToString());
            $("#filter_color_search").html(sb_color.ToString());
            $("#filter_size_search").html(sb_size.ToString());
            $("#filter_mixed_search").html(sb_mixed.ToString());
            //sortby();
            toggleClassOn2();
        },
        error: function(request,status,error){      
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

//비동기 검색어 서치 서비스
function doAsyncSearch(){
    
    /*console.log("==================doAsyncSearch================");
    console.log("sort===="+paramSort);
    console.log("collection===="+paramLang);
    console.log("query===="+$("#prefixQuery").val());   
    console.log("reQuery===="+paramReQuery);
    console.log("realQuery===="+$("#realQuery").val());
    console.log("catequery_cate_1st===="+param1Depth);
    console.log("catequery_cate===="+paramCate);
    console.log("catequery_brand===="+paramBrand);
    console.log("catequery_saleprice_grp===="+paramPrice);
    console.log("catequery_color===="+paramColor);
    console.log("catequery_size===="+paramSize);
    console.log("catequery_matter===="+paramMixed);
    console.log("==================doAsyncSearch================");*/

    //,benfit : $("#shippingSale").val()
    //,fourpm_category_yn : $("#shipping4pm").val()
    //,at_home_category_yn : $("#shippingAthome").val()
	
    $.ajax({
        type : "get",
        url : "/"+targetLang+"/hssearch/asyncSearch",
        data : {
             sort : $("#sortSearch").val()
            ,collection : paramLang
            ,query : $("#prefixQuery").val()
            ,reQuery : paramReQuery
            ,realQuery : $("#realQuery").val()
            ,catequery_cate_1st : $("#searchCategoryUpName").val()
            ,catequery_cate : $("#searchCategoryName").val()
            ,catequery_brand : $("#searchBrandName").val()
            ,catequery_color : $("#searchColorChip").val()
            ,catequery_size  : $("#searchSize").val()
            ,catequery_saleprice_grp :$("#searchPrice").val()
            ,catequery_matter : $("#searchMatter").val()
            ,smartFilterYn : $("#smartFilterYn").val()
        },
        dataType : "json",
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        success : function(data) {
            //검색결과 건수 업데이트
            $(".totalcount").text(data.totalCount);
            
            //선택된 조건 개수 표시
            var ftCnt = $("#filterwordSlider ul li").size()-1;
            if(ftCnt > 0) { 
                $("#m_filter_count").text(ftCnt).show();
            } else {
                $("#m_filter_count").hide();
            }
            
    
            $(".m_filter_wrap").animate({right:'-100%',opacity:0}, 'fast');
            $('.wrap').css({'position':'static','overflow':'visible'});
            $(".wrap").height();
            $(".m_filter_wrap").hide();
            
            if((data.totalCount == 0) || (data.totalCount < 0)){
                $("#searchProductlistBody").empty();
                $("#paging").empty();
                $("#nkeyword").show();
                var searchTotalCountHtml = $("#prefixQuery").val() + "(0)";
                $("#searchTotalCount").html(searchTotalCountHtml);
                return false;
            }
            
            if(data.totalCount > 0){
                
                var sb = new StringBuilder();
            
                $.each(data.product, function(key, value){
                    
                    $("#searchProductlistBody").empty();
                    $("#paging").empty();
                    
                    if (key == 0) {         
                        return true;
                    }
                    
                    sb.Append("<li class=\"float active\">");

                    // 인.허가 여부 데이터
                    var appvObj = value.APPROVAL_STATUS;
                    var appvSp =  appvObj.split(",");                   
                    
                    // 이미지 데이터
                    var imgObj = value.IMG;
                    var imgSp = imgObj.split(",");
                    var cnt = 0;

                    // 컬러칩 데이터
                    var colorObj = value.REP_COLOR;
                    var colorSp = colorObj.split(",");
                    
                    // #1114 - beshow 태깅 추가
                    var beshowImgUrl = "";
                    
                    // GA_Event 스마트필터 추가
                    var gaProductFunction  = "";
                    
                    var cnt2 = 0;
                    $.each(appvSp, function(key2, value2){

                        if(appvSp[key2].indexOf("unapproved") == -1 && appvSp[key2].indexOf("approved") > -1 ){
                            if(cnt2 == 0){
                                beshowImgUrl = imgSp[key2];
                                cnt2++;
                            }
                        }                        
                    });
                    
                    window.sessionStorage.setItem('smart_more_ecommerceDataList', JSON.stringify(data.product));
                    // GA_Event 스마트필터 추가
                    if($("#smartFilterYn").val()=='Y'){
                        gaProductFunction = "GA_Event('스마트_필터','나의스마트필터링','"+escape(value.BRANDNAME)+"_"+ escape(value.NAME.replace("<!HS>","").replace("<!HE>","")) +"');setEcommerceData('"+key+"', 'SMART');";
                    }

                    sb.Append("<a href=\""+value.PRODUCTDETAILURL+"?uiel=Mobile\" class=\"img_slide_contain\"");
                    sb.Append(" onclick=\""+gaProductFunction+ "beshow_tagging(this);\" link=\""+ value.PRODUCTDETAILURL+"\" price=\""+ numberWithCommas(value.SALEPRICE) +"\" image=\""+ beshowImgUrl +"\" prdname=\""+ replaceAll(replaceAll(value.NAME, '<!HS>',''),'<!HE>','')+ "\" code=\""+ value.DOCID +"\">");
                    
                    // #1114 - beshow 태깅 추가
                    sb.Append("<div class=\"img_slide\">");
                    sb.Append("<div class=\"img\">");
                    // 이미지 셋팅
                    $.each(appvSp, function(key2, value2){
                        
                        if(appvSp[key2].indexOf("unapproved") == -1 && appvSp[key2].indexOf("approved") > -1){
                            
                            if(cnt == 0){
                                sb.Append("<img src=\""+imgSp[key2]+"\" alt=\""+imgSp[key2]+"\" id=\"T01_IMG_"+key+"\"  class=\"respon_image\"/>");
                                cnt++;
                                //beshowImgUrl += "img:"+ imgSp[key2];
                            } else {
                                sb.Append("<img src=\""+imgSp[key2]+"\" alt=\""+imgSp[key2]+"\" class=\"respon_image\" style=\"display:none\"/>");
                            }
                        }
                    });
                    sb.Append("</div>");
                    //console.log("beshowImgUrl:"+ beshowImgUrl);
                    sb.Append("</div>");
                    
                    // 핏가이드 아이콘 추가 20220215
                    var isKOSite  = document.location.href;
                    if(isKOSite.indexOf("/ko") > -1){
                        if(value.fitGuideDisplayYn == "true"){
                            sb.Append("<span class='ico-fitguide'>핏가이드</span>");
                        }
                    }
                    
                    sb.Append("</a>");
                    
                    sb.Append("<div class=\"info_cont\">");
                    
                    sb.Append("<div class=\"color_chip\">");
                    var imgColorChipWhite = "";
                    var colorChipImage = "";
                    var colorChipOn = "on";
                    var colorCnt = 0;
                    $.each(appvSp, function(key5, value5){
                        if(appvSp[key5].indexOf("unapproved") == -1 && appvSp[key5].indexOf("approved") > -1){
                        	if (colorSp[key5] == "#ffffff") {
                        		imgColorChipWhite = "white";
                        	}
                        	
                        	if(colorCnt != 0){
                        		colorChipOn = "";
                        	}
                        	
                        	var colorChipArr = colorSp[key5].split(";");
                        	if(typeof colorChipArr[1] !== "undefined" && colorChipArr[1] != "ZZZZ" && colorChipArr[1].indexOf('C01') > -1) {
                        		colorChipImage = "background:"+colorChipArr[0]+" url('"+colorChipArr[1]+"/dims/resize/40x40');";
                        	} else {
                        		colorChipImage = "background:"+colorChipArr[0]+";";
                        	}
                        	sb.Append("<button class=\"chip "+imgColorChipWhite +" "+colorChipOn+"\" id=\"slide0201\" onclick=\"chgColorChip(\'"+key+"\', \'"+imgSp[key5]+"\');\" style=\""+colorChipImage+"\"></button>");
                        	sb.Append("<a href=\"javascript:noLink();\" class=\"cl wt\"></a> \n");
                        	
                        	colorCnt++;
                        }
                    });
                    sb.Append("</div>");
                    
                    
                    
                    sb.Append("<a href=\""+value.PRODUCTDETAILURL+"\">");
                    sb.Append("<p class=\"brand\">"+value.BRANDNAME+"</p>");
                    sb.Append("<p class=\"name\">"+value.NAME+"</p>");
                    
                    // BENFIT 데이터
                    var benfitObj = value.BENFIT;
                    var benfitSp = benfitObj.split(",");
                    var saleYn = false;
                    
                    if(benfitObj.indexOf("SALE") > -1 && value.ISOUTLET == 'false') {
                        saleYn = true;
                    }

                    var checkNewBrand = true;
                    if(value.DOCID.indexOf('5W') == 0 || value.DOCID.indexOf('MF') == 0 || value.DOCID.indexOf('MM') == 0) {
                        if(value.DOCID.indexOf('0') == 2 || value.DOCID.indexOf('1') == 2 || value.DOCID.indexOf('2') == 2
                        || value.DOCID.indexOf('3') == 2 || value.DOCID.indexOf('4') == 2 || value.DOCID.indexOf('5') == 2
                        || value.DOCID.indexOf('6') == 2 || value.DOCID.indexOf('7') == 2 || value.DOCID.indexOf('8') == 2
                        || value.DOCID.indexOf('9') == 2) {
                            checkNewBrand = true;
                        }else {
                            checkNewBrand = false;
                        }
                    }else {
                        checkNewBrand = true;
                    }
                    
                    var docId = value.DOCID.toLowerCase()+"_";
                    
                    if(checkNewBrand == true && docId.indexOf('a_') == -1 
                    && docId.indexOf('a0_') == -1 
                    && docId.indexOf('a1_') == -1 
                    && docId.indexOf('a2_') == -1 
                    && docId.indexOf('a3_') == -1 
                    && docId.indexOf('a4_') == -1 
                    && docId.indexOf('a5_') == -1 
                    && docId.indexOf('a6_') == -1 
                    && docId.indexOf('a7_') == -1 
                    && docId.indexOf('a8_') == -1 
                    && docId.indexOf('a9_') == -1 
                    && docId.indexOf('b_')  == -1 
                    && docId.indexOf('b0_') == -1 
                    && docId.indexOf('b1_') == -1 
                    && docId.indexOf('b2_') == -1 
                    && docId.indexOf('b3_') == -1 
                    && docId.indexOf('b4_') == -1 
                    && docId.indexOf('b5_') == -1 
                    && docId.indexOf('b6_') == -1 
                    && docId.indexOf('b7_') == -1 
                    && docId.indexOf('b8_') == -1 
                    && docId.indexOf('a9_') == -1 
                    && docId.indexOf('c_')  == -1 
                    && docId.indexOf('c0_') == -1 
                    && docId.indexOf('c1_') == -1 
                    && docId.indexOf('c2_') == -1 
                    && docId.indexOf('c3_') == -1 
                    && docId.indexOf('c4_') == -1 
                    && docId.indexOf('c5_') == -1 
                    && docId.indexOf('c6_') == -1 
                    && docId.indexOf('c7_') == -1 
                    && docId.indexOf('c8_') == -1 
                    && docId.indexOf('c9_') == -1 
                    && docId.indexOf('d_')  == -1 
                    && docId.indexOf('d0_') == -1 
                    && docId.indexOf('d1_') == -1 
                    && docId.indexOf('d2_') == -1 
                    && docId.indexOf('d3_') == -1 
                    && docId.indexOf('d4_') == -1 
                    && docId.indexOf('d5_') == -1 
                    && docId.indexOf('d6_') == -1 
                    && docId.indexOf('d7_') == -1 
                    && docId.indexOf('d8_') == -1 
                    && docId.indexOf('d9_') == -1 && value.ISOUTLET == 'true') {
                        if(value.PRICE != null && parseInt(value.PRICE) >= parseInt(value.SALEPRICE)) {
                            saleYn = true;
                        }
                        
                    }
                    
                    if(checkNewBrand == false &&  value.DOCID.indexOf('5WM') == 0 && value.ISOUTLET == 'true'){
                      if(value.PRICE != null && parseInt(value.PRICE) >= parseInt(value.SALEPRICE)) {
                          saleYn = true;    
                      }
                    }
                    
                    if(docId.indexOf('cm') == 0 && docId.indexOf('c_') > 0 && value.ISOUTLET == 'true'){
                        if(value.PRICE != null && parseInt(value.PRICE) > parseInt(value.SALEPRICE)) {
                            saleYn = true;    
                        }
                    }
                    
                    if(value.BRANDCODE == 'BR15' || value.BRANDCODE == 'BR16' || value.BRANDCODE == 'BR30' 
                    || value.BRANDCODE == 'BR32' || value.BRANDCODE == 'BR35' || value.BRANDCODE == 'BR44' 
                    || value.DOCID.indexOf('FL') == 0) {
                        if(value.ISOUTLET == 'true') {
                            saleYn = true;
                        }
                    }
                    
                    simbol = $("#simbol").val();
                    var productCodeTemp = "";
                    var idCnt = 0;
                    $.each(appvSp, function(key6, value6){
                        if(appvSp[key6].indexOf("unapproved") == -1 && appvSp[key6].indexOf("approved") > -1){
                            if(idCnt == 0){
                                productCodeTemp = value.DOCID + "_" + appvSp[key6].split(":")[0];
                                idCnt++;
                            }    
                        }
                    });
                    
                    if(saleYn == true) {
                    	var productSalePerCent = (value.PRICE*1 - value.SALEPRICE*1) / (value.PRICE*1);
                        sb.Append("<p class=\"price\"> <span id=\"price_"+productCodeTemp+"\">");
                        sb.Append(simbol +numberWithCommas(exchangeRatePrice(value.SALEPRICE)));
                        if(value.PRICE != null && parseInt(value.PRICE) > parseInt(value.SALEPRICE)){
                            sb.Append("<strike>"+simbol +numberWithCommas(exchangeRatePrice(value.PRICE))+"</strike>");
                            sb.Append("<span class=\"sale\">"+getDecimalToString(productSalePerCent*100,1,1)+"%</span>");    
                        }
                        sb.Append("</span></p>");
                    }else {
                        sb.Append("<p class=\"price\"> <span id=\"price_"+productCodeTemp+"\">"+simbol +numberWithCommas(exchangeRatePrice(value.SALEPRICE))+"</span></p>");
                    }
                    
                    sb.Append("<div class=\"etc\">");          
                    sb.Append("<input type=\"hidden\" id=\"productCd"+[key]+"\" name=\"productCd\" value=\""+value.DOCID+"\"/>");

                    var productflag = "EXCLUSIVE,GIFT,RE_ORDER,NEW,BEST";
                    var tempProductFlag = "";
                    var tempPriceFlag = "";
                    
                    
                    $.each(benfitSp, function(key4, value4){
                        
                        if(benfitSp[key4] == 'SALE') {
                            tempPriceFlag = 'SALE';
                        }
                        
                        if(tempProductFlag == "" && benfitSp[key4] != 'SALE' && benfitSp[key4] != 'COUPON') {
                            tempProductFlag = benfitSp[key4];
                        }
                        
                        if(tempProductFlag != "" && benfitSp[key4] != 'SALE' && productflag.indexOf(benfitSp[key4]) < productflag.indexOf(tempProductFlag)) {
                            tempProductFlag = benfitSp[key4];
                        }
                    });
                    
                    sb.Append("<span class=\"\" id=\""+value.DOCID+"\"></span>");
                    if(tempProductFlag != "") {
                        
                        if ($("#lang").val() == "ko") {
                            if(value.stickerTextUseYn !== "true" || (value.stickerTextUseYn === "true" && $("#smartFilterYn").val()=='Y')){
                                sb.Append("<span class=\""+tempProductFlag+"\">");
                                sb.Append(tempProductFlag.replace('RE_ORDER','재입고'));
                                sb.Append("</span>");
                            }
                        } else {
                            sb.Append("<span class=\""+tempProductFlag+"\">");
                            sb.Append(tempProductFlag.replace('_','-'));
                            sb.Append("</span>");
                        }
                    }
                    
                    if ($("#lang").val() == "ko" && value.stickerTextUseYn === "true" && $("#smartFilterYn").val()!=='Y') {
                        sb.Append("<span class=\"STICKERTEXT\" style=\"background-color:#"+value.stickerColor+";color: white;margin: 0 2px 5px;font-weight: bold;white-space: nowrap;padding: 0 5px;\">");
                        sb.Append(value.stickerText);
                        sb.Append("</span>");
                    }
                    if(tempPriceFlag != "") {
                        sb.Append("<span class=\""+tempPriceFlag+"\" style=\"color:red;\">"+tempPriceFlag+"</span>");
                    }
                    
                    /*
                    $.each(benfitSp, function(key4, value4){
                        
                        if(benfitSp[key4] != 'COUPON') {
                            if(benfitSp[key4] == 'SALE') {
                                sb.Append("<span class=\"new\" style=\"color:red;\">");
                            }else {
                                sb.Append("<span class=\"new\">");                                
                            }
                            sb.Append(benfitSp[key4]);
                            sb.Append("</span>");
                        }
                        
                    });*/

                    sb.Append("<span class=\"hsDelivery1902 shipping ico05\" id=\"hsDelivery"+[key]+"\" style=\"display:none;\">한섬딜리버리</span> ");
                    sb.Append("</div>");
                    sb.Append("</a>");

                    sb.Append("</div>");
                    
                    
                    var gaLikeFunction  = "";
                    if($("#smartFilterYn").val()=='Y'){
                    	gaLikeFunction = "GA_Event('스마트_필터','나의스마트필터링_좋아요','"+escape(value.BRANDNAME)+"_"+ escape(value.NAME.replace("<!HS>","").replace("<!HE>","")) +"');";
                    }
                    
                    if(data.checkWishItem) {
                    	sb.Append("<button type=\"button\" class=\"like"+value.isWishItem+"\" id=\""+value.PRODUCTCODE.split(",")[0]+"Like\" onclick=\"addWishListClick('"+value.PRODUCTCODE.split(",")[0]+"');"+gaLikeFunction+"\" data-value=\""+value.PRODUCTCODE.split(",")[0]+"\"> </button>");
                    } else {
                    	sb.Append("<button type=\"button\" class=\"like\" id=\""+value.PRODUCTCODE.split(",")[0]+"Like\" onclick=\"addWishListClick('"+value.PRODUCTCODE.split(",")[0]+"');"+gaLikeFunction+"\" data-value=\""+value.PRODUCTCODE.split(",")[0]+"\"> </button>");
                    }
                    sb.Append("</li>");
                });
               
                $("#searchProductlistBody").html(sb.ToString());
                var pagingDisplay = '';
                if(data.totalCount < 51) {
                	pagingDisplay = ' style="display:none;"';
                }
                var pageLinkHtml = data.pageLink
                						.replace('class="btn prev"','class="pre"'+pagingDisplay)
                						.replace('class="btn next"','class="nxt"'+pagingDisplay)
                						.replace('<span class="num">','').replace('</span>','')
                						.replace('class="pageBtn on"','class="cur"')
                						.split('#top').join('javascript:void(0);')
                						.split('href="#"').join('href="javascript:void(0);"');
                $("#paging").html(pageLinkHtml);
                
//                $(".m_filter_count").html("("+$(".selectedSearch").length+")");
                
                asyncCheckPro4pmInfo(data);
                
                //새로고침 대비 흔적남기기
//                document.location.hash ="#in";
                // 해시태그로 인해 paging이 영향을 받기 때문에 pushstate, replacestate로 url에 파라미터를 붙이고,
            	// 페이지 새로 진입 시 해당 파라미터가 있으면 sessionStorage 데이터 가져와 화면 재생성하도록 변경
                history.replaceState({searchCount: '0', keepState: true}, 'start 0', '?startCount=0&keepState=true&query=' + encodeURI($("#realQuery").val()));
                
                //sessionStorage 데이터 저장
                setSessionStorage();
                var searchTotalCountHtml = "";
                if("Y" == $("#smartFilterYn").val()) {
                	searchTotalCountHtml = numberWithCommas(data.totalCount) + " " + $("#smartQuantity").val();
                } else {
                	searchTotalCountHtml = $("#prefixQuery").val() + "("+numberWithCommas(data.totalCount)+")";
                }
                $("#searchTotalCount").html(searchTotalCountHtml);
            }                   
        },
        
        beforeSend:function(){
            $("#loadingBarDiv").css("display", "block");    
        },
        
        complete:function(){
            $("#loadingBarDiv").css("display", "none");
            //doMenuGroupDrawSub();
        },

        error: function(request,status,error){      
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

window.onpopstate = function(event) {
   //alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
    if (event.state) {
     	loadStateContent(event.state);
    }
    else {
    	getPageData('0');
    }
};

function loadStateContent(state) {
    if (Number.isInteger(parseInt(state.searchCount, 10))) {
       	$('.hsome_allContents_wrapper').addClass('op');
       	getPageData(state.searchCount);
 		setTimeout(function(){
			$('html, body').scrollTop(0);
			$('.hsome_allContents_wrapper').removeClass('op');
		}, 300);
    }
}

// 페이징
function doPaging(count){
	// MOBILE_RENEWAL 18.11.02 추가
	var param = '?startCount=' + count
		+ '&query=' + encodeURI($("#realQuery").val())
		+ '&keepState=true';
	
	history.pushState({searchCount: count, keepState: true}, 'start ' + count, param);
	
   	$('.hsome_allContents_wrapper').addClass('op');
   	getPageData(count);
	setTimeout(function(){
		$('html, body').scrollTop(0);
		$('.hsome_allContents_wrapper').removeClass('op');
	}, 300);
}

function getPageData(count){

    /*console.log("sort===="+paramSort);
    console.log("collection===="+paramLang);
    console.log("query===="+$("#prefixQuery").val());   
    console.log("reQuery===="+paramReQuery);
    console.log("realQuery===="+$("#realQuery").val());
    console.log("catequery_cate_1st===="+param1Depth);
    console.log("catequery_cate===="+paramCate);
    console.log("catequery_brand===="+paramBrand);
    console.log("catequery_saleprice_grp===="+paramPrice);
    console.log("catequery_color===="+paramColor);
    console.log("catequery_size===="+paramSize);
    console.log("catequery_matter===="+paramMixed);*/
    
    paramPage = count;
    
    //,benfit : $("#shippingSale").val()
    //,fourpm_category_yn : $("#shipping4pm").val()
    //,at_home_category_yn : $("#shippingAthome").val()
    $.ajax({
        type : "get",
        url : "/"+targetLang+"/hssearch/asyncSearch",
        data : {
             startCount : count
            ,sort : $("#sortSearch").val()           
            ,collection : paramLang
            ,query : $("#prefixQuery").val()
            ,reQuery : paramReQuery
            ,realQuery : $("#realQuery").val()
            ,catequery_cate_1st : $("#searchCategoryUpName").val()
            ,catequery_cate : $("#searchCategoryName").val()
            ,catequery_brand : $("#searchBrandName").val()
            ,catequery_color : $("#searchColorChip").val()
            ,catequery_size  : $("#searchSize").val()
            ,catequery_saleprice_grp :$("#searchPrice").val()
            ,catequery_matter : $("#searchMatter").val()
            ,smartFilterYn : $("#smartFilterYn").val()
        },
        dataType : "json",
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        success : function(data) {  

            if((data.totalCount == 0) || (data.totalCount < 0)){
                $("#searchProductlistBody").empty();
                $("#paging").empty();
                return false;
            }
            
            if(data.totalCount > 0){
                
                var sb = new StringBuilder();
            
                $.each(data.product, function(key, value){
                    
                    $("#searchProductlistBody").empty();
                    $("#paging").empty();
                    
                    if (key == 0) {         
                        return true;
                    }
                    
                    sb.Append("<li class=\"float active\">");

                    // 인.허가 여부 데이터
                    var appvObj = value.APPROVAL_STATUS;
                    var appvSp =  appvObj.split(",");                   
                    
                    // 이미지 데이터
                    var imgObj = value.IMG;
                    var imgSp = imgObj.split(",");
                    var cnt = 0;

                    // 컬러칩 데이터
                    var colorObj = value.REP_COLOR;
                    var colorSp = colorObj.split(",");
                    
                    // #1114 - beshow 태깅 추가
                    var beshowImgUrl = "";
                    var cnt2 = 0;
                    
                    // GA_Event 스마트필터 추가
                    var gaProductFunction  = "";
                    
                    $.each(appvSp, function(key2, value2){

                        if(appvSp[key2].indexOf("unapproved") == -1 && appvSp[key2].indexOf("approved") > -1){
                            if(cnt2 == 0){
                                beshowImgUrl = imgSp[key2];
                                cnt2++;
                            }
                        }                        
                    });
                    
                    window.sessionStorage.setItem('smart_more_ecommerceDataList', JSON.stringify(data.product));
                    // GA_Event 스마트필터 추가
                    if($("#smartFilterYn").val()=='Y'){
                    	gaProductFunction = "GA_Event('스마트_필터','나의스마트필터링','"+escape(value.BRANDNAME)+"_"+ escape(value.NAME.replace("<!HS>","").replace("<!HE>","")) +"');";
                    }

                    sb.Append("<a href=\""+value.PRODUCTDETAILURL+"?uiel=Mobile\" class=\"img_slide_contain\"");
                    sb.Append(" onclick=\""+gaProductFunction+ "beshow_tagging(this);\" link=\""+ value.PRODUCTDETAILURL+"\" price=\""+ numberWithCommas(value.SALEPRICE) +"\" image=\""+ beshowImgUrl +"\" prdname=\""+ replaceAll(replaceAll(value.NAME, '<!HS>',''),'<!HE>','')+ "\" code=\""+ value.DOCID +"\">");
                    
                    // #1114 - beshow 태깅 추가
                    sb.Append("<div class=\"img_slide\">");
                    sb.Append("<div class=\"img\">");
                    // 이미지 셋팅
                    $.each(appvSp, function(key2, value2){
                        
                        if(appvSp[key2].indexOf("unapproved") == -1 && appvSp[key2].indexOf("approved") > -1){
                            
                            if(cnt == 0){
                                sb.Append("<img src=\""+imgSp[key2]+"\" alt=\""+imgSp[key2]+"\" id=\"T01_IMG_"+key+"\"  class=\"respon_image\"/>");
                                cnt++;
                                //beshowImgUrl += "img:"+ imgSp[key2];
                            } else {
                                sb.Append("<img src=\""+imgSp[key2]+"\" alt=\""+imgSp[key2]+"\" class=\"respon_image\" style=\"display:none\"/>");
                            }
                        }
                    });

                    //console.log("beshowImgUrl:"+ beshowImgUrl);
                    sb.Append("</div>");
                    sb.Append("</div>");
                    
                    // 핏가이드 아이콘 추가 20220215
                    var isKOSite  = document.location.href;
                    if(isKOSite.indexOf("/ko") > -1){
                        if(value.fitGuideDisplayYn == "true"){
                            sb.Append("<span class='ico-fitguide'>핏가이드</span>");
                        }
                    }
                    
                    sb.Append("</a>");
                    
                    sb.Append("<div class=\"info_cont\">");
                    
                    sb.Append("<div class=\"color_chip\">");
                    var imgColorChipWhite = "";
                    var colorChipImage = "";
                    var colorChipOn = "on";
                    var colorCnt = 0;
                    $.each(appvSp, function(key5, value5){
                        if(appvSp[key5].indexOf("unapproved") == -1 && appvSp[key5].indexOf("approved") > -1){
                        	if (colorSp[key5] == "#ffffff") {
                        		imgColorChipWhite = "white";
                        	}
                        	if(colorCnt != 0){
                        		colorChipOn = "";
                        	}
                        	var colorChipArr = colorSp[key5].split(";");
                        	if(typeof colorChipArr[1] !== "undefined" && colorChipArr[1] != "ZZZZ" && colorChipArr[1].indexOf('C01') > -1) {
                        		colorChipImage = "background:"+colorChipArr[0]+" url('"+colorChipArr[1]+"/dims/resize/40x40');";
                        	} else {
                        		colorChipImage = "background:"+colorChipArr[0]+";";
                        	}
                        	sb.Append("<button class=\"chip "+imgColorChipWhite +" "  +colorChipOn+"\" id=\"slide"+value.PRODUCTCODE.split(',')[0]+appvSp[key5].split(':')[0]+"\" onclick=\"chgColorChip(\'"+key+"\', \'"+imgSp[key5]+"\');\" style=\""+colorChipImage+"\"></button>");
                        	sb.Append("<a href=\"javascript:noLink();\" class=\"cl wt\"></a> \n");
                        	
                        	colorCnt++;
                        }
                    });
                    sb.Append("</div>");
                    
                    
                    
                    sb.Append("<a href=\""+value.PRODUCTDETAILURL+"\">");
                    sb.Append("<p class=\"brand\">"+value.BRANDNAME+"</p>");
                    sb.Append("<p class=\"name\">"+value.NAME+"</p>");
                    
                    // BENFIT 데이터
                    var benfitObj = value.BENFIT;
                    var benfitSp = benfitObj.split(",");
                    var saleYn = false;
                    
                    if(benfitObj.indexOf("SALE") > -1 && value.ISOUTLET == 'false') {
                        saleYn = true;
                    }

                    var checkNewBrand = true;
                    if(value.DOCID.indexOf('5W') == 0 || value.DOCID.indexOf('MF') == 0 || value.DOCID.indexOf('MM') == 0) {
                        if(value.DOCID.indexOf('0') == 2 || value.DOCID.indexOf('1') == 2 || value.DOCID.indexOf('2') == 2
                        || value.DOCID.indexOf('3') == 2 || value.DOCID.indexOf('4') == 2 || value.DOCID.indexOf('5') == 2
                        || value.DOCID.indexOf('6') == 2 || value.DOCID.indexOf('7') == 2 || value.DOCID.indexOf('8') == 2
                        || value.DOCID.indexOf('9') == 2) {
                            checkNewBrand = true;
                        }else {
                            checkNewBrand = false;
                        }
                    } 
                    var docId = value.DOCID.toLowerCase()+"_";
                    
                    if(checkNewBrand == true && docId.indexOf('a_') == -1 
                    && docId.indexOf('a0_') == -1 
                    && docId.indexOf('a1_') == -1 
                    && docId.indexOf('a2_') == -1 
                    && docId.indexOf('a3_') == -1 
                    && docId.indexOf('a4_') == -1 
                    && docId.indexOf('a5_') == -1 
                    && docId.indexOf('a6_') == -1 
                    && docId.indexOf('a7_') == -1 
                    && docId.indexOf('a8_') == -1 
                    && docId.indexOf('a9_') == -1 
                    && docId.indexOf('b_')  == -1 
                    && docId.indexOf('b0_') == -1 
                    && docId.indexOf('b1_') == -1 
                    && docId.indexOf('b2_') == -1 
                    && docId.indexOf('b3_') == -1 
                    && docId.indexOf('b4_') == -1 
                    && docId.indexOf('b5_') == -1 
                    && docId.indexOf('b6_') == -1 
                    && docId.indexOf('b7_') == -1 
                    && docId.indexOf('b8_') == -1 
                    && docId.indexOf('a9_') == -1 
                    && docId.indexOf('c_')  == -1 
                    && docId.indexOf('c0_') == -1 
                    && docId.indexOf('c1_') == -1 
                    && docId.indexOf('c2_') == -1 
                    && docId.indexOf('c3_') == -1 
                    && docId.indexOf('c4_') == -1 
                    && docId.indexOf('c5_') == -1 
                    && docId.indexOf('c6_') == -1 
                    && docId.indexOf('c7_') == -1 
                    && docId.indexOf('c8_') == -1 
                    && docId.indexOf('c9_') == -1 
                    && docId.indexOf('d_')  == -1 
                    && docId.indexOf('d0_') == -1 
                    && docId.indexOf('d1_') == -1 
                    && docId.indexOf('d2_') == -1 
                    && docId.indexOf('d3_') == -1 
                    && docId.indexOf('d4_') == -1 
                    && docId.indexOf('d5_') == -1 
                    && docId.indexOf('d6_') == -1 
                    && docId.indexOf('d7_') == -1 
                    && docId.indexOf('d8_') == -1 
                    && docId.indexOf('d9_') == -1 && value.ISOUTLET == 'true') {
                        if(value.PRICE != null && parseInt(value.PRICE) >= parseInt(value.SALEPRICE)) {
                            saleYn = true;
                        }
                        
                    }
                    
                    if(checkNewBrand == false &&  value.DOCID.indexOf('5WM') == 0  && value.ISOUTLET == 'true'){
                        if(value.PRICE != null && parseInt(value.PRICE) >= parseInt(value.SALEPRICE)) {
                            saleYn = true;    
                        }
                    }
                    
                    if(docId.indexOf('cm') == 0 && docId.indexOf('c_') > 0  && value.ISOUTLET == 'true'){
                        if(value.PRICE != null && parseInt(value.PRICE) > parseInt(value.SALEPRICE)) {
                            saleYn = true;    
                        }
                    }
                    
                    if(value.BRANDCODE == 'BR15' || value.BRANDCODE == 'BR16' || value.BRANDCODE == 'BR30' 
                    || value.BRANDCODE == 'BR32' || value.BRANDCODE == 'BR35' || value.BRANDCODE == 'BR44' 
                    || value.DOCID.indexOf('FL') == 0){
                        if(value.ISOUTLET == 'true') {
                            saleYn = true;
                        }
                    }
                    
                    simbol = $("#simbol").val();
                    var productCodeTemp = "";
                    var idCnt = 0;
                    $.each(appvSp, function(key6, value6){
                        if(appvSp[key6].indexOf("unapproved") == -1 && appvSp[key6].indexOf("approved") > -1){
                            if(idCnt == 0){
                                productCodeTemp = value.DOCID + "_" + appvSp[key6].split(":")[0];
                                idCnt++;
                            }    
                        }
                    });
                    
                    if(saleYn == true) {
                    	var productSalePerCent = (value.PRICE*1 - value.SALEPRICE*1) / (value.PRICE*1);
                        sb.Append("<p class=\"price\"> <span id=\"price_"+productCodeTemp+"\">");
                        sb.Append(simbol +numberWithCommas(exchangeRatePrice(value.SALEPRICE)));
                        if(value.PRICE != null && parseInt(value.PRICE) > parseInt(value.SALEPRICE)){
                            sb.Append("<strike>"+simbol +numberWithCommas(exchangeRatePrice(value.PRICE))+"</strike>");
                            sb.Append("<span class=\"sale\">"+getDecimalToString(productSalePerCent*100,1,1)+"%</span>");                            
                        }
                        sb.Append("</span></p>");
                    }else {
                        sb.Append("<p class=\"price\"> <span id=\"price_"+productCodeTemp+"\">"+simbol +numberWithCommas(exchangeRatePrice(value.SALEPRICE))+"</span></p>");
                    }
                    
                    sb.Append("<div class=\"etc\">");          
                    sb.Append("<input type=\"hidden\" id=\"productCd"+[key]+"\" name=\"productCd\" value=\""+value.DOCID+"\"/>");

                    var productflag = "EXCLUSIVE,GIFT,RE_ORDER,NEW,BEST";
                    var tempProductFlag = "";
                    var tempPriceFlag = "";
                    
                    
                    $.each(benfitSp, function(key4, value4){
                        
                        if(benfitSp[key4] == 'SALE') {
                            tempPriceFlag = 'SALE';
                        }
                        
                        if(tempProductFlag == "" && benfitSp[key4] != 'SALE' && benfitSp[key4] != 'COUPON') {
                            tempProductFlag = benfitSp[key4];
                        }
                        
                        if(tempProductFlag != "" && benfitSp[key4] != 'SALE' && productflag.indexOf(benfitSp[key4]) < productflag.indexOf(tempProductFlag)) {
                            tempProductFlag = benfitSp[key4];
                        }
                    });

                    sb.Append("<span class=\"\" id=\""+value.DOCID+"\"></span>");
                    if(tempProductFlag != "") {
                        if ($("#lang").val() == "ko") {
                            if(value.stickerTextUseYn !== "true" || (value.stickerTextUseYn === "true" && $("#smartFilterYn").val()=='Y')){
                                sb.Append("<span class=\""+tempProductFlag+"\">");
                                sb.Append(tempProductFlag.replace('RE_ORDER','재입고'));
                                sb.Append("</span>");
                            }
                        } else {
                            sb.Append("<span class=\""+tempProductFlag+"\">");
                            sb.Append(tempProductFlag.replace('_','-'));
                            sb.Append("</span>");
                        }
                        
                    }
                    if ($("#lang").val() == "ko" && value.stickerTextUseYn === "true" && $("#smartFilterYn").val()!=='Y') {
                        sb.Append("<span class=\"STICKERTEXT\" style=\"background-color:#"+value.stickerColor+";color: white;margin: 0 2px 5px;font-weight: bold;white-space: nowrap;padding: 0 5px;\">");
                        sb.Append(value.stickerText);
                        sb.Append("</span>");
                    }
                    if(tempPriceFlag != "") {
                        sb.Append("<span class=\""+tempPriceFlag+"\" style=\"color:red;\">"+tempPriceFlag+"</span>");
                    }
                    
                    /*
                    $.each(benfitSp, function(key4, value4){
                        
                        if(benfitSp[key4] != 'COUPON') {
                            if(benfitSp[key4] == 'SALE') {
                                sb.Append("<span class=\"new\" style=\"color:red;\">");
                            }else {
                                sb.Append("<span class=\"new\">");                                
                            }
                            sb.Append(benfitSp[key4]);
                            sb.Append("</span>");
                        }
                        
                    });*/

//                    sb.Append("<span class=\"shipping\" id=\"fourpm"+value.DOCID+"\"></span> ");
                    sb.Append("<span class=\"hsDelivery1902 shipping ico05\" id=\"hsDelivery"+[key]+"\" style=\"display:none;\">한섬딜리버리</span> ");
                    
                    sb.Append("</div>");
                    sb.Append("</a>");

                    sb.Append("</div>");
                    
                    var gaFunction  = "";
                    if($("#smartFilterYn").val()=='Y'){
                    	gaFunction = "GA_Event('스마트_필터','나의스마트필터링_좋아요','"+escape(value.BRANDNAME)+"_"+ escape(value.NAME.replace("<!HS>","").replace("<!HE>","")) +"');";
                    }
                    
                    if(data.checkWishItem) {
                    	sb.Append("<button type=\"button\" class=\"like"+value.isWishItem+"\" id=\""+value.PRODUCTCODE.split(",")[0]+"Like\" onclick=\"addWishListClick('"+value.PRODUCTCODE.split(",")[0]+"');" + gaFunction + "\" data-value=\""+value.PRODUCTCODE.split(",")[0]+"\"> </button>");
                    } else {
                    	sb.Append("<button type=\"button\" class=\"like\" id=\""+value.PRODUCTCODE.split(",")[0]+"Like\" onclick=\"addWishListClick('"+value.PRODUCTCODE.split(",")[0]+"');" + gaFunction + "\" data-value=\""+value.PRODUCTCODE.split(",")[0]+"\"> </button>");
                    }
            		sb.Append("</li>");
                });
                
                $("#searchProductlistBody").html(sb.ToString());
                var pagingDisplay = '';
                if(data.totalCount < 51) {
                	pagingDisplay = ' style="display:none;"';
                }
                var pageLinkHtml = data.pageLink
                						.replace('class="btn prev"','class="pre"'+pagingDisplay)
                						.replace('class="btn next"','class="nxt"'+pagingDisplay)
                						.replace('<span class="num">','').replace('</span>','')
                						.replace('class="pageBtn on"','class="cur"')
                						.split('#top').join('javascript:void(0);')
                						.split('href="#"').join('href="javascript:void(0);"');
                $("#paging").html(pageLinkHtml);
                
                asyncCheckPro4pmInfo(data);
                
                // 새로고침 대비 흔적남기기
                //document.location.hash ="#in";
                // 해시태그로 인해 paging이 영향을 받기 때문에 pushstate, replacestate로 url에 파라미터를 붙이고,
            	// 페이지 새로 진입 시 해당 파라미터가 있으면 sessionStorage 데이터 가져와 화면 재생성하도록 변경
                // doPaging에서 pushstate 하므로 여기서는 sessionStorage에 데이터만 남긴다.
                
                // sessionStorage 데이터 저장
                setSessionStorage();    

                var searchTotalCountHtml = "";
                if("Y" == $("#smartFilterYn").val()) {
                	searchTotalCountHtml = numberWithCommas(data.totalCount) + " " + $("#smartQuantity").val();
                } else {
                	searchTotalCountHtml = $("#prefixQuery").val() + "("+numberWithCommas(data.totalCount)+")";
                }
                $("#searchTotalCount").html(searchTotalCountHtml);
            }
            
        },
        
        beforeSend:function(){
            $("#loadingBarDiv").css("display", "block");    
        },
        
        complete:function(){
            $("#loadingBarDiv").css("display", "none"); 
        },
        
        error: function(request,status,error){      
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

//탑셀러 가져오기
function getTopSeller(str,str2){

    // 결과 없음 페이지의 탑셀러
    if(str =="01"){
        
        $.ajax({
            type : "get",
            url : "/"+targetLang+"/hssearch/asyncSearch",
            data : {
                 startCount : $("#startCount").val()
                ,collection : paramLang
                ,mode : $("#mode").val()
                ,sort : "SELLCNT/DESC" // 판매량순 오름차순
                ,range : $("#range").val()
                //,startDate :  prevWeek() // 일주일전 날짜
                ,startDate :  "2016.06.01"
                ,endDate : $("#endDate").val()
                ,query : ""
            },
            dataType : "json",
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            success : function(data) {  

                if((data.totalCount == 0) || (data.totalCount < 0)){
                    $("#search_topSeller").hide();
                    return false;
                }
                var newArrivalText = "";
                if(data.totalCount > 0){

                	newArrivalText = newArrival;
                	newArrivalText +="<span class=\"date\">"+realTime()+"</span>";
                    var sb = new StringBuilder();
						
                    $.each(data.product, function(key, value){  
                        if (key == 0) {         
                            return true;
                        }
                        sb.Append("<li class=\"float active\">");

                        sb.Append("<a href=\""+value.PRODUCTDETAILURL+"\" class=\"img_slide_contain\"> ");
                        sb.Append("<div class=\"img_slide_wrap swiper-container slide0201 active\"> ");
                        sb.Append("<div class=\"img_slide swiper-wrapper\"> ");
                        
                        // 인.허가 여부 데이터
                        var appvObj = value.APPROVAL_STATUS;
                        var appvSp =  appvObj.split(",");       
                        
                        // 이미지 데이터
                        var imgObj = value.IMG;
                        var imgSp = imgObj.split(",");
                        var cnt = 0;
                        
                        // 컬러칩 데이터
                        var colorObj = value.REP_COLOR;
                        var colorSp = colorObj.split(",");

                        // 이미지 셋팅
                        $.each(appvSp, function(key2, value2){
                            
                            if(appvSp[key2].indexOf("unapproved") == -1 && appvSp[key2].indexOf("approved") > -1){
                                
                                if(cnt == 0){
                                    sb.Append("<div class=\"img swiper-slide\"><img src=\""+imgSp[key2]+"\" alt=\""+imgSp[key2]+"\" id=\"T01_IMG_"+key+"\"/></div>");
                                    cnt++;
                                } else {
                                    sb.Append("<div class=\"img swiper-slide\"><img src=\""+imgSp[key2]+"\" alt=\""+imgSp[key2]+"\" style=\"display:none\"/></div>");
                                }
                            }
                        });

                        sb.Append("</div>");
                        sb.Append("</div>");
                        sb.Append("</a>");  

                        sb.Append("<div class=\"info_cont\">");

                        
                        sb.Append("<div class=\"color_chip\">");
                        // 컬러 데이터                       
                        var colorChipImage = "";
                        var colorChipOn = "on";
                        var colorCnt = 0;
                        $.each(appvSp, function(key4, value4){
                        	var colorChipArr = colorSp[key4].split(";");
                        	if(typeof colorChipArr[1] !== "undefined" && colorChipArr[1] != "ZZZZ" && colorChipArr[1].indexOf('C01') > -1) {
                        		colorChipImage = "background:"+colorChipArr[0]+" url('"+colorChipArr[1]+"/dims/resize/40x40');";
                        	} else {
                        		colorChipImage = "background:"+colorChipArr[0]+";";
                        	}
                            if(appvSp[key4].indexOf("unapproved") == -1 && appvSp[key4].indexOf("approved") > -1){
                            	if(colorCnt != 0){
                            		colorChipOn = "";
                            	}
                            	
                                sb.Append("<button class=\"chip "+colorChipOn + "\" id=\"slide0201\" onclick=\"chgColorChip(\'"+key+"\', \'"+imgSp[key4]+"\');\" style=\""+colorChipImage+"\"></button> \n");
                                
                                colorCnt++;
                            }
                        });
                        sb.Append("</div>");
                        
                        sb.Append("<a href=\""+value.PRODUCTDETAILURL+"\" class=\"item_info2\">");
                        sb.Append("<p class=\"brand\">"+value.BRANDNAME+"</p>");
                        sb.Append("<p class=\"name\">"+value.NAME+"</p>");
                        
                        simbol = $("#simbol").val();
                        var productCodeTemp = "";
                        var idCnt = 0;
                        $.each(appvSp, function(key6, value6){
                            if(appvSp[key6].indexOf("unapproved") == -1 && appvSp[key6].indexOf("approved") > -1){
                                if(idCnt == 0){
                                    productCodeTemp = value.DOCID + "_" + appvSp[key6].split(":")[0];
                                    idCnt++;
                                }    
                            }
                        });
                        
                        sb.Append("<p class=\"price\">  <span id=\"price_"+productCodeTemp+"\">" + simbol + numberWithCommas(exchangeRatePrice(value.SALEPRICE))+" </span></p>");                       
                        sb.Append("</a>");
						//<div class="etc">
						//	<span class="shipping ico02">앳홈</span>
						//</div>
                        //sb.Append("<button type=\"button\" class=\"like\">찜하기</button>");
                        sb.Append("</li>");             
                    });
                    
                    $("#newArrivalText").html(newArrivalText);
                    $("#search_topSeller").html(sb.ToString());
                }   
            },
            error: function(request,status,error){      
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
        
        realTime();
    
    // 브랜드 바로가기 페이지 탑셀러
    } else if(str == "02"){

        $.ajax({
            type : "get",
            url : "/"+targetLang+"/hssearch/asyncSearch",
            data : {
                 startCount : $("#startCount").val()
                ,collection : paramLang
                ,mode : $("#mode").val()
                ,sort : "SELLCNT/DESC" // 판매량순 오름차순
                ,range : $("#range").val()
                //,startDate :  prevWeek() // 일주일전 날짜
                ,startDate :  "2016.06.01"
                ,endDate : $("#endDate").val()
                ,query : $("#realQuery").val()
            },
            dataType : "json",
            contentType : "application/x-www-form-urlencoded;charset=UTF-8",
            success : function(data) {  
                
                if((data.totalCount == 0) || (data.totalCount < 0)){
                    $("#search_topSeller").hide();
                    return false;
                }
                
                var totalCount = 0;
                
                if(data.totalCount > 0){
                    var sb = new StringBuilder();
                    //sb.Append("<span class=\"date_sign\">"+realTime()+"</span>");                      
                    sb.Append("<ul class=\"swiper-wrapper\">");
                    $.each(data.product, function(key, value){  

                        if (key == 0) {         
                            return true;
                        }
                        
                        // 인.허가 여부 데이터
                        var appvObj = value.APPROVAL_STATUS;
                        var appvSp =  appvObj.split(",");
                        
                        var imgObj = value.IMG;
                        var imgSp = imgObj.split(",");                      
                        var imgSet = "";
                        
                        var cnt = 0;
                        
                        $.each(appvSp, function(key2, value2){
                            
                            if(appvSp[key2].indexOf("unapproved") == -1 && appvSp[key2].indexOf("approved") > -1){
                                
                                if(cnt == 0){
                                    imgSet = imgSp[key2];
                                    cnt++;
                                }
                            }
                        });

                        sb.Append("<li class=\"swiper-slide\">");
                        sb.Append("<a href=\""+value.PRODUCTDETAILURL+"\">");
                        sb.Append("<div class=\"img\"><img src=\""+imgSet+"\" alt=\"\"></div>");
                        sb.Append("<div class=\"txt\">");
                		sb.Append("	<p class=\"name\">"+value.BRANDNAME+"</p>");
        				sb.Append("	<p class=\"price\">₩"+numberWithCommas(value.SALEPRICE)+"</p>");
						sb.Append("</div>");
                        sb.Append("</li>");
                        totalCount++;
                    });
                    
                    sb.Append("</ul>");
                    $("#search_topSeller_totalCount").html(str2+"("+numberWithCommas(totalCount)+")");
                    $("#search_topSeller").html(sb.ToString());
                }
            },
            error: function(request,status,error){      
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
    }   
}

//스타일 서치 키워드 가져오기
function getStyleKeyword(){

    $.ajax({
        type : "get",
        url : "/"+targetLang+"/hssearch/asyncSearch",
        data : {
            collection : "theme"
           ,lang : $("#lang").val()
        },
        dataType : "json",
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        success : function(data) {  
            
            if(data.condition.collection == "theme"){   
                
                if((data.totalCount == 0) || (data.totalCount < 0)){
                    $("#search_style_menu_parent").empty();
                    return false;
                }
                
                if(data.theme[0].resultCount > 0){
                    
                    var sb = new StringBuilder();
                    
                    $.each(data.theme, function(key, value){    

                        if (key == 0) {         
                            return true;
                        }
                        
                        var keywords = value.TM_KEYWORD.split(';');
                        sb.Append("<ul>");
                        for(item in keywords){
                            sb.Append("<li><a href=\"javascript:doKeyword('"+keywords[item]+"');\">"+keywords[item]+"</a></li>");
                        }
                        
                        sb.Append("</ul>");
                    });
                    
                    $("#style_keyword").html(sb.ToString());
                }   
            }
        },

        error: function(request,status,error){      
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}


//다른 고객이 가장 많이 보고 있는 검색어
function doManySearchWord(){
    
    $.ajax({
        type : "get",
        url : "/"+targetLang+"/hssearch/searchReco",
//        url : "/"+targetLang+"/hssearch/asyncSearch",
        data : {
             collection : paramLang
            ,query : $("#realQuery").val()
            ,startCount : $("#startCount").val()
            ,mode : $("#mode").val()
            ,sort : "SELLCNT/DESC" //판매량순 오름차순
            ,range : $("#range").val()
            ,startDate : $("#startDate").val()
            ,endDate : $("#endDate").val()          
        },
        dataType : "json",
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        success : function(data) {  
            if((data.totalCount == 0) || (data.totalCount < 0)){
                $("#search_many_word_view").hide();
                return false;
            }
            
            if(data.totalCount > 0){

                var sb = new StringBuilder();

                $.each(data.product, function(key, value){  
                    
                    if (key == 0) {         
                        return true;
                    }
                    
                    var areaKind = value.areaKind;
                    
                    sb.Append("<li class=\"swiper-slide\">");
                    if(typeof value.clicklog_link !== "undefined"){
                        sb.Append("<a href=\"javascript:goDetailPagebyRecommend('"+ value.PRODUCTDETAILURL +"', '"+ value.clicklog_link +"', '"+areaKind+"')\" class=\"item_info1\"> ");
                    }else{
                        sb.Append("<a href=\""+value.PRODUCTDETAILURL+"?area="+areaKind+"&uiel=Mobile\" class=\"item_info1\"> ");
                    }
                    
                    // 인.허가 여부 데이터
                    var appvObj = value.APPROVAL_STATUS;
                    var appvSp =  appvObj.split(",");                   
                    
                    // 이미지 데이터
                    var imgObj = value.IMG;
                    var imgSp = imgObj.split(",");
                    var cnt = 0;

                    sb.Append("<div class=\"img\">");
                    
                    // 이미지 셋팅
                    $.each(appvSp, function(key2, value2){
                        
                        if(appvSp[key2].indexOf("unapproved") == -1 && appvSp[key2].indexOf("approved") > -1){
                            
                            if(cnt == 0){
                                sb.Append("<img src=\""+imgSp[key2]+"\" alt=\""+imgSp[key2]+"\"/>");
                                cnt++;
                            } else {
                                sb.Append("<img src=\""+imgSp[key2]+"\" alt=\""+imgSp[key2]+"\" style=\"display:none\"/>");
                            }
                        }
                    });

                    simbol = $("#simbol").val();
                    sb.Append("</div>");
                    sb.Append("<div class=\"txt\">");                        
                    sb.Append("<p class=\"name\">"+value.BRANDNAME+"</p>");                      
                    //sb.Append("<span class=\"title\"> "+value.NAME+"</span>");                      
                    sb.Append("<p class=\"price\">"+simbol +numberWithCommas(exchangeRatePrice(value.SALEPRICE))+"</p>");  
                    sb.Append("</div>");               
                    sb.Append("</a></li>");
                });
                
                $("#search_many_word").html(sb.ToString());

                var other_swiper = new Swiper('#otherSlider', {
                    slidesPerView:2.4,
                    paginationClickable: false,
                    spaceBetween:"2.18%",
                    freeMode: true,
                });
            }               
        },
        error: function(request,status,error){      
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

//베스트 기획전 가져오기
function getBestSeller(){

    $.ajax({
        type : "get",
        url : "/"+targetLang+"/hssearch/asyncSearch",
        data : {
             startCount : $("#startCount").val()
            ,collection : paramLang
            ,mode : $("#mode").val()
            ,sort : "DATE/DESC" // 최신상품
            ,range : $("#range").val()
            //,startDate : prevWeek() //일주일전 날짜
            ,startDate :  "2016.06.01"
            ,endDate : $("#endDate").val()
            ,query : ""
        },
        dataType : "json",
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        success : function(data) {  
            
            if((data.totalCount == 0) || (data.totalCount < 0)){
                $("#search_bestSeller_view").hide();
                return false;
            }
            
            if(data.totalCount > 0){
                
                var sb = new StringBuilder();
                
                sb.Append("<div class=\"sr_editorial\" style=\"margin-top:0;\" id=\"search_bestSeller\">");
                sb.Append("<p class=\"sr_editorial_tlt\">"+brandEditNoresult+"</p>");
                sb.Append("<div class=\"sr_editorial_list\">");
                sb.Append("<ul>");

                $.each(data.product, function(key, value){  

                    if (key == 0) {         
                        return true;
                    }
                    sb.Append("<li>");
                    sb.Append("<a href=\"#;\"><img src=\""+value.THUMBNAIL+"\" alt=\"\">");
                    sb.Append("<div>");
                    sb.Append("<span class=\"tlt\">"+value.BRANDNAME+"</span>");
                    sb.Append("<span>"+value.CONTENT+"</span>");
                    
                    sb.Append("</div>");
                    sb.Append("</a>");
                    sb.Append("</li>");
                
                });
                sb.Append("</ul>");
                sb.Append("</div>");
                sb.Append("</div>");
                
                $("#search_bestSeller").html(sb.ToString());
            }   
        },
        error: function(request,status,error){      
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

//그래프 자료 가져오기
function getBrandStats() {

    $.ajax({
        type: "GET",
        url: "/"+targetLang+"/hssearch/asyncSearch",
        dataType: "json",
        data: { 
             query : $("#realQuery").val()
            ,collection : "brand_pop"
            
        },
        success: function(callback) {
            
            
            var data = callback.brand_pop;
            if(parseInt(callback.totalCount) > 0){  
                var pie_array = [];
                var pie_label = [];
                var pie_color = ["#cccccc", "#fd7964", "#e9a26e", "#8aaea2", "#9f95cf", "#8f9bf4", "#c7dae2", "#9adbc5", "#f0a49a", "#f7c55b",
                                 "#2484c1", "#65a620", "#7b6888", "#a05d56", "#961a1a", "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a",
                                 "#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a", "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
                                 "#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e", "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
                                 "#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c", "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6"];
    
                for(var i = 1; i<parseInt(data[0].resultCount)+1; i++){     
                    
                     var pie_data = {};
                     
                     if(data[i].WORD){
                         pie_data.label = data[i].WORD;
                         pie_data.value = Number(data[i].CNT);
                         pie_data.color = pie_color[(i-1)]; 
                         pie_array.push(pie_data);
                     }
                     
                     if(i > 10){
                         return false;
                     }
                }

                //drawGraph(pie_array); 
            } else {
                $('.m_br_result_tab').hide();
            }
        },
        error: function(request,status,error){
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}
    
// 그래프 출력
function drawGraph(pie_array){
    
     var contents_list = eval(JSON.stringify(pie_array));
     
     var pie = new d3pie("pie", {
         header: {
                 title: {
                         text: "0",
                         fontSize:60,
                         //font:'whitneyMedium'
                 },
                 location: "pie-center"
         },
         size: {
                    canvasHeight:300,
                    canvasWidth:300,
                 pieInnerRadius: "83%"
         },
         data: {
                 sortOrder: "none",
                 content: contents_list
         },
         effect:{
             load:{
                 effect:"default",
                 speed:500
             }
         },
         labels: {
             outer: {
               format: "none",
               hideWhenLessThanPercentage: null,
               pieDistance: 30
             },
             inner : {
               format: "none",
             }
         },
         
        callbacks: {
            onload: function(){
                
                    var obj_color = "";
                    var obj_value = "";
                    var max = 0;
                    
                    $("#pie > svg > g:eq(0) g").each(function(i){
                        
                        var color = $(this).find("path").attr("fill");
                        var total = 0;
                        var value = "";
                        var name =  "";
                        for(var k=0;k<pie_array.length;k++){
                            total += pie_array[k].value;
                        }
                        for(var k=0;k<pie_array.length;k++){
                            var tempValue = pie_array[k].color;
            
                                if(tempValue.substring(1,7) == color.substring(1,7)){
                                    value = Math.round(pie_array[k].value / total * 100);
                                        if(max < value){
                                            max = value;
                                        }
                                    name =  pie_array[k].label;
                                }
                        }
                        $("#pie_label").append("<li><div class='chartlabel' style='background:"+color+";'></div>"+name+"<span>"+value+"&#37;</span></li>");
                    });
                    
                    if($("#pie > svg > g:eq(0) g").length == 1){
                        $(".percentage").css("right","80px");
                    }

                    $("#p0_title").text(max);
              }
         }
    });
}


//검색결과 메시지 (결과내 재검색 요청 메시지)
function reSearchResultKeywordState(str, str2){

  var sb1 = new StringBuilder();
  var sb2 = new StringBuilder();

  var sp1 = str.split(" ");
  var sp2 = str.split("!");

  for(var i =0; i<sp1.length; i++){

      if(sp1[i].indexOf("!") > 0){

          sp1[i] = sp1[i].substring(sp1[i],sp1[i].indexOf("!"));
          if(i == 0){
              sb1.Append("\""+sp1[i]+"\"");               
          } else {
              sb1.Append(","+"\""+sp1[i]+"\"");   
          }
                  
      } else {
          if(i == 0){
              sb1.Append("\""+sp1[i]+"\"");               
          } else {
              sb1.Append(","+"\""+sp1[i]+"\"");   
          }
      }
  }

  for(var j =0; j<sp2.length; j++){

      if(sp2[j].indexOf(" ") > 0){

          sp2[j] = sp2[j].substring(sp2[j],sp2[j].indexOf(" "));
          
          if(j == 0){
              continue;       
          } else if(j == 1) {
              sb2.Append("\""+sp2[j]+"\"");
          } else {
              sb2.Append(","+"\""+sp2[j]+"\"");   
          }
                  
      } else {
          if(j == 0){
              continue;       
          } else if(j == 1) {
              sb2.Append("\""+sp2[j]+"\"");
          } else {
              sb2.Append(","+"\""+sp2[j]+"\"");   
          }
      }
  }
  
  if(sb2.ToString() != ""){
      if(str2){
          $(".m_sh_word").append("<strong>"+sb1.ToString()+"</strong>에서<strong>"+sb2.ToString()+"</strong>를 제외한 검색결과가 없습니다.  ");
      } else{
          $(".m_sh_word").before("<strong>"+sb1.ToString()+"</strong>에서<strong>"+sb2.ToString()+"</strong>를 제외한 검색결과  ");
          
      }
  
  } else {
      if(str2){
          $(".m_sh_word").append("<strong>"+sb1.ToString()+"</strong> 검색결과가 없습니다.  ");
      } else {            
          $(".m_sh_word").before("<strong>"+sb1.ToString()+"</strong> 검색결과  ");
      }
      
  }   
}


// 인기 검색어
function getPopkeyword() {

    var target      = "popword";
    var range       = "W";
    var collection  = "_ALL_";
    var datatype   = "xml";
    
    $.ajax({
      type: "get",
      url: "/"+targetLang+"/hssearch/popword",
      dataType: "xml",
      data: { "target" : target, "range" : range, "collection" : collection , "datatype" : datatype },
      success: function(xml) {
          
        var sb = new StringBuilder();
        
        sb.Append("<ol>");
        $(xml).find("Query").each(function(index){
        	sb.Append("<li class=\"\">");
            sb.Append("<a href=\"javascript:doKeyword('" + $(this).text() + "')\"");
                
            if ($(this).attr("updown") == "U") {        
                sb.Append("class=\"up\">");
            } else if ($(this).attr("updown") == "D") {
                sb.Append("class=\"down\">");
            } else if ($(this).attr("updown") == "N") {
                sb.Append("class=\"new\">");
            } else if ($(this).attr("updown") == "C") {
                sb.Append("class=\"\">");
            }
                
            sb.Append("<i>"+(index+1)+"</i>" + $(this).text() + "</a></li>");
            sb.Append("</li>");  
        });     
        sb.Append("</ol>");
        $("#popword").html(sb.ToString());
      }
    });
}

//인기 검색어
function getPopkeywordForSearchArea() {
    var target      = "popword";
    var range       = "W";
    var collection  = "_ALL_";
    var datatype   = "xml";
    //alert(targetLang);
    $.ajax({
      type: "get",
      url: "/"+targetLang+"/hssearch/popword",
      dataType: "xml",
      data: { "target" : target, "range" : range, "collection" : collection , "datatype" : datatype },
      success: function(xml) {
        //alert(xml);
	    var sb = new StringBuilder();
        if(xml != null) {
	        $(xml).find("Query").each(function(index){
	            if(index < 3){
	                sb.Append("<li class=\"top\">");
	            } else {
	                sb.Append("<li class=\"\">");
	            }
	            
	            sb.Append("<a href=\"javascript:doKeyword('" + $(this).text() + "')\" onclick=\"GA_Event('검색', '인기검색어', '" + escape($(this).text()) + "');\"");
	            
	            if ($(this).attr("updown") == "U") {        
	                sb.Append("class=\"up\">");
	            } else if ($(this).attr("updown") == "D") {
	                sb.Append("class=\"down\">");
	            } else if ($(this).attr("updown") == "N") {
	                sb.Append("class=\"new\">");
	            } else if ($(this).attr("updown") == "C") {
	                sb.Append("class=\"\">");
	            }
	            
	            sb.Append("<i>"+(index+1)+"</i>" + $(this).text() + "</a></li>");
	            sb.Append("</li>"); 
	        });
        }
        $("#topsearch").html(sb.ToString());
      }
    });
}


// 내가 찾은 검색어(로그인 상태)
function getLoginMyKeyWord(paramQuery) {
    
    var targetUrl = $(".m_search_box_wrap #search").attr("action");
    var targetLang = handsomeIsoCode;

    $.ajax({
        type: "GET",
        url: "/"+targetLang+"/hssearch/getLoginMyKeyWord",
        dataType: "json",
        data: { 
            query : paramQuery
           ,user_id : getCookie("UID")
        },
        success: function(callback) {
            if(callback.msg =='success'){
                
                var obj = $.parseJSON(callback.json);   
                
                // 기존 쿠키 정보 추출
                var myKeyword = getCookie("mykeyword");

                if(myKeyword == null) {
                   myKeyword = "";
                }
                
                // 기존 쿠키 split으로 쪼개서 가져오기
                var myKeywords = myKeyword.split("^%");
                
                // 기존 쿠키 전부 삭제
                myKeywords.splice(0, myKeywords.length);
                
                var arr = new Array();
                
                // DB에서 추출한 데이터 배열에 담기
                for (var i in obj) {
                    arr.push(obj[i].SEARCH_TEXT);                   
                }

                // DB에서 추출한 데이터 새롭게 쿠키에 저장(7일저장)
                setCookie("mykeyword", arr.join("^%"), 7);
                
                // 내가 찾은 검색어 화면 출력
                showMyKeyword(arr);

            } else if (callback.msg =='fail') { 
                var query = $("#realQuery").val();              
                getPostLoginMyKeyWord(query,10);    
//                alert("데이터베이스 트랜잭션에 문제가 발생하였습니다.\n관리자에게 문의바랍니다.");
                return false;
            }
        },
        error: function(request,status,error){
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

// 내가 찾은 검색어(로그인 이후: 쿠키에서 관리)
function getPostLoginMyKeyWord(keyword, totCount) {
    
    var MYKEYWORD_COUNT = 9; //내가 찾은 검색어 갯수 + 1
    var myKeyword = getCookie("mykeyword");
    if( myKeyword== null) {
        myKeyword = "";
    }

    var myKeywords = myKeyword.split("^%");

    if( totCount > 0 ) {
        var existsKeyword = false;
        for( var i = 0; i < myKeywords.length; i++) {
            if( myKeywords[i] == keyword) {
                existsKeyword = true;
                break;
            }
        }

        if( !existsKeyword ) {
            myKeywords.push(keyword);
            if( myKeywords.length == MYKEYWORD_COUNT) {
                myKeywords = myKeywords.slice(1,MYKEYWORD_COUNT);
            }
        }
        setCookie("mykeyword", myKeywords.join("^%"), 7);
    }

    showMyKeyword(myKeywords.reverse());
}

// 내가 찾은 검색 삭제
function deleteUserMyKeyWord(str, str2){
    
    var targetUrl = $(".m_search_box_wrap #search").attr("action");
    var targetLang = handsomeIsoCode;


    $.ajax({
        type: "POST",
        url: "/"+targetLang+"/hssearch/deleteUserMyKeyWord",
        dataType: "json",
        data: { 
             user_id : getCookie("UID")
            ,search_text : str
            ,search_yn : str2
            ,CSRFToken: '${CSRFToken}'
        },
        success: function(callback) {
            
            if(callback.msg = "fail"){
//                alert("데이터베이스 트랜잭션에 문제가 발생하였습니다.\n관리자에게 문의바랍니다.");
                return false;
            }
            
        },
        error: function(request,status,error){
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

// 연관 검색어로 검색엔진 호출
function recommendSearch(str){
    $("#realQuery").val(str);
    doSearch();
}

// 연관 검색어
function getRecommend() {

    $.ajax({
        type: "GET",
        url: "/"+targetLang+"/hssearch/recommend",
        dataType: "json",
        data: { 
            query : $("#realQuery").val()
        },
        success: function(callback) {
            
            var data = callback.Data.Word;
            
            if(data){
                var sb = new StringBuilder();
                
                $.each(data,function(index ,value){
                    sb.Append("<li class=\"swiper-slide\"><a href='javascript:recommendSearch(\""+value+"\")'>"+value+"</a></li>");
                }); 
                
                $("#search_recommend").html(sb.ToString());
            } else {
                $(".related").hide();
                return false;
            }
            
            
        },
        error: function(request,status,error){
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

// 검색어 관련 브랜드 기획전
function doEvent(){
    
    $.ajax({
        type : "get",
        url : "/"+targetLang+"/hssearch/event",
        data : {
             startCount : $("#startCount").val()
            ,mode : $("#mode").val()
            ,sort : $("#sort").val()
            ,range : $("#range").val()
            ,startDate : $("#startDate").val()
            ,endDate : $("#endDate").val()
            ,reQuery : $("#reQuery").val()
            ,realQuery : $("#realQuery").val()
            ,query : $("#realQuery").val()
        },
        dataType : "json",
        contentType : "application/x-www-form-urlencoded;charset=UTF-8",
        success : function(data) {  

            if(data.condition.collection =="ALL" || data.condition.collection == "event"){  
                
                if((data.totalCount == 0) || (data.totalCount < 0)){
                    $("#search_event_view").hide();
                    return false;
                }
                
                var sb = new StringBuilder();
                
                if(data.totalCount > 0){

                    $.each(data.event, function(key, value){    
                        
                        if (key == 0) {         
                            return true;
                        }

                        sb.Append("<li class=\"swiper-slide\">");
                        sb.Append("<a href=\""+value.URL+"\">");
                        sb.Append("<img src=\""+value.THUMBNAIL+"\" alt=\"\">");
                        sb.Append("<div>");
                        sb.Append("<span class=\"tlt\">"+value.NAME+"</span>");
                        sb.Append("<span>"+value.CONTENT+"</span>");
                        sb.Append("</div>");
                        sb.Append("</a>");
                        sb.Append("</li>");
                    });
                    
                    $("#search_event").html(sb.ToString());
                }               
            }           
        },
        error: function(request,status,error){      
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

//내가 찾은 검색어 조회(비로그인 상태)
function getNotLoginMyKeyWord(keyword, totCount) {

    var MYKEYWORD_COUNT = 9; //내가 찾은 검색어 갯수 + 1
    var myKeyword = getCookie("mykeyword");
    if( myKeyword== null) {
        myKeyword = "";
    }

    var myKeywords = myKeyword.split("^%");

    if( totCount > 0 ) {
        var existsKeyword = false;
        for( var i = 0; i < myKeywords.length; i++) {
            if( myKeywords[i] == keyword) {
                existsKeyword = true;
                break;
            }
        }

        if( !existsKeyword ) {
            myKeywords.push(keyword);
            if( myKeywords.length == MYKEYWORD_COUNT) {
                myKeywords = myKeywords.slice(1,MYKEYWORD_COUNT);
            }
        }
        
        setCookie("mykeyword", myKeywords.join("^%"), 7);
    }

    showMyKeyword(myKeywords.reverse());
}

// 내가 찾은 검색어 삭제
function removeMyKeyword(keyword) {

    var myKeyword = getCookie("mykeyword");
    if( myKeyword == null) {
        myKeyword = "";
    }

    var myKeywords = myKeyword.split("^%");
    
    var i = 0;
    while (i < myKeywords.length) {
        
        if (myKeywords[i] == keyword) {
            myKeywords.splice(i, 1);
        } else { 
            i++; 
        }
    }

    setCookie("mykeyword", myKeywords.join("^%"), 7);
    showMyKeyword(myKeywords);

    // 로그인 상태인 경우 검색어 DB 삭제
//    if($("#loginState").val() == "loginOn"){
//        deleteUserMyKeyWord(keyword, "1row");
//    }
}

// 내가 찾은 검색어 삭제
function removeAllMyKeyword() {

    var myKeyword = getCookie("mykeyword");
    if( myKeyword == null) {
        myKeyword = "";
    }

    var myKeywords = myKeyword.split(",");

    for (var i = 0 ; i < 10; i++) {
        myKeywords.splice(i, 1);
    }
    
    setCookie("mykeyword", myKeywords.join("^%"), 7);
    showMyKeyword(myKeywords);
    
    // 로그인 상태인 경우 검색어 DB 삭제
    if($("#loginState").val() == "loginOn"){
        deleteUserMyKeyWord(keyword, "all_row");
    }
}
 
// 내가 찾은 검색어 
function showMyKeyword(myKeywords) {
    
    //$(".m_recent_search").show();
    
    // 쿠키 10개 넘으면 첫번째 index 삭제
    if(myKeywords.length > 10){
        myKeywords.splice(0, 1);
    }
    
    var str = "";

    //alert(myKeywords.length);
    for( var i = 0; i < myKeywords.length; i++) {
        if( myKeywords[i] == "") continue;
        
        myKeywords[i] = myKeywords[i].replace(/&amp;/g,'&');
        myKeywords[i] = myKeywords[i].replace("<",'&lt');
        myKeywords[i] = myKeywords[i].replace(">",'&gt');
        myKeywords[i] = myKeywords[i].replace("'",'&quot;');
        myKeywords[i] = myKeywords[i].replace('"','&#39;');
        str += "<li>";
    	str += "	<a href=\"javascirpt:noLink();\" onclick=\"javascript:doKeyword('"+myKeywords[i]+"');GA_Event('검색', '최근검색어', '"+escape(myKeywords[i])+"');\" class=\"txt\">"+myKeywords[i]+"</a>";
    	str += "	<a href=\"javascirpt:noLink();\" onclick=\"removeMyKeyword('"+myKeywords[i]+"');\" class=\"del\">삭제</a>";
    	str += "</li>";
    }
    //alert(myKeywords.length);
    if(myKeywords.length > 1) {
        $("#recentDelete").show();
    }else{
        $("#recentDelete").hide();
    }
    
    if(str == "") {
    	$("#m_popular_search").show();
    }
    $("#mykeyword").html(str);
}

//오타 조회
function getSpell(suggestQuery){

    if(suggestQuery != "") {
        var str = "<div class=\"resultall\" style=\"margin-top:-10px;padding:10px;font-size:14px;\">";
        str += "<span>이것을 찾으셨나요? </span>&nbsp;&nbsp;&nbsp;<a href=\"#none\" style=\"font-weight:bold;color:red;font-size:15px;\" onclick=\"javascript:doKeyword('"+suggestQuery+"');\">" + suggestQuery + "</a>";
        str += "</div>";
        $("#spell").html(str);
    }
    return true;
}

// 정렬
function doSorting(sort) {
    
    var searchForm = document.search;
    searchForm.sort.value = sort;
    searchForm.reQuery.value = "2";
    searchForm.submit();
}

//인기검색어, 내가찾은 검색어
function doKeyword(paramQuery) {
    var targetUrl = $(".m_search_box_wrap #search").attr("action");
    var targetLang = handsomeIsoCode;
    
    var brand = "off";

    // 브랜드 검색어인지 여부 확인
    $.ajax({
        
        type: "GET",
        
        url: "/"+targetLang+"/hssearch/arkTrans",
        
        dataType: "json",
        
        data: { 
            query : paramQuery
        },
        
        success: function(data) {
            
            var searchForm = document.search;
//            searchForm.identity.value = "united";           
            searchForm.startCount.value = "0";
            searchForm.query.value = paramQuery;
            searchForm.collection.value = "ALL";
            searchForm.sort.value = "RANK";
            
            if(data.srch.brand){                    
                searchForm.brandPageGubun.value = "on";
            }
            
            gaSearchKeyword('popular');
            doSearch();
        },
        error: function(request,status,error){
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    }); 
}

// 상품리스트 정렬
function doSort(str){
    var searchForm = document.search; 
    searchForm.collection.value = "ALL";
    searchForm.startDate.value = "";
    searchForm.endDate.value = "";
    searchForm.range.value = "A";
    searchForm.startCount.value = 0;
    searchForm.searchField.value = "ALL";
    searchForm.sort.value = str;
    searchForm.submit();    
}

//연관 검색어 밑 스타일서치 검색
function doDynamicSearchStyle(str){ 

    var $form = $("<form></form>");
    
    $form.attr("action", "searchCount");
    $form.attr("method", "post");
    $form.appendTo("body");    
    
    var query = $("<input type=\"hidden\" name=\"query\" value=\""+str+"\" />");
    var collection = $("<input type=\"hidden\" name=\"collection\" value=\""+$("#selectedLang").val()+"\" />");
    var lang = $("<input type=\"hidden\" name=\"lang\" value=\""+$("#lang").val()+"\" />");
    var token = $("<input type=\"hidden\" name=\"CSRFToken\" value=\""+$("#CSRFForm [name='CSRFToken']").first().val()+"\" />");
    var searchStyle = $("<input type=\"hidden\" name=\"searchStyleYn\" value=\"searchStyle\" />");
    
    $form.append(query).append(collection).append(lang).append(token).append(searchStyle);
    $form.submit();
}

// 통합검색창에서 스타일서치 검색
function doSearchStyle(str) {   
    var searchForm = document.searchStyle;
    searchForm.collection.value = $("#selectedLang").val();
    searchForm.query.value = str.replace(/([^;]+)/gi,"($1)").replace(/;/gi,"|");
    searchForm.submit();    
}

//엔터 체크    
function pressCheck(event,obj) {  

    if (event.keyCode == 13) {
        //ga작업 호출 추가
        gaSearchKeyword();
        return doSearch();
    }else{
    	//alert(obj.value);
    	if(obj.value == "") {
    		$("#queryDelete").hide();
    	}
        return false;
    }
}

//엔터 체크2
function pressCheckRe() {  

    if (event.keyCode == 13) {
        return doSearchRe();
    }else{
        return false;
    }
}

// 결과내 재검색
function checkReSearch() {
    
    var searchForm = document.search;
    var query = searchForm.query;
    searchForm.reQuery.value = 1;
    query.value = "";   
    query.focus();
}


//sessionStorage에 저장
function setSessionStorage(){
  
  // sessionStorage에 담을 변수 선언
  var orgData = new Array();
  
  orgData[0] = paramPage;                                     // 1. 페이지 시작번호:startCount:count
  orgData[1] = paramSort;                                     // 2. 정렬:sort:paramSort
  orgData[2] = $("#selectedLang").val();                      // 3. 컬렉션ID:collection:$("#selectedLang").val()
  orgData[3] = $("#prefixQuery").val();                       // 4. 검색어:query:$("#prefixQuery").val()
  orgData[4] = paramReQuery;                                  // 5. 재검색어:reQuery:paramReQuery
  
  orgData[5] = $("#realQuery").val();                         // 6. 실검색어:realQuery:$("#realQuery").val()
  orgData[6] = $("#lang").val();                              // 7. 언어:lang:$("#lang").val()
  orgData[7] = param1Depth;                                   // 8. 카테고리1depth:catequery_cate_1st:param1Depth
  orgData[8] = paramCate;                                     // 9. 카테고리2,3depth:catequery_cate:paramCate
  orgData[9] = paramBrand;                                    // 10. 브랜드:catequery_brand:paramBrand
  
  orgData[10] = paramColor;                                   // 11. 가격:catequery_color:paramColor
  orgData[11] = paramSize;                                    // 12. 색상:catequery_size:paramSize
  orgData[12] = paramMixed;                                   // 13. 사이즈:catequery_matter:paramMixed
  orgData[13] = paramPrice;                                   // 14. 혼용율:catequery_saleprice_grp:paramPrice
  orgData[14] = $("#selectedSearchCondition").siblings().parents().html();    // 15. 선택한조건:selected_condition:$("#selectedCondition").html()
  orgData[15] = $("#totalcount").text();
 
  // MOBILE_RENEWAL 18.11.02 추가
  orgData[16] = $("#sortSearch").val();	           //sort
  orgData[17] = paramLang;	                       //collection
  orgData[18] = $("#searchCategoryUpName").val();  //catequery_cate_1st
  orgData[19] = $("#searchCategoryName").val();	   //catequery_cate
  orgData[20] = $("#searchBrandName").val();	   //catequery_brand
  orgData[21] = $("#searchColorChip").val();	   //catequery_color
  orgData[22] = $("#searchSize").val();	           //catequery_size
  orgData[23] = $("#searchPrice").val();	       //catequery_saleprice_grp
  orgData[24] = $("#searchMatter").val();	       //catequery_matter
  orgData[25] = $("#smartFilterYn").val();	       //smartFilterYn
  
  var setData = JSON.stringify(orgData);
  sessionStorage.setItem("m_setData." + getSearchPageName() , setData);
}

function getSearchPageName() {
	var pathName = location.pathname.split('/');
	var pageName = pathName[pathName.length - 1] || '';
	return pageName;
}

//sessionStorage에 데이터 가져와 화면 재생성
function getSessionStorage(){

  var getData = sessionStorage.getItem("m_setData." + getSearchPageName());
  var pageIndex = "0";
  
  $(JSON.parse(getData)).each(function(key, value){

      // 1. 페이지 시작번호:startCount
      if(key == 0){
          pageIndex = value;      
      }
      
      // 2. 정렬:sort
      if(key == 1){
          
          paramSort = value;
          
          $("#sortSearch > li").removeClass("on");
          
          // 최신 상품순
          if(value =="DATE/DESC"){
              $("a[title='newest']").parents().addClass("on");
              $("#sr_sortby_state").text("최신 상품순");
          // 정확도순
          } else if(value =="RANK/DESC,SELLCNT/DESC"){
              $("a[title='accuracy']").parents().addClass("on");
              $("#sr_sortby_state").text("정확도순");
          // 낮은 가격순
          } else if(value =="SALEPRICE/ASC"){
              $("a[title='lowPrice']").parents().addClass("on");
              $("#sr_sortby_state").text("낮은 가격순");
          // 높은 가격순
          } else if(value =="SALEPRICE/DESC"){
              $("a[title='highPrice']").parents().addClass("on");
              $("#sr_sortby_state").text("높은 가격순");
          // 판매량순 
          } else if(value =="SELLCNT/DESC"){
              $("a[title='sell']").parents().addClass("on");
              $("#sr_sortby_state").text("판매량순");
          // 세일상품 우선
          } else if(value =="SALERATE/DESC,SALEPRICE/ASC"){
              $("a[title='sail']").parents().addClass("on");
              $("#sr_sortby_state").text("세일상품 우선");
          }
          
      }
      
      // 3. 컬렉션ID:collection
      if(key == 2){
          $("#selectedLang").val(value);          
      }
      
      // 4. 검색어:query
      if(key == 3){
          $("#prefixQuery").val(value);           
      }
      
      // 5. 재검색어:reQuery
      if(key == 4){
          paramReQuery = value;           
      }
      
      // 6. 실검색어:realQuery
      if(key == 5){
          $("#realQuery").val(value);         
      }
      
      // 7. 언어:lang
      if(key == 6){
          $("#lang").val(value);          
      }
      
      // 8. 카테고리1depth:catequery_cate_1st
      if(key == 7){
          param1Depth = value;            
      }
      
      // 9. 카테고리2,3depth:catequery_cate
      if(key == 8){
          paramCate = value;          
      }
      
      // 10. 브랜드:catequery_brand
      if(key == 9){
          
          paramBrand = value;         
          var arr = value.split(",");
          
          $(arr).each(function(keySub01, valueSub01){
              $("input:checkbox[name='brand_ck'][value='"+valueSub01+"']").prop("checked",true);
          });
      }

      // 11. 가격:catequery_color
      if(key == 10){
          paramColor = value;     
          
          var arr = value.split(",");
          
          $(arr).each(function(keySub01, valueSub01){
              $("input:checkbox[name='price_ck'][value='"+valueSub01+"']").prop("checked",true);
          });
      }
      
      // 12. 색상:catequery_size
      if(key == 11){
          paramSize = value;          
      }
      
      // 13. 사이즈:catequery_matter
      if(key == 12){
          paramMixed = value;
          var arr = value.split(",");
          
          $(arr).each(function(keySub01, valueSub01){
              $("input:checkbox[name='size_ck'][value='"+valueSub01+"']").prop("checked",true);
          });
      }
      
      // 14. 혼용율:catequery_saleprice_grp
      if(key == 13){
          paramPrice = value;
          
          var arr = value.split(",");
          
          $(arr).each(function(keySub01, valueSub01){
              $("input:checkbox[name='mixed_ck'][value='"+valueSub01+"']").prop("checked",true);
          });
      }
      
      //  15. 선택한조건:selected_condition
      if(key == 14){
          $(".filter_words > ul").html(value);
      }
      
      //  16. 검색결과 개수:totalcount
      if(key == 15){
          $("#totalcount").text(value);
      }
      
      // MOBILE_RENEWAL 18.11.02 추가
      //  17. sort
      if(key == 16){
          $("#sortSearch").val(value);
      }

      //  18. collection
      if(key == 17){
    	  paramLang = value;
      }

      //  19. catequery_cate_1st
      if(key == 18){
    	  $("#searchCategoryUpName").val(value);
      }

      //  20. catequery_cate
      if(key == 19){
    	  $("#searchCategoryName").val(value);
      }

      //  21. catequery_brand
      if(key == 20){
    	  $("#searchBrandName").val(value);
      }

      //  22. catequery_color
      if(key == 21){
    	  $("#searchColorChip").val(value);
      }

      //  23. catequery_size
      if(key == 22){
    	  $("#searchSize").val(value);
      }

      //  24. catequery_saleprice_grp
      if(key == 23){
    	  $("#searchPrice").val(value);
      }

      //  25. catequery_matter
      if(key == 24){
    	  $("#searchMatter").val(value);
      }

      //  26. smartFilterYn
      if(key == 25){
    	  $("#smartFilterYn").val(value);
      }
  });
  
  // 상품리스트 호출
  getPageData(pageIndex);
  
}

$(document).ready(function(){
  
  // 새로고침시 해시값이 있는 경우 sessitionStorage 데이터 가져와 화면 재생성 
//  if(document.location.hash =="#in"){
//      
//      // sessitionStorage 데이터 가져오기
//      getSessionStorage();
//  }
	// 해시태그로 인해 paging이 영향을 받기 때문에 pushstate, replacestate로 url에 파라미터를 붙이고,
	// 페이지 새로 진입 시 해당 파라미터가 있으면 sessionStorage 데이터 가져와 화면 재생성하도록 변경
	if (location.search) {
		var query = location.search.substr(1);
		var result = {};
		query.split("&").forEach(function(part) {
			var item = part.split("=");
		    result[item[0]] = decodeURIComponent(item[1]);
		});
		
		if (result.keepState) {
			getSessionStorage();
		}
	}
});


function asyncCheckPro4pmInfo(data) {
    
    var baseProdCdList = "";
    var resultCount = "";
    
    $.each(data.product, function(key, value){
        if (key == 0) {
            resultCount = value.resultCount;
        }
        
        if (key != 0) {         
            baseProdCdList += value.DOCID;
        }
        if(key != 0 && key != resultCount) {
            baseProdCdList += ",";
        }
    });
    
    
    if(baseProdCdList != "" && baseProdCdList != null) {
        $.ajax({
            type : "GET",
            url : "/"+targetLang+"/hssearch/check4pmProdInfo",
            dataType : "json",
            data : {baseProdCd : baseProdCdList},
            async : false,
            error: function(request,status,error){      
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            },
            success : function(data) { 

                var listleng = $("input[name=productCd]").length;
                var displayYn = "flase";
                var hsDeliveryYn = false;
                
                for(var i = 0; i < data.length; i++) {
                    for(var j= 1; j < 13; j++)  {
                        var prodCd = $("#productCd"+j).val();
                        
                        
                        var fourpmCategoryYn = true;
                        if(data[i].fourpmCategoryYn == "0"){
                            fourpmCategoryYn = false;
                        }
                        
                        var athomeCategoryYn = true;
                        if(data[i].athomeCategoryYn == "0"){
                            athomeCategoryYn = false;
                        }
                        var quickCategoryYn = true;
                        if(data[i].quickCategoryYn == "0"){
                            quickCategoryYn = false;
                        }
                        
                        if(prodCd == data[i].code) {
//                            console.log(data[i].code + ":" + data[i].available4pm);
                            /*if(data[i].reserveYn == "Y") {
                            	var targetUrl = $("#search").attr("action");
                         	    var reOrder = "";
                         	    targetLang = "ko";

                         	    if(targetUrl.indexOf("en") > -1){
                         	        targetLang = "en";
                         	    }else if(targetUrl.indexOf("zh") > -1){
                         	        targetLang = "zh";
                         	    }
                         	    
                         		if(targetLang == "ko") {
                         			reOrder = "예약판매";
                         		} else if(targetLang == "en") {
                         			reOrder = "Advanced order";
                         		} else if(targetLang == "zh") {
                         			reOrder = "预购";
                         		}
                        		
                        		$("#productCd"+j).parents(".etc").find("span").not(":eq(0)").hide();
                                $("#productCd"+j).parents(".info_cont").find(".name").prepend("<b>["+reOrder+"] </b> ");
                                if($.trim($("#productCd"+j).parents(".etc").find(".SALE").html()) == "SALE") {
	                                $("#productCd"+j).parents(".etc").find("span:eq(0)").before("<span class='sticker'>PRE-ORDER&nbsp;</span>");
	                                $("#productCd"+j).parents(".etc").find(".SALE").show();
                                } else {
                                	$("#productCd"+j).parents(".etc").find("span:eq(0)").removeClass("hsDelivery1902").addClass("sticker").html("PRE-ORDER");
                                }
                                continue;
                            }*/
                            
                            if(data[i].available == 0) {
                                //$("#productCd"+j).parents(".flag").find("span:eq(0)").css("color", "#ff0000");
                                //$("#productCd"+j).parents(".flag").find("span:eq(0)").html("SOLDOUT");
                            	$("#" + data[i].code).css("color", "#ff0000");
                            	$("#" + data[i].code).html("SOLDOUT&nbsp;");
                            }
                            
                            if(data[i].available4pm == 0) {
//                            	$("#fourpm"+data[i].code).removeClass("ico01"); 
//                                $("#fourpm"+data[i].code).html("");
                            }else if(data[i].available4pm > 0) {
                                if(data[0].fourPmYn == "true" && fourpmCategoryYn == true){
                                    hsDeliveryYn = true;
//                                	$("#fourpm"+data[i].code).addClass("ico01");
//                                    $("#fourpm"+data[i].code).html(data[i].timeCheck+'PM');
                                }else {
//                                	$("#fourpm"+data[i].code).removeClass("ico01"); 
//                                	$("#fourpm"+data[i].code).html("");
                                }
                            }
                            
                            displayYn = "true";
                            
                            if($("#loginState").val() == "loginOn"){
                                if(athomeCategoryYn == true  && $("#athomeInfo").val() == "ATHOME") { //CATEGORY
                                    if(data[0].athomeYn == "true") {
                                        if(data[i].available4pm > 0) {
                                            try{
                                                var price = $("#productCd"+j).parents(".info_cont").find(".price").html();
                                                
                                                var pattern = /[^(0-9)]/gi;   // 숫자이외는 제거
                                                price = price.replace(pattern,"");
                                                
                                                if(Number(price) >= 100000){
                                                    hsDeliveryYn = true;
//                                                    $("#productCd"+j).parents(".item_box").append("<a href=\"javascript:void(0);\" class=\"m_athome_sticker\" >앳홈</a>");
                                                }
                                            }catch(e){}
                                        }
                                    }
                                }
                                
                                if(quickCategoryYn == true && data[0].quickTimeCheck == "true") { //quick
                                    if(data[i].available4pm > 0) { //재고
                                        try{
                                            var price = $("#productCd"+j).parents(".item_box").find(".price").html();
                                            
                                            var pattern = /[^(0-9)]/gi;   // 숫자이외는 제거
                                            price = price.replace(pattern,"");
                                            
                                            if(Number(price) >= 100000){
                                                hsDeliveryYn = true;
                                            }
                                        }catch(e){}
                                    }
                                }
                            }
                            
                            if(hsDeliveryYn){
                                //delivery 스티커부착
                                $("#hsDelivery"+j).show();
                                
                            }
                        }
                    }
                }
                
                if(displayYn != "true") {
//                    $(".shipping").removeClass("ico01");
//                    $(".shipping").html("");
                    $(".hsDelivery1902").hide();
                }
            },
            
        });
    }

    
}
//recopick 
//#1240 recopick 추천상품 추가
function goDetailPagebyRecommend(productCode, clickUrl, areakind){
    var locale = document.location.href.split("/")[3];
    var url = "/"+locale+productCode;
    var host = "http://"+ $(location).attr('host') + url +"?type=recommendProd&area="+areakind+"&uiel=Mobile";
    $.ajax({
        type : "GET",
        url : clickUrl,
        error: function(request,status,error){      
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        },
        success: function(data){      
            window.location.href=host+"&recopick=true";
        }
    });
    window.location.href= encodeURI(host);
}

function doStyleItem(){
    
    var targetUrl = $(".m_search_box_wrap #search").attr("action");
    var targetLang = handsomeIsoCode;
    
    $.ajax({
        type: "get",
        url: "/"+targetLang+"/hssearch/asyncSearch",
        dataType: "json",
        
        data: { 
            collection : "theme"
           ,lang : $("#lang").val()
           ,serviceType : "m"
        },
        async: false,
        success: function(data) {
            //alert(data.condition.collection);
            $("#m_search_tab").show();
            if(data.condition.collection == "theme"){   
                //alert(data.totalCount);
                if((data.totalCount == 0) || (data.totalCount < 0)){
                    getPopkeywordForSearchArea();
                    $("#btn_popular_search").show();
                    return false;
                }
                //alert(data.theme[0].resultCount);
                if(data.theme[0].resultCount > 0){
                    
                    
                    if($("#styleSearchSlider .slides li").length  == 0) {
                        var sb = new StringBuilder();
                        
                        $.each(data.theme, function(key, value){    
                            
                            if (key == 0) {         
                                return true;
                            }
                            
                            sb.Append("<li>");
                            sb.Append("<a href=\"javascript:doSearchStyle('"+value.TM_KEYWORD+"')\">");
                            sb.Append("<figure>");
                            sb.Append("<img src=\""+value.TM_URL.split(";")[0]+"\" alt=\"이미지\">");
                            sb.Append("<figcaption>"+value.TM_NM_HTML+"</figcaption>");
                            sb.Append("</figure>");
                            sb.Append("</a>");
                            sb.Append("</li>");
                            
                        });

                        $("#styleSearchSlider .slides").append(sb.ToString());
                        
                       if(data.theme[0].resultCount == 1) {
                            $("#styleSearchSlider").addClass("one_list");
                       }
                        
                    }
                    
                }   
            }
        },
        error: function(request,status,error){
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
    
    
}

function setEcommerceData(idx, type){
    var listNm = "";
    var position;
    var prodList;
    
    if(type == "SMART"){
        prodList = JSON.parse(window.sessionStorage.getItem('smart_more_ecommerceDataList'));
        listNm += "스마트_스마트 필터링_더보기";
        position = 16;
    }else if(type == "RECOMMEND"){
        prodList = JSON.parse(window.sessionStorage.getItem('search_recommend_ecommerceDataList'));
        listNm += "검색결과";
        position = 17;
    }

    if(prodList != null && typeof prodList != undefined){
        if(prodList.length > 0){
            var prodInfo = prodList[idx];
            
            dataLayer.push({
                'event': 'ga_event', 'layerCategory' : 'Ecommerce', 'layerAction' : 'Click','layerLabel' : undefined,
                'ecommerce': {
                    'currencyCode': 'KRW', //통화
                    'click': {
                        'actionField': { 'list': listNm }, //상품 리스트명
                        'products':
                        [{
                        'id': prodInfo.DOCID, //상품코드
                        'name': prodInfo.NAME.replace("<!HS>","").replace("<!HE>",""), //상품명
                        'brand': prodInfo.BRANDNAME, //상품 브랜드
                        'category': '', //상품 카테고리
                        'position': position //상품 위치
                        }]
                    }
                }
            });
            
            /* Ecommerce data 초기화
            dataLayer에 남아 있는 경우에는 전자상거래 단계만을 위해 사용하는
            필드들이 세팅되어 있으므로 undefined를 통해 초기화합니다. */
            dataLayer.push({
                'layerCategory' : undefined,
                'layerAction' : undefined,
                'nonInteraction' : false,
                'ecommerce' : undefined
            });
        }
    }
}

function gaSearchKeyword(param){
    var type = "";
    var searchForm = document.search; 
    var searchwords = searchForm.query.value.replace(/(^\s*)|(\s*$)/g,"");
    
    //검색어가 있을 경우만 검색처리와 동일하게 인식하여 ga전송하도록 작업
    if (searchwords == "") {
        return;
    }

    //인기검색어로 진입인지 엔터&검색버튼 진입인지 확인
    if(param != null && param != "" && typeof param != undefined){
        type = param;
    }

    if(param == "popular"){
        GA_Event('검색', '검색결과없음_인기검색어', escape(searchwords));
    }else{
        GA_Event('검색', '직접입력', escape(searchwords));
    }
}

var currecy = ""; // USD, CNY
var rate = $("#rate").val(); // 환율
var simbol = $("#simbol").val(); // 심볼

function exchangeRatePrice(koPrice){
    var productPrice = koPrice == null || koPrice == 0 ? 0 : koPrice;
    var sumPrice = parseFloat(productPrice);
    var exchangeAmt = sumPrice;
    rate = $("#rate").val();

    if(handsomeIsoCode.toLowerCase() != "ko"){
        exchangeAmt = Math.round(parseFloat(sumPrice) / parseFloat(rate) * 100) / 100 ;
    }
    return exchangeAmt;
}

function callSearchRecommClick(ele, key, type){
    setEcommerceData(key, type);
}
