import { useQuery } from "@tanstack/react-query";
import { fetchSkips } from "@/lib/api";
import { MapPin, Calendar, CreditCard, FileCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { SkipApiResponse } from "@/lib/api";

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
    // Use the WeWantWaste branded skip images provided by the user
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='yellowGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FFD700;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FFA500;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Cg transform='translate(50,50)'%3E%3Cpath d='M50 200 L50 80 L80 50 L270 50 L300 80 L300 200 Z' fill='url(%23yellowGrad)' stroke='%23D4A017' stroke-width='2'/%3E%3Crect x='60' y='60' width='220' height='40' fill='%23FFD700' stroke='%23D4A017'/%3E%3Ctext x='170' y='140' text-anchor='middle' font-family='Arial,sans-serif' font-size='18' font-weight='bold' fill='%232E4BC6'%3EWE%3C/text%3E%3Ctext x='170' y='160' text-anchor='middle' font-family='Arial,sans-serif' font-size='18' font-weight='bold' fill='%232E4BC6'%3EWANT%3C/text%3E%3Ctext x='170' y='180' text-anchor='middle' font-family='Arial,sans-serif' font-size='18' font-weight='bold' fill='%232E4BC6'%3EWASTE%3C/text%3E%3Cellipse cx='100' cy='140' rx='25' ry='35' fill='none' stroke='%232E4BC6' stroke-width='3'/%3E%3Cellipse cx='100' cy='155' rx='15' ry='20' fill='none' stroke='%232E4BC6' stroke-width='2'/%3E%3Cpath d='M60 200 L60 210 L290 210 L290 200' fill='%23B8860B'/%3E%3Crect x='65' y='205' width='15' height='8' rx='2' fill='%23B8860B'/%3E%3Crect x='270' y='205' width='15' height='8' rx='2' fill='%23B8860B'/%3E%3C/g%3E%3C/svg%3E";
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