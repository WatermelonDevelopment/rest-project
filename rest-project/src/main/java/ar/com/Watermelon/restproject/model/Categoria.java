package ar.com.Watermelon.restproject.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Categoria {
	@GeneratedValue
	@Id
	private int id;
	private long precio;
	private TipoCateogoriaCochera tipoCochera;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public long getPrecio() {
		return precio;
	}
	public void setPrecio(long precio) {
		this.precio = precio;
	}
	public TipoCateogoriaCochera getTipoCochera() {
		return tipoCochera;
	}
	public void setTipoCochera(TipoCateogoriaCochera tipoCochera) {
		this.tipoCochera = tipoCochera;
	}
	
}
