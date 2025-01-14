import { loginUser } from '@/services/cognito/cognito';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email: string; password: string };
    const { email, password } = body;
    const tokens = await loginUser(email, password);

    return NextResponse.json(tokens.AuthenticationResult, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: (error as Error).message || 'Login failed' },
      { status: 400 }
    );
  }
}
