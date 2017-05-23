package ar.com.Watermelon.restproject.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Cliente;
import ar.com.Watermelon.restproject.model.Descuento;

@Transactional
public interface DescuentoDao extends BaseDao<Descuento> {

	List<Descuento> findAllByCliente(Cliente cliente);

}
