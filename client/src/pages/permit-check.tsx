import { useQuery } from "@tanstack/react-query";
import { fetchSkips } from "@/lib/api";
import { MapPin, Calendar, CreditCard, FileCheck, Check, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import ThreeBackground from "@/components/three-background";

export default function PermitCheck() {
  const [location, setLocation] = useLocation();
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
  const [permitRequired, setPermitRequired] = useState<boolean>(false);

  const { data: skips } = useQuery({
    queryKey: ['/api/skips'],
    queryFn: fetchSkips,
  });

  useEffect(() => {
    // Get selected skip from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const skipId = urlParams.get('skipId');
    if (skipId) {
      setSelectedSkipId(parseInt(skipId));
    }
  }, []);

  useEffect(() => {
    if (selectedSkipId && skips) {
      const selectedSkip = skips.find(skip => skip.id === selectedSkipId);
      // Determine if permit is required based on skip size and road placement
      if (selectedSkip) {
        // Skips 6 yards and above typically require permits for road placement
        const skipSize = parseInt(selectedSkip.size.replace(' Yard', ''));
        const requiresPermit = skipSize >= 10; // Larger skips typically need permits
        setPermitRequired(requiresPermit);
      }
    }
  }, [selectedSkipId, skips]);

  const selectedSkip = skips?.find(skip => skip.id === selectedSkipId);

  const handleContinue = () => {
    setLocation(`/date-selection?skipId=${selectedSkipId}`);
  };

  const handleBack = () => {
    setLocation('/');
  };

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
            <StepIndicator icon={Check} label="Select Skip" isCompleted={true} isActive={false} />
            <StepIndicator icon={FileCheck} label="Permit Check" isCompleted={false} isActive={true} />
            <StepIndicator icon={Calendar} label="Choose Date" isCompleted={false} isActive={false} />
            <StepIndicator icon={CreditCard} label="Payment" isCompleted={false} isActive={false} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Permit Requirements
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Check if you need a permit for your skip placement
          </p>
        </div>

        {selectedSkip && (
          <div className="bg-gray-800/90 rounded-lg p-6 mb-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedSkip.name}</h2>
                <p className="text-gray-400">{selectedSkip.dimensions}</p>
              </div>
              <Badge className="bg-orange-500 text-black border-0">
                £{selectedSkip.price}
              </Badge>
            </div>
          </div>
        )}

        {/* Permit Status Card */}
        <div className="bg-gray-800/90 rounded-lg p-8 mb-8 backdrop-blur-sm">
          {permitRequired ? (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Permit Required</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Based on your selected skip size and intended placement location, you will need a permit from your local council. 
                This is because skips placed on public roads typically require official permission.
              </p>
              
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <h4 className="font-semibold text-yellow-400 mb-2">Important Information</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Permit costs typically range from £20-£50</li>
                      <li>• Applications can take 3-5 working days to process</li>
                      <li>• We can help arrange the permit for you</li>
                      <li>• Alternative: Place skip on your private property</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Permit Required</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Great news! Based on your selected skip size and placement options, no permit is required. 
                You can place this skip on your property or designated areas without additional permissions.
              </p>
              
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <h4 className="font-semibold text-green-400 mb-2">What this means</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• No additional costs or waiting time</li>
                      <li>• Skip can be delivered immediately upon booking</li>
                      <li>• Suitable for private property placement</li>
                      <li>• Road placement allowed for this skip size</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Placement Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800/90 rounded-lg p-6 backdrop-blur-sm">
            <h4 className="font-semibold text-white mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              Private Property
            </h4>
            <p className="text-gray-300 text-sm mb-3">
              Place the skip on your driveway, garden, or private land. No permit required.
            </p>
            <ul className="text-gray-400 text-xs space-y-1">
              <li>• No additional costs</li>
              <li>• Immediate placement</li>
              <li>• Full control over access</li>
            </ul>
          </div>

          <div className="bg-gray-800/90 rounded-lg p-6 backdrop-blur-sm">
            <h4 className="font-semibold text-white mb-3 flex items-center">
              {permitRequired ? (
                <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              )}
              Public Road
            </h4>
            <p className="text-gray-300 text-sm mb-3">
              Place the skip on the road outside your property. 
              {permitRequired ? ' Permit required.' : ' No permit needed.'}
            </p>
            <ul className="text-gray-400 text-xs space-y-1">
              {permitRequired ? (
                <>
                  <li>• Council permit required</li>
                  <li>• Additional cost £20-£50</li>
                  <li>• 3-5 day processing time</li>
                </>
              ) : (
                <>
                  <li>• No permit required</li>
                  <li>• Road placement allowed</li>
                  <li>• Easy access for loading</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/50 px-8"
          >
            ← Back to Skip Selection
          </Button>
          <Button 
            onClick={handleContinue}
            className="bg-orange-600 hover:bg-orange-700 text-black font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 px-8 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            <span className="relative z-10">Continue to Date Selection →</span>
          </Button>
        </div>
      </div>
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