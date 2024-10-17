const projects = [
  {
    title: "E-commerce Website Redesign",
    category: "Web Design",
    image: "https://via.placeholder.com/300x200.png?text=E-commerce+Website",
  },
  {
    title: "Brand Identity Package",
    category: "Graphic Design",
    image: "https://via.placeholder.com/300x200.png?text=Brand+Identity",
  },
  {
    title: "Mobile App Development",
    category: "App Development",
    image: "https://via.placeholder.com/300x200.png?text=Mobile+App",
  },
];

const RecentProjects = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-gray-800 text-center">
          Recent Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-yellow-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {project.title}
                </h3>
                <p className="text-yellow-600">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;
