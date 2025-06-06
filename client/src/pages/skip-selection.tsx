import { useQuery } from "@tanstack/react-query";
import { fetchSkips } from "@/lib/api";
import { ArrowLeft, MapPin, Trash2, Clock, Shield, Award, Phone, MessageCircle, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { SkipApiResponse } from "@/lib/api";

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Trash2 className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Skip Options</h3>
            <p className="text-gray-600 mb-6">{error.message}</p>
            <Button onClick={() => refetch()} className="bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Trash2 className="text-white w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">WeWantWaste</h1>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    Lowestoft, NR32
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Calculator className="w-4 h-4 mr-2" />
                Skip Calculator
              </Button>
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-4 py-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Skip Size</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Professional waste disposal made simple. Choose from our range of skip sizes, 
            all with transparent pricing and same-day delivery available.
          </p>
          
          {/* Trust Badges */}
          <div className="flex justify-center items-center space-x-8 mb-12">
            <div className="flex items-center space-x-2 text-gray-600">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Fully Licensed</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">5-Star Rated</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Same Day Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skip Options Grid */}
      <section className="container max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skips?.map((skip) => (
            <SkipOptionCard key={skip.id} skip={skip} onSelect={() => handleSelectSkip(skip.id)} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need help choosing the right size?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our waste management experts are here to help you select the perfect skip for your project. 
            Get free advice and same-day quotes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              <Phone className="w-4 h-4 mr-2" />
              Call Expert Now
            </Button>
            <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
              <MessageCircle className="w-4 h-4 mr-2" />
              Live Chat Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SkipOptionCard({ skip, onSelect }: { skip: SkipApiResponse; onSelect: () => void }) {
  const defaultImage = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
  
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:-translate-y-2">
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200">
          <img 
            src={skip.imageUrl || defaultImage}
            alt={skip.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
        
        {/* Popular Badge */}
        {skip.isPopular && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-lg">
              Most Popular
            </Badge>
          </div>
        )}
        
        {/* Size Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-xl font-bold text-lg shadow-lg">
            {skip.size}
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {skip.name}
          </h3>
          
          {/* Details */}
          <div className="space-y-1 text-sm text-gray-600">
            {skip.dimensions && (
              <div>Dimensions: {skip.dimensions}</div>
            )}
            {skip.capacity && (
              <div>Capacity: {skip.capacity}</div>
            )}
          </div>
        </div>

        {/* Suitable For Tags */}
        {skip.suitableFor && skip.suitableFor.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {skip.suitableFor.slice(0, 3).map((item, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-gray-900">£{skip.price.toFixed(0)}</span>
              <span className="text-sm text-gray-500">inc. VAT</span>
            </div>
            {skip.originalPrice && skip.originalPrice > skip.price && (
              <div className="text-right">
                <div className="text-xs text-gray-500 line-through">£{skip.originalPrice.toFixed(0)}</div>
                <div className="text-xs text-green-600 font-semibold">
                  Save £{(skip.originalPrice - skip.price).toFixed(0)}
                </div>
              </div>
            )}
          </div>
          
          {/* Features */}
          <div className="space-y-1 text-xs text-gray-600">
            <div>✓ Free delivery & collection</div>
            <div>✓ 14-day hire period</div>
            <div>✓ Same day delivery available</div>
          </div>
        </div>

        {/* Select Button */}
        <Button 
          onClick={onSelect}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Select This Skip
        </Button>
      </CardContent>
    </Card>
  );
}
