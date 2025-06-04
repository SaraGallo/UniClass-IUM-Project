"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Ciao! Sono l'assistente virtuale di UniClass. Come posso aiutarti a navigare nel sito?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Navigation help
    if (message.includes("orario") || message.includes("lezioni") || message.includes("calendario")) {
      return 'Per visualizzare il tuo orario delle lezioni, vai alla sezione "Orario" nella barra di navigazione in basso, oppure clicca su "Visualizza Orario Completo" dalla dashboard principale.'
    }

    if (message.includes("avvisi") || message.includes("comunicazioni") || message.includes("notizie")) {
      return 'Puoi trovare tutti gli avvisi e le comunicazioni ufficiali nella sezione "Avvisi". Dalla dashboard puoi anche vedere gli avvisi più recenti.'
    }

    if (
      message.includes("mappa") ||
      message.includes("campus") ||
      message.includes("aula") ||
      message.includes("edificio")
    ) {
      return 'Per trovare aule ed edifici, usa la sezione "Mappa Campus" accessibile dal menu o dai link rapidi. Puoi cercare specifiche aule o servizi.'
    }

    if (message.includes("supporto") || message.includes("aiuto") || message.includes("servizi")) {
      return 'Nella sezione "Supporto" trovi tutti i servizi di assistenza dell\'università, inclusi uffici per studenti internazionali, servizi per DSA, e molto altro.'
    }

    if (message.includes("impostazioni") || message.includes("lingua") || message.includes("accessibilità")) {
      return 'Nelle "Impostazioni" puoi personalizzare la lingua, le opzioni di accessibilità, le notifiche e molto altro per adattare UniClass alle tue esigenze.'
    }

    if (message.includes("esami") || message.includes("iscrizione") || message.includes("appelli")) {
      return 'Per informazioni su esami e iscrizioni agli appelli, controlla la sezione "Orario" dove trovi anche il calendario degli esami, oppure consulta gli avvisi per aggiornamenti.'
    }

    if (message.includes("erasmus") || message.includes("internazionale")) {
      return 'Per supporto agli studenti Erasmus, vai nella sezione "Supporto" e cerca "Ufficio Relazioni Internazionali". Puoi anche usare la mappa per trovare l\'ufficio fisico.'
    }

    if (message.includes("dsa") || message.includes("disabilità") || message.includes("accessibilità")) {
      return 'Il "Servizio Disabilità/DSA" è disponibile nella sezione "Supporto". Nelle impostazioni puoi anche attivare opzioni di accessibilità come font ad alta leggibilità e alto contrasto.'
    }

    if (message.includes("biblioteca") || message.includes("studio")) {
      return "Per informazioni sulla biblioteca, controlla gli avvisi per orari aggiornati, oppure usa la mappa campus per localizzarla fisicamente."
    }

    if (message.includes("login") || message.includes("accesso") || message.includes("password")) {
      return "Se hai problemi di accesso, assicurati di usare le credenziali universitarie corrette. Per assistenza tecnica, contatta il supporto IT dell'università."
    }

    if (message.includes("notifiche") || message.includes("promemoria")) {
      return 'Puoi gestire le notifiche nelle "Impostazioni". Puoi attivare/disattivare notifiche per orari, scadenze, avvisi e altro.'
    }

    // Greetings
    if (
      message.includes("ciao") ||
      message.includes("salve") ||
      message.includes("buongiorno") ||
      message.includes("buonasera")
    ) {
      return "Ciao! Sono qui per aiutarti a navigare in UniClass. Puoi chiedermi come trovare orari, avvisi, servizi di supporto, o come usare le varie funzioni del sito."
    }

    if (message.includes("grazie")) {
      return "Prego! Sono sempre qui se hai bisogno di aiuto per navigare in UniClass. 😊"
    }

    // Default response
    return "Posso aiutarti a navigare in UniClass! Prova a chiedermi come:\n\n• Visualizzare l'orario delle lezioni\n• Trovare avvisi e comunicazioni\n• Usare la mappa del campus\n• Accedere ai servizi di supporto\n• Modificare le impostazioni\n\nCosa ti serve?"
  }

  const sendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // Simulate bot thinking time
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(inputText),
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-4 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-40 ${
          isOpen ? "hidden" : "flex"
        } items-center justify-center`}
        aria-label="Apri chat assistente"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-96 z-50">
          <Card className="h-full flex flex-col shadow-xl">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span>Assistente UniClass</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-blue-700 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-blue-600" />}
                        {message.sender === "user" && <User className="h-4 w-4 mt-0.5 text-white" />}
                        <div className="flex-1">
                          <p className="whitespace-pre-line">{message.text}</p>
                          <span
                            className={`text-xs opacity-70 ${
                              message.sender === "user" ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-blue-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t p-3">
                <div className="flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Scrivi un messaggio..."
                    className="flex-1 text-sm"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputText.trim() || isTyping}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
