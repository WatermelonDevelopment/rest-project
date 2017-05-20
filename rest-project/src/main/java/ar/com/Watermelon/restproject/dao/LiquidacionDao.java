package ar.com.Watermelon.restproject.dao;

import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Liquidacion;

@Transactional
public interface LiquidacionDao extends BaseDao<Liquidacion> {

}
