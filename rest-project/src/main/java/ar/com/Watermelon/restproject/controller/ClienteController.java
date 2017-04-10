package ar.com.Watermelon.restproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ar.com.Watermelon.restproject.dao.ClienteDao;
import ar.com.Watermelon.restproject.model.Cliente;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

	@Autowired
	ClienteDao clienteDao;

	public ClienteController() {
		System.out.println("Hola");
	}

	@RequestMapping(value = "/listado", method = RequestMethod.GET)
	public List<Cliente> listado() {
		return clienteDao.findAll();
	}

	@RequestMapping(value = "/guardar", method = RequestMethod.POST)
	public @ResponseBody String guardar(@RequestBody Cliente cliente) {
		clienteDao.save(cliente);
		return "OK";
	}

	@RequestMapping(value = "/eliminar/{idCliente}", method = RequestMethod.POST)
	public String eliminar(@PathVariable("idCliente") String idCliente) {
		clienteDao.delete(Long.parseLong(idCliente));
		return "OK";
	}

}
