import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import Card from "@/components/ui/Card";
import { verifySession } from "@/guards/dal.guard";

export default async function SettingsPage() {
  const {user} = await verifySession()



  return (
    <>
      <div className='w-full md:w-auto'>
        <h1 className="font-black text-4xl text-green-500 my-5">Actualizar Perfil</h1>
        <p className="text-xl font-bold text-gray-800">Aquí puedes cambiar los datos de tu {''}
          <span className="text-green-600">perfil</span>
        </p>
      </div>

      <Card>
        <UpdateProfileForm user={user} />
      </Card>
    </>
  )
}