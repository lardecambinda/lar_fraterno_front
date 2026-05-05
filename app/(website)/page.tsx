import Carousel from "./Carousel";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-16 px-4 sm:py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--secondary)] mb-4">
            Centro Espírita
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--black)] mb-5 leading-snug">
            Lar Fraterno de Cambinda
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
            Um espaço de acolhimento, estudo e prática dos ensinamentos espíritas, pautado no amor, caridade e fraternidade.
          </p>
          <Link
            href="/reunioes"
            className="inline-block bg-[var(--secondary)] text-white px-8 py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition-opacity"
          >
            Ver Reuniões e Estudos
          </Link>
        </div>
      </section>

      {/* Divisor decorativo */}
      <div className="flex items-center justify-center gap-3 px-4 mb-12">
        <div className="h-px flex-1 max-w-xs bg-[var(--violet)]" />
        <span className="text-[var(--secondary)] text-lg">✦</span>
        <div className="h-px flex-1 max-w-xs bg-[var(--violet)]" />
      </div>

      {/* Obras Básicas */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--secondary)] mb-3">
              Codificadas por Allan Kardec
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--black)] leading-snug">
              Obras Básicas do Espiritismo
            </h2>
          </div>
          <Carousel />
        </div>
      </section>

      {/* Divisor decorativo */}
      <div className="flex items-center justify-center gap-3 px-4 mb-12">
        <div className="h-px flex-1 max-w-xs bg-[var(--violet)]" />
        <span className="text-[var(--secondary)] text-lg">✦</span>
        <div className="h-px flex-1 max-w-xs bg-[var(--violet)]" />
      </div>

      {/* Propósito */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--secondary)] mb-3">
            Quem Somos
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--black)] mb-8 leading-snug">
            Nosso Propósito
          </h2>
          <div className="text-gray-600 leading-relaxed text-base sm:text-lg">
            <p>
              O Lar Fraterno de Cambinda é um espaço de acolhimento, estudo e prática
              dos ensinamentos espíritas.
            </p>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="border-t border-[var(--violet)] py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Lar Fraterno de Cambinda. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
