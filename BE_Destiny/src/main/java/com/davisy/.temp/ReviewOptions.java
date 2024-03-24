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

/**
 *
 * @author Daddy
 */
public class ReviewOptions {

    public enum ReviewType {

        BOTH, SIMPLIFIED, TRADITIONAL;
    }

    int repeatPerChar;
    int missPenalty;
    boolean useSound;
    ReviewType type = ReviewType.BOTH;

    public void getDefaults() {
        repeatPerChar = CharProps.getIntProperty("review.repeat", 2);
        missPenalty = CharProps.getIntProperty("review.penalty", 3);
        useSound = CharProps.getBooleanProperty("review.sound", true);
        type = ReviewType.valueOf(CharProps.getProperty("review.type"));
    }

    public void setDefaults() {
        if (repeatPerChar <= 0) {
            repeatPerChar = 1;
        }
        CharProps.getProperties().setProperty("review.repeat", repeatPerChar + "");
        CharProps.getProperties().setProperty("review.penalty", missPenalty + "");
        CharProps.getProperties().setProperty("review.sound", useSound + "");
        CharProps.getProperties().setProperty("review.type", type.name());
    }
}
