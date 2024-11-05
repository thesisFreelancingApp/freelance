import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getUsersData } from "@/server.actions/dashboard/users.action";
import type { UsersType } from "@/server.actions/dashboard/users.action";

// const users = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     email: "alice@example.com",
//     role: "USER",
//     lastLogin: "2023-04-01",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Bob Smith",
//     email: "bob@example.com",
//     role: "ADMIN",
//     lastLogin: "2023-04-02",
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Charlie Brown",
//     email: "charlie@example.com",
//     role: "USER",
//     lastLogin: "2023-04-03",
//     status: "Inactive",
//   },
//   {
//     id: 4,
//     name: "Diana Prince",
//     email: "diana@example.com",
//     role: "USER",
//     lastLogin: "2023-04-04",
//     status: "Active",
//   },
//   {
//     id: 5,
//     name: "Ethan Hunt",
//     email: "ethan@example.com",
//     role: "ADMIN",
//     lastLogin: "2023-04-05",
//     status: "Active",
//   },
// ];

export function UsersTab() {
  const [userData, setUserData] = useState<UsersType[] | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchUserData() {
      const { users, totalPages } = await getUsersData(page, 10);
      setUserData(users);
      setTotalPages(totalPages);
    }
    fetchUserData();
  }, [page]);

  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Manage user accounts, roles, and permissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell>{user?.lastLogin}</TableCell>
                <TableCell>
                  <Badge variant={user?.status === "Active" ? "default" : "secondary"}>
                    {user?.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-4">
          <Button disabled={page === 1} onClick={handlePrevious}>Previous</Button>
          <span>Page {page} of {totalPages}</span>
          <Button disabled={page === totalPages} onClick={handleNext}>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
}