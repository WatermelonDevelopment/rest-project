package ar.com.Watermelon.restproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
@ComponentScan(basePackages = "ar.com.Watermelon.restproject")
@PropertySource({"application.properties", "data.properties"})
public class App {

	@RequestMapping("/")
	String home(){
		return "Home Reloaded";
	}
	
	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
	
	
	 
}
