package com.hd03.gangsoju.juhyun;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hd03.gangsoju.domain.product.CategorySetVO;
import com.hd03.gangsoju.domain.product.ProductDetailColorPerSizeVO;
import com.hd03.gangsoju.domain.product.ProductDetailCommonVO;
import com.hd03.gangsoju.domain.product.ProductDetailSizeVO;
import com.hd03.gangsoju.domain.product.RecommendProdListDTO;
import com.hd03.gangsoju.domain.product.SimpleProductDTO;
import com.hd03.gangsoju.mapper.ProductMapper;

import lombok.extern.log4j.Log4j2;


@SpringBootTest
@Log4j2
public class ProductMapperTests {

	@Autowired
	private ProductMapper productMapper;
	
	private static String pcid = "LC2CBWVT482W_DK";
	private static String pid = "LC2CBWVT482W";
	private static String bno = "br16";
	private static String cate = "as";
	
	@Test
	public void 디테일_common() {
		log.info("----------------------");
		ProductDetailCommonVO detail = productMapper.getProductDetail(pid);
		log.info(detail.getColors().size());
		for(ProductDetailColorPerSizeVO color : detail.getColors()) {
			log.info(color);
			for(ProductDetailSizeVO size: color.getSizes()) {
				log.info("\t" + size);
			}
		}
		log.info("----------------------");
	}
	
	@Test
	public void 추천상품() {
		log.info("----------------------");
		List<RecommendProdListDTO> list = productMapper.getRecommendProdList(bno, pid);
		log.info(list.size());
		for(RecommendProdListDTO r : list) {
			log.info(r.toString());
		}
		log.info("----------------------");
	}
	
	@Test
	public void 함께코디한_상품() {
		log.info("----------------------");
		List<SimpleProductDTO> list = productMapper.getWithCodyList(pcid);
//		SimpleProductDTO list = productMapper.getWithCodyList(pcid);
		log.info(list.size());
		for(SimpleProductDTO r : list) {
			log.info(r.toString());
		}
		log.info("----------------------");
	}

	/*
	@Test
	public void 카테고리_상품_리스트() {
		
		List<String> list = productMapper.getPidList(cate, 0); //cateno, offset
		log.info(list.size());
		for(String str: list) {
			log.info(str);
		}
		
		List<SimpleProductDTO> products = productMapper.getProdListByCate(list);
		
		log.info(products.size());
		
		for(SimpleProductDTO prod : products) {
			log.info(prod);
		}
	}
	*/
	@Test
	public void 대분류_선택시() {
		CategorySetVO list = productMapper.getCategoryNamesDepth1("we");
		log.info(list);
		log.info(list.getParentCategory());
//		for(Category cate : list.getCategories())
//			log.info(cate);
	}
	
	@Test
	public void 중분류_선택시() {
		CategorySetVO list = productMapper.getCategoryNamesDepth2or3("we03");
		log.info(list);
		log.info(list.getParentCategory());
//		for(Category cate : list.getCategories())
//			log.info(cate);
	}
	
	@Test
	public void 소분류_선택시() {
		CategorySetVO list = productMapper.getCategoryNamesDepth2or3("we031");
		log.info(list);
		log.info(list.getParentCategory());
//		for(Category cate : list.getCategories())
//			log.info(cate);
	}
	
	@Test
	public void 대_카테고리() {
		log.info(productMapper.getDepth1Categories());
	}
	
	@Test
	public void 중_카테고리() {
		log.info(productMapper.getDepth2Categories("we"));
	}
	
	@Test
	public void 소_카테고리() {
		log.info(productMapper.getDepth3Categories("we01"));
	}
	
	@Test 
	public void 브랜드_별_카테고리() {
		log.info(productMapper.findBigCategoryFromBrand("br07"));
	}
	/*
	@Test
	public void 브랜드_모든_상품_offset() {
		//List<String> pids = productMapper.findAllPidsFromBrand("br07", 0);
		List<SimpleProductDTO> list = productMapper.findAllProductsFromBrand(pids);
		log.info(pids.size());
		log.info(list.size());
		log.info(pids);
		log.info(list);
	}
	*/
	
	@Test
	public void 리로드_상품() {
		log.info(productMapper.reloadProd("TH2D1TRN623M_IV"));
	}
	
}
