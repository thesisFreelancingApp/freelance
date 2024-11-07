import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Fonction pour obtenir le message de bienvenue en fonction de l'heure
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

export default function WelcomePage({
  user,
}: {
  user: { firstName: string; lastName: string; profilePic: string };
}) {
  return (
    <div className="flex flex-col">
      <main className="container flex-grow px-4 py-8 mx-auto">
        <h1 className="sr-only">Page d'accueil de bienvenue</h1>

        <WelcomeBanner user={user} />

        <section className="mt-12">
          <h2 className="mb-6 text-3xl font-bold text-center">
            Commencez votre aventure avec nous !
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 border rounded-lg bg-card text-card-foreground">
              <h3 className="mb-2 text-xl font-semibold">
                Complétez votre profil
              </h3>
              <p className="mb-4">
                Personnalisez votre expérience en ajoutant plus d’informations à
                votre profil.
              </p>
              <Button>Mettre à jour le profil</Button>
            </div>
            <div className="p-6 border rounded-lg bg-card text-card-foreground">
              <h3 className="mb-2 text-xl font-semibold">
                Découvrez nos fonctionnalités
              </h3>
              <p className="mb-4">
                Explorez toutes les possibilités que notre plateforme vous
                offre.
              </p>
              <Button>Commencer la visite</Button>
            </div>
            <div className="p-6 border rounded-lg bg-card text-card-foreground">
              <h3 className="mb-2 text-xl font-semibold">
                Connectez-vous avec d'autres membres
              </h3>
              <p className="mb-4">
                Rejoignez notre communauté et engagez des discussions
                enrichissantes.
              </p>
              <Button>Trouver des amis</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
