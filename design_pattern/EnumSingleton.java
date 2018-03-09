package design_pattern.singleton.pratice;

enum EnumSingleton implements Singleton{
    INSTANCE;

    public void methodA() {
        System.out.println("Hello This is method A");
    }
}
