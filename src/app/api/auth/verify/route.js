// app/api/auth/verify/route.js
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const cookies = request.cookies.getAll()
  const token = request.cookies.get('token')?.value || 'No Token Found'

  if (token === 'No Token Found') {
    console.log(token)
    const response = NextResponse.redirect('http://localhost:3000/login')
    return response
  } else {
    return NextResponse.json(token)
  }
}
