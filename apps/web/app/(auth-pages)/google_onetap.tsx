"use client";
import { createClient } from "@/lib/supabase/client";
import { handleCredentialResponse } from "@/server.actions/auth/google.OneTap.actions";
import { CredentialResponse } from "google-one-tap";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const OneTapComponent = () => {
  const supabase = createClient();
  const router = useRouter();
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false); // State to track if the Google script is loaded

  const generateNonce = async (): Promise<[string, string]> => {
    const nonce = btoa(
      String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))),
    );
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(nonce),
    );
    const hashedNonce = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return [nonce, hashedNonce];
  };

  const handleCredential = async (
    response: CredentialResponse,
    nonce: string,
  ) => {
    try {
      const result = await handleCredentialResponse({ response, nonce });

      if (result.success) {
        console.log(result.message);
        const href = result.path || "/";
        router.push(href);
      } else {
        console.error("Erreur lors de la connexion :", result.error);
      }
    } catch (error) {
      // Log any errors that occur during authentication
      console.error("Error logging in:", error);
      router.push("/");
    }
  };

  useEffect(() => {
    if (googleScriptLoaded) {
      // Ensure that the script is loaded before initializing
      const initializeGoogleOneTap = async () => {
        const [nonce, hashedNonce] = await generateNonce();
        console.log("Nonce: ", nonce, hashedNonce);

        // Check for an existing session
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session", error);
          return;
        }
        if (data.session) {
          router.push("/");
          return;
        }

        // Initialize One Tap
        window.google?.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          nonce: hashedNonce,
          prompt_parent_id: "oneTap",
          cancel_on_tap_outside: false, // Prevent dismissal on outside click
          auto_select: false, // Disable auto-select for better control
          context: "use",
          ux_mode: "popup",
          itp_support: true, // Enable better support for ITP browsers
          use_fedcm_for_prompt: true, // Use FedCM for better prompt management
          intermediate_iframe_close_callback: () => {
            console.log("User closed the One Tap iFrame.");
          },
          callback: (response: CredentialResponse) =>
            handleCredential(response, nonce),
        });

        // Ensure the prompt is always displayed
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log("One Tap not displayed, forcing display...");
            window.google.accounts.id.prompt(); // Re-prompt if not displayed
          }
        });
      };

      initializeGoogleOneTap();
    }
  }, [googleScriptLoaded, supabase, router]); // Trigger the effect when the script is loaded

  return (
    <>
      {/* Load the Google script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={() => setGoogleScriptLoaded(true)} // Set the state when the script is loaded
      />
      <div id="oneTap" className="fixed top-20  right-0 z-[100]" />
    </>
  );
};

export default OneTapComponent;
