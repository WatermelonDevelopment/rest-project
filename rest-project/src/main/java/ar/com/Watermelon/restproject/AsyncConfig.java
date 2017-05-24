package ar.com.Watermelon.restproject;

import java.util.concurrent.Executor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
 
@Configuration
@EnableScheduling
@EnableAsync
public class AsyncConfig {
	@Bean
    public Executor taskExecutor() {
        return new SimpleAsyncTaskExecutor();
    }
}
