package ar.com.Watermelon.restproject.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Cliente;

@Transactional
public interface ClienteDao extends CrudRepository<Cliente, Long> {

}
