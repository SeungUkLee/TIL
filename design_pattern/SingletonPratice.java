package design_pattern.singleton.pratice;

import java.io.*;

public class SingletonPratice {
    public static final String LINE = "====================================";

    public static void main(String[] args) {

        /**
         * Singleton TEST
         */

        PrintLog(LINE);
        PrintLog(OldSingleton.NAME); // OldSingleton.NAME 접근하는 순간 생성이 되어버려진다.
        PrintLog(LINE);
        System.out.println("Create OldSingleton 문구가 여기 출력하고 싶지만 출력안됨");
        final OldSingleton oldSingleton = OldSingleton.getInstance();
        PrintLog(LINE);
        final OldSingleton oldSingleton2 = OldSingleton.getInstance();

        PrintLog(LINE);
        // 두 오브젝이 동일 메모리상에 존재하는가?
        System.out.println("oldSingleton == oldSingleton2 => " +
                (oldSingleton == oldSingleton2));

        /**
         * LazySingleton TEST
         */
        PrintLog(LINE + "\nLazySingleton TEST\n");
        System.out.println(LazySingleton.NAME);
        PrintLog(LINE);
        final LazySingleton lazySingleton = LazySingleton.getInstance();
        PrintLog(LINE);
        final LazySingleton lazySingleton2 = LazySingleton.getInstance();

        System.out.println("lazySingleton == lazySingleton2 => " +
                (lazySingleton == lazySingleton2));


        /**
         * OldSingleton Problem (Serializable TEST)
         */
        PrintLog(LINE + "\nOldSingleton Problem (Serializable TEST)");

        final String filename = "/tmp/singleton/singleton.jsz";
        SingletonTest_Serializable(filename, oldSingleton);
        SingletonTest_DeSerializable(filename, oldSingleton);



        /**
         * LazySingleton TEST (Serializable TEST)
         */

        PrintLog(LINE + "\nLazySingleton TEST (Serializable TEST)");
        SingletonTest_Serializable(filename, lazySingleton);
        SingletonTest_DeSerializable(filename, lazySingleton);

        /**
         * Use Enum (Serializable TEST)
         */

        PrintLog(LINE + "\nUse Enum (Serializable TEST)");

        final EnumSingleton newSingleton = EnumSingleton.INSTANCE;
        final EnumSingleton newSingleton2 = EnumSingleton.INSTANCE;

        System.out.println("newSingleton == newSingleton2 => " +
                (newSingleton == newSingleton2));

        SingletonTest_Serializable(filename, newSingleton);
        SingletonTest_DeSerializable(filename, newSingleton);
    }


    public static void PrintLog(String param) {
        System.out.println(param);
    }

    public static void SingletonTest_Serializable(String filename, Singleton instance) {

        try (FileOutputStream fileOut = new FileOutputStream(filename);
             ObjectOutputStream out = new ObjectOutputStream(fileOut)) {

            out.writeObject(instance);

            System.out.println("Serialized OldSingleton");
        } catch (IOException i) {
            i.printStackTrace();
        }

    }

    public static void SingletonTest_DeSerializable(String filename,  Singleton instance) {

        try (FileInputStream fileIn = new FileInputStream(filename);
             ObjectInputStream in = new ObjectInputStream(fileIn)){

            final Singleton deSerializedSingleton = (Singleton) in.readObject();

            System.out.println("Singleton before serialize == deSerialized singleton => " +
                    (instance == deSerializedSingleton));
            // false 로 나온다.

        } catch (IOException i) {
            i.printStackTrace();
        } catch (ClassNotFoundException c) {
            System.out.println("Class not found");
            c.printStackTrace();
        }
    }
}
