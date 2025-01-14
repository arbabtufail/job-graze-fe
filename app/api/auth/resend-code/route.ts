import { resendConfirmationCode } from '@/services/cognito/cognito';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email: string };
    const { email } = body;

    const response = await resendConfirmationCode(email);
    return NextResponse.json(
      { message: 'resend code successful', data: response },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: (error as Error).message || 'resend code failed' },
      { status: 400 },
    );
  }
}
