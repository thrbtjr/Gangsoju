package com.hd03.gangsoju.controller.product;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hd03.gangsoju.domain.product.CategoriesDTO;
import com.hd03.gangsoju.domain.product.ProductListParamsDTO;
import com.hd03.gangsoju.service.product.ProductService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

/*********************************
 * @function : ProductRestController
 * @author : 김주현
 * 상품 전반을 거치는 rest 컨트롤러
 *********************************/
@RestController
@RequestMapping("/p/api")
@RequiredArgsConstructor
@Log4j2
public class ProductRestController {

	private final ProductService productService;
	
	//상품 리스트에서 카테고리의 관련 카테고리 리스트 출력(슈퍼, 서브..)
	@GetMapping("/categories")
	public ResponseEntity<CategoriesDTO> getCategories(ProductListParamsDTO dto){
		return new ResponseEntity<>(productService.getCategories(dto.getCategoryCode()), HttpStatus.OK);
	}
	
	//상품 리스트 출력 with 페이징 -카테고리만
	@GetMapping("/products")
	public ResponseEntity<?> getProductList(ProductListParamsDTO paramsDTO){
		log.info(paramsDTO); 
		return new ResponseEntity<>(productService.getProdListByCate(paramsDTO), HttpStatus.OK);
	}
	
	//상품 리스트 출력 with 페이징 -브랜드
	@GetMapping("/brands")
	public ResponseEntity<?> getProductListBrand(ProductListParamsDTO paramsDTO){
		if(paramsDTO.getCategoryCode() == null || paramsDTO.getCategoryCode().length() == 0) //브랜드 only
			return new ResponseEntity<>(productService.getProductsByBrand(paramsDTO), HttpStatus.OK);
		else  //브랜드 + cate
			return new ResponseEntity<>(productService.getProductListByBrandAndCategory(paramsDTO), HttpStatus.OK);
	}
	
	//메인: 신상품, 베스트 제품이 있는 카테고리(여자, 남자, 잡화)
	@GetMapping("/main/c")
	public ResponseEntity<?> getNewestCategories(){
		return new ResponseEntity<>(productService.getCategoryListForMain(), HttpStatus.OK);
	}
	
	//메인: 카테고리 별 신상품 리스트 조회
	@GetMapping("/main/new/p/{cateno}")
	public ResponseEntity<?> getNewestProducts(@PathVariable String cateno){
		return new ResponseEntity<>(productService.getLatestProductsForMain(cateno), HttpStatus.OK);
	}
	
	//메인: 카테고리 별 베스트 리스트 조회
	@GetMapping("/main/best/p/{cateno}")
	public ResponseEntity<?> getBestProducts(@PathVariable String cateno){
		return new ResponseEntity<>(productService.getBestProductsForMain(cateno), HttpStatus.OK);
	}
	
	//상품상세: 색상 변경 시, 변경된 상품 정보 조회
	@GetMapping("/detail/reloadCoordiSize/{pcid}")
	public ResponseEntity<?> getReloadCoordi(@PathVariable String pcid) {
		return new ResponseEntity<>(productService.getReloadProd(pcid), HttpStatus.OK);
	}
	
	//상품상세: 쇼핑백 담기에서 색상 변경 시, 변경된 상품 조회
	@GetMapping("/cart/reloadProd")
	public ResponseEntity<?> getReloadInCart(@RequestParam("productcode") String pcid) { //@RequestParam("buying_type") String buying
		return new ResponseEntity<>(productService.getReloadProd(pcid), HttpStatus.OK);
	}

}