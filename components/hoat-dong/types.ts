export interface FilterItem {
  id: string
  key: string
  comparator: string
  value: any
}

export const comparatorDisplayValues = {
  "equal": "=",
  "before": "<",
  "after": ">",
  "afterIncluding": ">=",
  "beforeIncluding": "<=",
  "none": ""
} as const
