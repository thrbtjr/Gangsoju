package com.hd03.gangsoju.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class MainController {
	
	@GetMapping({"/main", "/"})
	public String detail() {
		log.info("메인페이지 접근~");
		return "main/main";
	}
	
	@GetMapping("/main/navShop")
	public String navShop() {
		log.info("메인_네브샵 접근~");
		return "main/navShop";
	}
	

}
