"use client"
import { useState } from 'react'
import { DollarSign, ShoppingBag, Briefcase } from "lucide-react"
import { StatCard } from '@/app/pages/buyer-summary/stat-card'
import { RecentPurchases } from '@/app/pages/buyer-summary/recent-purchases'
import { BuyerReviews } from '@/app/pages/buyer-summary/buyer-reviews'
import { SellerReviews } from '@/app/pages/buyer-summary/seller-reviews'
import {getSellerOverview} from '@/server.actions/seller-dashboard.actions'
// Fake data
const initialBuyerData = {
  totalSpent: 5280,
  totalAmount: 6500,
  totalServices: 15,
  totalProjects: 7,
  lastPurchases: [
    { id: 1, name: "Conception de logo", seller: "DesignPro", date: "15/06/2023", amount: 150 },
    { id: 2, name: "Développement de site Web", seller: "WebWizard", date: "10/06/2023", amount: 500 },
    { id: 3, name: "Rédaction de contenu", seller: "WordSmith", date: "05/06/2023", amount: 100 },
    { id: 4, name: "Optimisation SEO", seller: "SEOGuru", date: "01/06/2023", amount: 200 },
  ],
  reviews: {
    count: 12,
    averageRating: 4.7,
    recentComments: [
      { id: 1, service: "Conception de logo", rating: 5, comment: "Travail excellent ! Exactement ce que je voulais." },
      { id: 2, service: "Développement de site Web", rating: 4, comment: "Bon travail, quelques révisions mineures nécessaires." },
      { id: 3, service: "Rédaction de contenu", rating: 5, comment: "Contenu fantastique, je commanderai à nouveau !" },
    ],
  },
  sellerReviews: [
    { id: 1, seller: "DesignPro", service: "Conception de logo", rating: 5, comment: "Client très coopératif avec des demandes claires." },
    { id: 2, seller: "WebWizard", service: "Développement de site Web", rating: 4, comment: "Bon client, mais a demandé plusieurs révisions." },
    { id: 3, seller: "WordSmith", service: "Rédaction de contenu", rating: 5, comment: "Excellent client, communication claire et paiement rapide." },
    { id: 4, seller: "SEOGuru", service: "Optimisation SEO", rating: 5, comment: "Professionnel et compréhensif. Un plaisir de travailler avec lui." },
  ],
}

const BuyerDashboard=async() =>{
  const [buyerData, setBuyerData] = useState(initialBuyerData)
    const data = await getSellerOverview()
  const handleUpdateReview = (id: number, newRating: number, newComment: string) => {
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
      <h1 className="text-3xl font-bold mb-6">Tableau de bord de l'acheteur</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Dépenses Totales" value={`${buyerData.totalSpent.toLocaleString()} €`} icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} />
        <StatCard title="Montant Total" value={`${buyerData.totalAmount.toLocaleString()} €`} icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} />
        <StatCard title="Total des Services" value={buyerData.totalServices} icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />} />
        <StatCard title="Total des Projets" value={buyerData.totalProjects} icon={<Briefcase className="h-4 w-4 text-muted-foreground" />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RecentPurchases purchases={buyerData.lastPurchases} />
        <BuyerReviews 
          reviews={buyerData.reviews} 
          onUpdateReview={handleUpdateReview}
          onDeleteReview={handleDeleteReview}
        />
      </div>

      <SellerReviews reviews={buyerData.sellerReviews} />
    </div>
  )
}

export default BuyerDashboard