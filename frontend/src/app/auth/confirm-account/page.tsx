import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm";
import Card from "@/components/ui/Card";

export default function ConfirmAccountPage() {
  return (
    <>
      <div className="pt-4 px-8 space-y-3 w-full">
        <h1 className="text-6xl font-black text-green-500">Corfima tu cuenta</h1>
        <p className="text-3xl font-bold text-gray-800">
          y controla tus
          <span className="text-green-600"> finanzas</span>
        </p>
      </div>

      <Card>
        <p className="text-lg pt-4 px-8 text-gray-700">A continuación, ingresa el c&oacute;digo de confirmaci&oacute;n que enviamos a tu correo. Puedes escribirlo o puedes copiarlo y pegarlo.</p>
        <ConfirmAccountForm />
      </Card>
    </>
  )
}