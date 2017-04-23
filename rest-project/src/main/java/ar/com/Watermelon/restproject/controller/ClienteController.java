package ar.com.Watermelon.restproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ar.com.Watermelon.restproject.dao.ClienteDao;
import ar.com.Watermelon.restproject.model.Cliente;

@Controller
@RequestMapping("/cliente")
public class ClienteController extends BaseController<ClienteDao, Cliente>{

	@Autowired
	ClienteDao clienteDao;

	@Override
	protected ClienteDao getService() {
		return clienteDao;
	}
	
//	public String filter(Cliente c) {
//		String q = "Select * from clientes where nombre like '%"+ c.getNombre() + "%'";
//		return null;
//	}
	
	public void filter(String nombre, String apellido) {
		 
		
	    
	    
	}

	

}
