import { changePassword } from '@/services/cognito/cognito';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // const token = req.headers.get('Authorization')?.replace('Bearer ', '');

    // if (!token) {
    //   return NextResponse.json(
    //     { message: 'Access token is missing' },
    //     { status: 401 }
    //   );
    // }
    const body = (await req.json()) as {
      email: string;
      password: string;
    };
    const { email, password } = body;
    const response = await changePassword(email, password);

    return NextResponse.json({ message: response }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: (error as Error).message || 'password change failed' },
      { status: 400 }
    );
  }
}
