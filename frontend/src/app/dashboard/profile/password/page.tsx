import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import Card from "@/components/ui/Card";

export default function PasswordPage() {
  return (
    <>
      <div className='w-full md:w-auto'>
        <h1 className="font-black text-4xl text-green-500 my-5">Cambiar Password</h1>
        <p className="text-xl font-bold text-gray-800">Aquí puedes cambiar tu {''}
          <span className="text-green-600">password</span>
        </p>
      </div>

      <Card>
        <ChangePasswordForm />
      </Card>
    </>
  )
}