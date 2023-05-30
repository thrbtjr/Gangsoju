var CommonController = function(){
	
	this.name = "CommonController";
	this.doWork = function(){
//		console.log(this.name + " script working start");
		this.setData();
		this.doFunction();
//		console.log(this.name + " script working end");
	};
};




/** 

page 셋팅하는 스크립트

[totalItemCount : 데이타 총 개수. 필수값]
[pagingArea : 페이징 내용이 삽입될 부분. jquery selector 형태. 필수값]
[curPageNum : 현재 페이지 번호. default = 1. 필수값 아님]
[pagingSize : 페이징 처리될 데이타 개수. default = 10, 필수값 아님]
[pageDisplaySize : 화면에 나타날 페이지 개수. default = 10, 필수값 아님]

========================[example code]===========================

var doSomething = new PageNavigationController(".paging", null, 5);
doSomething.setPage(493, 3);

=================================================================

실제로 데이타 처리와 연동되는 부분은 구현해서 사용? 해야하려나?.....
오버라이드 해서 사용해야하나...?


*/
var curPageNum = "";

var PageNavigationController = function(pagingArea, pagingSize, pageDisplaySize  ){
	var t = this; //this의 별칭. each문 등의 this를 사용하지 못하는 공간에서 사용한다.

	this.name = "PageNavigationController";

	var PARAMS = {};
	
	PARAMS.pagingArea = $(pagingArea);
	PARAMS.pagingSize = pagingSize!=null?pagingSize:10;
	PARAMS.pageDisplaySize = pageDisplaySize!=null?pageDisplaySize:5;

	this.setPage = function(totalItemCount, curPageNum){
		this.setData(totalItemCount, curPageNum);
		this.doFunction();
	};


	this.setData = function(totalItemCount, curPageNum){
		PARAMS.totalItemCount = totalItemCount;
		this.setCurPageNum(curPageNum);
	};

	this.setCurPageNum = function(pageNum){
		PARAMS.curPageNum = pageNum!=null?pageNum:1;
		
		PARAMS.endPageNum = Math.ceil(PARAMS.totalItemCount/PARAMS.pagingSize);
		if(PARAMS.curPageNum > PARAMS.endPageNum || PARAMS.curPageNum < 1) PARAMS.curPageNum = 1;		
		var tempNum = Math.floor((PARAMS.curPageNum-1)/PARAMS.pageDisplaySize);
		PARAMS.startPageNum = tempNum*PARAMS.pageDisplaySize+1;
	};

	this.doFunction = function(){
		
		if(PARAMS.totalItemCount>0){
			this.setHtml();
			this.setAction();
		}else{
			PARAMS.pagingArea.html('');
		}

	};


	this.setHtml = function(){
		var pagingHtml = '';
		
		// 이전 페이지로 이동
		//var prevPageBtn = '<a href="void(0);" class="pre"></a>';
		var prevPageBtn = '';
		// 이전블록 유효하면 이전버튼 이벤트 생성
		if (PARAMS.curPageNum != Number(1)) {
			prevPageBtn = '<a href="javascript:void(0);" class="pre"></a>';      
		} else {
			prevPageBtn = '<a href="javascript:void(0);" class="pre disabled"></a>';      
		}
		
		var pageBtn = '<span class="num">';
		for(var i = 0; i<PARAMS.pageDisplaySize; i++){
			var pageNum = i+PARAMS.startPageNum;
			var activeClass = '';
			if(pageNum == PARAMS.curPageNum) activeClass = 'cur';

			pageBtn +='<a href="javascript:void(0);" class="pageBtn '+activeClass+' " pageNum="'+pageNum+'" >'+pageNum+'</a>';

			if(pageNum>=PARAMS.endPageNum) break;
		}

		pageBtn += '</span>';

		// 다음 페이지로 이동
		//var nextPageBtn = '<a href="void(0);" class="nxt" ></a>';
		var nextPageBtn = '';
		// 다음블록 유효하면 다음버튼 이벤트 생성
		if (PARAMS.curPageNum != PARAMS.endPageNum) {
			nextPageBtn = '<a href="javascript:void(0);" class="nxt"></a>';      
		} else {
			nextPageBtn = '<a href="javascript:void(0);" class="nxt disabled"></a>';      
		}

		pagingHtml = prevPageBtn + pageBtn + nextPageBtn;
		
		PARAMS.pagingArea.html(pagingHtml);
	};
	

	this.setAction = function(){
		var thisArea = PARAMS.pagingArea;

		thisArea.find(".pre").not(".disabled").click(function(){
			var pageNum = parseInt($(this).siblings(".num").find(':first').attr("pageNum"))-1;
			if(pageNum<1) pageNum = 1;
			t.goPage(pageNum);
		});

		thisArea.find(".pageBtn").not(".cur").click(function(){
			t.goPage($(this).attr("pageNum"));
		});

		thisArea.find(".nxt").not(".disabled").click(function(){
			var pageNum = parseInt($(this).siblings(".num").find(':last').attr("pageNum"))+1;
			if(pageNum>PARAMS.endPageNum) pageNum = PARAMS.endPageNum;
			t.goPage(pageNum);
		});
	};

	$('.btn_more').on("click",function(){
	    if(curPageNum != PARAMS.curPageNum) {
	        t.goPage(PARAMS.curPageNum+1);
  	    }
		
		curPageNum = PARAMS.curPageNum;
		
	});

	this.goPage = function(targetPageNum){

		/*PARAMS.pagingArea.html('');
		this.setCurPageNum(targetPageNum);
		this.doFunction();
		this.dynamicAction(targetPageNum);*/

	};

	this.dynamicAction = function(targetPageNum){
	

	}

};

//PageNavigationController.prototype = new CommonController();





/**
 * 
 * 게시판 형태 리스트 뿌리는 함수
 * 
 * GET 형태, Responsebody SearchPageData로 리턴하는 컨트롤러 필요,
 * JSP 페이지에 action url이 들어간 form 태그 필요
 * script로 리스트 구성하는 함수를 오버라이드 해서 사용
 * 
 * 
 * ========================[example code]===========================
 *
 * [controller sample]
 *
 *
 *@RequestMapping(value = "/myorderlist", method = RequestMethod.GET)
	@ResponseBody
	public SearchPageData<OrderData> getMyOrderList(@RequestParam(value = "pageNum", defaultValue = "1") final int pageNum,
			@RequestParam(value = "pageSize", defaultValue = "10") final int pageSize,
			@RequestParam(value = "show", defaultValue = "Page") final ShowMode showMode,
			@RequestParam(value = "sort", required = false) final String sortCode, final HttpServletRequest request, final HttpServletResponse response)
	{
		
		HashMap whereValue = new HashMap();
		
		final PageableData pageableData = createPageableData(pageNum - 1, pageSize, sortCode, showMode);
		
		SearchPageData<OrderData> datas = myOrdersFacade.getMyOrders(pageableData, whereValue);
		
		return datas;
	}
 *
 *
 *
 *
 *
 * [html sample]
 *
 *<form id="orderSearchForm" action="<c:url value="/mypage/order/myorderlist" />" >
 *
 *</form>
 *
 *
 *
 *
 *
 *
 *
 * [script sample]
 *
 *	var orderList = new BoardListController('orderSearchForm', '#listBody', '.paging', 8, 'searchBtn');
 *											폼아이디, 리스트공간 셀렉터, 페이징공간 셀렉터, 페이지당 리스트개수, 검색버튼 아이디
 *
	orderList.setRowHtml = function(results){
		var rows = "";
		$.each(results, function(){
			
			var listTag = '<tr>';
			listTag +=	'<td>'+this.code+'</td>';
			listTag +=	'<td>'+this.currency+'</td>';
			listTag +=	'<td>'+this.pk+'</td>';
			listTag +=	'<td>'+this.calculated+'</td>';
			listTag +=	'<td></td>';
			listTag +=	'<td></td>';
			listTag +=	'</tr>';
			
			rows +=listTag;
		});
		
		return rows;
		
	};
	orderList.doWork();
 *	
 *	=================================================================
 * 
 * 
 */
