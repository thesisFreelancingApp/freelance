import { Card, CardContent } from "@/components/ui/card";
import {
  Code,
  Paintbrush,
  PenTool,
  Megaphone,
  Camera,
  Music,
} from "lucide-react";

const categories = [
  { name: "Web Development", icon: Code },
  { name: "Graphic Design", icon: Paintbrush },
  { name: "Writing", icon: PenTool },
  { name: "Marketing", icon: Megaphone },
  { name: "Video & Animation", icon: Camera },
  { name: "Music & Audio", icon: Music },
];

const PopularCategories = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6 flex flex-col items-center">
                <category.icon size={48} className="text-primary mb-4" />
                <h3 className="text-sm font-semibold text-center group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
