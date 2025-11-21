/**
 * Navigation Type Definitions
 * Defines type-safe navigation structure for React Navigation
 */

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Trending: undefined;
  Favourites: undefined;
  Profile: undefined;
  Details: { movieId: number };
  HomeMain: undefined;
  TrendingMain: undefined;
  FavouritesMain: undefined;
};