var BoardListController = function(formId, listArea, pageArea, pageSize, searchBtnId){
	var t = this; //this의 별칭. each문 등의 this를 사용하지 못하는 공간에서 사용한다.

	this.PARAMS = {};

	var paging = null;

	this.name = "BoardListController";

	t.PARAMS.formId = formId;
	
	
	t.PARAMS.pageSize = pageSize!=null?pageSize:10;
	
	t.PARAMS.paging = new PageNavigationController(pageArea, pageSize);
	t.PARAMS.pageNum = 1;
	
	t.PARAMS.defaultListHtml = $(listArea).html();
	
	if(searchBtnId!=null){
		$('#'+searchBtnId).click(function(){
			t.searchAction();
		});
	}
	
	this.setData = function(){

		t.PARAMS.jsonObjectData = null;
		t.PARAMS.resourceObjectData = null;
		this.getJsonData();

	};

	this.getJsonData = function(){
		
		var paramDatas = $("form#"+formId ).serialize();
		if(paramDatas!="") paramDatas +="&";
		paramDatas +="pageNum="+t.PARAMS.pageNum+"&pageSize="+t.PARAMS.pageSize;
		
		$.ajax({
			type: "get",
			url :  $("form#"+formId ).attr("action"),
			data : paramDatas,			
			dataType : "json",
			cache: false,
			error : function( request, status, error ){		
				console.log( "code:" + request.status+"\n" + "message:" + request.responseText+"\n" + "error:" + error );
				t.PARAMS.jsonObjectData = 0;
			}, 
			success : function( result ){
				t.PARAMS.jsonObjectData = result;
				t.makeResource();
			}
		});
	};

	this.makeResource = function(){
		//특별한 데이터 가공이 필요한 경우 오버라이드해서 사용
		t.PARAMS.resourceObjectData = t.PARAMS.jsonObjectData;
	};


	this.doFunction = function(){
		var j = 0;
		var chkTimer = setInterval(chkData, 100); // 1000 = 1초입니다.
		function chkData()
		{
			if(t.PARAMS.jsonObjectData ==null){
				if(j==500) clearInterval(chkTimer);
				j++;
				return false;
			}else if(t.PARAMS.jsonObjectData!=0){
				
				clearInterval(chkTimer);
				
				t.setListHtml();
				
				if(t.PARAMS.jsonObjectData.pagination!=null){
					
					t.PARAMS.paging.setPage(t.PARAMS.jsonObjectData.pagination.totalNumberOfResults, t.PARAMS.pageNum);
					t.PARAMS.paging.goPage = function(targetPageNum){
						t.PARAMS.pageNum = targetPageNum;
						t.doWork();
					};
				}
				
			}
			
			clearInterval(chkTimer);
			
		}

	};

	this.setListHtml = function(){
		
		var sumListTag = null;
		if(t.PARAMS.jsonObjectData.results!=null){
			sumListTag = this.setRowHtml(t.PARAMS.jsonObjectData.results);
		}else{
			sumListTag = this.setRowHtml(t.PARAMS.jsonObjectData);
		}

		if(sumListTag!="") $(listArea).html(sumListTag);
		else $(listArea).html(t.PARAMS.defaultListHtml);
		
		this.afterSetAction();
	};

	
	
	/************오버라이드!!***********/
	this.setRowHtml = function(results){
	//이 함수는 각자 리스트에 맞게 반드시 오버라이드 하세요.
		
		var rows = "";
		
		$.each(results, function(){
			
			var listTag = '<tr>';
			listTag +=	'<td>'+this.code+'</td>';
			listTag +=	'<td>'+this.currency+'</td>';
			listTag +=	'<td>'+this.pk+'</td>';
			listTag +=	'<td>'+this.calculated+'</td>';
			listTag +=	'<td></td>';
			listTag +=	'<td></td>';
			listTag +=	'</tr>';
			
			rows +=listTag;
		});
		
		return rows;
		
	};
	
	this.searchAction = function(){
		
		t.PARAMS.pageNum = 1;
		t.doWork();
		
	}
	
	this.afterSetAction = function(){
		//혹시 리스트 셋팅 후에 처리해야하는 로직이 있을경우 이 함수 오버라이드해서 사용
	}



};

BoardListController.prototype = new CommonController();




String.prototype.trim = function() {
	return this.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
}



var BoardDetailController = function(){

};

BoardDetailController.prototype = new CommonController();









var LayerPopupController = function(layerId){

	/*
	params

	layerID
	x좌표, y좌표????????? 클릭 기준점???? (default  :  center)
	입력 내용 유지여부 true, false

	딱히 셋팅하는 부분 없이.

	openLayerPopup

	
	*/


	var PARAMS = {};
	PARAMS.layerId = layerId;
	PARAMS.layer = $("#"+PARAMS.layerId);


	this.openNewLayer = function(){

		var layerTag = '<div class="layerArea">';
		layerTag +='<div class="layerBg"></div> ';
		layerTag +='</div>';

		var thisLayer = $(layerTag).appendTo($('body')).append(PARAMS.layer.clone().show());

		$('.layerBg, .btn_close, .pop_cls').click(function(){
			thisLayer.remove();
		});
	};
	
	this.openNewLayerCenter = function(){

		var lp=($(window).width()-PARAMS.layer.width())/2;
		var tp=($(window).height()-PARAMS.layer.height())/2+$(window).scrollTop();
		
		if(lp<0) lp=0;
		if(tp<0) tp=0;
		
		PARAMS.layer.css("left",lp).css("top", tp).css("position", "absolute").css("z-index", 101);
		
		var layerTag = '<div class="layerArea">';
		layerTag +='<div class="layerBg"></div> ';
		layerTag +='</div>';

		var thisLayer = $(layerTag).appendTo($('body')).append(PARAMS.layer.show());

	};
	
};



/**
 * 
센터에 레이어 팝업 뜨는 함수
========================[example code]=======================
	layerPopup('레이어영역ID');
=============================================================
*
*/
var layerPopup = function(layerId){
	
	var PARAMS = {};
	PARAMS.layerId = layerId;
	PARAMS.layer = $("#"+PARAMS.layerId);


	this.openNewLayer = function(){

		var lp=($(window).width()-PARAMS.layer.width())/2;
		var tp=($(window).height()-PARAMS.layer.height())/2+$(window).scrollTop();
		if(lp<0) lp=0;
		if(tp<0) tp=0;
		
		var layer_width = PARAMS.layer.width();
		var layer_height = PARAMS.layer.height();
		var window_height = $(window).height();
		
		var scrollTop = $(window).scrollTop();
		if (isMobileDevice()) {
			PARAMS.layer.css('position', 'absolute').css('z-index', 101).css({'min-height':window_height+'px','overflow-y':'auto','top':0});
		} else {
			PARAMS.layer.css('position', 'absolute').css('z-index', 101).css({'height':window_height+'px','overflow-y':'auto','top':scrollTop});
		}
		
		var layerTag = '<div class="layerArea">';
		layerTag +='<div class="layerBg"></div> ';
		layerTag +='</div>';

		var thisLayer = $(layerTag).appendTo($('body')).append(PARAMS.layer.clone().show());
		
		if($('.layerBg:visible').length==1){
			if (isMobileDevice()) {
				$('body').scrollTop(0);
				$('.wrap').hide();
			} else {
				$(window).bind('scroll touchstart touchmove touchend', function(e){
					$('body').scrollTop(scrollTop);
				});
			}
		}
		
		thisLayer.find('.layerBg, .btn_close, .pop_cls, #backBtn, #cancelBtn').click(function(){
			if($('.layerBg:visible').length==1){
				$(window).unbind('scroll touchstart touchmove touchend');
			}
			$('body').css('overflow', '');
			if (isMobileDevice()) {
				$('.wrap').show();
				$('body').scrollTop(scrollTop);
			}
			thisLayer.remove();
		});
		return thisLayer;
	};
	
	return this.openNewLayer();
};


var halfLayerPopup = function(layerId){
	
	var PARAMS = {};
	PARAMS.layerId = layerId;
	PARAMS.layer = $("#"+PARAMS.layerId);


	this.openNewLayer = function(){

		var lp=($(window).width()-PARAMS.layer.width())/2;
		var tp=($(window).height()-PARAMS.layer.height())/2+$(window).scrollTop();
		if(lp<0) lp=0;
		if(tp<0) tp=0;

		var layer_width = PARAMS.layer.width();
		var layer_height = PARAMS.layer.height();
		var window_height = $(window).height();
		
		var scrollTop = $(window).scrollTop();
		PARAMS.layer.css("position", "absolute").css("z-index", 101).css("left", lp).css("height", "auto").css("overflow-y", "auto").css("top", scrollTop).css("top", "25%");

		var layerTag = '<div class="layerArea">';
		layerTag +='<div class="layerBg"></div> ';
		layerTag +='</div>';

		var thisLayer = $(layerTag).appendTo($('body')).append(PARAMS.layer.clone().show());
		$('body').css("cssText", " overflow:hidden !important");
		
		
		thisLayer.find('.layerBg, .btn_close, .pop_cls, #cancelBtn, #backBtn').click(function(){
			$('body').css('overflow', '');
			thisLayer.remove();
			PARAMS.layer.clone().hide();
		});
		
		return thisLayer;
	};
	
	return this.openNewLayer();
};


/**
 * 
========================[example code]=======================
	layerMemberPopup('레이어영역ID');
=============================================================
*
*/
var layerMemberPopup = function(layerId){
	
	var PARAMS = {};
	PARAMS.layerId = layerId;
	PARAMS.layer = $("#"+PARAMS.layerId);


	this.openNewLayer = function(){

		var lp=($(window).width()-PARAMS.layer.width())/2;
		var tp=($(window).height()-PARAMS.layer.height())/2+$(window).scrollTop();
		if(lp<0) lp=0;
		if(tp<0) tp=0;
		
		var layer_width = PARAMS.layer.width();
		var layer_height = PARAMS.layer.height();
		var window_height = $(window).height();
		var scrollTop = $(window).scrollTop();

		var layerTag = '<div class="layerArea" id="layerArea">';
		layerTag +='<div class="layerBg"></div> ';
		layerTag +='</div>';

		var thisLayer = $(layerTag).appendTo($('body')).append(PARAMS.layer.clone().show());
		$('body').css("cssText", " overflow:hidden !important");
		$("#layerArea").css("position", "absolute").css("z-index", 101).css("height", window_height).css("overflow-y", "auto").css("top", scrollTop);
		
		thisLayer.find('.layerBg, .btn_close, .pop_cls').click(function(){
			$('body').css('overflow', '');
			thisLayer.remove();
		});
		
		return thisLayer;
	};
	
	return this.openNewLayer();
		
};


/**
 * passwordControll
 * 패스워드관련 동작들 (compare:비교, save:저장)
 * 
 * *********************************[example Code]*************************************
 * 
 * 	var pwc = new passwordControll("compare", inputPw, prk);
 * 								division : "compare"(입력PW와 저장되어있는PW 비교), "save" (바뀐 패스워드를 저장)
 *		pwc.trueAction = function()
 *		{	
 *			//동작 성공시 실행할 로직들 추가
 *			alert("패스워드가 확인되었습니다.  또는	 패스워드를 저장하였습니다.");
 *		};
 *		pwc.falseAction = function()
 *		{	
 *			//동작 실패시 실행할 로직들 추가
 *			alert("패스워드를 확인하여 주십시오.  또는	 패스워드 저장에 실패하였습니다.");
 *		};
 * 	
 * 
 * *************************************************************************************
 * 
 * 
 */
