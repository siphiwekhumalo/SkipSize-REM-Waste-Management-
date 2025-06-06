import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Calculator, Headphones, Phone, MessageCircle } from "lucide-react";

export default function HelpSection() {
  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <HelpCircle className="text-primary w-5 h-5 mr-2" />
              Not sure which size to choose?
            </h3>
            <p className="text-gray-600 mb-4">
              Our skip size guide can help you determine the perfect skip for your project. 
              Consider the type and volume of waste you need to dispose of.
            </p>
            <Button className="bg-secondary hover:bg-green-700 text-white">
              <Calculator className="w-4 h-4 mr-2" />
              Use Skip Calculator
            </Button>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Headphones className="text-primary w-5 h-5 mr-2" />
              Need expert advice?
            </h3>
            <p className="text-gray-600 mb-4">
              Our waste management experts are here to help you choose the right skip 
              and answer any questions about your booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="hover:bg-gray-50">
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
              <Button variant="outline" className="hover:bg-gray-50">
                <MessageCircle className="w-4 h-4 mr-2" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
