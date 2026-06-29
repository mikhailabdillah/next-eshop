'use server';

import * as v from 'valibot';
import { SignUpInput, SignUpSchema } from '@/types/validation';
import client from '@/lib/db';
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerUser({ username, email, password, confirmPassword }: SignUpInput) {

  // Use safeParseAsync because form parsing may scale to include DB checks
  const result = await v.safeParseAsync(SignUpSchema, { username, email, password, confirmPassword });

  // If validation fails, flatten the issues and return them
  if (!result.success) {
    const flatErrors = v.flatten<typeof SignUpSchema>(result.issues).nested;
    return {
      success: false,
      message: 'Validation failed.',
      errors: flatErrors,
    };
  }

  // Data is now completely verified and type-safe
  const validatedData = result.output;

  try {

    const db = client.db();

    // Check if user already exists (from either Google or a past signup)
    const existingUser = await db.collection("users").findOne({ email: validatedData.email });
    if (existingUser) {
      return {
        success: false,
        message: "Email is already in use",
        errors: {
          email: ["Email is already in use"]
        }
      }
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Generate a unique random verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Insert user manually into the adapter's collection
    await db.collection("users").insertOne({
      name: validatedData.username,
      email: validatedData.email,
      password: hashedPassword,
      emailVerified: null, 
      verificationToken, // Store token directly on user document for simplicity
    });

    // Construct verification link
    const origin = process.env.NEXT_PUBLIC_SITE_URL || '';
    const verifyUrl = `${origin}/api/verify-email?token=${verificationToken}`;

    const verificationLink = await resend.emails.send({
      from: 'Cloth Store <hello@mikhail-abdillah.com>',
      to: validatedData.email,
      bcc: ['hello@mikhail-abdillah.com'],
      subject: 'Verify your email address',
      html: `<a href="${verifyUrl}">Click here to verify your email</a>`,
    });

    if (verificationLink.error) {
      // Remove the created user data if verification email failed
      await db.collection("users").deleteOne({ email: validatedData.email });
      return {
        success: false,
        message: 'Verification email could not be sent. Please try again.',
      };
    }

    return {
      success: true,
      message: `Successfully registered ${validatedData.username}! Check your email ${validatedData.email} for verification.`,
    };
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'A database error occurred. Please try again.',
    };
  }
}