package com.hd03.gangsoju.service.product;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hd03.gangsoju.domain.product.CategoriesDTO;
import com.hd03.gangsoju.domain.product.Category;
import com.hd03.gangsoju.domain.product.CategoryForMainDTO;
import com.hd03.gangsoju.domain.product.CategoryInfoMainDTO;
import com.hd03.gangsoju.domain.product.CategorySetVO;
import com.hd03.gangsoju.domain.product.Pagination;
import com.hd03.gangsoju.domain.product.ProductDetailCommonVO;
import com.hd03.gangsoju.domain.product.ProductDetailDTO;
import com.hd03.gangsoju.domain.product.ProductListDTO;
import com.hd03.gangsoju.domain.product.ProductListParamsDTO;
import com.hd03.gangsoju.domain.product.ProductMainpDTO;
import com.hd03.gangsoju.domain.product.RecommendProdListDTO;
import com.hd03.gangsoju.domain.product.ReloadProdDTO;
import com.hd03.gangsoju.domain.product.SeachResult;
import com.hd03.gangsoju.domain.product.SearchProductDTO;
import com.hd03.gangsoju.domain.product.SimpleProductDTO;
import com.hd03.gangsoju.mapper.ProductMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

/*********************************
 * @function : ProductServiceImpl
 * @author : 김주현
 * 상품 기능의 서비스 구현체
 *********************************/
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Log4j2
public class ProductServiceImpl implements ProductService {

	private final ProductMapper productMapper;

	/** 상세 **/
	//상세
	@Override
	public ProductDetailDTO getProdDetail(String pcid) {

		// 내가 선택한 값
		log.info("상세: " + pcid);

		// 상품 정보
		String pid = pcid.substring(0, pcid.length() - 3);
		ProductDetailCommonVO allDetails = productMapper.getProductDetail(pid);
		
		// 색상 리스트에 내가 접근한 상품의 인덱스 찾기
		int idx = 0;
		if (!allDetails.getColors().get(0).getPcid().equals(pcid)) {
			for (int i = 0; i < allDetails.getColors().size(); i++) {
				if (allDetails.getColors().get(i).getPcid().equals(pcid)) {
					idx = i;
					break;
				}
			}
		}
		
		List<RecommendProdListDTO> recommendList = productMapper.getRecommendProdList(allDetails.getBno(), pid); // 추천
		List<SimpleProductDTO> withCodyList = productMapper.getWithCodyList(pcid); // 함께
		int milleage = (int) (allDetails.getColors().get(idx).getPcprice() * 0.05); // 마일리지(5%)

		return new ProductDetailDTO(allDetails, recommendList, withCodyList, milleage, pcid, idx);
	}
	
	//색상 변경에 따른 상품 정보
	public ReloadProdDTO getReloadProd(String pcid) {
		return productMapper.reloadProd(pcid);
	}

	/** 상품 리스트 **/
	// 카테고리P: 상품 리스트 + 페이징
	public ProductListDTO getProdListByCate(ProductListParamsDTO params) {

		int offset = (params.getPageNum() - 1) * params.getPageSize() + 1;
		
		List<String> list = productMapper.getPidList(params.getCategoryCode(), offset);
		List<SimpleProductDTO> products = productMapper.getProdListByCate(list);
		
		int totalCnt = productMapper.getProdListCount(params.getCategoryCode());
		Pagination pagination = Pagination.builder().totalNumberOfResults(totalCnt).build();

		return new ProductListDTO(pagination, products);

	}
	
	//브랜드P: 상품 리스트 + 페이징
	public ProductListDTO getProductsByBrand(ProductListParamsDTO params) {
		
		log.info("브랜드에 따른 상품들");
		int offset = (params.getPageNum() - 1) * params.getPageSize();
		String sort = processProductOrderSort(params.getProductOrderCode());
		
		List<String> list = productMapper.findAllPidsFromBrand(params.getBrandCode(), sort, offset);
		List<SimpleProductDTO> products = productMapper.findAllProductsFromBrand(list);
		
		int totalCnt = productMapper.prodCountFromBrand(params.getBrandCode());
		Pagination pagination = Pagination.builder().totalNumberOfResults(totalCnt).build();

		return new ProductListDTO(pagination, products);
	
	}

	//브랜드 + 카테고리P: [상품] 리스트 + 페이징
	public ProductListDTO getProductListByBrandAndCategory(ProductListParamsDTO params) {
		log.info("브랜드 + 카테고리 에 따른 상품 리스트");
		int offset = (params.getPageNum() - 1) * params.getPageSize() + 1;
		
		List<String> list = productMapper.getPidListByBrandAndCategory(params.getBrandCode(), params.getCategoryCode(), offset);
		List<SimpleProductDTO> products = productMapper.getProdListByBrandAndCategory(list);
		
		int totalCnt = productMapper.prodCountFromBrandAndCateno(params.getBrandCode(), params.getCategoryCode());
		Pagination pagination = Pagination.builder().totalNumberOfResults(totalCnt).build();
		return new ProductListDTO(pagination, products);
	}
	
