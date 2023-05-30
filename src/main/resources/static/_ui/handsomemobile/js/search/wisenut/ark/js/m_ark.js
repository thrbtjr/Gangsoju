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

var g_oConvert = "fw";							// 정방향, 역방향 값
var isArk = true;								// 자동완성 기능 사용 여부
var isKeydown = false;							// 브라우저가 파이어폭스, 오페라일 경우 keydown 사용 여부
var isListShow = true;
var cursorPos = -1;								// 자동완성 커서 위치 값
var formName = "#search";						// 검색 form의 name을 설정한다.
var queryId = "#query";							// 검색어 <input> 의 id을 설정한다
var wrapId = "ark_wrap";						// 자동완성 결과 <div> 의 id을 설정한다
var contentListId = "ark_content_list";			// 자동완성 Content List <li> 의 id을 설정한다
var imgDownId = "ark_img_down";					// 자동완성 down 이미지 id을 설정한다
var imgUpId = "ark_img_up";						// 자동완성 up 이미지 id을 설정한다
var totalFwCount = 0;							// 전방 검색 전체 개수
var totalRwCount = 0;							// 후방 검색 전체 개수
var target = "";								// ARK 웹서버 설정파일의 목록에 있는 추천어 서비스 대상을 지정한다.
var charset = "utf-8";							// 인코딩 설정 (인코딩이 utf-8이 아닐 경우 8859_1 로 설정해야함)
var arkPath = "/_ui/mobile/common/wisenut/ark";		// 자동완성 경로
var transURL = "/hssearch/arkTrans";		// trans 페이지의 URL을 설정한다.
var tempQuery = "";

/**
 *  ARK 구성요소의 위치 및 크기를 아래 변수를 통해 조정함.
 */

var browser = "";
if (arkQuery.browser.msie) {
	browser = "IE";
} else if (arkQuery.browser.mozilla) {
	browser = "FF";
} else if (arkQuery.browser.opera) {
	browser = "OPERA";
} else if (arkQuery.browser.webkit) {
	browser = "CHROME";
}
var browserVersion = arkQuery.browser.version;			// 웹브라우져의 버전
var offset = null;
var offsetTop = 0;
var offsetLeft = 0;

/** ARK 구성요소의 위치 및 크기를 아래 변수를 통해 조정함. **/
var IE6_TOP_OFFSET = -36;				// IE6 일 경우 TOP 옵셋 값 오차 조정
var IE6_LEFT_OFFSET = 20;				// IE6 일 경우 LEFT 옵셋 값 오차 조정
var IE7_TOP_OFFSET = -60;				// IE7 일 경우 TOP 옵셋 값 오차 조정
var IE7_LEFT_OFFSET = -18;				// IE7 일 경우 LEFT 옵셋 값 오차 조정
var IE8_TOP_OFFSET = 0;					// IE8 일 경우 TOP 옵셋 값 오차 조정
var IE8_LEFT_OFFSET = 0;				// IE8 일 경우 LEFT 옵셋 값 오차 조정
var FF_TOP_OFFSET = 0;
var FF_LEFT_OFFSET = 0;
var CHROME_TOP_OFFSET = 0;
var CHROME_LEFT_OFFSET = 0;
var OPERA_TOP_OFFSET = 0;
var OPERA_LEFT_OFFSET = 0;

/** ARK 구성요소의 위치 및 크기를 아래 변수를 통해 조정함. **/
var arkWidth = 323;								// 자동완성 전체 넓이 값을 설정한다(변동폭).
var arkTop = 0;								// 자동완성 상단에서의 위치 값을 설정한다.
var arkLeft = 500;								// 자동완성 왼쪽에서의 위치 값을 설정한다.
var arkImgTop = 26;								// 자동완성 화살표 이미지의 상단에서 위치 값을 설정한다.
var arkImgLeft = 26;							// 자동완성 화살표 이미지의 왼쪽에서 위치 값을 설정한다.
var tooltip01TopPos = 0;						// 자동완성 기능끄기 툴팁의 상단 기준 위치 오차 조정값
var tooltip01LeftPos = -155;					// 자동완성 기능끄기 툴팁의 좌측 기준 위치 오차 조정값
var tooltip02TopPos = 0;						// 자동완성 기능켜기 툴팁의 상단 기준 위치 오차 조정값
var tooltip02LeftPos = 0;						// 자동완성 기능켜기 툴팁의 좌측 기준 위치 오차 조정값

