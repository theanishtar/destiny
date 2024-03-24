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

import convert.*;

import javax.swing.*;
import javax.swing.filechooser.FileFilter;
import java.awt.*;
import java.awt.event.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Iterator;

/**
 * The main entry point for the Hanzi Helper application.
 */
public class CharApp extends JFrame {

    public static final String VERSION = "1.0";
    public static final boolean development = false;
    public static Color COLOR_BG = new Color(245, 240, 240);
    public static Color COLOR_BUTTON = new Color(250, 250, 250);
    public static String RECORD_FILE = "record.rec";
    private JMenuBar menuBar;
    private JMenu menu;
    private JMenuItem menuItem;
    private ListPanel listPanel;
    private CharRecord record;
    private static CharApp instance;
    private JPanel topPanel;
    boolean showFilter = false;
    public FilterPanel filterPanel;
    private String recFile;

    public CharApp() throws HeadlessException {
        super("Hanzi Helper");
        instance = this;
        recFile = CharProps.getStringProperty("record.file", RECORD_FILE);
        init();
        this.setLocation((int) (Toolkit.getDefaultToolkit().getScreenSize().getWidth() / 2 - this.getWidth() / 2),
                (int) (Toolkit.getDefaultToolkit().getScreenSize().getHeight() / 2 - this.getHeight() / 2));

        makeMenus();

        this.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                exit();
            }
        });
        String dims = CharProps.getProperty("window.dimensions");
        if (dims != null) {
            try {
                int w = Integer.parseInt(dims.substring(0, dims.indexOf(",")));
                int h = Integer.parseInt(dims.substring(dims.indexOf(",") + 1));
                this.setSize(w, h);
            } catch (Exception e) {
            }
        }
        String loc = CharProps.getProperty("window.location");
        if (loc != null) {
            try {
                int x = Integer.parseInt(loc.substring(0, loc.indexOf(",")));
                int y = Integer.parseInt(loc.substring(loc.indexOf(",") + 1));
                this.setLocation(x, y);
            } catch (Exception e) {
            }
        }
        this.setVisible(true);
    }

    private void init() {
        try {
            record = new CharRecord(recFile);
        } catch (Exception e) {
            e.printStackTrace();
            showErrorMessage("No record found/record problem. Creating a new one.");
            try {
                new File(recFile).createNewFile();
                record = new CharRecord(recFile);
            } catch (Exception e1) {
                showErrorMessage("Problem: " + e.getMessage());
            }
        }
        this.setTitle("Hanzi Helper - " + recFile);
        listPanel = new ListPanel(record);
        filterPanel = new FilterPanel(this);

        this.setIconImage(new ImageIcon(getClass().getResource("icon.png")).getImage());
        topPanel = new JPanel(new BorderLayout());
        topPanel.add(listPanel, BorderLayout.CENTER);
        this.getContentPane().removeAll();
        this.getContentPane().add(topPanel);
        this.pack();

    }

    private void popupPrintPanel() {
        record.setSelected(listPanel.getSelectedRows());
        JDialog dia = new PrintableDialog();
        dia.setLocation((int) getLocation().getX() + 80, 0);
        dia.pack();
        double screenHeight = Toolkit.getDefaultToolkit().getScreenSize().getHeight();
        double height = dia.getHeight();
        double width = dia.getWidth();
        double ratio = height / width;
        if (dia.getHeight() > screenHeight * .85) {
            dia.setSize((int) (screenHeight * .85 / ratio), (int) (screenHeight * .85));
        }
        dia.setVisible(true);
    }

    public static CharApp getInstance() {
        return instance;
    }

    public void refresh() {
        listPanel.refresh();
    }

    private void makeMenus() {
//Create the menu bar.
        menuBar = new JMenuBar();

//Build the first menu.
        menu = new JMenu("File");
        menu.setBackground(COLOR_BG);
        menu.setMnemonic(KeyEvent.VK_F);
        menu.getAccessibleContext().setAccessibleDescription("Main menu");
        menuBar.add(menu);

//a group of JMenuItems
        menuItem = new JMenuItem("Open",
                KeyEvent.VK_O);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_O, ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Open file");
        menu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                openRecordFile();
            }
        });

        menuItem = new JMenuItem("New",
                KeyEvent.VK_N);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_N, ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Save new record file");
        menu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                newRecord();
            }
        });

        JMenu expSubMenu = new JMenu("Export");
        expSubMenu.setMnemonic(KeyEvent.VK_X);
        expSubMenu.setBackground(COLOR_BG);
        menu.add(expSubMenu);

        JMenu impSubMenu = new JMenu("Import");
        impSubMenu.setMnemonic(KeyEvent.VK_I);
        impSubMenu.setBackground(COLOR_BG);
        menu.add(impSubMenu);

        menuItem = new JMenuItem("Supermemo",
                KeyEvent.VK_S);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_S, ActionEvent.CTRL_MASK | ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Export to supermemo");
        expSubMenu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                exportSM();
            }
        });

        menuItem = new JMenuItem("Q & A",
                KeyEvent.VK_Q);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_Q, ActionEvent.CTRL_MASK | ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Export to Q & A format");
        expSubMenu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                exportQA();
            }
        });

        menuItem = new JMenuItem("PlecoDict Flashcards",
                KeyEvent.VK_P);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_P, ActionEvent.CTRL_MASK | ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Export to PlecoDict");
        expSubMenu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                exportPleco();
            }
        });

        menuItem = new JMenuItem("Anki Flashcards",
                KeyEvent.VK_A);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_A, ActionEvent.CTRL_MASK | ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Export to Anki");
        expSubMenu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                exportAnki();
            }
        });

        menuItem = new JMenuItem("Simple Text List",
                KeyEvent.VK_L);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_L, ActionEvent.CTRL_MASK | ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Text");
        expSubMenu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                exportText();
            }
        });

        menuItem = new JMenuItem("CSV Format",
                KeyEvent.VK_D);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_D, ActionEvent.CTRL_MASK | ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Export to CSV Format");
        expSubMenu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                exportCSV();
            }
        });

        menuItem = new JMenuItem("Tab Delimited",
                KeyEvent.VK_T);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_T, ActionEvent.CTRL_MASK | ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Export to Tab Delimited Format");
        expSubMenu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                exportTabdel();
            }
        });

        menuItem = new JMenuItem("CSV Format",
                KeyEvent.VK_D);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_D, ActionEvent.CTRL_MASK | ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Import from CSV Format");
        impSubMenu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                importCSV();
            }
        });

        menuItem = new JMenuItem("Tab Delimited",
                KeyEvent.VK_T);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_T, ActionEvent.CTRL_MASK | ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Import from Tab Delimited Format");
        impSubMenu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                importTabdel();
            }
        });

         menuItem = new JMenuItem("Wenlin",
                KeyEvent.VK_W);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_W, ActionEvent.CTRL_MASK | ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Import from Wenlin Format");
        impSubMenu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                importWenlin();
            }
        });

        menuItem = new JMenuItem("Convert", KeyEvent.VK_V);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_V, ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Convert files");
        menu.add(menuItem);
        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                convert();
            }
        });

        menu.addSeparator();

        menuItem = new JMenuItem("Review", KeyEvent.VK_R);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_R, ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Review Chars");
        menu.add(menuItem);
        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                popupReviewPanel();
            }
        });

        menuItem = new JMenuItem("Print", KeyEvent.VK_P);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_P, ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Print page");
        menu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                popupPrintPanel();
            }
        });

        menu.addSeparator();

        menuItem = new JMenuItem("Fonts", KeyEvent.VK_F);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_F, ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Font settings");
        menu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                FontDialog fonty = new FontDialog(instance);
                fonty.setVisible(true);
            }
        });

        menu.addSeparator();
        menuItem = new JMenuItem("Exit", KeyEvent.VK_X);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_X, ActionEvent.ALT_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Quit");
        menu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                exit();
            }
        });

        menu = new JMenu("Record");
        menu.setBackground(COLOR_BG);
        menu.setMnemonic(KeyEvent.VK_R);
        menu.getAccessibleContext().setAccessibleDescription("Record menu");
        menuBar.add(menu);

        menuItem = new JMenuItem("Add",
                KeyEvent.VK_A);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_A, ActionEvent.ALT_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Add a record");
        menu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                JDialog add = new AddNewPanel();
                add.setLocation((int) getLocation().getX() + 80, (int) getLocation().getY() + 80);
                add.setVisible(true);
            }
        });

        menuItem = new JMenuItem("Edit",
                KeyEvent.VK_E);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_E, ActionEvent.ALT_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Edit current record");
        menu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                if (listPanel.getSelectedRows().length < 1) {
                    return;
                }
                editRecord();
            }
        });

        menuItem = new JMenuItem("Delete",
                KeyEvent.VK_D);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_DELETE, 0));
        menuItem.getAccessibleContext().setAccessibleDescription("Delete current record");
        menu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                if (listPanel.getSelectedRows().length < 1) {
                    return;
                }
                deleteRecord();
            }
        });

        menuItem = new JMenuItem("Clear", KeyEvent.VK_C);
        menuItem.setBackground(COLOR_BG);
        menuItem.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_C, ActionEvent.CTRL_MASK));
        menuItem.getAccessibleContext().setAccessibleDescription("Clear records");
        menu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                clearRecords();
            }
        });

        menu = new JMenu("Filter");
        menu.setBackground(COLOR_BG);
        menu.setMnemonic(KeyEvent.VK_L);
        menu.getAccessibleContext().setAccessibleDescription("Filter menu");
        menuBar.add(menu);

        menuItem = new JMenuItem("Show Filter", KeyEvent.VK_F);
        menuItem.setBackground(COLOR_BG);
        menuItem.getAccessibleContext().setAccessibleDescription("Filter");
        menu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                toggleFilter();
            }
        });

        menu = new JMenu("Help");
        menu.setBackground(COLOR_BG);
        menu.setMnemonic(KeyEvent.VK_H);
        menu.getAccessibleContext().setAccessibleDescription("Help menu");
        menuBar.add(menu);

        menuItem = new JMenuItem("Help", KeyEvent.VK_H);
        menuItem.setBackground(COLOR_BG);
        menuItem.getAccessibleContext().setAccessibleDescription("Help");
        menu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                showHelp();
            }
        });

        menuItem = new JMenuItem("About", KeyEvent.VK_A);
        menuItem.setBackground(COLOR_BG);
        menuItem.getAccessibleContext().setAccessibleDescription("About");
        menu.add(menuItem);

        menuItem.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                popupAboutPanel();
            }
        });

        this.setJMenuBar(menuBar);
        menuBar.setBackground(COLOR_BG);

    }

    public void editRecord() {
        Record rec = record.getRecordNumber(listPanel.getSelectedRows()[0], true);
        JDialog add = new EditPanel(rec);
        add.setLocation((int) getLocation().getX() + 80, (int) getLocation().getY() + 80);
        add.setVisible(true);
    }

    public void deleteRecord() {
        java.util.List temp = new ArrayList();
        for (int i = 0; i < listPanel.getSelectedRows().length; i++) {
            int row = listPanel.getSelectedRows()[i];
            int num = listPanel.getSorter().modelIndex(row);
            Record rec = record.getRecordNumber(num, true);
//      Record rec = listPanel.getRecordAt(row);
            temp.add(rec);
        }
        for (Iterator iterator = temp.iterator(); iterator.hasNext();) {
            Record rec = (Record) iterator.next();
            record.removeRecord(rec);
        }
        refresh();
    }

    public CharRecord getRecord() {
        return record;
    }

    public static void main(String[] args) {
        new CharApp();
    }

    private void showHelp() {
        JPanel temp = new JPanel(new BorderLayout());
        temp.setBackground(new Color(204, 204, 204));
        StringBuffer sb = new StringBuffer();

        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(getClass().getResourceAsStream("help.html")));
            String line = null;
            while ((line = br.readLine()) != null) {
                sb.append(line + "\n");
            }
        } catch (IOException e) {
        }
        JEditorPane texty = new JEditorPane("text/html", sb.toString());
        texty.setEditable(false);
