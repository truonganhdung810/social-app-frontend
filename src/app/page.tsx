// app/page.jsx

// Gọi API từ server
async function getData() {
  const res = await fetch('http://localhost:3000/api/auth/verify')

  if (!res.ok) {
    throw new Error('Lỗi khi gọi API')
  }

  return res
}

export default async function HomePage() {
  const data = await getData()
  console.log('day la data: ' + data)
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}
