import { z } from "zod";

// Raw API response schema
const rawSkipSchema = z.object({
  id: z.number(),
  size: z.number(),
  hire_period_days: z.number(),
  transport_cost: z.number().nullable(),
  per_tonne_cost: z.number().nullable(),
  price_before_vat: z.number(),
  vat: z.number(),
  postcode: z.string(),
  area: z.string(),
  forbidden: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  allowed_on_road: z.boolean(),
  allows_heavy_waste: z.boolean(),
});

// Transformed schema for frontend use
export const skipApiResponseSchema = rawSkipSchema.transform((data) => ({
  id: data.id,
  name: `${data.size} Yard Skip`,
  size: data.size.toString(),
  dimensions: `Suitable for ${data.size} cubic yards of waste`,
  capacity: `${data.size} cubic yards`,
  price: Math.round(data.price_before_vat * (1 + data.vat / 100)),
  originalPrice: undefined,
  imageUrl: undefined,
  suitableFor: data.size <= 4 
    ? ['Garden clearance', 'Small renovations', 'House clearouts']
    : data.size <= 8
    ? ['Home renovations', 'Garden projects', 'Construction waste']
    : ['Large construction', 'Commercial projects', 'Major clearouts'],
  isPopular: data.size === 6,
  features: [
    `${data.hire_period_days}-day hire period`,
    'Free delivery & collection',
    data.allowed_on_road ? 'Road placement allowed' : 'Private land only',
    data.allows_heavy_waste ? 'Heavy waste accepted' : 'Standard waste only'
  ],
}));

export const skipsApiResponseSchema = z.array(skipApiResponseSchema);

export type SkipApiResponse = z.infer<typeof skipApiResponseSchema>;

export async function fetchSkips(): Promise<SkipApiResponse[]> {
  const response = await fetch('/api/skips');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch skips: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Validate and return the data
  return skipsApiResponseSchema.parse(data);
}
