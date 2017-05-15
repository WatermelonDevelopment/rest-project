package ar.com.Watermelon.restproject.dao;

import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Categoria;

@Transactional
public interface CategoriaDao extends BaseDao<Categoria> {

}
