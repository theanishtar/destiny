package convert;

import hanzihelper.CharRecord;
import hanzihelper.Record;
import hanzihelper.PinyinUtil;

import java.io.*;
import java.util.Collection;
import java.util.Iterator;

/**
 * By Colin Jacobs, coljac@coljac.net Date: May 16, 2005 (c) 2005
 */
public class SuperMemoQAExport {

    public static void qaExport(CharRecord rec, String file) throws IOException {
        Collection c = rec.getRecords(false);
//    PrintWriter bw = new PrintWriter(new BufferedWriter(new FileWriter(file)));
        PrintWriter bw = new PrintWriter(new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file), "UTF-8")));
        for (Iterator iterator = c.iterator(); iterator.hasNext();) {
            Record record = (Record) iterator.next();
            bw.println("Q: <span style=\"font-family: KaiTi_GB2312; font-size: 450%\">" + record.getChars() + "</span>\n\n");
            bw.println("A: <span style=\"font-size: 350%\">" + PinyinUtil.toUnicode(record.getPinyin())
                    + "</span><br><span style=\"font-size: 250%\">"
                    + record.getEnglish() + "</span>\n\n");
        }
        bw.flush();
        bw.close();
    }
}
