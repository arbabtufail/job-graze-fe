import { forgetPassword } from '@/services/cognito/cognito';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email: string };
    const { email } = body;
    const response = await forgetPassword(email);

    return NextResponse.json(
      { message: 'forget password successful', response },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: (error as Error).message || 'forget password failed' },
      { status: 400 }
    );
  }
}
