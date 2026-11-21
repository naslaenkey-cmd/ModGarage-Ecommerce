
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import heroCar from "../assets/hero-car.jpg";

function Hero() {
  return (
    <section
      className="
        relative isolate flex
        h-[calc(100svh-96px)]
        min-h-[480px]
        max-h-[720px]
        w-full items-center
        overflow-hidden
        bg-[#090909] text-white

        max-[600px]:h-[calc(100svh-70px)]
        max-[600px]:min-h-[480px]
        max-[600px]:max-h-none

        max-[380px]:min-h-[460px]
      "
    >
      {/* Dark Cinematic Overlay */}
      <div
        className="
          absolute inset-0 z-0
          bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.78)_38%,rgba(0,0,0,0.25)_75%,rgba(0,0,0,0.35)_100%),linear-gradient(0deg,rgba(0,0,0,0.8),transparent_35%,rgba(0,0,0,0.2))]
          max-[600px]:bg-[linear-gradient(90deg,rgba(0,0,0,0.90),rgba(0,0,0,0.55)),linear-gradient(0deg,rgba(0,0,0,0.85),transparent_45%,rgba(0,0,0,0.3))]
        "
      />

      {/* Animated Car Image */}
      <motion.img
        src={heroCar}
        alt="Modified Mazda sports car"
        initial={{
          x: "100%",
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 2.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          pointer-events-none absolute inset-0 z-[2]
          h-full w-full object-cover
          object-[center_55%]
          brightness-[65%]

          max-[900px]:object-[58%_center]
          max-[600px]:object-[62%_center]
        "
      />

      {/* Top Brand Label */}
      <div
        className="
          absolute left-[7%] right-[7%] top-[25px] z-10
          flex items-center justify-between
          text-[11px] tracking-[3px] text-[#C8C8C8]

          max-[600px]:left-[6%]
          max-[600px]:right-[6%]
          max-[600px]:top-[18px]
        "
      >
        <span
          className="
            text-[18px] font-black tracking-[4px]
            text-[#D6B36A]
            max-[600px]:text-[15px]
            max-[600px]:tracking-[3px]
            max-[380px]:text-[13px]
          "
        >
          MODGARAGE
        </span>

        <span
          className="
            text-right
            max-[600px]:text-[8px]
            max-[600px]:tracking-[1px]
            max-[380px]:max-w-[145px]
            max-[380px]:text-[7px]
          "
        >
          EST. FOR AUTOMOTIVE ENTHUSIASTS
        </span>
      </div>

      {/* Main Content */}
      <div
        className="
          relative z-10 ml-[9%] mt-[15px]
          w-[min(700px,85%)]

          max-[900px]:ml-[6%]
          max-[900px]:w-[88%]

          max-[600px]:ml-[6%]
          max-[600px]:mt-[-10px]
          max-[600px]:w-[90%]

          max-[380px]:mt-[-5px]
        "
      >
        <p
          className="
            mb-0 flex items-center gap-3
            text-[10px] font-semibold
            tracking-[4px] text-[#D6B36A]

            max-[600px]:gap-2
            max-[600px]:text-[8px]
            max-[600px]:tracking-[1.5px]
            max-[380px]:text-[7px]
          "
        >
          <span className="h-px w-[35px] shrink-0 bg-[#D6B36A] max-[600px]:w-[22px]" />
          THE ART OF AUTOMOTIVE MODIFICATION
        </p>

        <h1
          className="
            my-[19px]
            font-['Bebas_Neue',Impact,sans-serif]
            text-[clamp(65px,8vw,110px)]
            font-black uppercase
            leading-[0.85] tracking-[-2px]
            text-[#F5F3EE]

            max-[900px]:text-[clamp(65px,10vw,90px)]

            max-[600px]:my-[16px]
            max-[600px]:text-[clamp(52px,12vw,76px)]
            max-[600px]:tracking-[-1px]

            max-[380px]:text-[clamp(46px,12vw,58px)]
          "
        >
          REDEFINE
          <br />
          YOUR <span className="text-[#D6B36A]">DRIVE.</span>
        </h1>

        <p
          className="
            my-[18px] max-w-[430px]
            text-[13px] leading-[1.7]
            tracking-[0.5px] text-[#B5B5B5]

            max-[600px]:my-[14px]
            max-[600px]:max-w-[320px]
            max-[600px]:text-[11px]
            max-[600px]:leading-[1.6]

            max-[380px]:text-[10px]
          "
        >
          Transform your machine with premium automotive
          upgrades, precision-engineered accessories and
          uncompromising style.
        </p>

        {/* CTA */}
        <div
          className="
            mt-[23px] flex flex-wrap
            items-center gap-[22px]

            max-[600px]:mt-[18px]
            max-[600px]:gap-3
          "
        >
          <Link
            to="/products"
            className="
              inline-flex items-center justify-center
              gap-[28px] bg-[#D6B36A]
              px-6 py-[14px]
              text-[10px] font-extrabold
              tracking-[1.5px] text-[#111111]
              no-underline
              transition-all duration-300
              hover:-translate-y-1 hover:bg-[#F0D18B]

              max-[600px]:gap-4
              max-[600px]:px-[16px]
              max-[600px]:py-[12px]
              max-[600px]:text-[9px]

              max-[380px]:gap-3
              max-[380px]:px-3
              max-[380px]:text-[8px]
            "
          >
            EXPLORE COLLECTION
            <span className="text-[18px]">↗</span>
          </Link>

          <span
            className="
              text-[9px] tracking-[2px]
              text-[#999999]
              max-[600px]:hidden
            "
          >
            PERFORMANCE MEETS PERSONALITY
          </span>
        </div>
      </div>

      {/* Car Label */}
      <div
        className="
          absolute bottom-[18%] right-[8%] z-10
          flex items-center gap-3

          max-[900px]:right-[5%]
          max-[600px]:bottom-[13%]
          max-[600px]:right-[6%]
          max-[600px]:gap-2
          max-[380px]:bottom-[12%]
        "
      >
        <span className="text-[27px] text-[#D6B36A] max-[600px]:text-[20px]">
          ✳
        </span>

        <div className="flex flex-col gap-[5px] max-[600px]:gap-[3px]">
          <strong
            className="
              text-[15px] tracking-[3px] text-white
              max-[600px]:text-[11px]
              max-[600px]:tracking-[2px]
            "
          >
            MODGARAGE
          </strong>

          <small
            className="
              text-[8px] tracking-[2px] text-[#B4B4B4]
              max-[600px]:text-[6px]
              max-[600px]:tracking-[1px]
            "
          >
            DRIVE YOUR IDENTITY
          </small>
        </div>
      </div>

      {/* Bottom Labels */}
      <div
        className="
          absolute bottom-[22px] left-[7%] right-[7%] z-10
          flex justify-between
          text-[9px] tracking-[2px] text-[#999999]

          max-[600px]:bottom-[15px]
          max-[600px]:left-[6%]
          max-[600px]:right-[6%]
          max-[600px]:text-[7px]
          max-[600px]:tracking-[1px]

          max-[380px]:text-[6px]
        "
      >
        <span>01 — DISCOVER YOUR STYLE</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>

      {/* Hero Index */}
      <div
        className="
          absolute right-[7%] top-1/2 z-10
          text-[11px] tracking-[2px]
          text-[#D6B36A]
          max-[600px]:hidden
        "
      >
        01 / 04
      </div>
    </section>
  );
}

export default Hero;
