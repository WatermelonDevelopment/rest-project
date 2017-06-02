package ar.com.Watermelon.restproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class FacturacionService {

	@Autowired
	private SimpMessagingTemplate msgTemplate;
	
	@Async
	public void generarFacturacion(){
	 
		try{
			//x tareas que interactuan con la base
			//logica java, 
			//etc
			Respuesta r = new Respuesta();
			r.setMensaje("Se ha generado la facturacion");
			msgTemplate.convertAndSend("/topic/facturacion", r);
		}catch(Exception e){
		msgTemplate.convertAndSend("/topic/facturacion", "E:2222323");
//	logger.error("Error facturando.. etc: " + e.getMessage());
		}
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