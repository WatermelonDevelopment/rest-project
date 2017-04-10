package ar.com.Watermelon.restproject;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.SecurityConfigurer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.stereotype.Component;

import ar.com.Watermelon.restproject.dao.UsuarioDao;
import ar.com.Watermelon.restproject.model.Usuario;
import ar.com.Watermelon.restproject.xauth.XAuthTokenConfigurer;

@EnableWebMvcSecurity
@EnableWebSecurity(debug = true)
@Configuration
@Order
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

//		http.authorizeRequests().antMatchers("/conductores/**").hasAnyRole(CustomUserDetailsService.ROLE_CONDUCTOR, CustomUserDetailsService.ROLE_ADMINISTRADOR, CustomUserDetailsService.ROLE_OPERADOR);
//		http.authorizeRequests().antMatchers("/operadores/**").hasAnyRole(CustomUserDetailsService.ROLE_ADMINISTRADOR, CustomUserDetailsService.ROLE_OPERADOR);
//		http.authorizeRequests().antMatchers("/administradores/**").hasRole(CustomUserDetailsService.ROLE_ADMINISTRADOR);
//		http.authorizeRequests().antMatchers("/clientes/**").hasAnyRole(CustomUserDetailsService.ROLE_ADMINISTRADOR, CustomUserDetailsService.ROLE_OPERADOR);
		

		SecurityConfigurer<DefaultSecurityFilterChain, HttpSecurity> securityConfigurerAdapter = new XAuthTokenConfigurer(
				userDetailsServiceBean());
		http.apply(securityConfigurerAdapter);
	}

	@Override
	protected void configure(AuthenticationManagerBuilder authManagerBuilder) throws Exception {
		authManagerBuilder.userDetailsService(customUserDetailsService());
	}

	@Bean
	@Override
	public UserDetailsService userDetailsServiceBean() throws Exception {
		return super.userDetailsServiceBean();
	}
	
	@Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

	@Bean
	public CustomUserDetailsService customUserDetailsService(){
		return new CustomUserDetailsService();
	}
}

@Component
class CustomUserDetailsService implements UserDetailsService {

	@Autowired UsuarioDao usuarioDao;
	
    public static final String ROLE_ADMINISTRADOR = "ADMINISTRADOR";
    public static final String ROLE_OPERADOR = "OPERADOR";
    public static final String ROLE_CONDUCTOR = "CONDUCTOR";

    @SuppressWarnings("serial")
    static class SimpleUserDetails implements UserDetails {

        private String username;
        private String password;
        private boolean enabled = true;
        private Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();

        public SimpleUserDetails(String username, String pw, String... extraRoles) {
            this.username = username;
            this.password = pw;

            // setup roles
            Set<String> roles = new HashSet<String>();
            roles.addAll(Arrays.<String>asList(null == extraRoles ? new String[0] : extraRoles));

            // export them as part of authorities
            for (String r : roles) {
                authorities.add(new SimpleGrantedAuthority(role(r)));
            }

        }

        public String toString() {
            return "{enabled:" + isEnabled() + ", username:'" + getUsername() + "', password:'" + getPassword() + "'}";
        }

        @Override
        public boolean isEnabled() {
            return this.enabled;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return this.enabled;
        }

        @Override
        public boolean isAccountNonLocked() {
            return this.enabled;
        }

        @Override
        public boolean isAccountNonExpired() {
            return this.enabled;
        }

        @Override
        public String getUsername() {
            return this.username;
        }

        @Override
        public String getPassword() {
            return this.password;
        }

        private String role(String i) {
            return "ROLE_" + i;
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return this.authorities;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	
    	Usuario usuario = usuarioDao.findByDni(username);
    	
    	if(usuario != null){
    		return new SimpleUserDetails(usuario.getDni(), usuario.getPassword(), usuario.getTipo().toUpperCase());
    	}else{
    		return null;
    	}
    }
}
