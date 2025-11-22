/**
 * Movie Service
 * Handles all movie-related API calls and data fetching
 * Keeps business logic separate from UI components
 */

interface DummyMovie {
  id: string;
  title: string;
  poster: string;
  status: "Popular" | "Trending" | "Top Rated";
  rating: number;
  language: string;
}

// Dummy TMDB-style movie data
const DUMMY_MOVIES_DATA: DummyMovie[] = [
  {
    id: "1",
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    status: "Popular",
    rating: 9.0,
    language: "English",
  },
  {
    id: "2",
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    status: "Trending",
    rating: 8.8,
    language: "English",
  },
  {
    id: "3",
    title: "Parasite",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    status: "Top Rated",
    rating: 8.5,
    language: "Korean",
  },
  {
    id: "4",
    title: "The Matrix",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    status: "Popular",
    rating: 8.7,
    language: "English",
  },
  {
    id: "5",
    title: "Amélie",
    poster: "https://image.tmdb.org/t/p/w500/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg",
    status: "Popular",
    rating: 8.3,
    language: "French",
  },
  {
    id: "6",
    title: "Fight Club",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    status: "Trending",
    rating: 8.8,
    language: "English",
  },
  {
    id: "7",
    title: "Money Heist (La Casa de Papel)",
    poster: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    status: "Popular",
    rating: 8.2,
    language: "Spanish",
  },
  {
    id: "8",
    title: "The Godfather",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    status: "Top Rated",
    rating: 9.2,
    language: "English",
  },
  {
    id: "9",
    title: "Oldboy",
    poster: "https://image.tmdb.org/t/p/w500/pWDtjs568ZfOTMbURQBYuT4Qqu8.jpg",
    status: "Top Rated",
    rating: 8.4,
    language: "Korean",
  },
  {
    id: "10",
    title: "Squid Game",
    poster: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    status: "Trending",
    rating: 8.0,
    language: "Korean",
  },
  {
    id: "11",
    title: "Avengers: Endgame",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    status: "Popular",
    rating: 8.4,
    language: "English",
  },
  {
    id: "12",
    title: "Dark",
    poster: "https://image.tmdb.org/t/p/w500/5J8bKRQkw5R0oRh2UWA2JmMFS2U.jpg",
    status: "Trending",
    rating: 8.7,
    language: "German",
  },
  {
    id: "13",
    title: "Narcos",
    poster: "https://image.tmdb.org/t/p/w500/rTmal9fDbwh5F0waol2hq35U4ah.jpg",
    status: "Popular",
    rating: 8.8,
    language: "Spanish",
  },
  {
    id: "14",
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    status: "Trending",
    rating: 8.6,
    language: "English",
  },
  {
    id: "15",
    title: "Intouchables",
    poster: "https://image.tmdb.org/t/p/w500/4mFsNQwbD0F237Tx7gAPotd0nbJ.jpg",
    status: "Popular",
    rating: 8.5,
    language: "French",
  },
  {
    id: "16",
    title: "Train to Busan",
    poster: "https://image.tmdb.org/t/p/w500/5mCiMdlZjJ1CNoXKRsWPCLAzcCj.jpg",
    status: "Trending",
    rating: 7.6,
    language: "Korean",
  },
];

/**
 * Fetch all movies (simulated API call)
 */
export const fetchMovies = async (): Promise<DummyMovie[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_MOVIES_DATA);
    }, 1000);
  });
};

/**
 * Fetch a single movie by ID
 */
export const fetchMovieById = async (
  movieId: string
): Promise<DummyMovie | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const movie = DUMMY_MOVIES_DATA.find((m) => m.id === movieId);
      resolve(movie || null);
    }, 500);
  });
};

/**
 * Fetch trending movies
 */
export const fetchTrendingMovies = async (): Promise<DummyMovie[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const trending = DUMMY_MOVIES_DATA.filter(
        (movie) => movie.status === "Trending"
      );
      resolve(trending);
    }, 800);
  });
};

/**
 * Fetch popular movies
 */
export const fetchPopularMovies = async (): Promise<DummyMovie[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const popular = DUMMY_MOVIES_DATA.filter(
        (movie) => movie.status === "Popular"
      );
      resolve(popular);
    }, 800);
  });
};

/**
 * Fetch top rated movies
 */
export const fetchTopRatedMovies = async (): Promise<DummyMovie[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const topRated = DUMMY_MOVIES_DATA.filter(
        (movie) => movie.status === "Top Rated"
      );
      resolve(topRated);
    }, 800);
  });
};

/**
 * Search movies by query
 */
export const searchMovies = async (query: string): Promise<DummyMovie[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = DUMMY_MOVIES_DATA.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 600);
  });
};

/**
 * Filter movies by language
 */
export const fetchMoviesByLanguage = async (
  language: string
): Promise<DummyMovie[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = DUMMY_MOVIES_DATA.filter(
        (movie) => movie.language.toLowerCase() === language.toLowerCase()
      );
      resolve(results);
    }, 600);
  });
};
