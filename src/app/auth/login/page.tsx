"use client";

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/app/action/auth.action';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async()=>{
        setError('');
        try {
            const res = await loginAction(email, password);

            if (res instanceof Error) {
                setError(res.message);
                return;
            }
            
            const { role } = res;
            router.push(role === 'admin' ? "/admin" : '/owner')

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
            <div className='space-y-4'>
                <Input
                placeholder='Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                {error && <Alert variant={"destructive"}>{error}</Alert>}
                <Button 
                 type='button' 
                 className='w-full'
                 onClick={handleSubmit}
                 >Login</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
