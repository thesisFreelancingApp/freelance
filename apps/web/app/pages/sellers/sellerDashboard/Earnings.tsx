import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, ResponsiveContainer } from "recharts"

const earningsData = [
  { month: "Jan", earnings: 1000 },
  { month: "Feb", earnings: 1500 },
  { month: "Mar", earnings: 1200 },
  { month: "Apr", earnings: 1800 },
  { month: "May", earnings: 2000 },
  { month: "Jun", earnings: 2400 },
]

export function Earnings() {
  return (
    <Card className="col-span-4 bg-white text-black border border-gray-300">
      <CardHeader>
        <CardTitle>Earnings Summary</CardTitle>
        <CardDescription>Your earnings and payout information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <div className="flex flex-col space-y-1 flex-1">
              <span className="text-sm font-medium text-muted-foreground">Total Balance</span>
              <span className="text-2xl font-bold">$12,345.67</span>
            </div>
            <Button>Withdraw</Button>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Earnings Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={earningsData}>
                <Line type="monotone" dataKey="earnings" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
