package com.hd03.gangsoju.service.order;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.hd03.gangsoju.domain.order.OrderCompleteVO;
import com.hd03.gangsoju.domain.order.OrderFormDTO;
import com.hd03.gangsoju.domain.order.OrdersDTO;
//소규석

public interface OrderService {
	
	OrderFormDTO makeOrderForm(String mid, List<String> psidList) throws SQLException;
	
	OrdersDTO insertOrderForm(@Param("ordersDTO") OrdersDTO ordersDTO,@Param("mid") String mid) throws SQLException;
	
	OrderCompleteVO orderCompleteVO(String mid, String oid) throws SQLException;

}
