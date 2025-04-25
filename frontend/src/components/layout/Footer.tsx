export default function Footer() {
  return (
    <footer className="py-5 h-20 bg-zinc-950">
      <p className="text-center text-green-600 text-lg">
        Todos los Derechos Reservados {new Date().getFullYear()}
      </p>
    </footer>
  );
}