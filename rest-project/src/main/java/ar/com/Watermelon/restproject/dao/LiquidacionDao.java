package ar.com.Watermelon.restproject.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Cliente;
import ar.com.Watermelon.restproject.model.Descuento;
import ar.com.Watermelon.restproject.model.Liquidacion;

@Transactional
public interface LiquidacionDao extends BaseDao<Liquidacion> {
	
	@Query("select count(l.id)>0 from Liquidacion l where l.fecha = :idFecha and l.cliente.id = :idCliente")
	boolean exists(@Param("idFecha")String idFecha,@Param("idCliente")Long idCliente);
	
//	@SQLUpdate( sql="UPDATE Liquidacion SET fechaPago = ?1,  WHERE id = ?2")
	@Modifying
	@Query("update Liquidacion l set l.fechaPago = :fecha where l.id = :id" )
	void pagar(@Param("fecha")Date fecha,@Param("id")Long id);

	List<Liquidacion> findAllByCliente(Cliente cliente);
	
}
