import { updateUser } from '@/services/cognito/cognito';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { message: 'Access token is missing' },
        { status: 401 }
      );
    }
    const body = (await req.json()) as {
      email: string;
      firstName: string;
      lastName: string;
      bio: string;
      phone: string;
    };
    const { email, firstName, lastName, bio, phone } = body;

    const code = await updateUser(
      email,
      firstName,
      lastName,
      bio,
      phone,
      token
    );

    return NextResponse.json(code, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: (error as Error).message || 'update user failed' },
      { status: 400 }
    );
  }
}
