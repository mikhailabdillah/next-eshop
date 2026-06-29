import * as v from 'valibot'

const LoginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.trim(),
    v.email(),
    v.minLength(1, 'Email is required')
),
  password: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, 'Password is required')
)
});

const SignUpSchema = v.pipe(v.object({
  username: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, 'This field is required')
  ),
  email: v.pipe(
    v.string(),
    v.trim(),
    v.email(),
    v.minLength(1, 'Email is required')
),
  password: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(8, 'Password must be at least 8 characters long'),
    v.regex(/[a-z]/, 'Password must contain at least one lowercase letter'),
    v.regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
    v.regex(/[0-9]/, 'Password must contain at least one number'),
    v.regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
),
  confirmPassword: v.string()
}),
v.forward(
  v.partialCheck(
  [['password'], ['confirmPassword']],
  (input) => input.password === input.confirmPassword,
  'Passwords do not match'
),
 ['confirmPassword']
)
)

export type LoginInput = v.InferInput<typeof LoginSchema>
export type SignUpInput = v.InferInput<typeof SignUpSchema>

export { LoginSchema, SignUpSchema }