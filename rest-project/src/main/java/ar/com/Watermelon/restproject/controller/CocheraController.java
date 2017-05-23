package ar.com.Watermelon.restproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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

}