//    texty.setMaximumSize(new Dimension(300, 500));
        JScrollPane scroller = new JScrollPane(texty);
//    scroller.setSize(300, 500);

        texty.setCaretPosition(0);
        temp.setMaximumSize(new Dimension(400, 400));
        temp.add(scroller, BorderLayout.CENTER);

        JDialog helpDialog = new JDialog(this, "Help", true);
        helpDialog.add(temp);
        helpDialog.setSize(600, 800);

        helpDialog.setLocation((int) getLocation().getX() + 75, (int) getLocation().getY() + 50);
        helpDialog.setVisible(true);
//    JOptionPane.showMessageDialog(this, temp, "Help",
//        JOptionPane.INFORMATION_MESSAGE, new ImageIcon());
    }

    private void popupAboutPanel() {
        record.setSelected(listPanel.getSelectedRows());
        JPanel temp = new JPanel(new FlowLayout());
        temp.setBackground(new Color(204, 204, 204));
        ImageIcon logo = new ImageIcon(getClass().getResource("logo.png"));
        JLabel proper = new JLabel("<html>"
                + "<div align=\"center\"><font size=\"8\" color=\"red\">Hanzi Helper</font><p>"
                + "<div align=\"center\"><b>Kelzan Version "
                + VERSION + "</b></div>"
                + "<p><br><b>http://github.com/kelzan/HanziHelper</b><p>"
                + "<br>Original: <b>http://hanzihelper.sourceforge.net</b>"
                + "<p><br><font size=\"2\" color=\"blue\">Thanks coljac@users.sourceforge.net for the <br>"
                + "original source code</font></html>");
        proper.setVerticalTextPosition(JLabel.VERTICAL);
        temp.add(proper);
        JOptionPane.showMessageDialog(this, temp, "About", JOptionPane.INFORMATION_MESSAGE, logo);
    }

    private void popupReviewPanel() {
        record.setSelected(listPanel.getSelectedRows());
        ReviewOptions reviewOptions = new ReviewOptions();
        reviewOptions.getDefaults();

        ReviewOptionsPanel reviewOptionsPanel = new ReviewOptionsPanel(reviewOptions);
        JDialog dialog = new JDialog(this, Dialog.ModalityType.APPLICATION_MODAL);
        dialog.add(reviewOptionsPanel);
        dialog.setSize(275, 200);
        dialog.setLocationRelativeTo(null);
        dialog.setVisible(true);

        ReviewPanel review = new ReviewPanel(record, reviewOptions);
//        JFrame f = new JFrame("Character Review - " + getFilterPanel().getBook() + " " + getFilterPanel().getChapters());
        JFrame f = new JFrame(getReviewTitle(reviewOptions));
        f.setSize(500, 500);
        f.setLocationRelativeTo(null);
        f.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        f.setContentPane(review);
        f.setVisible(true);
    }

    private String getReviewTitle(ReviewOptions reviewOptions) {
        StringBuilder titleString = new StringBuilder("Character Review");

        if (reviewOptions.type == ReviewOptions.ReviewType.SIMPLIFIED) {
            titleString.append(" (Simplified)");
        } else if (reviewOptions.type == ReviewOptions.ReviewType.TRADITIONAL) {
            titleString.append(" (Traditional)");
        }
        titleString.append(" - ");
        if (filterPanel.getBook().equals("")) {
            if (filterPanel.getChapters().equals("")) {
                titleString.append("All Characters");
            } else {
                titleString.append(filterPanel.getChapters());
            }
        } else {
            if (filterPanel.getChapters().equals("")) {
                titleString.append("All " + filterPanel.getBook());
            } else {
                titleString.append(filterPanel.getBook() + " " + filterPanel.getChapters());
            }
        }
        return titleString.toString();
    }

    public ListPanel getListPanel() {
        return listPanel;
    }

    private void clearRecords() {
        int confirm = JOptionPane.showConfirmDialog(this,
                "This will delete all character records.", "Are you sure?",
                JOptionPane.OK_CANCEL_OPTION, JOptionPane.WARNING_MESSAGE);
        if (confirm == JOptionPane.OK_OPTION) {
            try {
                record.clear();
                record.flushToDisk();
                repaint();
            } catch (Exception e) {
                showErrorMessage("Problem with clear: " + e.getMessage());
            }
        }
    }

    private void newRecord() {
        File rFile = selectFile(".rec", "Helper record file", false, true);
        if (rFile != null) {
            if (!rFile.exists()) {
                try {
                    rFile.createNewFile();
                } catch (IOException e) {
                    showErrorMessage("Problem: " + e.getMessage());
                }
            }
            String path = rFile.getParentFile().getAbsolutePath();
            CharProps.getProperties().setProperty("last.path", path);
            try {
                recFile = rFile.getAbsolutePath();
                setTitle("Hanzi Helper - " + rFile.getAbsolutePath());

                init();
                CharProps.getProperties().setProperty("record.file", rFile.getAbsolutePath());
                CharProps.storeProps();
            } catch (Exception e) {
                showErrorMessage("Problem with create: " + e.getMessage());
            }
        }
    }

    private void openRecordFile() {
        File rFile = selectFile(".rec", "Helper record file", false, false);
        if (rFile != null) {
            String path = rFile.getParentFile().getAbsolutePath();
            CharProps.getProperties().setProperty("last.path", path);
            try {
                recFile = rFile.getAbsolutePath();
                init();
                CharProps.getProperties().setProperty("record.file", rFile.getAbsolutePath());
                CharProps.storeProps();
                setTitle("Hanzi Helper - " + rFile.getAbsolutePath());
            } catch (Exception e) {
                showErrorMessage("Problem with open: " + e.getMessage());
            }
        }
    }

