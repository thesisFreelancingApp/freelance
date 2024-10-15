import Link from "next/link";

const Hero = () => {
    return (
        <section className=" text-white py-16">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
                <div className="text-center text-black dark:text-white md:text-left md:w-1/2">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                        Bienvenue sur{" "}
                        <span className="text-primary">Waia!</span> <br />
                        Trouvez les freelances dont vous avez besoin.
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        Plateforme positive et efficace pour connecter les
                        freelances avec des projets ambitieux.
                    </p>
                    <Link
                        className="bg-primary font-bold hover:bg-primary-foreground  text-gray-900 py-3 px-8 rounded-lg shadow-md  transition duration-300"
                        href="/signup"
                    >
                        Inscrivez-vous
                    </Link>
                </div>
                {/* <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                    <Image
                        src="/freelancer-hero.svg"
                        alt="Freelancer working"
                        width={500}
                        height={400}
                        className="rounded-lg shadow-md"
                    />
                </div> */}
            </div>
        </section>
    );
};

export default Hero;
