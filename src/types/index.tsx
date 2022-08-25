import * as BoxIcons from "react-icons/bi";

export type Collection = {
  id: number;
  name: string;
  title: string;
  icon: keyof typeof BoxIcons;
  type: string;
  items: CollectionItem[]
};

export type ItemCollectionType = {
  name: string;
  type: string;
}

export type ItemState = "pre-order" | "sealed" | "built" | "opened" | "boxed" | "unknown";
export type ItemStateIcon = 'BiHourglass' | 'BiPackage' | 'BiLandscape' | 'BiBox' | 'BiEnvelopeOpen' | 'BiQuestionMark';

export type RefUrl = {
  url: string;
  name: string;
}
export type Price = {
  amount: number;
  currency: string;
}

type LegoMeta = {
  number: number;
  pieces: number;
  theme: string;
  subtheme?: string;
  minifigs: number;
}
type NendoroidMeta = {
  number: number | string;
  series: string;
  manufacturer: string;
}
type VideoGameMeta = {
  platform: string;
  developer: string;
  rating: string;
  genre: string[],
  game_progress: string;
  times_played: number;
}

type StandardItem = {
  type: string;
  _id: string;
  name: string;
  state: ItemState;
  quantity: number;
  release_date: string;
  price: Price;
  ean: string;
  link?: RefUrl;
  discontinued_date?: string;
  selling_price?: number;
}

export type LegoItem = StandardItem & {
  meta: LegoMeta
};

export type NendoroidItem = StandardItem & {
  meta: NendoroidMeta;
};

export type VideoGameItem = StandardItem & {
  meta: VideoGameMeta;
};

export type CollectionItem = LegoItem | NendoroidItem | VideoGameItem;

export type LegoTheme = {
  id: number;
  name: string;
  subthemes: string[];
};