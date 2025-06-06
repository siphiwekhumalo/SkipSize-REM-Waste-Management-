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
    // Create exact replica of WeWantWaste skip containers from examples
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="yellowMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#FFC107;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FF8F00;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="yellowTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFECB3;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#FFD700;stop-opacity:1" />
          </linearGradient>
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        
        <rect width="400" height="300" fill="#D3D3D3"/>
        
        <!-- Skip Container with 3D perspective -->
        <g transform="translate(20,30)">
          <!-- Left side panel (angled) -->
          <path d="M20 200 L20 100 L35 85 L35 185 Z" fill="#E6AC00" stroke="#D4A017" stroke-width="1"/>
          
          <!-- Main front face -->
          <path d="M35 200 L35 85 L315 85 L315 200 Z" fill="url(#yellowMain)" stroke="#D4A017" stroke-width="2" filter="url(#dropShadow)"/>
          
          <!-- Right side panel (angled) -->
          <path d="M315 200 L315 85 L330 100 L330 215 Z" fill="#CC9900" stroke="#D4A017" stroke-width="1"/>
          
          <!-- Top rim with 3D effect -->
          <path d="M20 100 L35 85 L315 85 L330 100 L315 110 L35 110 Z" fill="url(#yellowTop)" stroke="#D4A017" stroke-width="1"/>
          
          <!-- Top opening -->
          <rect x="50" y="85" width="250" height="25" fill="#FFD700" stroke="#D4A017" stroke-width="1"/>
          
          <!-- Lifting hooks on top -->
          <rect x="70" y="87" width="12" height="18" rx="2" fill="#B8860B"/>
          <rect x="268" y="87" width="12" height="18" rx="2" fill="#B8860B"/>
          
          <!-- Red warning chevrons on left side -->
          <g fill="#DC2626">
            <polygon points="15,120 25,115 25,125"/>
            <polygon points="15,140 25,135 25,145"/>
            <polygon points="15,160 25,155 25,165"/>
            <polygon points="15,180 25,175 25,185"/>
          </g>
          
          <!-- Red warning chevrons on right side -->
          <g fill="#DC2626">
            <polygon points="335,115 325,120 335,125"/>
            <polygon points="335,135 325,140 335,145"/>
            <polygon points="335,155 325,160 335,165"/>
            <polygon points="335,175 325,180 335,185"/>
          </g>
          
          <!-- WeWantWaste Logo centered on front -->
          <g transform="translate(175,142)">
            <!-- Blue oval logo -->
            <ellipse cx="-50" cy="0" rx="22" ry="35" fill="none" stroke="#1E40AF" stroke-width="4"/>
            <ellipse cx="-50" cy="-5" rx="14" ry="20" fill="none" stroke="#1E40AF" stroke-width="3"/>
            <ellipse cx="-50" cy="-8" rx="8" ry="12" fill="none" stroke="#1E40AF" stroke-width="2"/>
            
            <!-- Company text -->
            <text x="15" y="-18" text-anchor="middle" font-family="Arial Black,sans-serif" 
                  font-size="24" font-weight="900" fill="#1E40AF">WE</text>
            <text x="15" y="0" text-anchor="middle" font-family="Arial Black,sans-serif" 
                  font-size="24" font-weight="900" fill="#1E40AF">WANT</text>
            <text x="15" y="18" text-anchor="middle" font-family="Arial Black,sans-serif" 
                  font-size="24" font-weight="900" fill="#1E40AF">WASTE</text>
          </g>
          
          <!-- Bottom base with 3D effect -->
          <path d="M35 200 L315 200 L330 215 L20 215 Z" fill="#B8860B" stroke="#996515" stroke-width="1"/>
          
          <!-- Bottom lifting points -->
          <ellipse cx="60" cy="210" rx="8" ry="4" fill="#8B4513"/>
          <ellipse cx="290" cy="210" rx="8" ry="4" fill="#8B4513"/>
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