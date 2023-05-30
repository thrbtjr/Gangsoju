package com.hd03.gangsoju.service.cart;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hd03.gangsoju.domain.cart.CartDeleteAllVO;
import com.hd03.gangsoju.domain.cart.CartDeleteVO;
import com.hd03.gangsoju.domain.cart.CartFormDTO;
import com.hd03.gangsoju.domain.cart.CartInsertVO;
import com.hd03.gangsoju.domain.cart.CartProductVO;
import com.hd03.gangsoju.domain.cart.UpdateCartVO;

import com.hd03.gangsoju.mapper.CartMapper;

import lombok.extern.log4j.Log4j2;
//소규석
@Log4j2
@Service
public class CartServiceImpl implements CartService {

	@Autowired
	CartMapper cartMapper;
	
	
	@Override //CartFormDto에 장바구니 상품정보, 상품 종류 수량, 총 가격 , 추천 상품 입력
	public CartFormDTO makeCartForm(String mid) throws SQLException {

		List<CartProductVO> list = cartMapper.cartList(mid);
		int count = 0;
		int totalProduct = 0;
		for (CartProductVO vo : list) {
			totalProduct += vo.getDprice() * vo.getPquantity();
			count++;

		}
		List<String> recommand = cartMapper.cartRecommand();

		return new CartFormDTO(list, count, totalProduct, recommand);
	}

	@Override //장바구니 상품 업데이트
	public int cartUpdate(UpdateCartVO updateCartVo) throws SQLException {
		return cartMapper.cartUpdate(updateCartVo);
	}

	@Override //장바구니 상품 리스트 삭제
	public int cartDeleteAll(@Param("mid") String mid, CartDeleteVO cartDeleteVO) throws SQLException {
		log.info("service");
		List<CartDeleteAllVO> cartDeleteAllVO = cartDeleteVO.getList();
		log.info(cartDeleteAllVO);
		return cartMapper.cartDeleteAll(mid, cartDeleteAllVO);
	}

	@Override //장바구니 상품 하나 삭제
	public int cartDelete(@Param("mid") String mid, @Param("psid") String psid) throws SQLException {
		return cartMapper.cartDelete(mid, psid);
	}

	@Override // 장바구니 상품 추가
	public int cartInsert(CartInsertVO cartInsertVO) throws SQLException {
		return cartMapper.cartInsert(cartInsertVO);
	}
	
	@Override // 장바구니 상품 중복 여부 확인
	public boolean cartCheck(String mid, String psid) throws SQLException{
		return cartMapper.cartCheck(mid, psid);
	}
}
