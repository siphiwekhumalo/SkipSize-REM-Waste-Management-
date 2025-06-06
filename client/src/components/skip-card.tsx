import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ruler, Weight, Check, ShoppingCart } from "lucide-react";
import type { SkipApiResponse } from "@/lib/api";

interface SkipCardProps {
  skip: SkipApiResponse;
  onSelect: () => void;
}

export default function SkipCard({ skip, onSelect }: SkipCardProps) {
  const defaultImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600";
  
  const formatPrice = (price: number) => `£${price.toFixed(0)}`;
  
  const features = skip.features || [
    "Free delivery & collection",
    "14-day hire period", 
    "Same day delivery available"
  ];

  const suitableFor = skip.suitableFor || [
    "Garden clearance",
    "Small renovations",
    "House clearouts"
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer group">
      
      {/* Skip Image */}
      <div className="relative overflow-hidden rounded-t-xl bg-gray-100 h-48 group-hover:scale-105 transition-transform duration-300">
        <img 
          src={skip.imageUrl || defaultImageUrl}
          alt={skip.name}
          className="w-full h-full object-cover" 
        />
        
        {/* Popular Badge */}
        {skip.isPopular && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-secondary text-white">
              Most Popular
            </Badge>
          </div>
        )}
        
        {/* Size Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold">
          {skip.size}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Skip Name & Details */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {skip.name}
          </h3>
          {skip.dimensions && (
            <div className="flex items-center text-gray-600 mb-2">
              <Ruler className="text-primary w-4 h-4 mr-2" />
              <span className="text-sm">{skip.dimensions}</span>
            </div>
          )}
          {skip.capacity && (
            <div className="flex items-center text-gray-600">
              <Weight className="text-primary w-4 h-4 mr-2" />
              <span className="text-sm">{skip.capacity}</span>
            </div>
          )}
        </div>

        {/* Suitable For */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Perfect for:</h4>
          <div className="flex flex-wrap gap-1">
            {suitableFor.map((item, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">{formatPrice(skip.price)}</span>
              <span className="text-sm text-gray-500 ml-1">inc. VAT</span>
            </div>
            {skip.originalPrice && skip.originalPrice > skip.price && (
              <div className="text-right">
                <div className="text-xs text-gray-500">
                  Was <span className="line-through">{formatPrice(skip.originalPrice)}</span>
                </div>
                <div className="text-xs text-secondary font-semibold">
                  Save {formatPrice(skip.originalPrice - skip.price)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600 mb-1">
              <Check className="text-secondary w-4 h-4 mr-2" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Select Button */}
        <Button 
          className="w-full bg-primary hover:bg-blue-700 text-white font-semibold" 
          onClick={onSelect}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Select This Skip
        </Button>
      </div>
    </div>
  );
}
