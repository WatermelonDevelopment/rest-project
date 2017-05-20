package ar.com.Watermelon.restproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import ar.com.Watermelon.restproject.dao.LiquidacionDao;
import ar.com.Watermelon.restproject.model.Liquidacion;

@Controller
@RequestMapping("/liquidacion")
public class LiquidacionController extends BaseController<LiquidacionDao, Liquidacion>{

	@Autowired
	LiquidacionDao liquidacionDao;

	@Override
	protected LiquidacionDao getService() {
		return liquidacionDao;
	}

	

}
