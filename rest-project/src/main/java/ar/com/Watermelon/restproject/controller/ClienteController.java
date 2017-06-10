package ar.com.Watermelon.restproject.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ar.com.Watermelon.restproject.dao.ClienteDao;
import ar.com.Watermelon.restproject.dao.CocheraDao;
import ar.com.Watermelon.restproject.dao.DescuentoDao;
import ar.com.Watermelon.restproject.dao.LiquidacionDao;
import ar.com.Watermelon.restproject.dao.VehiculoDao;
import ar.com.Watermelon.restproject.model.Cliente;
import ar.com.Watermelon.restproject.model.Descuento;
import ar.com.Watermelon.restproject.model.Liquidacion;
import ar.com.Watermelon.restproject.model.Vehiculo;
import ar.com.Watermelon.restproject.service.FacturacionService;

@Controller
@RequestMapping("/cliente")
public class ClienteController extends BaseController<ClienteDao, Cliente>{

	@Autowired
	ClienteDao clienteDao;
	@Autowired
	VehiculoDao vehiculoDao;
	@Autowired
	CocheraDao cocheraDao;
	@Autowired
	DescuentoDao descuentoDao;
	@Autowired
	LiquidacionDao liquidacionDao;
	@Autowired
	FacturacionService facturacionService;

	@Override
	protected ClienteDao getService() {
		return clienteDao;
	}
	
	@RequestMapping(value = "/{id}/vehiculos", method = RequestMethod.GET)
	public @ResponseBody List<Vehiculo> vehiculos(@PathVariable Long id) {
		Cliente cliente = getService().findOne(id);
		return vehiculoDao.findAllByCliente(cliente);
	}
	
	@RequestMapping(value = "/{id}/descuentos", method = RequestMethod.GET)
	public @ResponseBody List<Descuento> descuentos(@PathVariable Long id) {
		Cliente cliente = getService().findOne(id);
		return descuentoDao.findAllByCliente(cliente);
	}
	
	@RequestMapping(value = "/{id}/liquidacion", method = RequestMethod.GET)
	public @ResponseBody List<Liquidacion> liquidacion(@PathVariable Long id) {
		Cliente cliente = getService().findOne(id);
		return liquidacionDao.findAllByCliente(cliente);
	}
	
	@RequestMapping(value = "/{idcliente}/liquidacion/{idliquidacion}", method = RequestMethod.GET)
	public @ResponseBody Liquidacion generarLiquidacion(@PathVariable Long idcliente,
			@PathVariable Long idliquidacion) {
		Liquidacion liquidacion = liquidacionDao.findOne(idliquidacion);
		return liquidacion;
		
	}
	
	@RequestMapping(value = "/{id}/generarLiquidacion", method = RequestMethod.GET)
	public @ResponseBody LiquidacionResponse generarLiquidacion(@PathVariable Long id) {
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		String fecha = sdf.format(new Date());
		LiquidacionResponse result = new LiquidacionResponse();
		if(liquidacionDao.exists(fecha,id) != null) {
			result.message = "Ya existe una liquidacion para ese cliente y mes";
		} else {
			result.liquidacion=facturacionService.generarFacturacionCliente(id);
			result.message="liquidacion generada con exito";
		}
		return result;
		}

	@RequestMapping(value = "/{idFactura}", method = RequestMethod.POST)
	public @ResponseBody void pagar(@PathVariable Long idFactura) {
		Date fecha = new Date(); 
		liquidacionDao.pagar(fecha, idFactura);
	}
	

	public class LiquidacionResponse {
		private Liquidacion liquidacion;
		private String message;
	}

}
