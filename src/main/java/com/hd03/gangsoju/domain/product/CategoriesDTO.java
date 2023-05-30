package com.hd03.gangsoju.domain.product;

import java.util.List;

import lombok.Getter;
import lombok.ToString;

/*********************************
 * @function : CategoriesDTO
 * @author : 김주현
 * 카테고리 DTO : 유저가 선택한 카테고리의 모든 정보를 포함
 *********************************/
@Getter
@ToString
public class CategoriesDTO {
	
	private CategorySetVO categories; //대:중, 중:소, 소:소
	private List<Category> middleCategories; //중분류
	private Category bigCategory; //대분류(최상위)
	private String chooseCateno;
	private int chooseCatenoLen;
	
	private Category brandInfo; //브랜드 정보

	public CategoriesDTO(CategorySetVO categories, List<Category> middleCategories, Category bigCategory, String chooseCateno, int chooseCatenoLen) {
		this.categories = categories;
		this.middleCategories = middleCategories;
		this.bigCategory = bigCategory;
		this.chooseCateno = chooseCateno;
		this.chooseCatenoLen = chooseCatenoLen;
		this.brandInfo = null;
	}
	
	//brand 정보 추가
	public CategoriesDTO addBrandInfo(Category brand) {
		this.brandInfo = brand;
		return this;
	}
	
}
