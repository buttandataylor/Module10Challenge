"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware to serve static files in production
if (process.env.NODE_ENV === 'production') {
    const distPath = path_1.default.join(__dirname, 'dist');
    app.use(express_1.default.static(distPath));
    // Serve index.html for all routes in production
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(distPath, 'index.html'));
    });
}
else {
    app.get('/', (req, res) => {
        res.send('Development server is running!');
    });
}
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
