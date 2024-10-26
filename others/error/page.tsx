import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
    errorType = "404",
    errorMessage = "Page non trouvée",
}: {
    errorType?: string;
    errorMessage?: string;
}) {
    return (
        <div className="min-h-80 flex items-center justify-center bg-background p-4">
            <div className="max-w-md w-full">
                <Alert
                    variant="destructive"
                    className="mb-4"
                >
                    <XCircle className="h-4 w-4" />
                    <AlertTitle className="text-lg font-semibold">
                        Erreur {errorType}
                    </AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                        Nous sommes désolés, une erreur s'est produite. Veuillez
                        réessayer plus tard ou retourner à la page d'accueil.
                    </p>
                    <Link href="/">
                        <Button>Retour à l'accueil</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
