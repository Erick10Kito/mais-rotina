import LogoMaisRotina from "../../assets/Logo.svg";

export function Logo() {
  return (
    <div className="flex items-center gap-3 ">
      <img src={LogoMaisRotina} alt="" className="max-w-[220px]" />
    </div>
  );
}
