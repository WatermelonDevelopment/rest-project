package ar.com.Watermelon.restproject.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

@Component
public class SimpleCORSFilter implements Filter {
	private static Logger logger = Logger.getLogger(SimpleCORSFilter.class);

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
		HttpServletResponse response = (HttpServletResponse) res;
		HttpServletRequest request = (HttpServletRequest)req;
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
		response.setHeader("Access-Control-Max-Age", "3600");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token");
		response.addHeader("Access-Control-Expose-Headers", "X-Auth-Token");
	    if (request.getMethod().equals("OPTIONS")) {
	        try {
	            response.getWriter().print("OK");
	            response.getWriter().flush();
	        } catch (IOException e) {
	        	logger.error("Revisar esta sección: " + e.getMessage());
	        }
	    } else {
	        chain.doFilter(request, response);
	    }
	}

	public void init(FilterConfig filterConfig) {}

	public void destroy() {}

}