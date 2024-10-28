import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Share2, ChevronLeft, ChevronRight } from 'lucide-react'

interface HomeComponentProps {
  addPoints: (amount: number) => void;
  translate?: (en: string, es: string) => string;
}

// Fallback translate function
const defaultTranslate = (en: string, es: string) => en;

export default function HomeComponent({ addPoints, translate = defaultTranslate }: HomeComponentProps) {
  const [question, setQuestion] = useState('')
  const [conversation, setConversation] = useState<{role: 'user' | 'assistant', content: string}[]>([])
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [shareText, setShareText] = useState('')

  const stories = [
    { id: 1, title: "Mom's Innovative Approach to Picky Eating", titleEs: "Enfoque innovador de una madre para niños quisquillosos con la comida", image: "/placeholder.svg?height=200&width=400", synopsis: "Learn how one mom transformed mealtime battles into fun food adventures.", synopsisEs: "Descubre cómo una madre transformó las batallas a la hora de comer en divertidas aventuras culinarias." },
    { id: 2, title: "The Power of Positive Reinforcement", titleEs: "El poder del refuerzo positivo", image: "/placeholder.svg?height=100&width=200", synopsis: "Discover effective ways to encourage good behavior in children.", synopsisEs: "Descubre formas efectivas de fomentar el buen comportamiento en los niños." },
    { id: 3, title: "Balancing Work and Motherhood", titleEs: "Equilibrando el trabajo y la maternidad", image: "/placeholder.svg?height=100&width=200", synopsis: "Tips from successful moms on managing career and family life.", synopsisEs: "Consejos de madres exitosas sobre cómo manejar la carrera y la vida familiar." },
    { id: 4, title: "Creating a Safe Sleep Environment", titleEs: "Creando un ambiente seguro para dormir", image: "/placeholder.svg?height=100&width=200", synopsis: "Expert advice on setting up the perfect nursery for your baby.", synopsisEs: "Consejos de expertos para preparar la habitación perfecta para tu bebé." },
    { id: 5, title: "Nutrition for Growing Minds", titleEs: "Nutrición para mentes en crecimiento", image: "/placeholder.svg?height=100&width=200", synopsis: "Explore the best foods to boost your child's cognitive development.", synopsisEs: "Explora los mejores alimentos para impulsar el desarrollo cognitivo de tu hijo." },
    { id: 6, title: "Fostering Creativity in Children", titleEs: "Fomentando la creatividad en los niños", image: "/placeholder.svg?height=100&width=200", synopsis: "Fun activities to nurture your child's imagination and artistic skills.", synopsisEs: "Actividades divertidas para nutrir la imaginación y las habilidades artísticas de tu hijo." },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      setConversation([...conversation, { role: 'user', content: question }])
      // Simulate AI response
      setTimeout(() => {
        setConversation(prev => [...prev, { role: 'assistant', content: translate(`This is a simulated AI response to: "${question}". In a real implementation, this would connect to an AI service using reliable medical sources.`, `Esta es una respuesta simulada de IA a: "${question}". En una implementación real, esto se conectaría a un servicio de IA utilizando fuentes médicas confiables.`) }])
        addPoints(5)
      }, 1000)
      setQuestion('')
    }
  }

  const handleShare = (e: React.FormEvent) => {
    e.preventDefault()
    if (shareText.trim()) {
      console.log(`Sharing "${shareText}" with friend or family member`)
      setShareText('')
      addPoints(5)
    }
  }

  const nextSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % (stories.length - 1))
  }

  const prevSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex - 1 + (stories.length - 1)) % (stories.length - 1))
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-2xl sm:text-[40pt] font-serif p-2 sm:p-4 text-center">
        {translate("Welcome Back Megan", "Bienvenida de nuevo Megan")}
      </div>
      <Card className="p-2 sm:p-4 bg-gray-50">
        <CardHeader>
          <CardTitle>{translate("Ask a Question", "Haz una pregunta")}</CardTitle>
          <CardDescription>{translate("Get answers from reliable medical sources", "Obtén respuestas de fuentes médicas confiables")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[100px] mb-4">
            {conversation.map((message, index) => (
              <div key={index} className={`mb-4 ${message.role === 'assistant' ? 'text-blue-600' : 'text-gray-800'}`}>
                <strong>{message.role === 'assistant' ? translate('AI: ', 'IA: ') : translate('You: ', 'Tú: ')}</strong>
                {message.content}
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input 
              placeholder={translate("Type your question here...", "Escribe tu pregunta aquí...")}
              value={question} 
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Send className="h-4 w-4" />
              <span className="sr-only">{translate("Send", "Enviar")}</span>
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="p-2 sm:p-4">
        <CardContent className="p-0">
          <img src={stories[0].image} alt={translate(stories[0].title, stories[0].titleEs)} className="w-full h-32 sm:h-48 object-cover" />
        </CardContent>
        <CardHeader>
          <CardTitle>{translate(stories[0].title, stories[0].titleEs)}</CardTitle>
          <CardDescription>{translate(stories[0].synopsis, stories[0].synopsisEs)}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <form onSubmit={handleShare} className="flex space-x-2">
            <Input 
              placeholder={translate("Share with friend or family...", "Compartir con amigo o familiar...")}
              value={shareText} 
              onChange={(e) => setShareText(e.target.value)}
              className="w-64"
            />
            <Button type="submit">
              <Share2 className="h-4 w-4 mr-2" />
              {translate("Share", "Compartir")}
            </Button>
          </form>
        </CardFooter>
      </Card>

      <div className="relative">
        <div className="flex overflow-x-auto sm:overflow-hidden">
          {stories.slice(1).map((story, index) => (
            <div
              key={story.id}
              className="flex-shrink-0 w-full sm:w-1/3 md:w-1/4 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              <Card className="mx-1 sm:mx-2 p-2 sm:p-4">
                <CardContent className="p-0">
                  <img src={story.image} alt={translate(story.title, story.titleEs)} className="w-full h-32 object-cover" />
                </CardContent>
                <CardHeader>
                  <CardTitle className="text-sm">{translate(story.title, story.titleEs)}</CardTitle>
                  <CardDescription className="text-xs">{translate(story.synopsis, story.synopsisEs)}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-0 transform -translate-y-1/2"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-0 transform -translate-y-1/2"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <NewsTicker translate={translate} />
      
      <RecentChats translate={translate} />
    </div>
  )
}

function NewsTicker({ translate = defaultTranslate }: { translate?: (en: string, es: string) => string }) {
  const [newsIndex, setNewsIndex] = useState(0)
  const news = [
    { en: "CDC recommends new COVID-19 booster for children under 5", es: "CDC recomienda nuevo refuerzo de COVID-19 para niños menores de 5 años" },
    { en: "Study shows benefits of early childhood education on long-term health", es: "Estudio muestra beneficios de la educación infantil temprana en la salud a largo plazo" },
    { en: "New legislation aims to improve maternal healthcare access", es: "Nueva legislación busca mejorar el acceso a la atención médica materna" },
    { en: "Experts emphasize importance of mental health support for new mothers", es: "Expertos enfatizan la importancia del apoyo de salud mental para nuevas madres" },
    { en: "Research reveals link between nutrition and cognitive development in infants", es: "Investigación revela vínculo entre nutrición y desarrollo cognitivo en bebés" }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setNewsIndex((prevIndex) => (prevIndex + 1) % news.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-purple-100 p-2 sm:p-4 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee">
        {news.map((item, index) => (
          <span key={index} className="inline-block px-4">{translate(item.en, item.es)}</span>
        ))}
      </div>
    </div>
  )
}

function RecentChats({ translate = defaultTranslate }: { translate?: (en: string, es: string) => string }) {
  const chats = [
    { id: 1, title: "Dealing with Toddler Tantrums", titleEs: "Lidiando con rabietas de niños pequeños", date: "2023-06-15" },
    { id: 2, title: "Healthy Meal Ideas for Picky Eaters", titleEs: "Ideas de comidas saludables para niños quisquillosos", date: "2023-06-14" },
    { id: 3, title: "Sleep Training Techniques", titleEs: "Técnicas de entrenamiento del sueño", date: "2023-06-13" },
  ]

  const verticalCards = [
    { id: 1, title: "Weekly Wellness Tips", titleEs: "Consejos semanales de bienestar", content: "Stay healthy with our curated wellness advice for moms.", contentEs: "Mantente saludable con nuestros consejos de bienestar seleccionados para madres." },
    { id: 2, title: "Parenting Book of the Month", titleEs: "Libro de crianza del mes", content: "Discover our top pick for insightful parenting literature.", contentEs: "Descubre nuestra mejor selección de literatura sobre crianza." },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">{translate("Recent Chats", "Chats recientes")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          {chats.map((chat) => (
            <Card key={chat.id} className="transform transition-all hover:scale-105 hover:shadow-lg p-2 sm:p-4">
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">{translate(chat.title, chat.titleEs)}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{chat.date}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        {verticalCards.map((card) => (
          <Card key={card.id} className="transform transition-all hover:scale-105 hover:shadow-lg p-2 sm:p-4">
            <CardHeader>
              <CardTitle className="text-sm sm:text-base">{translate(card.title, card.titleEs)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base">{translate(card.content, card.contentEs)}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">{translate("Learn More", "Saber más")}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}