var passwordControll = function(division, inputPW, prk){

	
	var t = this;

	this.trueAction = function(){
	};
	
	this.falseAction = function(){
	};
	
	var target_url  = $("#updateProfileForm").attr("action");
	var actionUrl = "";
	if(target_url.indexOf("ko/") > -1){
		actionUrl = "/ko/common/passwordControll";
	}else if(target_url.indexOf("en/") > -1){
		actionUrl = "/en/common/passwordControll";
	}else if(target_url.indexOf("zh/") > -1){
		actionUrl = "/zh/common/passwordControll";
	}else{
		actionUrl = "/common/passwordControll";
	}
	
	$.ajax({
		type:"GET",
		url:actionUrl,
		datatype:"json",
		data:{"division":division, "inputPW":inputPW, "prk":prk},
		success:function(response){
			if(response==true){
				t.trueAction();
			}else{
				t.falseAction();
			}
		},
		error:function(e){
			alert(e);
		}
	});
	
};



/*

입력값 널체크 및 숫자 체크

[formId : 체크할 폼의 아이디 , 필수값 아님. 값이 없는 경우 body태그를 기준으로 검사]

checkIdList를 배열형태로 셋팅해주면 해당 노드를 찾아서 검사.
아이디 뒤에 :num 이 붙은 경우에는 숫자인지 검사.

검사에 걸린 노드는 title 속성을 이용하여 에러메세지를 띄우기 때문에 검사 대상 태그에는 title 속정을 정의해주어야 함.

ex )     <input type="text" name="" id="id1" value="" title = "아이디" />

========================[example code]===========================

	var vc = new ValidationCheck();
	vc.checkIdList = ['id1:num','id2','id3', 'id4', 'id5'];
	console.log(vc.isValid());

=============================================================

*/

var ValidationCheck = function(formId){
	var t = this;

	this.checkIdList = null;

	var $form = $('#'+formId);
	if($form.length==0) $form = $('body');

	this.msgFn = function(msg){
		layerAlert(msg);
	}

	this.isValid = function(){

		var passed = true;
		
		$.each(this.checkIdList , function(){

			var thisId = this.split(':')[0];
			var thisType = this.split(':')[1];
			var $this = $form.find('#'+thisId);
			
			if($this.length===0){
				t.msgFn('필수 데이타가 존재하지 않습니다.');
				passed = false;
				return false;

			}

			if($this.attr('type')=='radio'){

				var nm = $this.attr('name');
				if($form.find('[name='+nm+']:checked').size()===0){
					passed = false;
				}

			}else if($this.attr('type')=='checkbox'){

				if($this.is(":checked")==false){
					passed = false;
				}

			}else{

				if($this.val().length===0) {
					passed = false;
				}else{
					if(thisType=='num'){
						if(!$.isNumeric($this.val()))	passed = false;
					}
				}
			}

			if(passed==false){
				t.msgFn($this.attr('title')+'을(를) 확인하세요.');
				return false;
			}
		});


		return passed;	
	};


};




/*
 * 
 * Id/Password Data Validation Check Function
 * 
 * 
 * ========================[example code]===========================

	inputDataValidationCheck('id');
	inputDataValidationCheck('password');

    =============================================================
 * 
 */

var inputDataValidationCheck = function(fid){
	var t = this;
	
	
	this.msgFn = function(msg){
		$('#'+fid).blur();
		layerAlert(msg)
	};
	this.notLockFn = function(){
		//default do nothing. but you can do something!
	};
	
	//$('#'+fid).keypress(inputDataCheck($('#'+fid).val()));
	$('#'+fid).keypress(function(event){
		var passed = true;
		var SamePass_0 = 0; // 동일문자 카운트
		var SamePass_1 = 0; // 연속성(+) 카운드
		var SamePass_2 = 0; // 연속성(-) 카운드
		
		var inputdata = $('#'+fid).val(); 
		

		for (var i = 0; i < inputdata.length; i++) {
			var chr_pass_0 = inputdata.charCodeAt(i - 3);
			var chr_pass_1 = inputdata.charCodeAt(i - 2);
			var chr_pass_2 = inputdata.charCodeAt(i - 1);

			if (i > 2) {
				// 동일문자 카운트
				if ((chr_pass_0 == chr_pass_1) && (chr_pass_1 == chr_pass_2)) {
					SamePass_0++;
				} else {
					SamePass_0 = 0;
				}

				// 연속성(+) 카운드
				if (chr_pass_0 - chr_pass_1 == 1 && chr_pass_1 - chr_pass_2 == 1) {
					SamePass_1++;
				} else {
					SamePass_1 = 0;
				}

				// 연속성(-) 카운드
				if (chr_pass_0 - chr_pass_1 == -1 && chr_pass_1 - chr_pass_2 == -1) {
					SamePass_2++;
				} else {
					SamePass_2 = 0;
				}
			}

			if (SamePass_0 > 0) {
				t.msgFn("동일문자를 4번 이상 사용할 수 없습니다.");
				$('#'+fid).text(inputdata.substring(0,inputdata.length - 2));
				console.log(inputdata);
				return false;
				
			}else {
				t.notLockFn();
			}

			if (SamePass_1 > 0 || SamePass_2 > 0) {
				t.msgFn("연속된 문자열(1234 또는 4321, abcd, dcba 등)을 4자리이상 올 수 없습니다.");
				$('#'+fid).text(inputdata.substring(0,inputdata.length - 1));
				return false;
			}else {
				t.notLockFn();
			}
			/*if (!passed) {
				break;
			}*/
		}
		/*if (pw_passed) {
			pw_msg = "<span class='color:blue;'>* 사용할 수 있는 비밀번호입니다.</span>";
			$("#pw_cert_view").html(pw_msg);
		}*/
		
	})
}


/*
 * 
 * <Caps Lock> Check Function
 * 
 * 
 * ========================[example code]===========================
 * 
 * capsLockCheck('id');
 * 
 * =============================================================
 * 
 */
var capsLockCheck = function(fid){
	var t = this;
	
	this.msgFn = function(msg){
		$('#'+fid).blur();
        var la = new layerAlert(msg);
        la.confirmAction = function(){//확인 버튼 클릭시 추가 호출 펑션
        };
	};
	this.notLockFn = function(){
		//default do nothing. but you can do something!
	};
	
	$('#'+fid).keypress(function(event){
		if(capsLock(event)){
			//t.msgFn("&lt;CapsLock&gt;이 켜져 있습니다.");
			//return false;
		}else{
			t.notLockFn();
		}
	})
}


var capsLock = function(e){
	
	 var keyCode = 0;
	  var shiftKey=false;
	  keyCode=e.keyCode;
	  shiftKey=e.shiftKey;
	  if (((keyCode >= 65 && keyCode <= 90)&& !shiftKey)||((keyCode >= 97 && keyCode <= 122)&& shiftKey))
	  {
		  return true;
	  }else{
		  return false;
	  }
}



/*
 * 
 * 쿠키 가져오기 (리턴값)
 * 
 * 
 * 
 */
var getCookie = function ( cookieName )
{
	 var search = cookieName + "=";
	 var cookie = document.cookie;

	 // 현재 쿠키가 존재할 경우
	 if( cookie.length > 0 )
	 {
	  // 해당 쿠키명이 존재하는지 검색한 후 존재하면 위치를 리턴.
	  startIndex = cookie.indexOf( cookieName );

	  // 만약 존재한다면
	  if( startIndex != -1 )
	  {
	   // 값을 얻어내기 위해 시작 인덱스 조절
	   startIndex += cookieName.length;

	   // 값을 얻어내기 위해 종료 인덱스 추출
	   endIndex = cookie.indexOf( ";", startIndex );

	   // 만약 종료 인덱스를 못찾게 되면 쿠키 전체길이로 설정
	   if( endIndex == -1) endIndex = cookie.length;

	   // 쿠키값을 추출하여 리턴
	   return unescape( cookie.substring( startIndex + 1, endIndex ) );
	  }
	  else
	  {
	   // 쿠키 내에 해당 쿠키가 존재하지 않을 경우
	   return false;
	  }
	 }
	 else
	 {
	  // 쿠키 자체가 없을 경우
	  return false;
	 }
}



/*
 * 쿠키 가져오고 삭제하기
 * 
 * */
var getCookieAndDelete = function ( cookieName )
{
	 var search = cookieName + "=";
	 var cookie = document.cookie;

	 if( cookie.length > 0 )
	 {
	  startIndex = cookie.indexOf( cookieName );

	  if( startIndex != -1 )
	  {
	   startIndex += cookieName.length;

	   endIndex = cookie.indexOf( ";", startIndex );

	   if( endIndex == -1) endIndex = cookie.length;

	   
	   var cookieValue = unescape( cookie.substring( startIndex + 1, endIndex ) ); 
	   
	   var expireDate = new Date();
	   expireDate.setDate( expireDate.getDate() - 1 );
	   document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
	   
	   return cookieValue;
	  }
	 }
}



var getMarginTop = function(layerHeight){
	
//	var winHeight = $(window).height();
	var winHeight = window.innerHeight || $(window).innerHeight();
	var marginTop = (winHeight-layerHeight)/2;
	return marginTop+$(window).scrollTop();
}