var keyFix = new beta.fix('query');

arkQuery(document).ready(function() {
	// 자동완성 기능 사용 여부 확인 한다.
	if(getCookie("ark")=="off") {
		isArk = false;
		arkQuery(queryId).attr("autocomplete","on");
	} else {
		arkQuery(queryId).attr("autocomplete","off");
	}

	if (arkQuery.browser.opera || arkQuery.browser.mozilla) {
		//alert("oepra:" + arkQuery.browser.opera + " / mozilla:" + arkQuery.browser.mozilla);
		arkQuery(document).keydown(function(event) {
			var query = arkQuery(queryId).val();
			
			if (event.which == 38 || event.which == 40) {
				if (query != "") {
					showArk();
				}
				moveFocusEvent(event);
			} else {
				if (arkQuery(event.target).is(queryId)) {
					isKeydown = true;
					eventKeydown();
				}
			}
		});
	} else if (arkQuery.browser.msie || arkQuery.browser.webkit) {
		//alert("msie:" + arkQuery.browser.msie + " / webkit:" + arkQuery.browser.webkit);
		arkQuery(document).keyup(function(event) {
			var query = arkQuery(queryId).val();
			
			if (event.keyCode == 38 || event.keyCode == 40) {
				// 아래(40), 위(38) 방향키 조작시의 이벤트 처리
				if (query != "") {
					showArk();
				}
				moveFocusEvent(event);
			} else if (event.keyCode == 16) {
			} else if (event.keyCode == 8 && query == "") {
				arkQuery("#" + contentListId).html("");
				hideArk();
			} else {
				if (arkQuery(event.target).is(queryId)) {
					if (isArk && arkQuery(queryId).val() != "") {
						requestArkJson(arkQuery(queryId).val());
					} else if (arkQuery(queryId).val() == "") {
						hideArk();
					}
				}
			}
		});
	}

	// Backspace 에 대한 처리
	arkQuery(queryId).keyup(function(event) {
		if(event.keyCode == 8 && arkQuery(this).val() == "") {
			arkQuery("#" + contentListId).html("");
			hideArk();
		}
	});

	// 브라우저에서 일어나는 클릭 이벤트를 체크한다.
	arkQuery(document).click(function(event) {
		stopEventBubble(event);
		if (arkQuery(event.target).is("#" + imgDownId)) {
			isListShow = false;
			showArk();
			//showArkGuide();
		} else if (arkQuery(event.target).is("#" + imgUpId)) {
			//hideArk();
		} else if (arkQuery(event.target).is(queryId)) {
			if (isArk) {
				var query = arkQuery(queryId).val();
				if (query != "") {
					requestArkJson(arkQuery(queryId).val());
					keyword = query;
				}
				isKeydown = true;
			}
		} else if (!arkQuery(event.target).is("#" + wrapId)) {
			//hideArk();
		}
	});
	
	arkQuery("#" + imgUpId).hover(
		function() {
			arkQuery("#tooltip01").show();
		},
		function() {
			arkQuery("#tooltip01").hide();
		}
	);
});

/************************************************
 * jQuery Event Bubbling 방지를 위한 함수.
 * @name stopEventBubble
 * @param evt 페이지 이벤트
 ************************************************/
function stopEventBubble(evt) {
	var eventReference = (typeof evt !== "undefined") ? evt : event;
	//alert(eventReference.stopPropagation);

	if(eventReference.stopPropagation) {
		eventReference.stopPropagation();
	} else {
		eventReference.cancelBubble = true;
	}
}

/************************************************
 * 자동완성 결과 요청
 * @name requestArk
 * @param query 키보드 입력된 문자열
 ************************************************/
