/*
 * Copyright (C) 2014 Daddy.
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
package hanzihelper;

import java.net.URL;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import javax.media.*;
import javax.media.format.AudioFormat;

/**
 *
 * @author Daddy
 */
public class FlashcardDeck {

    List<Flashcard> flashcards = new LinkedList<Flashcard>();

    int totalCards;
    int totalUnique;
    int totalCorrect;
    int totalWrong;
    int currentCardOffset;

    ReviewOptions reviewOptions;
    Player player;

    public FlashcardDeck(CharRecord records, ReviewOptions reviewOptions) {
        this.reviewOptions = reviewOptions;

        Collection c = records.getRecords(false);
        Iterator iterator = c.iterator();
        while (iterator.hasNext()) {
            Record record = (Record) iterator.next();
            Flashcard newTradCard = new Flashcard(record, true);
            Flashcard newSimpCard = new Flashcard(record, false);
            totalUnique++;
            for (int i = 0; i < reviewOptions.repeatPerChar; i++) {
                if (record.hasTrad()) {
                    if (reviewOptions.type != ReviewOptions.ReviewType.SIMPLIFIED) {
                        addCard(newTradCard);
                    }
                    if (reviewOptions.type != ReviewOptions.ReviewType.TRADITIONAL) {
                        addCard(newSimpCard);
                    }
                } else {
                    addCard(newSimpCard);
                }
            }
        }
        Collections.shuffle(flashcards);
        if (reviewOptions.useSound) {
            initializeSound();
        }

    }

    private void addCard(Flashcard newCard) {
        flashcards.add(newCard);
        totalCards++;
    }

    public void answerCorrect() {
        totalCorrect++;
        currentCardOffset++;
    }

    public void answerWrong() {
        Flashcard wrongFlashcard = flashcards.get(currentCardOffset);
        totalWrong++;
        flashcards.subList(0, currentCardOffset + 1).clear();
        for (int i = 0; i < reviewOptions.missPenalty; i++) {
            flashcards.add(wrongFlashcard);
            totalCards++;
        }
        Collections.shuffle(flashcards);
        currentCardOffset = 0;
    }

    public boolean hasNext() {
        return (currentCardOffset < flashcards.size());
    }

    public String getChars() {
        return (flashcards.get(currentCardOffset).getChars());
    }

    public String getAlternateChars() {
        return (flashcards.get(currentCardOffset).getAlternateChars());
    }

    public String getPinyinColorized() {
        return (flashcards.get(currentCardOffset).getPinyinColorized());
    }

    public String getDefinition() {
        return (flashcards.get(currentCardOffset).getDefinition());
    }

    public String getBookAndChapter() {
        return (flashcards.get(currentCardOffset).getBookAndChapter());
    }

    public boolean isTrad() {
        return (flashcards.get(currentCardOffset).isTraditional);
    }

    public String getCardCount() {
        //       float perCorrect;
        //       perCorrect = (totalWrong + totalCorrect == 0) ? 0 : (float) totalCorrect * 100 / (totalWrong + totalCorrect);
//        return (String.format("%d/%02d", totalCorrect + totalWrong + 1, totalCards));
        return (String.format("<html>%d/%02d <FONT COLOR=RED>%d</FONT> <FONT COLOR=GREEN>%d</FONT> %2.1f%%</html>",
                totalCorrect + totalWrong + 1, totalCards,
                totalWrong, totalCorrect, getCorrectPercentage()));
    }

    public String getFinalResults() {
        return (String.format("<html>Congratulations, you scored %d correct out of %d (%2.1f%%).<br><center><font SIZE=30>加油!</font></center></html>",
                totalCorrect, totalCards, getCorrectPercentage()));
    }

    public float getCorrectPercentage() {
        return ((totalWrong + totalCorrect == 0) ? 0 : (float) totalCorrect * 100 / (totalWrong + totalCorrect));
    }

    /**
     * Initializes the player for the pinyin sound file, if we are configured to use sound. This
     * will assume that everything in the 'pinyin' field up to the first space is a valid pinyin
     * syllable (ascii numerical format). This should probably use PinyinUtil once that gets more
     * robust. This should also be enhanced to do more than one syllable. I'm still not sure how to
     * chain sounds to play end-to-end. If a sound file is not found that matches, this will simply
     * return.
     */
    public void prepareSound() {
        if (!reviewOptions.useSound) {
            return;
        }
        String[] syllables = flashcards.get(currentCardOffset).getPinyin().split(" ");
        String pinyinFile = "sound/" + syllables[0] + ".mp3";
        URL url = getClass().getResource(pinyinFile);
        player = null;
        if (url != null) {
            //          System.out.println("Found " + pinyinFile);
            try {
                player = Manager.createRealizedPlayer(url);
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            //} else {
            //          System.out.println("Could not find " + pinyinFile);
        }
    }

    public void playSound() {
        if ((reviewOptions.useSound) && (player != null)) {
            try {
                player.start();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }

    private void initializeSound() {
        Format input1 = new AudioFormat(AudioFormat.MPEGLAYER3);
        Format input2 = new AudioFormat(AudioFormat.MPEG);
        Format output = new AudioFormat(AudioFormat.LINEAR);
        PlugInManager.addPlugIn(
                "com.sun.media.codec.audio.mp3.JavaDecoder",
                new Format[]{input1, input2},
                new Format[]{output},
                PlugInManager.CODEC
        );
    }

}
