package ar.com.Watermelon.restproject.service;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Bootstrap {
	@Autowired
	FacturacionService facturacionService; 
	@PostConstruct
	public void init() {
		facturacionService.generarFacturacion();
	}
}
