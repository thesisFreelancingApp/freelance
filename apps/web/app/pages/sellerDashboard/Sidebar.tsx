import { Button } from "@/components/ui/button"
import { Home, Package, DollarSign, MessageSquare, Star, CreditCard } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-white p-6 shadow-md">
      <div className="flex items-center mb-8">
        <Package className="h-6 w-6 text-blue-600 mr-2" />
        <span className="text-xl font-bold">SellerHub</span>
      </div>
      <nav className="space-y-2">
        <Button
          variant={activeTab === "overview" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("overview")}
        >
          <Home className="mr-2 h-4 w-4" /> Overview
        </Button>
        <Button
          variant={activeTab === "orders" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("orders")}
        >
          <Package className="mr-2 h-4 w-4" /> Orders
        </Button>
        <Button
          variant={activeTab === "earnings" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("earnings")}
        >
          <DollarSign className="mr-2 h-4 w-4" /> Earnings
        </Button>
        <Button
          variant={activeTab === "messages" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("messages")}
        >
          <MessageSquare className="mr-2 h-4 w-4" /> Messages
        </Button>
        <Button
          variant={activeTab === "reviews" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("reviews")}
        >
          <Star className="mr-2 h-4 w-4" /> Reviews
        </Button>
        <Button
          variant={activeTab === "analytics" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("analytics")}
        >
          <CreditCard className="mr-2 h-4 w-4" /> Analytics
        </Button>
      </nav>
    </aside>
  )
}