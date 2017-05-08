package ar.com.Watermelon.restproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ar.com.Watermelon.restproject.dao.CocheraDao;
import ar.com.Watermelon.restproject.model.Cochera;

@Controller
@RequestMapping("/cochera")
public class CocheraController extends BaseController<CocheraDao, Cochera>{

	@Autowired
	CocheraDao cocheraDao;

	@Override
	protected CocheraDao getService() {
		return cocheraDao;
	}

	

}
