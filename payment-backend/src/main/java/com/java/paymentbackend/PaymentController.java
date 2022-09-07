package com.java.paymentbackend;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.razorpay.*;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class PaymentController {
	
	@PostMapping("/create_order")
	public String createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
		System.out.println(data);
		
		int amt = Integer.parseInt(data.get("amount").toString());
		
		RazorpayClient client = new RazorpayClient("rzp_test_9p5Kn6VbUy2uaH", "HKaCH5wrQPWJpmdJipFLqw2w");
		
		JSONObject ob = new JSONObject();
		ob.put("amount", amt*100);
		ob.put("currency", "INR");
		ob.put("receipt", "txn_81728");
		
		
		// creating order
		Order order = client.Orders.create(ob);
		System.out.println(order);
		
		
		// if u want you can save the order in database
		
		return order.toString();
	}

}
