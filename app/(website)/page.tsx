import Carousel from "./Carousel";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-16 px-4 sm:py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--secondary)] mb-4">
            Centro Espírita
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--black)] mb-5 leading-tight">
            Lar Fraterno<br />de Cambinda
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
            Um espaço de acolhimento, estudo e prática dos ensinamentos espíritas,
            pautado no amor, caridade e fraternidade.
          </p>
          <Link
            href="/reunioes"
            className="inline-block bg-[var(--secondary)] text-white px-7 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Ver Reuniões e Estudos
          </Link>
        </div>
      </section>

      {/* Divisor decorativo */}
      <div className="flex items-center justify-center gap-3 px-4 mb-2">
        <div className="h-px flex-1 max-w-xs bg-[var(--violet)]" />
        <span className="text-[var(--secondary)] text-lg">✦</span>
        <div className="h-px flex-1 max-w-xs bg-[var(--violet)]" />
      </div>

      {/* Obras Básicas */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--black)] mb-2">
              Obras Básicas do Espiritismo
            </h2>
            <p className="text-sm text-gray-500">Codificadas por Allan Kardec</p>
          </div>
          <Carousel />
        </div>
      </section>

      {/* Propósito */}
      <section className="py-14 px-4 bg-white/60 border-t border-[var(--violet)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--black)] mb-6">
            Nosso Propósito
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
            <p>
              O Lar Fraterno de Cambinda é um espaço de acolhimento, estudo e prática
              dos ensinamentos espíritas.
            </p>
            <p>
              Realizamos reuniões de estudo, passes, atendimento fraterno e trabalhos
              de assistência espiritual, sempre pautados nos princípios de amor,
              caridade e fraternidade.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
