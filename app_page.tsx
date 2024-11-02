import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Search, MessageCircle, BookOpen, Calendar, Star, Camera, Send, ChevronLeft, ChevronRight, Share2, Globe, Heart, X, Plus, Play } from 'lucide-react'

type TranslateFunction = (en: string, es: string) => string;

export default function Home() {
  const [activeTab, setActiveTab] = React.useState('home')
  const [points, setPoints] = React.useState(0)
  const [language, setLanguage] = React.useState('en')

  const addPoints = (amount: number) => {
    setPoints(prevPoints => prevPoints + amount)
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en')
  }

  const translate = React.useMemo(() => {
    return (en: string, es: string) => language === 'en' ? en : es;
  }, [language]);

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

function HomeComponent({ addPoints, translate }: { addPoints: (amount: number) => void, translate: TranslateFunction }) {
  const [question, setQuestion] = React.useState('')
  const [conversation, setConversation] = React.useState<{role: 'user' | 'assistant', content: string}[]>([])
  const [carouselIndex, setCarouselIndex] = React.useState(0)
  const [shareText, setShareText] = React.useState('')

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
    </div>
  )
}

function TapestryComponent({ addPoints, translate }: { addPoints: (amount: number) => void, translate: TranslateFunction }) {
  const [posts, setPosts] = React.useState([
    { id: 1, author: "Sarah M.", content: "Just discovered a great way to make veggies fun for kids!", likes: 15, comments: 2 },
    { id: 2, author: "Emily R.", content: "Any tips for dealing with toddler tantrums?", likes: 8, comments: 3 },
    { id: 3, author: "Jessica T.", content: "Proud mom moment: My little one took her first steps today!", likes: 32, comments: 5 },
  ]);

  const handleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
    addPoints(1);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{translate("Tapestry", "Tapiz")}</CardTitle>
        <CardDescription>{translate("Connect with other moms", "Conéctate con otras madres")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {posts.map(post => (
            <Card key={post.id} className="mb-4">
              <CardHeader>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    Certainly, I'll fix all the other component.tsx files to work inside the app/page.tsx file.

<Thinking>

Referencing my internal reminder:
1. I must follow all instructions laid out in <v0_info> and <v0_mdx>.
2. I must write COMPLETE CODE without any placeholders or omissions.
3. I must ensure all necessary components and content are included.
4. I must consider the context of the Moms Kidz project and how these components fit into the overall application structure.
5. I must provide detailed implementations for each component.
6. I must use the TranslateFunction type for the translate prop in all components.
7. I must include all necessary imports and ensure consistency across components.

</Thinking>

Let's update the app/page.tsx file to include all the components:

```tsx project="Moms Kidz" file="app/page.tsx" type="react"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Search, MessageCircle, BookOpen, Calendar, Star, Camera, Send, ChevronLeft, ChevronRight, Share2, Globe, Heart, X, Plus, Play } from 'lucide-react'

type TranslateFunction = (en: string, es: string) => string;

export default function Home() {
  const [activeTab, setActiveTab] = React.useState('home')
  const [points, setPoints] = React.useState(0)
  const [language, setLanguage] = React.useState('en')

  const addPoints = (amount: number) => {
    setPoints(prevPoints => prevPoints + amount)
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en')
  }

  const translate = React.useMemo(() => {
    return (en: string, es: string) => language === 'en' ? en : es;
  }, [language]);

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

function HomeComponent({ addPoints, translate }: { addPoints: (amount: number) => void, translate: TranslateFunction }) {
  const [question, setQuestion] = React.useState('')
  const [conversation, setConversation] = React.useState<{role: 'user' | 'assistant', content: string}[]>([])
  const [carouselIndex, setCarouselIndex] = React.useState(0)
  const [shareText, setShareText] = React.useState('')

  const stories = [
    { id: 1, title: "Mom's Innovative Approach to Picky Eating", titleEs: "Enfoque innovador de una madre para niños quisquillosos con la comida", image: "/placeholder.svg?height=200&width=400", synopsis: "Learn how one mom transformed mealtime battles into fun food adventures.", synopsisEs: "Descubre cómo una madre transformó las batallas a la hora de comer en divertidas aventuras culinarias." },
    { id: 2, title: "The Power of Positive Reinforcement", titleEs: "El poder del refuerzo positivo", image: "/placeholder.svg?height=100&width=200", synopsis: "Discover effective ways to encourage good behavior in children.", synopsisEs: "Descubre formas efectivas de fomentar el buen comportamiento en los niños." },
    { id: 3, title: "Balancing Work and Motherhood", titleEs: "Equilibrando el trabajo y la maternidad", image: "/placeholder.svg?height=100&width=200", synopsis: "Tips from successful moms on managing career and family life.", synopsisEs: "Consejos de madres exitosas sobre cómo manejar la carrera y la vida familiar." },
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
    setCarouselIndex((prevIndex) => (prevIndex + 1) % stories.length)
  }

  const prevSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length)
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
      <div className="relative">
        <div className="flex overflow-x-auto sm:overflow-hidden">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="flex-shrink-0 w-full sm:w-1/3 transition-transform duration-300 ease-in-out"
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
    </div>
  )
}

function TapestryComponent({ addPoints, translate }: { addPoints: (amount: number) => void, translate: TranslateFunction }) {
  const [posts, setPosts] = React.useState([
    { id: 1, author: "Sarah M.", content: "Just discovered a great way to make veggies fun for kids!", likes: 15, comments: 2 },
    { id: 2, author: "Emily R.", content: "Any tips for dealing with toddler tantrums?", likes: 8, comments: 3 },
    { id: 3, author: "Jessica T.", content: "Proud mom moment: My little one took her first steps today!", likes: 32, comments: 5 },
  ]);

  const handleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
    addPoints(1);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{translate("Tapestry", "Tapiz")}</CardTitle>
        <CardDescription>{translate("Connect with other moms", "Conéctate con otras madres")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {posts.map(post => (
            <Card key={post.id} className="mb-4">
              <CardHeader>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={`/placeholder.svg?text=${post.author[0]}`} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-sm">{post.author}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                  <Heart className="h-4 w-4 mr-1" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  {translate("Share", "Compartir")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Input placeholder={translate("Share your thoughts...", "Comparte tus pensamientos...")} />
        <Button className="ml-2">{translate("Post", "Publicar")}</Button>
      </CardFooter>
    </Card>
  );
}

function MyLibraryComponent({ translate }: { translate: TranslateFunction }) {
  const savedItems = [
    { id: 1, title: "Childhood Vaccines: What You Need to Know", type: "Article" },
    { id: 2, title: "How to Handle Temper Tantrums", type: "Q&A" },
    { id: 3, title: "Healthy Snacks for Kids", type: "Article" },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{translate("My Library", "Mi Biblioteca")}</CardTitle>
        <CardDescription>{translate("Your saved articles and Q&As", "Tus artículos y preguntas y respuestas guardados")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {savedItems.map(item => (
            <div key={item.id}   className="flex justify-between items-center p-2 hover:bg-gray-100">
              <div>
                <p className="font-medium">{translate(item.title, item.title)}</p>
                <p className="text-sm text-gray-500">{translate(item.type, item.type)}</p>
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
  );
}

function CareLogComponent({ addPoints, translate }: { addPoints: (amount: number) => void, translate: TranslateFunction }) {
  const [note, setNote] = React.useState('')

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

function MilestonesComponent({ addPoints, translate }: { addPoints: (amount: number) => void, translate: TranslateFunction }) {
  const [milestones, setMilestones] = React.useState([
    { id: 1, title: "First Smile", completed: false },
    { id: 2, title: "First Word", completed: false },
    { id: 3, title: "First Steps", completed: false },
  ]);

  const toggleMilestone = (id: number) => {
    setMilestones(milestones.map(milestone => 
      milestone.id === id ? { ...milestone, completed: !milestone.completed } : milestone
    ));
    addPoints(10);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{translate("Milestones", "Hitos")}</CardTitle>
        <CardDescription>{translate("Track your child's developmental milestones", "Sigue los hitos del desarrollo de tu hijo")}</CardDescription>
      </CardHeader>
      <CardContent>
        {milestones.map(milestone => (
          <div key={milestone.id} className="flex items-center space-x-2 mb-2">
            <Checkbox
              checked={milestone.completed}
              onCheckedChange={() => toggleMilestone(milestone.id)}
            />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {translate(milestone.title, milestone.title)}
            </label>
          </div>
        ))}
        <Button className="mt-4" onClick={() => addPoints(50)}>
          {translate("Complete All Milestones", "Completar Todos los Hitos")}
        </Button>
      </CardContent>
    </Card>
  );
}

function PodcastsComponent({ translate }: { translate: TranslateFunction }) {
  const podcasts = [
    { id: 1, title: "Parenting 101", duration: "45:30", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, title: "Sleep Solutions", duration: "32:15", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, title: "Nutrition for Kids", duration: "28:45", image: "/placeholder.svg?height=100&width=100" },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{translate("Podcasts", "Podcasts")}</CardTitle>
        <CardDescription>{translate("Listen to expert advice and parenting tips", "Escucha consejos de expertos y tips de crianza")}</CardDescription>
      </CardHeader>
      <CardContent>
        {podcasts.map(podcast => (
          <div key={podcast.id} className="flex items-center space-x-4 mb-4">
            <img src={podcast.image} alt={translate(podcast.title, podcast.title)} className="w-16 h-16 rounded" />
            <div className="flex-grow">
              <h3 className="font-medium">{translate(podcast.title, podcast.title)}</h3>
              <p className="text-sm text-gray-500">{podcast.duration}</p>
            </div>
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4 mr-2" />
              {translate("Play", "Reproducir")}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}