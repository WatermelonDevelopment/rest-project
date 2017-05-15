package ar.com.Watermelon.restproject.model;

public class Factura {
	
	private Liquidacion liquidacion;
	private boolean pagado;
	public Liquidacion getLiquidacion() {
		return liquidacion;
	}
	public void setLiquidacion(Liquidacion liquidacion) {
		this.liquidacion = liquidacion;
	}
	public boolean isPagado() {
		return pagado;
	}
	public void setPagado(boolean pagado) {
		this.pagado = pagado;
	}
	
}
