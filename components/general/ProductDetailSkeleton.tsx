import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-1 py-8">
      <div className="mb-6">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <Skeleton className="aspect-square rounded-lg" />
        </div>

        <div className="space-y-6">
          <div>
            <Skeleton className="h-6 w-24 mb-3" />
            <Skeleton className="h-9 w-3/4 mb-4" />

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-5" />
                ))}
                <Skeleton className="h-5 w-24 ml-2" />
              </div>
            </div>

            <Skeleton className="h-12 w-32 mb-6" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-10 w-32" />
          </div>

          <Skeleton className="h-11 w-40" />
        </div>
      </div>

      <div>
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
