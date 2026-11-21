
import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(214,179,106,0.09),transparent_45%),#080808] px-[25px] py-[60px] text-center text-[#F5F3EE] max-[600px]:min-h-[calc(100vh-65px)] max-[600px]:px-5 max-[600px]:py-10">

      {/* Main Heading */}
      <h1 className="mb-[25px] font-['Bebas_Neue'] text-[clamp(42px,6vw,72px)] font-normal uppercase tracking-[3px] max-[600px]:text-[44px]">
        Welcome to ModGarage!

        <span className="mx-auto mt-[18px] block h-[3px] w-[75px] bg-[#D6B36A]"></span>
      </h1>

      {/* Welcome Message */}
      <p className="mb-3 text-[22px] font-semibold text-[#D6B36A] max-[600px]:text-[19px]">
        Hello, {user?.fullName}!
      </p>

      {/* Login Confirmation */}
      <p className="text-sm leading-[1.7] text-[#999] max-[600px]:text-[13px]">
        You have successfully logged in.
      </p>

    </div>
  );
}

export default Dashboard;
