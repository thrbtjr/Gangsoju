package com.hd03.gangsoju.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hd03.gangsoju.domain.order.OrderItemVO;
import com.hd03.gangsoju.domain.order.OrderMemberVO;

import lombok.extern.log4j.Log4j2;
//소규석

@SpringBootTest
@Log4j2
public class OrderMapperTest {
	
	@Autowired
	private OrderMapper mapper;
	
	private final String mid= "kang@naver.com";
	/*
	@Test
	public void getOrderTest() {
		
			
			List<OrderProductVO> list;
			try {
				list = mapper.orderList(mid);
				list.forEach(order -> log.info(order));
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
	*/
	@Test
	public void getMemberTest() {
		try {
			OrderMemberVO vo=mapper.orderMember(mid);
			log.info(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@Test
	public void boughtItemDeleteTest() throws SQLException {
		OrderItemVO orderItem = new OrderItemVO();
		orderItem.setPsid("1");
		orderItem.setOicount("2");
		orderItem.setOitotalPrice("100");
		orderItem.setOphone("010-1111-2222");
		
		List<OrderItemVO> list = new ArrayList<OrderItemVO>();
		list.add(orderItem);
		
		

		int result = mapper.boughtItemDelete(list, mid);
		log.info(result);
	}



}
