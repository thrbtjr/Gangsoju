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
 * @function : MemberController
 * @author : 함세강
 * 회원 전반을 거치는 컨트롤러
 *********************************/
@Controller
@Log4j2
@RequiredArgsConstructor
public class MemberController {
	
	private final MemberServiceImpl memberService;
	
	//회원가입 페이지 호출 컨트롤러
	@GetMapping("/register")
	public String registerForm() {
		log.info("회원가입 컨트롤러 호출");
		return "member/registerForm";
	}
	
	//회원가입 컨트롤러
	@PostMapping("/register")
	public String registerMember(LoginFormDTO dto) {
		log.info("회원가입 Post컨트롤러 호출");
		int insertCheck = memberService.insertMemberService(dto);
		return "member/registerSuccess";
	}
	
	//마이페이지 정보 호출 컨트롤러
	@GetMapping("/mypage")
	public String mypage(Principal pr, Model model) {
		log.info("마이페이지 컨트롤러 호출");
		String userId = pr.getName();
		MypageDTO mypagedto = memberService.getMyPageService(userId);
		model.addAttribute("mypagedto",mypagedto);
		log.info("mypagedto"+mypagedto);
		return "member/myPage";
	}
	
	
	//회원 탈퇴 과정 컨트롤러
	@PostMapping("/member/delete")
	public String postDeleteMember(Principal pr) {
		log.info("POST deleteMember 컨트롤러 호출");
		memberService.deleteMemberService(pr.getName());
		return "member/deleteSuccess";
	}
	
	//개인정보 변경, 회원탈퇴 과정 진행하기 위한 비밀번호 재확인 페이지 요청 컨트롤러
	@GetMapping("/checkpwd/{kind}")
	public String getDeleteUser(Principal pr,Model model,@PathVariable String kind) {
		model.addAttribute("userId",pr.getName());
		//비밀 번호 재확인을 한후  다음 페이지를 결정해 주기위해 kind 변수 사용 
		model.addAttribute("kind",kind);
		log.info(pr.getName());
		return "member/checkPwd";
	}
		
	
	//커스텀 로그인 화면으로 이동되는 컨트롤러
	@GetMapping("/customLogin")
	public String loginForm(@RequestParam(value = "error", required = false)String error,
            				@RequestParam(value = "exception", required = false)String exception,
            				RedirectAttributes rttr) {
		log.info("커스텀로그인 컨트롤러 호출");
		//로그인시 에러가 발생했을 경우 리다이렉트 시켜주는 부분
		if(error!=null) {
			log.info("exception : "+exception);
			rttr.addFlashAttribute("exception",exception);
			return "redirect:/customLoginError";
		}
		
		return "customLogin";
	}
	
	//로그인시 에러 설정을 진행해 주는 컨트롤러
	@GetMapping("/customLoginError")
	public String loginForm() {
		return "customLogin";
	}
	
	//회원정보 변경 페이지 호출 컨트롤러
	@GetMapping("/modifymember")
	public String modifyInfo(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {
		LoginMemberDTO dto = new LoginMemberDTO();
		dto.setMname(authMemberDTO.getName());
		dto.setMid(authMemberDTO.getUsername());
		log.info(dto);
		//회원 아이디와 이름을 모델에 담아서 회원정보 변경페이지로 값을 전달함
		model.addAttribute("memberInfo", dto);
		return "member/modifyMemberInfo";
	}
	
	//회원정보 수정 컨트롤러
	@PostMapping("/modifymember")
	public String modifyMember(ModifyFormDTO modifyFormDTO,Principal principal) {
		//회원 id와 이름, 핸드폰 번호를 매개 변수로 modifyMemberService호출
		memberService.modifyMemberService(principal.getName(),modifyFormDTO);
		return "member/modifySuccess";
	}
	
	
	//아이디 찾기 페이지 이동 컨트롤러
	@GetMapping("/find")
	public String findMember() {
		return "member/findMemberId";
	}
	
	//아이디 찾기 컨트톨러
	@PostMapping("/find")
	public String findMemberId(FindIdLastDTO findIdLastDTO,Model model) {
		String userId= memberService.findIdValService(findIdLastDTO);
		model.addAttribute("userId",userId);
		return "member/findMemberIdFinal";
	}
	
	//비밀번호 재설정 페이지 호출 컨트롤러
	@PostMapping("/resetpassword")
	public String resetpassword(@RequestParam("userId") String userId,Model model) {
		model.addAttribute("userId",userId);
		log.info(userId);
		log.info("비밀번호 재설정페이지 컨트롤러 호출");
		return "member/resetPassword";
	}
	
	//비밀번호 재설정 컨트롤러
	@PostMapping("/reset")
	public String reset(CheckPwdDTO chekPwdDTO) {
		memberService.resetPwdService(chekPwdDTO);
		log.info(chekPwdDTO);
		log.info("비밀번호 재설정 포스트 컨트롤러 호출");
		
		return "member/resetSuccess";
	}
	
	//비밀번호 찾기 페이지 이동 컨트롤러
	@GetMapping("/find/pwd")
	public String findPwd() {
		return "member/findPWd";
	}
	
	
}
