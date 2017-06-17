package ar.com.Watermelon.restproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ar.com.Watermelon.restproject.dao.CocheraDao;
import ar.com.Watermelon.restproject.model.Cliente;
import ar.com.Watermelon.restproject.model.Cochera;
import ar.com.Watermelon.restproject.model.Vehiculo;

@Controller
@RequestMapping("/cochera")
public class CocheraController extends BaseController<CocheraDao, Cochera>{

	@Autowired
	CocheraDao cocheraDao;

	@Override
	protected CocheraDao getService() {
		return cocheraDao;
	}

	@RequestMapping(value = "/plantas", method = RequestMethod.GET)
	public @ResponseBody List<Integer> plantas() {
		return getService().findCocheras();
	}
	
	@RequestMapping(value = "/{floor}/cocheras", method = RequestMethod.GET)
	public @ResponseBody List<Cochera> cocheras(@PathVariable Integer floor) {
		return getService().findAllByPlanta(floor);
	}
	
	/**
	 * moves a Vehiculo to a Cochera. If the cochera was not empty, also moves that Vehiculo to the Cochera that the vehicle being moved in this method was using
	 * cocheraReal: actual persisted cochera, with the Vehiculo it holds before calling this method
	 * @param cocheraChanged cochera not persisted, given in the POST
	 * @return
	 */
	@RequestMapping(value = "/guardarEnrocar", method = RequestMethod.POST)
	public @ResponseBody Cochera guardarEnrocar(@RequestBody Cochera cocheraChanged) {
		Cochera cocheraReal = getService().findOne(cocheraChanged.getId());
		if (cocheraReal.getVehiculo() != null) {
			if (cocheraReal.getVehiculo().getId() == cocheraChanged.getVehiculo().getId()) {
				return cocheraChanged; 
			}
			Vehiculo vehiculoAux = cocheraReal.getVehiculo();
			Cochera cocheraAux = getService().findOneByVehiculo(cocheraChanged.getVehiculo());
			cocheraAux.setVehiculo(vehiculoAux);
			getService().save(cocheraAux);
		} else {
			getService().findOneByVehiculo(cocheraChanged.getVehiculo()).setVehiculo(null);
		}
		getService().save(cocheraChanged);
		onUpdateSuccess(cocheraChanged);
		return cocheraChanged;
	}

}
