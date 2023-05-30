package com.hd03.gangsoju.service.product;

import java.util.List;

import com.hd03.gangsoju.domain.product.CategoriesDTO;
import com.hd03.gangsoju.domain.product.CategorySetVO;
import com.hd03.gangsoju.domain.product.CategoryInfoMainDTO;
import com.hd03.gangsoju.domain.product.ProductDetailDTO;
import com.hd03.gangsoju.domain.product.ProductListDTO;
import com.hd03.gangsoju.domain.product.ProductListParamsDTO;
import com.hd03.gangsoju.domain.product.ProductMainpDTO;
import com.hd03.gangsoju.domain.product.ReloadProdDTO;
import com.hd03.gangsoju.domain.product.SeachResult;

/*********************************
 * @function : ProductService
 * @author : 김주현
 * 상품 기능의 서비스 인터페이스
 *********************************/
public interface ProductService {
	
	/** 상세 **/
	//상품 상세(단건 조회)
	ProductDetailDTO getProdDetail(String pid);
	ReloadProdDTO getReloadProd(String pcid) ;
	
	//상품 리스트 조회: 카테고리
	ProductListDTO getProdListByCate(ProductListParamsDTO params);
	
	//상품 리스트: 브랜드
	ProductListDTO getProductsByBrand(ProductListParamsDTO params);
	
	//상품 리스트: 브랜드 + 카테고리
	ProductListDTO getProductListByBrandAndCategory(ProductListParamsDTO params);
	
	//카테고리에 따른 카테고리 리스트 조회
	CategoriesDTO getCategories(String cate);
	
	//브랜드 + 대분류 카테고리 정보
	 CategorySetVO getBrandBigCategoryInfo(String bno);
	
	//브랜드 + 카테고리
	CategoriesDTO getCategoryListByBrandAndCategory(String brandcode, String cateno);
	
	
	/** 메인 **/
	//카테고리
	CategoryInfoMainDTO getCategoryListForMain();
	
	//신상품 상품 리스트
	List<ProductMainpDTO> getLatestProductsForMain(String cateno);
	
	//베스트 상품 리스트
	List<ProductMainpDTO> getBestProductsForMain(String cateno);
	
	/** 검색 **/
	//검색
	SeachResult search(String word);
	
	
	
}