/**
 * 
 * 우편번호 찾기 레이어팝업 기능
 *
 * *********************************[example Code]*************************************
 * 
 * 	searchAddrLayer('address1', 'address2', 'zipCode');
 * 				주소1필드아이디, 주소2필드아이디, 우편번호필드아이디			
 * 
 * *************************************************************************************
 * 
 * */

var searchAddrLayer = function(addr1, addr2, zipcode){
	
	var t = this;
	
	var addressLayerTag = '<div class="popwrap w_type_2" style="margin:auto;z-index:150">                                                                             ' ;
		addressLayerTag += '<!-- Nav -->' ;
		addressLayerTag += '<div class="nav_wrap">' ;
		addressLayerTag += '	<button class="btn back" id="backBtn">back</button>' ;
		addressLayerTag += '	<div class="nav">' ;
		addressLayerTag += '		<h2>우편번호찾기</h2>' ;
		addressLayerTag += '	</div>' ;
		addressLayerTag += '</div>' ;
		addressLayerTag += '	<!-- //Nav -->' ;
		addressLayerTag += '	<nav class="w2">' ;
		addressLayerTag += '		<ul>' ;
		addressLayerTag += '			<li><a href="javascript:void(0);" class="on" id="lotBox" ><span>지번주소로 찾기</span></a></li>' ;
		addressLayerTag += '			<li><a href="javascript:void(0);" id="roadBox" ><span>도로명주소로 찾기</span></a></li>' ;
		addressLayerTag += '		</ul>' ;
		addressLayerTag += '	</nav>' ;
		addressLayerTag += '	<!-- CNT -->' ;
		addressLayerTag += '	<div class="cnt_wrap">' ;
		addressLayerTag += '		<form id="addrSearchForm">' ;	
		addressLayerTag += '		<div class="cnt lotBox">' ;
		addressLayerTag += '			<p class="tlt_nl"><label for="post">지역명 (동/읍/면/리)</label></p>' ;
		addressLayerTag += '				<div class="sh_wrap">' ;
		addressLayerTag += '					<input title="주소1" name="dong" id="lotSearch" placeholder="청담동" class="input" type="text">' ;
		addressLayerTag += '					<a href="javascript:void(0);" class="btn gray" id="lotSearchBtn">검색</a>' ;
		addressLayerTag += '				</div>' ;
		addressLayerTag += '			<p class="txt">예) 역삼동, 내수읍, 초정리</p>' ;
		addressLayerTag += '		</div>' ;
		addressLayerTag += '		<div class="cnt roadBox">' ;
		addressLayerTag += '			<div class="street_adr">' ;
		addressLayerTag += '				<p class="tlt_nl"><label for="street_adr1">시/도</label></p>' ;
		addressLayerTag += '					<select title="시/도 선택" id="city" name="city">' ;
		addressLayerTag += '						<option value="">선택</option> ';
		addressLayerTag += '						<option value="강원도">강원도</option> ';
		addressLayerTag += '						<option value="경기도">경기도</option> ';
		addressLayerTag += '						<option value="경상남도">경상남도</option> ';
		addressLayerTag += '						<option value="경상북도">경상북도</option> ';
		addressLayerTag += '						<option value="광주광역시">광주광역시</option> ';
		addressLayerTag += '						<option value="대구광역시">대구광역시</option> ';
		addressLayerTag += '						<option value="대전광역시">대전광역시</option> ';
		addressLayerTag += '						<option value="부산광역시">부산광역시</option> ';
		addressLayerTag += '						<option value="서울특별시">서울특별시</option> ';
		addressLayerTag += '						<option value="세종특별자치시">세종특별자치시</option> ';
		addressLayerTag += '						<option value="울산광역시">울산광역시</option> ';
		addressLayerTag += '						<option value="인천광역시">인천광역시</option> ';
		addressLayerTag += '						<option value="전라남도">전라남도</option> ';
		addressLayerTag += '						<option value="전라북도">전라북도</option> ';
		addressLayerTag += '						<option value="제주특별자치도">제주특별자치도</option> ';
		addressLayerTag += '						<option value="충청남도">충청남도</option> ';
		addressLayerTag += '						<option value="충청북도">충청북도</option> ';
		addressLayerTag += '					</select>' ;
		addressLayerTag += '			</div>' ;
		addressLayerTag += '			<div class="street_adr fl_rt">' ;
		addressLayerTag += '				<p class="tlt_nl"><label for="street_adr2">시/군/구</label></p>' ;
		addressLayerTag += '					<select title="시/군/구 선택" id="sigungu" name="sigungu">' ;
		addressLayerTag += '						<option value="">선택</option>' ;
		addressLayerTag += '					</select>' ;
		addressLayerTag += '			</div>' ;
		addressLayerTag += '			<p class="tlt_nl"><label for="street_adr3">도로명주소</label></p>' ;
		addressLayerTag += '			<div class="sh_wrap">' ;
		addressLayerTag += '				<input title="주소1" id="roadName" name="roadName" placeholder="충정로" class="input" type="text">' ;
		addressLayerTag += '				<a href="javascript:void(0);" class="btn gray" id="roadSearchBtn">검색</a>' ;
		addressLayerTag += '			</div>' ;
		addressLayerTag += '			<p class="txt">예) 충정로, 신대방13길</p>' ;
		addressLayerTag += '			<p class="txt pt_txt"><span class="reqd">*</span> 시/도 및 시/군/구를 먼저 선택 후 도로명주소를 입력해주세요.</p>' ;
		addressLayerTag += '		</div>' ;
		addressLayerTag += '		</form>																								';
		addressLayerTag += '		<!--address wrap-->' ;
		addressLayerTag += '		<div class="adres_wrap" >' ;
		addressLayerTag += '			<div class="sel">' ;
		addressLayerTag += '				<p>주소를 터치 하시면 자동으로 주소가 선택 됩니다.</p>' ;
		addressLayerTag += '				<span  id="resultTotalNumber">검색 : <em class="pt_txt" >105건</em></span>' ;
		addressLayerTag += '			</div>' ;
		addressLayerTag += '			<!--title-->' ;
		addressLayerTag += '			<div class="tlt">' ;
		addressLayerTag += '				<p>주소</p>' ;
		addressLayerTag += '				<p>우편번호</p>' ;
		addressLayerTag += '			</div>' ;
		addressLayerTag += '			<!--//title-->' ;
		addressLayerTag += '			<!--no data-->' ;
		addressLayerTag += '			<div class="list nodata" id="noDataBox">' ;
		addressLayerTag += '				<p>주소를 검색해주세요.</p>' ;
		addressLayerTag += '			</div>' ;
		addressLayerTag += '		<!--//no data-->' ;
		addressLayerTag += '		<!--data-->' ;
		addressLayerTag += '		<!--list-->' ;
		addressLayerTag += '		<div class="list" id="dataBox">' ;
		addressLayerTag += '			<ul id="addrResultList">' ;
		addressLayerTag += '				<li>' ;
		addressLayerTag += '					<a href="#;">' ;
		addressLayerTag += '						<span>서울시 동작구 신대방1동 500-123</span>' ;
		addressLayerTag += '						<span>12345</span>' ;
		addressLayerTag += '					</a>' ;
		addressLayerTag += '				</li>' ;
		addressLayerTag += '			</ul>' ;
		addressLayerTag += '		</div>' ;
		addressLayerTag += '		<!--//list-->' ;
		addressLayerTag += '		<!--detail-->' ;
		addressLayerTag += '		<div class="detail">' ;
		addressLayerTag += '			<p>상세주소 입력</p>' ;
		addressLayerTag += '			<input title="주소" id="areaAddr" value="" class="input" type="text" readOnly>' ;
		addressLayerTag += '			<input title="나머지 주소" id="detailAddr" placeholder="나머지 주소 입력" class="input next" type="text">' ;
		addressLayerTag += '			<input type="hidden" id="zc" value="" style="width:100%" title="주소" />                           ' ;
		addressLayerTag += '		</div>' ;
		addressLayerTag += '		<!--//detail-->' ;
		addressLayerTag += '		<div class="btn_wrap lst">' ;
		addressLayerTag += '			<a href="javascript:void(0);" class="btn gray" id="applyBtn">확인</a>' ;
		addressLayerTag += '		</div>' ;
		addressLayerTag += '	<!--//data-->' ;
		addressLayerTag += '	</div>' ;
		addressLayerTag += '	<!--//address wrap-->' ;
		addressLayerTag += '	</div>' ;
		addressLayerTag += '	<!-- //CNT -->                                                                                        ' ;
		addressLayerTag += '	</div>' ;
	
	var $thisLayer = null;	
	
	this.openNewLayer = function(){
		var layer_height =$(window).height();
		
		var layerTag = '<div class="layerArea">';
		layerTag +='<div class="layerBg"></div> ';
		layerTag +='</div>';

		$thisLayer = $(layerTag).appendTo($('body')).append(addressLayerTag);
		
		
//		console.log('layer_height : '+layer_height);
//		$thisLayer.find('.popwrap').css('marginTop', getMarginTop(769));
		
		var scrollTop = $(window).scrollTop();
		$thisLayer.find('.popwrap').css("height", layer_height).css("overflow-y", "auto").css("top", scrollTop);
		
		//$('body').css("cssText", " overflow:hidden !important");
		
		if($('.layerBg:visible').length==1){
			if (isMobileDevice()) {
				$('body').scrollTop(0);
				$('.wrap').hide();
			} else {
				$(window).bind('scroll touchstart touchmove touchend', function(e){
					$('body').scrollTop(scrollTop);
				});
			}
		} else {
			$('.wrap').show();
		}

		$thisLayer.find('.layerBg, #backBtn').click(function(){
			
			if($('.layerBg:visible').length==1){
				$(window).unbind('scroll touchstart touchmove touchend');
			}
			$('.wrap').show();
			$thisLayer.remove();
		});
		
		
		$thisLayer.find('#lotBox, #roadBox').click(function(){
			var tid = $(this).attr('id');
			
			$thisLayer.find('.cnt').hide();
			$thisLayer.find('.'+tid).show();
			
			$('#dataBox').hide();
			$('#noDataBox').show();
			
			
			$thisLayer.find('#lotBox, #roadBox').removeClass('on');
			$thisLayer.find('#resultTotalNumber').text('검색 : 0건');
			$(this).addClass('on');
			
		});
		
		$thisLayer.find('#lotBox').click();
		
		
		$thisLayer.find("#lotSearchBtn").click(function(){
			var vc = new ValidationCheck();
			vc.checkIdList = ['lotSearch'];
			if(vc.isValid()){
				getLotDatas();
			}
		});
		
		$("#lotSearch").keypress(function( event ) {
			if ( event.which == 13 ) {
				event.preventDefault();
				$thisLayer.find("#lotSearchBtn").click();
				$(this).blur();
			}
		});
		
		$thisLayer.find("#roadSearchBtn").click(function(){
			var vc = new ValidationCheck();
			vc.checkIdList = ['city', 'sigungu', 'roadName'];
			if(vc.isValid()){
				getRoadDatas();
			}
		});
		
		$("#roadName").keypress(function( event ) {
			if ( event.which == 13 ) {
				event.preventDefault();
				$thisLayer.find("#roadSearchBtn").click();
				$(this).blur();
			}
		});
		
		
		$thisLayer.find("#city").change(function(){
			$.ajax({
				type:"GET",
				url:"/common/getsigungu?city="+$thisLayer.find("#city").val(),
				success:function(response){
					
					$thisLayer.find("#sigungu").html('<option value="">선택</option>');
					
					$.each(response, function(){
						
						$thisLayer.find("#sigungu").append('<option value="'+this+'">'+this+'</option>');
						
					});
					
				},
				error:function(e){
					console.log(e);
				}
			});
		});
		
		
		
		$thisLayer.find("#applyBtn").click(function(){
			
			var vc = new ValidationCheck();
			vc.checkIdList = ['areaAddr', 'detailAddr', 'zc'];
			if(vc.isValid()){
				$('#'+addr1).val($thisLayer.find('#areaAddr').val());
				$('#'+addr2).val($thisLayer.find('#detailAddr').val());
				$('#'+zipcode).val($thisLayer.find('#zc').val());
				
				if($('.layerBg:visible').length==1){
					$(window).unbind('scroll touchstart touchmove touchend');
				}
				$('.wrap').show();
				$thisLayer.remove();
			}
			
		});
		
	};
	
	
	var getLotDatas = function(){
		
		$.ajax({
			type:"GET",
			url:"/common/getlotaddrlist",
			data:$("#addrSearchForm").serialize(),
			success:function(response){
				
				$thisLayer.find('#resultTotalNumber').text('검색 : '+response.length+'건');
				
				var listTags = "";
					
				$.each(response, function(){
					
					var row = this.city + ' ' + this.siGunGu + ' ' + this.eupMyunDong;
					
					if(this.mountainYN=='1') row +=' 산';
					
					row += ' ' + this.startMainLotNumber;
					var ssln =  '';
					if(this.startSubLotNumber!='0'){ ssln = '-' + this.startSubLotNumber;}
					row += ssln;
					var eln = '';
					if(this.endMainLotNumber!=null){
						eln += ' ~ '+this.endMainLotNumber;
						if(this.endSubLotNumber!='0'){
							eln +='-'+this.endSubLotNumber;
						}
					}
					
					row +=eln;
					
					row = '<li class="addrListSelect"><a href="javascript:void(0);" class="clearfix"><span class="float_left">'+row+'</span><span class="float_right">'+this.zoneNumber+'</span></a></li>';
					
					listTags += row;
				});
					
				
				setListTag(listTags);
			},
			error:function(e){
				console.log(e);
			}
		})
		
	};
	
	var getRoadDatas = function(){
		
		$.ajax({
			type:"GET",
			url:"/common/getroadaddrlist",
			data:$("#addrSearchForm").serialize(),
			success:function(response){
				
				$thisLayer.find('#resultTotalNumber').text('검색 : '+response.length+'건');
				var listTags = "";
				
					
				$.each(response, function(){
					
					var row = this.city + ' ' + this.siGunGu;
					
					if(this.eupMyun!=null) row += ' ' + this.eupMyun;
					
					if(this.undergroundyn == '1') row += ' 지하';
					
					row += ' ' + this.roadName;
					
					row += ' ' + this.startBuildingOriginNo;
					
					if(this.startBuildingViceNo != '0') row+='-'+this.startBuildingViceNo;
					
					if(this.endBuildingOriginNo != null){
						row += ' ~ '+this.endBuildingOriginNo
						
						if(this.endBuildingViceNo != '0') row +='-'+this.endBuildingViceNo;
					}
					
					if(this.scopeKind=='1') row +='(홀수)';
					else if(this.scopeKind=='2') row +='(짝수)';
					
					row = '<li class="addrListSelect"><a href="javascript:void(0);" class="clearfix"><span class="float_left">'+row+'</span><span class="float_right">'+this.zoneNumber+'</span></a></li>';
					
					listTags += row;
					
				});
				
				setListTag(listTags);
			},
			error:function(e){
				console.log(e);
			}
		})
		
	};
	
	var setListTag = function(listTags){
		
		$thisLayer.find('#addrResultList').html('');
		$thisLayer.find('#addrResultList').append(listTags);
		
		$thisLayer.find('#noDataBox').hide();
		$thisLayer.find('#dataBox').show();
		
		$thisLayer.find('#areaAddr').val('');
		$thisLayer.find('#detailAddr').val('');
		
		$thisLayer.find('.addrListSelect').click(function(){
			
			$thisLayer.find('#areaAddr').val($(this).find('span.float_left').text());
			$thisLayer.find('#zc').val($(this).find('span.float_right').text());
			
		});
	};
	
	
	this.openNewLayer();
	
};





