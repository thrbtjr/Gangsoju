/**
 * Handsome Methods
 */
function noLink() {}

function goBack() {
	//if(getCookie("handsomecategorypagecnt")*1 > 1) {
	//	var handsomecategorypagecnt = (getCookie("handsomecategorypagecnt")*1)-1;
	//	window.history.go(handsomecategorypagecnt* -1);
		//window.history.back();
	//} else {
		window.history.back();
	//}
	//window.history.go(-1);
	//alert(document.referrer);
	//location.href = document.referrer;
}

/**
 * 레이어팝업 SHOW
 * 
 * assist.js 에서 사용하는 레이어팝업 show 를 조금 변형시킨 형태입니다
 * hidden 으로 숨겨진 html 을 띄웁니다
 * 
 * @param depth
 * @param callbackOpen
 * @param callbackClose
 * @returns {Boolean}
 */
function callLayerPopupShow(depth, callbackOpen, callbackClose){ //레이어팝업 불러오기
	layerPopConWrap = $('.hsome_layerpop_contents'); //레이어 팝업 wrap
	curScrollPosition = $(window).scrollTop();
	holdBodyShow();
	$('.hsome_layerpop_contents.lp_'+depth).removeClass('lp_stl_black').removeClass('dir_w').removeClass('dir_h'); //초기화
	$('.hsome_layerpop_contents.lp_'+depth).addClass('dir_h'); //슬라이드방향	
	setTimeout(function(){
		$('.hsome_layerpop_contents.lp_'+depth).html('<img src="/_ui/handsomemobile/images/common/Spinner-1s-200px.png" alt="loading" class="hsome_quickMenu_loader" />');
		$('.hsome_layerpop_contents.lp_'+depth).addClass('visible');
		$('.hsome_layerpop_contents.lp_'+depth).addClass('active');
		setTimeout(function(){
			//$('.hsome_layerpop_contents.lp_'+depth).html(data);
			if (typeof callbackOpen === "function") { 
				callbackOpen($('.hsome_layerpop_contents.lp_'+depth));
			}
			layerPopConWrap.on('click', '.btn_lyrpp_close', function(){ //레이어팝업 닫기
				var $this = $(this);
				$('.hsome_layerpop_contents .fcs').hide();
				holdBodyHide();
				$this.parents('.hsome_layerpop_contents').removeClass('visible');
				$this.parents('.hsome_layerpop_contents').removeClass('active');
				hs_allCon.css({ marginTop: curScrollPosition*-1 });
				setTimeout(function(){
					hs_allCon.css({ marginTop: 0 });
					$(window).scrollTop(curScrollPosition);
					$this.parents('.hsome_layerpop_contents').empty();
				}, 400);
				if (typeof callbackClose === "function") { 
					callbackClose($('.hsome_layerpop_contents.lp_'+depth));
				}
				return false;
			});
		}, 0);
	}, 100);
	return false;
}
function layerNextActiveIndex() {
	var $lastActive = $('.hsome_layerpop_contents.active').last();
	var depthIndex = '1';
	if ($lastActive.hasClass('lp_depth1')) depthIndex = '2';
	if ($lastActive.hasClass('lp_depth2')) depthIndex = '3';
	if ($lastActive.hasClass('lp_depth3')) depthIndex = '4';
	if ($lastActive.hasClass('lp_depth4')) depthIndex = '5';
	if ($lastActive.hasClass('lp_depth5')) depthIndex = '6';
	if ($lastActive.hasClass('lp_depth6')) depthIndex = '7';
	if ($lastActive.hasClass('lp_depth7')) depthIndex = '8';
	return depthIndex;
}

/**
 * hidden 값 생성 
 * 
 * 특정 영역의 child로 <input type="hidden" 값을 생성 합니다.
 * id와 name을 동일하게 생성하면 동일 id가 있을 경우에 삭제 후 생성합니다.
 * 
 * @param ptag 부모 tag
 * @param hname 생성 tag명
 * @param hvl 생성 값
 * @returns {dom}
 */
function addHidden(ptag, hname, hvl) {
	
	if($("#"+hname).length >0){
		$("#"+hname).remove();
	}
	return $('<input/>').attr('type'	, 'hidden')
						.attr('id'		, hname)
						.attr('name'	, hname)
						.attr('value'	, hvl)
						.appendTo(ptag);
}
function addHiddenInput(ptag, hname, hvl) {
	
	if($("input[name="+hname+"]").length >0){
		$("input[name="+hname+"]").remove();
	}
	return $('<input/>').attr('type'	, 'hidden')
						.attr('name'	, hname)
						.attr('value'	, hvl)
						.appendTo(ptag);
}

function gf_nvl(s1,s2) {
	if(s1 == null || s1 == "undefined") {
		return s2;
	} else {
		return s1;
	}
}

function gf_isNil(s) {
	if(s == null || s == "undefined") {
		return true;
	} else {
		return false;
	}
}

//소수점 처리
function getDecimalToString(val, intIdx, decIdx, option) {
    var stringVal = String(val);
    var stringValSplit = stringVal.split('.');
    var intNumSpaceList = .0.toFixed(intIdx).split('.');
    var intNumSpace = gf_nvl(intNumSpaceList[1], "0");
    
    //소수계산
    if(!gf_isNil(stringValSplit[1]) && !gf_isNil(decIdx) && decIdx > 1){
        var decimalString = stringValSplit[1].substr(0,decIdx-1)+'.'+stringValSplit[1].substr(decIdx-1,stringValSplit[1].length);
        var calcResult = _optionCalc(decimalString, option);
        var intNum = stringValSplit[0];

        if(String(Math.floor(Number(decimalString))).length < String(calcResult).length){
            calcResult = calcResult.substr(1);
            intNum = String(Number(intNum)+1);
        }
        return _setAddZeroString(intNum, intNumSpace)+"."+calcResult;
    //정수처리
    } else {
    	var calcValue = _optionCalc(stringVal, option);
    	return _setAddZeroString(calcValue, intNumSpace);
    }

    //ceil:올림, floor: 내림, Default : 반올림
    function _optionCalc(_value, _calcOption){
    	var intValue = Number(_value);
    	switch(_calcOption) {
    		case "ceil" : return String(Math.ceil(intValue));
    		break;
    		case "floor" : return String(Math.floor(intValue));
    		break;
    		default : return String(Math.round(intValue));
    	}
	}

	//0추가(정수부분)
	function _setAddZeroString(_value, _spaceValue){
    	//정수부분 String
    	//if(_spaceValue.length > _value.length){
        //	_spaceValue = _spaceValue.substring(_value.length);
        //	return _spaceValue + _value;
    	//} else {
        	return _value;
    	//}
	}
}

function bannerUrlLink(url) {
	if(url != "") {
		if(url.indexOf("http") > -1) {
			curUrl = location.href;
			if(curUrl.indexOf("mypageFloatingPopup") > 0) {
				curUrl = "/";
            }
			$.cookie("handsomeappreturnurl", curUrl, {path:"/"});
		}
		location.href = url;
	}
}