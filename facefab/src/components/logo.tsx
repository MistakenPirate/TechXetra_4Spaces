import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center">
      <Link href={"/"}>
        <Image src="/logo.png" className="rounded-lg" height={40} width={40} alt="logo" />
      </Link>
      <a href="/" className={"text-2xl ml-2 bg-gradient-to-r from-[#FF5B1F] to-[#6E4279] bg-clip-text text-transparent font-bold"}>Face Fab</a>
    </div>
  );
}

export default Logo;
