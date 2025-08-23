import { ChatbotWidget } from '@/components/ChatbotWidget';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg mb-8">
          <CardContent className="p-4 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4" data-testid="text-page-title">
              XYZ College - AI Chatbot Widget Demo
            </h1>
            <p className="text-gray-600 mb-6 text-sm sm:text-base" data-testid="text-page-description">
              Experience our AI-powered educational assistant designed to help students and parents find information quickly and efficiently.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">🚀 Easy Integration</h2>
                <div className="bg-gray-100 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">Copy and paste this snippet into your website:</p>
                  <div className="bg-gray-800 rounded p-2 sm:p-3 overflow-hidden">
                    <code className="text-xs sm:text-sm text-green-400 block break-all" data-testid="text-integration-code">
                      &lt;script src="https://chatbot.xyzcollege.edu/widget.js"&gt;&lt;/script&gt;
                    </code>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">📱 Features</h2>
                <ul className="space-y-3 text-gray-600 text-sm sm:text-base">
                  <li className="flex items-center" data-testid="text-feature-search">
                    <Check className="text-green-500 mr-2 h-4 w-4 flex-shrink-0" />
                    <span>Instant search & guided menus</span>
                  </li>
                  <li className="flex items-center" data-testid="text-feature-responsive">
                    <Check className="text-green-500 mr-2 h-4 w-4 flex-shrink-0" />
                    <span>Mobile-responsive design</span>
                  </li>
                  <li className="flex items-center" data-testid="text-feature-context">
                    <Check className="text-green-500 mr-2 h-4 w-4 flex-shrink-0" />
                    <span>Context-aware conversations</span>
                  </li>
                  <li className="flex items-center" data-testid="text-feature-branding">
                    <Check className="text-green-500 mr-2 h-4 w-4 flex-shrink-0" />
                    <span>Customizable branding</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ChatbotWidget />
    </div>
  );
}
