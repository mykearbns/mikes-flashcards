import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import type {Deck, Card} from './types';
import {fileURLToPath} from 'url';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json' with {type: 'json'};
import DataManager from './services/DataManager.ts';
import { ApiManager } from './services/ApiManager.ts';
import dataLoader from './middleware/dataLoader.ts';
import {isValidItem} from './lib/validateData.ts';
import http from 'http';
// Route Handlers
import {cardsRoute,   decksRoute, indexRoute} from './router/handlers.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

app.set('views', path.join(__dirname ,'../frontend/views/ejs'));
app.set('view engine', 'ejs');

const httpServer = http.createServer(app);
// Implements /services/DataManager 
app.use(dataLoader);



// Use express.js services
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../frontend/public')))
app.use('/views',express.static(path.join(__dirname, '../frontend/views')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



// Swagger service
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


/** Route Handlers */
// app.get('/', (req, res) => {
// //   res.send(JSON.stringify(data));
//     res.render('index', { title: "Mike's FlashDecks"});
// });

// Configure Routes
app.use('/', indexRoute);
app.use('/', cardsRoute);
app.use('/', decksRoute);

httpServer.listen(port, () => {
  console.log(`Mike's FlashDecks listening at  http://localhost:${port}`)
})