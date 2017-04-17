package ar.com.Watermelon.restproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ar.com.Watermelon.restproject.dao.EmpleadoDao;
import ar.com.Watermelon.restproject.model.Empleado;

@Controller
@RequestMapping("/empleado")
public class EmpleadoController extends BaseController<EmpleadoDao, Empleado>{

	@Autowired
	EmpleadoDao empleadoDao;

	@Override
	protected EmpleadoDao getService() {
		return empleadoDao;
	}

	

}
