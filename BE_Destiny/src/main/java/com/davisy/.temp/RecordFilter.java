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

//import net.coljac.zhongwen.Record;
/**
 * Filters records by book and chapter for viewing and printing.
 */
public class RecordFilter {

    private String book;
    private String chapter;
    private int minChap = 999;
    private int maxChap = -1;

    public RecordFilter(String book, String chapter) {
        this.book = book;
        this.chapter = chapter;
        if (chapter.indexOf("-") > -1) {
            maxChap = Integer.parseInt(chapter.substring(chapter.indexOf("-") + 1));
            minChap = Integer.parseInt(chapter.substring(0, chapter.indexOf("-")));
        }
    }

    public boolean filter(Record rec) {
        if (book != null && book.length() > 0) {
            if (!rec.getBook().equals(book)) {
                return false;
            }
        }
        if (chapter != null && chapter.length() > 0) {
            if (minChap < 999 && maxChap >= 0) {
                int chapterNumber = Integer.parseInt(rec.getChapter());
                if (!(chapterNumber >= minChap && chapterNumber <= maxChap)) {
                    return false;
                }
            } else {
                if (!rec.getChapter().equals(chapter)) {
                    return false;
                }
            }
        }
        return true;
    }

    public String getBook() {
        return book;
    }

    public String getChapter() {
        return chapter;
    }

    public String toString() {
        return book + "/" + chapter + "/" + minChap + "-" + maxChap;
    }
}
