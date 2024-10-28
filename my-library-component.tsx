import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Book, Trash2 } from 'lucide-react'

interface MyLibraryComponentProps {
  translate?: (en: string, es: string) => string;
}

interface LibraryItem {
  id: number;
  title: string;
  author: string;
}

export default function MyLibraryComponent({ translate: propTranslate }: MyLibraryComponentProps) {
  const translate = propTranslate || ((en: string) => en);

  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([
    { id: 1, title: "The Baby Book", author: "William Sears" },
    { id: 2, title: "What to Expect: The First Year", author: "Heidi Murkoff" },
    { id: 3, title: "The Whole-Brain Child", author: "Daniel J. Siegel" },
  ])
  const [newItem, setNewItem] = useState({ title: '', author: '' })

  const addItem = () => {
    if (newItem.title && newItem.author) {
      setLibraryItems([...libraryItems, { id: Date.now(), ...newItem }])
      setNewItem({ title: '', author: '' })
    }
  }

  const removeItem = (id: number) => {
    setLibraryItems(libraryItems.filter(item => item.id !== id))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{translate("My Library", "Mi Biblioteca")}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{translate("Manage your parenting books and resources.", "Administra tus libros y recursos sobre crianza.")}</p>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
          <Input
            placeholder={translate("Book Title", "Título del Libro")}
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="flex-grow"
          />
          <Input
            placeholder={translate("Author", "Autor")}
            value={newItem.author}
            onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
            className="flex-grow"
          />
          <Button onClick={addItem} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            {translate("Add", "Añadir")}
          </Button>
        </div>

        <ScrollArea className="h-[400px] w-full border rounded-md p-4">
          {libraryItems.map(item => (
            <Card key={item.id} className="mb-4">
              <CardContent className="flex justify-between items-center p-4">
                <div className="flex items-center">
                  <Book className="h-6 w-6 mr-2 flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">{item.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{item.author}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="ml-2 flex-shrink-0">
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">{translate("Remove", "Eliminar")}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}