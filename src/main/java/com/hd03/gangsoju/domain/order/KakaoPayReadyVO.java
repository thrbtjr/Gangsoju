package com.hd03.gangsoju.domain.order;
//소규석
import java.util.Date;

import lombok.Data;

@Data
public class KakaoPayReadyVO {
    
    //response
    private String tid, next_redirect_pc_url;
    private Date created_at;
    
}
