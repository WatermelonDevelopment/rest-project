package ar.com.Watermelon.restproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ar.com.Watermelon.restproject.dao.CategoriaDao;
import ar.com.Watermelon.restproject.model.Categoria;

@Controller
@RequestMapping("/categoria")
public class CategoriaController extends BaseController<CategoriaDao, Categoria>{

	@Autowired
	CategoriaDao categoriaDao;

	@Override
	protected CategoriaDao getService() {
		return categoriaDao;
	}

	

}
