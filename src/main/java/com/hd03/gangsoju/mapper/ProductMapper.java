package com.hd03.gangsoju.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.hd03.gangsoju.domain.product.Category;
import com.hd03.gangsoju.domain.product.CategoryForMainDTO;
import com.hd03.gangsoju.domain.product.CategorySetVO;
import com.hd03.gangsoju.domain.product.ProductDetailCommonVO;
import com.hd03.gangsoju.domain.product.ProductMainpDTO;
import com.hd03.gangsoju.domain.product.RecommendProdListDTO;
import com.hd03.gangsoju.domain.product.ReloadProdDTO;
import com.hd03.gangsoju.domain.product.SearchProductDTO;
import com.hd03.gangsoju.domain.product.SimpleProductDTO;

/*********************************
 * @function : ProductMapper
 * @author : 김주현
 * 상품 기능의 매퍼 인터페이스
 *********************************/
@Mapper
public interface ProductMapper {
	
	/**상품 상세**/
	//상품 상세 정보
	ProductDetailCommonVO getProductDetail(String pid);
	
	//추천 상품
	List<RecommendProdListDTO> getRecommendProdList(String bno, String pid);
	
	//함께 코디한 상품
	List<SimpleProductDTO> getWithCodyList(String pcid);
	
	//색상 선택시 상품 정보 가져오기
	ReloadProdDTO reloadProd(String pcid);
	
	/**상품 리스트**/
	
	//카테고리 별 상품 리스트
	List<SimpleProductDTO> getProdListByCate(List<String> pids);
	
	//브랜드 별 상품 리스트
	 List<SimpleProductDTO> findAllProductsFromBrand(List<String> pids);
	
	//브랜드 + 카테고리 별 상품 리스트
	 List<SimpleProductDTO> getProdListByBrandAndCategory(List<String> pids);
	
	/* 카테고리 가져오기 */
	//대+중분류
	CategorySetVO getCategoryNamesDepth1(String cate);
	
	//중+소분류
	CategorySetVO getCategoryNamesDepth2or3(String cate);
	
	//대분류
	List<Category> getDepth1Categories();
	
	//중분류
	List<Category> getDepth2Categories(String cate);
	
	//소분류
	List<Category> getDepth3Categories(String cate);
	
	//브랜드 정보 가져오기
	Category findOneBrandInfo(String bno);
	
	//브랜드 별 대분류 카테고리 + 브랜드정보
	CategorySetVO findBigCategoryFromBrand(String bno);
	
	/* 상품 개수 */
	int getProdListCount(@Param("cate") String cate);
	int prodCountFromBrand(String bno);
	int prodCountFromBrandAndCateno(@Param("bno") String bno, @Param("cateno") String cateno);
	
	//브랜드의 상품 아이디 offset
	 List<String> getPidList(@Param("cateno") String cateno,  @Param("offset") int offset);
	 List<String> findAllPidsFromBrand(@Param("bno") String bno, @Param("sort") String sort, @Param("offset") int offset);
	 List<String> getPidListByBrandAndCategory(@Param("bno") String bno, @Param("cate") String cate, @Param("offset") int offset);
	

	/** 메인 **/
	//신상품
	List<ProductMainpDTO> getNewestProducts(@Param("date") String date,  @Param("cateno") String cateno);
	List<CategoryForMainDTO> getNewestCategories(@Param("date") String date);
	
	//베스트
	List<ProductMainpDTO> getBestProducts(@Param("date") String date, @Param("date2") String date2, @Param("cateno") String cateno);
	List<CategoryForMainDTO> getBestCategories(@Param("date") String date, @Param("date2") String date2);
	
	/** 검색 **/
	List<SearchProductDTO> searchProducts(String word);
}