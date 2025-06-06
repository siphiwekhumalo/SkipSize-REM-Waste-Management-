import { useQuery } from "@tanstack/react-query";
import { fetchSkips } from "@/lib/api";
import { ChevronRight, MapPin, Recycle } from "lucide-react";
import SkipCard from "@/components/skip-card";
import LoadingSkeleton from "@/components/loading-skeleton";
import ErrorState from "@/components/error-state";
import HelpSection from "@/components/help-section";
import TrustIndicators from "@/components/trust-indicators";

export default function SkipSelection() {
  const { data: skips, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/skips'],
    queryFn: fetchSkips,
  });

  const handleSelectSkip = (skipId: number) => {
    const selectedSkip = skips?.find(skip => skip.id === skipId);
    console.log('Selected skip:', selectedSkip);
    // TODO: Navigate to checkout or next step
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Recycle className="text-white w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">WeWantWaste</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Services</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <a href="#" className="hover:text-primary">Home</a>
          <ChevronRight className="w-3 h-3" />
          <a href="#" className="hover:text-primary">Book Service</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium">Choose Skip Size</span>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Skip Size
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Select the ideal skip for your waste disposal needs. All prices include delivery, collection, and disposal.
          </p>
          <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
            <MapPin className="text-primary w-4 h-4 mr-2" />
            <span className="text-sm font-medium text-gray-700">Lowestoft, NR32</span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Error State */}
        {error && <ErrorState error={error.message} onRetry={() => refetch()} />}

        {/* Skip Options */}
        {skips && !isLoading && !error && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {skips.map((skip) => (
                <SkipCard 
                  key={skip.id} 
                  skip={skip} 
                  onSelect={() => handleSelectSkip(skip.id)} 
                />
              ))}
            </div>

            <HelpSection />
            <TrustIndicators />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">© 2024 WeWantWaste. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
