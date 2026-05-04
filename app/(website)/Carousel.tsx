"use client";

import Link from "next/link";
import Slider from "react-slick";

const books = [
  {
    title: "O Livro dos Espíritos",
    description: "A obra fundadora do Espiritismo. Trata da natureza dos espíritos, suas relações com os homens e os princípios da doutrina espírita.",
    link: "http://www.febnet.org.br/wp-content/uploads/2014/05/Livro-dos-Espiritos.pdf",
    year: "1857",
  },
  {
    title: "O Livro dos Médiuns",
    description: "Guia dos médiuns e dos evocadores. Ensina como se comunicar com os espíritos e os princípios que regem a mediunidade.",
    link: "http://www.febnet.org.br/wp-content/uploads/2014/05/Livro-dos-Mediuns_Guillon.pdf",
    year: "1861",
  },
  {
    title: "O Evangelho Segundo o Espiritismo",
    description: "Comentários dos ensinamentos morais de Jesus à luz da doutrina espírita, com mensagens de espíritos superiores.",
    link: "http://www.febnet.org.br/wp-content/uploads/2014/05/O-evangelho-segundo-o-espiritismo.pdf",
    year: "1864",
  },
  {
    title: "O Céu e o Inferno",
    description: "Estudo sobre a justiça divina segundo o Espiritismo. Aborda a vida após a morte, o destino das almas e a lei de causa e efeito.",
    link: "http://www.febnet.org.br/wp-content/uploads/2014/05/ceu-e-inferno-Manuel-Quintao.pdf",
    year: "1865",
  },
  {
    title: "A Gênese",
    description: "Concilia ciência, filosofia e religião. Trata da criação do universo, da origem da vida e dos milagres à luz do Espiritismo.",
    link: "http://www.febnet.org.br/wp-content/uploads/2012/07/A-genese_Guillon.pdf",
    year: "1868",
  },
];

function Card({ book }: { book: typeof books[0] }) {
  return (
    <div className="px-2">
      <div className="bg-white border border-[var(--violet)] rounded-2xl p-5 h-full flex flex-col gap-3 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-[var(--black)] leading-snug">{book.title}</h3>
          <span className="text-xs text-[var(--secondary)] font-medium shrink-0 mt-0.5">{book.year}</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed flex-1 line-clamp-4">{book.description}</p>
        <Link
          href={book.link}
          target="_blank"
          className="text-xs font-semibold text-[var(--secondary)] hover:underline mt-auto"
        >
          Ler PDF →
        </Link>
      </div>
    </div>
  );
}

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="pb-8">
      <Slider {...settings}>
        {books.map((book, i) => <Card key={i} book={book} />)}
      </Slider>
    </div>
  );
}
