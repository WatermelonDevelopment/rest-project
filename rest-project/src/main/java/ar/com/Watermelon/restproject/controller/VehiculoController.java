package ar.com.Watermelon.restproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ar.com.Watermelon.restproject.dao.CocheraDao;
import ar.com.Watermelon.restproject.dao.VehiculoDao;
import ar.com.Watermelon.restproject.model.Cochera;
import ar.com.Watermelon.restproject.model.Vehiculo;

@Controller
@RequestMapping("/vehiculo")
public class VehiculoController extends BaseController<VehiculoDao, Vehiculo>{

	@Autowired
	VehiculoDao vehiculoDao;
	@Autowired
	CocheraDao cocheraDao;

	@Override
	protected VehiculoDao getService() {
		return vehiculoDao;
	}

	@RequestMapping(value = "/{id}/cochera", method = RequestMethod.GET)
	public @ResponseBody Cochera cochera(@PathVariable Long id) {
		Vehiculo v = getService().findOne(id);
		return cocheraDao.findOneByVehiculo(v);
	}
	

}
