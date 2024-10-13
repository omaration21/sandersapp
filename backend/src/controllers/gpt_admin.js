import { GptAdminModel } from '../models/mysql/gpt_admin.js';
import OpenAi from "openai";
import dotenv from 'dotenv';

import { systemPrompt } from '../utils/SystemPromt.js';
import { extractQuery } from '../utils/extractQuery.js';

dotenv.config();

const client = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY
});

export class GptAdminController {
    static async proccessQuestion(req, res) {
        const { question } = req.body;

        console.log('Question:', question);

        try {
            const completion = await client.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: question }
                ]
            });

            const answer = completion.choices[0].message.content;
            console.log('Answer:', answer);

            const matchQuery = extractQuery(answer);

            if (!matchQuery) {
                console.log('No matching query found.');
                return res.status(200).json({ message: answer });
            }

            console.log('Match:', matchQuery[0]);

            const [results] = await GptAdminModel.processQuery(matchQuery[0]);

            const resultsString = JSON.stringify(results, null, 2);

            const contentInterpretation = `Ahora que se ha ejecutado el procedimiento, interpreta la respuesta brevemente, de acuerdo a la pregunta: ${question}`;

            const completionInterpretation = await client.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: contentInterpretation },
                    { role: 'user', content: resultsString }
                ]
            });

            const interpretation = completionInterpretation.choices[0].message.content;
            return res.status(200).json({ interpretation });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Error del servidor interno' });
        } finally {
            console.log('Fin del proceso');
        }
    }
}