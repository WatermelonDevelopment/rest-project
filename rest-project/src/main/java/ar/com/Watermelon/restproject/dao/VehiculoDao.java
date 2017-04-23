package ar.com.Watermelon.restproject.dao;

import org.springframework.data.envers.repository.support.EnversRevisionRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Usuario;
import ar.com.Watermelon.restproject.model.Vehiculo;

@Transactional
public interface VehiculoDao extends EnversRevisionRepository<Vehiculo, Long, Integer> {

}
