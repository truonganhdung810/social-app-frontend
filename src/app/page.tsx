// app/page.tsx
// Nhập layout.tsx để sử dụng layout trong trang này
'use client'
import { useState, useRef, useEffect } from 'react'
import GetAllUsers from '../components/GetAllUsers'
import TopNavigation from '../components/TopNavigation'

export default function Home() {
  return (
    <div>
      <TopNavigation />
      <GetAllUsers />
    </div>
  )
}
