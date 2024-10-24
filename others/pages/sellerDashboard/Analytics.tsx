import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, ResponsiveContainer } from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const servicePerformance = [
  { name: "Logo Design", orders: 25, earnings: 3750 },
  { name: "Web Development", orders: 15, earnings: 7500 },
  { name: "SEO Optimization", orders: 10, earnings: 3000 },
]

export function Analytics() {
  return (
    <Card className="col-span-4 bg-white text-black border border-gray-300">
      <CardHeader>
        <CardTitle>Service Analytics</CardTitle>
        <CardDescription>Performance metrics for your services</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servicePerformance.map((service) => (
              <TableRow key={service.name}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell className="text-right">{service.orders}</TableCell>
                <TableCell className="text-right">${service.earnings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Service Earnings Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={servicePerformance}>
              <Bar dataKey="earnings" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
