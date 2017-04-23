package ar.com.Watermelon.restproject.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.springframework.data.envers.repository.support.EnversRevisionRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


public abstract class BaseController <S extends EnversRevisionRepository<E, Long, Integer>, E>{


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
	
	protected void onCreateSuccess(E e){
	}
	
	protected void onUpdateSuccess(E e){
		
	}
	
}
