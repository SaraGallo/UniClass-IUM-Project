"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, User, Lock } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("uniclass_user")
    if (user) {
      router.push("/dashboard")
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Demo credentials
    const validCredentials = [
      { email: "greta.rossi@studenti.unisa.it", password: "matricola2024", type: "student", name: "Greta Rossi" },
      { email: "javier.garcia@studenti.unisa.it", password: "erasmus2024", type: "student", name: "Javier García" },
      { email: "sofia.conti@studenti.unisa.it", password: "dsa2024", type: "student", name: "Sofia Conti" },
      { email: "elena.moretti@unisa.it", password: "docente2024", type: "teacher", name: "Prof.ssa Elena Moretti" },
      { email: "admin@unisa.it", password: "admin2024", type: "admin", name: "Amministratore" },
    ]

    const user = validCredentials.find((cred) => cred.email === email && cred.password === password)

    if (user) {
      localStorage.setItem("uniclass_user", JSON.stringify(user))
      router.push("/dashboard")
    } else {
      setError("Credenziali non valide. Controlla email e password.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="relative w-72 h-36 mx-auto mb-4 flex items-center justify-center bg-white rounded-lg shadow-sm p-6">
            <img
              src="/images/uniclass-logo.png"
              alt="UniClass - Università degli Studi di Salerno"
              className="max-w-full max-h-full object-contain"
              style={{ width: "auto", height: "auto", maxWidth: "280px", maxHeight: "120px" }}
              onError={(e) => {
                console.log("Errore caricamento logo:", e)
                e.currentTarget.style.display = "none"
              }}
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Benvenuto in UniClass</h1>
          <p className="text-gray-600">Accedi al tuo account per continuare</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Accesso</CardTitle>
            <CardDescription className="text-center">Inserisci le tue credenziali universitarie</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email universitaria</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nome.cognome@studenti.unisa.it"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Inserisci la tua password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Accesso in corso..." : "Accedi"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Credenziali Demo:</h3>
              <div className="text-xs space-y-1 text-gray-600">
                <p>
                  <strong>Matricola:</strong> greta.rossi@studenti.unisa.it / matricola2024
                </p>
                <p>
                  <strong>Erasmus:</strong> javier.garcia@studenti.unisa.it / erasmus2024
                </p>
                <p>
                  <strong>DSA:</strong> sofia.conti@studenti.unisa.it / dsa2024
                </p>
                <p>
                  <strong>Docente:</strong> elena.moretti@unisa.it / docente2024
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Problemi di accesso?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Contatta il supporto
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
