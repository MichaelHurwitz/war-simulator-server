"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketInstance = exports.setupWebSocket = void 0;
const socket_io_1 = require("socket.io");
let io = null;
const setupWebSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);
        socket.on("join_room", (region) => {
            socket.join(region);
            console.log(`Client ${socket.id} joined region ${region}`);
            socket.to(region).emit("notification", `A new player has joined ${region}`);
        });
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
    console.log("Socket.IO initialized");
};
exports.setupWebSocket = setupWebSocket;
const getSocketInstance = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized");
    }
    return io;
};
exports.getSocketInstance = getSocketInstance;
