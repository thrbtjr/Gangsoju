package com.hd03.gangsoju.domain.order;
//소규석
import java.util.Date;

import lombok.Data;

@Data
public class AmountVO {
 
    private Integer total, tax_free, vat, point, discount;
}
