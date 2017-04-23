package ar.com.Watermelon.restproject.dao;

import org.springframework.data.envers.repository.support.EnversRevisionRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Empleado;
import ar.com.Watermelon.restproject.model.Usuario;

@Transactional
public interface EmpleadoDao extends EnversRevisionRepository<Empleado, Long, Integer> {

}
