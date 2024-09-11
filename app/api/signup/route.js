import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../lib/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const prisma = new PrismaClient();
// Zod Signup Schema
const signupSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
// Data POST functionality
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = signupSchema.parse(body);
    
    const existingUser = await prisma.user.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
      }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return NextResponse.json({message: 'User created successfully',newUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
