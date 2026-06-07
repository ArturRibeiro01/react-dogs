import { describe, expect, it } from 'vitest';

import { createUserSchema, loginSchema, passwordResetSchema, photoPostSchema } from './forms';

describe('form schemas', () => {
  it('validates login required fields', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: '',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues).toHaveLength(2);
  });

  it('accepts a valid create user payload', () => {
    const result = createUserSchema.safeParse({
      username: 'demo',
      email: 'demo@dogs.local',
      password: 'Demo1234',
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid email and weak password', () => {
    const result = createUserSchema.safeParse({
      username: 'demo',
      email: 'demo',
      password: '123',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.path[0])).toEqual(['email', 'password']);
  });

  it('validates password reset strength', () => {
    expect(passwordResetSchema.safeParse({ password: 'demo1234' }).success).toBe(false);
    expect(passwordResetSchema.safeParse({ password: 'Demo1234' }).success).toBe(true);
  });

  it('requires numeric values for photo fields', () => {
    const result = photoPostSchema.safeParse({
      nome: 'Nina',
      peso: 'leve',
      idade: 'dois',
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.path[0])).toEqual(['peso', 'idade']);
  });
});
