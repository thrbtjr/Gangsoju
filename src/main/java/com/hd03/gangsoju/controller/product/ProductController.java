package com.hd03.gangsoju.controller.product;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import com.hd03.gangsoju.service.product.ProductService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

/*********************************
 * @function : ProductController
 * @author : 김주현
 * 상품 전반을 거치는 컨트롤러
 *********************************/
@Controller
@RequiredArgsConstructor
@Log4j2
public class ProductController {

	private final ProductService productService;

	@GetMapping("/p/detail/{pcid}")
	public String getProdDetail(@PathVariable String pcid, Model model) {
		log.info("상품 상세");
		model.addAttribute("detail", productService.getProdDetail(pcid));
		return "product/detail";
	}
	
	@GetMapping("/c/{cateno}")
	public String getProdListCategory(@PathVariable String cateno, Model model) {
		String realCate = cateno.split("#")[0];
		log.info("[카테고리 only]" + realCate);
		model.addAttribute("cateInfo", productService.getCategories(realCate));
		model.addAttribute("categoryCode", realCate);
		return "product/prod_list";
	}
	
	@GetMapping("/b/{bno}")
	public String getBrandProducts(@PathVariable String bno, Model model) {
		log.info("[brand only]" + bno);
		model.addAttribute("cateInfo", productService.getBrandBigCategoryInfo(bno));
		return "product/prod_list_brand";
	}
	
	@GetMapping("/b/{bno}/{cateno}")
	public String getBrandAndCateProducts(@PathVariable String bno, @PathVariable String cateno, Model model) {
		log.info("[brand and cate]" + bno + "/" + cateno);
		String realCate = cateno.split("#")[0];
		model.addAttribute("cateInfo", productService.getCategoryListByBrandAndCategory(bno, realCate));
		model.addAttribute("categoryCode", realCate);
		return "product/prod_list_brand_cate";
	}
	

	//검색 폼
	@GetMapping("/searchform")
	public String searchForm() {
		return "product/search";
	}
	
	//검색결과
	@GetMapping("/dosearch")
	public String dosearch(@RequestParam String word, Model model) {
		model.addAttribute("result", productService.search(word));
		return "product/search_result";
	}
}
