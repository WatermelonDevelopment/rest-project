package ar.com.Watermelon.restproject.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Liquidacion;

@Transactional
public interface LiquidacionDao extends BaseDao<Liquidacion> {
	
//	@Query("select count(l)>0  from Liquidacion l where l.fecha")// == :liquidacion.fecha")//:liquidacion.fecha AND l.cliente == :liquidacion.cliente")
	@Query("select count(l)>0 from Liquidacion")// l where l.fecha == :liquidacion.fecha :liquidacion.fecha AND l.cliente == :liquidacion.cliente")
	float exists(Liquidacion liquidacion);
}
