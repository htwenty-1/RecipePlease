package com.recipe.a.controller;

import com.recipe.a.dto.PaymentDto;
import com.recipe.a.service.PaymentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Slf4j
@RestController
public class PaymentController {
	
	
	private final Logger logger = LoggerFactory.getLogger(PaymentController.class);
	
	private final PaymentService service;
	

	public PaymentController(PaymentService service) {
		this.service = service;
	}

	// 테스트모드 1
	@GetMapping("payment/testMode")
	public void testMode() {
		logger.info("테스트모드 접근 성공");
	}

	// 테스트모드 2
	@GetMapping("/payment/countTest")
	public String countTest() {
		logger.info("PaymentController testMode");
		int res = service.countPayment();
		if (res > 0) {
			return "bigger than 0";
		}
		return "0 or smaller than 0";
	}

	// 결제완료 후 구매내역을 테이블에 추가
	@PostMapping("/payment/addGoodsShoppingList")
	public String addGoodsShoppingList(PaymentDto dto) {
		logger.info("PaymentController addGoodsShoppingList()");
		int res = service.addGoodsShoppingList(dto);
		if (res > 0) {
			return "purchased";
		}
		return "not-purchased";
	}

	// 굿즈 반품
	@PostMapping("/payment/returnGoods")
	public String returnGoods(String memberId, int paymentSeq) {
		logger.info("PaymentController returnGoods()");
		boolean b = service.refundGoods(memberId, paymentSeq);
		return b ? "환불완료" : "환불실패";
	}

	// 결제내역 조회
//	@GetMapping("/payment/goodsPurchaseList")
//	public ResponseEntity<List<PaymentDto>> goodsPurchaseList(String memberId) {
//		logger.info("PaymentController goodsPurchaseList()");
//		return Optional.ofNullable(service.goodsPurchaseList(memberId))
//				.map(li -> ResponseEntity.ok(li))
//				.orElse(ResponseEntity.noContent().build());
//	}
	
	@GetMapping("/payment/goodsPurchaseList")
	public List<PaymentDto> goodsPurchaseList(String memberId) {
		logger.info("PaymentController goodsPurchaseList()");
		logger.info("memberId: " + memberId);
		return service.goodsPurchaseList(memberId);
	}
	
	// 결제 내역 상세
	@GetMapping("/payment/getPurchaseDetail")
	public PaymentDto getGoodsPurchaseDetail(int paymentSeq) {
		logger.info("PaymentController getGoodsPurchaseDetail()");
		
		return service.getGoodsPurchaseDetail(paymentSeq);
	}
	
	// 코인 구매
	@PostMapping("/payment/chargeCoin")
	public int chargeCoin(PaymentDto dto) {
		logger.info("PaymentController chargeCoin()");
		boolean resp = service.chargeCoin(dto);
		if (resp) {
			return 200;
		}
		return 500;
	}
}

