"use strict";
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
// Get all attendees
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM attendees');
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error fetching attendees', err.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Add a new attendee
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("add new Attendee:", req.body);
    const { name, email, venmo, phone, photoURL } = req.body;
    if (!name || !email || !venmo || !phone || !photoURL) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const query = 'INSERT INTO attendees (event_id, name, email, venmo_handle, phone_number, photo_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [1, name, email, venmo, phone, photoURL]; // Hardcoded event_id = 1
        const result = yield db_1.default.query(query, values);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error('Error inserting attendee', err.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// DELETE attendee by id
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM attendees WHERE id = $1 RETURNING *';
        const values = [id];
        const result = yield db_1.default.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Attendee not found' });
        }
        res.status(200).json({ message: 'Attendee deleted', attendee: result.rows[0] });
    }
    catch (err) {
        console.error('Error deleting attendee', err.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
