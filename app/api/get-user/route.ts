import { getUser } from '@/services/cognito/cognito';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { message: 'Access token is missing' },
        { status: 401 }
      );
    }
    const response = await getUser(token);

    return NextResponse.json(response.UserAttributes, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: (error as Error).message || 'get user failed' },
      { status: 400 }
    );
  }
}
