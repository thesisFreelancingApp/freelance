import Link from "next/link";

export default function Composant() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <div className="w-12 h-12 mx-auto text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oups, quelque chose s'est mal passé !
        </h1>
        <p className="mt-4 text-muted-foreground">
          Nous sommes désolés, une erreur inattendue est survenue. Veuillez
          réessayer plus tard ou contacter le support si le problème persiste.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Retour à la page d'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
