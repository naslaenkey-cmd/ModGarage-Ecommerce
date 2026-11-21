
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { toast } from "react-toastify";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend demo only: no message is sent to a server yet.
    toast.success("Thank you! Your message has been received.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "support@modgarage.com",
      description: "Send us your questions anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 XXXXX XXXXX",
      description: "We're happy to help",
    },
    {
      icon: MapPin,
      title: "Our Location",
      value: "Kerala, India",
      description: "Serving automotive enthusiasts",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "Mon – Sat",
      description: "9:00 AM – 6:00 PM",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080B10] text-[#F5F5F4]">
      {/* Hero Section */}
      <section className="relative flex min-h-[330px] items-center justify-center overflow-hidden border-b border-white/10 px-5 py-20 text-center sm:min-h-[390px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(214,179,106,0.13),_transparent_65%)]" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-semibold tracking-[0.35em] text-[#D6B36A] sm:text-sm">
            WE'RE HERE TO HELP
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Get In <span className="text-[#D6B36A]">Touch.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A3AAB5] sm:text-base">
            Have a question about your order, our products, or your next
            modification project? We'd love to hear from you.
          </p>

          <div className="mt-7 flex items-center justify-center gap-2 text-sm text-[#A3AAB5]">
            <Link to="/" className="transition hover:text-[#D6B36A]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#D6B36A]">Contact Us</span>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[#D6B36A]">
            CONTACT INFORMATION
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Let's Start a <span className="text-[#D6B36A]">Conversation</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#8F98A5]">
            Reach out to us through any of the following channels.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border border-[#292F38] bg-[#11161D] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#D6B36A]/50"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-[#D6B36A]/30 bg-[#D6B36A]/10">
                  <Icon size={22} className="text-[#D6B36A]" />
                </div>

                <h3 className="mb-2 text-base font-semibold">{item.title}</h3>
                <p className="break-words text-sm font-medium text-[#D6B36A]">
                  {item.value}
                </p>
                <p className="mt-2 text-xs leading-5 text-[#8F98A5]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section className="border-y border-white/10 bg-[#0D1219]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[#D6B36A]">
              SEND US A MESSAGE
            </p>

            <h2 className="max-w-lg text-3xl font-bold leading-tight sm:text-4xl">
              Tell Us What You're
              <span className="text-[#D6B36A]"> Looking For.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-[#A3AAB5]">
              Whether you need help choosing the right accessories or have
              questions about an existing order, our team is ready to assist.
            </p>

            <div className="mt-9 flex items-start gap-4 rounded-xl border border-[#292F38] bg-[#11161D] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#D6B36A]/10">
                <MessageCircle size={21} className="text-[#D6B36A]" />
              </div>

              <div>
                <h3 className="text-sm font-semibold">We're listening.</h3>
                <p className="mt-1 text-xs leading-5 text-[#8F98A5]">
                  Every great modification journey starts with a conversation.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#292F38] bg-[#11161D] p-5 sm:p-8"
          >
            <h3 className="mb-7 text-xl font-bold">Send a Message</h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-[#C5CAD2]">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-lg border border-[#30343B] bg-[#080B10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#68717E] focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#C5CAD2]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-[#30343B] bg-[#080B10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#68717E] focus:border-[#D6B36A]"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-[#C5CAD2]">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is your message about?"
                required
                className="w-full rounded-lg border border-[#30343B] bg-[#080B10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#68717E] focus:border-[#D6B36A]"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-[#C5CAD2]">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="5"
                required
                className="w-full resize-none rounded-lg border border-[#30343B] bg-[#080B10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#68717E] focus:border-[#D6B36A]"
              />
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg bg-[#D6B36A] px-6 py-3.5 text-sm font-bold text-[#080B10] transition hover:bg-[#E8C982]"
            >
              Send Message
              <Send size={17} />
            </button>

            <p className="mt-4 text-center text-xs text-[#68717E]">
              Thank you for choosing ModGarage.
            </p>
          </form>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 py-16 text-center sm:py-20">
        <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[#D6B36A]">
          READY TO UPGRADE?
        </p>

        <h2 className="text-2xl font-bold sm:text-3xl">
          Your Next Upgrade Starts Here.
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#8F98A5]">
          Explore our collection and find the perfect additions for your drive.
        </p>

        <Link
          to="/products"
          className="mt-7 inline-flex items-center gap-3 rounded-lg border border-[#D6B36A] px-6 py-3 text-sm font-semibold text-[#D6B36A] transition hover:bg-[#D6B36A] hover:text-[#080B10]"
        >
          Explore Products
          <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}

export default Contact;
