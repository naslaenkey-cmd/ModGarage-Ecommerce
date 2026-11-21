
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Award,
  ShieldCheck,
  CarFront,
  ShoppingBag,
  ArrowRight,
  Gauge,
  Settings,
  Sparkles,
} from "lucide-react";

const container = "mx-auto w-full max-w-[1200px] px-4 sm:px-8 lg:px-10";
const sectionY = "py-14 sm:py-20 lg:py-24";
const display = "font-['Oswald',sans-serif] uppercase";
const body = "text-sm leading-7 text-[#B3B3B3] sm:text-[15px] sm:leading-7";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6B36A]";

function Eyebrow({ children, className = "" }) {
  return (
    <p className={`mb-3 text-[10px] font-bold tracking-[0.25em] text-[#D6B36A] sm:mb-4 sm:text-xs sm:tracking-[0.3em] ${className}`}>
      {children}
    </p>
  );
}

function Button({ to, children, className = "" }) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-[48px] items-center justify-center gap-3 border border-[#D6B36A] bg-[#D6B36A] px-6 py-3 text-[11px] font-bold tracking-[0.15em] text-[#080808] no-underline transition-colors duration-200 hover:border-[#E8C982] hover:bg-[#E8C982] sm:min-h-[52px] sm:px-8 sm:text-xs sm:tracking-[0.2em] ${focusRing} ${className}`}
    >
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}

const categories = [
  {
    title: "Exterior Upgrades",
    description: "Give your vehicle a distinctive and sporty appearance.",
    icon: CarFront,
  },
  {
    title: "Interior Upgrades",
    description: "Enhance comfort, style and your driving experience.",
    icon: Settings,
  },
  {
    title: "Lighting",
    description: "Make every journey stand out with modern lighting.",
    icon: Sparkles,
  },
  {
    title: "Performance Parts",
    description: "Explore upgrades designed for driving enthusiasts.",
    icon: Gauge,
  },
];

const features = [
  {
    title: "Quality-Focused Selection",
    description:
      "Explore automotive accessories selected to help personalize your vehicle.",
    icon: Award,
  },
  {
    title: "Easy Shopping Experience",
    description:
      "Discover products, manage your cart and place orders through a simple shopping experience.",
    icon: ShoppingBag,
  },
  {
    title: "Customer-Focused Approach",
    description:
      "We aim to make finding the right automotive accessories convenient and straightforward.",
    icon: ShieldCheck,
  },
];

const purpose = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To make automotive customization more accessible by offering a convenient place to discover accessories that match different driving styles and preferences.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To create a trusted automotive shopping destination where enthusiasts can discover inspiration, explore accessories and express their individuality.",
  },
];

