package ar.com.Watermelon.restproject.dao;

import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Usuario;

@Transactional
public interface UsuarioDao extends BaseDao<Usuario> {

	Usuario findByDni(String dni);

}
