"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var verifyToken = function (req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Access denied' });
        return false;
    }
    try {
        var token = req.headers.authorization.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRECT);
        next();
    }
    catch (error) {
        res.status(401);
        res.json('Access denied');
        return;
    }
};
exports.verifyToken = verifyToken;
