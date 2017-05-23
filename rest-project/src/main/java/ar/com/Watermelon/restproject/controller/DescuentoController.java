package ar.com.Watermelon.restproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ar.com.Watermelon.restproject.dao.DescuentoDao;
import ar.com.Watermelon.restproject.model.Descuento;

@Controller
@RequestMapping("/descuento")
public class DescuentoController extends BaseController<DescuentoDao, Descuento>{

	@Autowired
	DescuentoDao descuentoDao;

	@Override
	protected DescuentoDao getService() {
		return descuentoDao;
	}

	

}
