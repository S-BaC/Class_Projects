package BlackjackCmdline;

import java.util.ArrayList;
import java.util.*;

public class Main {

    static int playerValue = 0;
    static int computerValue = 0;
    static int playerHand = 0;
    static int computerHand = 0;
    static int totalCards = 52;

    // turn: 0 for player, 1 for computer

    public static void main(String[] args)

    {
        // Getting the deck ready
        ArrayList<Object> deckTypes = typeAdder();
        ArrayList<Object> deckValues = valueAdder();

        Scanner sc = new Scanner(System.in);

        // The real setup
        while (true) {
            System.out.println("0 to hit, 1 to stand, 2 to Reset");
            int userCommand = sc.nextInt();

            if (userCommand == 0) {
                int value = hit(deckValues, deckTypes, 0) - 1;
                calc(value, 0, playerHand);
                System.out.println("Player: " + playerValue);
                System.out.println("Computer: " + computerValue);
                System.out.println("PlayerHand: " + playerHand);
                System.out.println("ComputerHand: " + computerHand);
            }

            else if (userCommand == 1) {
                compPlaying(deckValues, deckTypes);
                System.out.println("Player: " + playerValue);
                System.out.println("Computer: " + computerValue);
                System.out.println("PlayerHand: " + playerHand);
                System.out.println("ComputerHand: " + computerHand);
                results(playerValue, computerValue);
            }

            else if (userCommand == 2) {
                playerValue = 0;
                computerValue = 0;
                playerHand = 0;
                computerHand = 0;
                totalCards = 52;
                deckTypes = typeAdder();
                deckValues = valueAdder();
            }
            else {
                System.out.println("Understandable. Have a nice day!");
                break;
            }
        }
    }
    public static void results(int playerValue, int computerValue) {

        if (playerValue <= 21) {
            if (computerValue <= 21) {
                if (playerValue > computerValue) {
                    System.out.println("The winner is PLAYER!");
                } else if (playerValue < computerValue) {
                    System.out.println("The winner is COMPUTER!");
                } else {
                    System.out.println("It's a DRAW!");
                }
            } else {
                System.out.println("The winner is PLAYER!");
            }
        } else {
            if (computerValue <= 21) {
                System.out.println("The winner is COMPUTER!");
            } else {
                System.out.println("It's a DRAW!");
            }
        }

    }

    // Computer's turn
    public static void compPlaying(ArrayList<Object> deckValues, ArrayList<Object> deckTypes) {
        if (playerHand == 5 && playerValue <= 21) {
            System.out.println("FIVE CARDS: The winner is PLAYER!");
        }
        while (computerValue < 17 && computerHand <= 5) {
            calc(hit(deckValues, deckTypes, 1) - 1, 1, computerHand);
        }
        if (computerHand == 5 && computerValue <= 21) {
            System.out.println("FIVE CARDS: The winner is COMPUTER!");
        }
    }

    // Algo: decks >> update (decks and hands), produce(cardValue)
    public static int hit(ArrayList<Object> deckValues, ArrayList<Object> deckTypes, int turn) {
        int card = randCard();
        System.out.println("You got a " + deckValues.get(card) + " of " + deckTypes.get(card));
        deckValues.remove(card);
        deckTypes.remove(card);
        totalCards -= 1;
        switch (turn) {
            case 0:
                playerHand += 1;
                break;
            case 1:
                computerHand += 1;
        }
        return (int) deckValues.get(card);
    }

    // Algo: cardValues >> (sum)Values
    public static void calc(int value, int turn, int hand) {

        int addedValue = 0;

        if (value == 1) {
            switch (hand) {
                case 1:
                    addedValue = 11;
                    break;
                case 2:
                    addedValue = 11;
                    break;
                case 3:
                    addedValue = 10;
                    break;
                default:
                    addedValue = 1;
            }
        }

        else if (value == 11 || value == 12 || value == 13) {
            addedValue = 10;
        }

        else {
            addedValue = value;
        }

        switch (turn) {
            case 0:
                playerValue += addedValue;
                break;
            case 1:
                computerValue += addedValue;
        }

    }

    // Random Card
    public static int randCard() {
        return (int) (Math.random() * totalCards);
    }

    // Function to display elements of the ArrayList
    public static void display(ArrayList<Object> arr) {
        for (int i = 0; i < arr.size(); i++) {
            System.out.print(arr.get(i) + " ");
        }
        System.out.println();
    }

    // Creating cards:
    public static ArrayList<Object> typeAdder() {
        ArrayList<Object> deckTypes = new ArrayList<Object>();
        for (int j = 0; j < 4; j++) {
            if (j == 0) {
                for (int k = 0; k < 13; k++) {
                    deckTypes.add("Spades");
                }
            }
            if (j == 1) {
                for (int k = 0; k < 13; k++) {
                    deckTypes.add("Hearts");
                }
            }
            if (j == 2) {
                for (int k = 0; k < 13; k++) {
                    deckTypes.add("Diamonds");
                }
            }
            if (j == 3) {
                for (int k = 0; k < 13; k++) {
                    deckTypes.add("Clubs");
                }
            }
        }
        return deckTypes;
    }

    public static ArrayList<Object> valueAdder() {
        ArrayList<Object> deckValues = new ArrayList<Object>();
        for (int l = 0; l < 4; l++) {
            for (int i = 1; i < 14; i++) {
                deckValues.add(i);
            }
        }
        return deckValues;
    }
}