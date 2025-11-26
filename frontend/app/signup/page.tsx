"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Calendar } from "lucide-react"
import { FaApple, FaGoogle } from "react-icons/fa"
import Image from "next/image"

export default function SignupPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [dob, setDob] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!username || !email || !dob || !password || !confirm) {
      setError("Please fill all required fields")
      return
    }

    if (password !== confirm) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          dateofbrith: dob,
          password,
        }),
      })

      if (!res.ok) {
        // try to parse error message
        let message = "Signup failed"
        try {
          const data = await res.json()
          message = data?.message || data?.error || message
        } catch {
          try {
            message = await res.text()
          } catch {}
        }
        setError(message || `Request failed with status ${res.status}`)
        return
      }

      // success
      router.push("/login")
    } catch (err: any) {
      setError(err?.message || "Network error. Please try again.")
    } finally {
      setLoading(false)
    }
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
            <h1 className="text-2xl font-bold mb-2">Sign Up to your account</h1>
            <p className="text-muted-foreground text-sm">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="username">Username*</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="John"
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">DOB*</Label>
                <div className="relative">
                  <Input
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    type="text"
                    placeholder="01/01/2001"
                    className="bg-input border-border pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address*</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password*</Label>
              <div className="relative">
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="bg-input border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">At least 8 characters, with numbers and symbols.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password*</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="bg-input border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                Remember this device
              </label>
            </div>

            {error && (
              <div className="text-sm text-red-500 text-center">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full bg-linear-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "Creating..." : "Create account"}
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
              Don't have an account?{' '}
              <Link href="/login" className="text-foreground hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