function requestArkJson(query) {
	$("#m_search_tab").hide();
	$("#recent_searchText").hide();
	$("#m_popular_search").hide();
	$("#ark_wrap_empty").hide();
    var targetUrl = $(".m_search_box_wrap #search").attr("action");
    var targetLang = handsomeIsoCode;

	jQuery.support.cors = true;

	cursorPos = -1;
	$("#ark_wrap_empty").hide();
	arkQuery.ajaxSetup({cache:false});
	arkQuery.ajax({
		url: "/"+targetLang+transURL,
		type: "get",
		dataType: "json",
		data: {"convert":g_oConvert, "target":target, "charset":charset, "query":query, "datatype": "json", "lang":$("#lang").val()},
		success: function(data) {
			//console.log(data);
			if(data.ark.result != undefined) {
				if(data.ark.result.length <= 0) {
					totalFwCount = 0;
					totalRwCount = 0;
				}
			
				// 자동완성 텍스트 출력
				var str = new StringBuilder();
				var listCheckRow = 0;
				var totalListCnt = 0;
				for(var x=0; x<data.ark.result.length;x++){
				    totalListCnt += data.ark.result[x].totalcount;
				}
	
				arkQuery.each(data.ark.result, function(i, result) {
					var totalCount = parseInt(result.totalcount);
					if (i == 0) {
						totalFwCount = totalCount;
					} else {
						totalRwCount = totalCount;
					}
	
					if (totalCount > 0) {
						// 정방향, 역방향 구분선
						/*if (i > 0 && totalFwCount > 0 && totalRwCount > 0) {
							str.Append("<li style=\"border-top:1px solid #f3f3f3;\"></li>");
						}*/
					    
						// 자동완성 리스트 설정
						arkQuery.each(result.items, function(num,item){
							if (i != 0) {
								num = totalFwCount + num;
							}

	                        str.Append("<li><a id=\"bg" + num + "\" onclick=\"onClickKeyword(" + num + ");GA_Event('검색', '추천_검색어', '"+escape(item.keyword)+"');\" onmouseover=\"onMouseOverKeyword(" + num + ");\"");
	                        str.Append("onmouseout=\"onMouseOutKeyword(" + num + ");\"><em>" + item.hkeyword);
							str.Append("</em></a><span id=\"f" + num + "\" style=display:none;>" + item.keyword + "</span>");
							str.Append("</li>");
							listCheckRow++;
						});					
					}
				});
	
				// 아이템 이미지 출력
				var str2 = "";				
				if(data.srch.product){				
					arkQuery.each(data.srch.product, function(i, result) {
					    window.sessionStorage.setItem('search_recommend_ecommerceDataList', JSON.stringify(data.srch.product));
						if (i == 0) {			
							return true; //each문 내의 continue와 같음
						} else if(i > 3){
							return false; //each문 내의 break와 같음
						} else {
							//str2 += "<li class=\"swiper-slide\"><a href=\""+result.PRODUCTDETAILURL+"\"><img src=" + result.THUMBNAIL + "></a></li>";
							str2 += "<li class=\"swiper-slide\"><a href=\""+result.PRODUCTDETAILURL+"\" onclick=\"GA_Event('검색', '추천_상품', '"+escape(result.NAME.replace(/<!HS>/g,"").replace(/<!HE>/g,""))+"');callSearchRecommClick($(this), '"+i+"', \'RECOMMEND\');\">";
							str2 += "<div class=\"img\"><img src=\"" + result.THUMBNAIL + "\" alt=\"\"></div>";
							str2 += "<div class=\"txt\">";
							str2 += "	<p class=\"name\">"+result.BRANDNAME+"</p>";
							str2 += "	<p class=\"price\">₩"+addComma(result.SALEPRICE)+"</p>";
							str2 += "</div>";
							str2 += "</a></li>";
						}					
					});
				}				
				
				if ((totalFwCount + totalRwCount) == 0) {
					//arkQuery("#" + contentListId).html("<li>"+noRecommendResult+"</li>");
					$("#ark_wrap_empty").show();
	                $("#ark_content_list").html("");
				} else {			
					arkQuery("#" + contentListId).html(str.ToString());
					arkQuery("#auto2").html(str2);
					slideOnMain();
				}
				
				// 초기 무조건 비우기
				$("#brandView").empty();
				$("#brandPageGubun").val("off");
				
				// 브랜드 결과 출력
				var str3 = new StringBuilder();
				
				if(data.srch.brand){	
					
					// 브랜드 페이지 구분자 on상태
					$("#brandPageGubun").val("on");
					
					str3.Append("<ul>");							
					str3.Append("<li class=\"brand\">");
					str3.Append("<a href=\"#\" style=\"float:left;\">");
	                str3.Append(""+query+"</a>");
	                str3.Append("<div>");
	                
	                arkQuery.each(data.srch.brand, function(i, result) {
						if (i == 0) {			
							return true; //each문 내의 continue와 같음
						} else if(i > 3){
							return false; //each문 내의 break와 같음
						} else {
						    var url = result.URL.replace("b/","c/");
						    
						    str3.Append("<a href=\""+"/"+url+"\" class=\"brand_main\">"+gotobrand+"&nbsp;&gt;&nbsp;"+result.NAME+"</a><br>");
						}
		                // 브랜드 페이지에서 보여줄 배너이미지랑 URL정보 셋팅
	                    $("#brand_img").val(data.srch.brand[1].IMG);
	                    $("#brand_url").val(data.srch.brand[1].URL);
					});
					str3.Append("</div>");
					str3.Append("</li>");
					str3.Append("</ul>");
					
					$("#brandView").html(str3.ToString());
				}	
				//alert(data.srch.brcate);
				$("#autocomplete_brandDiv").html("<ul id=\"autocomplete_brand\"></ul>");
				$("#autocomplete_categoryDiv").html("<ul id=\"autocomplete_category\"></ul>");
				if(data.srch.brcate){
					var brandLink = data.srch.brcate[1].BRAND_ID.toLowerCase()+"/"+data.srch.brcate[1].BRAND_ID.toLowerCase();
					var categoryIdArr = data.srch.brcate[1].CATEGORYID.split(">");
					var categoryLink = categoryIdArr[categoryIdArr.length - 1].toLowerCase();
					var gaBrandCd = data.srch.brcate[1].BRAND.replace(/<!HS>/g,"").replace(/<!HE>/g,""); //<!HS><!HE>태그 제거
					var gaCategoryCd = data.srch.brcate[1].CATEGORY.replace(/<!HS>/g,"").replace(/<!HE>/g,""); //<!HS><!HE>태그 제거
	                arkQuery("#autocomplete_brand").after("<li class=\"flag\"><a href=\"/"+targetLang+"/c/"+brandLink+"\" class=\"name\" onclick=\"GA_Event('검색', '추천_브랜드', '"+ escape(gaBrandCd) +"');\">"+ data.srch.brcate[1].BRAND + "</a></li>");
	                arkQuery("#autocomplete_category").after("<li class=\"flag\"><a href=\"/"+targetLang+"/c/"+categoryLink+"\" class=\"name\" onclick=\"GA_Event('검색', '추천_카테고리', '"+ escape(gaCategoryCd) +"');\">"+ data.srch.brcate[1].CATEGORY + "</a></li>");
	                //<li class="flag woman"><a href="#" class="name">여성&gt;탑&gt;셔츠</a></li>
					//<li class="flag"><span class="name">SYSTEM</span></li>
					//<li class="flag man"><a href="#" class="name">남성&gt;탑&gt;셔츠</a></li>
					//<li class="flag"><span class="name">SYSTEM</span></li>
					//<li class="flag woman"><a href="#" class="name">여성&gt;탑&gt;셔츠</a></li>
					//<li class="flag"><span class="name">SYSTEM</span></li>
					//<li class="flag man"><a href="#" class="name">남성&gt;탑&gt;셔츠</a></li>
					//<li class="flag"><span class="name">SYSTEM</span></li>
	            } else {
					$("#autocomplete_brandDiv").html($("#autocomplete_brand_empty").html());
					$("#autocomplete_categoryDiv").html($("#autocomplete_category_empty").html());
	                //arkQuery("#autocomplete_category").after("<li><a href=\"javascript:noLink();\"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+noRecommendCategory+"</span></a></li>");
	                //arkQuery("#autocomplete_brand").after("<li><a href=\"javascript:noLink();\"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+noRecommendBrand+"</span></a></li>");
	            }
				
				//alert(totalFwCount + totalRwCount);
				arkQuery("#autocomplete_query").text(arkQuery("#query").val());
				if(str2 == "") {
					$("auto2Div").html($("#auto2_empty").html());
				} else {
					$("#auto2Div").html("<ul class=\"swiper-wrapper\" id=\"auto2\"></ul>");
					$("#auto2").html(str2);
					var auto2Div_swiper = new Swiper('#auto2Div', {
	                    slidesPerView:2.4,
	                    paginationClickable: false,
	                    spaceBetween:"2.18%",
	                    freeMode: true,
	                });
				}
				showArk();
			} else {
				$("#m_search_tab").hide();
				$("#recent_searchText").hide();
                $("#ark_content_list").html("");
				$("#ark_wrap_empty").show();
				$("#autocomplete_brand_empty").show();
				$("#autocomplete_category_empty").show();
				$("auto2Div").html($("#auto2_empty").html());
			}
		}
    });
}

