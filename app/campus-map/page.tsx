"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, NavigationIcon, Building, Car, Coffee, Users } from "lucide-react"
import Navigation from "@/components/navigation"
import Chatbot from "@/components/chatbot"

interface User {
  name: string
  email: string
  type: string
}

interface Location {
  id: string
  name: string
  building: string
  floor?: string
  category: "classroom" | "office" | "service" | "parking" | "restaurant"
  description: string
  coordinates: { x: number; y: number }
}

export default function CampusMapPage() {
  const [user, setUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
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

  const locations: Location[] = [
    {
      id: "1",
      name: "Aula P4",
      building: "Edificio F2",
      floor: "Piano Terra",
      category: "classroom",
      description: "Aula magna per lezioni frontali, capacità 150 posti",
      coordinates: { x: 30, y: 40 },
    },
    {
      id: "2",
      name: "Aula F3",
      building: "Edificio F3",
      floor: "Primo Piano",
      category: "classroom",
      description: "Aula multimediale con proiettore e sistema audio",
      coordinates: { x: 60, y: 30 },
    },
    {
      id: "3",
      name: "Lab Informatica",
      building: "Edificio F1",
      floor: "Piano Terra",
      category: "classroom",
      description: "Laboratorio con 30 postazioni computer",
      coordinates: { x: 20, y: 60 },
    },
    {
      id: "4",
      name: "Biblioteca Centrale",
      building: "Edificio Centrale",
      floor: "Tutti i Piani",
      category: "service",
      description: "Biblioteca principale con sale studio e archivi",
      coordinates: { x: 50, y: 50 },
    },
    {
      id: "5",
      name: "Segreteria Studenti",
      building: "Edificio Amministrativo",
      floor: "Piano Terra",
      category: "office",
      description: "Uffici per pratiche amministrative studenti",
      coordinates: { x: 70, y: 60 },
    },
    {
      id: "6",
      name: "Ufficio Relazioni Internazionali",
      building: "Edificio Amministrativo",
      floor: "Primo Piano",
      category: "office",
      description: "Supporto per studenti Erasmus e programmi internazionali",
      coordinates: { x: 75, y: 55 },
    },
    {
      id: "7",
      name: "Servizio Disabilità/DSA",
      building: "Edificio Servizi",
      floor: "Piano Terra",
      category: "service",
      description: "Supporto per studenti con disabilità e DSA",
      coordinates: { x: 40, y: 70 },
    },
    {
      id: "8",
      name: "Mensa Universitaria",
      building: "Edificio Mensa",
      category: "restaurant",
      description: "Servizio ristorazione per studenti e personale",
      coordinates: { x: 80, y: 40 },
    },
    {
      id: "9",
      name: "Parcheggio Studenti",
      building: "Area Esterna",
      category: "parking",
      description: "Parcheggio riservato agli studenti",
      coordinates: { x: 10, y: 80 },
    },
    {
      id: "10",
      name: "Bar Campus",
      building: "Edificio Centrale",
      floor: "Piano Terra",
      category: "restaurant",
      description: "Bar e punto ristoro",
      coordinates: { x: 45, y: 45 },
    },
  ]

  const categories = [
    { id: "all", label: "Tutti", icon: MapPin },
    { id: "classroom", label: "Aule", icon: Building },
    { id: "office", label: "Uffici", icon: Building },
    { id: "service", label: "Servizi", icon: NavigationIcon },
    { id: "restaurant", label: "Ristorazione", icon: Coffee },
    { id: "parking", label: "Parcheggi", icon: Car },
  ]

  const filteredLocations = locations.filter((location) => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || location.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "classroom":
        return "bg-blue-500"
      case "office":
        return "bg-green-500"
      case "service":
        return "bg-purple-500"
      case "restaurant":
        return "bg-orange-500"
      case "parking":
        return "bg-gray-500"
      default:
        return "bg-blue-500"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "classroom":
        return "Aula"
      case "office":
        return "Ufficio"
      case "service":
        return "Servizio"
      case "restaurant":
        return "Ristorazione"
      case "parking":
        return "Parcheggio"
      default:
        return "Luogo"
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
              <h1 className="text-xl font-semibold text-gray-900">Mappa Campus</h1>
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
              placeholder="Cerca aule, uffici, servizi..."
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Mappa Interattiva Campus</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-green-50 rounded-lg h-96 border-2 border-green-200 overflow-hidden">
                  {/* Campus Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200">
                    {/* Buildings representation */}
                    <div className="absolute top-8 left-8 w-16 h-12 bg-blue-300 rounded shadow-md flex items-center justify-center text-xs font-bold">
                      F1
                    </div>
                    <div className="absolute top-16 left-32 w-20 h-16 bg-blue-300 rounded shadow-md flex items-center justify-center text-xs font-bold">
                      F2
                    </div>
                    <div className="absolute top-8 right-24 w-18 h-14 bg-blue-300 rounded shadow-md flex items-center justify-center text-xs font-bold">
                      F3
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-20 bg-red-300 rounded shadow-md flex items-center justify-center text-xs font-bold">
                      Centrale
                    </div>
                    <div className="absolute bottom-16 right-16 w-16 h-12 bg-yellow-300 rounded shadow-md flex items-center justify-center text-xs font-bold">
                      Admin
                    </div>
                    <div className="absolute bottom-8 right-8 w-14 h-10 bg-orange-300 rounded shadow-md flex items-center justify-center text-xs font-bold">
                      Mensa
                    </div>
                  </div>

                  {/* Location Markers */}
                  {filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      className={`absolute w-4 h-4 rounded-full ${getCategoryColor(location.category)} border-2 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform`}
                      style={{
                        left: `${location.coordinates.x}%`,
                        top: `${location.coordinates.y}%`,
                      }}
                      onClick={() => setSelectedLocation(location)}
                      title={location.name}
                    />
                  ))}

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
                    <h4 className="text-xs font-semibold mb-2">Legenda</h4>
                    <div className="space-y-1">
                      {categories.slice(1).map((category) => (
                        <div key={category.id} className="flex items-center space-x-2 text-xs">
                          <div className={`w-3 h-3 rounded-full ${getCategoryColor(category.id)}`} />
                          <span>{category.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Details and List */}
          <div className="space-y-6">
            {/* Selected Location Details */}
            {selectedLocation && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Dettagli Luogo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold">{selectedLocation.name}</h3>
                      <p className="text-sm text-gray-600">{selectedLocation.building}</p>
                      {selectedLocation.floor && <p className="text-sm text-gray-600">{selectedLocation.floor}</p>}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {getCategoryLabel(selectedLocation.category)}
                    </Badge>
                    <p className="text-sm text-gray-700">{selectedLocation.description}</p>
                    <Button size="sm" className="w-full" onClick={() => setSelectedLocation(null)}>
                      <NavigationIcon className="h-4 w-4 mr-2" />
                      Ottieni Indicazioni
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Locations List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Luoghi ({filteredLocations.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedLocation?.id === location.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{location.name}</h4>
                          <p className="text-xs text-gray-600">{location.building}</p>
                          {location.floor && <p className="text-xs text-gray-500">{location.floor}</p>}
                        </div>
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(location.category)} mt-1`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Access for User-Specific Services */}
        {(user.email.includes("javier") || user.email.includes("sofia")) && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Servizi Consigliati per Te</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.email.includes("javier") && (
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedLocation(locations.find((l) => l.id === "6") || null)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Users className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Ufficio Relazioni Internazionali</h4>
                        <p className="text-sm text-gray-600">Supporto per studenti Erasmus</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              {user.email.includes("sofia") && (
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedLocation(locations.find((l) => l.id === "7") || null)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Users className="h-8 w-8 text-purple-600" />
                      <div>
                        <h4 className="font-medium">Servizio Disabilità/DSA</h4>
                        <p className="text-sm text-gray-600">Supporto e strumenti compensativi</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>

      <Navigation />
      <Chatbot />
    </div>
  )
}
