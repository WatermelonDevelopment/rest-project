package ar.com.Watermelon.restproject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import ar.com.Watermelon.restproject.dao.UsuarioDao;
import ar.com.Watermelon.restproject.model.Usuario;

@Configuration
public class WebSecurityConfiguration extends GlobalAuthenticationConfigurerAdapter {
 
  @Autowired UsuarioDao usuarioDao;
 
  @Override
  public void init(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService());
  }
 
  @Bean
  UserDetailsService userDetailsService() {
    return new UserDetailsService() {
 
      @Override
      public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioDao.findByDni(username);
        
        
        if(usuario != null) {
        return new User(usuario.getDni(), usuario.getPassword(), true, true, true, true,
                AuthorityUtils.createAuthorityList(usuario.getTipo().toUpperCase()));
        } else {
          throw new UsernameNotFoundException("could not find the user '"
                  + username + "'");
        }
      }
      
    };
  }
}