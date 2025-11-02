import { z } from 'zod';

/**
 * Calcula idade a partir de uma data de nascimento
 */
export function ageFromDate(birthdate: string): number {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Valida se usuário tem 18 anos ou mais
 */
export function isAdult(birthdate: string): boolean {
  return ageFromDate(birthdate) >= 18;
}

/**
 * Schema de validação para username
 */
export const usernameSchema = z
  .string()
  .min(3, 'Username deve ter no mínimo 3 caracteres')
  .max(20, 'Username deve ter no máximo 20 caracteres')
  .regex(
    /^[a-z0-9._]+$/,
    'Username pode conter apenas letras minúsculas, números, ponto e underscore'
  );

/**
 * Schema de validação para email
 */
export const emailSchema = z
  .string()
  .email('Email inválido')
  .min(1, 'Email é obrigatório');

/**
 * Schema de validação para senha
 */
export const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter no mínimo 8 caracteres');

/**
 * Schema de validação para data de nascimento
 */
export const birthdateSchema = z
  .string()
  .refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, 'Data inválida')
  .refine((date) => isAdult(date), 'Você deve ter 18 anos ou mais');

/**
 * Schema completo de registro
 */
export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  birthdate: birthdateSchema,
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: 'Você deve aceitar os termos de uso',
  }),
});

/**
 * Schema de login
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Valida seleção de likes (mínimo 3)
 */
export function validateLikes(likes: string[]): boolean {
  return likes.length >= 3;
}