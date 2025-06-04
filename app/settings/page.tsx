"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Globe, Eye, Bell, Palette } from "lucide-react"
import Navigation from "@/components/navigation"
import Chatbot from "@/components/chatbot"

interface UserSettings {
  language: string
  fontSize: number
  highContrast: boolean
  highReadabilityFont: boolean
  screenReader: boolean
  reduceAnimations: boolean
  notifications: {
    email: boolean
    push: boolean
    schedule: boolean
    deadlines: boolean
    announcements: boolean
  }
  theme: "light" | "dark" | "auto"
}

export default function SettingsPage() {
  const [user, setUser] = useState<any | null>(null)
  const [settings, setSettings] = useState<UserSettings>({
    language: "it",
    fontSize: 16,
    highContrast: false,
    highReadabilityFont: false,
    screenReader: false,
    reduceAnimations: false,
    notifications: {
      email: true,
      push: true,
      schedule: true,
      deadlines: true,
      announcements: true,
    },
    theme: "light",
  })
  const [hasChanges, setHasChanges] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("uniclass_user")
    if (!userData) {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))

    // Load saved settings
    const savedSettings = localStorage.getItem("uniclass_settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [router])

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    setHasChanges(true)
  }

  const updateNotificationSettings = (key: keyof UserSettings["notifications"], value: boolean) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    })
  }

  const saveSettings = () => {
    localStorage.setItem("uniclass_settings", JSON.stringify(settings))
    setHasChanges(false)

    // Apply settings immediately
    applySettings()

    // Show success message (you could add a toast here)
    alert("Impostazioni salvate con successo!")
  }

  const resetSettings = () => {
    const defaultSettings: UserSettings = {
      language: "it",
      fontSize: 16,
      highContrast: false,
      highReadabilityFont: false,
      screenReader: false,
      reduceAnimations: false,
      notifications: {
        email: true,
        push: true,
        schedule: true,
        deadlines: true,
        announcements: true,
      },
      theme: "light",
    }
    setSettings(defaultSettings)
    setHasChanges(true)
  }

  const applySettings = () => {
    // Apply font size
    document.documentElement.style.fontSize = `${settings.fontSize}px`

    // Apply high contrast
    if (settings.highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    // Apply high readability font
    if (settings.highReadabilityFont) {
      document.documentElement.classList.add("high-readability-font")
    } else {
      document.documentElement.classList.remove("high-readability-font")
    }

    // Apply reduced animations
    if (settings.reduceAnimations) {
      document.documentElement.classList.add("reduce-animations")
    } else {
      document.documentElement.classList.remove("reduce-animations")
    }
  }

  // Apply settings on component mount
  useEffect(() => {
    applySettings()
  }, [settings])

  if (!user) return null

  const languages = [
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                ← Dashboard
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Impostazioni</h1>
            </div>
            {hasChanges && (
              <Badge variant="outline" className="bg-orange-50 text-orange-700">
                Modifiche non salvate
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="h-5 w-5" /> {/* Placeholder for User icon */}
                <span>Profilo Utente</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Nome</Label>
                  <p className="text-gray-700">{user.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-gray-700">{user.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Tipo Account</Label>
                  <Badge variant="outline">{user.type === "teacher" ? "Docente" : "Studente"}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Lingua Interfaccia</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="language" className="text-sm font-medium">
                    Seleziona la lingua dell'interfaccia
                  </Label>
                  <Select value={settings.language} onValueChange={(value) => updateSettings({ language: value })}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center space-x-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-gray-600">Le modifiche alla lingua verranno applicate immediatamente</p>
              </div>
            </CardContent>
          </Card>

          {/* Accessibility Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Accessibilità</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Font Size */}
                <div>
                  <Label className="text-sm font-medium">Dimensione Testo: {settings.fontSize}px</Label>
                  <div className="mt-2 px-3">
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={(value) => updateSettings({ fontSize: value[0] })}
                      min={12}
                      max={24}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Piccolo (12px)</span>
                    <span>Grande (24px)</span>
                  </div>
                </div>

                {/* High Readability Font */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="high-readability" className="text-sm font-medium">
                      Font ad Alta Leggibilità
                    </Label>
                    <p className="text-sm text-gray-600">Utilizza un font ottimizzato per la lettura</p>
                  </div>
                  <Switch
                    id="high-readability"
                    checked={settings.highReadabilityFont}
                    onCheckedChange={(checked) => updateSettings({ highReadabilityFont: checked })}
                  />
                </div>

                {/* High Contrast */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="high-contrast" className="text-sm font-medium">
                      Alto Contrasto
                    </Label>
                    <p className="text-sm text-gray-600">Aumenta il contrasto per una migliore visibilità</p>
                  </div>
                  <Switch
                    id="high-contrast"
                    checked={settings.highContrast}
                    onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
                  />
                </div>

                {/* Screen Reader */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="screen-reader" className="text-sm font-medium">
                      Compatibilità Screen Reader
                    </Label>
                    <p className="text-sm text-gray-600">Ottimizza l'interfaccia per lettori di schermo</p>
                  </div>
                  <Switch
                    id="screen-reader"
                    checked={settings.screenReader}
                    onCheckedChange={(checked) => updateSettings({ screenReader: checked })}
                  />
                </div>

                {/* Reduce Animations */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reduce-animations" className="text-sm font-medium">
                      Riduci Animazioni
                    </Label>
                    <p className="text-sm text-gray-600">Minimizza le animazioni per ridurre distrazioni</p>
                  </div>
                  <Switch
                    id="reduce-animations"
                    checked={settings.reduceAnimations}
                    onCheckedChange={(checked) => updateSettings({ reduceAnimations: checked })}
                  />
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">💡 Le modifiche vengono applicate immediatamente</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifiche</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="text-sm font-medium">
                      Notifiche Email
                    </Label>
                    <p className="text-sm text-gray-600">Ricevi notifiche via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => updateNotificationSettings("email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications" className="text-sm font-medium">
                      Notifiche Push
                    </Label>
                    <p className="text-sm text-gray-600">Ricevi notifiche push sul dispositivo</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => updateNotificationSettings("push", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="schedule-notifications" className="text-sm font-medium">
                      Promemoria Orario
                    </Label>
                    <p className="text-sm text-gray-600">Notifiche per lezioni ed esami</p>
                  </div>
                  <Switch
                    id="schedule-notifications"
                    checked={settings.notifications.schedule}
                    onCheckedChange={(checked) => updateNotificationSettings("schedule", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="deadline-notifications" className="text-sm font-medium">
                      Scadenze
                    </Label>
                    <p className="text-sm text-gray-600">Notifiche per scadenze importanti</p>
                  </div>
                  <Switch
                    id="deadline-notifications"
                    checked={settings.notifications.deadlines}
                    onCheckedChange={(checked) => updateNotificationSettings("deadlines", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="announcement-notifications" className="text-sm font-medium">
                      Avvisi Ufficiali
                    </Label>
                    <p className="text-sm text-gray-600">Notifiche per comunicazioni ufficiali</p>
                  </div>
                  <Switch
                    id="announcement-notifications"
                    checked={settings.notifications.announcements}
                    onCheckedChange={(checked) => updateNotificationSettings("announcements", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Tema</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="theme" className="text-sm font-medium">
                    Tema dell'interfaccia
                  </Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value: "light" | "dark" | "auto") => updateSettings({ theme: value })}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">☀️ Chiaro</SelectItem>
                      <SelectItem value="dark">🌙 Scuro</SelectItem>
                      <SelectItem value="auto">🔄 Automatico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-gray-600">Il tema automatico si adatta alle impostazioni del sistema</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6">
            <Button variant="outline" onClick={resetSettings} className="text-gray-600">
              Ripristina Predefinite
            </Button>

            <div className="space-x-3">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Annulla
              </Button>
              <Button onClick={saveSettings} disabled={!hasChanges} className="bg-blue-600 hover:bg-blue-700">
                Salva Modifiche
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Navigation />
      <Chatbot />
    </div>
  )
}
