"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { FaApple, FaGoogle } from "react-icons/fa";
import Image from 'next/image';



export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
const [showPassword, setShowPassword] = useState(false);
const DUMMY_USER = { email: 'user@example.com', password: 'password123' }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const registeredRaw = localStorage.getItem('registeredUser')
    const registered = registeredRaw ? JSON.parse(registeredRaw) : null

    const user = registered || DUMMY_USER

    if (email === user.email && password === user.password) {
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/dashboard')
      return
    }

    setError('Invalid credentials. Use user@example.com / password123 or sign up.')
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="gradient-border p-8 rounded-xl">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center">
              <Image src="/assets/nevuplogo.png" alt="Logo" width={35} height={35} />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Log in to your account</h1>
            <p className="text-muted-foreground text-sm">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password*</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="bg-input border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Remember for 30 days
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password
              </Link>
            </div>

            {error && (
              <div className="text-sm text-red-500 text-center">
                {error}
              </div>
            )}
        
            <Button type="submit" className="w-full bg-linear-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90">
              Sign in
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="bg-card border-border hover:bg-sidebar-accent">
                <FaApple className="w-5 h-5 mr-2" />
              </Button>
              <Button variant="outline" className="bg-card border-border hover:bg-sidebar-accent">
                <FaGoogle className="w-5 h-5 mr-2" />
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-foreground hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
