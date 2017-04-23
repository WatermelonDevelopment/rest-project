package ar.com.Watermelon.restproject.dao;

import org.springframework.data.envers.repository.support.EnversRevisionRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Cliente;

@Transactional
public interface ClienteDao extends EnversRevisionRepository<Cliente, Long, Integer>, JpaSpecificationExecutor<Cliente> {

}
