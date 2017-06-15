package ar.com.Watermelon.restproject.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Cliente;
import ar.com.Watermelon.restproject.model.Cochera;
import ar.com.Watermelon.restproject.model.Vehiculo;

@Transactional
public interface CocheraDao extends BaseDao<Cochera> {
	
	Cochera findOneByVehiculo(Vehiculo vehiculo);
	
	@Query("select sum(c.categoria.precio) from Cochera c where c.vehiculo.cliente = ?1")
	Float findAllCocherasByCliente(Cliente cliente);

	@Query("select distinct c.planta from Cochera c")
	List<Integer> findCocheras();

	List<Cochera> findAllByPlanta(Integer floor);
}
