"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, Phone, Mail, Clock, MapPin, Globe, Heart, BookOpen, GraduationCap } from "lucide-react"
import Navigation from "@/components/navigation"
import Chatbot from "@/components/chatbot"

interface User {
  name: string
  email: string
  type: string
}

interface SupportService {
  id: string
  name: string
  description: string
  category: "academic" | "international" | "accessibility" | "wellness" | "administrative"
  contact: {
    phone?: string
    email: string
    office: string
    hours: string
  }
  isRecommended?: boolean
}

export default function SupportPage() {
  const [user, setUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
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

  const getSupportServices = (): SupportService[] => {
    const baseServices: SupportService[] = [
      {
        id: "1",
        name: "Segreteria Studenti",
        description: "Gestione pratiche amministrative, iscrizioni, certificati e documentazione accademica",
        category: "administrative",
        contact: {
          phone: "+39 089 969 111",
          email: "segreteria@unisa.it",
          office: "Edificio Amministrativo, Piano Terra",
          hours: "Lun-Ven: 9:00-13:00, Mar-Gio: 15:00-17:00",
        },
      },
      {
        id: "2",
        name: "Ufficio Relazioni Internazionali",
        description: "Supporto per programmi Erasmus, scambi internazionali e studenti stranieri",
        category: "international",
        contact: {
          phone: "+39 089 969 200",
          email: "international@unisa.it",
          office: "Edificio Amministrativo, Primo Piano",
          hours: "Lun-Ven: 9:00-12:00, Mer: 14:30-16:30",
        },
        isRecommended: user.email.includes("javier"),
      },
      {
        id: "3",
        name: "Servizio Disabilità e DSA",
        description: "Supporto per studenti con disabilità e disturbi specifici dell'apprendimento",
        category: "accessibility",
        contact: {
          phone: "+39 089 969 300",
          email: "disabilita@unisa.it",
          office: "Edificio Servizi, Piano Terra",
          hours: "Lun-Ven: 9:00-13:00, Lun-Mer: 14:00-16:00",
        },
        isRecommended: user.email.includes("sofia"),
      },
      {
        id: "4",
        name: "Servizio di Tutorato",
        description: "Supporto didattico e orientamento per il percorso di studi",
        category: "academic",
        contact: {
          email: "tutorato@unisa.it",
          office: "Vari Dipartimenti",
          hours: "Variabili per dipartimento",
        },
        isRecommended: user.email.includes("greta"),
      },
      {
        id: "5",
        name: "Counseling Psicologico",
        description: "Supporto psicologico e consulenza per il benessere degli studenti",
        category: "wellness",
        contact: {
          phone: "+39 089 969 400",
          email: "counseling@unisa.it",
          office: "Edificio Servizi, Primo Piano",
          hours: "Lun-Ven: 9:00-17:00 (su appuntamento)",
        },
      },
      {
        id: "6",
        name: "Ufficio Diritto allo Studio",
        description: "Borse di studio, agevolazioni economiche e servizi per il diritto allo studio",
        category: "administrative",
        contact: {
          phone: "+39 089 969 500",
          email: "dirittostudio@unisa.it",
          office: "Edificio Amministrativo, Secondo Piano",
          hours: "Lun-Ven: 9:00-13:00, Mar-Gio: 15:00-17:00",
        },
      },
      {
        id: "7",
        name: "Orientamento e Placement",
        description: "Orientamento professionale e supporto per l'inserimento nel mondo del lavoro",
        category: "academic",
        contact: {
          email: "placement@unisa.it",
          office: "Edificio Centrale, Secondo Piano",
          hours: "Lun-Ven: 9:00-13:00",
        },
      },
      {
        id: "8",
        name: "Servizio Sanitario Universitario",
        description: "Assistenza sanitaria di base per studenti e personale universitario",
        category: "wellness",
        contact: {
          phone: "+39 089 969 600",
          email: "sanitario@unisa.it",
          office: "Edificio Servizi, Piano Terra",
          hours: "Lun-Ven: 8:00-14:00",
        },
      },
    ]

    return baseServices.sort((a, b) => {
      if (a.isRecommended && !b.isRecommended) return -1
      if (!a.isRecommended && b.isRecommended) return 1
      return 0
    })
  }

  const services = getSupportServices()

  const categories = [
    { id: "all", label: "Tutti i Servizi", icon: Users },
    { id: "academic", label: "Supporto Didattico", icon: BookOpen },
    { id: "international", label: "Internazionalizzazione", icon: Globe },
    { id: "accessibility", label: "Accessibilità", icon: Heart },
    { id: "wellness", label: "Benessere", icon: Heart },
    { id: "administrative", label: "Amministrativi", icon: GraduationCap },
  ]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800"
      case "international":
        return "bg-green-100 text-green-800"
      case "accessibility":
        return "bg-purple-100 text-purple-800"
      case "wellness":
        return "bg-pink-100 text-pink-800"
      case "administrative":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "academic":
        return "Didattico"
      case "international":
        return "Internazionale"
      case "accessibility":
        return "Accessibilità"
      case "wellness":
        return "Benessere"
      case "administrative":
        return "Amministrativo"
      default:
        return "Servizio"
    }
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
              <h1 className="text-xl font-semibold text-gray-900">Servizi di Supporto</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Message */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Hai bisogno di aiuto? 🤝</h2>
          <p className="text-blue-800">
            L'Università di Salerno offre numerosi servizi di supporto per accompagnarti durante il tuo percorso
            universitario. Trova il servizio più adatto alle tue esigenze.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cerca servizi di supporto..."
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

        {/* Recommended Services */}
        {filteredServices.some((s) => s.isRecommended) && selectedCategory === "all" && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-green-700">⭐ Servizi Consigliati per Te</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredServices
                .filter((s) => s.isRecommended)
                .map((service) => (
                  <Card key={service.id} className="border-green-200 bg-green-50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{service.name}</CardTitle>
                        <Badge className="bg-green-600 text-white">Consigliato</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 mb-4">{service.description}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <a href={`mailto:${service.contact.email}`} className="text-blue-600 hover:underline">
                            {service.contact.email}
                          </a>
                        </div>
                        {service.contact.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <a href={`tel:${service.contact.phone}`} className="text-blue-600 hover:underline">
                              {service.contact.phone}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{service.contact.office}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{service.contact.hours}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" onClick={() => router.push("/campus-map")}>
                          <MapPin className="h-3 w-3 mr-1" />
                          Trova sulla Mappa
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-3 w-3 mr-1" />
                          Contatta
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All Services */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {selectedCategory === "all" ? "Tutti i Servizi" : categories.find((c) => c.id === selectedCategory)?.label}
            <span className="text-gray-500 ml-2">({filteredServices.length})</span>
          </h3>

          {filteredServices.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nessun servizio trovato</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredServices.map((service) => (
                <Card key={service.id} className={service.isRecommended ? "ring-1 ring-green-200" : ""}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{service.name}</CardTitle>
                      <div className="flex space-x-2">
                        {service.isRecommended && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                            Consigliato
                          </Badge>
                        )}
                        <Badge variant="outline" className={`text-xs ${getCategoryColor(service.category)}`}>
                          {getCategoryLabel(service.category)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-4">{service.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${service.contact.email}`} className="text-blue-600 hover:underline">
                          {service.contact.email}
                        </a>
                      </div>
                      {service.contact.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <a href={`tel:${service.contact.phone}`} className="text-blue-600 hover:underline">
                            {service.contact.phone}
                          </a>
                        </div>
                      )}
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span className="text-gray-600">{service.contact.office}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span className="text-gray-600">{service.contact.hours}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => router.push("/campus-map")}>
                        <MapPin className="h-3 w-3 mr-1" />
                        Mappa
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-3 w-3 mr-1" />
                        Contatta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
          <h3 className="text-lg font-semibold text-red-900 mb-2">🚨 Contatti di Emergenza</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-red-800">Emergenze Campus:</p>
              <p className="text-red-700">📞 +39 089 969 999</p>
            </div>
            <div>
              <p className="font-medium text-red-800">Supporto Tecnico IT:</p>
              <p className="text-red-700">📧 supporto.it@unisa.it</p>
            </div>
          </div>
        </div>
      </main>

      <Navigation />
      <Chatbot />
    </div>
  )
}
