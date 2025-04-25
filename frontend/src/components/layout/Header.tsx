import Logo from "@/components/ui/Logo";
import Link from "next/link";
import UserMenu from "../ui/UserMenu";
import { UserType } from "@/schemas";

export default function Header({user}: {user: UserType}) {
  return (
    <header className='bg-zinc-950 absolute top-0 w-full'>
      <div className='max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center shadow'>
        <div className='w-44 h-20'>
          <Link href={'/dashboard'}>
            <Logo />
          </Link>
        </div>

        <UserMenu user={user} />
      </div>
    </header>
  )
}