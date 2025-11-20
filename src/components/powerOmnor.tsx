import Image from "next/image";
import logo from "../assets/omnor-full-logo.png";
export default function PowerOmnor() {
  return (
    <div className="flex flex-col justify-center items-center pb-40">
      <Image
        src={logo}
        className="w-24 h-24 sm:w-50 sm:h-50 object-cover"
        alt="Logo"
        loading="lazy"
      />
      <p className="text-xl ">Power By Omnor</p>
    </div>
  );
}
