import * as BoxIcons from "react-icons/bi";

export type Collection = {
  id: number;
  name: string;
  title: string;
  icon: keyof typeof BoxIcons;
  type: string;
  items: CollectionItem[]
};

export type ItemState = "pre-order" | "sealed" | "built" | "opened" | "boxed" | "sold";
export type ItemStateIcon = 'BiHourglass' | 'BiPackage' | 'BiLandscape' | 'BiBox' | 'BiDollar' | 'BiEnvelopeOpen';
export type RefUrl = {
  url: string;
  name: string;
}

type StandardItem = {
  type: string;
  id: number;
  name: string;
  state: ItemState;
  quantity: number;
  release_date: string;
  currency: string;
  price: number;
  ean: string;
  links?: RefUrl[];
}

export type LegoItem = StandardItem & {
  number: number;
  pieces: number;
  theme: string;
  subtheme?: string;
  minifigs: number;
  discontinued_date?: string;
  selling_price?: number;
};

export type NendoroidItem = StandardItem & {
  number: number | string;
  series: string;
  manufacturer: string;
};

export type VideoGameItem = StandardItem & {
  platform: string;
  developer: string;
  rating: string;
  genre: string[],
  game_progress: string;
  times_played: number;
};

export type CollectionItem = LegoItem | NendoroidItem | VideoGameItem;

export type LegoTheme = {
  id: number;
  name: string;
  subthemes: string[];
};