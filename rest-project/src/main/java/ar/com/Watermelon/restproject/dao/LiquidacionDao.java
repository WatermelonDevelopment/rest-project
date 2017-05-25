package ar.com.Watermelon.restproject.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Cliente;
import ar.com.Watermelon.restproject.model.Liquidacion;

@Transactional
public interface LiquidacionDao extends BaseDao<Liquidacion> {
	
	@Query("select count(l.id)>0 from Liquidacion l where l.fecha = :idFecha and l.cliente.id = :idCliente")
	boolean exists(@Param("idFecha")String idFecha,@Param("idCliente")Long idCliente);
	
}
