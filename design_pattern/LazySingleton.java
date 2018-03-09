package design_pattern.singleton.pratice;

import java.io.Serializable;

public class LazySingleton implements Singleton, Serializable {
    public static final String NAME = "LazySingleton";

    private static final class SingletonHolder {
        private static final LazySingleton INSTANCE = new LazySingleton();
    }

    private LazySingleton() {
        System.out.println("Create LazySingleton");
    }

    public static LazySingleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}
