package ar.com.Watermelon.restproject.filter;

public class SearchCriteria {
	private String key;
	private String operation;
	private Object value;

	public SearchCriteria(String k, String o, Object v) {
		this.key = k;
		this.operation = o;
		this.value = v;
	}
	public String getKey() {
		return key;
	}
	public String getOperation() {
		return operation;
	}
	public Object getValue() {
		return value;
	}
}
