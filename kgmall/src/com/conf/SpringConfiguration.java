package com.conf;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfiguration {

	@Bean(name="dataSource")
	public BasicDataSource getBasicDataSource() {
		BasicDataSource basicDataSource = new BasicDataSource();
		basicDataSource.setDriverClassName("oracle.jdbc.driver.OracleDriver");
		basicDataSource.setUrl("jdbc:oracle:thin:@localhost:1521:xe");
		basicDataSource.setUsername("java");
		basicDataSource.setPassword("itbank");
		basicDataSource.setMaxTotal(20);
		basicDataSource.setMaxIdle(3);

		return basicDataSource;
	}
}
