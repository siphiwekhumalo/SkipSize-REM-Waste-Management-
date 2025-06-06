import { z } from "zod";

export const skipApiResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  size: z.string(),
  dimensions: z.string().optional(),
  capacity: z.string().optional(),
  price: z.number(),
  originalPrice: z.number().optional(),
  imageUrl: z.string().optional(),
  suitableFor: z.array(z.string()).optional(),
  isPopular: z.boolean().optional(),
  features: z.array(z.string()).optional(),
});

export const skipsApiResponseSchema = z.array(skipApiResponseSchema);

export type SkipApiResponse = z.infer<typeof skipApiResponseSchema>;

export async function fetchSkips(): Promise<SkipApiResponse[]> {
  const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch skips: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Handle different possible response structures
  let skipsData;
  if (Array.isArray(data)) {
    skipsData = data;
  } else if (data.skips && Array.isArray(data.skips)) {
    skipsData = data.skips;
  } else if (data.data && Array.isArray(data.data)) {
    skipsData = data.data;
  } else {
    throw new Error('Invalid API response structure');
  }
  
  return skipsApiResponseSchema.parse(skipsData);
}
