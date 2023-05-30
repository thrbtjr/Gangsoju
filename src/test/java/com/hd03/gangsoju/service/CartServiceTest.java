package com.hd03.gangsoju.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hd03.gangsoju.domain.cart.CartFormDTO;
import com.hd03.gangsoju.domain.cart.UpdateCartVO;
import com.hd03.gangsoju.mapper.CartMapper;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2

public class CartServiceTest {
	
	private final String mid= "kang@naver.com";
	private final String psid= "MU2C7ASZ090WMY_BK_230";

	
	@Autowired
	CartMapper cartMapper;
	
	@Test
	public void getCartListTest() {
		
	
	}

}