/**
 * 
 * 우편번호 찾기 레이어팝업 기능 NEW!!!!!!!!!!!!!!!
 *
 * *********************************[example Code]*************************************
 * 
 * 	searchAddressLayer('address1', 'address2', 'zipCode');
 * 				주소1필드아이디, 주소2필드아이디, 우편번호필드아이디			
 * 
 * *************************************************************************************
 * 
 * */

var searchAddressLayer = function(addr1, addr2, zipcode){
	
	var t = this;
	
	var addressLayerTag = '<div class="popwrap w_type_2" style="margin:auto;z-index:150">                                                                             ' ;
		addressLayerTag += '<!-- Nav -->' ;
		addressLayerTag += '<div class="nav_wrap">' ;
		addressLayerTag += '	<button class="btn back" id="backBtn">back</button>' ;
		addressLayerTag += '	<div class="nav">' ;
		addressLayerTag += '		<h2>우편번호찾기</h2>' ;
		addressLayerTag += '	</div>' ;
		addressLayerTag += '</div>' ;
		addressLayerTag += '	<!-- //Nav -->' ;
		addressLayerTag += '	<nav class="w2">' ;
		addressLayerTag += '		<ul>' ;
		addressLayerTag += '			<li><a href="javascript:void(0);" class="on" id="lotBox" ><span>지번주소로 찾기</span></a></li>' ;
		addressLayerTag += '			<li><a href="javascript:void(0);" id="roadBox" ><span>도로명주소로 찾기</span></a></li>' ;
		addressLayerTag += '		</ul>' ;
		addressLayerTag += '	</nav>' ;
		addressLayerTag += '	<!-- CNT -->' ;
		addressLayerTag += '	<div class="cnt_wrap">' ;
		addressLayerTag += '		<form id="addrSearchForm">' ;	
		addressLayerTag += '		<div class="cnt lotBox">' ;
		addressLayerTag += '			<p class="tlt_nl"><label for="post">지역명 (동/읍/면/리)</label></p>' ;
		addressLayerTag += '				<div class="sh_wrap">' ;
		addressLayerTag += '					<input title="주소1" name="dong" id="lotSearch" placeholder="청담동" class="input" type="text" />' ;
		addressLayerTag += '					<a href="javascript:void(0);" class="btn gray" id="lotSearchBtn">검색</a>' ;
		addressLayerTag += '				</div>' ;
		addressLayerTag += '			<p class="txt">예) 역삼동, 내수읍, 초정리</p>' ;
		addressLayerTag += '		</div>' ;
		addressLayerTag += '		<div class="cnt roadBox">' ;
		addressLayerTag += '			<div class="street_adr">' ;
		addressLayerTag += '				<p class="tlt_nl"><label for="street_adr1">시/도</label></p>' ;
		addressLayerTag += '					<select title="시/도 선택" id="city" name="city">' ;
		addressLayerTag += '						<option value="">선택</option> ';
		addressLayerTag += '						<option value="강원도">강원도</option> ';
		addressLayerTag += '						<option value="경기도">경기도</option> ';
		addressLayerTag += '						<option value="경상남도">경상남도</option> ';
		addressLayerTag += '						<option value="경상북도">경상북도</option> ';
		addressLayerTag += '						<option value="광주광역시">광주광역시</option> ';
		addressLayerTag += '						<option value="대구광역시">대구광역시</option> ';
		addressLayerTag += '						<option value="대전광역시">대전광역시</option> ';
		addressLayerTag += '						<option value="부산광역시">부산광역시</option> ';
		addressLayerTag += '						<option value="서울특별시">서울특별시</option> ';
		addressLayerTag += '						<option value="세종특별자치시">세종특별자치시</option> ';
		addressLayerTag += '						<option value="울산광역시">울산광역시</option> ';
		addressLayerTag += '						<option value="인천광역시">인천광역시</option> ';
		addressLayerTag += '						<option value="전라남도">전라남도</option> ';
		addressLayerTag += '						<option value="전라북도">전라북도</option> ';
		addressLayerTag += '						<option value="제주특별자치도">제주특별자치도</option> ';
		addressLayerTag += '						<option value="충청남도">충청남도</option> ';
		addressLayerTag += '						<option value="충청북도">충청북도</option> ';
		addressLayerTag += '					</select>' ;
		addressLayerTag += '			</div>' ;
		addressLayerTag += '			<div class="street_adr fl_rt">' ;
		addressLayerTag += '				<p class="tlt_nl"><label for="street_adr2">시/군/구</label></p>' ;
		addressLayerTag += '					<select title="시/군/구 선택" id="sigungu" name="sigungu">' ;
		addressLayerTag += '						<option value="">선택</option>' ;
		addressLayerTag += '					</select>' ;
		addressLayerTag += '			</div>' ;
		addressLayerTag += '			<p class="tlt_nl">' ;
		addressLayerTag += '				<input name="searchType" id="st_name" class="radio" checked="checked" type="radio" value="roadName" />' ;
		addressLayerTag += '				<label for="st_name" class="radio_txt ml0">도로명</label>' ;
		addressLayerTag += '				<input name="searchType" id="build_name" class="radio" type="radio" value="buildName" />' ;
		addressLayerTag += '				<label for="build_name" class="radio_txt">건물(아파트)명</label>' ;
		addressLayerTag += '			</p>';
		addressLayerTag += '			<p class="tlt_nl"><label for="street_adr3">도로명주소</label></p>' ;
		addressLayerTag += '			<div class="sh_wrap">' ;
		addressLayerTag += '				<input title="주소1" id="roadName" name="roadName" placeholder="예) 도산대로" class="input" type="text">' ;
		addressLayerTag += '				<a href="javascript:void(0);" class="btn gray" id="roadSearchBtn">검색</a>' ;
		addressLayerTag += '			</div>' ;
		//addressLayerTag += '			<p class="txt">예) 충정로, 신대방13길</p>' ;
		addressLayerTag += '			<p class="txt pt_txt"><span class="reqd">*</span> 시/도 및 시/군/구를 먼저 선택 후 도로명주소를 입력해주세요.</p>' ;
		addressLayerTag += '		</div>' ;
		addressLayerTag += '		</form>																								';
		addressLayerTag += '		<!--address wrap-->' ;
		addressLayerTag += '		<div class="adres_wrap" >' ;
		addressLayerTag += '			<div class="sel">' ;
		addressLayerTag += '				<p>주소를 터치 하시면 자동으로 주소가 선택 됩니다.</p>' ;
		addressLayerTag += '				<span  id="resultTotalNumber">검색 : <em class="pt_txt" >105건</em></span>' ;
		addressLayerTag += '			</div>' ;
		addressLayerTag += '			<!--title-->' ;
		addressLayerTag += '			<div class="tlt">' ;
		addressLayerTag += '				<p>주소</p>' ;
		addressLayerTag += '				<p>우편번호</p>' ;
		addressLayerTag += '			</div>' ;
		addressLayerTag += '			<!--//title-->' ;
		addressLayerTag += '			<!--no data-->' ;
		addressLayerTag += '			<div class="list nodata" id="noDataBox">' ;
		addressLayerTag += '				<p>주소를 검색해주세요.</p>' ;
		addressLayerTag += '			</div>' ;
		addressLayerTag += '		<!--//no data-->' ;
		addressLayerTag += '		<!--data-->' ;
		addressLayerTag += '		<!--list-->' ;
		addressLayerTag += '		<div class="list" id="dataBox">' ;
		addressLayerTag += '			<ul id="addrResultList">' ;
		addressLayerTag += '				<li>' ;
		addressLayerTag += '					<a href="#;">' ;
		addressLayerTag += '						<span>서울시 동작구 신대방1동 500-123</span>' ;
		addressLayerTag += '						<span>12345</span>' ;
		addressLayerTag += '					</a>' ;
		addressLayerTag += '				</li>' ;
		addressLayerTag += '			</ul>' ;
		addressLayerTag += '		</div>' ;
		addressLayerTag += '		<!--//list-->' ;
		addressLayerTag += '		<!--detail-->' ;
		addressLayerTag += '		<div class="detail">' ;
		addressLayerTag += '			<p>상세주소 입력</p>' ;
		addressLayerTag += '			<input title="주소" id="areaAddr" value="" class="input" type="text" readOnly>' ;
		addressLayerTag += '			<input title="나머지 주소" id="detailAddr" placeholder="나머지 주소 입력" class="input next" type="text">' ;
		addressLayerTag += '			<input type="hidden" id="zc" value="" style="width:100%" title="주소" />                           ' ;
		addressLayerTag += '		</div>' ;
		addressLayerTag += '		<!--//detail-->' ;
		addressLayerTag += '		<div class="btn_wrap lst">' ;
		addressLayerTag += '			<a href="javascript:void(0);" class="btn gray" id="applyBtn">확인</a>' ;
		addressLayerTag += '		</div>' ;
		addressLayerTag += '	<!--//data-->' ;
		addressLayerTag += '	</div>' ;
		addressLayerTag += '	<!--//address wrap-->' ;
		addressLayerTag += '	</div>' ;
		addressLayerTag += '	<!-- //CNT -->                                                                                        ' ;
		addressLayerTag += '	</div>' ;
	
	var $thisLayer = null;	
	
	this.openNewLayer = function(){
		var layer_height =$(window).height();
		
		var layerTag = '<div class="layerArea">';
		layerTag +='<div class="layerBg"></div> ';
		layerTag +='</div>';

		$thisLayer = $(layerTag).appendTo($('body')).append(addressLayerTag);
		
		
//		console.log('layer_height : '+layer_height);
//		$thisLayer.find('.popwrap').css('marginTop', getMarginTop(769));
		
		var scrollTop = $(window).scrollTop();
		$thisLayer.find('.popwrap').css("height", layer_height).css("overflow-y", "auto").css("top", scrollTop);
		
		//$('body').css("cssText", " overflow:hidden !important");
		
		if($('.layerBg:visible').length==1){
			if (isMobileDevice()) {
				$('body').scrollTop(0);
				$('.popwrap').css('top', 0);//2016.02.24 Eddie
				$('.wrap').hide();
			} else {
				$(window).bind('scroll touchstart touchmove touchend', function(e){
					$('body').scrollTop(scrollTop);
				});
			}
		} else {
			$('.wrap').show();
		}

		$thisLayer.find('.layerBg, #backBtn').click(function(){
			
			if($('.layerBg:visible').length==1){
				$(window).unbind('scroll touchstart touchmove touchend');
			}
			$('.wrap').show();
			$thisLayer.remove();
		});
		
		
		$thisLayer.find('#lotBox, #roadBox').click(function(){
			
			var tid = $(this).attr('id');
			
			$thisLayer.find('.cnt').hide();
			$thisLayer.find('.'+tid).show();
			
			$('#dataBox').hide();
			$('#noDataBox').show();
			
			
			$thisLayer.find('#lotBox, #roadBox').removeClass('on');
			$thisLayer.find('#resultTotalNumber').text('검색 : 0건');
			$(this).addClass('on');
			
		})
		
		$thisLayer.find('#roadBox').click();
		
		
		$thisLayer.find("#lotSearchBtn").click(function(){
			var vc = new ValidationCheck();
			vc.checkIdList = ['lotSearch'];
			if(vc.isValid()){
				getLotDatas();
			}
		});
		
		$("#lotSearch").keypress(function( event ) {
			if ( event.which == 13 ) {
				event.preventDefault();
				$thisLayer.find("#lotSearchBtn").click();
				$(this).blur();
			}
		});
		
		$thisLayer.find("#st_name").click(function(){
			$thisLayer.find("#roadName").attr("placeholder", "예) 도산대로");
		});
		
		$thisLayer.find("#build_name").click(function(){
			$thisLayer.find("#roadName").attr("placeholder", "예) 청담자이아파트");
		});
		
		
		$thisLayer.find("#roadSearchBtn").click(function(){
			var vc = new ValidationCheck();

			if($thisLayer.find("#sigungu option").length==1){
				vc.checkIdList = ['city', 'roadName'];
			}else{
				vc.checkIdList = ['city', 'sigungu', 'roadName'];
			}
			
			if(vc.isValid()){
				getRoadDatas();
			}
		});
		
		$("#roadName").keypress(function( event ) {
			if ( event.which == 13 ) {
				event.preventDefault();
				$thisLayer.find("#roadSearchBtn").click();
				$(this).blur();
			}
		});
		
		
		$thisLayer.find("#city").change(function(){
			
			if($(this).val()=='세종특별자치시'){
				$thisLayer.find("#sigungu").html('<option value="">없음</option>');
			}else{
				$.ajax({
					type:"GET",
					url:"/common/searchsigungu?city="+$thisLayer.find("#city").val(),
					success:function(response){

						$thisLayer.find("#sigungu").html('<option value="">선택</option>');
						
						$.each(response, function(){
							$thisLayer.find("#sigungu").append('<option value="'+this+'">'+this+'</option>');
						});
						
					},
					error:function(e){
						console.log(e);
					}
				});
			}
			
		});
		
		
		
		$thisLayer.find("#applyBtn").click(function(){
			if($("#athome_svc").length > 0){
				var checkCode = $thisLayer.find('#zc').val().substring(0,3);

				//20.02.11 - 강동구 추가
				//18.03.26 - 영등포구, 동작구 추가 
				//17.12 - 용산/마포구 추가
				if("060,061,062,063,065,066,067,068,055,056,057,058,039,040,041,042,043,044,069,070,072,073,074,052,053,054".indexOf(checkCode) > -1){
					if($(".athome_adr").length > 0){
						var tempAddr = $thisLayer.find('#areaAddr').val().split(" ");
						if( $thisLayer.find('#areaAddr').val().length > 0 ){
						    $(".athome_adr").html(tempAddr[0]+" "+tempAddr[1]+" "+tempAddr[2]);
						}
					}
					$('#'+addr1).val($thisLayer.find('#areaAddr').val());
					$('#'+addr2).val($thisLayer.find('#detailAddr').val());
					$('#'+zipcode).val($thisLayer.find('#zc').val());
					
					$('#'+addr1).change();
					$('#'+addr2).change();
					$('#'+zipcode).change();
					
					if($('.layerBg:visible').length==1){
						$(window).unbind('scroll touchstart touchmove touchend');
					}
					
					$('body').css('overflow', '');
					$thisLayer.remove();
					$('.wrap').show();
				}else{
					layerHtml = '앳홈 서비스 불가능 지역 입니다.<br />(강남구/강동구/동작구/마포구<br />/서초구/영등포구/용산구 한정)';//17.12 - 용산/마포구 추가
					layerAlert(layerHtml);					
					
				}
			}else{
				var vc = new ValidationCheck();
				vc.checkIdList = ['areaAddr', 'detailAddr', 'zc'];
				if(vc.isValid()){
					$('#'+addr1).val($thisLayer.find('#areaAddr').val());
					$('#'+addr2).val($thisLayer.find('#detailAddr').val());
					$('#'+zipcode).val($thisLayer.find('#zc').val());
					
					$('#'+addr1).change();
					$('#'+addr2).change();
					$('#'+zipcode).change();
					
					if($('.layerBg:visible').length==1){
						$(window).unbind('scroll touchstart touchmove touchend');
					}
					
					$('body').css('overflow', '');
					$thisLayer.remove();
					$('.wrap').show();
				}
			}
		});
	};
	
	
	var getLotDatas = function(){
		
		$.ajax({
			type:"GET",
			url:"/common/searchlotaddrlist",
			data:$("#addrSearchForm").serialize(),
			success:function(response){
				
				$thisLayer.find('#resultTotalNumber').text('검색 : '+response.length+'건');
				
				var listTags = "";
					
				$.each(response, function(){
					
					var row = '<li class="addrListSelect"><a href="javascript:void(0);" class="clearfix"><span class="float_left">'+this.addrDisp+'</span><span class="addrIn" style="display:none;" >'+this.addrIn+'</span><span class="float_right">'+this.zipCd+'</span></a></li>';
					
					listTags += row;
				});
					
				
				setListTag(listTags);
			},
			error:function(e){
				console.log(e);
			}
		})
		
	};
	
	var getRoadDatas = function(){
		
		$.ajax({
			type:"GET",
			url:"/common/searchroadaddrlist",
			data:$("#addrSearchForm").serialize(),
			success:function(response){
				
				$thisLayer.find('#resultTotalNumber').text('검색 : '+response.length+'건');
				var listTags = "";
				
					
				$.each(response, function(){
					
					var row = '<li class="addrListSelect"><a href="javascript:void(0);" class="clearfix"><span class="float_left addrIn">'+this.addrDisp+'</span><span class="float_right">'+this.zipCd+'</span></a></li>';
					
					listTags += row;
					
				});
				
				setListTag(listTags);
			},
			error:function(e){
				console.log(e);
			}
		})
		
	};
	
	var setListTag = function(listTags){
		
		$thisLayer.find('#addrResultList').html('');
		$thisLayer.find('#addrResultList').append(listTags);
		
		$thisLayer.find('#noDataBox').hide();
		$thisLayer.find('#dataBox').show();
		
		$thisLayer.find('#areaAddr').val('');
		$thisLayer.find('#detailAddr').val('');
		
		$thisLayer.find('.addrListSelect').click(function(){
			
			$thisLayer.find('#areaAddr').val($(this).find('span.addrIn').text());
			$thisLayer.find('#zc').val($(this).find('span.float_right').text());
			
		});
	};
	
	
	this.openNewLayer();
	
};









