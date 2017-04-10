package ar.com.Watermelon.restproject.dao;

import java.util.List;

import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Cliente;

@Transactional
public interface ClienteDao extends Repository<Cliente, Long> {

	Cliente findById(Long id);

	List<Cliente> findAll();

	String save (Cliente persona);
	
	void delete (Long idCliente);
}
