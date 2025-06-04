"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Bell, BookOpen, Users, Settings, LogOut } from "lucide-react"
import Navigation from "@/components/navigation"
import Chatbot from "@/components/chatbot"

interface User {
  name: string
  email: string
  type: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("uniclass_user")
    if (!userData) {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("uniclass_user")
    router.push("/")
  }

  if (!user) return null

  const today = new Date()
  const todayString = today.toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Mock data based on user type
  const getNextLesson = () => {
    if (user.type === "teacher") {
      return {
        title: "Interazione Uomo-Macchina",
        time: "14:00 - 16:00",
        room: "Aula F3",
        building: "Edificio F3",
      }
    }
    return {
      title: "Analisi Matematica I",
      time: "09:00 - 11:00",
      room: "Aula P4",
      building: "Edificio F2",
    }
  }

  const getRecentNotices = () => {
    const baseNotices = [
      {
        id: 1,
        title: "Modificati orari biblioteca",
        content: "Nuovi orari di apertura dal lunedì al venerdì: 8:00-20:00",
        date: "2 ore fa",
        type: "info",
      },
      {
        id: 2,
        title: "Seminario Annullato",
        content: "Il seminario di giovedì 16 maggio è stato annullato",
        date: "1 giorno fa",
        type: "warning",
      },
    ]

    if (user.type === "student" && user.email.includes("javier")) {
      return [
        {
          id: 3,
          title: "Ufficio Relazioni Internazionali",
          content: "Nuove informazioni per studenti Erasmus disponibili",
          date: "3 ore fa",
          type: "info",
        },
        ...baseNotices,
      ]
    }

    if (user.type === "student" && user.email.includes("sofia")) {
      return [
        {
          id: 4,
          title: "Servizio Disabilità/DSA",
          content: "Disponibili nuovi strumenti compensativi",
          date: "1 ora fa",
          type: "info",
        },
        ...baseNotices,
      ]
    }

    return baseNotices
  }

  const getUpcomingDeadlines = () => {
    if (user.type === "teacher") {
      return [
        {
          title: "Correzione Assignment 3",
          date: "28 Maggio 2025",
          daysLeft: 4,
        },
        {
          title: "Preparazione Esame",
          date: "15 Giugno 2025",
          daysLeft: 22,
        },
      ]
    }
    return [
      {
        title: "Assignment 3 - IUM",
        date: "25 Maggio 2025",
        daysLeft: 1,
      },
      {
        title: "Esame Analisi Matematica",
        date: "10 Giugno 2025",
        daysLeft: 17,
      },
    ]
  }

  const nextLesson = getNextLesson()
  const recentNotices = getRecentNotices()
  const upcomingDeadlines = getUpcomingDeadlines()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">UniClass</h1>
              <Badge variant="outline" className="text-xs">
                {user.type === "teacher" ? "Docente" : "Studente"}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {currentTime.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/settings")}
                className="text-gray-600 hover:text-gray-900"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ciao, {user.name.split(" ")[0]}! 👋</h2>
          <p className="text-gray-600">Oggi è {todayString}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Prossima Lezione */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Prossima Lezione</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">{nextLesson.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{nextLesson.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {nextLesson.room}, {nextLesson.building}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" onClick={() => router.push("/schedule")}>
                    Dettagli
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => router.push("/campus-map")}>
                    Mappa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Azioni Rapide */}
          <Card>
            <CardHeader>
              <CardTitle>Azioni Rapide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/schedule")}>
                <Calendar className="h-4 w-4 mr-2" />
                Visualizza Orario Completo
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/notices")}>
                <Bell className="h-4 w-4 mr-2" />
                Tutti gli Avvisi
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/support")}>
                <Users className="h-4 w-4 mr-2" />
                Servizi di Supporto
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Avvisi Recenti */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-orange-600" />
                <span>Avvisi Recenti</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotices.map((notice) => (
                  <div key={notice.id} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-sm">{notice.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notice.content}</p>
                    <span className="text-xs text-gray-500">{notice.date}</span>
                  </div>
                ))}
                <Button variant="link" className="p-0 h-auto text-blue-600" onClick={() => router.push("/notices")}>
                  Vedi tutti gli avvisi →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Scadenze */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-red-600" />
                <span>In Scadenza</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">{deadline.title}</h4>
                      <p className="text-sm text-gray-600">{deadline.date}</p>
                    </div>
                    <Badge variant={deadline.daysLeft <= 3 ? "destructive" : "secondary"} className="text-xs">
                      {deadline.daysLeft} giorni
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Navigation />
      <Chatbot />
    </div>
  )
}