/**
 * 
 * 사용법
 *
 * var today = new Date().format("yyyy-MM-dd");
 * 
 * 
 * */
Date.prototype.format = function(f) {

    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {

        switch ($1) {

            case "yyyy": return d.getFullYear();

            case "yy": return (d.getFullYear() % 1000).zf(2);

            case "MM": return (d.getMonth() + 1).zf(2);

            case "dd": return d.getDate().zf(2);

            case "E": return weekName[d.getDay()];

            case "HH": return d.getHours().zf(2);

            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);

            case "mm": return d.getMinutes().zf(2);

            case "ss": return d.getSeconds().zf(2);

            case "a/p": return d.getHours() < 12 ? "오전" : "오후";

            default: return $1;
        }
    });
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};





/**
 * email domain selectbox controller script
 * 이메일 도메인 셀렉트박스 컨트롤러 스크립트
 * 
 * *********************************[example Code]*************************************
 * 
 * 	emailTypeDomainSelectController("#uidDomain","#uidDomainSel");
 * 									[도메인셀렉터],[셀렉트박스셀렉터]
 * 
 * *************************************************************************************
 * 
 * 
 */
var emailTypeDomainSelectController = function(dmbox, selbox){
	
	$(selbox).change(function(){
		$(dmbox).val($(this).val());
		if($(this).val()==""){
			$(dmbox).attr("readonly", false);
		}else{
			$(dmbox).attr("readonly", true);
		}
	});	
};

