/*
 * Copyright (C) 2014 klarson.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301  USA
 */
package convert;

import com.csvreader.CsvReader;
import hanzihelper.CharApp;
import hanzihelper.PinyinUtil;
import hanzihelper.Record;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author klarson
 */
public class RecordImport {

    public static void csvImport(String filename) throws IOException {
        delimitedImport(filename, ',');
    }

    public static void tabdelImport(String filename) throws IOException {
        delimitedImport(filename, '\t');
    }

    private static void delimitedImport(String filename, char delimiter) throws IOException {
        CsvReader importRecs = new CsvReader(filename, delimiter, Charset.forName("UTF-8"));

        while (importRecs.readRecord()) {
            if (importRecs.getColumnCount() >= 6) {
                Record rec = new Record(-1, importRecs.getValues());
                CharApp.getInstance().getRecord().addRecord(rec);
            }
        }
        importRecs.close();

        CharApp.getInstance().getRecord().flushToDisk();
        CharApp.getInstance().refresh();
        CharApp.getInstance().getFilterPanel().refresh();
    }

    public static void wenlinImport(String filename) throws IOException {
        String pinyin;
        String simp;
        String trad;
        String definition;
        String book = "Study";
        String chapter = "0";

        Pattern chapterPattern = Pattern.compile("Character Study ([0-9]+)");
        Pattern tradPattern = Pattern.compile("(.*)\\((.*)\\)");

        CsvReader importRecs = new CsvReader(filename, '\t', Charset.forName("UTF-16"));

        while (importRecs.readRecord()) {
            if (importRecs.getColumnCount() == 1) {
                Matcher matcher = chapterPattern.matcher(importRecs.get(0));
                if (matcher.matches()) {
                    chapter = matcher.group(1);
//                    System.out.println("Found chapter: " + chapter);
                }
            }
            if (importRecs.getColumnCount() >= 3) {
                pinyin = importRecs.get(1);
                definition = importRecs.get(2);
                Matcher matcher = tradPattern.matcher(importRecs.get(0));
                if (matcher.matches()) {
                    simp = matcher.group(1);
                    trad = matcher.group(2);
                } else {
                    simp = importRecs.get(0);
                    trad = "";
                }
                System.out.println("Pinyin before: " + pinyin);
                pinyin = PinyinUtil.toAscii(pinyin);
                System.out.println("Pinyin after: " + pinyin + "\n");

                Record rec = new Record(-1, pinyin, simp, trad, definition, book, chapter);
                CharApp.getInstance().getRecord().addRecord(rec);
            }
        }
        importRecs.close();

        CharApp.getInstance().getRecord().flushToDisk();
        CharApp.getInstance().refresh();
        CharApp.getInstance().getFilterPanel().refresh();
    }
}
