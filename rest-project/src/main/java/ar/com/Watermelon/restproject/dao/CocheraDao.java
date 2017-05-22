package ar.com.Watermelon.restproject.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Cliente;
import ar.com.Watermelon.restproject.model.Cochera;
import ar.com.Watermelon.restproject.model.Vehiculo;

@Transactional
public interface CocheraDao extends BaseDao<Cochera> {
	
	
	Cochera findOneByVehiculo(Vehiculo vehiculo);
	
	@Query("select sum(c.categoria.precio) from Cochera c where c.vehiculo.cliente = :cliente")
	float findAllCocherasByCliente(Cliente cliente);
	
}
