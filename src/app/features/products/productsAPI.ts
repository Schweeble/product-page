import { Product } from "../../../types/productTypes";

export default function fetchProducts() {
  return fetch("./data.json")
    .then((data) => data.json())
    .then((json) => {
      return json as Product[];
    });
}
