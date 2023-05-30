package com.hd03.gangsoju.service;

import java.security.Principal;
import java.sql.SQLException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hd03.gangsoju.domain.cart.CartInsertVO;
import com.hd03.gangsoju.service.cart.CartService;

import lombok.extern.log4j.Log4j2;
//소규석

@SpringBootTest
@Log4j2
public class OrderServiceTest {
	
	@Autowired
	CartService cartService;

	private final String mid= "kang@naver.com";
//	private final String psid="MW2CAFOT052W_BK_S";
	private final String psid="LC2D1ASZ025W_YL_245";
	@Test
	public void checkCartTest() {
		;
		//String psid="LC2D1ASZ025W_YL_245";
		try {
			Boolean check=cartService.cartCheck(mid, psid);
			log.info(check);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	/*
	@Test
	public void cartInsertTest() {
		CartInsertVO cartInsertVO = new CartInsertVO();
		cartInsertVO.setMid(mid);
		cartInsertVO.setPsid(psid);
		cartInsertVO.setPquantity(2);
		try {
			int result = cartService.cartInsert(cartInsertVO);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	*/
}
