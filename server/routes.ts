import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Skip data endpoint - proxy to external API
  app.get("/api/skips", async (req, res) => {
    try {
      const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
      
      if (!response.ok) {
        return res.status(response.status).json({ 
          error: `Failed to fetch skips: ${response.status} ${response.statusText}` 
        });
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
        return res.status(500).json({ error: 'Invalid API response structure' });
      }
      
      res.json(skipsData);
    } catch (error) {
      console.error('Error fetching skips:', error);
      res.status(500).json({ error: 'Failed to fetch skip data' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
