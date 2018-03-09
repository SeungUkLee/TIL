package design_pattern.singleton.pratice;

import java.io.Serializable;

public class OldSingleton implements Singleton, Serializable {
    public static final String NAME = new String("OldSingleton");
    private static final OldSingleton INSTANCE = new OldSingleton();

//    static {
//        try {
//            INSTANCE = new OldSingleton();
//        } catch (Exception e) {
//            throw new RuntimeException("Exception Creating EagerSingleton2 instance!");
//        }
//    }

    private OldSingleton () {
        System.out.println("Create OldSingleton");
    }

    public static OldSingleton getInstance() {
        return INSTANCE;
    }
}
