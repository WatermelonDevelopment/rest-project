package ar.com.Watermelon.restproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ar.com.Watermelon.restproject.dao.LiquidacionDao;
import ar.com.Watermelon.restproject.model.Liquidacion;
import ar.com.Watermelon.restproject.service.FacturacionService;

@Controller
@RequestMapping("/liquidacion")
public class LiquidacionController extends BaseController<LiquidacionDao, Liquidacion>{

	@Autowired
	LiquidacionDao liquidacionDao;

	@Override
	protected LiquidacionDao getService() {
		return liquidacionDao;
	}

//	boolean liquidacionExists() {
//		getService().ex
//		return false;
//	}
	
	
	@Autowired 
	private FacturacionService facturacionService;
	 
	@RequestMapping(value = "/generarFacturacion", method = RequestMethod.POST)
	public @ResponseBody String generarFacturacion(){
		facturacionService.generarFacturacion();
		return "SOLICITADO";
	}

}
