import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  { Icon: FaGithub, href: "https://github.com/Tizul-Islam", label: "GitHub" },
  { Icon: FaLinkedin, href: "https://www.linkedin.com/in/tizul-islam", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-card-border py-12 text-center text-gray-400 font-inter">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 items-center text-left">
        <div>
          <Link href="#home" className="text-2xl font-bold text-white flex items-center gap-1 group w-max mb-4">
            <span className="text-accent group-hover:text-white transition-colors">&lt;</span>
            Tizul
            <span className="text-accent group-hover:text-white transition-colors">/&gt;</span>
          </Link>
          <p className="text-sm max-w-sm">
            Full stack–minded developer focused on React, Node.js, and clean UIs. Based in Dhaka, Bangladesh.
          </p>
          <div className="flex gap-4 mt-6">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-500 hover:text-accent transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="md:text-center text-sm space-y-3 flex flex-col items-start md:items-center">
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <Link href="#home" className="hover:text-accent transition-colors">Home</Link>
          <Link href="#about" className="hover:text-accent transition-colors">About</Link>
          <Link href="#projects" className="hover:text-accent transition-colors">Projects</Link>
          <Link href="#contact" className="hover:text-accent transition-colors">Contact</Link>
        </div>

        <div className="md:text-right text-sm flex flex-col items-start md:items-end w-full">
          <h4 className="text-white font-semibold mb-5">Connect with me</h4>
          <a href="mailto:tizulislamtt@gmail.com" className="hover:text-accent transition-colors">
            tizulislamtt@gmail.com
          </a>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-card-border/50 text-sm flex flex-wrap justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} K.M Tizul Islam. All rights reserved.</p>
        <p className="text-accent">Built with React & Next.js</p>
      </div>
    </footer>
  );
}
