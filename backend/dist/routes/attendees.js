"use strict";
// backend/src/routes/attendees.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db/db")); // Make sure this is the correct path to your db client
const router = express_1.default.Router();
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, venmo, phone } = req.body;
    try {
        const query = 'INSERT INTO attendees (event_id, name, email, venmo_handle, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [1, name, email, venmo, phone]; // Hardcoded event_id = 1
        const result = yield db_1.default.query(query, values);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error('Error inserting attendee', err.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
