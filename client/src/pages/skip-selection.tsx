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
    // Exact replica matching the WeWantWaste reference image
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
        <defs>
          <linearGradient id="yellow1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFD54F"/>
            <stop offset="100%" style="stop-color:#FFB300"/>
          </linearGradient>
          <linearGradient id="yellow2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFC107"/>
            <stop offset="100%" style="stop-color:#FF8F00"/>
          </linearGradient>
          <linearGradient id="yellowDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FF8F00"/>
            <stop offset="100%" style="stop-color:#E65100"/>
          </linearGradient>
        </defs>
        
        <!-- Gray background -->
        <rect width="400" height="240" fill="#BDBDBD"/>
        
        <!-- Skip container with exact perspective -->
        <g transform="translate(15, 50)">
          <!-- Left visible side -->
          <path d="M0 120 L0 40 L60 20 L60 100 Z" fill="url(#yellowDark)"/>
          
          <!-- Main front face -->
          <path d="M60 120 L60 20 L310 20 L310 120 Z" fill="url(#yellow1)"/>
          
          <!-- Right angled side -->
          <path d="M310 120 L310 20 L370 40 L370 140 Z" fill="url(#yellow2)"/>
          
          <!-- Top left lid -->
          <path d="M0 40 L60 20 L185 20 L125 40 Z" fill="#FFECB3"/>
          
          <!-- Top right lid -->
          <path d="M185 20 L310 20 L370 40 L245 40 Z" fill="#FFF176"/>
          
          <!-- Top opening -->
          <rect x="75" y="20" width="220" height="20" fill="#FFD700"/>
          
          <!-- Lifting hooks -->
          <rect x="95" y="22" width="8" height="14" rx="1" fill="#E65100"/>
          <rect x="267" y="22" width="8" height="14" rx="1" fill="#E65100"/>
          
          <!-- Red chevron markings on left -->
          <g fill="#D32F2F">
            <polygon points="-5,60 10,55 10,65"/>
            <polygon points="-5,75 10,70 10,80"/>
            <polygon points="-5,90 10,85 10,95"/>
            <polygon points="-5,105 10,100 10,110"/>
          </g>
          
          <!-- Red chevron markings on right -->
          <g fill="#D32F2F">
            <polygon points="375,55 360,60 375,65"/>
            <polygon points="375,70 360,75 375,80"/>
            <polygon points="375,85 360,90 375,95"/>
            <polygon points="375,100 360,105 375,110"/>
          </g>
          
          <!-- WeWantWaste logo -->
          <g transform="translate(185,70)">
            <!-- Blue flame/leaf shapes -->
            <g fill="#1565C0">
              <ellipse cx="-45" cy="-5" rx="18" ry="28" fill="none" stroke="#1565C0" stroke-width="3"/>
              <path d="M-52 -15 C-48 -25 -38 -20 -35 -10 C-32 -18 -25 -15 -28 -5 C-25 2 -32 5 -38 2 C-45 5 -50 0 -48 -8 Z"/>
              <path d="M-45 -10 C-42 -18 -35 -15 -32 -8 C-30 -14 -25 -12 -27 -6 C-25 -2 -30 0 -35 -2 C-40 0 -43 -4 -42 -8 Z"/>
            </g>
            
            <!-- Text -->
            <text x="0" y="-15" text-anchor="middle" font-family="Arial,sans-serif" 
                  font-size="18" font-weight="900" fill="#1565C0">WE</text>
            <text x="0" y="0" text-anchor="middle" font-family="Arial,sans-serif" 
                  font-size="18" font-weight="900" fill="#1565C0">WANT</text>
            <text x="0" y="15" text-anchor="middle" font-family="Arial,sans-serif" 
                  font-size="18" font-weight="900" fill="#1565C0">WASTE</text>
          </g>
          
          <!-- Bottom base -->
          <path d="M60 120 L310 120 L370 140 L0 140 Z" fill="#B8860B"/>
          
          <!-- Bottom lifting points -->
          <ellipse cx="80" cy="135" rx="12" ry="6" fill="#8D6E63"/>
          <ellipse cx="290" cy="135" rx="12" ry="6" fill="#8D6E63"/>
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