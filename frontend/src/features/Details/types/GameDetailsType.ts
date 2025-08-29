export type GameDetailsApiResponse = {
  id: number; //
  name: string; //
  summary: string;
  genres: string[] | null;
  firstReleaseDate: string | null; 
  coverUrl: string; //
  screenshotsImageUrl: string[]; //
  platforms: string[]; //
  videos: string[];  //
  price: number; //
  discountPrice: number; //
  totalSells: number; //
  availableKeysStock: number;
};
