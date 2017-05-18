package ar.com.Watermelon.restproject.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Cliente;
import ar.com.Watermelon.restproject.model.Cochera;

@Transactional
public interface CocheraDao extends BaseDao<Cochera> {
	
	@Query("select sum(c.categoria.precio) from Cochera c where c.vehiculo.cliente = ?1")
	float findAllCocherasByCliente(Cliente cliente);
	
}
