package com.hd03.gangsoju.controller;

import java.security.Principal;
import java.sql.SQLException;


import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.hd03.gangsoju.domain.cart.CartDeleteVO;

import com.hd03.gangsoju.domain.cart.UpdateCartVO;
import com.hd03.gangsoju.mapper.CartMapper;
import com.hd03.gangsoju.service.cart.CartService;

import lombok.extern.log4j.Log4j2;
//소규석
@Log4j2
@Controller
public class CartController {
	
	@Autowired
	CartMapper cartMapper;
	
	@Autowired
	CartService cartService;
	

	@GetMapping("/cart") //장바구니 페이지
	public String cart(String mid,Model model, Principal principal) { 
	
		mid=principal.getName();
		try {
			model.addAttribute("cartList",cartService.makeCartForm(mid));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "orders/cart";
	}
	
	@PostMapping("/delete") //장바구니 삭제
	public String deleteCart(Principal principal, @Param("mid") String mid, @Param("psid") String psid) {
		
		mid=principal.getName();
		try {
			cartService.cartDelete(mid, psid);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "redirect:/cart";
		
	}
	
	
	@PostMapping("/deleteAll") //장바구니 여러개 삭제 
	public String deleteCartAll(Principal principal, @Param("mid") String mid, CartDeleteVO cartDeleteVO) {
		
		mid=principal.getName();
		log.info(cartDeleteVO);
		try {
			cartService.cartDeleteAll(mid, cartDeleteVO);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "redirect:/cart";
	}
	
	@PostMapping("/cart-update") //장바구니 업데이트
	public String update(Principal principal, @Param("mid") String mid, UpdateCartVO updateCartVo) {
		
	
		updateCartVo.setMid(principal.getName());
		try {
			cartService.cartUpdate(updateCartVo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "redirect:/cart";
		
	}

}
