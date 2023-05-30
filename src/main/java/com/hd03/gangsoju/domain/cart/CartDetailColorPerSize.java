package com.hd03.gangsoju.domain.cart;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
//소규석
@Getter
@ToString
@Setter 
public class CartDetailColorPerSize {
   
   private String ocolor;
   private String opccolorcode;
   private String opcchipimg;
   private String opcid;

   
   private List<CartDetailSizeVO> sizes;
}