	//공통P: 카테고리 리스트
	public CategoriesDTO getCategories(String cate) {
		
		List<Category> middleCategories = productMapper.getDepth2Categories(cate.substring(0, 2));
		
		if(cate.contains("we") || cate.contains("me")) //중복 중분류 카테고리 제거
			middleCategories.remove(0);
		
		//슈퍼, 서브 카테고리 리스트
		CategorySetVO categoryDTO = null;
		if (cate.length() == 2) { //대
			categoryDTO = productMapper.getCategoryNamesDepth1(cate);
		} else { //중, 서
			categoryDTO = productMapper.getCategoryNamesDepth2or3(cate.substring(0, 4));
		}
		
		//대분류: 영어 -> 한글
		String chooseCateName = "여성";
		if (cate.substring(0, 2).equals("me"))
			chooseCateName = "남성";
		else if (cate.substring(0, 2).equals("as"))
			chooseCateName = "잡화";
		Category bigCategory = new Category(cate.substring(0, 2), chooseCateName);

		return new CategoriesDTO(categoryDTO, middleCategories,bigCategory, cate, cate.length());
	}
	
	//브랜드P: 속한 대분류 카테고리 리스트
	public CategorySetVO getBrandBigCategoryInfo(String bno) {
		return productMapper.findBigCategoryFromBrand(bno);
	}
	
	//브랜드 + 카테고리P: [카테고리] 리스트
	public CategoriesDTO getCategoryListByBrandAndCategory(String brandcode, String cateno) {
		
		CategoriesDTO categoryDTO = getCategories(cateno);
		Category brand = productMapper.findOneBrandInfo(brandcode);
		categoryDTO.addBrandInfo(brand);
		
		return categoryDTO;
	}
	
	/** 메인 **/
	//신상품+베스트 카테고리
	public CategoryInfoMainDTO getCategoryListForMain(){
		
		//베스트
		log.info("베스트: " + getThisYearMonth() +"," +getTwoMonthAfterFromNow());
		List<CategoryForMainDTO> list = productMapper.getBestCategories(getThisYearMonth(), getTwoMonthAfterFromNow());
		
		//신상품 
		log.info("신상품");
		List<CategoryForMainDTO> newest = productMapper.getNewestCategories(getThisYearMonth());
		int totalCnt = 0;
		for(CategoryForMainDTO dto : newest) {
			totalCnt += dto.getTotalProdCnt();
			dto.addDisplayTypeTrue();
			list.add(dto);
		}
		
		return new CategoryInfoMainDTO(list, totalCnt);
	}
	
	//신상품 상품 리스트
	public List<ProductMainpDTO> getLatestProductsForMain(String cateno){
		List<ProductMainpDTO> list = productMapper.getNewestProducts(getThisYearMonth(), cateno);
		return list;
	}
	
	//베스트 상품 리스트
	public List<ProductMainpDTO> getBestProductsForMain(String cateno){
		List<ProductMainpDTO> list = productMapper.getBestProducts(getThisYearMonth(), getTwoMonthAfterFromNow(), cateno);
		return list;
	}
	
	/** 검색 **/
	//검색
	public SeachResult search(String word) {
		log.info(word);
		List<SearchProductDTO> result = new ArrayList<>();
		
		if(word == null || word.length() == 0)
			return new SeachResult(new ArrayList<>(), 0, word);
		
		word = word.trim();
		result = productMapper.searchProducts(word);
		
		if(result.size() == 0) //일치하는 결과가 없을 시 한 번 더
			result = productMapper.searchProducts(changeSearchWord(word));

		return new SeachResult(result, result.size(), word);
	}
	
	//신상품P: 현재 년-월 구하기
	private String getThisYearMonth() {
		return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
	}
	
	//신상품P: 두 달 뒤 년-월 구하기
	private String getTwoMonthAfterFromNow() {
		return LocalDate.now().plusMonths(3).format(DateTimeFormatter.ofPattern("yyyy-MM"));
	}
	
	//검색P: 검색어 일치하는 단어로 변경
	private String changeSearchWord(String orignal) {
		if(orignal.equals("치마"))
			return "스커트";
		if(orignal.equals("바지"))
			return "팬츠";
		return "+++";
	}
	
	//공통P: 상품 리스트 정렬 시 정렬 조건 변경
	private String processProductOrderSort(String param) {
		if(param.equals("HIGH"))
			return "pcprice desc";
		else if(param.equals("LOW"))
			return "pcprice";
		else if(param.equals("NEW"))
			return "preleasedate desc";
		else
			return "pc.pid";
	}
	
}