var keyword = "";

/************************************************
 * 브라우저가 FireFox, Opera 일 경우 한글 입력
 * @name eventKeydown
 ************************************************/
function eventKeydown() {
	// 방향키 이동시 메소드 실행을 중지시킨다.
	if(!isKeydown) {
		return;
	}

	if (keyword != arkQuery(queryId).val()) {
		keyword = arkQuery(queryId).val();
		if (keyword != "" && isArk) {
			requestArkJson(arkQuery(queryId).val());
		} else {
			//hideArk();
		}
	}
	setTimeout("eventKeydown()", 20);
}


/************************************************
 * 방향키 이벤트 처리
 * @name moveFocusEvent
 * @param event 페이지 이벤트
 ************************************************/
function moveFocusEvent(event) {
	isKeydown = false;

	if (event.keyCode == 38) {
		if (cursorPos==-1 || cursorPos==0) {
			cursorPos = -1;
			hideArk();
			arkQuery(queryId).val(tempQuery);
			tempQuery = "";
		} else {
			onMouseOutKeyword(cursorPos);
			cursorPos = cursorPos - 1;
			onMouseOverKeyword(cursorPos);
			arkQuery(queryId).val(arkQuery("#f" + cursorPos).text());
		}
	} else if (event.keyCode == 40) {
		if(cursorPos == -1) {
			tempQuery = arkQuery(queryId).val();
		}
		if ((totalFwCount + totalRwCount) > (cursorPos + 1)) {
			onMouseOutKeyword(cursorPos);
			cursorPos = cursorPos + 1;
			onMouseOverKeyword(cursorPos);
			arkQuery(queryId).val(arkQuery("#f" + cursorPos).text());
		}
	}
}

