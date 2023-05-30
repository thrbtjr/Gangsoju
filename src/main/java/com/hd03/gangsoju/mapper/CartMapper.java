package com.hd03.gangsoju.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.hd03.gangsoju.domain.cart.CartDeleteAllVO;
import com.hd03.gangsoju.domain.cart.CartInsertVO;
import com.hd03.gangsoju.domain.cart.CartProductVO;
import com.hd03.gangsoju.domain.cart.UpdateCartVO;
//소규석

@Mapper
public interface CartMapper {
	
	//장바구니 정보 불러오기
	public List<CartProductVO> cartList(String mid) throws SQLException;
	
	//장바구니 업데이트
	public int cartUpdate(UpdateCartVO updateCartVo) throws SQLException;
	
	//장바구니 삭제
	public int cartDelete(@Param("mid") String mid, @Param("psid") String psid) throws SQLException;
	
	//추천상품 리스트
	public List<String> cartRecommand() throws SQLException;

	//장바구니 상품 여러개 삭제
	public int cartDeleteAll(@Param("mid")String mid, @Param("list") List<CartDeleteAllVO> cartDeleteAllVO) throws SQLException;
	
	//장바구니 상품 추가
	public int cartInsert(CartInsertVO cartInsertVO) throws SQLException;
	
	//장바구니 중복 상품 여부
	public boolean cartCheck(@Param("mid") String mid, @Param("psid") String psid) throws SQLException;
}
