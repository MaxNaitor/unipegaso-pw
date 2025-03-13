package uni;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("uni")
public class UnipegasoPwBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(UnipegasoPwBeApplication.class, args);
	}

}
