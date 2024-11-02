import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, FileText, Trash2, Send, Calendar, Clock, Share2, FileUp, CloudSun } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MyLibraryComponentProps {
  translate?: (en: string, es: string) => string;
}

interface WeatherStamp {
  temperature: number;
  condition: string;
}

interface LibraryItem {
  id: number;
  title: string;
  content: string;
  section: string;
  date: string;
  time: string;
  tags: string[];
  weatherStamp?: WeatherStamp;
}

// Simulated weather data fetching function
const fetchWeatherData = (date: string): WeatherStamp => {
  const randomTemp = Math.floor(Math.random() * 30) + 10; // Random temperature between 10°C and 40°C
  const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Windy'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  return { temperature: randomTemp, condition: randomCondition };
};

export default function Component({ translate: propTranslate }: MyLibraryComponentProps) {
  const translate = propTranslate || ((en: string) => en);

  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([
    // Billie's Care Log
    { id: 1, title: "Billie's Fever", content: "Billie had a fever of 101°F. Gave acetaminophen and monitored throughout the night. Fever broke by morning.", section: "Billie's Care Log", date: "2023-05-15", time: "20:30", tags: ["fever", "medication"] },
    { id: 2, title: "Billie's Rash", content: "Noticed a small rash on Billie's arm. Applied hydrocortisone cream. Will monitor for changes.", section: "Billie's Care Log", date: "2023-05-20", time: "10:15", tags: ["rash", "skin"] },
    { id: 3, title: "Billie's First Steps", content: "Billie took his first steps today! He managed to walk three steps before sitting down.", section: "Billie's Care Log", date: "2023-06-01", time: "18:45", tags: ["milestone", "walking"] },
    { id: 4, title: "Billie's Teething", content: "Billie seems to be teething. Gums are swollen and he's drooling more than usual. Using teething ring for relief.", section: "Billie's Care Log", date: "2023-06-10", time: "14:20", tags: ["teething", "discomfort"] },

    // Megan's Care Log
    { id: 5, title: "Megan's Vaccination", content: "Megan received her MMR vaccine. No immediate side effects observed. Will monitor for the next 48 hours.", section: "Megan's Care Log", date: "2023-06-01", time: "14:15", tags: ["vaccination", "MMR"] },
    { id: 6, title: "Megan's First Words", content: "Megan said 'mama' today! She's been babbling more frequently lately.", section: "Megan's Care Log", date: "2023-06-15", time: "09:30", tags: ["milestone", "language"] },
    { id: 7, title: "Megan's Sleep Schedule", content: "Started a new bedtime routine for Megan. She's now sleeping through the night more consistently.", section: "Megan's Care Log", date: "2023-06-20", time: "21:00", tags: ["sleep", "routine"] },

    // Q&A
    { id: 8, title: "Q&A: Fever Management", content: "Q&A about managing child fevers. Key points: stay hydrated, rest, when to call the doctor.", section: "Q&A", date: "2023-05-20", time: "10:00", tags: ["fever", "health tips"] },
    { id: 9, title: "Q&A: Picky Eating", content: "Strategies for dealing with picky eaters. Suggestions include involving kids in meal prep and offering variety.", section: "Q&A", date: "2023-06-05", time: "15:30", tags: ["nutrition", "behavior"] },
    { id: 10, title: "Q&A: Potty Training", content: "Tips for effective potty training. Discussed consistency, positive reinforcement, and patience.", section: "Q&A", date: "2023-06-18", time: "11:45", tags: ["potty training", "development"] },

    // Podcasts
    { id: 11, title: "Sleep Training Podcast", content: "Notes from sleep training podcast episode. Discussed cry-it-out method, gradual retreat, and bedtime routines.", section: "Podcasts", date: "2023-06-10", time: "22:00", tags: ["sleep training", "podcast"] },
    { id: 12, title: "Nutrition for Toddlers Podcast", content: "Podcast notes on balanced diets for toddlers. Covered importance of variety, portion sizes, and dealing with food refusal.", section: "Podcasts", date: "2023-06-20", time: "20:30", tags: ["nutrition", "podcast"] },
    { id: 13, title: "Positive Discipline Podcast", content: "Podcast discussing positive discipline techniques. Emphasized consistency, clear communication, and natural consequences.", section: "Podcasts", date: "2023-07-01", time: "19:15", tags: ["discipline", "podcast"] },

    // Doctor's Notes
    { id: 14, title: "Billie's Check-up", content: "Prepare questions about Billie's recent fever and sleep patterns. Don't forget to bring vaccination records.", section: "Doctor's Notes", date: "2023-07-01", time: "09:30", tags: ["check-up", "questions"] },
    { id: 15, title: "Megan's Allergy Consult", content: "Appointment for Megan's allergy testing. Bring food diary and list of observed reactions.", section: "Doctor's Notes", date: "2023-07-15", time: "14:00", tags: ["allergy", "testing"] },
    { id: 16, title: "Family Flu Shots", content: "Schedule flu shots for the whole family. Check if any new vaccinations are recommended.", section: "Doctor's Notes", date: "2023-08-01", time: "10:00", tags: ["vaccination", "preventive care"] },
  ])
  const [newItem, setNewItem] = useState({ title: '', content: '', date: '', time: '', tags: [] })
  const [activeSection, setActiveSection] = useState("Billie's Care Log")

  useEffect(() => {
    // Add weather stamps to existing items
    const itemsWithWeather = libraryItems.map(item => ({
      ...item,
      weatherStamp: fetchWeatherData(item.date)
    }));
    setLibraryItems(itemsWithWeather);
  }, []);

  const addItem = () => {
    if (newItem.title && newItem.content) {
      const weatherStamp = fetchWeatherData(newItem.date);
      setLibraryItems([...libraryItems, { id: Date.now(), ...newItem, section: activeSection, weatherStamp }])
      setNewItem({ title: '', content: '', date: '', time: '', tags: [] })
    }
  }

  const removeItem = (id: number) => {
    setLibraryItems(libraryItems.filter(item => item.id !== id))
  }

  const shareItem = (item: LibraryItem) => {
    console.log(`Sharing item: ${item.title}`)
    // Here you would implement the logic to share the item
  }

  const createPDF = (item: LibraryItem) => {
    console.log(`Creating PDF for item: ${item.title}`)
    // Here you would implement the logic to create a PDF
  }

  const sections = ["Billie's Care Log", "Megan's Care Log", "Q&A", "Podcasts", "Doctor's Notes"]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{translate("My Library", "Mi Biblioteca")}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{translate("Manage your files.", "Administra tus archivos.")}</p>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
          <Input
            placeholder={translate("File Title", "Título del Archivo")}
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="flex-grow"
          />
          <Input
            placeholder={translate("Content", "Contenido")}
            value={newItem.content}
            onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
            className="flex-grow"
          />
          <Input
            type="date"
            value={newItem.date}
            onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
            className="flex-grow"
          />
          <Input
            type="time"
            value={newItem.time}
            onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
            className="flex-grow"
          />
          <Button onClick={addItem} className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white">
            <Plus className="h-4 w-4 mr-2" />
            {translate("Add", "Añadir")}
          </Button>
        </div>

        <Tabs defaultValue="Billie's Care Log" className="w-full">
          <TabsList className="flex space-x-2 mb-4 overflow-x-auto">
            {sections.map((section) => (
              <TabsTrigger
                key={section}
                value={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-md ${activeSection === section ? "bg-purple-200 hover:bg-purple-300" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                <Button variant="ghost">{translate(section, section)}</Button>
              </TabsTrigger>
            ))}
          </TabsList>
          {sections.map((section) => (
            <TabsContent key={section} value={section}>
              <ScrollArea className="h-[400px] w-full border rounded-md p-4">
                {libraryItems.filter(item => item.section === section).map(item => (
                  <div key={item.id} className="flex items-center justify-between mb-2 hover:bg-gray-50 transition-colors duration-200">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-start mr-2 py-2 px-3 h-auto text-left">
                          <div className="flex items-center w-full">
                            <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                            <div className="text-left flex-grow">
                              <div className="font-semibold">{item.title}</div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {item.date}
                                <Clock className="h-3 w-3 ml-2 mr-1" />
                                {item.time}
                                {item.weatherStamp && (
                                  <span className="ml-2 flex items-center">
                                    <CloudSun className="h-3 w-3 mr-1" />
                                    {item.weatherStamp.temperature}°C, {item.weatherStamp.condition}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{item.title}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-2">
                          <p>{item.content}</p>
                          <div className="mt-4">
                            <strong>{translate("Date:", "Fecha:")}</strong> {item.date}
                          </div>
                          <div>
                            <strong>{translate("Time:", "Hora:")}</strong> {item.time}
                          </div>
                          {item.weatherStamp && (
                            <div>
                              <strong>{translate("Weather:", "Clima:")}</strong> {item.weatherStamp.temperature}°C, {item.weatherStamp.condition}
                            </div>
                          )}
                          <div className="mt-2">
                            <strong>{translate("Tags:", "Etiquetas:")}</strong> {item.tags.join(", ")}
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          {section === "Doctor's Notes" && (
                            <Button onClick={() => createPDF(item)}>
                              <FileUp className="h-4 w-4 mr-2" />
                              {translate("Create PDF", "Crear PDF")}
                            </Button>
                          )}
                          <Button onClick={() => shareItem(item)}>
                            <Send className="h-4 w-4 mr-2" />
                            {translate("Share", "Compartir")}
                          </Button>
                          <Button variant="destructive" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            {translate("Remove", "Eliminar")}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="ghost" onClick={() => shareItem(item)} className="p-2 hover:bg-gray-100 transition-colors duration-200">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}