import type { Router, Response, Request, NextFunction } from 'express';
import express from 'express';
import {fileURLToPath} from 'url';
import {router} from './index.ts';
// import {indexRoute, cardsRoute, decksRoute} from './routes.ts';
import dataLoader from '../middleware/dataLoader.ts';
import DataManager from '../services/DataManager.ts';


const __dirname = fileURLToPath(import.meta.url);
// const app = express();

// Route Handlers

export const indexRoute: Router = router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { title: "Mike's FlashDecks"});

    
});

export const cardsRoute: Router = router.get('/decks/:deckId/cards', (req: Request, res: Response) => {
    const { deckId } = req.params;
    // Logic to retrieve cards for the specified deckId
    res.json({ message: `Cards for deck ${deckId}` });
});

export const decksRoute: Router = router.get('/decks', async(req: Request, res: Response) => {
    // Logic to retrieve all decks
    // res.json({ message: 'List of all decks' });
    const dataManager = DataManager.getInstance();
    const data = await dataManager.getCurrentData();

    // res.json(data);
    res.render('view-decks', { title: "Mike's FlashDecks - Decks", decks: data });
});



// export {indexRoute, cardsRoute, decksRoute};