var emailTypeDomainSelectController2 = function(dmbox, selbox){
    
    $(selbox).change(function(){
        $(dmbox).val($(this).val());
        if($(this).val()==""){
          $(dmbox).show();
        }else{
          $(dmbox).hide();
        }
    }); 
};

var isNum = function(keyNum){
	if(keyNum && (keyNum  > 47 && keyNum  < 58 || keyNum  > 95 && keyNum  < 106 || keyNum == 8 || keyNum == 9 || keyNum == 37 || keyNum == 39 || keyNum == 46)){
		return true;
	}else{
		return false;
	}
};

/**
 * 콤마를 찍는다.
 */
var addComma = function(price){
	
	price = price + '';
	var num = price.split('.');
	
	if(num[0]==0) return price;
	
	var num1 = num[0];
    var reg = /(^[+-]?\d+)(\d{3})/;
    var num1 = (num1 + '');
 
    while (reg.test(num1)) num1 = num1.replace(reg, '$1' + ',' + '$2');
    if(num.length > 1){
    	return num1+"."+num[1];
    }
    
    return num1;
};






/**
 * 
 * input박스 입력시 글자 수 체크하는 함수
 * 
 * 
 */

var chkInputCount = function($input, $count, maxlength){
	
    var update = function() {
        var before = $count.text() * 1;
        var now = $input.val().length;
        // 사용자가 입력한 값이 제한 값을 초과하는지를 검사한다.
        if (now > maxlength) {
            var str = $input.val();
            $input.val(str.substr(0, maxlength));
            now = maxlength;
        }
        // 필요한 경우 DOM을 수정한다.
        if (before != now) {
            $count.text(now);
        }
    };
    // input, keyup, paste 이벤트와 update 함수를 바인드한다
    $input.bind('input keyup paste', function() {
        setTimeout(update, 0)
    });
    update();

}








