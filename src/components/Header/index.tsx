import RocketLogo from "../../assets/rocket.svg";
export function Header() {
  return (
    <div className="py-20 text-[40px] text-white bg-[#0D0D0D] flex items-center justify-center">
      <div className="flex items-center gap-3">
        <img src={RocketLogo} alt="" />
        <h1 className="text-[#4EA8DE] font-black">
          to<span className="text-[#5E60CE]">do</span>
        </h1>
      </div>
    </div>
  );
}
