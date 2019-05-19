package sample03;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class HelloSpring {

	public static void main(String[] args) {
		//ApplicationContext context = new FileSystemXmlApplicationContext("src/applicationContext.xml");
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		MessageBean messageBean = (MessageBean)context.getBean("messageBean"); //getBean()은 object 타입으로 가져옴
		//MessageBean messageBean = new MessageBeanKo(); //부모=자식 (다형성) 결합도 낮춰짐
		messageBean.sayHello("Spring");
		System.out.println();
		
		MessageBean messageBean2 = context.getBean("messageBean", MessageBean.class); //MessageBean클래스 형태로 받아오겠다.
		messageBean2.sayHello("Spring");
		System.out.println();
		
		MessageBean messageBean3 = (MessageBean)context.getBean("messageBean");//getBean은 singleton으로 가져옴,메모리에 한번만 생성
		messageBean3.sayHello("Spring");
		System.out.println();
		
		if(context!=null) {
			((AbstractApplicationContext) context).close();
			//((ConfigurableApplicationContext)context).close();
		}
	}
}
