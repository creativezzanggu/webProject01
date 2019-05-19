package sample02;

public class HelloSpring {

	public static void main(String[] args) {
		MessageBean messageBean = new MessageBeanKo(); //부모=자식 (다형성) 결합도 낮춰짐
		messageBean.sayHello("Spring");
	}

}
