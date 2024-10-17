import { Search, FileText, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search for a service",
    description: "Browse through our wide range of services",
  },
  {
    icon: FileText,
    title: "Place an order",
    description: "Choose a service and submit your project details",
  },
  {
    icon: CheckCircle,
    title: "Get the job done",
    description: "Work with the freelancer and receive your completed project",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-yellow-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-16 text-gray-800 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-yellow-100 p-4 rounded-full">
                  <step.icon size={36} className="text-yellow-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
