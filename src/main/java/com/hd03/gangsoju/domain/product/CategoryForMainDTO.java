package com.hd03.gangsoju.domain.product;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Setter;

/*********************************
 * @function : CategoryForMainDTO
 * @author : 김주현
 * 메인P: 신상품, 베스트 리스트의 각각의 카테고리 정보
 *********************************/
@Getter
@Setter
@NoArgsConstructor
@ToString
public class CategoryForMainDTO {
	
	private String cateno;
	private String catename;
	private int totalProdCnt; //신상품
	private boolean displayType; // true: 신상품, false: 베스트
	
	public void addDisplayTypeTrue() {
		this.displayType = true;
	}

}
