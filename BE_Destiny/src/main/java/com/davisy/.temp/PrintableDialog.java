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

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.awt.print.*;

/**
 * This dialog shows a "print preview" that the user can configure and send to the printer.
 */
public class PrintableDialog extends JDialog implements ActionListener {

    private GridPanel gridPanel;
    private JButton printButton, setupButton, closeButton, sizesButton;
    private JComboBox style;
    private JComboBox text;
    private String[] styles = new String[]{"One per row", "Cram", "Rows", "Read"};
    private String[] texts = new String[]{"None", "Chinese", "Pinyin", "English", "Pinyin/English"
    /*, "Pinyin/Chinese" */ }; // 1.0 - this is hard
    private JCheckBox guides, grid, randomize, fillPage, header, lines;
    private JButton fontButton;
    private JButton prev, next;
    private PageFormat format = null;
    private PrintMode printMode = new PrintMode(PrintMode.STYLE_CRAM, PrintMode.TEXT_CHARS);
    private double ratio = -1; // Maintain constant aspect ration

    public PrintableDialog() {
        setTitle("Print Preview");
        printMode.setStyle(CharProps.getIntProperty("last.printmode.style", PrintMode.STYLE_CRAM));
        printMode.setText(CharProps.getIntProperty("last.printmode.text", PrintMode.TEXT_CHARS));

        Container thiss = this.getContentPane();
        thiss.setLayout(new BorderLayout());
        gridPanel = new GridPanel(printMode);

        Paper paper = new Paper();
        double margin = CharProps.getDoubleProperty("paper.margins", gridPanel.getMargins()) * 72;
        String paperSize = CharProps.getProperty("paper.size");
        // A bit of a hack.
        if ("A4".equalsIgnoreCase(paperSize)) {
            paper.setImageableArea(margin, margin, 558.1417322834645, 805.8897637795276);
            paper.setSize(595.275590551181, 841.8897637795276);
        }
        paper.setImageableArea(margin, margin, paper.getWidth() - 2 * margin, paper.getHeight() - 2 * margin);
        format = new PageFormat();
        format.setPaper(paper);

        thiss.add(gridPanel, BorderLayout.CENTER);

        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER));
        printButton = new JButton("Print");
        setupButton = new JButton("Page Setup");
        closeButton = new JButton("Close");
        printButton.setBackground(CharApp.COLOR_BUTTON);
        setupButton.setBackground(CharApp.COLOR_BUTTON);
        closeButton.setBackground(CharApp.COLOR_BUTTON);
        printButton.addActionListener(this);
        setupButton.addActionListener(this);
        closeButton.addActionListener(this);

        buttonPanel.add(printButton);
        buttonPanel.add(setupButton);
        buttonPanel.add(closeButton);

        buttonPanel.setBackground(CharApp.COLOR_BG);

        JPanel controlPanel = new JPanel(new GridLayout(3, 1));
        controlPanel.setBackground(CharApp.COLOR_BG);
        style = new JComboBox(styles);
        text = new JComboBox(texts);
        style.setBackground(CharApp.COLOR_BUTTON);
        text.setBackground(CharApp.COLOR_BUTTON);

        guides = new JCheckBox("Guides");
        guides.setBackground(CharApp.COLOR_BG);
        grid = new JCheckBox("Grid Style");
        grid.setBackground(CharApp.COLOR_BG);
        randomize = new JCheckBox("Random");
        randomize.setBackground(CharApp.COLOR_BG);
        fillPage = new JCheckBox("Fill page");
        fillPage.setBackground(CharApp.COLOR_BG);
        lines = new JCheckBox("Lines");
        lines.setBackground(CharApp.COLOR_BG);
        header = new JCheckBox("Header");
        header.setBackground(CharApp.COLOR_BG);
        guides.setSelected("true".equals(CharProps.getProperty("draw.guides")));
        grid.setSelected("true".equals(CharProps.getProperty("draw.gridstyle")));
        grid.setEnabled(guides.isSelected());
        randomize.setSelected(gridPanel.isRandomOrder());
        fillPage.setSelected(gridPanel.isFillThePage());
        lines.setSelected(true);
        header.setSelected(true);

        guides.addActionListener(this);
        grid.addActionListener(this);
        randomize.addActionListener(this);
        fillPage.addActionListener(this);
        lines.addActionListener(this);
        header.addActionListener(this);

        next = new JButton(">");
        prev = new JButton("<");
        next.setBackground(CharApp.COLOR_BUTTON);
        prev.setBackground(CharApp.COLOR_BUTTON);
        fontButton = new JButton("Fonts");
        fontButton.setBackground(CharApp.COLOR_BUTTON);
        sizesButton = new JButton("Boxes");
        sizesButton.setBackground(CharApp.COLOR_BUTTON);
        next.addActionListener(this);
        prev.addActionListener(this);
        fontButton.addActionListener(this);
        sizesButton.addActionListener(this);

        JPanel temp = new JPanel();
        temp.setBackground(CharApp.COLOR_BG);
        temp.add(new JLabel("Style:"));
        temp.add(style);
        temp.add(guides);
        temp.add(grid);
        temp.add(randomize);
        temp.add(fillPage);
        controlPanel.add(temp);
        temp = new JPanel();
        temp.setBackground(CharApp.COLOR_BG);
        temp.add(new JLabel("Text:"));
        temp.add(text);
        temp.add(fontButton);
        temp.add(sizesButton);
        temp.add(lines);
        temp.add(header);
        controlPanel.add(temp);
        controlPanel.add(buttonPanel);

        switch (printMode.getText()) {
            case PrintMode.TEXT_CHARS:
                text.setSelectedIndex(1);
                break;
            case PrintMode.TEXT_PINYIN:
                text.setSelectedIndex(2);
                break;
            case PrintMode.TEXT_ENGLISH:
                text.setSelectedIndex(3);
                break;
            case PrintMode.TEXT_ENGLISH_PINYIN:
                text.setSelectedIndex(4);
                break;
            default:
                text.setSelectedIndex(0);
        }

        switch (printMode.getStyle()) {
            case PrintMode.STYLE_CRAM:
                style.setSelectedIndex(1);
                break;
            case PrintMode.STYLE_ALTERNATING_LINES:
                style.setSelectedIndex(2);
                break;
            case PrintMode.STYLE_READING:
                style.setSelectedIndex(3);
                break;
            default:
                style.setSelectedIndex(0);
        }
        style.addActionListener(this);
        text.addActionListener(this);

        buttonPanel.setBorder(BorderFactory.createLineBorder(Color.blue));
        controlPanel.setBorder(BorderFactory.createLineBorder(Color.blue));

        buttonPanel.add(new JLabel("Page:"));
        buttonPanel.add(prev);
        buttonPanel.add(next);

        JScrollPane scroller = new JScrollPane(controlPanel);
