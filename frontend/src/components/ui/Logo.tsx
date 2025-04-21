import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo_r1.png"
      alt="Logo Trackear"
      width={923}
      height={462}
      className="h-full"
      priority
    />
  )
}