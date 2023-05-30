package com.hd03.gangsoju.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.hd03.gangsoju.domain.order.OrderCompleteVO;
import com.hd03.gangsoju.domain.order.OrderItemVO;
import com.hd03.gangsoju.domain.order.OrderMemberVO;
import com.hd03.gangsoju.domain.order.OrderProductVO;
import com.hd03.gangsoju.domain.order.OrdersDTO;
//소규석
@Mapper
public interface OrderMapper {

	//주문 정보 리스트
	public OrderProductVO orderList(String mid,String psid) throws SQLException;

	//수령인 정보
	public OrderMemberVO orderMember(String mid) throws SQLException;

	//ORDERS 테이블에 정보 입력
	public int insertOrders(@Param("ordersDTO") OrdersDTO ordersDTO, @Param("mid") String mid)
			throws SQLException;

	//ORDER_ITEM 테이블에 정보 입력 
	public int insertOrderItem(@Param("list") List<OrderItemVO> list, @Param("mid") String mid,
			@Param("oid") String oid) throws SQLException;

	//장바구니에서 산 물건만 삭제
	public int boughtItemDelete(@Param("list") List<OrderItemVO> list, @Param("mid") String mid) throws SQLException;
	
	//산 만큼 재고량 감소 이벤트
	public int stockUpdate(@Param("list") List<OrderItemVO> list) throws SQLException;

	//마일리지 감소 및 증가 계산
	public int mileageUpdate(@Param("ordersDTO") OrdersDTO ordersDTO, @Param("mid") String mid) throws SQLException;

	//사용한 쿠폰 삭제 이벤트
	public int usedCouponUpdate(@Param("ordersDTO") OrdersDTO ordersDTO, @Param("mid") String mid) throws SQLException;

	//MANIA등급 상승 이벤트
	public int gradeUpdate1(String mid) throws SQLException;
	
	//THE STAR 등급 상승 이벤트
	public int gradeUpdate2(String mid) throws SQLException;

	//MINIA 등급 정액 쿠폰 지급
	public int giveCoupon3(String mid) throws SQLException;

	//MINIA 등급 정률 쿠폰 지급
	public int giveCoupon4(String mid) throws SQLException;

	//THE STAR 등급 정률 쿠폰 지급
	public int giveCoupon5(String mid) throws SQLException;

	//THE STAR 등급 정액 쿠폰 지급
	public int giveCoupon6(String mid) throws SQLException;
	
	//주문번호를 받아 주문 완료 정보 출력 
	public OrderCompleteVO orderCompleteVO(String mid, String oid)throws SQLException;

}
