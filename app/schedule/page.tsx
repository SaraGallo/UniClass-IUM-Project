"use client"

import { CardDescription } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import Navigation from "@/components/navigation"
import Chatbot from "@/components/chatbot"

interface User {
  name: string
  email: string
  type: string
}

interface Lesson {
  id: string
  title: string
  time: string
  room: string
  building: string
  professor?: string
  type: "lesson" | "exam" | "lab"
}

export default function SchedulePage() {
  const [user, setUser] = useState<User | null>(null)
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("uniclass_user")
    if (!userData) {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  if (!user) return null

  const getWeekDays = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const weekDays = getWeekDays(currentWeek)
  const dayNames = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"]

  const getScheduleForUser = (): Record<string, Lesson[]> => {
    if (user.type === "teacher") {
      return {
        Lunedì: [
          {
            id: "1",
            title: "Interazione Uomo-Macchina",
            time: "14:00 - 16:00",
            room: "Aula F3",
            building: "Edificio F3",
            type: "lesson",
          },
        ],
        Martedì: [
          {
            id: "2",
            title: "Ricevimento Studenti",
            time: "10:00 - 12:00",
            room: "Ufficio 201",
            building: "Edificio F3",
            type: "lesson",
          },
        ],
        Mercoledì: [
          {
            id: "3",
            title: "Interazione Uomo-Macchina",
            time: "14:00 - 16:00",
            room: "Aula F3",
            building: "Edificio F3",
            type: "lesson",
          },
        ],
        Giovedì: [],
        Venerdì: [
          {
            id: "4",
            title: "Seminario HCI",
            time: "16:00 - 18:00",
            room: "Aula Magna",
            building: "Edificio Centrale",
            type: "lesson",
          },
        ],
      }
    }

    // Student schedule
    return {
      Lunedì: [
        {
          id: "1",
          title: "Analisi Matematica I",
          time: "09:00 - 11:00",
          room: "Aula P4",
          building: "Edificio F2",
          professor: "Prof. Bianchi",
          type: "lesson",
        },
        {
          id: "2",
          title: "Programmazione I",
          time: "14:00 - 16:00",
          room: "Lab Informatica",
          building: "Edificio F1",
          professor: "Prof. Verdi",
          type: "lab",
        },
      ],
      Martedì: [
        {
          id: "3",
          title: "Fisica Generale",
          time: "10:00 - 12:00",
          room: "Aula P2",
          building: "Edificio F2",
          professor: "Prof. Rossi",
          type: "lesson",
        },
      ],
      Mercoledì: [
        {
          id: "4",
          title: "Analisi Matematica I",
          time: "09:00 - 11:00",
          room: "Aula P4",
          building: "Edificio F2",
          professor: "Prof. Bianchi",
          type: "lesson",
        },
        {
          id: "5",
          title: "Interazione Uomo-Macchina",
          time: "14:00 - 16:00",
          room: "Aula F3",
          building: "Edificio F3",
          professor: "Prof.ssa Moretti",
          type: "lesson",
        },
      ],
      Giovedì: [
        {
          id: "6",
          title: "Programmazione I",
          time: "14:00 - 16:00",
          room: "Lab Informatica",
          building: "Edificio F1",
          professor: "Prof. Verdi",
          type: "lab",
        },
      ],
      Venerdì: [
        {
          id: "7",
          title: "Fisica Generale",
          time: "10:00 - 12:00",
          room: "Aula P2",
          building: "Edificio F2",
          professor: "Prof. Rossi",
          type: "lesson",
        },
      ],
    }
  }

  const schedule = getScheduleForUser()

  const navigateWeek = (direction: "prev" | "next") => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeek(newWeek)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lesson":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "lab":
        return "bg-green-100 text-green-800 border-green-200"
      case "exam":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "lesson":
        return "Lezione"
      case "lab":
        return "Laboratorio"
      case "exam":
        return "Esame"
      default:
        return "Evento"
    }
  }

  const formatWeekRange = () => {
    const start = weekDays[0]
    const end = weekDays[6]
    return `${start.getDate()} - ${end.getDate()} ${end.toLocaleDateString("it-IT", { month: "long", year: "numeric" })}`
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                ← Dashboard
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Orario Settimanale</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Settimana Precedente
          </Button>

          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900">{formatWeekRange()}</h2>
          </div>

          <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
            Settimana Successiva
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {weekDays.slice(0, 5).map((day, index) => {
            const dayName = dayNames[index]
            const dayLessons = schedule[dayName] || []
            const isToday = day.toDateString() === new Date().toDateString()

            return (
              <Card key={index} className={`${isToday ? "ring-2 ring-blue-500" : ""}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>{dayName}</span>
                    {isToday && (
                      <Badge variant="default" className="text-xs">
                        Oggi
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {day.toLocaleDateString("it-IT", { day: "numeric", month: "short" })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dayLessons.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">Nessuna lezione</p>
                  ) : (
                    dayLessons.map((lesson) => (
                      <div key={lesson.id} className={`p-3 rounded-lg border ${getTypeColor(lesson.type)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm leading-tight">{lesson.title}</h4>
                          <Badge variant="outline" className="text-xs ml-2">
                            {getTypeLabel(lesson.type)}
                          </Badge>
                        </div>

                        <div className="space-y-1 text-xs">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{lesson.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>
                              {lesson.room}, {lesson.building}
                            </span>
                          </div>
                          {lesson.professor && <div className="text-gray-600">{lesson.professor}</div>}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => router.push("/campus-map")}>
            <MapPin className="h-4 w-4 mr-2" />
            Mappa Campus
          </Button>
          <Button variant="outline" onClick={() => router.push("/notices")}>
            Avvisi Lezioni
          </Button>
          <Button variant="outline" onClick={() => router.push("/exams")}>
            <Calendar className="h-4 w-4 mr-2" />
            Calendario Esami
          </Button>
        </div>
      </main>

      <Navigation />
      <Chatbot />
    </div>
  )
}
