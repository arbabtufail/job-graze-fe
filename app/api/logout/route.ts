import { logoutUser } from '@/services/cognito/cognito';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { message: 'Access token is missing' },
        { status: 401 }
      );
    }
    const response = await logoutUser(token);

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.log('error', error);
    return NextResponse.json(
      { message: (error as Error).message || 'get user failed' },
      { status: 400 }
    );
  }
}
