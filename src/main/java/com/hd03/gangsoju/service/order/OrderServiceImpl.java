package com.hd03.gangsoju.service.order;
//소규석
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.util.StringUtils;

import com.hd03.gangsoju.domain.order.OrderCompleteVO;
import com.hd03.gangsoju.domain.order.OrderFormDTO;
import com.hd03.gangsoju.domain.order.OrderItemVO;
import com.hd03.gangsoju.domain.order.OrderMemberVO;
import com.hd03.gangsoju.domain.order.OrderProductVO;
import com.hd03.gangsoju.domain.order.OrdersDTO;
import com.hd03.gangsoju.mapper.OrderMapper;

import lombok.extern.log4j.Log4j2;
@Log4j2
@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	OrderMapper mapper;
	
	
	@Override //상품 주문 정보 (주문 상품 총합 가격, 주문 상품 수량, 주문 상품 리스트, 주문한 사람 정보)
	public OrderFormDTO makeOrderForm(String mid,List<String> psidList) throws SQLException {
		
		log.info(psidList);

		List<OrderProductVO> list =  new ArrayList<>();
		for(String psid : psidList) {
			OrderProductVO orderProductVO = mapper.orderList(mid,psid);
			list.add(orderProductVO);
		}

		int totalPrice = 0;
		for (OrderProductVO vo : list) {
		
			totalPrice += vo.getDprice() * vo.getPquantity();
		}
		int count = list.size();
		// 멤버
		OrderMemberVO member = mapper.orderMember(mid);

		return new OrderFormDTO(totalPrice,count, list, member);
	}
	
	@Override //주문 번호를 받아 주문 완료 정보
	public OrderCompleteVO orderCompleteVO(String mid, String oid) throws SQLException {
		return mapper.orderCompleteVO(mid, oid);		
	}

	@Transactional
	@Override //상품 구매 일어나는 이벤트 
	public OrdersDTO insertOrderForm(OrdersDTO ordersDTO, String mid) throws SQLException {
		String oid = getOid();
		ordersDTO.setOid(oid);
		log.info("-------oid--------"+oid);
		
		mapper.insertOrders(ordersDTO, mid); 						//1. 상품 ORDERS 테이블 추가
		mapper.insertOrderItem(ordersDTO.getList(), mid, oid);		//2. 상품 ORDER_ITEM 테이블 추가
		mapper.boughtItemDelete(ordersDTO.getList(), mid);			//3. 산 상품 장바구니에서 삭제
		mapper.stockUpdate(ordersDTO.getList());					//4. 산 상품 재고 수량 업데이트
		mapper.mileageUpdate(ordersDTO, mid);						//5. 상품에 대한 마일리지 소모 및 적립 
		mapper.usedCouponUpdate(ordersDTO, mid);					//6. 사용한 쿠폰 상태 변경
		int result1=mapper.gradeUpdate1(mid);						//7. 멤버 등급 상승 이벤트 
		if (result1>0) {											//8. MANIA 등급 상승시 쿠폰 추가
			mapper.giveCoupon3(mid);
			mapper.giveCoupon4(mid);
		}
		int result2=mapper.gradeUpdate2(mid);						//9. THE STAR 등급상승시 쿠폰 추가
		if(result2>0) {
			mapper.giveCoupon5(mid);
			mapper.giveCoupon6(mid);
			}
		return ordersDTO;

	}
	// 주문 번호 생성
	private String getOid() {
		LocalDate now = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMM");

		// 포맷 적용
		String formatedNow = now.format(formatter);
		return formatedNow + "P" + UUID.randomUUID().toString().substring(0, 8);
	}

}
