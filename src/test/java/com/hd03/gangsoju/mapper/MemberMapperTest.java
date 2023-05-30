package com.hd03.gangsoju.mapper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hd03.gangsoju.domain.member.InsertMemberDTO;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class MemberMapperTest {
	
	@Autowired
	private MemberMapper memberMapper;
	
	@Test
	public void insertMapper() {
		
		InsertMemberDTO insertMemberDTO= new InsertMemberDTO();
		
		insertMemberDTO.setMid("3");
		insertMemberDTO.setMpassword("2");
		insertMemberDTO.setMname("ham");
		insertMemberDTO.setMemail("1");
		insertMemberDTO.setMphone("010202055");
		
		String mBirth = "1994년 07월 19일";
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy년 MM월 dd일");
		Date date = null;
		try {
			date = formatter.parse(mBirth);
		} catch (ParseException e1) {
			e1.printStackTrace();
		}
		//DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");
		//LocalDateTime date = LocalDateTime.parse(mBirth,formatter);
		
		insertMemberDTO.setMbirth(date);
		insertMemberDTO.setMgender(Integer.parseInt("0"));
		insertMemberDTO.setMtosno(0);
		insertMemberDTO.setMenabled(0);
		insertMemberDTO.setMrole("USER");
		
		int check=0;
		check = memberMapper.insertMember(insertMemberDTO);
		log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+check);
		
		
	}
	
}
