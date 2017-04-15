package ar.com.Watermelon.restproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ar.com.Watermelon.restproject.dao.VehiculoDao;
import ar.com.Watermelon.restproject.model.Vehiculo;

@Controller
@RequestMapping("/vehiculo")
public class VehiculoController extends BaseController<VehiculoDao, Vehiculo>{

	@Autowired
	VehiculoDao vehiculoDao;

	@Override
	protected VehiculoDao getService() {
		return vehiculoDao;
	}

	

}
