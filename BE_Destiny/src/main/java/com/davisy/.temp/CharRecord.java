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

import java.io.*;
import java.util.*;

/**
 * The "database" of characters. This class is just a wrapper around a UTF-8
 * text file. The text file is tab-delimited with the following columns: pinyin
 * / UTF-8 chinese / UTF-8 traditional / english / book / chapter / extended
 * info
 */
public class CharRecord {

    private SortedSet records = new TreeSet();
    private SortedSet filteredRecords = records;
    private List randomized;
    private int[] selected;
    private RecordFilter recordFilter = null;
    private String recordFile;

    public CharRecord(String recordFile) throws Exception {
        this.recordFile = recordFile;
        File f = new File(recordFile);
        BufferedReader br;
        if (!f.exists()) {
            f = new File("record.rec");
        }
        if (!f.exists()) {
            try {
                br = new BufferedReader(new InputStreamReader(this.getClass().getResourceAsStream("/record.rec"), "UTF-8"));
            } catch (Exception e) {
                throw new Exception("Can't find record store: " + recordFile);
            }
        } else {
            br = new BufferedReader(new InputStreamReader(new FileInputStream(f), "UTF-8"));
        }
        String line;
        int order = 1;
        while ((line = br.readLine()) != null) {
            if (line.startsWith("#")) {
                // Allow a comment field, just skip it
                continue;
            }

            // Strip out byte-ordering markers
            while (line.startsWith("" + (char) 0xFEFF) || line.startsWith("" + (char) 0xFFEF)) {
                line = line.substring(1);
            }

            int curItem = 0;
            //           StringTokenizer st = new StringTokenizer(line, "\t");

            try {
                String[] items = line.split("\t");
                if (items.length < 4) {
                    throw new Exception();
                }
                String pin = items[0];
                String chars = items[1];
                String trad = (items[2] == items[1]) ? "" : items[2];
                String eng = items[3];
                String book = (items.length > 4) ? items[4] : "";
                String chapter = (items.length > 5) ? items[5] : "";
                String groupOrder = (items.length > 6) ? items[6] : null;
                String extra1 = (items.length > 7) ? items[7] : "";

                Record newRec = new Record(order++, pin, chars, trad, eng, book, chapter, extra1);
                records.add(newRec);
                if (groupOrder != null) {
                    int index = Integer.parseInt(groupOrder);
                }
            } catch (Exception e) {
                System.err.println("Problem with line: " + line);
                continue;
            }
        }
        br.close();
    }

    /**
     * Adds a record to the store.
     */
    public void addRecord(Record rec) {
        if (rec.getOrder() <= 0) {
            rec.setOrder(records.size() + 1);
        }
        records.add(rec);
    }

