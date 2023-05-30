package com.hd03.gangsoju.juhyun;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hd03.gangsoju.domain.product.CategoriesDTO;
import com.hd03.gangsoju.service.product.ProductService;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class ProductServiceTests {

	@Autowired
	private ProductService productService;
	
	private static String pcid = "MU2C7ASZ090WMY_BK";
	
	@Test
	public void 상품상세_가져오기() {
		log.info(productService.getProdDetail(pcid));
	}
	
	@Test
	public void 상품리스트_브랜드() {
		log.info(productService.getProductsByBrand(null));
	}
	
	@Test
	public void 카테고리_가져오기() {
		
		log.info("====================");
		//대
		CategoriesDTO dto =  productService.getCategories("we");
		log.info("categories: " + dto.getCategories());
		log.info("middle: " + dto.getMiddleCategories());
		log.info("big: " + dto.getBigCategory());
		log.info("choose: " + dto.getChooseCateno());
		log.info("===================================");
		
		//중
		dto =  productService.getCategories("we03");
		log.info("categories: " + dto.getCategories());
		log.info("middle: " + dto.getMiddleCategories());
		log.info("big: " + dto.getBigCategory());
		log.info("choose: " + dto.getChooseCateno());
		log.info("===================================");
		
		//소
		dto =  productService.getCategories("we032");
		log.info("categories: " + dto.getCategories());
		log.info("middle: " + dto.getMiddleCategories());
		log.info("big: " + dto.getBigCategory());
		log.info("choose: " + dto.getChooseCateno());
		log.info("===================================");
	}
}
