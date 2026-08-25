import { Globe, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";


export const site = {
  name: "PURITY CHELAGAT SANG",
  shortName: "PURITY SANG",
  role: "Flutter & Full-Stack Developer",
  email: "puritysang180@gmail.com",
  accentColor: "#E63E7F",
  bgColor: "#07081C",

  social: [
    {
      icon: FaLinkedin,
      link: "https://linkedin.com/in/puritysang-dev",
      type: "link",
    },
    { icon: FaGithub, link: "https://github.com/Purity-dev-614E", type: "link" },
    // { icon: Globe, link: "https://safariconnect.org", type: "link" },
    { icon: Mail, link: "puritysang180@gmail.com", type: "email" },
  ],

  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Right Now", href: "#rn" },
    { label: "Contact", href: "#contact" },
  ],
};
