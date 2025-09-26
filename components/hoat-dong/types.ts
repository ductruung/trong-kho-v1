export type Primitive = string | number | boolean | null | undefined | Date

export interface FilterItem {
  id: string
  key: string
  comparator: string
  value: any
}

export interface SortItem {
  id: string
  column: string
  order: string
  chosen?: boolean
}

export interface Product {
  id: string
  name: string
  category: string
  image: string
  brand: string
  unit: string
  manufacturing_date: string
  expiration_date: string
}

export interface Activity {
  id: string
  created_date: string
  created_time: string
  product: Product
  type: "checkin" | "checkout"
  by: "QR" | "hand"
}

export const comparatorDisplayValues = {
  "equal": "=",
  "before": "<",
  "after": ">",
  "afterIncluding": ">=",
  "beforeIncluding": "<=",
  "none": ""
} as const
