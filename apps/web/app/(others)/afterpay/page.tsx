"use client";

import { useState } from "react";

const SprintSimulation = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Configurer le projet", status: "Terminé" },
    { id: 2, name: "Définir les exigences", status: "Non commencé" },
    { id: 3, name: "Développer les composants UI", status: "En cours" },
  ]);

  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      user: "Alice",
      message: "Quel est l'état des composants UI ?",
      timestamp: "10:00",
    },
    {
      id: 2,
      user: "Bob",
      message: "Je travaille dessus, cela devrait bientôt être terminé.",
      timestamp: "10:15",
    },
  ]);

  const addDiscussion = (message) => {
    setDiscussions([
      ...discussions,
      {
        id: discussions.length + 1,
        user: "Vous",
        message,
        timestamp: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  return (
    <div className="flex w-full h-screen bg-gray-50">
      {/* Sidebar Filters */}
      <aside className="w-1/4 p-6 bg-white border-r-2 border-gray-300 shadow-md">
        <h3 className="mb-4 text-xl font-semibold">Filtres</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Numéro du Sprint
          </label>
          <select className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm">
            <option>Sélectionner le Sprint</option>
            <option>Sprint 1</option>
            <option>Sprint 2</option>
          </select>
        </div>
      </aside>

      {/* Main Sprint and Discussion Area */}
      <main className="w-3/4 p-8 space-y-8">
        {/* Sprint Section */}
        <section className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold">
            Sprint en cours : Sprint 1
          </h2>
          <p className="mb-4 text-gray-600">
            Objectif : Développer les composants UI
          </p>

          {/* Task List */}
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <span className="font-medium text-gray-700">{task.name}</span>
                <span
                  className={`text-sm font-semibold ${
                    task.status === "Terminé"
                      ? "text-green-500"
                      : task.status === "En cours"
                        ? "text-yellow-500"
                        : "text-gray-500"
                  }`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Discussion Section */}
        <section className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">Discussion</h2>
          <div className="mb-4 space-y-4 overflow-y-auto max-h-64">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="p-3 bg-gray-100 rounded-lg">
                <strong className="text-sm font-semibold text-gray-800">
                  {discussion.user}
                </strong>
                <p className="text-gray-700">{discussion.message}</p>
                <span className="text-xs text-gray-500">
                  {discussion.timestamp}
                </span>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <input
            type="text"
            placeholder="Écrire un message..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onKeyDown={(e) =>
              e.key === "Enter" &&
              e.target.value &&
              addDiscussion(e.target.value)
            }
          />
        </section>
      </main>
    </div>
  );
};

export default SprintSimulation;
