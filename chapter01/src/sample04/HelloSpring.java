package sample04;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class HelloSpring {

	public static void main(String[] args) {
		//ApplicationContext context = new FileSystemXmlApplicationContext("src/applicationContext.xml");//경로 전부표시
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		Calc calc = context.getBean("calcAdd", Calc.class);
		calc.calculate(10, 20);
		
		calc = context.getBean("calcMul", Calc.class);
		calc.calculate(10, 20);
		System.out.println();
		
		if(context!=null) {
			//((AbstractApplicationContext)context).close();
			((ConfigurableApplicationContext)context).close();
		}

	}

}