    /**
     * Saves the database to the file on disk.
     *
     * @throws IOException if a is encountered.
     */
    public void flushToDisk() {
        try {
            BufferedWriter br = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(recordFile), "UTF-8"));
            for (Iterator iterator = records.iterator(); iterator.hasNext();) {
                Record record = (Record) iterator.next();
                br.write(record.toString() + "\r\n");
            }
            br.flush();
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
            CharApp.getInstance().showErrorMessage("Problem adding record: " + e.getMessage());
        }
    }

    /**
     * @return the number of records in the filtered list.
     */
    public int getFilteredCount() {
        if (recordFilter == null) {
            return records.size();
        } else {
            int count = 0;
            for (Iterator it = records.iterator(); it.hasNext();) {
                Record record = (Record) it.next();
                if (recordFilter.filter(record)) {
                    count++;
                }
            }
            return count;
        }
    }

    /**
     * @return Number of records in the database.
     */
    public int getRecordCount() {
        return records.size();
    }

    /**
     * @param record - the index of the record needed
     * @param filtered - whether to ignore the current filter
     * @return - the Record with that index in the list
     */
    public Record getRecordNumber(int record, boolean filtered) {
        int i = 0;
        for (Iterator iterator = records.iterator(); iterator.hasNext();) {
            Record record1 = (Record) iterator.next();
            if (filtered && recordFilter != null) {
                if (!recordFilter.filter(record1)) {
                    continue;
                }
            }
            if (i == record) {
                return record1;
            }
            i++;
        }
        return null;
    }

    /**
     * @param randomOrder - whether to randomize the record collection
     * @return - a collection containing all the records
     */
    public Collection getRecords(boolean randomOrder) {
        if (randomOrder) {
            return getRandomized();
        } else {
            if (selected == null || selected.length == 0) {
                return Collections.unmodifiableSortedSet(filteredRecords);
            } else {
                return new FilteredList(selected, new ArrayList(filteredRecords), null);
            }
        }
    }

    /**
     * Randomizes the order of the displayed list.
     */
    public void shuffle() {
        ArrayList toRandomize = new ArrayList();
        if (selected == null || selected.length == 0) {
            toRandomize.addAll(filteredRecords);
        } else {
            List tempList = new ArrayList(filteredRecords);
            for (int j = 0; j < selected.length; j++) {
                toRandomize.add(tempList.get(selected[j]));
            }
        }
        randomized = new ArrayList(toRandomize.size());
        randomized.addAll(toRandomize);
        Collections.shuffle(randomized);

    }

    public void setSelected(int[] selected) {
        this.selected = selected;
    }

    private List getRandomized() {
        if (randomized == null) {
            shuffle();
        }
        return randomized;
    }

    /**
     * Remove all records
     */
    public void clear() {
        records.clear();
    }

    public RecordFilter getRecordFilter() {
        return recordFilter;
    }

    /**
     * Remove a record from the store
     *
     * @param rec - to be removed if found
     */
    public synchronized void removeRecord(Record rec) {
        for (Iterator iterator = records.iterator(); iterator.hasNext();) {
            Record record = (Record) iterator.next();
            if (record.equals(rec)) {
                iterator.remove();
                break;
            }
        }
        try {
            flushToDisk();
        } catch (Exception e) {
            e.printStackTrace(System.err);
            CharApp.getInstance().showErrorMessage("Can't save to disk: " + e.getMessage());
        }
    }

    public void setRecordFilter(RecordFilter recordFilter) {
        this.recordFilter = recordFilter;
        randomized = null;
        if (recordFilter == null) {
            filteredRecords = records;
        } else {
            filteredRecords = new TreeSet();
            for (Iterator iterator = records.iterator(); iterator.hasNext();) {
                Record record = (Record) iterator.next();
                if (recordFilter.filter(record)) {
                    filteredRecords.add(record);
                }
            }
        }
    }

    /**
     * For iterating through the list, skipping over non-selected records and
     * filtered-out records.
     */
    static class FilteredList extends AbstractCollection implements Iterator {

        private int[] selectedRows;
        private List allRows;
        int currentIndex = 0;
        int listIndex = 0;
        Object nextRecord = null;
        private RecordFilter filter = null;

        public FilteredList(int[] selected, List allRows, RecordFilter filter) {
            this.selectedRows = selected;
            this.allRows = allRows;
            this.filter = filter;
        }

        public int size() {
            return selectedRows.length > 0 ? selectedRows.length : allRows.size();
        }

        public Iterator iterator() {
            currentIndex = -1;
            listIndex = -1;
            getNextRecord();
            return this;
        }

        public void remove() {
            throw new UnsupportedOperationException("Can't remove from this list.");
        }

        public boolean hasNext() {
            return nextRecord != null;
        }

        public Object next() {
            Object o = nextRecord;
            getNextRecord();
            return o;
        }

        private void getNextRecord() {
            nextRecord = null;
            currentIndex++;
            if (currentIndex < selectedRows.length) {
                listIndex = selectedRows[currentIndex];
                nextRecord = allRows.get(listIndex);
            }
        }
    }
}
