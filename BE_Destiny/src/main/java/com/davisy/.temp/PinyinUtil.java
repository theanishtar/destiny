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

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

/**
 * Turns ASCII pinyin into proper (unicode) pinyin with tones - "wo3" -> "wǒ".
 */
public class PinyinUtil {

    private static final String vowels = "aoeiuü";
    private static final String[] legalIntials = {"", "y", "w", "b", "p", "m", "f", "d", "t", "n", "l", "z", "c", "s", "zh", "ch", "sh", "r", "j", "q", "x", "g", "k", "h"};
    private static final String[] legalFinals = {"", "n", "ng", "nr", "r"};
    private static final String[] legalVowelGroups = {"a", "e", "i", "o", "u", "ü", "ai", "ao", "ou", "ei", "iao", "ie", "ia", "iu", "uo", "ui", "ua"};
    private static final String pinyinVowelsLC = "āáǎàaōóǒòoēéěèeīíǐìiūúǔùuǖǘǚǜüü";
    private static final String pinyinVowelsUC = "ĀÁǍÀAŌÓǑÒOĒÉĚÈE";

    /**
     * Takes a string and removes all ASCII numerical tones, putting the correct mark over a vowel
     * in the preceeding syllableFromStack<br/>
     * By the way, v's are replaced with ü's.
     *
     * @param pinyin ASCII pinyin ("ni3 hao3 ma5")
     * @return Unicode pinyin ("nǐ hǎo ma")
     */
    public static String toUnicode(String pinyin) {
        StringBuffer result = new StringBuffer();
        pinyin = pinyin.replaceAll("v", "ü");
        pinyin = pinyin.replaceAll("u:", "ü");
        pinyin = pinyin.replaceAll("V", "Ü");
        String[] syllables = getSyllables(pinyin);
        for (int i = 0; i < syllables.length; i++) {
            String syllable = syllables[i];
            result.append(syllableToUnicode(syllable));
            if (i < syllables.length - 1) {
                result.append(" ");
            }
        }
//    result.append(pinyin.substring(lastIndex));

        return result.toString();
    }

    /**
     * Takes a string and removes all tone marks, annotating with plan ASCII style numerical tones.
     * This is still rather limited in its ability to parse connected pinyin syllables. Currently
     * the assumption is that each syllable is separated by white space.
     *
     * @param pinyin Unicode pinyin ("nǐ hǎo ma")
     * @return ASCII pinyin ("ni3 hao3 ma5")
     */
    public static String toAscii(String pinyin) {
        // First adds the numerical value based on a tone mark
        pinyin = pinyin.replaceAll("(\\S*[āōēīūǖĀŌĒǕ]\\S*)", "$11");
        pinyin = pinyin.replaceAll("(\\S*[áóéíúǘÁÓÉǗ]\\S*)", "$12");
        pinyin = pinyin.replaceAll("(\\S*[ǎǒěǐǔǚǍǑĚǙ]\\S*)", "$13");
        pinyin = pinyin.replaceAll("(\\S*[àòèìùǜÀÒÈǛ]\\S*)", "$14");

        // Now gets rid of the tone marks
        pinyin = pinyin.replaceAll("[āáǎà]", "a");
        pinyin = pinyin.replaceAll("[ōóǒò]", "o");
        pinyin = pinyin.replaceAll("[ēéěè]", "e");
        pinyin = pinyin.replaceAll("[īíǐì]", "i");
        pinyin = pinyin.replaceAll("[ūúǔù]", "u");
        pinyin = pinyin.replaceAll("[ǖǘǚǜü]", "v");
        pinyin = pinyin.replaceAll("[ĀÁǍÀ]", "A");
        pinyin = pinyin.replaceAll("[ŌÓǑÒ]", "O");
        pinyin = pinyin.replaceAll("[ĒÉĚÈ]", "E");
        pinyin = pinyin.replaceAll("[ǕǗǙǛÜ]", "V");

        return pinyin;
    }

