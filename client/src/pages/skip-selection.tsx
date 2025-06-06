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
    // Exact replica of WeWantWaste skip container from the provided image
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280">
        <defs>
          <linearGradient id="yellowBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFD700"/>
            <stop offset="100%" style="stop-color:#FFA500"/>
          </linearGradient>
          <linearGradient id="yellowSide" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#E6AC00"/>
            <stop offset="100%" style="stop-color:#CC9900"/>
          </linearGradient>
          <linearGradient id="yellowTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#FFF176"/>
            <stop offset="100%" style="stop-color:#FFD700"/>
          </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="400" height="280" fill="#BDBDBD"/>
        
        <!-- Skip Container -->
        <g transform="translate(10,40)">
          <!-- Left side (perspective) -->
          <path d="M10 160 L10 80 L40 60 L40 140 Z" fill="url(#yellowSide)"/>
          
          <!-- Main front face -->
          <path d="M40 160 L40 60 L320 60 L320 160 Z" fill="url(#yellowBody)"/>
          
          <!-- Right side (angled) -->
          <path d="M320 160 L320 60 L350 80 L350 180 L320 160 Z" fill="url(#yellowSide)"/>
          
          <!-- Top lid (left section) -->
          <path d="M10 80 L40 60 L180 60 L150 80 Z" fill="url(#yellowTop)"/>
          
          <!-- Top lid (right section) -->
          <path d="M180 60 L320 60 L350 80 L210 80 Z" fill="url(#yellowTop)"/>
          
          <!-- Top opening edge -->
          <rect x="60" y="60" width="240" height="20" fill="#FFD700"/>
          
          <!-- Lifting hooks -->
          <rect x="80" y="62" width="10" height="16" rx="2" fill="#CC9900"/>
          <rect x="270" y="62" width="10" height="16" rx="2" fill="#CC9900"/>
          
          <!-- Red warning chevrons on left -->
          <g fill="#D32F2F">
            <path d="M5 100 L15 95 L15 105 Z"/>
            <path d="M5 120 L15 115 L15 125 Z"/>
            <path d="M5 140 L15 135 L15 145 Z"/>
          </g>
          
          <!-- Red warning chevrons on right -->
          <g fill="#D32F2F">
            <path d="M355 95 L345 100 L355 105 Z"/>
            <path d="M355 115 L345 120 L355 125 Z"/>
            <path d="M355 135 L345 140 L355 145 Z"/>
          </g>
          
          <!-- WeWantWaste Logo -->
          <g transform="translate(180,110)">
            <!-- Blue flame logo -->
            <g fill="#1976D2">
              <path d="M-60 0 C-65 -15 -55 -25 -45 -20 C-40 -30 -25 -25 -25 -10 C-20 -20 -10 -15 -15 0 C-10 10 -20 15 -30 10 C-40 15 -50 10 -45 0 Z"/>
              <path d="M-50 -5 C-52 -12 -48 -18 -42 -15 C-40 -20 -32 -18 -32 -8 C-30 -15 -25 -12 -27 -5 C-25 0 -30 3 -35 1 C-40 3 -45 1 -42 -5 Z"/>
            </g>
            
            <!-- Company text -->
            <text x="0" y="-8" text-anchor="middle" font-family="Arial,sans-serif" 
                  font-size="22" font-weight="900" fill="#1976D2">WE</text>
            <text x="0" y="12" text-anchor="middle" font-family="Arial,sans-serif" 
                  font-size="22" font-weight="900" fill="#1976D2">WANT</text>
            <text x="0" y="32" text-anchor="middle" font-family="Arial,sans-serif" 
                  font-size="22" font-weight="900" fill="#1976D2">WASTE</text>
          </g>
          
          <!-- Bottom runners -->
          <path d="M40 160 L320 160 L350 180 L10 180 Z" fill="#B8860B"/>
          
          <!-- Bottom lifting brackets -->
          <g fill="#8D6E63">
            <path d="M70 170 L90 170 L85 185 L75 185 Z"/>
            <path d="M270 170 L290 170 L285 185 L275 185 Z"/>
          </g>
        </g>
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