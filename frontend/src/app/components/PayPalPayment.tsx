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
    donorId?: number;
    onSuccess: () => void;
}

const PayPalPayment: React.FC<PayPalPaymentProps> = ({ monto, donorId, onSuccess }) => {
    return (
        <PayPalScriptProvider options={{ clientId: "ASja7LRw7BXfSZN3adhaFtcKaTTKR-eEjxDUT3dMO7aJKGtYAaQPGL5Obm_H58N1kjFZnblabvbPT6PX" }}>
            <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => {
                    if (!actions || !actions.order) {
                        throw new Error('Error en el procesamiento de PayPal');
                    }

                    const formattedMonto = parseFloat(`${monto}`).toFixed(2);

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
                        const comment = 'Donación realizada a través de PayPal';

                        const donationData = {
                            amount: parseFloat(`${monto}`),
                            donor_email: donorEmail,
                            type_id: 2,
                            comment,
                            sector_id: 1,
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
                                onSuccess(); // Llamar la función de éxito
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
