import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const socialLinks = [
  { Icon: FaGithub, href: "https://github.com/Tizul-Islam", label: "GitHub" },
  { Icon: FaLinkedin, href: "https://www.linkedin.com/in/tizul-islam", label: "LinkedIn" },
  { Icon: FaFacebook, href: "https://www.facebook.com/tizulislamtt/", label: "Facebook" },
];

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-card-border/80 pt-16 pb-12 text-gray-400 font-inter">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-left">
        
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <Link href="#home" className="text-xl font-black text-white flex items-center gap-1 group w-max select-none">
            <span className="text-accent group-hover:-translate-x-1 transition-transform duration-300 font-bold">&lt;</span>
            <span className="tracking-wide">Tizul</span>
            <span className="text-accent group-hover:translate-x-1 transition-transform duration-300 font-bold">/&gt;</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Full-stack developer focused on React, Node.js, and crafting optimized user experiences. Based in Dhaka, Bangladesh.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-3.5 pt-2">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl bg-card-bg border border-card-border/70 flex items-center justify-center text-gray-500 hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 cursor-pointer shadow-md"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col space-y-3.5 md:items-center">
          <div className="w-full md:max-w-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-poppins">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {quickLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-[14px] text-gray-400 hover:text-accent hover:translate-x-1 transition-all duration-300 flex items-center gap-1"
                >
                  <span className="text-accent/30 text-[10px]">■</span> {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Connect Column */}
        <div className="flex flex-col space-y-4 md:items-end w-full">
          <div className="w-full md:max-w-xs md:text-right">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-poppins">
              Get in Touch
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              Have an idea, project, or role description? Drop a message.
            </p>
            <a 
              href="mailto:tizulislamtt@gmail.com" 
              className="text-[15px] font-semibold text-white hover:text-accent transition-colors block border border-card-border bg-card-bg/20 py-2.5 px-4 rounded-xl hover:border-accent/30 duration-300 w-max md:ml-auto"
            >
              tizulislamtt@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-card-border/40 text-[13px] flex flex-wrap justify-between items-center gap-4 text-gray-500">
        <p>&copy; {new Date().getFullYear()} K.M Tizul Islam. All rights reserved.</p>
        <p className="text-[13px] text-accent/80 font-semibold bg-accent/5 border border-accent/10 px-3 py-1 rounded-full font-inter">
          Built with React & Next.js
        </p>
      </div>
    </footer>
  );
}
