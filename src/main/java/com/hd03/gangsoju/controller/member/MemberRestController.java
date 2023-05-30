package com.hd03.gangsoju.controller.member;

import java.security.Principal;
import java.text.ParseException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.hd03.gangsoju.domain.member.CheckExistDTO;
import com.hd03.gangsoju.domain.member.CheckIdDTO;
import com.hd03.gangsoju.domain.member.CheckIdValDTO;
import com.hd03.gangsoju.domain.member.CheckPhoneNumDTO;
import com.hd03.gangsoju.domain.member.CheckPwdDTO;
import com.hd03.gangsoju.domain.member.FindIdDTO;
import com.hd03.gangsoju.domain.member.FindIdLastDTO;
import com.hd03.gangsoju.domain.member.LoginFormDTO;
import com.hd03.gangsoju.domain.member.LoginMemberDTO;
import com.hd03.gangsoju.domain.member.MatchPwdDTO;
import com.hd03.gangsoju.domain.member.ModifyFormDTO;
import com.hd03.gangsoju.domain.member.MypageDTO;
import com.hd03.gangsoju.security.dto.AuthMemberDTO;
import com.hd03.gangsoju.service.Member.MemberServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

/*********************************
 * @function : MemberRestController
 * @author : 함세강
 * 회원 전반을 거치는 Rest컨트롤러
 *********************************/
@Controller
@Log4j2
@RequiredArgsConstructor
public class MemberRestController {
	
	private final MemberServiceImpl memberService;
	
	//비밀번호 재확인 컨트롤러
	@PostMapping("/checkpwd")
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	public boolean checkPwd(@RequestBody MatchPwdDTO dto,Principal pr) {
		boolean checkPwd = memberService.checkPwdService(pr.getName(),dto.getPwd()); 
		return checkPwd;
	}
	
	//회원 아이디 중복검사를 진행하는 컨트롤러
	@PostMapping("/emailCheck")
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	public CheckIdValDTO emailCheck(@RequestBody CheckIdDTO dto) {
		log.info(dto.getCheckMid());
		CheckIdValDTO checkIdValDTO = memberService.checkIdService(dto);
		
		return checkIdValDTO; 
	}
	
	
	//아이디 찾기에서 계정이 존재 하는지 확인하는 ajax요청 담당 컨트롤러
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	@PostMapping("/findId")
	public int postfindMember(@RequestBody FindIdDTO findIdDTO) {
		log.info("find_id : ajax 컨트롤러 호출");
		int checkVal=0;
		checkVal=memberService.findIdCheckService(findIdDTO);
		
		return checkVal;
	}
	
	//비밀번호 찾기 과정 중 아이디가 존재 하는지 확인 하는 컨트롤러
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	@PostMapping("/checkid")
	public int checkId(@RequestBody CheckExistDTO checkExistDTO) {
		log.info(checkExistDTO);
		int checkIdVal = memberService.checkIdService(checkExistDTO);
		log.info(checkIdVal);
		return checkIdVal;
	}
	
	//회원 핸드폰 번호 중복검사를 진행하는 컨트롤러
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	@PostMapping("/mphone")
	public int mphoneCheck(@RequestBody Map<String, String> phoneNumMap) {
		String phoneNum = phoneNumMap.get("mPhoneNumCheck");
		log.info(phoneNum);
		int checkIdVal= memberService.checkPhoneNumService(phoneNum);
		
		return checkIdVal;
	}
	
	
	
}
