import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Cookies from 'js-cookie';

interface PayPalDetails {
    payer?: {
        email_address?: string;
        name?: {
            given_name?: string;
        };
    };
    [key: string]: any;
}

interface PayPalPaymentProps {
    monto: string | number;
    sector: string; // Agregado: sector seleccionado
    comentario: string; // Agregado: comentario de la donación
    donorId?: number;
}

const PayPalPayment: React.FC<PayPalPaymentProps> = ({ monto, sector, comentario, donorId }) => {
    console.log("Monto en PayPalPayment:", monto);
    console.log("Sector en PayPalPayment:", sector);
    console.log("Comentario en PayPalPayment:", comentario); // Para verificar que el comentario se está pasando correctamente

    // Mapa para convertir el sector en su respectivo ID en la base de datos
    const sectorIds: { [key: string]: number } = {
        agua: 1,
        alimentacion: 2,
        educacion_sexual: 3
    };

    return (
        <PayPalScriptProvider options={{ clientId: "ASja7LRw7BXfSZN3adhaFtcKaTTKR-eEjxDUT3dMO7aJKGtYAaQPGL5Obm_H58N1kjFZnblabvbPT6PX" }}>
            {/* Añadimos una clave para recrear el botón de PayPal cada vez que el monto cambie */}
            <PayPalButtons
                key={monto} // Esta clave asegura que PayPalButtons se vuelva a renderizar con el nuevo monto
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => {
                    if (!actions || !actions.order) {
                        throw new Error('Error en el procesamiento de PayPal');
                    }

                    const formattedMonto = parseFloat(`${monto}`).toFixed(2);
                    console.log("Monto en createOrder:", formattedMonto);

                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                            amount: { currency_code: "USD", value: formattedMonto }
                        }]
                    });
                }}
                onApprove={(data, actions) => {
                    if (!actions || !actions.order) {
                        throw new Error('Error en la captura de la orden de PayPal');
                    }
                    return actions.order.capture().then((details: PayPalDetails) => {
                        const donorEmail = details.payer?.email_address || 'anon@test.com';

                        const donationData = {
                            amount: parseFloat(`${monto}`),
                            donor_email: donorEmail,
                            type_id: 2,
                            comment: comentario, // Agregado: enviar el comentario
                            sector_id: sectorIds[sector], // Enviar el ID del sector seleccionado
                            donor_id: donorId || null,
                        };

                        const endpoint = donorId
                            ? 'https://localhost:5001/donations/registerDonation'
                            : 'https://localhost:5001/donations/anonymous-donation';

                        // Obtener el token desde las cookies
                        const token = Cookies.get('token');

                        console.log("Token encontrado:", token);
                        console.log("Datos de la donación que se envían:", donationData);

                        fetch(endpoint, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                ...(donorId && token ? { 'Authorization': `Bearer ${token}` } : {}),
                            },
                            body: JSON.stringify(donationData),
                        })
                            .then(async response => {
                                console.log("Estado de la respuesta:", response.status);
                                if (!response.ok) {
                                    const errorText = await response.text();
                                    console.error('Error en la respuesta del servidor:', errorText);
                                    throw new Error(`Error al registrar la donación: ${errorText}`);
                                }
                                return response.json();
                            })
                            .then(data => {
                                console.log('Donación registrada exitosamente:', data);
                                alert('Donación registrada exitosamente');
                            })
                            .catch((error: any) => {
                                console.error('Error registrando la donación:', error);
                                alert(`Hubo un problema registrando tu donación. Detalle: ${error.message}`);
                            });

                        if (details.payer && details.payer.name) {
                            alert('Pago completado por ' + details.payer.name.given_name);
                        } else {
                            alert('Pago completado');
                        }
                    });
                }}
                onError={(err) => {
                    console.error('Error con PayPal:', err);
                    alert('Hubo un problema con el pago, intenta de nuevo.');
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalPayment;
