package com.hd03.gangsoju.controller;

import java.security.Principal;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hd03.gangsoju.domain.cart.CartInsertVO;
import com.hd03.gangsoju.service.cart.CartService;

/*********************************
 * @function : CartRestController
 * @author : 김주현
 * 상품 상세에서 쇼핑백에 상품을 담는 과정의 컨트롤러
 *********************************/
@RestController
@RequestMapping("/api")
public class CartRestController {
	
	@Autowired
	public CartService cartService;
	
	@PostMapping("/cart")
	public ResponseEntity<Boolean> insertCart(CartInsertVO cartInsertVO,Principal principal) throws SQLException{
		cartInsertVO.setMid(principal.getName()) ;
		cartService.cartInsert(cartInsertVO);
		return new ResponseEntity<>(true, HttpStatus.OK);
	}
	
	@PostMapping("/cartcheck")
	public ResponseEntity<Boolean> cartCheck(Principal principal, @RequestParam("psid") String psid) throws SQLException{
		if(cartService.cartCheck(principal.getName(), psid)) { //이미 존재하면 true
			return new ResponseEntity<>(false, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(true, HttpStatus.OK); 
		}
		
	}
	
}
