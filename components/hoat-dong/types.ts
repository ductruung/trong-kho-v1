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
  chosen: boolean
}

export const comparatorDisplayValues = {
  "equal": "=",
  "before": "<",
  "after": ">",
  "afterIncluding": ">=",
  "beforeIncluding": "<=",
  "none": ""
} as const
