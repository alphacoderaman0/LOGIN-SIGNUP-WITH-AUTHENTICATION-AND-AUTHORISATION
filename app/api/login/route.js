import { PrismaClient } from '@prisma/client';
import { verifyPassword } from '../../lib/auth';
import { signToken } from '../../lib/jwt';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const prisma = new PrismaClient();
// Zod Login Schema
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
// Validating Data if email and password matched
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const token = signToken(user);
    const response = NextResponse.json({message: 'User Logged in successfully',token}, { status: 200 });
    response.cookies.set('token',token)
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
