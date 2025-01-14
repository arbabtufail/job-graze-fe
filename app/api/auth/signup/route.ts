import { signUpUser } from '@/services/cognito/cognito';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    };
    const { email, password, firstName, lastName } = body;

    const response = await signUpUser(email, password, firstName, lastName);
    return NextResponse.json(
      { message: 'Signup successful', data: response },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: (error as Error).message || 'Signup failed' },
      { status: 400 }
    );
  }
}
