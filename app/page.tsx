import Posts from "./Posts";
import Carousel from "./Carousel";

export default function Home() {
  return (
    <main>
      <div className="mt-8">
        <p className="text-xl text-light-black font-semibold">
          Plataforma de Conteúdo do
        </p>
        <h1 className="text-4xl text-light-black font-bold">
          Lar Fraterno de Cambinda
        </h1>
      </div>

      <section className="mt-20">
        <h2 className="text-center max-w-sm m-auto text-2xl font-semibold leading-none ">
          Conheça as Obras Básicas do Espiritismo
        </h2>

        <div className="mt-8 px-8">
          <Carousel />
        </div>
      </section>
    </main>
  );
}
