export type ItemType = {
  category_id: number;
  user_id: number;
  price: number;
  title: string;
  body: string;
  uuid: string;
  city: string;
  sellStatus: boolean;
  lastUser_id: number;
  name: string;
  id: number;
  Items: ItemType[];
  img: string;
  editedPost: ItemType[];
  FotoGaleries: FotoType[];
};

export type ItemStateSlice = {
  allProduct: ItemType[];
};
export type UserItemStateSlice = {
  userItems: ItemType[];
};
export type PostIdType = {
  id: string;
};

export type itemFormType = {
  title: string;
  body: string;
  city: string;
  category_id: string;
};

export type FotoType = {
  id: number;
  img: string;
  item_id: number;
  title: string;
  body: string;
  city:string
  FotoGaleries:string
};
