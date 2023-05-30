package com.hd03.gangsoju.controller;

import java.security.Principal;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.hd03.gangsoju.domain.order.KakaoPayApprovalVO;
import com.hd03.gangsoju.domain.order.OrdersDTO;
import com.hd03.gangsoju.service.order.KakaoPay;
import com.hd03.gangsoju.service.order.OrderService;

import lombok.extern.log4j.Log4j2;
//소규석
@Controller
@Log4j2
public class OrderController {

	@Autowired
	OrderService orderService;
	@Autowired
	KakaoPay kakaoPay;

	
	@GetMapping("/order") //주문 페이지
	public String order(String mid, Model model, Principal principal,@RequestParam List<String> list) {

		log.info(list);
		mid=principal.getName();
	
		try {
			model.addAttribute("orderList", orderService.makeOrderForm(mid,list));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "orders/order";
	}

	@GetMapping("/order-complete")  //주문 완료 페이지
	public String orderComplete(@RequestParam("pg_token") String pg_token, Model model,String mid,Principal principal) {
		mid=principal.getName();
		KakaoPayApprovalVO kakaoPayApprovalVO = kakaoPay.kakaoPayInfo(pg_token);
		String oid = kakaoPayApprovalVO.getItem_code();
		log.info("log log = " + oid);
		
		try {

			model.addAttribute("result",orderService.orderCompleteVO(mid, oid));
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "orders/order_complete";
	}

	@PostMapping("/order-form") //주문에서 카카오페이 api로 주문정보 전달
	public String orderForm(OrdersDTO ordersDTO, String mid,Principal principal, RedirectAttributes rttr) {
		mid=principal.getName();
		log.info(ordersDTO);
		try {
			orderService.insertOrderForm(ordersDTO, mid);
			
			rttr.addFlashAttribute("result", ordersDTO);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "redirect:"+kakaoPay.kakaoPayReady(ordersDTO);
	}
	 @GetMapping("/kakaoPaySuccess")// 카카오페이 주문 성공
	    public void kakaoPaySuccess(@RequestParam("pg_token") String pg_token, Model model) {
	        log.info("kakaoPaySuccess get............................................");
	        log.info("kakaoPaySuccess pg_token : " + pg_token);
	        model.addAttribute("info", kakaoPay.kakaoPayInfo(pg_token));
	    }
}