/************************************************
 * MouseOver 일 경우 선택한 배경을 설정
 * @name onMouseOverKeyword
 * @param cursorNum 커서의 위치 인덱스 값
 ************************************************/
function onMouseOverKeyword(cursorNum) {
	clearCursorPos();
	cursorPos = cursorNum;
	arkQuery("#bg" + cursorNum).css({"backgroundColor" : "#eeeeee"});
	arkQuery("#bg" + cursorNum).css({"cursor" : "pointer"});
}

/************************************************
 * MouseOut 일 경우 설정한 배경을 초기화
 * @name onMouseOutKeyword
 * @param cursorNum 커서의 위치 인덱스 값
 ************************************************/
function onMouseOutKeyword(curSorNum) {
	cursorPos = curSorNum;
	arkQuery("#bg" + cursorPos).css({"backgroundColor" : "#ffffff"});
}

/************************************************
 * 커서 위치가 변경될 때마다 선택되지 않은 부분 초기화
 * @name clearCursorPos
 ************************************************/
function clearCursorPos() {
	for(var i=0; i<(totalFwCount + totalRwCount); i++){
		arkQuery("#bg" + i).css({"backgroundColor" : "#ffffff"});
	}
}

/************************************************
 * 마우스 클릭시 검색을 수행
 * @name onClickKeyword
 * @param cursorPos 커서의 위치
 ************************************************/
function onClickKeyword(cursorPos) {
	
    arkQuery(queryId).val(arkQuery("#f" + cursorPos).text());
    arkQuery("#collection").val(arkQuery("#selectedLang").val());
    arkQuery(formName).attr("onsubmit","return true");	
    arkQuery(formName).submit();
}

/************************************************
 * 자동완성 상태를 설정
 * @name showArkGuide
 ************************************************/
