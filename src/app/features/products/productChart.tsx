import { useAppSelector } from "@/app/hooks";
import { selectProducts } from "./productsSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/productTypes";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function SalesChart({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retail Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={product.sales} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"weekEnding"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="retailSales"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="wholesaleSales"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default function ProductChart({
  productId,
}: {
  productId: string | undefined;
}) {
  const products = useAppSelector(selectProducts);
  if (productId) {
    const product = products.find((p) => p.id === productId);
    if (product) {
      return <SalesChart product={product} />;
    }
  }
  return <div>failed to load product</div>;
}
