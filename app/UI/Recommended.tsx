"use client";

import { BookmarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import movies from "../../movies.json";

//interface för typen som ska användas i vårt state
interface Movie {
  title: string;
  year: number;
  rating: string;
  actors: string[];
  genre: string;
  synopsis: string;
  thumbnail: string;
  isTrending?: boolean;
}

export default function RecommendedMovies() {
  //state för att hålla rekommenderade filmer
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

  //hämtar filmer som inte är trending och slumpar fram 5 filmer
  useEffect(() => {
    //filtrerar ut filmer som inte är "trending"
    const notTrendingMovies = movies.filter((movie) => !movie.isTrending);
    //tom array av typen Movie[] för att hålla de slumpade filmerna
    const randomMovies: Movie[] = [];

    //slumpar fram 5 filmer och pushar in i arrayen randomMovies
    while (randomMovies.length < 5) {
        //slumpar fram ett indexvärde
      const randomIndex = Math.floor(Math.random() * notTrendingMovies.length);
      //hämtar en slumpad film från arrayen med hjälp av randomIndex-värdet
      const randomMovie = notTrendingMovies[randomIndex];
      //kollar så att samma film inte kan pushas in och visas flera gånger
      if (!randomMovies.some((movie) => movie.title === randomMovie.title)) {
      randomMovies.push(randomMovie);
      }
    }
    //uppdaterar state med de slumpade filmerna
    setRecommendedMovies(randomMovies);
  }, []);

  return (
    <div>
      <h1 className="text-white text-center">Recommended for You</h1>
      <div>
        {recommendedMovies.map((movie) => (
          <Link href={`/movie/${movie.title}`} key={movie.title}>
            <div
              className="bg-white bg-opacity-50 m-5 flex flex-col"
              key={movie.title}
            >
              <h3 className="text-center p-3">{movie.title}</h3>
              <Image
                src={movie.thumbnail}
                height={100}
                width={100}
                alt={movie.title}
                style={{
                  height: "100%",
                  width: "auto",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                }}
              ></Image>
              <div className="flex flex-row justify-between p-5">
                <p>{movie.year}</p>
                <div className="flex flex-row">
                  <p>{movie.rating}</p>
                  <p>
                    <BookmarkIcon className="text-white h-7 w-7" />
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
