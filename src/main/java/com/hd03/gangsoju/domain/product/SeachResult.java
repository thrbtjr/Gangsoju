package com.hd03.gangsoju.domain.product;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class SeachResult {

	private List<SearchProductDTO> products;
	private int total;
	private String searchword;
}
