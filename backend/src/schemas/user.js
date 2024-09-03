import z from 'zod';

const userSchema = z.object({
    name: z.string({
        invalid_type_error: 'El nombre debe ser un texto',
        required_error: 'El nombre es requerido'
    }),
    email: z.string({
        invalid_type_error: 'El correo debe ser un texto',
        required_error: 'El correo es requerido'
    }),
    password: z.string({
        invalid_type_error: 'La clave debe ser un texto',
        required_error: 'La clave es requerida'
    }),
    role_id: z.number({
        invalid_type_error: 'El rol debe ser un número',
        required_error: 'El rol es requerido'
    }),
    phone: z.number({
        invalid_type_error: 'El teléfono debe ser un número',
        required_error: 'El teléfono es requerido'
    }),
});

export function validateUser(user) {
    return userSchema.safeParse(user);
}

export function validatePartialUser(user) {
    return userSchema.partial().safeParse(user);
}