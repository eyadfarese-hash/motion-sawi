/* ==========================================================================
   SAWI — all editable content lives here.
   Change text, links and projects in this file; the pages update themselves.
   ========================================================================== */

window.SAWI = {

  /* ---------- Contact & links ---------- */
  email: "hello@sawi.studio",              // TODO: your real work email
  instagram: "https://instagram.com/sawi.motion",
  behance: "https://www.behance.net/",       // TODO: your Behance profile
  linkedin: "https://www.linkedin.com/",     // TODO: your LinkedIn profile
  company: "[Company]",                      // TODO: company you made these projects at (for credits)

  /* ---------- Projects ----------
     slug      → used in the link: project.html?p=slug
     layout    → card size on the home grid: "wide" | "large" | "tall" | "half"
     loop      → short muted video shown on the card (autoplays)
     film      → full film with sound for the project page
     vertical  → true for 9:16 films
     All text marked TODO is a draft — please review it.                     */
  projects: [
    {
      slug: "trust",
      title: "Trust",
      sector: "Construction",
      type: "Identity film",
      year: "",                             // TODO e.g. "2025"
      role: "Motion design, identity film",  // TODO confirm your role
      layout: "wide",
      duration: "0:30", format: "16:9", fps: "60 fps", res: "1920×1080",
      loop: "assets/media/trust-loop.mp4",
      film: "assets/media/trust-film.mp4",
      poster: "assets/media/trust-poster.jpg",
      intro: "Built right. Delivered on time. A new construction identity, introduced through one film.",
      challenge: "Introduce a new construction identity built on three values, accuracy, quality and modernity, and make people feel them instead of reading them.",
      decision: "The bracket inside the logo became the motion device. Shapes draw on like technical drawings, then lock into place with clean, measured moves, the way a build comes together.",
      result: "One film that carries the identity from concept to signage, uniforms and print, and a bracket transition the brand can keep reusing.",
      seen: ["Logo reveal", "Brand values", "Colour system", "Signage", "Uniforms", "Print"],
      device: "The bracket", personality: "Precise, measured",
      gallery: [
        { src: "assets/media/trust-1.jpg", caption: "The bracket, drawn on" },
        { src: "assets/media/trust-2.jpg", caption: "Signage" },
        { src: "assets/media/trust-3.jpg", caption: "Uniforms" }
      ]
    },
    {
      slug: "substance",
      title: "Substance",
      sector: "Coffee",
      type: "Brand film",
      year: "",
      role: "Motion design, brand film",
      layout: "large",
      duration: "0:37", format: "16:9", fps: "60 fps", res: "1920×1080",
      loop: "assets/media/substance-loop.mp4",
      film: "assets/media/substance-film.mp4",
      poster: "assets/media/substance-poster.jpg",
      intro: "Crafted coffee and refined experiences. A specialty coffee brand, revealed one layer at a time.",
      challenge: "Launch a specialty coffee brand whose promise is about origin, craft and precision, and show that care before anyone tastes the coffee.",
      decision: "Motion follows the idea of revealing the essence: the wordmark builds from its own circles, layers slide away to uncover product, and every move settles calmly.",
      result: "A launch film that takes the identity from bean to packaging, cups and in-store screens in one continuous story.",
      seen: ["Wordmark build", "Packaging", "Cups & carriers", "Menu", "In-store screens", "Posters"],
      device: "The reveal", personality: "Calm, crafted",
      gallery: [
        { src: "assets/media/substance-1.jpg", caption: "Wordmark construction" },
        { src: "assets/media/substance-2.jpg", caption: "In-store poster" },
        { src: "assets/media/substance-3.jpg", caption: "Packaging" }
      ]
    },
    {
      slug: "coastra",
      title: "Coastra",
      sector: "Fashion",
      type: "Brand reel",
      year: "",
      role: "Motion design, brand reel",
      layout: "tall",
      vertical: true,
      duration: "0:33", format: "9:16", fps: "60 fps", res: "1080×1920",
      loop: "assets/media/coastra-loop.mp4",
      film: "assets/media/coastra-film.mp4",
      poster: "assets/media/coastra-poster.jpg",
      intro: "Boundless Horizon. A menswear brand shaped by the sea, made for vertical screens.",
      challenge: "Introduce a menswear label built around the idea of a boundless horizon, in a format made for phones.",
      decision: "Slow, drifting movement taken from water and wind. The horizon line becomes the curve the logo is drawn from, and type glides rather than snaps.",
      result: "A vertical reel that feels like the brand: unhurried, open and coastal, ready for social from day one.",
      seen: ["Logo construction", "Script lockup", "Campaign", "Apparel", "Editorial layouts"],
      device: "The horizon line", personality: "Unhurried, open",
      gallery: [
        { src: "assets/media/coastra-1.jpg", caption: "Opening" },
        { src: "assets/media/coastra-2.jpg", caption: "Campaign collage" },
        { src: "assets/media/coastra-3.jpg", caption: "Editorial" }
      ]
    },
    {
      slug: "real-madrid-academy-kuwait",
      title: "Real Madrid Academy Kuwait",
      sector: "Sports",
      type: "Identity launch",
      year: "",
      role: "Motion design, identity launch",
      layout: "wide",
      duration: "0:34", format: "16:9", fps: "24 fps", res: "960×544",
      loop: "assets/media/rma-loop.mp4",
      film: "assets/media/rma-film.mp4",
      poster: "assets/media/rma-poster.jpg",
      intro: "Let your child train like a champion. A new visual identity for a football academy, in English and Arabic.",
      challenge: "Launch a new identity for a youth football academy that had to feel as big as the club and speak to parents in two languages.",
      decision: "Bold diagonal stripes and condensed type move with the energy of a match, held together by a strict grid so every player card and post stays consistent.",
      result: "A launch film plus a system of player cards, billboards and digital screens the academy can keep filling every season.",
      seen: ["Player cards", "Grid system", "Bilingual type", "Billboards", "Digital screens"],
      device: "The stripes", personality: "Energetic, bold",
      gallery: [
        { src: "assets/media/rma-1.jpg", caption: "Identity title" },
        { src: "assets/media/rma-2.jpg", caption: "Match-day posts" },
        { src: "assets/media/rma-3.jpg", caption: "Launch event" }
      ]
    }
  ]
};
