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
	
	@RequestMapping(value = "/{idcliente}/liquidacion/{idliquidacion}", method = RequestMethod.GET)
	public @ResponseBody Liquidacion generarLiquidacion(@PathVariable Long idcliente,
			@PathVariable Long idliquidacion) {
		Liquidacion liquidacion = liquidacionDao.findOne(idliquidacion);
		return liquidacion;
		
	}
	
	@RequestMapping(value = "/{id}/generarLiquidacion", method = RequestMethod.GET)
	public @ResponseBody Liquidacion generarLiquidacion(@PathVariable Long id) {
		Cliente cliente = getService().findOne(id);

		float monto = cocheraDao.findAllCocherasByCliente(cliente);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Liquidacion liquidacion = new Liquidacion();
		liquidacion.setCliente(cliente);
		liquidacion.setFecha(sdf.format(new Date()));
		liquidacion.setMonto(monto);
		//TODO: check liquidacion doesn't exist
		
		//TODO: save liquidacion
		// return liq;
		return liquidacion;
	}
	
	
	
	@Scheduled(cron="* * * * *3 *")
	public void generarFactura(){
		
	}

}
