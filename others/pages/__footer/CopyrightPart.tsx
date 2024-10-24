const CopyrightPart = () => {
  return (
    <div className="container flex flex-col justify-center gap-4 mx-auto md:flex-row md:gap-8">
      <p>
        Powered by{" "}
        <a
          href="https://www.rbktunisia.com/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          RBK
        </a>
      </p>
    </div>
  );
};

export default CopyrightPart;
