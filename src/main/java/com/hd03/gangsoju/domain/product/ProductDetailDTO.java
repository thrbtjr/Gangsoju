package com.hd03.gangsoju.domain.product;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/*********************************
 * @function : ProductDetailDTO
 * @author : 김주현
 * 상품 상세 정보를 모두 포함한 DTO
 *********************************/
@Getter
@Setter
@AllArgsConstructor
public class ProductDetailDTO {

	private ProductDetailCommonVO info; //상품 정보
	private List<RecommendProdListDTO> recommendList; //추천 상품들
	private List<SimpleProductDTO> withCodyList; //함께 코디된 상품들
	private int mileage; //적립될 마일리지(5%)
	private String pcid; 
	private int idx; //조회한 상품이 colors의 몇 번째에 있는 지 인덱스

}