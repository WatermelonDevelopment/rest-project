package ar.com.Watermelon.restproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@EnableAutoConfiguration
@ComponentScan(basePackages = "ar.com.Watermelon.restproject")
@PropertySource({ "application.properties", "data.properties" })
public class App {

	@RequestMapping(value = "/")
    public ModelAndView redirectToMainPage() {
        return new ModelAndView("redirect:/" + "index.html");
    }

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

}
