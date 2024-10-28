"use client";

import { useEffect, useState } from "react";
import {
  getSellerOverview,
  getSellerServices,
  getActiveOrders,
  getSellerMessages,
} from "@/server.actions/seller-dashboard.actions";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  BarChart3,
  Bell,
  MessageSquare,
  Package,
  Plus,
  Search,
  Star,
  DollarSign,
  Briefcase,
  Users,
} from "lucide-react";
import Loader from "@/app/loading";
import Link from "next/link";
import { getAllCategories } from "@/server.actions/category/category.actions";

// Add a currency formatter helper at the top of your file
const formatTND = (amount: number) => {
  return new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency: "TND",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(amount);
};

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // State for data
  const [overview, setOverview] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  // Add state for revenue data
  const [revenueData, setRevenueData] = useState<
    { name: string; total: number }[]
  >([]);

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );

  useEffect(() => {
    async function loadData() {
      try {
        const [
          overviewData,
          servicesData,
          ordersData,
          messagesData,
          categoriesData,
        ] = await Promise.all([
          getSellerOverview(),
          getSellerServices(),
          getActiveOrders(),
          getSellerMessages(),
          getAllCategories(), // Use the existing categories function
        ]);

        setOverview(overviewData);
        setServices(servicesData);
        setOrders(ordersData);
        setMessages(messagesData);
        // Set the revenue data from the overview
        setRevenueData(overviewData.monthlyRevenue);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Filter services based on search and category
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (serviceFilter === "all" ||
        service.category.toLowerCase() === serviceFilter.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">
        Bienvenue, {overview?.sellerName || "Vendeur"}!
      </h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="earnings">Revenus</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Revenus Totaux
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatTND(overview?.totalEarnings || 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% par rapport au mois dernier
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Commandes Actives
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 depuis hier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Note Vendeur
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">
                  +0.2 depuis le mois dernier
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taux de Complétion
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">
                  +2% depuis le mois dernier
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenus Mensuels</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={revenueData}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value} TND`}
                    />
                    <Bar
                      dataKey="total"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Services les Plus Performants</CardTitle>
                <CardDescription>
                  Vos meilleurs services ce mois-ci
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {services.slice(0, 3).map((service) => (
                    <div key={service.id} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={`/placeholder-${service.category.toLowerCase()}.jpg`}
                          alt={service.name}
                        />
                        <AvatarFallback>{service.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {service.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.category}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {formatTND(service.orders)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gérer les Services</CardTitle>
              <CardDescription>Créez et gérez vos services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Rechercher des services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-[300px]"
                  />
                  <Select
                    value={serviceFilter}
                    onValueChange={setServiceFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrer par catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les Catégories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.name.toLowerCase()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button asChild>
                  <Link href="/createGig">
                    <Plus className="mr-2 h-4 w-4" /> Créer un Nouveau Service
                  </Link>
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom du Service</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Commandes</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">
                        {service.name}
                      </TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell>{service.orders}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 text-yellow-400" />
                          {service.rating}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost">Modifier</Button>
                        <Button variant="ghost" className="text-red-500">
                          Supprimer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commandes Actives</CardTitle>
              <CardDescription>Gérez vos services en cours</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Commande</TableHead>
                    <TableHead>Acheteur</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date Limite</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.buyer}</TableCell>
                      <TableCell>{order.service}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "En Cours"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.dueDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost">Voir les Détails</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Communiquez avec vos clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-muted"
                  >
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt={message.from}
                      />
                      <AvatarFallback>
                        {message.from
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{message.from}</p>
                      <p className="text-sm text-muted-foreground">
                        {message.subject}
                      </p>
                      <p className="text-sm">{message.preview}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {message.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" /> Voir Tous les
                Messages
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aperçu des Revenus</CardTitle>
              <CardDescription>Votre performance financière</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium">Revenus Totaux</h4>
                  <div className="text-2xl font-bold">
                    {formatTND(overview?.totalEarnings || 0)}
                  </div>
                  <Progress value={75} className="mt-2" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    75% de votre objectif de revenus
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">
                    En Attente de Validation
                  </h4>
                  <div className="text-2xl font-bold">{formatTND(3500.0)}</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Validation prévue dans 7 jours
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">
                    Disponible pour Retrait
                  </h4>
                  <div className="text-2xl font-bold">{formatTND(12750.5)}</div>
                  <Button className="mt-2">Retirer les Fonds</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
