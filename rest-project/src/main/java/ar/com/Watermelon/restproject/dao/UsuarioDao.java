package ar.com.Watermelon.restproject.dao;

import org.springframework.data.envers.repository.support.EnversRevisionRepository;
import org.springframework.transaction.annotation.Transactional;

import ar.com.Watermelon.restproject.model.Usuario;

@Transactional
public interface UsuarioDao extends EnversRevisionRepository<Usuario, Long, Integer> {

	Usuario findByDni(String dni);

}
