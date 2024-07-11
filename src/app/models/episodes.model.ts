export interface EpisodesResponse {
  data: Array<Episode>;
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}

export interface FullEpisodeResponse {
  data: FullEspisode;
}

export interface Episode {
  mal_id: number;
  title: string;
  episode: string;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

export interface FullEspisode {
  aired: Date;
  duration: number;
  filler: boolean;
  mal_id: number;
  recap: boolean;
  synopsis: string;
  title: string;
  title_japanese: string;
  title_romanji: string;
  url: string;
}
