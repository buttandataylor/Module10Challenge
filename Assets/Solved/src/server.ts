import express, { Application, Request, Response } from 'express';
import path from 'path';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files in production
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));

    // Serve index.html for all routes in production
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
    });
} else {
    app.get('/', (req: Request, res: Response) => {
        res.send('Development server is running!');
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