$(document).ready(function(){
	
	/**
	 * 어떤 인풋박스든 태그 안에 numberOnly="true" 라는 속성을 추가하면 자동으로 숫자만 입력되도록 구현
	 * 
	 */
	$("[numberOnly=true]").keypress(function(event){
		if(!isNum(event.which)) return false;
	}).keydown(function(event){
		if(!isNum(event.which)) return false;
	});
		
	//현대닷컴에서 유입이 될경우 레이어 팝업
	var cName = 'thehyundai' + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    
	if(cValue == "true"){
		var layerName = 'thehyundaiLayer' + '=';
        var layerCookieData = document.cookie;
        var layerStart = layerCookieData.indexOf(layerName);
        var layerValue = '';
        
        if(layerStart != -1){
        	layerStart += layerName.length;
            var layerEnd = cookieData.indexOf(';', layerStart);
            if(layerEnd == -1)layerEnd = layerCookieData.length;
            layerValue = layerCookieData.substring(layerStart, layerEnd);
        }
        
        if(layerValue != "true"){
			var layerHtml = '';
			layerHtml += '		<h3 class="pop_tlt">본 서비스는 더한섬닷컴의<br />책임하에 운영되고 있습니다.</h3>';
			layerHtml += '		<p class="pop_txt2">더한섬닷컴을 이용하시려면<br>더한섬닷컴의 <strong class="pt_txt">회원가입</strong> 및 <strong class="pt_txt">로그인</strong>이<br> 필요합니다.<br>신규 가입 시, <strong class="pt_txt">5% 할인쿠폰</strong>을 증정합니다.</p>';

			var la = new layerAlert(layerHtml);
		    
			//공통사용으로 인한 중복된 타이틀 제거
			$(".pop_cnt h3:eq(0)").hide();
			
			//첫번째 유입일 경우만 화면에 노출
			var d = new Date();
			d.setTime(d.getTime() + (24*60*60*1000));
			document.cookie = 'thehyundaiLayer=true; expires=' + d.toUTCString();
        }else{
        	$(".pop_cnt h3:eq(0)").show();
        }
	}else{
		$(".pop_cnt h3:eq(0)").show();
	}
	
	//hmall에서 유입이 될경우 레이어 팝업
	var hcName = 'hyundaihmall' + '=';
    var hcookieData = document.cookie;
    var hstart = cookieData.indexOf(hcName);
    var hcValue = '';
    if(hstart != -1){
        hstart += hcName.length;
        var hend = hcookieData.indexOf(';', hstart);
        if(hend == -1)hend = hcookieData.length;
        hcValue = hcookieData.substring(hstart, hend);
    }
    
	if(hcValue == "true"){
		var hlayerName = 'hyundaihmallLayer' + '=';
        var hlayerCookieData = document.cookie;
        var hlayerStart = hlayerCookieData.indexOf(hlayerName);
        var hlayerValue = '';
        
        if(hlayerStart != -1){
        	hlayerStart += hlayerName.length;
            var hlayerEnd = hcookieData.indexOf(';', hlayerStart);
            if(hlayerEnd == -1)hlayerEnd = hlayerCookieData.length;
            hlayerValue = hlayerCookieData.substring(hlayerStart, hlayerEnd);
        }
        
        if(hlayerValue != "true"){
			var hlayerHtml = '';
			hlayerHtml += '		<h3 class="pop_tlt">본 서비스는 더한섬닷컴의<br />책임하에 운영되고 있습니다.</h3>';
			hlayerHtml += '		<p class="pop_txt">더한섬닷컴을 이용하시려면<br />더한섬닷컴의 <strong class="ft_point01">회원가입</strong> 및 <strong class="ft_point01">로그인</strong>이 필요합니다.<br/>신규 가입 시, <strong class="ft_point01">5% 할인쿠폰</strong>을 증정합니다.</p>';

			var hla = new layerAlert(hlayerHtml);
		    
			//공통사용으로 인한 중복된 타이틀 제거
			$(".pop_tlt.copy:eq(1)").hide();
			
			//첫번째 유입일 경우만 화면에 노출
			var d = new Date();
			d.setTime(d.getTime() + (24*60*60*1000));
			document.cookie = 'hyundaihmallLayer=true; expires=' + d.toUTCString();
        }else{
        	$(".pop_cnt h3:eq(0)").show();
        }
	}else{
		$(".pop_cnt h3:eq(0)").show();
	}
})

/************************Footer News Start*********************/
function getNewsList(moveUrl){

	to_date = new Date();
    $.ajax({
    	type: "get",
    	url :  moveUrl+"/newsList?now=" + to_date.getTime(),
    	//url :  moveUrl+"/newslist?now=" + to_date.getTime(),
    	dataType : "json",
    	error : function( request, status, error ){
    		// 20151001 hjpark 아래에서 t 개체가 없어 오류가 발생해서 주석으로 막음
    		//t.PARAMS.jsonObjectData = 0;
    	}, 
    	success : function(results){
	    	var newsContent="";
	    	for(resultsCount=0; resultsCount<results.length; resultsCount++){
	    		newsContent += '<li><a href=\"' + results[resultsCount].link + '\?uiel=Desktop" target=\"_blank\">' + results[resultsCount].content + '</a></li>'
	    	}

	    	$('#NewsContents').html(newsContent);
	   		   
	   		newTap = true;

	        var NewTotal=$("#NewsContents li").size();        
	        var mySlider=$("#NewsContents").bxSlider({
	            mode:"horizontal", 
	            speed:500,
	            pager:false,
	            moveSlides:1,
	            minSlides:1,  
	            maxSlides:1, 
	            slideMargin:0, 
	            auto:false,
	            autoHover:false,
	            controls:false,
	            touchEnabled:true,
	            oneToOneTouch:true
	        });
	        $(".btn.back").on("click",function(){
	            mySlider.goToPrevSlide();
	            return false;
	        });
	        $(".btn.next").on("click",function(){
	            mySlider.goToNextSlide();
	            return false;
	        });
    	}
    });
}
/************************Footer News End*********************/

/**
 * 01/07/2015 Eddie
 * Mobile Device Check
 */
var isMobileDevice = function(){
    try {
        return /Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini|Kindle|Silk|KFAPW|KFARWI|KFASWI|KFFOWI|KFJW|KFMEWI|KFOT|KFSAW|KFSOWI|KFTBW|KFT‌​HW|KFTT|WFFOWI/i.test(navigator.userAgent);
    } catch(err) {
    	return false;
    }
};


/**
 * 2017-03-08, 이현승, 전화번호 문자포함여부 검증.
 * 검증성공: SUCCESS
 * 검증실패: 해당태그ID
 */
function phoneNumbericCheck(){
	var result = "SUCCESS";
	var inputNumberchk = /^[0-9]+$/;
	
	$("input:text[numberonly]").each(function(index){
		if(this.value.length > 0 && result == "SUCCESS") {
			var numVal	= this.value;
			var flag 	= true;
			
			for(i=0; i<numVal.length; i++){
				var str = numVal.substr(i,1);
				if (!inputNumberchk.test(str)){
					flag = false;
					break;
				}
			}
			if(!flag){
				result = this.id;
			}
		}
	});
	return result;
}

function rakutenCall(){
	(function (url) {
		/*Tracking Bootstrap Set Up DataLayer objects/properties here*/
		if(!window.DataLayer){
			window.DataLayer = {};
		}
		if(!DataLayer.events){
			DataLayer.events = {};
		}
		DataLayer.events.SiteSection = "1";
					
		var loc, ct = document.createElement("script"); 
		ct.type = "text/javascript"; 
		ct.async = true;
		ct.src = url;
		loc = document.getElementsByTagName('script')[0];
		loc.parentNode.insertBefore(ct, loc);
	}(document.location.protocol + "//intljs.rmtag.com/113658.ct.js"));
}

//팝업 해상도별 센터에 띄우기
function centerPopup(url, name, width, height) {
 
    var sw  = screen.availWidth ;
    var sh  = screen.availHeight ;

    px=(sw - width)/2 ;
    py=(sh - height)/2 ;

    var set  = 'top=' + py + ',left=' + px ;
    set += ',width=' + width + ',height=' + height + ',toolbar=0,resizable=1,status=0,scrollbars=0' ;

    window.open (url , name , set) ;
}

function isEmoji(strId) {
	var str = $(strId).val();
    var emojiRegexp = /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g;
    if (str.match(emojiRegexp)) {
        layerAlert("이모티콘은 입력 할 수 없습니다.");                    
        var repStr = str.replace(emojiRegexp, "");
        $(strId).val(repStr);
        return true;
    } else {
        return false;
    }
}
function convertNumberToMonth(number) {//숫자를 영문 달로 변환
    var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var number = Number(number)-1;
    var enMonth = months[number];
    return enMonth;
}


//한글바이트계산(utf-8 한글 3byte식 계산)
function getByteLength(s,b,i,c){
  for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
  return b;
}

/*
* str : 문자
* byteLength : 자를 문자 수
* sizePerLetter : 한글일 경우 byte수
*/
function subStringBytes(str, byteLength, sizePerLetter) {
      
  var limit = byteLength;
  var strLength = 0;
  var strTitle = "";
  var strPiece = "";
           
  for (i = 0; i < str.length; i++){
      var code = str.charCodeAt(i);
      var ch = str.substr(i,1).toUpperCase();
      //체크 하는 문자를 저장
      strPiece = str.substr(i,1)
       
      code = parseInt(code);
       
      if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((code > 255) || (code < 0))){
          strLength = strLength + sizePerLetter; //UTF-8 3byte 로 계산
      }else{
          strLength = strLength + 1;
      }
       
      if(strLength>limit){ //제한 길이 확인
          break;
      }else{
          strTitle = strTitle+strPiece; //제한길이 보다 작으면 자른 문자를 붙여준다.
      }
       
  }
   
  return strTitle;
}

/*
 * 이름 마스킹 처리
 */
function maskingName(str){
    var returnValue = "";
    str = $.trim(str);
    if(str.length > 1){
        returnValue = str.substring(0,1);
        returnValue += "*";
        if(str.length > 2){
            returnValue += str.substring(2);
        }
        return returnValue;
    }else{
        return str;
    }
}


/*
 * 아이디 마스킹 처리
 */
function maskingId(str){
    var maskingStr = "";
    if(str.length > 1){
        maskingStr = str.substring(0,3);
        
        var len = str.length - 3;
        if(len > 0){
            for(var i=0; i<len; i++){
                maskingStr += "*";    
            }
        }
    }
    return maskingStr;
}

/*
 * 주소 마스킹 처리
 */
function maskingAddress(str,isAll){
    var maskingStr = "";
    
    if(str.length > 0){
        //주소 전체 길이만큼 마스킹 처리
        if(isAll){
            for(var i=0; i<str.length; i++){
                maskingStr += "*";
            }
        }else{
            var splitStr = str.split(" ");
            if(splitStr.length > 3){
                maskingStr = splitStr[0]+" "+splitStr[1]+" "+splitStr[2];                                 
                
                for(var i=3; i<splitStr.length; i++){
                    var temp = "";
                    try{
                        for(var k=0; k<splitStr[i].length; k++){
                            temp += "*";
                        }
                        
                        maskingStr += (" "+temp);
                    }catch(e){
                        //
                    }
                }    
            }else{
                maskingStr = str;
            }
            
        }
    }
    return maskingStr;
}

/*
 * 문자 마스킹 처리
 */
function maskingStr(str) {
    var maskingStr = "";
    
    if(str != "" && str != null){
        for(var i=0; i<str.length; i++){
            maskingStr += "*";
        }
    }
     
    return maskingStr;
}