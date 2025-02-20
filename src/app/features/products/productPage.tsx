import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchAsync,
  selectProducts,
  selectProductStatus,
  selectSelectedProduct,
} from "./productsSlice";
import Loading from "@/components/util/loading";
import FailedToLoad from "@/components/product/failedToLoad";
import { useEffect } from "react";
import ProductCard from "@/app/features/products/productCard";
import ProductChart from "@/app/features/products/productChart";

function ProductLayout() {
  const products = useAppSelector(selectProducts);
  const selectedProduct = useAppSelector(selectSelectedProduct);

  const allProducts = [...products.values()];

  return (
    <div className="flex columns-2">
      <div className="max-w-sm m-4 p-4 rounded-lg shadow-md h-screen">
        {allProducts.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
      <div>
        <ProductChart productId={selectedProduct} />
      </div>
    </div>
  );
}

export function ProductPage() {
  const dispatch = useAppDispatch();
  const productStatus = useAppSelector(selectProductStatus);

  useEffect(() => {
    dispatch(fetchAsync());
  }, [dispatch]);

  switch (productStatus) {
    case "idle":
      return <ProductLayout />;
    case "loading":
      return <Loading />;
    case "failed":
      return <FailedToLoad />;
    default:
      <ProductLayout />;
  }
}
