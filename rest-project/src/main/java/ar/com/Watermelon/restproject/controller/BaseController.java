package ar.com.Watermelon.restproject.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ar.com.Watermelon.restproject.dao.BaseDao;
import ar.com.Watermelon.restproject.filter.MySpecification;
import ar.com.Watermelon.restproject.filter.SearchCriteria;


public abstract class BaseController <S extends BaseDao<E> , E>{


	protected abstract S getService();

	@RequestMapping
	public @ResponseBody List<E> listado() {
		List<E> lista = new ArrayList<E>();

		Iterator<E> it = getService().findAll().iterator();

		while (it.hasNext()) {
			lista.add(it.next());
		}

		Collections.reverse(lista);
		
		return lista;
	}
	
	@RequestMapping("/paginado/{pagina}/{tamPagina}")
	public @ResponseBody Page<E> paginado(@PathVariable("pagina") int pagina,@PathVariable("tamPagina") int tamPagina) {

		PageRequest page = new PageRequest(pagina-1,tamPagina);
		
		return getService().findAll(page);
	}

	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody String delete(@PathVariable Long id){
		
		try{
			getService().delete(id);
		}catch(Exception e){
			return "Error: " + e.getMessage();
		}
		return "OK";
	}
	

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody E entry(@PathVariable Long id) {
		return getService().findOne(id);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public @ResponseBody E nuevo(@RequestBody E e) {
		getService().save(e);
		onCreateSuccess(e);
		return e;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	public @ResponseBody E actualizar(@RequestBody E e) {
		getService().save(e);
		onUpdateSuccess(e);
		return e;
	}
	
	
	@RequestMapping(value = "/buscar", method = RequestMethod.POST)
	public @ResponseBody List<E> buscar(@RequestBody Map<String,String> params) {
		
		if(params != null && !params.isEmpty() ) {
			Specifications<E> spec = null;
			
			for(Entry<String,String> e : params.entrySet()) {
				if (e.getValue() != "") {
					MySpecification<E> tmp = new MySpecification<E>(new SearchCriteria(e.getKey(),":",e.getValue()));
					
					if(spec == null){
						spec = Specifications.where(tmp);
					}else{
						spec = spec.and(tmp);
					} 
				}
				
			}
			
			return getService().findAll(spec);
		}
		
		return getService().findAll();
	}
	

	
	
	protected void onCreateSuccess(E e){
	}
	
	protected void onUpdateSuccess(E e){
		
	}
	
}
