package com.hd03.gangsoju.domain.product;

import java.util.List;

import lombok.Getter;
import lombok.ToString;

/*********************************
 * @function : CategorySetVO
 * @author : 김주현
 * 사용자가 선택한 카테고리의 레벨에 따라 상위(동일) 카테고리와 하위(동일) 카테고리 VO
 *********************************/
@Getter
@ToString
public class CategorySetVO {

	private Category parentCategory; //대:대, 중:중, 소:소 
	private List<Category> categories; //대:중, 중: 소, 소: 소

}