    private static String syllableToUnicode(String pinyin) {
        char last = pinyin.charAt(pinyin.length() - 1);
        if (!Character.isDigit(last)) {
            return pinyin;
        }
        int tone = Integer.parseInt("" + last);
        int vowelAt;
        char vowel;
        if (pinyin.indexOf("iu") > -1) {
            // A special case.
            vowelAt = pinyin.indexOf("iu") + 1;
            vowel = 'u';
        } else {
            vowelAt = getFirstVowel(pinyin);
            vowel = pinyin.charAt(vowelAt);
        }
        char newChar;
        if (Character.isUpperCase(vowel)) {
            newChar = pinyinVowelsUC.charAt((vowels.indexOf(Character.toLowerCase(vowel)) * 5) + (tone - 1));
        } else {
            newChar = pinyinVowelsLC.charAt((vowels.indexOf(vowel) * 5) + (tone - 1));
        }

        String result = pinyin.substring(0, pinyin.length() - 1).replace(vowel, newChar);
        return result;
    }

    private static int getFirstVowel(String in) {
        char[] chars = in.toLowerCase().toCharArray();
        int lowest = 99;
        int idx = -1;
        for (int i = 0; i < chars.length; i++) {
            char aChar = chars[i];
            int index = vowels.indexOf(aChar);
            if (index > -1 && index < lowest) {
                lowest = index;
                idx = i;
            }
        }
        return idx;
    }

    /**
     * Breaks a pinyin string on tone markers
     */
    public static String[] getSyllables(String pinyin) {

        // Go through the pinyin.
        // A syllableFromStack ends with:
        // - A number
        // - the end of a vowel group
        // - n, ng, r
        // - the end of the string
        // All syllables contain a vowel group
        // I'm doing the stack stuff in the hope of making this more robust
        // in future, such as being able to divide the string "canguan" into "can, guan"
        // JDK 1.5
//    List<String> syllables = new ArrayList<String>();
//    Stack<Character> last = new Stack<Character>();
//    Stack<Character> next = new Stack<Character>();
        List syllables = new ArrayList();
        Stack last = new Stack();
        Stack next = new Stack();
        for (int i = pinyin.length() - 1; i >= 0; i--) {
//      next.push(pinyin.charAt(i));
            next.push(new Character(pinyin.charAt(i)));
        }

        do {

//      char c = next.pop();
//      last.push(c);
            char c = ((Character) next.pop()).charValue();
            if (' ' == c) {
                if (last.size() > 0) {
                    syllables.add(syllableFromStack(last));
                }
                continue;
            }

            last.push(new Character(c));
            if (Character.isDigit(c)) {
                syllables.add(syllableFromStack(last));
                continue;
            } else if (c == 'r' && (next.size() == 0 || Character.isDigit(((Character) next.peek()).charValue()))) {
                last.pop();
                if (((Character) last.peek()).charValue() == 'e') {
                    // Add another epicyle!
                    last.push(new Character('r'));
                    continue;
                }
                if (next.size() > 0) {
                    char nextChar = ((Character) next.pop()).charValue();
                    if (Character.isDigit(nextChar)) {
                        last.push(new Character(nextChar));
                    } else {
                        next.push(new Character(nextChar));
                    }
                    syllables.add(syllableFromStack(last));
                    syllables.add("er");
                }
            }

        } while (!next.isEmpty());

        if (!last.isEmpty()) {
            syllables.add(syllableFromStack(last));
        }

        return (String[]) syllables.toArray(new String[]{});

    }

    // JDK 1.5
//  private static String syllableFromStack(Stack<Character> stack) {
    private static String syllableFromStack(Stack stack) {
        StringBuffer sb = new StringBuffer();
        while (!stack.isEmpty()) {
            sb.append(stack.pop());
        }
        String s = sb.reverse().toString();
        return s;
    }

    public static boolean isValidSyllable(String syllable) {
        String initials = "", vowelGroup = "", finals = "";
        char[] chars = syllable.toCharArray();
        boolean inVowels = false;
        for (int i = 0; i < chars.length; i++) {
            char c = chars[i];
            if (Character.isDigit(c)) {
                continue;
            }
            if (!inVowels && vowels.indexOf(c) == -1) {
                initials += "" + c;
            } else if (vowels.indexOf(c) >= 0) {
                inVowels = true;
                vowelGroup += "" + c;
            } else {
                finals += "" + c;
            }
        }

        return isInArray(initials, legalIntials) && isInArray(vowelGroup, legalVowelGroups) && isInArray(finals, legalFinals);

    }

    private static boolean isInArray(String s, String[] array) {
        for (int i = 0; i < array.length; i++) {
            if (s.equals(array[i])) {
                return true;
            }
            ;

        }
        return false;
    }
}
