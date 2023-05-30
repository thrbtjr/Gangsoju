package com.hd03.gangsoju.service.cart;


import java.sql.SQLException;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import com.hd03.gangsoju.domain.cart.CartDeleteVO;
import com.hd03.gangsoju.domain.cart.CartFormDTO;
import com.hd03.gangsoju.domain.cart.CartInsertVO;
import com.hd03.gangsoju.domain.cart.UpdateCartVO;
//소규석



@Service
public interface CartService {
	public CartFormDTO makeCartForm(String mid) throws SQLException;
	
	public int cartUpdate(UpdateCartVO updateCartVo) throws SQLException;
	
	public int cartDelete(@Param("mid") String mid, @Param("psid") String psid) throws SQLException;
	
	public int cartDeleteAll(@Param("mid") String mid, @Param("cartDeleteVO") CartDeleteVO cartDeleteVO) throws SQLException;

	public int cartInsert(CartInsertVO cartInsertVO) throws SQLException;
	
	public boolean cartCheck(@Param("mid") String mid, @Param("psid") String psid) throws SQLException;
	
}
