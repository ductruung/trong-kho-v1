
import { Heading } from "@/components/hoat-dong/Heading"
import { ViewBar } from "@/components/hoat-dong/ViewBar"
import { DataTable } from "@/components/hoat-dong/data-table"
import { columns, columns_seperated } from "@/components/hoat-dong/columns"
import { mockActivities } from "@/components/hoat-dong/mock"
import { PaginationBar } from "@/components/hoat-dong/PaginationBar"
import { PackageMinus, PackagePlus } from "lucide-react"

interface ActivitiesSearchParams {
  view?: string;
  filter?: string
  sort?: string
  page?: string
  rows?: string
  checkout_filter?: string
  checkin_filter?: string
  checkout_sort?: string
  checkin_sort?: string
  checkin_page?: string
  checkout_page?: string
  checkin_rows?: string
  checkout_rows?: string
}

/**
 * Fetches the total number of activity pages based on search parameters
 * @param activitiesSearchParams - The search parameters for filtering activities
 * @returns Promise resolving to either a single page count or separate counts for checkin/checkout
 */
async function fetchActivitiesPages(
  activitiesSearchParams: ActivitiesSearchParams
): Promise<number | { checkin: number, checkout: number }> {
  // Implementation
}

async function fetchActivities(activitiesSearchParams: ActivitiesSearchParams) {

}

export default async function HoatDongPage(props: {
  searchParams?: Promise<ActivitiesSearchParams>;
}) {
  const searchParams = await props.searchParams;
  const viewMode = searchParams?.view || "one";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="flex w-screen h-screen pt-12 pl-12">
      <Heading />
      <div className="h-full w-full">
        <ViewBar viewMode={viewMode} />
        {viewMode === "one" &&
          <div className="h-[calc(100vh-6.5rem)]">
            <DataTable
              columns={columns}
              data={mockActivities}
              viewMode={viewMode}
            />
          </div>
        }
        {viewMode === "two" &&
          <div className="grid grid-cols-2 h-[calc(100vh-6.5rem)] w-full">
            <DataTable
              columns={columns_seperated}
              data={mockActivities}
              viewMode={viewMode}
              tableTitle={
                <>
                  <PackageMinus strokeWidth={1.5} className="size-[20px]" />
                  <h2 className="text-sm">Bảng xuất kho</h2>
                </>
              }
            />
            <DataTable
              columns={columns_seperated}
              data={mockActivities}
              viewMode={viewMode}
              tableTitle={
                <>
                  <PackagePlus strokeWidth={1.5} className="size-[20px]" />
                  <h2 className="text-sm">Bảng nhập kho</h2>
                </>
              }
            />
          </div>
        }
      </div>
    </main>
  );
}