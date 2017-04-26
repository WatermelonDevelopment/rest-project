package ar.com.Watermelon.restproject.dao;

import org.springframework.data.envers.repository.support.EnversRevisionRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;
@NoRepositoryBean
public interface BaseDao<E> extends EnversRevisionRepository<E, Long, Integer>, JpaSpecificationExecutor<E> {

}
