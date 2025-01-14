import { confirmForgotPassword } from '@/services/cognito/cognito';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email: string;
      code: string;
      password: string;
    };
    const { email, code, password } = body;
    const response = await confirmForgotPassword(email, code, password);

    return NextResponse.json(
      { message: 'password reset successful' },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: (error as Error).message || 'password reset failed' },
      { status: 400 }
    );
  }
}
