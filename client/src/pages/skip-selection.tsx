import { useQuery } from "@tanstack/react-query";
import { fetchSkips } from "@/lib/api";
import { MapPin, Calendar, CreditCard, FileCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { SkipApiResponse } from "@/lib/api";
import skipImagePath from "@assets/ChatGPT Image Jun 6, 2025, 11_41_03 AM.png";

export default function SkipSelection() {
  const { data: skips, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/skips'],
    queryFn: fetchSkips,
  });

  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);

  const handleSelectSkip = (skipId: number) => {
    const selectedSkip = skips?.find(skip => skip.id === skipId);
    setSelectedSkipId(skipId);
    console.log('Selected skip:', selectedSkip);
  };

  const getSkipImage = (size: number) => {
    // Create properly sized skip images with correct yard labels
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FFC300;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="#f5f5f5"/>
        
        <!-- Skip Container -->
        <g transform="translate(50,40)">
          <!-- Main container body -->
          <path d="M30 180 L30 90 L50 70 L250 70 L270 90 L270 180 L250 200 L50 200 Z" 
                fill="url(#yellowGrad)" 
                stroke="#E6B800" 
                stroke-width="2"/>
          
          <!-- Top opening -->
          <rect x="35" y="70" width="230" height="30" fill="#FFD700" stroke="#E6B800" stroke-width="1"/>
          <rect x="50" y="75" width="15" height="20" fill="#DAA520"/>
          <rect x="235" y="75" width="15" height="20" fill="#DAA520"/>
          
          <!-- Side warning stripes -->
          <g stroke="#DC2626" stroke-width="4" fill="none">
            <line x1="25" y1="100" x2="15" y2="120"/>
            <line x1="25" y1="130" x2="15" y2="150"/>
            <line x1="25" y1="160" x2="15" y2="180"/>
            <line x1="275" y1="100" x2="285" y2="120"/>
            <line x1="275" y1="130" x2="285" y2="150"/>
            <line x1="275" y1="160" x2="285" y2="180"/>
          </g>
          
          <!-- WeWantWaste Logo -->
          <g transform="translate(150,135)">
            <!-- Logo oval -->
            <ellipse cx="-40" cy="0" rx="20" ry="30" fill="none" stroke="#2563EB" stroke-width="3"/>
            <ellipse cx="-40" cy="0" rx="12" ry="18" fill="none" stroke="#2563EB" stroke-width="2"/>
            
            <!-- Company text -->
            <text x="10" y="-15" text-anchor="middle" font-family="Arial,sans-serif" 
                  font-size="20" font-weight="900" fill="#2563EB">WE</text>
            <text x="10" y="0" text-anchor="middle" font-family="Arial,sans-serif" 
                  font-size="20" font-weight="900" fill="#2563EB">WANT</text>
            <text x="10" y="15" text-anchor="middle" font-family="Arial,sans-serif" 
                  font-size="20" font-weight="900" fill="#2563EB">WASTE</text>
          </g>
          
          <!-- Bottom runners -->
          <rect x="40" y="195" width="220" height="8" fill="#DAA520"/>
          <rect x="50" y="200" width="15" height="8" rx="3" fill="#B8860B"/>
          <rect x="235" y="200" width="15" height="8" rx="3" fill="#B8860B"/>
        </g>
        
        <!-- Size badge -->
        <rect x="300" y="20" width="80" height="35" rx="17" fill="#2563EB"/>
        <text x="340" y="42" text-anchor="middle" font-family="Arial,sans-serif" 
              font-size="16" font-weight="bold" fill="white">${size} Yards</text>
      </svg>
    `)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse">
                <div className="h-48 bg-gray-700 rounded mb-4"></div>
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-10 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Unable to Load Skip Options</h3>
          <p className="text-gray-300 mb-6">{error.message}</p>
          <Button onClick={() => refetch()} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Progress Steps */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-4 md:space-x-8 overflow-x-auto">
            <StepIndicator icon={MapPin} label="Postcode" isCompleted={true} isActive={false} />
            <StepIndicator icon={FileCheck} label="Waste Type" isCompleted={true} isActive={false} />
            <StepIndicator icon={Check} label="Select Skip" isCompleted={false} isActive={true} />
            <StepIndicator icon={FileCheck} label="Permit Check" isCompleted={false} isActive={false} />
            <StepIndicator icon={Calendar} label="Choose Date" isCompleted={false} isActive={false} />
            <StepIndicator icon={CreditCard} label="Payment" isCompleted={false} isActive={false} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Skip Size</h1>
          <p className="text-gray-300 text-lg">Select the skip size that best suits your needs</p>
        </div>

        {/* Skip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {skips?.map((skip) => (
            <SkipCard 
              key={skip.id} 
              skip={skip} 
              isSelected={selectedSkipId === skip.id}
              onSelect={() => handleSelectSkip(skip.id)}
              image={getSkipImage(parseInt(skip.size))}
            />
          ))}
        </div>

        {/* Add bottom padding to prevent overlap with fixed bottom bar */}
        {selectedSkipId && <div className="h-20 md:h-0"></div>}
      </div>

      {/* Bottom Navigation */}
      {selectedSkipId && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 z-50">
          <div className="container max-w-7xl mx-auto">
            {/* Mobile Layout */}
            <div className="flex flex-col sm:hidden space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold text-sm">
                    {skips?.find(s => s.id === selectedSkipId)?.name}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400 font-bold text-lg">
                      £{skips?.find(s => s.id === selectedSkipId)?.price || 0}
                    </span>
                    <span className="text-gray-400 text-xs">7 day hire</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700">
                  Back
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Continue →
                </Button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-white font-semibold">
                  {skips?.find(s => s.id === selectedSkipId)?.name}
                </span>
                <span className="text-blue-400 font-bold text-xl">
                  £{skips?.find(s => s.id === selectedSkipId)?.price || 0}
                </span>
                <span className="text-gray-400 text-sm">7 day hire</span>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  Back
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 px-8">
                  Continue →
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepIndicator({ icon: Icon, label, isCompleted, isActive }: {
  icon: any;
  label: string;
  isCompleted: boolean;
  isActive: boolean;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isCompleted ? 'bg-blue-600' : isActive ? 'bg-blue-600' : 'bg-gray-600'
      }`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <span className={`text-sm font-medium hidden sm:block ${
        isActive ? 'text-white' : 'text-gray-400'
      }`}>
        {label}
      </span>
    </div>
  );
}

function SkipCard({ skip, isSelected, onSelect, image }: {
  skip: SkipApiResponse;
  isSelected: boolean;
  onSelect: () => void;
  image: string;
}) {
  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 ${
      isSelected ? 'ring-2 ring-blue-500 bg-gray-750' : 'hover:bg-gray-750'
    }`}>
      {/* Skip Image */}
      <div className="relative">
        <img 
          src={image}
          alt={skip.name}
          className="w-full h-48 object-cover"
        />
        {/* Size Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-blue-600 text-white border-0">
            {skip.size}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{skip.name}</h3>
        <p className="text-gray-400 text-sm mb-4">
          {skip.features?.[0] || '14 day hire period'}
        </p>
        
        {/* Price */}
        <div className="mb-6">
          <span className="text-3xl font-bold text-blue-400">£{skip.price}</span>
        </div>

        {/* Select Button */}
        {isSelected ? (
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            Selected
          </Button>
        ) : (
          <Button 
            onClick={onSelect}
            variant="outline" 
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Select This Skip →
          </Button>
        )}
      </div>
    </div>
  );
}