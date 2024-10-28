import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Search, MessageCircle, BookOpen, Calendar, Star, Camera, Send, ChevronLeft, ChevronRight, Share2, Globe, Heart, X, Plus, Play } from 'lucide-react'

export default function Component() {
  const [activeTab, setActiveTab] = useState('home')
  const [points, setPoints] = useState(0)
  const [language, setLanguage] = useState('en')

  const addPoints = (amount: number) => {
    setPoints(prevPoints => prevPoints + amount)
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en')
  }

  const translate = (en: string, es: string) => {
    return language === 'en' ? en : es
  }

  return (
    <div className="flex flex-col min-h-screen bg-purple-50">
      {/* Header */}
      <header className="flex flex-wrap justify-between items-center p-4 bg-purple-600 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">Moms Kidz</h1>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={toggleLanguage}>
            <Globe className="h-4 w-4 mr-2" />
            {language === 'en' ? 'ES' : 'EN'}
          </Button>
          <Badge variant="secondary">{points} {translate("Points", "Puntos")}</Badge>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Navigation and Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
          <TabsTrigger value="home">{translate("Home", "Inicio")}</TabsTrigger>
          <TabsTrigger value="tapestry">{translate("Tapestry", "Tapiz")}</TabsTrigger>
          <TabsTrigger value="library">{translate("My Library", "Mi Biblioteca")}</TabsTrigger>
          <TabsTrigger value="carelog">{translate("Care Log", "Registro de Cuidados")}</TabsTrigger>
          <TabsTrigger value="milestones">{translate("Milestones", "Hitos")}</TabsTrigger>
          <TabsTrigger value="podcasts">{translate("Podcasts", "Podcasts")}</TabsTrigger>
        </TabsList>
        {/* Removed welcome message */}
        <div className="flex-grow overflow-auto p-4 sm:p-8">
          <TabsContent value="home">
            <HomeComponent addPoints={addPoints} translate={translate} />
          </TabsContent>
          <TabsContent value="tapestry">
            <TapestryComponent addPoints={addPoints} translate={translate} />
          </TabsContent>
          <TabsContent value="library">
            <MyLibraryComponent translate={translate} />
          </TabsContent>
          <TabsContent value="carelog">
            <CareLogComponent addPoints={addPoints} translate={translate} />
          </TabsContent>
          <TabsContent value="milestones">
            <MilestonesComponent addPoints={addPoints} translate={translate} />
          </TabsContent>
          <TabsContent value="podcasts">
            <PodcastsComponent translate={translate} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

function HomeComponent({ addPoints, translate }: { addPoints: (amount: number) => void, translate: (en: string, es: string) => string }) {
  const [question, setQuestion] = useState('')
  const [conversation, setConversation] = useState<{role: 'user' | 'assistant', content: string}[]>([])
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [shareText, setShareText] = useState('')

  const stories = [
    { id: 1, title: translate("Mom's Innovative Approach to Picky Eating", "Enfoque innovador de una madre para niños quisquillosos con la comida"), image: "/placeholder.svg?height=200&width=400", synopsis: translate("Learn how one mom transformed mealtime battles into fun food adventures.", "Descubre cómo una madre transformó las batallas a la hora de comer en divertidas aventuras culinarias.") },
    { id: 2, title: translate("The Power of Positive Reinforcement", "El poder del refuerzo positivo"), image: "/placeholder.svg?height=100&width=200", synopsis: translate("Discover effective ways to encourage good behavior in children.", "Descubre formas efectivas de fomentar el buen comportamiento en los niños.") },
    { id: 3, title: translate("Balancing Work and Motherhood", "Equilibrando el trabajo y la maternidad"), image: "/placeholder.svg?height=100&width=200", synopsis: translate("Tips from successful moms on managing career and family life.", "Consejos de madres exitosas sobre cómo manejar la carrera y la vida familiar.") },
    { id: 4, title: translate("Creating a Safe Sleep Environment", "Creando un ambiente seguro para dormir"), image: "/placeholder.svg?height=100&width=200", synopsis: translate("Expert advice on setting up the perfect nursery for your baby.", "Consejos de expertos para preparar la habitación perfecta para tu bebé.") },
    { id: 5, title: translate("Nutrition for Growing Minds", "Nutrición para mentes en crecimiento"), image: "/placeholder.svg?height=100&width=200", synopsis: translate("Explore the best foods to boost your child's cognitive development.", "Explora los mejores alimentos para impulsar el desarrollo cognitivo de tu hijo.") },
    { id: 6, title: translate("Fostering Creativity in Children", "Fomentando la creatividad en los niños"), image: "/placeholder.svg?height=100&width=200", synopsis: translate("Fun activities to nurture your child's imagination and artistic skills.", "Actividades divertidas para nutrir la imaginación y las habilidades artísticas de tu hijo.") },
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
          <img src={stories[0].image} alt={stories[0].title} className="w-full h-32 sm:h-48 object-cover" />
        </CardContent>
        <CardHeader>
          <CardTitle>{stories[0].title}</CardTitle>
          <CardDescription>{stories[0].synopsis}</CardDescription>
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
                  <img src={story.image} alt={story.title} className="w-full h-32 object-cover" />
                </CardContent>
                <CardHeader>
                  <CardTitle className="text-sm">{story.title}</CardTitle>
                  <CardDescription className="text-xs">{story.synopsis}</CardDescription>
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

function NewsTicker({ translate }: { translate: (en: string, es: string) => string }) {
  const [newsIndex, setNewsIndex] = useState(0)
  const news = [
    translate("CDC recommends new COVID-19 booster for children under 5", "CDC recomienda nuevo refuerzo de COVID-19 para niños menores de 5 años"),
    translate("Study shows benefits of early childhood education on long-term health", "Estudio muestra beneficios de la educación infantil temprana en la salud a largo plazo"),
    translate("New legislation aims to improve maternal healthcare access", "Nueva legislación busca mejorar el acceso a la atención médica materna"),
    translate("Experts emphasize importance of mental health support for new mothers", "Expertos enfatizan la importancia del apoyo de salud mental para nuevas madres"),
    translate("Research reveals link between nutrition and cognitive development in infants", "Investigación revela vínculo entre nutrición y desarrollo cognitivo en bebés")
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
          <span key={index} className="inline-block px-4">{item}</span>
        ))}
      </div>
    </div>
  )
}

function RecentChats({ translate }: { translate: (en: string, es: string) => string }) {
  const chats = [
    { id: 1, title: translate("Dealing with Toddler Tantrums", "Lidiando con rabietas de niños pequeños"), date: "2023-06-15" },
    { id: 2, title: translate("Healthy Meal Ideas for Picky Eaters", "Ideas de comidas saludables para niños quisquillosos"), date: "2023-06-14" },
    { id: 3, title: translate("Sleep Training Techniques", "Técnicas de entrenamiento del sueño"), date: "2023-06-13" },
  ]

  const verticalCards = [
    { id: 1, title: translate("Weekly Wellness Tips", "Consejos semanales de bienestar"), content: translate("Stay healthy with our curated wellness advice for moms.", "Mantente saludable con nuestros  consejos de bienestar seleccionados para madres.") },
    { id: 2, title: translate("Parenting Book of the Month", "Libro de crianza del mes"), content: translate("Discover our top pick for insightful parenting literature.", "Descubre nuestra mejor selección de literatura sobre crianza.") },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">{translate("Recent Chats", "Chats recientes")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          {chats.map((chat) => (
            <Card key={chat.id} className="transform transition-all hover:scale-105 hover:shadow-lg p-2 sm:p-4">
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">{chat.title}</CardTitle>
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
              <CardTitle className="text-sm sm:text-base">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base">{card.content}</p>
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


function TapestryComponent({ addPoints, translate }: { addPoints: (amount: number) => void, translate: (en: string, es: string) => string }) {
  const [activeStory, setActiveStory] = useState(0);
  const [activeTab, setActiveTab] = useState("feed");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [posts, setPosts] = useState([
    { id: 1, author: "Sarah M.", content: translate("Just discovered a great way to make veggies fun for kids!", "¡Acabo de descubrir una excelente manera de hacer que las verduras sean divertidas para los niños!"), likes: 15, comments: 2 },
    { id: 2, author: "Emily R.", content: translate("Any tips for dealing with toddler tantrums?", "¿Algún consejo para lidiar con las rabietas de los niños pequeños?"), likes: 8, comments: 3 },
    { id: 3, author: "Jessica T.", content: translate("Proud mom moment: My little one took her first steps today!", "Momento de orgullo materno: ¡Mi pequeño dio sus primeros pasos hoy!"), likes: 32, comments: 5 },
    { id: 4, author: "Laura K.", content: translate("Looking for book recommendations for toddlers. Any suggestions?", "Busco recomendaciones de libros para niños pequeños. ¿Alguna sugerencia?"), likes: 12, comments: 7 },
    { id: 5, author: "Megan P.", content: translate("Just meal prepped for the whole week. Feeling accomplished!", "Acabo de preparar las comidas para toda la semana. ¡Me siento realizada!"), likes: 28, comments: 4 },
    { id: 6, author: "Rachel S.", content: translate("First day back at work after maternity leave. Mixed emotions!", "Primer día de vuelta al trabajo después de la baja por maternidad. ¡Emociones encontradas!"), likes: 45, comments: 10 },
  ]);

  const [momsCommunity, setMomsCommunity] = useState([
    { id: 1, name: "Anna", image: "/placeholder.svg?height=50&width=50" },
    { id: 2, name: "Beth", image: "/placeholder.svg?height=50&width=50" },
    { id: 3, name: "Cathy", image: "/placeholder.svg?height=50&width=50" },
    { id: 4, name: "Diana", image: "/placeholder.svg?height=50&width=50" },
  ]);

  const stories = [
    { id: 1, title: translate("Overcoming Picky Eating", "Superando la alimentación selectiva"), author: translate("Nutritionist Dr. Smith", "Nutricionista Dra. Smith"), image: "/placeholder.svg?height=100&width=100" },
    { id: 2, title: translate("Sleep Training Success", "Éxito en el entrenamiento del sueño"), author: translate("Sleep Coach Johnson", "Entrenadora de sueño Johnson"), image: "/placeholder.svg?height=100&width=100" },
    { id: 3, title: translate("Balancing Work and Family", "Equilibrando trabajo y familia"), author: translate("Career Counselor Brown", "Consejera de carrera Brown"), image: "/placeholder.svg?height=100&width=100" },
  ];

  const handleNewPost = () => {
    addPoints(10);
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
    addPoints(1);
  };

  const handleAddMom = () => {
    const newMom = { id: momsCommunity.length + 1, name: `Mom ${momsCommunity.length + 1}`, image: "/placeholder.svg?height=50&width=50" };
    setMomsCommunity([...momsCommunity, newMom]);
  };

  const handleRemoveMom = (id: number) => {
    setMomsCommunity(momsCommunity.filter(mom => mom.id !== id));
  };

  const nextSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % Math.ceil(posts.length / 5));
  };

  const prevSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex - 1 + Math.ceil(posts.length / 5)) % Math.ceil(posts.length / 5));
  };

  return (
    <Card className="p-2 sm:p-4">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{translate("Tapestry", "Tapiz")}</CardTitle>
        <CardDescription className="text-sm sm:text-base">{translate("Connect with other moms and share your journey", "Conéctate con otras madres y comparte tu experiencia")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-base sm:text-lg font-semibold mb-2">{translate("Mom's Community", "Comunidad de Madres")}</h3>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {momsCommunity.map((mom) => (
              <div key={mom.id} className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={mom.image} alt={mom.name} />
                  <AvatarFallback>{mom.name[0]}</AvatarFallback>
                </Avatar>
                <button 
                  className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1"
                  onClick={() => handleRemoveMom(mom.id)}
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            <Button variant="outline" size="icon" onClick={handleAddMom}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-base sm:text-lg font-semibold mb-2">{translate("Featured Stories", "Historias Destacadas")}</h3>
          <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2">
            {stories.map((story, index) => (
              <Card 
                key={story.id} 
                className={`flex-shrink-0 w-48 sm:w-64 cursor-pointer transition-all ${index === activeStory ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => setActiveStory(index)}
                p-2 sm:p-4
              >
                <CardContent className="p-4">
                  <img src={story.image} alt={story.title} className="w-full h-32 object-cover mb-2 rounded" />
                  <h4 className="font-semibold">{story.title}</h4>
                  <p className="text-sm text-gray-600">{story.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="feed">{translate("Feed", "Noticias")}</TabsTrigger>
            <TabsTrigger value="community">{translate("Community", "Comunidad")}</TabsTrigger>
          </TabsList>
          <TabsContent value="feed">
            <Button onClick={handleNewPost} className="w-full mb-4">
              <Plus className="w-4 h-4 mr-2" /> {translate("Create New Post", "Crear Nueva Publicación")}
            </Button>
            <div className="relative">
              <div className="overflow-hidden">
                {[...Array(Math.ceil(posts.length / 5))].map((_, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateY(-${carouselIndex * 100}%)` }}
                  >
                    {posts.slice(pageIndex * 5, (pageIndex + 1) * 5).map(post => (
                      <div key={post.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{post.author}</p>
                            <p className="text-xs text-gray-500">{post.content}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                            <Heart className={`w-3 h-3 mr-1 ${post.likes > 0 ? 'fill-red-500' : ''}`} />
                            <span className="text-xs">{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            <span className="text-xs">{post.comments}</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="community">
            <div className="space-y-4">
              <Input placeholder={translate("Search communities...", "Buscar comunidades...")} />
              <ScrollArea className="h-[400px]">
                {/* Community content here */}
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function MyLibraryComponent({ translate }: { translate: (en: string, es: string) => string }) {
  const savedItems = [
    { id: 1, title: translate("Childhood Vaccines: What You Need to Know", "Vacunas infantiles: Lo que necesitas saber"), type: translate("Article", "Artículo") },
    { id: 2, title: translate("How to Handle Temper Tantrums", "Cómo manejar las rabietas"), type: translate("Q&A", "Preguntas y respuestas") },
    { id: 3, title: translate("Healthy Snacks for Kids", "Meriendas saludables para niños"), type: translate("Article", "Artículo") },
  ]

  return (
    <Card className="p-2 sm:p-4">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{translate("My Library", "Mi Biblioteca")}</CardTitle>
        <CardDescription className="text-sm sm:text-base">{translate("Your saved articles and Q&As", "Tus artículos y preguntas y respuestas guardados")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {savedItems.map(item => (
            <div key={item.id} className="flex justify-between items-center p-2 hover:bg-gray-100">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">{item.type}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <BookOpen className="h-4 w-4" />
                  <span className="sr-only">{translate("Open", "Abrir")}</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">{translate("Share", "Compartir")}</span>
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function CareLogComponent({ addPoints, translate }: { addPoints: (amount: number) => void, translate: (en: string, es: string) => string }) {
  const [note, setNote] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Care log note:", note)
    setNote('')
    addPoints(5)
  }

  return (
    <Card className="p-2 sm:p-4">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{translate("Care Log", "Registro de Cuidados")}</CardTitle>
        <CardDescription className="text-sm sm:text-base">{translate("Record health events and observations", "Registra eventos de salud y observaciones")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            placeholder={translate("Describe the health event...", "Describe el evento de salud...")}
            value={note} 
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="flex space-x-2">
            <Button type="button" variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              {translate("Add Photo", "Agregar Foto")}
            </Button>
            <Button type="submit">{translate("Save Note", "Guardar Nota")}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function MilestonesComponent({ addPoints, translate }: { addPoints: (amount: number) => void, translate: (en: string, es: string) => string }) {
  const milestones = [
    { id: 1, title: translate("First Smile", "Primera Sonrisa"), completed: true },
    { id: 2, title: translate("First Word", "Primera Palabra"), completed: false },
    { id: 3, title: translate("First Steps", "Primeros Pasos"), completed: false },
  ]

  return (
    <Card className="p-2 sm:p-4">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{translate("Milestones", "Hitos")}</CardTitle>
        <CardDescription className="text-sm sm:text-base">{translate("Track your child's developmental milestones", "Sigue los hitos del desarrollo de tu hijo")}</CardDescription>
      </CardHeader>
      <CardContent>
        {milestones.map(milestone => (
          <div key={milestone.id} className="flex items-center space-x-2 mb-2">
            <input 
              type="checkbox" 
              checked={milestone.completed} 
              onChange={() => addPoints(10)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm sm:text-base">{milestone.title}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function PodcastsComponent({ translate }: { translate: (en: string, es: string) => string }) {
  const podcasts = [
    { id: 1, title: translate("Parenting 101", "Crianza 101"), host: translate("Dr. Emily Johnson", "Dra. Emily Johnson"), duration: "45:00" },
    { id: 2, title: translate("Sleep Solutions", "Soluciones para dormir"), host: translate("Sarah Thompson", "Sarah Thompson"), duration: "30:00" },
    { id: 3, title: translate("Nutrition for Kids", "Nutrición para niños"), host: translate("Chef Michael Brown", "Chef Michael Brown"), duration: "40:00" },
  ]

  return (
    <Card className="p-2 sm:p-4">
      <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">{translate("Podcasts", "Podcasts")}</CardTitle>
        <CardDescription className="text-sm sm:text-base">{translate("Listen to expert advice on parenting", "Escucha consejos de expertos sobre crianza")}</CardDescription>
        <div className="mt-4">
          <iframe 
            src="https://podcasters.spotify.com/pod/show/moms-kidz/embed/episodes/Moms-Know-Health-e2pv5vm" 
            height="102px" 
            width="100%" 
            frameBorder="0" 
            scrolling="no"
            title="Moms Know Health Podcast"
          ></iframe>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px]">
          {podcasts.map(podcast => (
            <div key={podcast.id} className="flex justify-between items-center p-2 hover:bg-gray-100">
              <div>
                <p className="font-medium">{podcast.title}</p>
                <p className="text-sm text-gray-500">{podcast.host}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{podcast.duration}</span>
                <Button variant="ghost" size="sm">
                  <Play className="h-4 w-4" />
                  <span className="sr-only">{translate("Play", "Reproducir")}</span>
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}