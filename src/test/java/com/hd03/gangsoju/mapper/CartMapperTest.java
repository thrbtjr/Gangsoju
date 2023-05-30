package com.hd03.gangsoju.mapper;
import java.sql.SQLException;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hd03.gangsoju.domain.cart.CartDetailColorPerSize;
import com.hd03.gangsoju.domain.cart.CartInsertVO;
import com.hd03.gangsoju.domain.cart.CartProductVO;
import com.hd03.gangsoju.domain.cart.UpdateCartVO;

import lombok.extern.log4j.Log4j2;
//소규석

@SpringBootTest
@Log4j2
public class CartMapperTest {
	
	@Autowired
	private CartMapper mapper;
	
	private final String mid= "kang@naver.com";
	private final String psid= "MU2C7ASZ090WMY_BK_230";

	
	@Test
	public void getCartTest() {
		try {
			
			List<CartProductVO> list = mapper.cartList(mid);
			list.forEach(cart -> log.info(cart));
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	@Test
	public void insertTest() {
		CartInsertVO cartInsert= new CartInsertVO();
		cartInsert.setMid(mid);
		
		cartInsert.setPsid(psid);
		cartInsert.setQty(3);
	}
	
	@Test
	public void updateTest() {
		try {
			UpdateCartVO updateCartVO = new UpdateCartVO();
			updateCartVO.setMid(mid);
			updateCartVO.setPsid("MU2C7ASZ090WMY_BK_230");
			updateCartVO.setPccolorcode("#000000");
			updateCartVO.setPsize("250");
			updateCartVO.setPquantity(10);
			log.info(updateCartVO);
			
			int result = mapper.cartUpdate(updateCartVO);
			log.info(result);
	
	
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@Test
	public void DeleteTest() throws SQLException {
		int result = mapper.cartDelete(mid, psid);
		log.info(result);
	}
	
	@Test
	public void CartRecommandTest() throws SQLException{
		List<String> list=mapper.cartRecommand();
		log.info(mapper.cartRecommand());
		list.forEach(cart -> log.info(cart));
	}
	
	@Test
	public void CartListTest() throws SQLException {

		log.info("----------------------");

		List<CartProductVO> detail = mapper.cartList(mid);
		
		for(int i = 0; i < detail.size(); i++) {
			for(CartDetailColorPerSize opt : detail.get(i).getOptions()) {
				log.info(opt);
			}
		}

		log.info("----------------------");
	}
	@Test
	public void OrderListTest() throws SQLException{
		
		
	}
	
	

}
