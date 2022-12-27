import { type } from "os";

export type Item = {
  id: number;
  name: string;
  series: string;
  year: number;
  description: string;
  setprice: string;
  color: string;
  deleted: boolean;
};

export type Stock = {
  id: number;
  item_id: number;
  price: number;
  size: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  amount: number;
  arrival: Date;
  condition: string;
  deleted: boolean;
  items: Item;
};

export type Users = {
  id: number;
  firstName: string;
  lastName: string;
  kanaFirstName: string;
  kanaLastName: string;
  email: string;
  password: string;
  zipCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string | null;
  phoneNumber: string;
};

export type FavoriteItem = {
  id: number;
  itemId: number;
  cookieName: string | undefined;
  name: string;
  price: number;
  size: number;
  imagePath: string;
  condition: string;
};

export type FavoriteItem2 = {
  condition: string;
  imagePath: string;
  size: number;
  price: number;
  name: string;
  id: number;
  itemId: number;
  cookieName: string | undefined;
};

export type ShoppingCart = {
  id: number;
  stock_id: number[];
  stocks: Stock;
};

export type Order = {
  id: number;
  userId: string;
  totalPrice: number;
  orderDate: string;
  note: string;
  paymentMethod: string;
  orderItemList: any[];
  shipStatus: string;
};

export type UsedItems = {
  receptionDate: string;
  cookieName: string | undefined;
  sellerLastName: string;
  sellerFirstName: string;
  sellerKanaLastName: string;
  sellerKanaFirstName: string;
  sellerPhoneNumber: string;
  sellerEmail: string;
  sellerZipCode: string;
  sellerPrefecture: string;
  sellerCity: string;
  sellerAddress: string;
  sellerBuilding: string | undefined;
  itemName: string;
  itemCode: string;
  itemSize: string;
  itemColor: string;
  itemNote: string;
  itemStatus: "完了" | "買取処理中";
  id: number;
};

export type TopUsedItems = {
  receptionDate: string;
  itemName: string;
  itemCode: string;
  itemSize: string;
  itemColor: string;
  itemStatus: "完了" | "買取処理中";
  id: number;
};
