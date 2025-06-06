import { useQuery } from "@tanstack/react-query";
import { fetchSkips } from "@/lib/api";
import { MapPin, Calendar, CreditCard, FileCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { useLocation } from "wouter";
import type { SkipApiResponse } from "@/lib/api";
import skipImage1 from "@assets/IMG_5661.jpg";
import skipImage2 from "@assets/IMG_5662.jpg";
import skipImage3 from "@assets/IMG_5663.jpg";
import skipImage4 from "@assets/IMG_5664.jpg";
import Skip360Viewer from "@/components/skip-360-viewer";
import ThreeBackground from "@/components/three-background";

export default function SkipSelection() {
  const { data: skips, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/skips'],
    queryFn: fetchSkips,
  });

  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
  const [location, setLocation] = useLocation();

  const handleSelectSkip = (skipId: number) => {
    const selectedSkip = skips?.find(skip => skip.id === skipId);
    
    if (selectedSkipId === skipId) {
      setSelectedSkipId(null);
      console.log('Unselected skip');
    } else {
      setSelectedSkipId(skipId);
      console.log('Selected skip:', selectedSkip);
    }
  };

  const getSkipImages = (size: number) => {
    const skipImageSets = {
      4: [skipImage1, skipImage3, skipImage2],
      6: [skipImage2, skipImage1, skipImage3], 
      8: [skipImage3, skipImage2, skipImage1],
      10: [skipImage1, skipImage3, skipImage2],
      12: [skipImage2, skipImage1, skipImage3],
      14: [skipImage3, skipImage2, skipImage1],
      20: [skipImage4, skipImage2, skipImage3],
      40: [skipImage4, skipImage2, skipImage3]
    };
    return skipImageSets[size as keyof typeof skipImageSets] || [skipImage1, skipImage2, skipImage3];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 animate-pulse">
                <div className="bg-gray-700 h-48 rounded mb-4"></div>
                <div className="bg-gray-700 h-4 rounded mb-2"></div>
                <div className="bg-gray-700 h-8 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Unable to load skips</h2>
          <p className="text-gray-400 mb-6">Please try again</p>
          <Button onClick={() => refetch()} className="bg-orange-500 hover:bg-orange-600 text-black">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Three.js Animated Background */}
      <ThreeBackground />
      
      {/* Progress Steps */}
      <div className="bg-gray-900/90 border-b border-gray-700 relative z-10 backdrop-blur-sm">
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

      {/* Main Content with Sidebar Layout */}
      <div className="container max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-gray-800/90 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4">Filter by Size</h2>
              <div className="space-y-3">
                {['Small (4-6 yards)', 'Medium (8-10 yards)', 'Large (12-16 yards)', 'Extra Large (20-40 yards)'].map((range, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
                    <span className="text-gray-300">{range}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/90 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4">Quick Facts</h2>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2"></span>
                  <span>All skips include 14-day hire period</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2"></span>
                  <span>Free delivery and collection included</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2"></span>
                  <span>Road placement available for most sizes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Choose Your Skip Size
              </h1>
              <p className="text-gray-400 text-lg">
                Select the skip size that best suits your needs
              </p>
            </div>

            {/* Skip Cards in Masonry Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {skips?.map((skip) => (
                <SkipCard 
                  key={skip.id} 
                  skip={skip} 
                  isSelected={selectedSkipId === skip.id}
                  onSelect={() => handleSelectSkip(skip.id)}
                  images={getSkipImages(parseInt(skip.size))}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer - only show when skip is selected */}
        {selectedSkipId && (
          <div className="mt-8 p-4 bg-gray-800/50 rounded-lg relative z-10 backdrop-blur-sm">
            <p className="text-gray-400 text-sm text-center leading-relaxed">
              Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
            </p>
          </div>
        )}

        {/* Add bottom padding to prevent overlap with fixed bottom bar */}
        {selectedSkipId && <div className="h-32 md:h-0"></div>}
      </div>

      {/* Bottom Navigation */}
      {selectedSkipId && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 border-t border-gray-700 p-4 z-50 backdrop-blur-md">
          <div className="container max-w-7xl mx-auto">
            {/* Disclaimer */}
            <div className="mb-3 px-2">
              <p className="text-gray-400 text-xs text-center leading-relaxed">
                Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
              </p>
            </div>
            {/* Mobile Layout */}
            <div className="flex flex-col sm:hidden space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold text-sm">
                    {skips?.find(s => s.id === selectedSkipId)?.name}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-400 font-bold text-lg">
                      £{skips?.find(s => s.id === selectedSkipId)?.price || 0}
                    </span>
                    <span className="text-gray-400 text-xs">14 day hire</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-black font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50">
                  Back
                </Button>
                <Button 
                  onClick={() => setLocation(`/permit-check?skipId=${selectedSkipId}`)}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-black font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
                  <span className="relative z-10">Continue →</span>
                </Button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-white font-semibold">
                  {skips?.find(s => s.id === selectedSkipId)?.name}
                </span>
                <span className="text-orange-400 font-bold text-xl">
                  £{skips?.find(s => s.id === selectedSkipId)?.price || 0}
                </span>
                <span className="text-gray-400 text-sm">14 day hire</span>
              </div>
              <div className="flex space-x-4">
                <Button className="bg-orange-500 hover:bg-orange-600 text-black font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50">
                  Back
                </Button>
                <Button 
                  onClick={() => setLocation(`/permit-check?skipId=${selectedSkipId}`)}
                  className="bg-orange-600 hover:bg-orange-700 text-black font-semibold px-8 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
                  <span className="relative z-10">Continue →</span>
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
        isCompleted ? 'bg-orange-600 text-black' : 
        isActive ? 'bg-orange-500 text-black' : 'bg-gray-600 text-gray-300'
      }`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className={`text-sm font-medium ${
        isActive ? 'text-white' : 'text-gray-400'
      }`}>
        {label}
      </span>
    </div>
  );
}

function SkipCard({ skip, isSelected, onSelect, images }: {
  skip: SkipApiResponse;
  isSelected: boolean;
  onSelect: () => void;
  images: string[];
}) {
  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 ${
      isSelected ? 'ring-2 ring-orange-500 bg-gray-750' : 'hover:bg-gray-750'
    }`}>
      {/* Skip 360-Degree Viewer */}
      <div className="relative">
        <Skip360Viewer
          images={images}
          alt={skip.name}
          className="h-48"
        />
        {/* Size Badge */}
        <div className="absolute top-3 right-3 z-10">
          <SkipInfoBadge skip={skip} />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{skip.size} Yard Skip</h3>
        <p className="text-gray-400 text-sm mb-4">
          {skip.dimensions} • 14 day hire period
        </p>
        
        {/* Price */}
        <div className="mb-6">
          <span className="text-3xl font-bold text-orange-400">£{skip.price}</span>
        </div>

        {/* Select Button */}
        {isSelected ? (
          <Button 
            onClick={onSelect}
            className="w-full bg-orange-600 hover:bg-orange-700 text-black font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50"
          >
            Selected ✓
          </Button>
        ) : (
          <Button 
            onClick={onSelect}
            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10">Select This Skip →</span>
          </Button>
        )}
      </div>
    </div>
}