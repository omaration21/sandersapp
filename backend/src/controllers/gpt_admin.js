import { GptAdminModel } from '../models/mysql/gpt_admin.js';
import OpenAi from "openai";
import dotenv from 'dotenv';
import { MailModel } from '../models/mail/mail.js';
import { systemPrompt } from '../utils/SystemPromt.js';
import { extractQuery } from '../utils/extractQuery.js';
import { getInterpretationPrompt } from '../utils/InterpretationPromt.js';

dotenv.config();

const client = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY
});

export class GptAdminController {
    static async proccessQuestion(req, res) {
        const { question } = req.body;

        console.log('Question:', question);

        try {
            // Genera la respuesta inicial con GPT
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

            // La idea es que la mayoría de las preguntas tengan un procedimiento almacenado asociado
            if (!matchQuery) {
                console.log('No matching query found.');
                return res.status(200).json({ message: answer });
            }

            console.log('Match:', matchQuery[0]);

            // Ejecuta el procedimiento almacenado
            const [results] = await GptAdminModel.processQuery(matchQuery[0]);

            const resultsString = JSON.stringify(results, null, 2);

            const interpretationPromt = getInterpretationPrompt(question);

            //console.log('Interpretation Prompt:', interpretationPromt);
            console.log('Results:', resultsString);

            const completionInterpretation = await client.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: interpretationPromt },
                    { role: 'user', content: resultsString }
                ]
            });

            const interpretation = completionInterpretation.choices[0].message.content;
            //console.log('Interpretation:', interpretation);

            // Verifica si la pregunta implica enviar un correo
            const isMailRequest = await GptAdminController.isMailRelated(question);

            if (isMailRequest) {
                //console.log('Mail request detected.');
                const UsersJSON = JSON.parse(interpretation);
                // Envía correos si se detecta una solicitud de correo
                const sendMailSuccesfully = await GptAdminController.sendThankYouEmails(UsersJSON);

                if (!sendMailSuccesfully) {
                    return res.status(500).json({ message: 'Error al enviar correos' });
                }

                return res.status(200).json({ message: 'Correos enviados exitosamente.' });
                
            }

            return res.status(200).json({ message: interpretation });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Error del servidor interno' });
        } finally {
            console.log('Fin del proceso');
        }
    }

    // Método para detectar si la pregunta implica enviar correos
    static async isMailRelated(question) {
        console.log('Checking if mail related:', question);
        const prompt = `
        Encargate de determinar si las preguntas tienen que ver con el envió de correos electronicos.
        Responde solo con "yes" o "no".
        `;

        const completion = await client.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: prompt },
                { role: 'user', content: question }
            ]
        });

        //console.log('Mail related:', completion.choices[0].message.content);

        const response = completion.choices[0].message.content.trim().toLowerCase();
        return response === 'yes';
    }

    // Método para enviar correos a los mayores donantes
    static async sendThankYouEmails(donors) {
        for (const donor of donors) {
            const { email, donor_name, total_donations, total_amount } = donor;

            const subject = '¡Gracias por tu generosa donación!';
            const text = `
                Estimado/a ${donor_name},
                Muchas gracias por tus ${total_donations} contribuciones que suman un total de $${total_amount}.
                Tu apoyo es esencial para continuar con nuestra misión.
            `;

            try {
                await MailModel.sendMail(email, subject, text);
                console.log(`Correo enviado a ${email}`);
            } catch (error) {
                console.error(`Error al enviar correo a ${email}:`, error);
                return false;
            }
        }
        return true;
    }
}