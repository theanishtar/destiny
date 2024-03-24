/*
 Hanzi Helper, http://hanzihelper.sourceforge.net
 Copyright (C) 2005, Colin Jacobs

 This library is free software; you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public
 License as published by the Free Software Foundation; either
 version 2.1 of the License, or (at your option) any later version.

 This library is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public
 License along with this library; if not, write to the Free Software
 Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */
package convert;

import net.coljac.util.FileTools;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

public class Converter {

    // A UTF-8 byte order mark
    public static final byte[] BOM = new byte[]{(byte) 0xef, (byte) 0xbb, (byte) 0xbf};

    public static byte[] unicodeToGBData(String in) {
        try {
            ByteArrayOutputStream bos = new ByteArrayOutputStream(2 * in.length());
            PrintWriter pw = new PrintWriter(new OutputStreamWriter(bos, "GB2312"));
            pw.print(in);
            pw.flush();
            pw.close();
            return bos.toByteArray();
        } catch (UnsupportedEncodingException e) {
            return null;
        }
    }

    public static String convertToGBHexString(String unicodeChar) {
        byte[] gbBytes = unicodeToGBData(unicodeChar.substring(0, 1));
        long gb = ((0xFF & gbBytes[0]) << 8) | (0xFF & gbBytes[1]);
        return Long.toHexString(gb);
    }

    public static String convertToBig5HexString(String unicodeChar) {
        byte[] gbBytes = unicodeToBig5Data(unicodeChar.substring(0, 1));
        long gb = ((0xFF & gbBytes[0]) << 8) | (0xFF & gbBytes[1]);
        return Long.toHexString(gb);
    }

    public static byte[] unicodeToBig5Data(String in) {
        try {
            ByteArrayOutputStream bos = new ByteArrayOutputStream(2 * in.length());
            PrintWriter pw = new PrintWriter(new OutputStreamWriter(bos, "Big5"));
            pw.print(in);
            pw.flush();
            pw.close();
            return bos.toByteArray();
        } catch (UnsupportedEncodingException e) {
            return null;
        }
    }

    public static String simplifiedToTrad(String str) {
        if (s2thash == null) {
            makeMap();
        }
        StringBuffer out = new StringBuffer();
        char[] chars = str.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            char aChar = chars[i];
            String trad = (String) s2thash.get("" + aChar);
            if (trad != null) {
                out.append(trad);
            } else {
                out.append(aChar);
            }
        }
        return out.toString();
    }

    public static String traditionalToSimp(String str) {
        if (t2shash == null) {
            makeMap();
        }
        StringBuffer out = new StringBuffer();
        char[] chars = str.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            char aChar = chars[i];
            String simp = (String) t2shash.get("" + aChar);
            if (simp != null) {
                out.append(simp);
            } else {
                out.append(aChar);
            }
        }
        return out.toString();
    }
    public static Map s2thash = null;
    public static Map t2shash = null;

    public static void makeMap() {
        s2thash = new HashMap();
        t2shash = new HashMap();

        String dataline;
        try {
//      InputStream pydata = ZhongwenCom.class.getResourceAsStream("hcutf8.txt");
            InputStream pydata = new FileInputStream("hcutf8.txt");
            BufferedReader in = new BufferedReader(new InputStreamReader(pydata, "UTF8"));
            while ((dataline = in.readLine()) != null) {
                // Skip empty and commented lines
                if (dataline.length() == 0 || dataline.charAt(0) == '#') {
                    continue;
                }

                // Simplified to Traditional, (one to many, but pick only one)
                s2thash.put(dataline.substring(0, 1).intern(), dataline.substring(1, 2));

                // Traditional to Simplified, (many to one)
                for (int i = 1; i < dataline.length(); i++) {
                    t2shash.put(dataline.substring(i, i + 1).intern(), dataline.substring(0, 1));
                }
            }
        } catch (Exception e) {
            System.err.println(e);
        }
    }

    public static void convertFile(String file1, String file2, String encoding1, String encoding2, boolean bom,
            boolean simpToTrad, boolean tradToSimp)
            throws IOException {
        String contents = FileTools.getFileContentsAsString(file1, encoding1);
        if (contents == null) {
            throw new IOException("Couldn't read file: " + file1);
        }
        if (simpToTrad) {
            contents = simplifiedToTrad(contents);
        } else if (tradToSimp) {
            contents = traditionalToSimp(contents);
        }

        FileOutputStream fos = new FileOutputStream(file2);
        if (encoding2.equals("UTF-8") && bom) {
            fos.write(BOM);
        }
        PrintWriter pw = new PrintWriter(new OutputStreamWriter(fos, encoding2));
        pw.print(contents);
        pw.flush();
        fos.flush();
        pw.close();
    }
}
