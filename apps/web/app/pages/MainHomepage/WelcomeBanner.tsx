"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Function to get the welcome message based on the hour
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Bonjour et bienvenue ! 🌞";
  } else if (hour < 18) {
    return "Bon après-midi et bienvenue parmi nous ! ☀️";
  } else {
    return "Bonsoir et bienvenue sur notre plateforme ! 🌜";
  }
}

function WelcomeBanner({
  user,
}: {
  user: { firstName: string; lastName: string; profilePic: string };
}) {
  return (
    <div className="flex flex-col items-center p-6 text-center rounded-lg bg-gradient-to-r from-gray-100 to-gray-300">
      <Avatar className="w-20 h-20">
        <AvatarImage src={user.profilePic} alt="Photo de profil utilisateur" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <h2 className="text-2xl font-semibold text-foreground">
        {getGreeting()}
      </h2>
      <p className="mt-2 text-muted-foreground">
        {getGreeting()}{" "}
        <span className="font-bold">
          {user.firstName} {user.lastName}
        </span>
        , nous sommes ravis de vous avoir ici ! Profitez de toutes les
        fonctionnalités que nous avons préparées pour vous.
      </p>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  buttonText,
  onClick,
}: {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground">
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mb-4">{description}</p>
      <Button onClick={onClick}>{buttonText}</Button>
    </div>
  );
}

export default function WelcomePage({
  user,
  userInfo,
}: {
  user: { firstName: string; lastName: string; profilePic: string };
  userInfo: {
    seller: boolean;
    buyer: boolean;
    wallet: boolean;
    isComplete: boolean;
  };
}) {
  const { seller, buyer, wallet, isComplete } = userInfo;

  return (
    <div className="flex flex-col">
      <main className="container flex-grow px-4 py-8 mx-auto">
        <h1 className="sr-only">Page d'accueil de bienvenue</h1>

        <WelcomeBanner user={user} />

        <section className="mt-12">
          <h2 className="mb-6 text-3xl font-bold text-center">
            Commencez votre aventure avec nous !
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            {/* Card prompting user to complete their profile */}
            {!isComplete && (
              <FeatureCard
                title="Complétez votre profil"
                description="Personnalisez votre expérience en ajoutant plus d’informations à votre profil."
                buttonText="Mettre à jour le profil"
                onClick={() => console.log("Mettre à jour le profil")}
              />
            )}

            {/* Cards for active features */}
            {seller && (
              <FeatureCard
                title="Gestion des services"
                description="Gérez vos services pour attirer plus de clients."
                buttonText="Gérer les services"
                onClick={() => console.log("Gérer les services")}
              />
            )}
            {buyer && (
              <FeatureCard
                title="Explorer les services"
                description="Recherchez des services qui répondent à vos besoins."
                buttonText="Explorer les services"
                onClick={() => console.log("Explorer les services")}
              />
            )}
            {wallet && (
              <FeatureCard
                title="Gérer votre portefeuille"
                description="Consultez et gérez vos finances sur la plateforme."
                buttonText="Voir le portefeuille"
                onClick={() => console.log("Voir le portefeuille")}
              />
            )}

            {/* Inverse cards for missing features */}
            {!seller && (
              <FeatureCard
                title="Devenez vendeur"
                description="Activez l'option de vente pour proposer vos services sur la plateforme."
                buttonText="Activer la vente"
                onClick={() => console.log("Activer la vente")}
              />
            )}
            {!buyer && (
              <FeatureCard
                title="Devenez acheteur"
                description="Accédez à des services proposés par notre communauté."
                buttonText="Activer l'achat"
                onClick={() => console.log("Activer l'achat")}
              />
            )}
            {!wallet && (
              <FeatureCard
                title="Configurer votre portefeuille"
                description="Ajoutez un portefeuille pour gérer vos transactions."
                buttonText="Configurer le portefeuille"
                onClick={() => console.log("Configurer le portefeuille")}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
