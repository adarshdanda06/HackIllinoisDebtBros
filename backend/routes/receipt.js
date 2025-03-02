const express = require('express')
const axios = require('axios')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const requireAuth = require('../middleware/requireAuth')

require('dotenv').config()

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Load Google Gemini API key from .env file
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

function imageToBase64(filePath) {
    return fs.readFileSync(filePath, { encoding: "base64" });
}

const vision_pro = async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("No file uploaded.");
        const allowedTypes = ["image/jpeg", "image/png", "image/heic", "image/heif"];
        if (!allowedTypes.includes(req.file.mimetype)) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: "Invalid file type", message: "Upload a JPEG, PNG, or HEIC file." });
        }

        let filePath = req.file.path;

        // Convert HEIC/HEIF to JPEG if necessary
        if (req.file.mimetype.includes("heic") || req.file.mimetype.includes("heif")) {
            filePath = await convertToJpeg(filePath);
        }
        const imageBase64 = imageToBase64(filePath);
        fs.unlinkSync(filePath); // Cleanup after encoding

        const payload = {
            contents: [
                {
                    parts: [
                        { inlineData: { mimeType: "image/jpeg", data: imageBase64 } },
                        { text: "Extract all items, their prices, taxes, and the total cost from this receipt. Return JSON formatted as {items: {name: price}, tax: value, total: value}." }
                    ]
                }
            ]
        };
        console.log("Before Erorr");


        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${GEMINI_API_KEY}`,  // Updated model name
            payload
        );

        console.log("After Error");


        if (!response.data || !response.data.candidates) {
            throw new Error("Invalid response from Gemini API");
        }

        const textContent = response.data.candidates[0]?.content?.parts?.[0]?.text || "";

        // Try parsing JSON
        let parsedData;
        try {
            parsedData = JSON.parse(textContent);
        } catch {
            console.warn("Parsing error - raw response:", textContent);
            parsedData = { error: "Failed to parse receipt data", rawText: textContent };
        }

        // Log extracted receipt data in the terminal
        console.log("Extracted Receipt Data:", JSON.stringify(parsedData, null, 2));

        // Send minimal response to frontend
        res.json({ success: true });

    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        console.error("Processing Error:", error.message);
        res.status(error.status).json({ error: "Error processing receipt", message: error });
    }
}

const router = express.Router()

router.use(requireAuth)

router.post('/', upload.single("receipt"), vision_pro);

module.exports = router