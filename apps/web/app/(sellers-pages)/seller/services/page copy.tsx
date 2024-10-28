"use client";
// Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getServicesByUser } from "@/server.actions/services";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";

// Types
interface Service {
  id: string;
  name: string;
  description: string;
  images: string[];
}

// Composant de gestion des services
const ManageServicesPage = ({ userId }: { userId: string }) => {
  const [services, setServices] = useState<Service[]>([]);

  // Récupérer les services de l'utilisateur
  useEffect(() => {
    const fetchServices = async () => {
      const userServices = await getServicesByUser(userId);
      setServices(userServices);
    };

    fetchServices();
  }, [userId]);

  const handleEditService = (serviceId: string) => {
    // Redirige vers la page d'édition avec l'ID du service
    console.log(`Editing service with ID: ${serviceId}`);
  };

  const handleDeleteService = (serviceId: string) => {
    // Appel de suppression du service
    console.log(`Deleting service with ID: ${serviceId}`);
  };

  return (
    <div className="container px-4 py-8 mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Mes Services</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4 p-4">
              <img
                src={service.images[0] || "/default-image.jpg"}
                alt={service.name}
                className="object-cover w-12 h-12 rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{service.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {service.description?.slice(0, 50) || "Aucune description"}...
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between p-4">
              <Button
                variant="outline"
                onClick={() => handleEditService(service.id)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteService(service.id)}
              >
                <Trash className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageServicesPage;
