"use client";

import Script from "next/script";

const TawkToScript = () => {
  return (
    <Script
      src="https://embed.tawk.to/6713cb404304e3196ad44f3e/1iail3thg"
      strategy="afterInteractive" // Le script se charge après le rendu initial de la page
      async
    />
  );
};

export default TawkToScript;

// <!--Start of Tawk.to Script-->
// <script type="text/javascript">
// var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
// (function(){
// var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
// s1.async=true;
// s1.src='https://embed.tawk.to/6713cb404304e3196ad44f3e/1iail3thg';
// s1.charset='UTF-8';
// s1.setAttribute('crossorigin','*');
// s0.parentNode.insertBefore(s1,s0);
// })();
// </script>
// <!--End of Tawk.to Script-->
