"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Bell, Search, Calendar, AlertCircle, Info, Users } from "lucide-react"
import Navigation from "@/components/navigation"
import Chatbot from "@/components/chatbot"

interface User {
  name: string
  email: string
  type: string
}

interface Notice {
  id: string
  title: string
  content: string
  date: string
  category: "general" | "academic" | "administrative" | "international" | "accessibility"
  priority: "low" | "medium" | "high"
  isNew: boolean
  author: string
}

export default function NoticesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [expandedNotice, setExpandedNotice] = useState<string | null>(null)
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

  const getNoticesForUser = (): Notice[] => {
    const baseNotices: Notice[] = [
      {
        id: "1",
        title: "Modificati orari biblioteca",
        content:
          "Si comunica che a partire dal 20 maggio 2025, gli orari di apertura della biblioteca centrale saranno modificati come segue: Lunedì-Venerdì: 8:00-20:00, Sabato: 9:00-17:00, Domenica: chiuso. Si prega di prendere nota delle nuove disposizioni.",
        date: "2025-05-24T10:00:00Z",
        category: "general",
        priority: "medium",
        isNew: true,
        author: "Biblioteca Centrale",
      },
      {
        id: "2",
        title: "Seminario Annullato - Giovedì 16 Maggio",
        content:
          'Il seminario "Innovazioni nell\'Intelligenza Artificiale" previsto per giovedì 16 maggio alle ore 15:00 è stato annullato per motivi organizzativi. Sarà riprogrammato nelle prossime settimane.',
        date: "2025-05-23T14:30:00Z",
        category: "academic",
        priority: "high",
        isNew: false,
        author: "Dipartimento di Informatica",
      },
      {
        id: "3",
        title: "Evento Campus: Elezioni Universitarie",
        content:
          "Si terranno le elezioni per i rappresentanti degli studenti nei giorni 28-29 maggio 2025. Tutti gli studenti regolarmente iscritti sono invitati a partecipare. Seggi aperti dalle 9:00 alle 18:00.",
        date: "2025-05-22T09:00:00Z",
        category: "general",
        priority: "medium",
        isNew: false,
        author: "Rettore",
      },
      {
        id: "4",
        title: "Erogata seconda rata BDS",
        content:
          "È stata erogata la seconda rata delle borse di studio per l'anno accademico 2024/2025. Gli importi sono stati accreditati sui conti correnti degli studenti beneficiari.",
        date: "2025-05-21T16:00:00Z",
        category: "administrative",
        priority: "low",
        isNew: false,
        author: "Ufficio Diritto allo Studio",
      },
      {
        id: "5",
        title: "Finestra temporale per CFU aggiuntivi",
        content:
          "È aperta la finestra temporale per la richiesta di CFU aggiuntivi. Le domande devono essere presentate entro il 30 maggio 2025 tramite il portale studenti.",
        date: "2025-05-20T11:00:00Z",
        category: "academic",
        priority: "medium",
        isNew: false,
        author: "Segreteria Studenti",
      },
    ]

    // Add specific notices based on user type
    if (user.email.includes("javier")) {
      baseNotices.unshift({
        id: "6",
        title: "Ufficio Relazioni Internazionali - Nuove Informazioni",
        content:
          "Sono disponibili nuove informazioni per gli studenti Erasmus riguardo alle procedure di riconoscimento crediti e alle scadenze per la documentazione finale. Si prega di consultare il portale dedicato.",
        date: "2025-05-24T08:00:00Z",
        category: "international",
        priority: "high",
        isNew: true,
        author: "Ufficio Relazioni Internazionali",
      })
    }

    if (user.email.includes("sofia")) {
      baseNotices.unshift({
        id: "7",
        title: "Servizio Disabilità/DSA - Nuovi Strumenti",
        content:
          "Sono disponibili nuovi strumenti compensativi per studenti con DSA, inclusi software di sintesi vocale aggiornati e mappe concettuali digitali. Per informazioni contattare il servizio.",
        date: "2025-05-24T12:00:00Z",
        category: "accessibility",
        priority: "high",
        isNew: true,
        author: "Servizio Disabilità/DSA",
      })
    }

    return baseNotices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const notices = getNoticesForUser()

  const categories = [
    { id: "all", label: "Tutti", icon: Bell },
    { id: "general", label: "Generali", icon: Info },
    { id: "academic", label: "Didattica", icon: Calendar },
    { id: "administrative", label: "Amministrativi", icon: AlertCircle },
    { id: "international", label: "Internazionali", icon: Users },
    { id: "accessibility", label: "Accessibilità", icon: Users },
  ]

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || notice.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Media"
      case "low":
        return "Bassa"
      default:
        return "Media"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Oggi"
    if (diffDays === 2) return "Ieri"
    if (diffDays <= 7) return `${diffDays - 1} giorni fa`

    return date.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
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
              <h1 className="text-xl font-semibold text-gray-900">Avvisi e Comunicazioni</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cerca negli avvisi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-1"
                >
                  <Icon className="h-3 w-3" />
                  <span>{category.label}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Notices List */}
        <div className="space-y-4">
          {filteredNotices.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nessun avviso trovato</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotices.map((notice) => (
              <Card key={notice.id} className={`${notice.isNew ? "ring-2 ring-blue-500" : ""}`}>
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base flex items-center space-x-2">
                        <span>{notice.title}</span>
                        {notice.isNew && (
                          <Badge variant="default" className="text-xs">
                            Nuovo
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span>{notice.author}</span>
                        <span>•</span>
                        <span>{formatDate(notice.date)}</span>
                        <Badge variant={getPriorityColor(notice.priority)} className="text-xs">
                          {getPriorityLabel(notice.priority)}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {expandedNotice === notice.id ? "−" : "+"}
                    </Button>
                  </div>
                </CardHeader>

                {expandedNotice === notice.id && (
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{notice.content}</p>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>
      </main>

      <Navigation />
      <Chatbot />
    </div>
  )
}
