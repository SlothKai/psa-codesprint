const axios = require('axios');
const express = require('express');
const router = express.Router();
const OpenAI = require('openai-api');

const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
});