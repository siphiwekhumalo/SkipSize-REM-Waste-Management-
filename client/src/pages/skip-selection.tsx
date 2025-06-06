import { useQuery } from "@tanstack/react-query";
import { fetchSkips } from "@/lib/api";
import { MapPin, Calendar, CreditCard, FileCheck, Check, Menu, X, Filter } from "lucide-react";
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
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
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

  const getSizeRange = (size: number) => {
    if (size >= 4 && size <= 6) return 'Small (4-6 yards)';
    if (size >= 8 && size <= 10) return 'Medium (8-10 yards)';
    if (size >= 12 && size <= 16) return 'Large (12-16 yards)';
    if (size >= 20) return 'Extra Large (20-40 yards)';
    return 'Other';
  };

  const filteredSkips = skips?.filter(skip => {
    if (!selectedSizeFilter) return true;
    return getSizeRange(parseInt(skip.size)) === selectedSizeFilter;
  });

  const handleSizeFilterClick = (range: string) => {
    setSelectedSizeFilter(selectedSizeFilter === range ? null : range);
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
    <div className="min-h-screen bg-black flex">
      {/* Three.js Animated Background */}
      <ThreeBackground />
      
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar - Desktop fixed, Mobile slide-out */}
      <div className={`w-80 bg-gray-900/95 h-screen fixed top-0 backdrop-blur-sm border-r border-gray-700 z-50 transition-transform duration-300 ${
        isMobileSidebarOpen ? 'left-0' : '-left-80'
      } lg:left-0 lg:block`}>
        <div className="p-6 space-y-6">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between lg:hidden mb-4">
            <h2 className="text-xl font-bold text-white">Filters</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="text-white hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="bg-gray-800/60 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4 hidden lg:block">Filter by Size</h2>
            <div className="space-y-3">
              {['Small (4-6 yards)', 'Medium (8-10 yards)', 'Large (12-16 yards)', 'Extra Large (20-40 yards)'].map((range, index) => (
                <div 
                  key={index} 
                  onClick={() => handleSizeFilterClick(range)}
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                    selectedSizeFilter === range 
                      ? 'bg-orange-500/20 border border-orange-500/50' 
                      : 'bg-gray-700/50 hover:bg-gray-700'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full mr-3 transition-colors ${
                    selectedSizeFilter === range ? 'bg-orange-400' : 'bg-gray-400'
                  }`}></div>
                  <span className={`transition-colors ${
                    selectedSizeFilter === range ? 'text-orange-300' : 'text-gray-300'
                  }`}>{range}</span>
                  {selectedSizeFilter === range && (
                    <span className="ml-auto text-orange-400 text-sm">●</span>
                  )}
                </div>
              ))}
            </div>
            
            {selectedSizeFilter && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <button 
                  onClick={() => setSelectedSizeFilter(null)}
                  className="text-orange-400 hover:text-orange-300 text-sm transition-colors"
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-800/60 rounded-lg p-6">
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
      </div>

      {/* Main Content Area - Offset by sidebar width */}
      <div className="flex-1 lg:ml-80 w-full">
        {/* Progress Steps */}
        <div className="bg-gray-900/90 border-b border-gray-700 relative z-10 backdrop-blur-sm">
          <div className="container max-w-7xl mx-auto px-4 py-4 lg:py-6">
            {/* Mobile Filter Toggle */}
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              {selectedSizeFilter && (
                <div className="text-orange-400 text-sm">
                  {selectedSizeFilter} ({filteredSkips?.length || 0})
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center space-x-2 md:space-x-8 overflow-x-auto">
              <StepIndicator icon={MapPin} label="Postcode" isCompleted={true} isActive={false} />
              <StepIndicator icon={FileCheck} label="Waste Type" isCompleted={true} isActive={false} />
              <StepIndicator icon={Check} label="Select Skip" isCompleted={false} isActive={true} />
              <StepIndicator icon={FileCheck} label="Permit Check" isCompleted={false} isActive={false} />
              <StepIndicator icon={Calendar} label="Choose Date" isCompleted={false} isActive={false} />
              <StepIndicator icon={CreditCard} label="Payment" isCompleted={false} isActive={false} />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container max-w-7xl mx-auto px-4 py-8 relative z-10">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Skip Size
            </h1>
            <p className="text-gray-400 text-lg">
              Select the skip size that best suits your needs
            </p>
          </div>

          {/* Filter Results Info */}
          {selectedSizeFilter && (
            <div className="mb-6 flex items-center justify-between">
              <div className="text-gray-300">
                <span className="text-orange-400 font-semibold">{filteredSkips?.length || 0}</span> skips found in <span className="text-orange-300">{selectedSizeFilter}</span>
              </div>
            </div>
          )}

          {/* Skip Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredSkips?.map((skip) => (
              <SkipCard 
                key={skip.id} 
                skip={skip} 
                isSelected={selectedSkipId === skip.id}
                onSelect={() => handleSelectSkip(skip.id)}
                images={getSkipImages(parseInt(skip.size))}
              />
            ))}
          </div>
          
          {/* No Results State */}
          {filteredSkips?.length === 0 && selectedSizeFilter && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                No skips found in the selected size range
              </div>
              <button 
                onClick={() => setSelectedSizeFilter(null)}
                className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Show All Skips
              </button>
            </div>
          )}

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
    <div className={`relative group transition-all duration-500 transform ${
      isSelected ? 'scale-105 sm:rotate-1' : 'hover:scale-102 sm:hover:-rotate-1'
    }`}>
      {/* Hexagonal/Angular Card Shape - Simplified for mobile */}
      <div className={`relative bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 overflow-hidden transition-all duration-300 ${
        isSelected 
          ? 'ring-4 ring-orange-500 shadow-2xl shadow-orange-500/30 rounded-2xl sm:rounded-3xl' 
          : 'hover:shadow-xl hover:shadow-gray-900/50 rounded-xl sm:rounded-2xl'
      }`} style={{
        clipPath: window.innerWidth < 640 ? 'none' : (isSelected 
          ? 'polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)' 
          : 'polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%)')
      }}>
        
        {/* Orange Accent Cuts */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-500 via-orange-600 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-orange-500/30 to-transparent"></div>
        
        {/* Skip 360-Degree Viewer with Angular Mask */}
        <div className="relative h-56 overflow-hidden" style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 0% 100%)'
        }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10"></div>
          <Skip360Viewer
            images={images}
            alt={skip.name}
            className="h-full"
          />
          
          {/* Floating Elements */}
          <div className="absolute top-4 right-4 z-20">
            <SkipInfoBadge skip={skip} />
          </div>
          
          {/* Popular Ribbon */}
          {skip.isPopular && (
            <div className="absolute top-0 left-0 z-20">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-4 py-2 text-xs font-bold transform -rotate-45 -translate-x-4 translate-y-4 shadow-lg">
                POPULAR
              </div>
            </div>
          )}
          
          {/* Size Display Overlay */}
          <div className="absolute bottom-4 left-4 z-20">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-500/30">
              <span className="text-orange-400 font-bold text-lg">{skip.size} YARD</span>
            </div>
          </div>
        </div>

        {/* Content Area with Angular Design */}
        <div className="relative p-6">
          {/* Angular Dividers */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-orange-500 via-orange-400 to-transparent opacity-50"></div>
          
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1 leading-tight">{skip.size} Yard Skip</h3>
              <p className="text-gray-400 text-sm">
                {skip.dimensions}
              </p>
            </div>
            
            {/* Angular Price Badge */}
            <div className="relative ml-4">
              <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/40 rounded-xl px-4 py-3 transform rotate-2">
                <div className="text-center">
                  <span className="text-2xl font-bold text-orange-400">£{skip.price}</span>
                  <div className="text-xs text-orange-300">14 days</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature Points */}
          <div className="mb-6 space-y-2">
            <div className="flex items-center text-xs text-gray-400">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mr-3 animate-pulse"></div>
              14 day hire period included
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mr-3 animate-pulse"></div>
              {skip.features?.[2] || 'Road placement available'}
            </div>
          </div>

          {/* Angular Action Button */}
          <div className="relative">
            {isSelected ? (
              <Button 
                onClick={onSelect}
                className="w-full bg-gradient-to-r from-orange-600 via-orange-700 to-orange-600 hover:from-orange-700 hover:to-orange-800 text-black font-bold py-4 transform transition-all duration-300 shadow-lg"
                style={{
                  clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)'
                }}
              >
                <span className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3 animate-pulse"></span>
                  SELECTED
                </span>
              </Button>
            ) : (
              <Button 
                onClick={onSelect}
                className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 hover:from-orange-600 hover:via-orange-700 hover:to-orange-600 text-black font-bold py-4 transform transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 relative overflow-hidden group"
                style={{
                  clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)'
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out origin-left"></span>
                <span className="relative z-10 flex items-center justify-center">
                  SELECT THIS SKIP
                  <span className="ml-3 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
}