//    private void writeZhongWenImages() {
//        record.setSelected(listPanel.getSelectedRows());
////    final File rDir = selectFile("", "Image output dir", true);
////    if (rDir == null) return;
//        try {
//            int max = record.getRecords(false).size();
//            final JProgressBar bar = new JProgressBar(0, max);
//            bar.setStringPainted(true);
//            JPanel temp = new JPanel();
//            temp.add(bar);
//
//            final JDialog dialog = new JDialog(this, "Working", true);
//            dialog.add(temp);
//
//            new Thread() {
//                public void run() {
//                    try {
//                        ZhongwenCom.fetchImages(bar, record);
//                    } catch (Exception e) {
//                        e.printStackTrace();
//                        showErrorMessage("Problem with export: " + e.getMessage());
//                    } finally {
//                        dialog.setVisible(false);
//                        dialog.dispose();
//                    }
//                }
//            }.start();
//            dialog.pack();
//            dialog.setLocation(((int) (this.getLocation().getX() + 300)), ((int) (this.getLocation().getY() + 300)));
//            dialog.setVisible(true);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            showErrorMessage("Error: " + e.getMessage());
//        }
//    }
    public void exportSM() {
        record.setSelected(listPanel.getSelectedRows());
        File rFile = selectFile(".txt", "Tab delimited txt", false, true);
        if (rFile != null) {
            String path = rFile.getParentFile().getAbsolutePath();
            CharProps.getProperties().setProperty("last.path", path);
            try {
                RecordExport.superMemoExport(record, rFile.getAbsolutePath());
            } catch (Exception e) {
                showErrorMessage("Problem with export: " + e.getMessage());
            }
        }
    }

    public void exportQA() {
        record.setSelected(listPanel.getSelectedRows());
        File rFile = selectFile(".txt", "QA format", false, true);
        if (rFile != null) {
            String path = rFile.getParentFile().getAbsolutePath();
            CharProps.getProperties().setProperty("last.path", path);
            try {
                SuperMemoQAExport.qaExport(record, rFile.getAbsolutePath());
            } catch (Exception e) {
                showErrorMessage("Problem with export: " + e.getMessage());
            }
        }
    }

    public void exportPleco() {
        record.setSelected(listPanel.getSelectedRows());
        File rFile = selectFile(".txt", "text files", false, true);
        if (rFile != null) {
            String path = rFile.getParentFile().getAbsolutePath();
            CharProps.getProperties().setProperty("last.path", path);
            try {
                RecordExport.plecoExport(record, rFile.getAbsolutePath());
            } catch (Exception e) {
                showErrorMessage("Problem with export: " + e.getMessage());
            }
        }
    }

    public void exportAnki() {
        record.setSelected(listPanel.getSelectedRows());
        File rFile = selectFile(".txt", "text files", false, true);
        if (rFile != null) {
            String path = rFile.getParentFile().getAbsolutePath();
            CharProps.getProperties().setProperty("last.path", path);
            try {
                RecordExport.ankiExport(record, rFile.getAbsolutePath());
            } catch (Exception e) {
                showErrorMessage("Problem with export: " + e.getMessage());
            }
        }
    }

    public void exportText() {
        record.setSelected(listPanel.getSelectedRows());
        File rFile = selectFile(".txt", "text files", false, true);
        if (rFile != null) {
            String path = rFile.getParentFile().getAbsolutePath();
            CharProps.getProperties().setProperty("last.path", path);
            try {
                RecordExport.textExport(record, rFile.getAbsolutePath());
            } catch (Exception e) {
                showErrorMessage("Problem with export: " + e.getMessage());
            }
        }
    }

    public void exportCSV() {
        record.setSelected(listPanel.getSelectedRows());
        File rFile = selectFile(".csv", "CSV files", false, true);
        if (rFile != null) {
            String path = rFile.getParentFile().getAbsolutePath();
            CharProps.getProperties().setProperty("last.path", path);
            try {
                RecordExport.csvExport(record, rFile.getAbsolutePath());
            } catch (Exception e) {
                showErrorMessage("Problem with export: " + e.getMessage());
            }
        }
    }

    public void exportTabdel() {
        record.setSelected(listPanel.getSelectedRows());
        File rFile = selectFile(".txt", "Tab Delimited files", false, true);
        if (rFile != null) {
            String path = rFile.getParentFile().getAbsolutePath();
            CharProps.getProperties().setProperty("last.path", path);
            try {
                RecordExport.tabdelExport(record, rFile.getAbsolutePath());
            } catch (Exception e) {
                showErrorMessage("Problem with export: " + e.getMessage());
            }
        }
    }

    public void importCSV() {
        File rFile = selectFile(".csv", "CSV files", false, false);
        if (rFile != null) {
            String path = rFile.getParentFile().getAbsolutePath();
            CharProps.getProperties().setProperty("last.path", path);
            try {
                RecordImport.csvImport(rFile.getAbsolutePath());
            } catch (Exception e) {
                showErrorMessage("Problem with export: " + e.getMessage());
            }
        }
    }

    public void importTabdel() {
        File rFile = selectFile(".txt", "Tab Delimited files", false, false);
        if (rFile != null) {
            String path = rFile.getParentFile().getAbsolutePath();
            CharProps.getProperties().setProperty("last.path", path);
            try {
                RecordImport.tabdelImport(rFile.getAbsolutePath());
            } catch (Exception e) {
                showErrorMessage("Problem with export: " + e.getMessage());
            }
        }
    }
    
    public void importWenlin() {
        File rFile = selectFile("", "Wenlin files", false, false);
        if (rFile != null) {
            String path = rFile.getParentFile().getAbsolutePath();
            CharProps.getProperties().setProperty("last.path", path);
            try {
                RecordImport.wenlinImport(rFile.getAbsolutePath());
            } catch (Exception e) {
                showErrorMessage("Problem with export: " + e.getMessage());
            }
        }
    }

    public File selectFile(String filter, String filterDesc, boolean dir, boolean save) {
        final String extension = filter;
        final String desc = filterDesc;
        String lastPath = CharProps.getStringProperty("last.path", ".");
        JFileChooser chooser = new JFileChooser(lastPath);

        if (dir) {
            chooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
        }

        chooser.setFileFilter(new FileFilter() {
            public boolean accept(File f) {
                return f.isDirectory() || f.getName().endsWith(extension)
                        || f.getName().endsWith(extension.toUpperCase());
            }

            public String getDescription() {
                return desc;
            }
        });
        int result;
        if (save) {
            result = chooser.showSaveDialog(this);
        } else {
            result = chooser.showOpenDialog(this);
        }

        if (result == JFileChooser.APPROVE_OPTION) {
            File rFile = chooser.getSelectedFile();
            return rFile;
        }
        return null;
    }

    private void toggleFilter() {
        showFilter = !showFilter;
        if (showFilter) {
            topPanel.add(filterPanel, BorderLayout.NORTH);
        } else {
            topPanel.remove(filterPanel);
            listPanel.setFilter(null);
        }
        this.pack();

    }

    public void convert() {
        JDialog converter = new JDialog(this, "Convert file", true);
        converter.setLocation((int) getLocation().getX() + 50,
                (int) getLocation().getY() + 50);
        converter.add(new ConverterPanel());
        converter.pack();
        converter.setVisible(true);
    }

    public FilterPanel getFilterPanel() {
        return filterPanel;
    }

    public void showErrorMessage(String message) {
        JOptionPane.showMessageDialog(this, message, "Error", JOptionPane.ERROR_MESSAGE);
    }

    private void exit() {
        setVisible(false);
        listPanel.saveColumnWidths();
        CharProps.getProperties().setProperty("window.dimensions", this.getWidth() + "," + this.getHeight());
        CharProps.getProperties().setProperty("window.location", this.getX() + "," + this.getY());
        CharProps.storeProps();
        System.exit(0);
    }
}
