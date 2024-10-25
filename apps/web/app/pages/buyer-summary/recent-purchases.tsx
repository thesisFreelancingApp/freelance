import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Purchase {
  id: number
  name: string
  seller: string
  date: string
  amount: number
}

interface RecentPurchasesProps {
  purchases: Purchase[]
}

export function RecentPurchases({ purchases }: RecentPurchasesProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Achats Récents</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full">
          {purchases.map((purchase) => (
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
  )
}
