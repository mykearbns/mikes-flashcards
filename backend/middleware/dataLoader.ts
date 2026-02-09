import type {Request, Response, NextFunction} from 'express';
import DataManager from '../services/DataManager.ts';

const dataLoader = function(req:Request, res:Response, next:NextFunction){
    
    const dataManager = DataManager.getInstance();
    
    // Load existing data (preserves existing api_response_data)
    // This will only create default data if the file doesn't exist
    const currentData = dataManager.loadData();
    
    console.log(`Loaded data with ${currentData.data.deck_data.length} items`);
    
    next();
}
export default dataLoader;
