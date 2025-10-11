"use client"; // 👈 Marks this as a Client Component so we can use hooks and the DOM API.

import { useTheme } from "next-themes"; // Used to match badge theme (light/dark) with your site's theme.
import dynamic from "next/dynamic";     // Used to disable SSR for this component.
import { useEffect, useState } from "react";

/**
 * LinkedinBadge
 * 
 * A safe, client-only LinkedIn badge component for Next.js App Router.
 * This component loads the official LinkedIn badge script dynamically
 * to avoid hydration mismatches and SSR issues.
 */
export function LinkedinBadge() {
  // Retrieve current theme ("light" or "dark") from next-themes provider
  const { theme } = useTheme();
  const [badgeKey, setbadgeKey] = useState(Date.now());

  useEffect(() => {
    setbadgeKey(Date.now())
  }, [theme])

  useEffect(() => {
    // This effect runs once when the component mounts (client-side only).

    // Create the LinkedIn badge script element
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";

    // Append the script to the document body
    // Doing this in useEffect ensures it only runs in the browser
    document.body.appendChild(script);

    // (Optional cleanup) Remove the script if the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [badgeKey]); // Empty dependency array = only run once on mount

  return (
    <div
      key={badgeKey}
      className="badge-base LI-profile-badge"
      data-locale="en_US"              // Badge language
      data-size="large"                // "small" | "medium" | "large"
      data-theme={theme ?? "light"}    // Match site theme or default to "light"
      data-type="VERTICAL"             // Layout type ("HORIZONTAL" also available)
      data-vanity="gurlivleen2000"     // Your LinkedIn vanity name (must match your profile URL)
      data-version="v1"
    >
      {/* The anchor text serves as a fallback if the badge fails to load */}
      <a
        className="badge-base__link LI-simple-link"
        href="https://www.linkedin.com/in/gurlivleen2000?trk=profile-badge"
        target="_blank"
      >
        Gurlivleen Singh Kainth
      </a>
    </div>
  );
}

/**
 * Default export (dynamic import)
 * 
 * - Uses Next.js dynamic() to disable SSR for this component.
 * - Prevents hydration mismatches by rendering only on the client.
 * - This is critical because LinkedIn’s script mutates the DOM,
 *   which breaks React’s SSR reconciliation if rendered server-side.
 */
export default dynamic(() => Promise.resolve(LinkedinBadge), {
  ssr: false, // No Server-Side Rendering — runs only in browser
});
