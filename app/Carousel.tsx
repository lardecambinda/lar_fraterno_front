"use client";

import { Book } from "@/types/types";
import Link from "next/link";
import Slider from "react-slick";

const books = [
  {
    title: "O Evangelho Segundo o Espiritismo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    link: "http://www.febnet.org.br/wp-content/uploads/2014/05/O-evangelho-segundo-o-espiritismo.pdf",
  },
  {
    title: "O Livro dos Espiritos",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    link: "http://www.febnet.org.br/wp-content/uploads/2014/05/Livro-dos-Espiritos.pdf",
  },
  {
    title: "O Livro dos Médiuns",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    link: "http://www.febnet.org.br/wp-content/uploads/2014/05/Livro-dos-Mediuns_Guillon.pdf",
  },
  {
    title: "O Céu e o Inferno",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    link: "http://www.febnet.org.br/wp-content/uploads/2014/05/ceu-e-inferno-Manuel-Quintao.pdf",
  },
  {
    title: "A Gênese",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    link: "http://www.febnet.org.br/wp-content/uploads/2012/07/A-genese_Guillon.pdf",
  },
];

interface CardProps {
  book: Book;
}

function Card({ book }: CardProps) {
  return (
    <div className="bg-white p-4 shadow-md mx-1 rounded-md">
      <p className="text-sm font-semibold mb-2 h-9">{book.title}</p>
      <p className="text-xs line-clamp-3 mb-4">{book.description}</p>
      <Link
        className="text-sm bg-accent text-white font-semibold px-3 py-1 block w-fit ml-auto"
        href={book.link}
        target="_blank"
      >
        Ver
      </Link>
    </div>
  );
}

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {books.map((book: Book, index) => {
          return <Card key={index} book={book} />;
        })}
      </Slider>
    </div>
  );
}
