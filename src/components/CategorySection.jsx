
import { Link } from "react-router-dom";
import categories from "../constants/categories";

function CategorySection() {
  return (
    <section
      className="
        bg-[#080808] px-[7%] pt-[45px] pb-[100px] text-white

        max-[900px]:px-[5%]
        max-[900px]:pt-[40px]
        max-[900px]:pb-[75px]

        max-[600px]:px-[5%]
        max-[600px]:pt-[35px]
        max-[600px]:pb-[60px]
      "
    >
      {/* Section Heading */}
      <div
        className="
          mb-[40px] text-center

          max-[900px]:mb-[32px]
          max-[600px]:mb-[25px]
        "
      >
        <p
          className="
            mb-4 text-[11px] font-bold
            tracking-[4px] text-[#D6B36A]

            max-[600px]:mb-3
            max-[600px]:text-[9px]
            max-[600px]:tracking-[3px]
          "
        >
          BUILT FOR YOUR DRIVE
        </p>

        <h2
          className="
            mb-3 font-['Bebas_Neue',sans-serif]
            text-[clamp(36px,5vw,58px)]
            font-normal tracking-[2px]
            text-[#F5F3EE]

            max-[900px]:text-[clamp(34px,5.5vw,48px)]

            max-[600px]:text-[clamp(30px,8vw,40px)]
            max-[600px]:tracking-[1px]
            max-[600px]:leading-[1.1]
          "
        >
          EXPLORE OUR COLLECTION
        </h2>

        <p
          className="
            text-[14px] leading-[1.8]
            text-[#999999]

            max-[600px]:mx-auto
            max-[600px]:max-w-[330px]
            max-[600px]:text-[12px]
            max-[600px]:leading-[1.7]
          "
        >
          Discover premium upgrades designed to transform
          your driving experience.
        </p>
      </div>

      {/* Category Grid */}
      <div
        className="
          grid grid-cols-3 gap-[22px]

          max-[1100px]:grid-cols-2
          max-[900px]:gap-[18px]

          max-[600px]:grid-cols-1
          max-[600px]:gap-4
        "
      >
        {categories.map((category) => (
          <Link
            to={`/products?category=${encodeURIComponent(category.name)}`}
            key={category.id}
            className="
              group relative isolate flex
              min-h-[340px] items-end
              overflow-hidden border border-[#292929]
              bg-[#171717] bg-cover bg-center
              no-underline transition-colors duration-300
              hover:border-[#D6B36A]

              max-[1100px]:min-h-[320px]
              max-[900px]:min-h-[300px]

              max-[600px]:min-h-[280px]
              max-[600px]:h-[300px]

              max-[380px]:min-h-[260px]
              max-[380px]:h-[270px]

              min-[1400px]:min-h-[380px]
            "
          >
            {/* Background Image */}
            <div
              className="
                absolute inset-0 -z-10
                bg-cover bg-center
                transition-transform duration-700 ease-out
                group-hover:scale-[1.08]
              "
              style={{
                backgroundImage: `url("${category.image}")`,
              }}
            />

            {/* Dark Gradient Overlay */}
            <div
              className="
                absolute inset-0 z-0
                bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.35)_40%,rgba(0,0,0,0.95)_100%)]
              "
            />

            {/* Card Content */}
            <div
              className="
                relative z-10 w-full p-7

                max-[900px]:p-6
                max-[600px]:p-5
                max-[380px]:p-4
              "
            >
              <div
                className="
                  translate-y-2
                  transition-transform duration-300
                  group-hover:translate-y-0
                  max-[600px]:translate-y-0
                "
              >
                {/* Category Number */}
                <span
                  className="
                    mb-[14px] block
                    text-[12px] font-bold
                    tracking-[3px] text-[#D6B36A]

                    max-[600px]:mb-[10px]
                    max-[600px]:text-[11px]
                  "
                >
                  {String(category.id).padStart(2, "0")}
                </span>

                {/* Category Name */}
                <h3
                  className="
                    mb-[10px]
                    font-['Oswald',sans-serif]
                    text-[23px] font-medium
                    tracking-[0.5px] text-white

                    max-[900px]:text-[21px]
                    max-[600px]:text-[22px]
                    max-[380px]:text-[20px]
                  "
                >
                  {category.name}
                </h3>

                {/* Description */}
                <p
                  className="
                    mb-5 max-w-[450px]
                    text-[13px] leading-[1.6]
                    text-[#C5C5C5]

                    max-[600px]:mb-4
                    max-[600px]:max-w-[400px]
                    max-[600px]:text-[12px]
                  "
                >
                  {category.description}
                </p>

                {/* Explore Link */}
                <span
                  className="
                    inline-flex items-center gap-3
                    text-[11px] font-bold
                    tracking-[1.8px] text-[#D6B36A]

                    max-[600px]:text-[10px]
                    max-[600px]:tracking-[1.4px]
                  "
                >
                  EXPLORE COLLECTION

                  <span
                    className="
                      text-[18px]
                      transition-transform duration-300
                      group-hover:translate-x-[5px]
                      group-hover:-translate-y-[5px]
                    "
                  >
                    ↗
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
