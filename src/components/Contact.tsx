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
          console.log(error);
          setLoading(false);
          setSuccess("Failed to send message!");
        }
      );
  };

  return (
    <section id="contact" className="py-24 bg-card-bg/30">
      <div className="container mx-auto px-6">
        <SectionHeading title="Get In Touch" subtitle="Contact" />

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Let&apos;s Work Together
              </h3>

              <p className="text-gray-400 font-inter leading-relaxed max-w-md">
                I&apos;m open to internships, junior roles, and freelance web
                projects. Reach out if you&apos;d like to collaborate or discuss
                an opportunity.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-card-bg border border-card-border rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                  <HiOutlineMail className="text-xl" />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">
                    Email
                  </h4>

                  <a
                    href="mailto:tizulislamtt@gmail.com"
                    className="text-white font-medium hover:text-accent transition-colors"
                  >
                    tizulislamtt@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-card-bg border border-card-border rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                  <HiOutlinePhone className="text-xl" />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">
                    Phone
                  </h4>

                  <a
                    href="tel:+8801875607026"
                    className="text-white font-medium hover:text-accent transition-colors"
                  >
                    +880 1875-607026
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-card-bg border border-card-border rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                  <HiOutlineLocationMarker className="text-xl" />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">
                    Location
                  </h4>

                  <p className="text-white font-medium">
                    West Kafrul, Mirpur, Dhaka-1216
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form
              ref={form}
              onSubmit={sendEmail}
              className="bg-card-bg border border-card-border p-8 rounded-2xl flex flex-col gap-5"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                Send me a message
              </h3>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Your Name
                </label>

                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder="Your name"
                  className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors font-inter"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Your Email
                </label>

                <input
                  type="email"
                  name="from_email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors font-inter"
                />
              </div>
              {/* subject */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  required
                  defaultValue="I am hiring"
                  placeholder="Subject"
                  className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors font-inter"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>

                <textarea
                  rows={4}
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors font-inter resize-none"
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-black font-bold py-3.5 rounded-lg mt-2 hover:bg-accent-hover transition-colors shadow-[0_0_15px_rgba(0,255,153,0.2)] hover:shadow-[0_0_25px_rgba(0,255,153,0.4)] disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* Status */}
              {success && (
                <p className="text-sm text-center text-green-400">
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