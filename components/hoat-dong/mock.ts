import type { Activity, Product } from "./types"

function pad(value: number) {
  return value.toString().padStart(2, "0")
}

function formatYyyyMmDd(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function formatHhMm(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const categories = [
  "Beverages",
  "Snacks",
  "Dairy",
  "Bakery",
  "Produce",
  "Frozen",
  "Household",
  "Personal Care",
]

const brands = [
  "Acme",
  "Globex",
  "Initech",
  "Umbrella",
  "Soylent",
  "Stark",
  "Wayne",
  "Wonka",
]

const units = ["pcs", "box", "kg", "g", "l", "ml"]

export const mockProducts: Product[] = Array.from({ length: 20 }).map((_, index) => {
  const idNum = index + 1
  const baseDate = new Date(2025, 0, 1)
  baseDate.setDate(baseDate.getDate() + idNum * 3)
  const mfg = new Date(baseDate)
  const exp = new Date(baseDate)
  exp.setMonth(exp.getMonth() + 12)

  return {
    id: `P${idNum.toString().padStart(3, "0")}`,
    name: `Product ${idNum}`,
    category: categories[index % categories.length],
    image: `/images/product-${(index % 6) + 1}.png`,
    brand: brands[(index * 3) % brands.length],
    unit: units[(index * 5) % units.length],
    manufacturing_date: formatYyyyMmDd(mfg),
    expiration_date: formatYyyyMmDd(exp),
  }
})

function randomFrom<T>(arr: T[], i: number) {
  return arr[i % arr.length]
}

const activityTypes: Activity["type"][] = ["checkin", "checkout"]
const activityBy: Activity["by"][] = ["QR", "hand"]

export const mockActivities: Activity[] = Array.from({ length: 100 }).map((_, index) => {
  const dayOffset = 100 - index
  const dt = new Date()
  dt.setDate(dt.getDate() - dayOffset)
  dt.setHours((index * 3) % 24, (index * 13) % 60, 0, 0)

  const product = mockProducts[index % mockProducts.length]

  return {
    id: `A${(index + 1).toString().padStart(4, "0")}`,
    created_date: formatYyyyMmDd(dt),
    created_time: formatHhMm(dt),
    product,
    type: randomFrom(activityTypes, index + product.id.length),
    by: randomFrom(activityBy, index + product.name.length),
  }
})


