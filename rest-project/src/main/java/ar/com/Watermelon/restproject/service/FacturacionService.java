package ar.com.Watermelon.restproject.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import ar.com.Watermelon.restproject.dao.ClienteDao;
import ar.com.Watermelon.restproject.dao.CocheraDao;
import ar.com.Watermelon.restproject.dao.DescuentoDao;
import ar.com.Watermelon.restproject.dao.LiquidacionDao;
import ar.com.Watermelon.restproject.model.Cliente;
import ar.com.Watermelon.restproject.model.Descuento;
import ar.com.Watermelon.restproject.model.Liquidacion;
import ar.com.Watermelon.restproject.model.tipoDescuento;

@Service
public class FacturacionService {

	@Autowired
	private SimpMessagingTemplate msgTemplate;
	@Autowired
	private LiquidacionDao liquidacionDao;
	@Autowired
	private ClienteDao clienteDao;
	@Autowired
	private CocheraDao cocheraDao;
	@Autowired
	private DescuentoDao descuentoDao;
	
	@Async
	public void generarFacturacion(){
	 
		Respuesta r = new Respuesta();
		try{
			
			for (Cliente c: clienteDao.findAll()) {
				generarFacturacionCliente(c.getId());
			}
			r.setMensaje("Se ha generado la facturacion");
			msgTemplate.convertAndSend("/topic/facturacion", r);
		}catch(Exception e){
			r.setMensaje("Ocurrio un error general en la facturacion");
		msgTemplate.convertAndSend("/topic/facturacion", r);
		}
	}
	
	
	public Liquidacion generarFacturacionCliente(long id) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		String fecha = sdf.format(new Date());
		Liquidacion liquidacion = liquidacionDao.exists(fecha,id);
		if(liquidacion == null) {
			liquidacion = new Liquidacion();
			Cliente cliente = clienteDao.findOne(id);
			liquidacion.setCliente(cliente);
			liquidacion.setFecha(sdf.format(new Date()));
			Float monto = cocheraDao.findAllCocherasByCliente(cliente);
			if(monto != null) {
				monto = calcularDescuentos(monto, cliente);
				liquidacion.setMonto(monto);
				liquidacionDao.save(liquidacion);
				System.out.println("Liquidacion generada para " + cliente.getId() + ", con fecha " + liquidacion.getFecha());
			} else {
				System.out.println("Error");
			}
		}
		return liquidacion;
	}

	private float calcularDescuentos(Float monto, Cliente cliente) {
		List<Descuento> descuentos = descuentoDao.findAllByCliente(cliente);
		float descuentoFijo = 0;
		float descuentoPorcentaje = 0;
		for (Descuento d : descuentos) {
			switch(d.getTipo()) {
				case FIJO:
					descuentoFijo += d.getValor();
					break;
				case PORCENTAJE:
					descuentoPorcentaje += d.getValor();
					break;
			}
		}
		
		float result = monto * (100 - descuentoPorcentaje)/100 - descuentoFijo;
		return result > 0 ? result : 0;
	}

//	second, minute, hour, day of month, month, day(s) of week
	@Scheduled(cron="0 0 12 1 * *")
	public void generarFactura(){
		generarFacturacion();
	}
	
	class Respuesta {
		String mensaje;

		public String getMensaje() {
			return mensaje;
		}

		public void setMensaje(String mensaje) {
			this.mensaje = mensaje;
		}
	}

}