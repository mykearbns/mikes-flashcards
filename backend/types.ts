export type Card = {
    card_id: string;
    word?: string;
    word_definition?: string;
    phrase?: string;
    phrase_definition?: string;
    sentence?: string;
    sentence_definition?: string;
    tags?: string[];
    last_reviewed: string; // ISO date string
};

export type Deck = {
    deck_id: string;
    deck_category?: string;
    deck_description?: string;
    number_of_cards?: number;
    cards?: Card[];
}