function About() {
  return (
    <main className="w-full overflow-x-hidden bg-[#080808] text-[#F5F3EE]">

      {/* HERO SECTION */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden lg:min-h-[calc(100vh-80px)]">

        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=85"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#080808]/75 lg:bg-gradient-to-r lg:from-[#080808] lg:via-[#080808]/85 lg:to-[#080808]/20" />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080808] to-transparent" />

        <div className={`${container} relative z-10 py-10 sm:py-16 lg:py-12`}>
          <div className="max-w-[850px]">

            <Eyebrow className="mb-3">
              ABOUT MODGARAGE
            </Eyebrow>

            <h1
              className={`${display} max-w-[850px] text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[0.02em]`}
            >
              More than accessories.
              <span className="block text-[#D6B36A]">
                It&rsquo;s about your drive.
              </span>
            </h1>

            <p className="mt-4 max-w-[520px] text-[13px] leading-6 text-[#B3B3B3] sm:mt-6 sm:text-base sm:leading-8">
              Welcome to ModGarage, your destination for automotive accessories
              and vehicle customization. Discover products that help you express
              your style and make every drive your own.
            </p>

            <Button
              to="/products"
              className="mt-5 w-full sm:mt-7 sm:w-auto"
            >
              EXPLORE PRODUCTS
            </Button>

          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className={sectionY}>
        <div className={`${container} grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16`}>

          <div className="relative overflow-hidden border border-[#2E2E2E]">
            <img
              src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1000&q=85"
              alt="Automotive design"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
            />

            <div className="absolute bottom-0 left-0 border-r border-t border-[#D6B36A] bg-[#111111] px-4 py-3 sm:px-6 sm:py-4">
              <p className={`${display} text-lg font-bold tracking-[0.15em] text-[#D6B36A] sm:text-xl`}>
                ModGarage
              </p>
              <p className="mt-1 text-[9px] tracking-[0.2em] text-[#A3A3A3] sm:text-[10px]">
                DEFINE YOUR DRIVE
              </p>
            </div>
          </div>

          <div>
            <Eyebrow>OUR STORY</Eyebrow>

            <h2 className={`${display} text-[clamp(1.8rem,3.6vw,3rem)] font-bold leading-[1.15]`}>
              Built for those
              <span className="block text-[#D6B36A]">
                who love the drive.
              </span>
            </h2>

            <div className={`${body} mt-5 max-w-[34rem] space-y-4 sm:mt-7 sm:space-y-5`}>
              <p>
                ModGarage is an automotive accessories store created for people
                who enjoy personalizing their vehicles. We believe a car is more
                than just a way to travel. It is a reflection of individual style
                and passion.
              </p>

              <p>
                Our goal is to bring a variety of automotive accessories together
                in one convenient place, helping customers explore different ways
                to upgrade their driving experience.
              </p>

              <p>
                From exterior styling to interior upgrades, ModGarage brings
                automotive inspiration and shopping together.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="border-y border-[#252525] bg-[#101010]">
        <div className={container}>
          <div className="grid grid-cols-1 divide-y divide-[#252525] md:grid-cols-2 md:divide-x md:divide-y-0">

            {purpose.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="py-10 sm:py-12 md:px-10 md:py-16 md:first:pl-0 md:last:pr-0"
              >
                <Icon
                  size={32}
                  strokeWidth={1.5}
                  className="mb-5 text-[#D6B36A] sm:mb-6"
                  aria-hidden="true"
                />

                <h3 className={`${display} mb-4 text-xl font-bold tracking-[0.04em] sm:text-[28px]`}>
                  {title}
                </h3>

                <p className={`${body} max-w-[30rem]`}>{text}</p>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className={sectionY}>
        <div className={container}>

          <div className="mb-8 flex flex-col gap-4 sm:mb-12 md:flex-row md:items-end md:justify-between md:gap-12">
            <div>
              <Eyebrow>EXPLORE MODGARAGE</Eyebrow>

              <h2 className={`${display} text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.15]`}>
                What we <span className="text-[#D6B36A]">offer</span>
              </h2>
            </div>

            <p className={`${body} max-w-[28rem]`}>
              Explore automotive accessories across different categories and find options that suit your vehicle.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-px border border-[#2E2E2E] bg-[#2E2E2E] min-[400px]:grid-cols-2 lg:grid-cols-4">

            {categories.map(({ title, description, icon: Icon }) => (
              <li key={title} className="flex">
                <Link
                  to={`/products?category=${encodeURIComponent(title)}`}
                  className={`group flex w-full flex-col bg-[#111111] p-5 no-underline transition-colors duration-200 hover:bg-[#181818] sm:p-7 lg:min-h-[260px] ${focusRing}`}
                >
                  <Icon
                    size={30}
                    strokeWidth={1.5}
                    className="mb-5 text-[#D6B36A] sm:mb-6 sm:size-[34px]"
                    aria-hidden="true"
                  />

                  <h3 className={`${display} mb-3 text-lg font-bold tracking-[0.04em] text-[#F5F3EE] sm:text-xl`}>
                    {title}
                  </h3>

                  <p className="flex-1 text-xs leading-6 text-[#A3A3A3] sm:text-sm">
                    {description}
                  </p>

                  <span className="mt-5 flex items-center gap-2 text-[10px] font-bold tracking-[0.1em] text-[#D6B36A] sm:mt-6 sm:text-xs">
                    EXPLORE
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1.5 motion-reduce:transition-none"
                    />
                  </span>
                </Link>
              </li>
            ))}

          </ul>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className={`${sectionY} bg-[#101010]`}>
        <div className={container}>

          <div className="mx-auto mb-10 max-w-[600px] text-center sm:mb-12">
            <Eyebrow>THE MODGARAGE EXPERIENCE</Eyebrow>

            <h2 className={`${display} text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.15]`}>
              Why choose <span className="text-[#D6B36A]">us?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:gap-y-12 md:grid-cols-3">

            {features.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="border-t border-[#3A3A3A] pt-7 text-center transition-colors duration-200 hover:border-[#D6B36A] md:text-left"
              >
                <Icon
                  size={34}
                  strokeWidth={1.5}
                  className="mx-auto mb-5 text-[#D6B36A] md:mx-0 sm:mb-6"
                  aria-hidden="true"
                />

                <h3 className={`${display} mb-3 text-lg font-bold tracking-[0.04em] sm:text-xl`}>
                  {title}
                </h3>

                <p className="mx-auto max-w-[22rem] text-sm leading-7 text-[#A3A3A3] md:mx-0">
                  {description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#080808]/80" />

        <div className={`${container} relative z-10 py-14 sm:py-20 lg:py-24`}>
          <div className="flex flex-col items-start gap-7 sm:gap-10 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-[640px]">
              <Eyebrow>YOUR DRIVE. YOUR STYLE.</Eyebrow>

              <h2 className={`${display} text-[clamp(1.9rem,4.5vw,3.5rem)] font-bold leading-[1.1]`}>
                Ready to upgrade
                <span className="block text-[#D6B36A]">
                  your drive?
                </span>
              </h2>

              <p className={`${body} mt-5 max-w-[30rem]`}>
                Explore our collection and discover accessories that bring your automotive ideas to life.
              </p>
            </div>

            <Button to="/products" className="w-full shrink-0 sm:w-auto">
              SHOP NOW
            </Button>

          </div>
        </div>
      </section>

    </main>
  );
}

export default About;
