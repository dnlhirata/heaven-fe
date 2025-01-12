"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react'

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) return;

    console.log(process.env.NEXT_PUBLIC_API_URL)


    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api-token-auth/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });

    if (response.ok) {
      router.push('/book');
    } else {
      alert('Invalid username or password');
    }

  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full flex gap-4 justify-center items-center flex-col">
          <input className="rounded text-black" type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)}/>
          <input className="rounded text-black" type="text" placeholder="password" onChange={(event) => setPassword(event.target.value)} />
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </main>
    </div>
  );
}
