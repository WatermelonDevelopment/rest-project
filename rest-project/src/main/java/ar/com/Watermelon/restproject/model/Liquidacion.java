package ar.com.Watermelon.restproject.model;

import java.util.Date;

public class Liquidacion {
	private long id;
	
	private Cliente cliente;
	private String fecha; //AAAAmm
	private float monto;
	private Date fechaPago;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Cliente getCliente() {
		return cliente;
	}
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public float getMonto() {
		return monto;
	}
	public void setMonto(float monto) {
		this.monto = monto;
	}
	public Date getFechaPago() {
		return fechaPago;
	}
	public void setFechaPago(Date fechaPago) {
		this.fechaPago = fechaPago;
	}
}
