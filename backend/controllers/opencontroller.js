import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Use the API key from environment variables
});

module.exports.firstResponse = async (req, res) => {
    const { jobDescription } = req.body;

    if (!jobDescription) {
        return res.status(400).json({ error: 'Job description is required' });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: `Generate questions based on the following job description: \n${jobDescription}`
                },
            ],
        });

        return res.status(200).json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error("Error generating questions:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
