import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalPayment = ({ monto }: { monto: string | number }) => {
    return (
        <PayPalScriptProvider options={{ clientId: "ASja7LRw7BXfSZN3adhaFtcKaTTKR-eEjxDUT3dMO7aJKGtYAaQPGL5Obm_H58N1kjFZnblabvbPT6PX" }}>
            <PayPalButtons
                style={{ layout: 'vertical' }} // Estilo del botón
                createOrder={(data, actions) => {
                    if (!actions || !actions.order) {
                        throw new Error('Error en el procesamiento de PayPal');
                    }
                    return actions.order.create({
                        intent: "CAPTURE", // Intención de la orden
                        purchase_units: [{
                            amount: { currency_code: "USD", value: `${monto}` }
                        }]
                    });
                }}
                onApprove={(data, actions) => {
                    if (!actions || !actions.order) {
                        throw new Error('Error en la captura de la orden de PayPal');
                    }
                    return actions.order.capture().then(details => {
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
