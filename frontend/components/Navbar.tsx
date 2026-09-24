export default function Navbar() {
  return (
    <nav className="bg-cream border-b border-beige-dark sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <span className="text-2xl font-bold text-terracota">DomusGo</span>
        <div className="flex gap-6 text-charcoal text-sm font-medium">
          <a href="/" className="hover:text-terracota transition-colors">Inicio</a>
          <a href="/publish" className="hover:text-terracota transition-colors">Publicar inmueble</a>
          <a href="/login" className="hover:text-terracota transition-colors">Iniciar sesión</a>
        </div>
      </div>
    </nav>
  );
}