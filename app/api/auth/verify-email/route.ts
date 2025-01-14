import { confirmUser } from '@/services/cognito/cognito';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email: string; code: string };
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { message: 'Email and confirmation code are required' },
        { status: 400 },
      );
    }

    await confirmUser(email, code);

    return NextResponse.json({ message: 'User verified successfully' }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: (error as Error).message || 'User Verification failed' },
      { status: 400 },
    );
  }
}
