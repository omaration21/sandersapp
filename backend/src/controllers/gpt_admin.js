import { GptAdminModel } from '../models/mysql/gpt_admin.js';
import OpenAi from "openai";
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY
});

export class GptAdminController {
    static async proccessQuestion(req, res) {
        const { question } = req.body;

        const systemPromt = `Eres un asistente que determina qué procedimiento almacenado ejecutar y con qué parámetros.
        Si un parámetro no está en la pregunta, usa NULL.
        Procedimiento: sp_get_donations(p_start_date, p_end_date, p_donor_name, p_sector_id).
        Ejemplo: Pregunta: "¿Cuáles fueron las donaciones de enero de 2024?" 
        Respuesta: sp_get_donations('2024-01-01', '2024-01-31', NULL, NULL)`

        try {
            const completion = await client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: systemPromt
                    },
                    {
                        role: "user",
                        content: question
                    }
                ]
            })

            const answer = completion.data.choices[0].message;
            const matchQuery = answer.match(/sp_get_donations\((.*)\)/);
            console.log('Answer:', answer);
            console.log('Match:', matchQuery);

            const [results] = await GptAdminModel.processQuery(matchQuery);

            // const completionInterpretation = await client.chat.completions.create({
            //     model: "gpt-4o-mini",
            //     messages: [
            //         {
            //             role: "system",
            //             content: 'Ahora que se ha ejecutado el procedimeinto interpreta la respuesta, de acuerdo a la pregunta anterior'
            //         },
            //         {
            //             role: "user",
            //             content: results
            //         }
            //     ]
            // });

            // const interpretation = completionInterpretation.data.choices[0].message;

            return res.status(200).json({ answer, results/*, interpretation */});
        }
        catch (error) 
        {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Error del servidor interno' });
        }
    }
}