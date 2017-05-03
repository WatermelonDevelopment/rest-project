package ar.com.Watermelon.restproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ar.com.Watermelon.restproject.dao.ClienteDao;
import ar.com.Watermelon.restproject.dao.VehiculoDao;
import ar.com.Watermelon.restproject.model.Cliente;
import ar.com.Watermelon.restproject.model.Vehiculo;

@Controller
@RequestMapping("/cliente")
public class ClienteController extends BaseController<ClienteDao, Cliente>{

	@Autowired
	ClienteDao clienteDao;
	@Autowired
	VehiculoDao vehiculoDao;

	@Override
	protected ClienteDao getService() {
		return clienteDao;
	}
	
	@RequestMapping(value = "/{id}/vehiculos", method = RequestMethod.GET)
	public @ResponseBody List<Vehiculo> vehiculos(@PathVariable Long id) {
		Cliente cliente = getService().findOne(id);
		return vehiculoDao.findAllByCliente(cliente);
	}

}
