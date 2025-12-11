export interface DemoResponse {
  message: string;
}

export interface CollectionItem {
  id: string;
  name: string;
  category?: string;
  price?: number;
  description?: string;
  imageUrl: string;
  createdAt: string;
}

export interface CollectionItemInput {
  name: string;
  category?: string;
  price?: number;
  description?: string;
  imageUrl: string;
}

export interface CollectionsListResponse {
  items: CollectionItem[];
}

export interface CollectionItemResponse {
  item: CollectionItem;
}

export interface CartLine {
  itemId: string;
  name: string;
  imageUrl: string;
  price?: number;
  qty: number;
}

export interface OrderInput {
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  items: CartLine[];
}

export interface OrderResponse {
  id: string;
  success: boolean;
}
