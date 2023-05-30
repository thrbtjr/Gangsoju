package com.hd03.gangsoju.domain.product;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*********************************
 * @function : ProductListDTO
 * @author : 김주현
 * 상품 리스트 정보와 페이징 정보를 가진 DTO
 *********************************/
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductListDTO {
	
	private Pagination pagination;
	private List<SimpleProductDTO> products;

}
