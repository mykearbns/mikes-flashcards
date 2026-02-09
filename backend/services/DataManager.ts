import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface DataStore {
    site: {
        title: string;
        description: string;
        language: string;
    };
    data: {
        deck_data: any[];
    };
}

class DataManager {
    private static instance: DataManager;
    private dataPath: string;
    private defaultData: DataStore;

    private constructor() {
        this.dataPath = path.join(__dirname, '../data/data.json');
        this.defaultData = {
            site: {
                title: "Mikes Flash Deck",
                description: "My personal flash card app",
                language: "en-US"
            },
            data: {
                deck_data: [
                    {
                        "deck_id": 1,
                        "deck_category": "Spanish",
                        "deck_description": "Basic Spanish phrases",
                        "number_of_cards": 1,
                        "cards": [
                            {
                                "card_id": 1,
                                "word": null,
                                "word_definition": null,
                                "phrase": "¿Cómo estás?",
                                "phrase_definition": "How are you?",
                                "sentence": null,
                                "sentence_definition": null,
                                "tags": [],
                                "last_reviewed": null
                            }
                        ]
                    },
                    {
                        "deck_id": 2,
                        "deck_category": "French",
                        "deck_description": "Basic French phrases",
                        "number_of_cards": 1,
                        "cards": [
                            {
                                "card_id": 1,
                                "word": null,
                                "word_definition": null,
                                "phrase": "Comment ça va?",
                                "phrase_definition": "How are you?",
                                "sentence": null,
                                "sentence_definition": null,
                                "tags": [],
                                "last_reviewed": null
                            }
                        ]
                    }
                ]
            }
        };
    }

    public static getInstance(): DataManager {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager();
        }
        return DataManager.instance;
    }

    /**
     * Loads data from the JSON file, or creates default data if file doesn't exist
     */
    public loadData(): DataStore {
        try {
            if (fs.existsSync(this.dataPath)) {
                const fileContent = fs.readFileSync(this.dataPath, 'utf-8');
                const data = JSON.parse(fileContent);
                
                // Ensure the data structure is correct
                if (!data.site) data.site = this.defaultData.site;
                if (!data.data) data.data = this.defaultData.data;
                if (!data.data.deck_data) data.data.deck_data = [];
                
                return data;
            } else {
                // File doesn't exist, create it with default data
                this.saveData(this.defaultData);
                return this.defaultData;
            }
        } catch (error) {
            console.error('Error data:', error);
            return this.defaultData;
        }
    }

    /**
     * Saves data to the JSON file
     */
    public saveData(data: DataStore): void {
        try {
            // Ensure directory exists
            const dir = path.dirname(this.dataPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    /**
     * Adds new item to deck_data array
       can be used to add expire times*/
    public addData(newItem: any): DataStore {
        const currentData = this.loadData();
        currentData.data.deck_data.push(newItem);
        this.saveData(currentData);
        return currentData;
    }

    /**
     * Removes item from deck_data array by index
     */
    // public removeData(index: number): DataStore {
    //     const currentData = this.loadData();
    //     if (index >= 0 && index < currentData.data.deck_data.length) {
    //         currentData.data.deck_data.splice(index, 1);
    //         this.saveData(currentData);
    //     }
    //     return currentData;
    // }

    /**
     * Removes item from deck_data array by matching criteria
     */
    // public removeDataBy(criteria: (item: any) => boolean): DataStore {
    //     const currentData = this.loadData();
    //     currentData.data.deck_data = currentData.data.deck_data.filter(item => !criteria(item));
    //     this.saveData(currentData);
    //     return currentData;
    // }

    /**
     * Updates specific item in deck_data array
     */
    // public updateData(index: number, updatedItem: any): DataStore {
    //     const currentData = this.loadData();
    //     if (index >= 0 && index < currentData.data.deck_data.length) {
    //         currentData.data.deck_data[index] = updatedItem;
    //         this.saveData(currentData);
    //     }
    //     return currentData;
    // }

    /**
     * Replaces all deck_data with new array
     */
    public replaceAllData(newData: any[]): DataStore {
        const currentData = this.loadData();
        currentData.data.deck_data = newData;
        this.saveData(currentData);
        return currentData;
    }

    /**
     * Gets current data without loading from file (for performance)
     */
    public getCurrentData(): DataStore {
        return this.loadData();
    }

    /**
     * Clears all deck_data (sets to empty array)
     */
    public clearData(): DataStore {
        const currentData = this.loadData();
        currentData.data.deck_data = [];
        this.saveData(currentData);
        return currentData;
    }
}

export default DataManager;
