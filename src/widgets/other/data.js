// One object per project card. Order in this array = order rendered.
// Wider card = first item in the array (see the Saidalink note below).

export const otherProjectsData = {
  sectionLabel: "03 - OTHER",
  header: "OTHER PROJECTS",
  projects:[
  {
    id: "saidalink",
    name: "Saidalink",
    description: "ISP customer management platform. Led frontend and UI/UX design for a team of 5.",
    stack: ["React.js"],
    link: null,
    featured: true, // renders wider in the asymmetric grid
  },
  {
    id: "kikao-homes",
    name: "KIKAO Homes",
    description: "QR-based visitor access with real-time notifications and OTP.",
    stack: ["Flutter", "Firebase"],
    link: null,
    featured: false,
  },
  {
    id: "attachment-system",
    name: "Industrial Attachment System",
    description: "Digitized JKUAT's attachment process end to end, solo build. Now used by the university.",
    stack: ["React", "Node.js", "PostgreSQL"],
    link: null,
    featured: false,
  },
   {
    id: "kikao-home",
    name: "KIKAO Homes",
    description: "QR-based visitor access with real-time notifications and OTP.",
    stack: ["Flutter", "Firebase"],
    link: null,
    featured: false,
  },
]};
