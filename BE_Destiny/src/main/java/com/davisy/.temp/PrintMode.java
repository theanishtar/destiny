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

/**
 * This class represents the view of the list for printing; which text to show and how.
 */
public class PrintMode {

    /**
     * No text.
     */
    public static final int TEXT_NONE = 0;
    /**
     * Show the Chinese.
     */
    public static final int TEXT_CHARS = 1;
    /**
     * Show the Pinyin.
     */
    public static final int TEXT_PINYIN = 2;
    /**
     * Show the English.
     */
    public static final int TEXT_ENGLISH = 3;
    /**
     * Show the English and pinyin.
     */
    public static final int TEXT_ENGLISH_PINYIN = 4;
    /**
     * Show the Chinese and pinyin.
     */
    public static final int TEXT_CHINESE_PINYIN = 5;
    /**
     * Show as many characters as possible on a page, while leaving room next to them to copy them
     * for practice.
     */
    public static final int STYLE_NONE = 0;
    public static final int STYLE_CRAM = 2;
    /**
     * Put a character at the start of each line, leaving the rest of the line for practice.
     */
    public static final int STYLE_ONE_PER_LINE = 1;
    /**
     * A row of the same character, with an empty row below.
     */
    public static final int STYLE_ALTERNATING_LINES = 3;
    /**
     * For reading only - as dense as possible with the chars.
     */
    public static final int STYLE_READING = 4;
    private int style;
    private int text;

    public PrintMode(int style, int text) {
        this.style = style;
        this.text = text;
    }

    public int getStyle() {
        return style;
    }

    public void setStyle(int style) {
        this.style = style;
    }

    public int getText() {
        return text;
    }

    public void setText(int text) {
        this.text = text;
    }
}