//    thiss.add(controlPanel, BorderLayout.SOUTH);
        thiss.add(scroller, BorderLayout.SOUTH);
        this.setResizable(true);

        this.addComponentListener(new ComponentAdapter() {
            public void componentResized(ComponentEvent e) {
                if (ratio < 0) {
                    ratio = (double) getHeight() / (double) getWidth();
                }
                setSize((int) ((double) getHeight() / ratio), getHeight());
            }
        });
    }

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == printButton) {
            printMe();
        } else if (e.getSource() == setupButton) { // Page setup
            PrinterJob printJob = PrinterJob.getPrinterJob();
            format = printJob.pageDialog(format);

            // Did they set to A4?
            // TODO: This is a hack. Better to store the paper itself.
            double heightD = Math.abs(format.getPaper().getHeight() - 841.8897637795276);
            double widthD = Math.abs(format.getPaper().getWidth() - 595.275590551181);
            if (heightD < .001 && widthD < .001) {
                CharProps.getProperties().setProperty("paper.size", "A4");
            } else {
                CharProps.getProperties().setProperty("paper.size", "letter");
            }

            gridPanel.setMargins(format.getImageableX() / GridPanel.anInch);
            CharProps.getProperties().setProperty("paper.margins", (format.getImageableX() / GridPanel.anInch) + "");
            gridPanel.repaint();
        } else if (e.getSource() == guides) {
            CharProps.getProperties().setProperty("draw.guides", guides.isSelected() + "");
            gridPanel.setDrawGuides(guides.isSelected());
            grid.setEnabled(guides.isSelected());
            gridPanel.repaint();
        } else if (e.getSource() == grid) {
            CharProps.getProperties().setProperty("draw.gridstyle", grid.isSelected() + "");
            gridPanel.setGridStyle(grid.isSelected());
            gridPanel.repaint();
        } else if (e.getSource() == randomize) {
            if (randomize.isSelected()) {
                CharApp.getInstance().getRecord().shuffle();
            }
            gridPanel.setRandomOrder(randomize.isSelected());
        } else if (e.getSource() == lines) {
            gridPanel.setGridLines(lines.isSelected());
        } else if (e.getSource() == header) {
            gridPanel.setHeader(header.isSelected());
        } else if (e.getSource() == fillPage) {
            gridPanel.setFillThePage(fillPage.isSelected());
            gridPanel.repaint();
        } else if (e.getSource() == closeButton) {
            this.setVisible(false);
            this.dispose();
        } else if (e.getSource() == next) {
            if (gridPanel.getCurrentPageIndex() < gridPanel.getPages() - 1) {
                gridPanel.setCurrentPageIndex(gridPanel.getCurrentPageIndex() + 1);
            }
        } else if (e.getSource() == prev) {
            if (gridPanel.getCurrentPageIndex() > 0) {
                gridPanel.setCurrentPageIndex(gridPanel.getCurrentPageIndex() - 1);
            }
        } else if (e.getSource() == fontButton) {
            new FontDialog(this, gridPanel).setVisible(true);
        } else if (e.getSource() == sizesButton) {
            new BoxSizeDialog(this, gridPanel).setVisible(true);
        } else if (e.getSource() == text) {
            printMode.setText(text.getSelectedIndex());
        } else if (e.getSource() == style) {
            printMode.setStyle(style.getSelectedIndex() + 1);
        }

        CharProps.getProperties().setProperty("last.printmode.text", printMode.getText() + "");
        CharProps.getProperties().setProperty("last.printmode.style", printMode.getStyle() + "");
        try {
            gridPanel.setPrintMode(printMode);
        } catch (Exception ex) {
//      ex.printStackTrace();
        }
    }

    public void printMe() {

        final PrinterJob printJob = PrinterJob.getPrinterJob();
        printJob.setPageable(new Pageable() {
            public int getNumberOfPages() {
                return gridPanel.getPages();
            }

            public PageFormat getPageFormat(int pageIndex) throws IndexOutOfBoundsException {
                return format;
            }

            public Printable getPrintable(int pageIndex) throws IndexOutOfBoundsException {
                return gridPanel;
            }
        });

        if (printJob.printDialog()) {
            new Thread() {
                public void run() {
                    try {
                        printJob.print();
                    } catch (PrinterException e) {
                        e.printStackTrace();
                    }
                }
            }.start();
        }
    }
}
