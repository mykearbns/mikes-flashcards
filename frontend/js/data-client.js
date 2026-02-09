// Simple client-side JavaScript for testing data management
class DataClient {
    constructor() {
        this.baseUrl = window.location.origin;
    }

    async getDecksData() {
        try {
            const response = await fetch(`${this.baseUrl}/decks`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    // async addData(newItem) {
    //     try {
    //         const response = await fetch(`${this.baseUrl}/api/data`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(newItem)
    //         });
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.error('Error adding data:', error);
    //         return null;
    //     }
    // }

    // async removeData(index) {
    //     try {
    //         const response = await fetch(`${this.baseUrl}/api/data/${index}`, {
    //             method: 'DELETE'
    //         });
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.error('Error removing data:', error);
    //         return null;
    //     }
    // }

    // async updateData(index, updatedItem) {
    //     try {
    //         const response = await fetch(`${this.baseUrl}/api/data/${index}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(updatedItem)
    //         });
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.error('Error updating data:', error);
    //         return null;
    //     }
    // }

    // async clearAllData() {
    //     try {
    //         const response = await fetch(`${this.baseUrl}/api/data`, {
    //             method: 'DELETE'
    //         });
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.error('Error clearing data:', error);
    //         return null;
    //     }
    // }
}

// Example usage:
// const client = new DataClient();
// 
// // Add data
// client.addData({id: 1, name: 'Product 1', price: 29.99});
// 
// // Get all data
// client.getData().then(data => console.log(data));
// 
// // Remove data by index
// client.removeData(0);
// 
// // Update data
// client.updateData(0, {id: 1, name: 'Updated Product', price: 34.99});
// 
// // Clear all data
// client.clearAllData();

// Make it globally available
window.DataClient = DataClient;
