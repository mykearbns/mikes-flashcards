import express from 'express';
export const router = express.Router();

router.stack.forEach((middleware) => {
    if (middleware.route) {
        // A route middleware
        console.log(`Route: ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
        // A router middleware
        console.log(`Router: ${middleware.regexp}`);
    }
});
