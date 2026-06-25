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

export { LoginSchema }