function showArkGuide() {
	var str = "<li style=\"line-height:145%; font-size:11px;\">";

	if (isArk) {
		str += "현재 검색어 &nbsp;<strong>자동 추천 기능</strong>을 사용하고 있습니다.<br>검색어 입력시 자동으로 관련어를 추천합니다.";
	} else {
		str += "<strong>자동 추천 기능</strong>을 사용해 보세요. <label OnClick=\"setArkOn();\" style=\"cursor:pointer;color:#435fea;text-decoration:underline;\">기능켜기</label><br>검색어 입력시 자동으로 관련어를 추천합니다.";
	}

	str += "</li>";

	arkQuery("#" + contentListId).html(str);
}

/************************************************
 * 자동완성 목록을 화면에 보여줌
 * @name showArk
 ************************************************/
function showArk() {
  if(  arkQuery(queryId).val() != ""){
	    arkQuery("#" + wrapId).show();
	}
}

/************************************************
 * 자동완성 목록을 화면에서 감춤
 * @name hideArk
 ************************************************/
function hideArk() {
	//arkQuery("#" + wrapId).hide();
}

/************************************************
 * 도움말 팝업
 * @name openHelp
 ************************************************/
function openHelp() {
	window.open(arkPath + "/help/help_01.html", "도움말", "height=540,width=768,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,directories=no,status=no");
}

/************************************************
 * 단어 입력 후 정방향/역방향 이미지 버튼 클릭시 이벤트 처리
 * @name onConvert
 * @param convert
 ************************************************/
function onConvert(convert) {
	var query = arkQuery(queryId).val();

	if (convert == "fw") {
		g_oConvert = "fw";
	} else {
		g_oConvert = "rw";
	}

	requestArkJson(query);

	return;
}

/************************************************
 * 자동완성 기능 끄기
 * @name setArkOff
 ************************************************/
function setArkOff() {
	arkQuery(queryId).attr("autocomplete", "on");
	isArk = false;

	var today = new Date();
	var expire_date = new Date(today.getTime() + 365*60*60*24*1000);
	setCookie("ark", "off", expire_date);
}

/************************************************
 * 자동완성 기능 켜기
 * @name setARkOn
 ************************************************/
function setArkOn() {
	arkQuery(queryId).attr("autocomplete", "on");
	isArk = true;

	var today = new Date();
	var expireDate = new Date(today.getTime() - 60*60*24*1000);
	setCookie("ark", "on", expireDate);

	var query = arkQuery(queryId).val();
	if (query != "") {
		requestArkJson(query);
	}
}

/************************************************
 * 쿠키 설정값을 저장
 * @name setCookie
 * @param name 쿠키 항목명
 * @param value 쿠키 항목의 값
 * @param expire 쿠키 만료일자
 ************************************************/
function setCookie(name, value, expire) {
	var expire_date = new Date(expire);
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expire_date.toGMTString();
}

/************************************************
 * 쿠키 설정값을 로드
 * @name getCookie
 * @param name 쿠키 항목명
 ************************************************/
function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) {
			return null;
		}
	} else {
		begin += 2;
	}

	var end = document.cookie.indexOf(";", begin);

	if (end == -1) {
		end = dc.length;
	}

	return unescape(dc.substring(begin + prefix.length, end));
}

/************************************************
 * 폰트 컬러 설정
 * @name showSource
 * @param count 등급 레벨
 ************************************************/
function showSource(count) {
	var color;
	var ret;

	if (count >= 0 && count <= 4) {
		color = "#989898";
	} else {
		color = "#CC6633";
	}

	if (count == 0 || count == 5) {
		ret = "<font style='font-size:11px;font-family:돋움;color:"+color+"'>사전</font>";
	} else if(count == 1 || count == 6) {
		ret = "<font style='font-size:11px;font-family:돋움;color:"+color+"'>일반</font>"; //색인
	} else if(count == 2 || count == 7) {
		ret = "<font style='font-size:11px;font-family:돋움;color:"+color+"'>인기</font>";
	} else if(count == 3 || count == 8) {
		ret = "<font style='font-size:11px;font-family:돋움;color:"+color+"'>테마</font>";
	} else if(count == 4 || count == 9) {
		ret = "<font style='font-size:11px;font-family:돋움;color:"+color+"'>추천</font>";
	} else {
		ret = "";
	}

	return ret;
}

