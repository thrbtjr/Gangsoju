SettingPagination = function(paginationID, currPageNum, totRecordsOfResults, viewRecordsPerPage, viewPagesPerPage, goFuncName) {

	var totalPage = Math.ceil(totRecordsOfResults/viewRecordsPerPage);

	var countPerBlock = viewPagesPerPage;					// 한화면에 보여줄 페이지개수
	var curBlock = Math.ceil(currPageNum/countPerBlock);	// 현재 화면영역 (1~10/ 11~20)
	
//	var startPage = (curBlock - 1) * 5 + 1;
//	var lastPage  = curBlock * 5;
	var startPage = (curBlock - 1) * countPerBlock + 1;
	var lastPage  = curBlock * countPerBlock;
	if (lastPage > totalPage) lastPage = totalPage;


	// 페이지 외 추가로 인자를 넣을 때
	var func = goFuncName.split('#');
	var funcName = func[0];
	var params   = '';
	if ( func.length > 1 ) {
		for ( var j=1; j <func.length; j++ ) {
			params += ', \'' + func[j].replace(/^\s+|\s+$/gm,'') + '\''; 
		}
	}		
	
	
	var first = "";
	// 첫페이지가 아니면 이벤트 생성
	if (currPageNum != 1) {
		first = '<a href="javascript:' + funcName + '(' + 1 + params + ')" class="first">&raquo;</a>';
	}

	var prev = "";
	// 이전블록 유효하면 이전버튼 이벤트 생성
	if (currPageNum >= startPage && currPageNum != Number(1)) {
		prev = '<a href="javascript:' + funcName + '('+ (Number(currPageNum) - Number(1)) + params + ')" class="pre">이전</a>';      
	} else {
		prev = '<a href="javascript:void(0);" class="pre disabled">이전</a>';      
	}

	
	// 페이징 생성
	var pageHtml = "";
	for (var i = startPage; i <= lastPage; i++) { 
		if (parseInt(currPageNum) === i) {
			pageHtml += '<a href="javascript:void(0);" class="cur">' + i + '</a>';
		} else {
			pageHtml += '<a href="javascript:' + funcName + '(' + i + params + ')">' + i + '</a>';
		}
	}

	
	var next = "";
	// 다음블록 유효하면 다음버튼 이벤트 생성
	if (currPageNum <= lastPage && currPageNum != totalPage) {
		next = '<a href="javascript:' + funcName + '('+ (Number(currPageNum) + Number(1)) + params + ')" class="nxt">다음</a>';
	} else {
		next = '<a href="javascript:void(0);" class="nxt disabled">다음</a>';
	}

	var last = "";
	// 마지막 페이지가 아니면 이벤트 생성
	if (currPageNum != totalPage) {
		last = '<a href="javascript:' + funcName + '(' + totalPage + params + ')" class="last">&raquo;</a>';
	}

//	$("#" + pageAreaId).append(first).append(prev).append(pageHtml).append(next).append(last);

	return (totRecordsOfResults > 0) ? prev + pageHtml + next : '';
};
