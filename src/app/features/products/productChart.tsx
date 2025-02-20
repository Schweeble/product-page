import { useAppSelector } from "@/app/hooks";
import { selectProducts } from "./productsSlice";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/productTypes";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";

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
    <div>
      <CardHeader>
        <CardTitle>Retail Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={product.sales}
            margin={{ left: 12, right: 12 }}
            accessibilityLayer
          >
            <XAxis
              dataKey={"weekEnding"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis domain={["dataMin - 500000", "dataMax + 1000000"]} hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="retailSales"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={4}
              dot={false}
              name="Retail Sales"
            />
            <Line
              dataKey="wholesaleSales"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={4}
              dot={false}
              name="Wholesale Sales"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </div>
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
