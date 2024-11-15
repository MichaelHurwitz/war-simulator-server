"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const webSocket_1 = require("./sockets/webSocket");
const errorHandler_1 = require("./middleware/errorHandler");
const db_1 = __importDefault(require("./data/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const combatRoutes_1 = __importDefault(require("./routes/combatRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
(0, db_1.default)();
const server = http_1.default.createServer(app);
(0, webSocket_1.setupWebSocket)(server);
app.use("/api/users", userRoutes_1.default);
app.use('api/combat', combatRoutes_1.default);
app.use(errorHandler_1.errorHandler);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
