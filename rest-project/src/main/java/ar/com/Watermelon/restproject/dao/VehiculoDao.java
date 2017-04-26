package ar.com.Watermelon.restproject.dao;

import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Vehiculo;

@Transactional
public interface VehiculoDao extends BaseDao<Vehiculo>{

}
