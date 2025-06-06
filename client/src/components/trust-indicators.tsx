import { Shield, Star, Clock } from "lucide-react";

export default function TrustIndicators() {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="flex flex-col items-center">
          <Shield className="text-primary w-8 h-8 mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">Fully Licensed</h4>
          <p className="text-sm text-gray-600">Environment Agency approved</p>
        </div>
        <div className="flex flex-col items-center">
          <Star className="text-yellow-500 w-8 h-8 mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">5-Star Rated</h4>
          <p className="text-sm text-gray-600">Based on 2,500+ reviews</p>
        </div>
        <div className="flex flex-col items-center">
          <Clock className="text-primary w-8 h-8 mb-2" />
          <h4 className="font-semibold text-gray-900 mb-1">Same Day Service</h4>
          <p className="text-sm text-gray-600">Available in most areas</p>
        </div>
      </div>
    </div>
  );
}
