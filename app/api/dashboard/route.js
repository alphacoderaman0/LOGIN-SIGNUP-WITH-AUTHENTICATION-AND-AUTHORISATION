import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient();

const JWT_SECRET = process.env.SECRET_KEY;
export async function GET(req) {
  const token = req.headers.get('Authorization')?.split(' ')[1];
  
  const { userId } = jwt.verify(token, JWT_SECRET);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
