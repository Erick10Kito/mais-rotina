import RocketLogo from "../../assets/rocket.svg";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img src={RocketLogo} alt="" />
      <h1 className="text-[#4EA8DE] font-black text-[40px]">
        to<span className="text-[#5E60CE]">do</span>
      </h1>
    </div>
  );
}
