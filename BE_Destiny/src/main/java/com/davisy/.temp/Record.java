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
package hanzihelper;

import java.util.HashSet;
import java.util.Set;

/**
 * A character (or characters) and the pinyin and english representations.
 */
public class Record implements Comparable {

    private static String[] toneColor = {
        "#000000",
        "#ff0000",
        "#ffaa00",
        "#00aa00",
        "#0000ff"
    };
    //static Set books = new HashSet(3);
    private int order;
    private String pinyin;
    private String chars;
    private String trad;
    private String english;
    private String unicode = null;
    private String book = "";
    private String chapter = "";
    private String extra1;

    public Record(int order, String pinyin, String chars, String trad, String english, String book, String chapter) {
        this.order = order;
        this.pinyin = pinyin;
        this.chars = chars;
        this.trad = trad;
        this.english = english;
        this.book = book;
        this.chapter = chapter;
    }

    public Record(int order, String pinyin, String chars, String trad, String english, String book, String chapter,
            String extra1) {
        this(order, pinyin, chars, trad, english, book, chapter);
        this.extra1 = extra1;
    }

    public Record(int order, String[] fields) {
        this.order = order;
        if (fields.length > 0) {
            pinyin = fields[0];
            if (fields.length > 1) {
                chars = fields[1];
                if (fields.length > 2) {
                    trad = fields[2];
                    if (fields.length > 3) {
                        english = fields[3];
                        if (fields.length > 4) {
                            book = fields[4];
                            if (fields.length > 5) {
                                chapter = fields[5];
                                if (fields.length > 6) {
                                    extra1 = fields[6];
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getPinyin() {
        return pinyin;
    }

    public String getPinyinAsUnicode() {
        if (unicode == null) {
            unicode = PinyinUtil.toUnicode(pinyin);
        }
        return unicode;
    }

    public void setPinyin(String pinyin) {
        this.pinyin = pinyin;
        unicode = null;
    }

    public String getChars() {
        return chars;
    }

    public void setChars(String chars) {
        this.chars = chars;
    }

    public String getTrad() {
        return trad;
    }

    public boolean hasTrad() {
        return (!(trad.equals("")) || (trad == null));
    }

    public void setTrad(String trad) {
        this.trad = trad;
    }

    public String getEnglish() {
        return english;
    }

    public void setEnglish(String english) {
        this.english = english;
    }

    public int compareTo(Object o) {
        return this.order - ((Record) o).order;
    }

    public String toString() {
        return /*order + "," +*/ pinyin + "\t" + chars + "\t" + trad + "\t" + english + "\t" + book + "\t" + chapter;
    }

    public String getChapter() {
        return chapter;
    }

    public void setChapter(String chapter) {
        this.chapter = chapter;
    }

    public String getBook() {
        return book;
    }

    public void setBook(String book) {
        this.book = book;
    }

    public String getExtra1() {
        return extra1;
    }

    public void setExtra1(String extra1) {
        this.extra1 = extra1;
    }

    public int getLength() {
        return chars.length();
    }

    public String getChapterFormatted() {
        StringBuilder chapString = new StringBuilder();

        switch (book) {
            case "Book":
                chapString.append("Book Chapter ");
                break;
            case "Study":
                chapString.append("Character Study ");
                break;
            default:
                chapString.append(book + " ");
        }
        chapString.append(String.format("%02d", Integer.parseInt(chapter)));
        return chapString.toString();
    }

    public String getPinyinColorized() {
        StringBuilder ankiPinyin = new StringBuilder();
        String[] syllables = PinyinUtil.getSyllables(pinyin);
        int curTone;

        for (int i = 0; i < syllables.length; i++) {
            if (i > 0) {
                ankiPinyin.append(" ");
            }
            curTone = getTone(syllables[i]);
            if (curTone == 0) {
                ankiPinyin.append(syllables[i]);
            } else {
                ankiPinyin.append("<span style = \"color:");
                ankiPinyin.append(toneColor[curTone]);
                ankiPinyin.append("\">");
                ankiPinyin.append(PinyinUtil.toUnicode(syllables[i]));
                ankiPinyin.append("</span>");
            }
        }
        return ankiPinyin.toString();
    }

    public String getSoundFile() {
        StringBuilder ankiSound = new StringBuilder();
        String[] syllables = PinyinUtil.getSyllables(pinyin);

        for (int i = 0; i < syllables.length; i++) {
            if (PinyinUtil.isValidSyllable(syllables[i].toLowerCase())) {
                ankiSound.append("[sound:");
                ankiSound.append(syllables[i].toLowerCase());
                ankiSound.append(".mp3]");
            }
        }
        return ankiSound.toString();
    }

    private static int getTone(String pinyinString) {
        int tone;
        switch (pinyinString.substring(pinyinString.length() - 1)) {
            case "1":
                tone = 1;
                break;
            case "2":
                tone = 2;
                break;
            case "3":
                tone = 3;
                break;
            case "4":
                tone = 4;
                break;
            default:
                tone = 0;
        }
        return tone;
    }

}
