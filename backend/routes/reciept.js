const express = require('express')
const axios = require('axios')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const requireAuth = require('../middleware/requireAuth')
const googleGenerativeAI = require("@google/generative-ai");

require('dotenv').config()

// Load Google Gemini API key from .env file
const GEMINI_API_KEY = 'AIzaSyBE_yPqwFWkHRrGLDZNRAB5o4YFE6V1Dus';
//process.env.GEMINI_API_KEY;


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Initialize the Google Generative AI with API key
  const genAI = new googleGenerativeAI.GoogleGenerativeAI(GEMINI_API_KEY);
  
  // Converts local file to generative part format
  function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    };
  }
  
  const vision_pro = async (req, res) => {
      try {
          // Multer handles the file upload and makes it available as req.file
          if (!req.file) return res.status(400).send("No file uploaded.");
          
          const allowedTypes = ["image/jpeg", "image/png", "image/heic", "image/heif"];
          if (!allowedTypes.includes(req.file.mimetype)) {
              fs.unlinkSync(req.file.path);
              return res.status(400).json({ 
                  error: "Invalid file type", 
                  message: "Upload a JPEG, PNG, or HEIC file." 
              });
          }
  
          let filePath = req.file.path;
  
          // Convert HEIC/HEIF to JPEG if necessary
          if (req.file.mimetype.includes("heic") || req.file.mimetype.includes("heif")) {
              filePath = await convertToJpeg(filePath);
          }
  
          // Initialize the model
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
          
          // Create the prompt and image part
          const prompt = `Extract all items, their prices, taxes, and the total cost from this receipt. Return JSON formatted as {items: {name: price}, tax: value, total: value}.
          Make sure that I can parse this with JSON.parse(). Do not wrap the output in with markdown and JSON.
          `;
          const imagePart = fileToGenerativePart(filePath, "image/jpeg");
          
          // Generate content
          const generatedContent = await model.generateContent([prompt, imagePart]);
          const textContent = generatedContent.response.text();
          const cleanedString = textContent
            .replace(/```json\s*/g, '') // Remove opening ```json
            .replace(/```\s*$/g, '')    // Remove closing ```
            .trim();

          console.log(cleanedString);
          // Clean up the file after processing
          fs.unlinkSync(filePath);
          // Try parsing JSON
          let parsedData;
          try {
              parsedData = JSON.parse(cleanedString);
          } catch (error) {
              console.warn("Parsing error - raw response:", cleanedString);
              parsedData = { 
                  error: "Failed to parse receipt data", 
                  rawText: cleanedString
              };
          }
          // Log extracted receipt data in the terminal
          console.log("Extracted Receipt Data:", JSON.stringify(parsedData, null, 2));
  
          // Send response to frontend
          res.json({ 
              success: true, 
              data: parsedData,
              finalBatch: JSON.stringify(parsedData.rawText)
          });
  
      } catch (error) {
          if (req.file && fs.existsSync(req.file.path)) {
              fs.unlinkSync(req.file.path);
          }
          console.error("Processing Error:", error);
          res.status(error.status || 500).json({ 
              error: "Error processing receipt", 
              message: error.message 
          });
      }
  }


const router = express.Router()

router.use(requireAuth)

router.post('/receipt', upload.single("receipt"), vision_pro);

module.exports = router;