import { Product } from "@/types/productTypes";

function Tag({ text }: { text: string }) {
  return (
    <div className="m-0.5 p-0.5 border rounded-md pl-2 pr-2 border-gray-300 shadow-sm text-gray-500">
      {text}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col justify-center items-center divide-gray-500 divide-solid">
      <img className="h-50 w-50" src={product.image} />
      <div className="font-bold">{product.title}</div>
      <div className="text-gray-500 text-center">{product.subtitle}</div>
      {/* divider*/}
      <div className="flex-1 border-b border-gray-300"></div>
      <div className="flex items-center flex-wrap">
        {product.tags.map((tag) => (
          <Tag text={tag} key={tag} />
        ))}
      </div>
    </div>
  );
}
