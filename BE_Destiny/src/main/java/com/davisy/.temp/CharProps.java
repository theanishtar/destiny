package hanzihelper;

import java.util.Properties;
import java.io.*;

/**
 * Wrapper class around a Properties object and associated file. Generates a file called
 * "hanzihelper.properties" if it doesn't exist.
 */
public class CharProps {

    private static Properties properties;

    static {
        try {
            properties = new Properties();
            File propsFile = new File("hanzihelper.properties");
            if (propsFile.exists()) {
                properties.load(new FileInputStream("hanzihelper.properties"));
            } else {
                properties.load(CharApp.class.getResourceAsStream("/hanzihelper.properties"));
            }
        } catch (IOException e) {
            System.err.println("Couldn't load properties file: " + e.getMessage());
        }
    }

    /**
     * Returns a property from the store, or the default if it doesn't exist. Saves on checking for
     * nulls, etc.
     *
     * @param name       - the property name
     * @param defaultVal - value to be retured if property doesn't exist
     * @return - the value from the Properties store, or defaultVal if no found
     */
    public static String getStringProperty(String name, String defaultVal) {
        if (getProperty(name) != null) {
            return getProperty(name);
        } else {
            getProperties().setProperty(name, defaultVal);
            return defaultVal;
        }
    }

    /**
     * Returns a property from the store, or the default if it doesn't exist. Saves on checking for
     * nulls, etc. This method also converts the property to an int.
     *
     * @param name       - the property name
     * @param defaultVal - value to be retured if property doesn't exist
     * @return - the value from the Properties store, or defaultVal if no found
     */
    public static int getIntProperty(String name, int defaultVal) {
        if (getProperty(name) != null) {
            try {
                int val = Integer.parseInt(getProperty(name));
                return val;
            } catch (Exception e) {
                System.err.println("Invalid int property: " + name);
                return defaultVal;
            }
        } else {
            getProperties().setProperty(name, defaultVal + "");
            return defaultVal;
        }
    }

    public static boolean getBooleanProperty(String name, boolean defaultVal) {
        if (getProperty(name) != null) {
            try {
                boolean val = Boolean.parseBoolean(getProperty(name));
                return val;
            } catch (Exception e) {
                System.err.println("Invalid int property: " + name);
                return defaultVal;
            }
        } else {
            getProperties().setProperty(name, defaultVal + "");
            return defaultVal;
        }
    }

    /**
     * Returns a property from the store, or the default if it doesn't exist. Saves on checking for
     * nulls, etc. This method also converts the property to a double.
     *
     * @param name       - the property name
     * @param defaultVal - value to be returned if property doesn't exist
     * @return - the value from the Properties store, or defaultVal if no found
     */
    public static double getDoubleProperty(String name, double defaultVal) {
        if (getProperty(name) != null) {
            try {
                double val = Double.parseDouble(getProperty(name));
                return val;
            } catch (Exception e) {
                System.err.println("Invalid double property: " + name);
                return defaultVal;
            }
        } else {
            getProperties().setProperty(name, defaultVal + "");
            return defaultVal;
        }
    }

    /**
     * @return - the underlying Properties object.
     */
    public static Properties getProperties() {
        return properties;
    }

    /**
     * Gets a property value from the store.
     */
    public static String getProperty(String prop) {
        return properties.getProperty(prop);
    }

    /**
     * Flush to disk.
     */
    public static void storeProps() {
        try {
            BufferedOutputStream bos
                    = new BufferedOutputStream(new FileOutputStream("hanzihelper.properties"));
            properties.store(bos, "Properties for Hanzi Practice application");
            bos.flush();
            bos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
