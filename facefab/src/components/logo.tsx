import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center">
      <Link href={"/"}>
        <Image src="/logo.png" className="rounded-lg" height={40} width={40} alt="logo" />
      </Link>
      <h2 className={"text-2xl ml-2"}>Face Fab</h2>
    </div>
  );
}

export default Logo;
