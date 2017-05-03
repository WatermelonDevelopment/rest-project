package ar.com.Watermelon.restproject.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Cliente;
import ar.com.Watermelon.restproject.model.Vehiculo;

@Transactional
public interface VehiculoDao extends BaseDao<Vehiculo>{
	List<Vehiculo> findAllByCliente(Cliente cliente);
}
