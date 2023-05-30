import Posts from "./Posts";

export default function Home() {
  return (
    <main>
      <div className="mt-8">
        <p className="text-xl text-light-black">Plataforma de Conteúdo do</p>
        <h1 className="text-4xl text-light-black font-bold">
          Lar Fraterno de Cambinda
        </h1>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-light-black">Publicações</h2>

        <div>
          <Posts />
        </div>
      </section>
    </main>
  );
}
