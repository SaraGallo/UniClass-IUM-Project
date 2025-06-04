"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import Navigation from "@/components/navigation"
import Chatbot from "@/components/chatbot"

interface Exam {
  id: string
  course: string
  professor: string
  date: string
  time: string
  room: string
  building: string
  registrationDeadline: string
  status: "available" | "registered" | "closed" | "completed"
  grade?: number
}

export default function ExamsPage() {
  const [user, setUser] = useState<any | null>(null)
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "registered" | "completed">("upcoming")
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

  const getExamsForUser = (): Exam[] => {
    if (user.type === "teacher") {
      return [
        {
          id: "1",
          course: "Interazione Uomo-Macchina",
          professor: "Prof.ssa Elena Moretti",
          date: "2025-06-15",
          time: "09:00",
          room: "Aula F3",
          building: "Edificio F3",
          registrationDeadline: "2025-06-08",
          status: "available",
        },
        {
          id: "2",
          course: "Interazione Uomo-Macchina",
          professor: "Prof.ssa Elena Moretti",
          date: "2025-07-10",
          time: "09:00",
          room: "Aula F3",
          building: "Edificio F3",
          registrationDeadline: "2025-07-03",
          status: "available",
        },
      ]
    }

    return [
      {
        id: "1",
        course: "Analisi Matematica I",
        professor: "Prof. Bianchi",
        date: "2025-06-10",
        time: "09:00",
        room: "Aula P4",
        building: "Edificio F2",
        registrationDeadline: "2025-06-03",
        status: "available",
      },
      {
        id: "2",
        course: "Programmazione I",
        professor: "Prof. Verdi",
        date: "2025-06-12",
        time: "14:00",
        room: "Lab Informatica",
        building: "Edificio F1",
        registrationDeadline: "2025-06-05",
        status: "registered",
      },
      {
        id: "3",
        course: "Fisica Generale",
        professor: "Prof. Rossi",
        date: "2025-06-18",
        time: "10:00",
        room: "Aula P2",
        building: "Edificio F2",
        registrationDeadline: "2025-06-11",
        status: "available",
      },
      {
        id: "4",
        course: "Interazione Uomo-Macchina",
        professor: "Prof.ssa Moretti",
        date: "2025-06-15",
        time: "09:00",
        room: "Aula F3",
        building: "Edificio F3",
        registrationDeadline: "2025-06-08",
        status: "registered",
      },
      {
        id: "5",
        course: "Algoritmi e Strutture Dati",
        professor: "Prof. Neri",
        date: "2025-05-20",
        time: "14:00",
        room: "Aula P1",
        building: "Edificio F2",
        registrationDeadline: "2025-05-13",
        status: "completed",
        grade: 28,
      },
      {
        id: "6",
        course: "Basi di Dati",
        professor: "Prof. Gialli",
        date: "2025-05-15",
        time: "10:00",
        room: "Aula P3",
        building: "Edificio F2",
        registrationDeadline: "2025-05-08",
        status: "completed",
        grade: 30,
      },
    ]
  }

  const exams = getExamsForUser()

  const getFilteredExams = () => {
    switch (selectedTab) {
      case "upcoming":
        return exams.filter((exam) => exam.status === "available" || exam.status === "closed")
      case "registered":
        return exams.filter((exam) => exam.status === "registered")
      case "completed":
        return exams.filter((exam) => exam.status === "completed")
      default:
        return exams
    }
  }

  const filteredExams = getFilteredExams()

  const handleRegister = (examId: string) => {
    // Simulate registration
    alert("Iscrizione all'esame completata con successo!")
  }

  const handleUnregister = (examId: string) => {
    // Simulate unregistration
    if (confirm("Sei sicuro di voler annullare l'iscrizione a questo esame?")) {
      alert("Iscrizione annullata con successo!")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "registered":
        return <AlertCircle className="h-4 w-4 text-blue-600" />
      case "closed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Disponibile"
      case "registered":
        return "Iscritto"
      case "closed":
        return "Chiuso"
      case "completed":
        return "Completato"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "registered":
        return "bg-blue-100 text-blue-800"
      case "closed":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("it-IT", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isRegistrationOpen = (deadline: string) => {
    return new Date(deadline) > new Date()
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
              <h1 className="text-xl font-semibold text-gray-900">
                {user.type === "teacher" ? "Gestione Esami" : "Calendario Esami"}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <Button
              variant={selectedTab === "upcoming" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTab("upcoming")}
              className="text-sm"
            >
              Prossimi Appelli
            </Button>
            <Button
              variant={selectedTab === "registered" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTab("registered")}
              className="text-sm"
            >
              Iscrizioni
            </Button>
            <Button
              variant={selectedTab === "completed" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTab("completed")}
              className="text-sm"
            >
              Completati
            </Button>
          </div>
        </div>

        {/* Exams List */}
        <div className="space-y-4">
          {filteredExams.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {selectedTab === "upcoming" && "Nessun appello disponibile"}
                  {selectedTab === "registered" && "Nessuna iscrizione attiva"}
                  {selectedTab === "completed" && "Nessun esame completato"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredExams.map((exam) => (
              <Card key={exam.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{exam.course}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="h-4 w-4 text-gray-500 inline-block">👤</span>
                        <span className="text-sm text-gray-600">{exam.professor}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {exam.grade && (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Voto: {exam.grade}/30
                        </Badge>
                      )}
                      <Badge className={getStatusColor(exam.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(exam.status)}
                          <span>{getStatusLabel(exam.status)}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Data:</span>
                        <span>{formatDate(exam.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Orario:</span>
                        <span>{exam.time}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Luogo:</span>
                        <span>
                          {exam.room}, {exam.building}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Scadenza iscrizione:</span>
                        <span
                          className={isRegistrationOpen(exam.registrationDeadline) ? "text-green-600" : "text-red-600"}
                        >
                          {new Date(exam.registrationDeadline).toLocaleDateString("it-IT")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    {exam.status === "available" && isRegistrationOpen(exam.registrationDeadline) && (
                      <Button
                        size="sm"
                        onClick={() => handleRegister(exam.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Iscriviti
                      </Button>
                    )}

                    {exam.status === "registered" && isRegistrationOpen(exam.registrationDeadline) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUnregister(exam.id)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        Annulla Iscrizione
                      </Button>
                    )}

                    <Button size="sm" variant="outline" onClick={() => router.push("/campus-map")}>
                      <MapPin className="h-3 w-3 mr-1" />
                      Trova Aula
                    </Button>

                    {exam.status === "completed" && exam.grade && (
                      <Button size="sm" variant="outline">
                        Scarica Verbale
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quick Stats */}
        {user.type === "student" && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {exams.filter((e) => e.status === "available").length}
                </div>
                <div className="text-sm text-gray-600">Appelli Disponibili</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {exams.filter((e) => e.status === "registered").length}
                </div>
                <div className="text-sm text-gray-600">Iscrizioni Attive</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {exams.filter((e) => e.status === "completed").length}
                </div>
                <div className="text-sm text-gray-600">Esami Sostenuti</div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Navigation />
      <Chatbot />
    </div>
  )
}
