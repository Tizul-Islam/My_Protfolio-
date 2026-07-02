"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SectionHeading from "./SectionHeading";
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlinePhone,
} from "react-icons/hi";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    setLoading(true);
    setSuccess("");

    emailjs.sendForm(
      "service_6inbh2b",
      "template_4lhs54q",
      form.current,
      "HIfXLcrL3TVIUpcU6"
    )
      .then(
        () => {
          setLoading(false);
          setSuccess("Message sent successfully!");
        },
        (error) => {
          console.error(error);
          setLoading(false);
          setSuccess("Failed to send message!");
        }
      );
  };

  const contactInfo = [
    { 
      icon: HiOutlineMail, 
      title: "Email", 
      value: "tizulislamtt@gmail.com", 
      href: "mailto:tizulislamtt@gmail.com" 
    },
    { 
      icon: HiOutlinePhone, 
      title: "Phone", 
      value: "+880 1875-607026", 
      href: "tel:+8801875607026" 
    },
    { 
      icon: HiOutlineLocationMarker, 
      title: "Location", 
      value: "West Kafrul, Mirpur, Dhaka-1216", 
      href: null 
    },
  ];

  return (
    <section id="contact" className="py-24 bg-card-bg/10 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6">
        <SectionHeading title="Get In Touch" subtitle="Contact" />

        <div className="grid lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Left Side: Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col space-y-6"
          >
            <div>
              <h3 className="text-3xl font-extrabold text-white mb-4 leading-tight font-poppins">
                Let&apos;s Work <br />
                <span className="text-accent">Together</span>
              </h3>
              <p className="text-gray-400 font-inter text-[15px] leading-relaxed">
                I&apos;m open to internships, full-time junior developer roles, and freelance collaborations. Reach out to discuss an opportunity or just to say hello!
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                const content = info.href ? (
                  <a
                    href={info.href}
                    className="text-white font-medium hover:text-accent transition-colors font-inter text-[15px]"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-white font-medium font-inter text-[15px]">
                    {info.value}
                  </p>
                );

                return (
                  <div 
                    key={idx} 
                    className="flex items-center gap-4 bg-card-bg/40 border border-card-border/80 p-4.5 rounded-2xl hover:border-accent/30 transition-all duration-300 group shadow-lg"
                  >
                    <div className="w-12 h-12 bg-accent/5 border border-accent/10 rounded-xl flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                      <Icon className="text-xl" />
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5 font-inter">
                        {info.title}
                      </h4>
                      {content}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side: Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 w-full"
          >
            <form
              ref={form}
              onSubmit={sendEmail}
              className="bg-card-bg/60 backdrop-blur-sm border border-card-border/80 p-8 rounded-3xl flex flex-col gap-5 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-1 font-poppins">
                Send Me A Message
              </h3>

              {/* Grid for Name & Email */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 font-inter">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#0a0a0af0]/50 border border-gray-800/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/80 focus:ring-1 focus:ring-accent/35 focus:bg-[#070707] transition-all font-inter text-[14px]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 font-inter">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-[#0a0a0af0]/50 border border-gray-800/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/80 focus:ring-1 focus:ring-accent/35 focus:bg-[#070707] transition-all font-inter text-[14px]"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 font-inter">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  defaultValue="I am hiring / Collaboration Opportunity"
                  placeholder="Subject"
                  className="w-full bg-[#0a0a0af0]/50 border border-gray-800/80 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/80 focus:ring-1 focus:ring-accent/35 focus:bg-[#070707] transition-all font-inter text-[14px]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 font-inter">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  placeholder="Tell me about your project or role details..."
                  className="w-full bg-[#0a0a0af0]/50 border border-gray-800/80 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent/80 focus:ring-1 focus:ring-accent/35 focus:bg-[#070707] transition-all font-inter text-[14px] resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="relative inline-flex items-center justify-center bg-accent text-black font-bold py-3.5 rounded-xl mt-2 hover:bg-accent-hover transition-all duration-300 shadow-[0_0_15px_rgba(0,255,153,0.15)] hover:shadow-[0_0_25px_rgba(0,255,153,0.35)] disabled:opacity-70 font-inter cursor-pointer overflow-hidden group"
              >
                {/* Shimmer Effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* Success / Failure Status */}
              {success && (
                <p className={`text-sm text-center font-semibold mt-2 font-inter ${success.includes("Failed") ? "text-red-400" : "text-accent"}`}>
                  {success}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}