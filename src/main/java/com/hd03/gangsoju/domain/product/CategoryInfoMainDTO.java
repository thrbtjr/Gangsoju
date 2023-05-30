package com.hd03.gangsoju.domain.product;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

/*********************************
 * @function : CategoryInfoMainDTO
 * @author : 김주현
 * 메인P: 신상품, 베스트의 카테고리 정보 DTO
 *********************************/
@Getter
@AllArgsConstructor
@ToString
public class CategoryInfoMainDTO {

	private List<CategoryForMainDTO> categories; //신상품, 베스트 카테고리 포함
	private int totalCnt; //신상품: 총 상품 개수
}
