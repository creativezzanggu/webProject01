package sample03;

public class MessageBeanKo implements MessageBean {
	private int num;
	public MessageBeanKo() {
		System.out.println("MessageBeanKo 생성자");// xml에서 class가 생성자를 부르는지 확인하기 위해 출력
	}
	@Override
	public void sayHello(String name) {
		num++;
		System.out.println("num="+num);
		System.out.println("안녕하세요 "+name+"!!");

	}

}