/************************************************
 * 추천어 리스트 우측에 Ranking 이미지 출력
 * @name showRankIcon
 * @param count 랭크 점수
 ************************************************/
function showRankIcon(count) {
	var str;

	if (count >= 0 && count <= 20) {
		str = "<font style=\"font-size:9px;color:#CC6633\">|</font><font style=\"font-size:9px;color:#C0C0C0\">||||</font>";
	} else if(count > 20 && count <= 40) {
		str = "<font style=\"font-size:9px;color:#CC6633\">||</font><font style=\"font-size:9px;color:#C0C0C0\">|||</font>";
	} else if(count > 40 && count <= 60) {
		str = "<font style=\"font-size:9px;color:#CC6633\">|||</font><font style=\"font-size:9px;color:#C0C0C0\">||</font>";
	} else if(count > 60 && count <= 80) {
		str = "<font style=\"font-size:9px;color:#CC6633\">||||</font><font style=\"font-size:9px;color:#C0C0C0\">|</font>";
	} else if(count > 80 && count <= 100) {
		str = "<font style=\"font-size:9px;color:#CC6633\">|||||</font>";
	} else {
		str = "<font style=\"font-size:9px;color:#CC6633\">|||||</font>";
	}

	return str;
}


var preview = "";
var gobj = "";

function attachEvent_(obj, evt, fuc, useCapture) {
	if (!useCapture) {
		useCapture = false;
	}

	if (obj.addEventListener) {
		// W3C DOM 지원 브라우저
		return obj.addEventListener(evt,fuc,useCapture);
	} else if (obj.attachEvent) {
		// MSDOM 지원 브라우저
		return obj.attachEvent("on"+evt, fuc);
	} else {
		// NN4 나 IE5mac 등 비 호환 브라우저
		MyAttachEvent(obj, evt, fuc);
		obj['on'+evt]=function() { MyFireEvent(obj,evt) };
	}
}

function detachEvent_(obj, evt, fuc, useCapture) {
  if(!useCapture) useCapture=false;
  if(obj.removeEventListener) {
    return obj.removeEventListener(evt,fuc,useCapture);
  } else if(obj.detachEvent) {
    return obj.detachEvent("on"+evt, fuc);
  } else {
    MyDetachEvent(obj, evt, fuc);
    obj['on'+evt]=function() { MyFireEvent(obj,evt) };
  }
}

function MyAttachEvent(obj, evt, fuc) {
  if(!obj.myEvents) obj.myEvents= {};
  if(!obj.myEvents[evt]) obj.myEvents[evt]=[];
  var evts = obj.myEvents[evt];
  evts[evts.length]=fuc;
}

function MyFireEvent(obj, evt) {
  if(!obj.myEvents || !obj.myEvents[evt]) return;
  var evts = obj.myEvents[evt];
  for (var i=0;i<len;i++) {
    len=evts.length;
    evts[i]();
  }
}

function previewShow(e, obj, pv) {
  preview=pv;
  gobj=obj;
  attachEvent_(obj, "mousemove", previewMove, false);
  attachEvent_(obj, "mouseout", previewHide, false);
}

function previewMove(e) {
  var hb = document.getElementById(preview);
  if(hb.parentElement) {
	  hb.parentElement.style.display="block";
  } else {
	  hb.parentNode.style.display="";
  }
  var evt = e ? e : window.event;
  var posx=0;
  var posy=0;

  if (evt.pageX || evt.pageY) { // pageX/Y 표준 검사
    posx = evt.pageX +8;
    posy = evt.pageY +16;
  } else if (evt.clientX || evt.clientY) { //clientX/Y 표준 검사 Opera
    posx = evt.clientX +10;
    posy = evt.clientY +20;
    if (window.event) { // IE 여부 검사
      posx += document.body.scrollLeft - 80;
      posy += document.body.scrollTop;
     }
  }

  hb.style.left = posx + "px";
  hb.style.top = posy + "px";
}

function previewHide() {
  var hb = document.getElementById(preview);
  if(hb.parentElement) hb.parentElement.style.display="none";
  else hb.parentNode.style.display="none";

  detachEvent_(gobj,"mousemove", previewMove, false);
}

