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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db/db"));
const attendees_1 = __importDefault(require("./routes/attendees")); // Import the attendees route
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/events', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM events');
        res.status(200).json(result.rows);
    }
    catch (error) {
        const err = error;
        console.error('Error fetching events', err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/attendees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM attendees');
        res.status(200).json(result.rows);
    }
    catch (error) {
        const err = error;
        console.error('Error fetching attendees', err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.post('/attendees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, venmo, phone } = req.body;
    const eventId = 1; // Assuming event_id is 1 as you mentioned
    if (!name || !email || !venmo || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const result = yield db_1.default.query('INSERT INTO attendees (event_id, name, email, venmo_handle, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *', [eventId, name, email, venmo, phone]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        const err = error;
        console.error('Error inserting attendee', err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.use('/attendees', attendees_1.default); // Use the attendees route
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
