'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign, ShoppingBag, Briefcase, Star, Pencil, Trash2 } from "lucide-react"

// Données factices
const initialBuyerData = {
  totalSpent: 5280,
  totalAmount: 6500,
  totalServices: 15,
  totalProjects: 7,
  lastPurchases: [
    { id: 1, name: "Conception de logo", seller: "DesignPro", date: "15/06/2023", amount: 150 },
    { id: 2, name: "Développement de site web", seller: "WebWizard", date: "10/06/2023", amount: 500 },
    { id: 3, name: "Rédaction de contenu", seller: "WordSmith", date: "05/06/2023", amount: 100 },
    { id: 4, name: "Optimisation SEO", seller: "SEOGuru", date: "01/06/2023", amount: 200 },
  ],
  reviews: {
    count: 12,
    averageRating: 4.7,
    recentComments: [
      { id: 1, service: "Conception de logo", rating: 5, comment: "Excellent travail ! Exactement ce que je voulais." },
      { id: 2, service: "Développement de site web", rating: 4, comment: "Bon travail, révisions mineures nécessaires." },
      { id: 3, service: "Rédaction de contenu", rating: 5, comment: "Contenu fantastique, je commanderai à nouveau !" },
    ],
  },
}

export default function TableauDeBordAcheteur() {
  const [buyerData, setBuyerData] = useState(initialBuyerData)
  const [editingReview, setEditingReview] = useState(null)

  const handleUpdateReview = (id: number, newRating: number, newComment: FormDataEntryValue | null) => {
    const updatedReviews = buyerData.reviews.recentComments.map(review =>
      review.id === id ? { ...review, rating: newRating, comment: newComment } : review
    )
    setBuyerData({
      ...buyerData,
      reviews: {
        ...buyerData.reviews,
        recentComments: updatedReviews,
      },
    })
    setEditingReview(null)
  }

  const handleDeleteReview = (id: number) => {
    const updatedReviews = buyerData.reviews.recentComments.filter(review => review.id !== id)
    setBuyerData({
      ...buyerData,
      reviews: {
        ...buyerData.reviews,
        recentComments: updatedReviews,
        count: buyerData.reviews.count - 1,
      },
    })
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord récapitulatif de l'acheteur</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total dépensé</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buyerData.totalSpent.toLocaleString()} €</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Montant total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buyerData.totalAmount.toLocaleString()} €</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des services</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buyerData.totalServices}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des projets</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{buyerData.totalProjects}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Derniers achats</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full">
              {buyerData.lastPurchases.map((purchase) => (
                <div key={purchase.id} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{purchase.name}</p>
                    <p className="text-sm text-muted-foreground">Vendeur : {purchase.seller}</p>
                    <div className="flex items-center pt-2">
                      <span className="text-xs text-muted-foreground">{purchase.date}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {purchase.amount} €
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Avis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="text-xl font-bold">{buyerData.reviews.averageRating}</span>
              <span className="text-sm text-muted-foreground">({buyerData.reviews.count} avis)</span>
            </div>
            <ScrollArea className="h-[280px] w-full">
              {buyerData.reviews.recentComments.map((review) => (
                <div key={review.id} className="mb-4 border-b pb-4 last:mb-0 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{review.service[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{review.service}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="ml-auto flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Mettre à jour l'avis</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={(e) => {
                            e.preventDefault()
                            const formData = new FormData(e.target)
                            handleUpdateReview(review.id, parseInt(formData.get('rating')), formData.get('comment'))
                          }}>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="rating" className="text-right">
                                  Note
                                </Label>
                                <Input
                                  id="rating"
                                  name="rating"
                                  type="number"
                                  defaultValue={review.rating}
                                  min="1"
                                  max="5"
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="comment" className="text-right">
                                  Commentaire
                                </Label>
                                <Textarea
                                  id="comment"
                                  name="comment"
                                  defaultValue={review.comment}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <Button type="submit">Mettre à jour l'avis</Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteReview(review.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}