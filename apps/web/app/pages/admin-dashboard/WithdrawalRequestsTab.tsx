
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/hooks/use-toast";

// Simulated data for withdrawal requests
const initialWithdrawals = [
  { id: 'WTH001', user: 'John Doe', amount: 500, requestDate: '2023-11-01' },
  { id: 'WTH002', user: 'Jane Smith', amount: 750, requestDate: '2023-11-02' },
  { id: 'WTH003', user: 'Bob Johnson', amount: 1000, requestDate: '2023-11-03' },
  { id: 'WTH004', user: 'Alice Brown', amount: 250, requestDate: '2023-11-04' },
  { id: 'WTH005', user: 'Charlie Davis', amount: 1500, requestDate: '2023-11-05' },
]

export function WithdrawalRequestsTab() {
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals)

  const handleApproveWithdrawal = (id: string) => {
    setWithdrawals(withdrawals.filter(withdrawal => withdrawal.id !== id))
    toast({
      title: "Withdrawal Approved",
      description: `Withdrawal ${id} has been approved successfully.`,
    })
  }

  const handleRejectWithdrawal = (id: string) => {
    setWithdrawals(withdrawals.filter(withdrawal => withdrawal.id !== id))
    toast({
      title: "Withdrawal Rejected",
      description: `Withdrawal ${id} has been rejected.`,
      variant: "destructive",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Withdrawal Requests</CardTitle>
        <CardDescription>Review and manage pending withdrawal requests</CardDescription>
      </CardHeader>
      <CardContent>
        {withdrawals.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawals.map((withdrawal) => (
                <TableRow key={withdrawal.id}>
                  <TableCell className="font-medium">{withdrawal.id}</TableCell>
                  <TableCell>{withdrawal.user}</TableCell>
                  <TableCell>${withdrawal.amount.toFixed(2)}</TableCell>
                  <TableCell>{withdrawal.requestDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-500 text-white hover:bg-green-600"
                        onClick={() => handleApproveWithdrawal(withdrawal.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleRejectWithdrawal(withdrawal.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No pending withdrawal requests.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}