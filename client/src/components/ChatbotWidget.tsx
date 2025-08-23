import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, X, ArrowLeft, Send, Bot, User } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { knowledgeBase, responses, fallbackMessage, searchKnowledgeBase, type MenuOption } from '@/lib/knowledgeBase';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  options?: MenuOption[];
  timestamp: Date;
}

interface ChatSession {
  id: string;
  sessionId: string;
  currentMenu: string;
  menuStack: string[];
  conversationHistory: ChatMessage[];
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random()}`);
  const [currentMenu, setCurrentMenu] = useState('main');
  const [menuStack, setMenuStack] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Initialize session
  const { data: session } = useQuery({
    queryKey: ['/api/chat/session', sessionId],
    queryFn: async () => {
      const response = await apiRequest('POST', '/api/chat/session', { sessionId });
      return response.json() as Promise<ChatSession>;
    },
    enabled: !!sessionId,
  });

  // Update session mutation
  const updateSessionMutation = useMutation({
    mutationFn: async (updates: Partial<ChatSession>) => {
      const response = await apiRequest('PATCH', `/api/chat/session/${sessionId}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat/session', sessionId] });
    },
  });

  // Add message mutation
  const addMessageMutation = useMutation({
    mutationFn: async (message: { sessionId: string; type: string; content: string }) => {
      const response = await apiRequest('POST', '/api/chat/messages', message);
      return response.json();
    },
  });

  // Initialize welcome message
  useEffect(() => {
    if (session && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        type: 'bot',
        content: "Welcome to XYZ College! 👋 I'm here to help you with admissions, academics, campus life, and more. How can I assist you today?",
        options: knowledgeBase.main.options,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [session, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random()}`,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Save to backend
    addMessageMutation.mutate({
      sessionId,
      type: message.type,
      content: message.content,
    });
    
    return newMessage;
  };

  const showTypingIndicator = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (action: string) => {
    const menu = knowledgeBase[action];
    if (menu) {
      addMessage({
        type: 'user',
        content: `Selected: ${menu.title}`,
      });
      
      navigateToMenu(action);
    } else if (responses[action]) {
      addMessage({
        type: 'user',
        content: `Selected: ${getOptionLabel(action)}`,
      });
      
      showTypingIndicator();
      setTimeout(() => {
        addMessage({
          type: 'bot',
          content: responses[action],
        });
      }, 1500);
    }
  };

  const getOptionLabel = (action: string): string => {
    for (const menu of Object.values(knowledgeBase)) {
      const option = menu.options.find(opt => opt.action === action || opt.id === action);
      if (option) return option.label;
    }
    return action;
  };

  const navigateToMenu = (menuId: string) => {
    if (menuId === 'main') {
      setMenuStack([]);
      setCurrentMenu('main');
      showMainMenu();
    } else if (knowledgeBase[menuId]) {
      if (currentMenu !== 'main') {
        setMenuStack(prev => [...prev, currentMenu]);
      }
      setCurrentMenu(menuId);
      showMenu(menuId);
    }
    
    // Update session state
    updateSessionMutation.mutate({
      currentMenu: menuId,
      menuStack: menuId === 'main' ? [] : [...menuStack, currentMenu],
    });
  };

  const showMainMenu = () => {
    const menu = knowledgeBase.main;
    showTypingIndicator();
    setTimeout(() => {
      addMessage({
        type: 'bot',
        content: "What would you like to know about? Choose from the options below:",
        options: menu.options,
      });
    }, 1500);
  };

  const showMenu = (menuId: string) => {
    const menu = knowledgeBase[menuId];
    if (menu) {
      showTypingIndicator();
      setTimeout(() => {
        addMessage({
          type: 'bot',
          content: `Here are the ${menu.title} options:`,
          options: menu.options,
        });
      }, 1500);
    }
  };

  const goBack = () => {
    if (menuStack.length > 0) {
      const previousMenu = menuStack[menuStack.length - 1];
      setMenuStack(prev => prev.slice(0, -1));
      setCurrentMenu(previousMenu);
      showMenu(previousMenu);
    } else {
      setCurrentMenu('main');
      showMainMenu();
    }
  };

  const handleSendMessage = () => {
    const message = inputValue.trim();
    if (!message) return;

    addMessage({
      type: 'user',
      content: message,
    });
    
    setInputValue('');
    
    // Search for relevant response
    showTypingIndicator();
    setTimeout(() => {
      const searchResult = searchKnowledgeBase(message);
      
      if (searchResult && responses[searchResult]) {
        // Found a relevant response
        addMessage({
          type: 'bot',
          content: responses[searchResult],
        });
      } else {
        // No match found, show fallback with main menu options
        addMessage({
          type: 'bot',
          content: fallbackMessage,
          options: knowledgeBase.main.options,
        });
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getBreadcrumb = () => {
    if (currentMenu === 'main') return null;
    
    const menu = knowledgeBase[currentMenu];
    if (!menu || !menu.parent) return null;

    return (
      <div className="text-xs text-gray-500 mb-3">
        <button 
          onClick={() => navigateToMenu('main')}
          className="hover:text-primary cursor-pointer"
          data-testid="breadcrumb-main"
        >
          Main Menu
        </button>
        <span className="mx-1">{'>'}</span>
        <span className="text-primary">{menu.title}</span>
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[9999]">
      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        className={cn(
          "w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:scale-105 transition-all duration-200",
          "bg-[hsl(203.8863,88.2845%,53.1373%)] hover:bg-[hsl(203.8863,88.2845%,48%)]",
          "active:scale-95 touch-manipulation",
          !isOpen && "hover:animate-pulse"
        )}
        data-testid="button-chat-toggle"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">
            1
          </div>
        )}
      </Button>

      {/* Chat Window */}
      <Card 
        className={cn(
          "absolute bottom-20 right-0 w-80 h-[450px] shadow-2xl transform transition-all duration-300 flex flex-col overflow-hidden bg-white rounded-2xl border border-gray-200",
          "sm:w-[85vw] sm:max-w-[350px] sm:h-[60vh] sm:max-h-[500px] sm:bottom-20 sm:right-4",
          "md:w-[320px] md:h-[480px] md:right-0 md:left-auto",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
        style={{ 
          transformOrigin: 'bottom right',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
        data-testid="card-chat-window"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 sm:p-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-lg sm:text-xl">🎓</span>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm sm:text-base">XYZ College Assistant</h3>
              <div className="text-xs text-blue-100 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="hidden sm:inline">Online • Ready to help!</span>
                <span className="sm:hidden">Online</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleChat}
            className="text-white hover:text-blue-200 hover:bg-white/10 rounded-full p-2"
            data-testid="button-close-chat"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-blue-50/30 to-white">
          {messages.map((message) => (
            <div key={message.id} className="animate-slide-up">
              {message.type === 'bot' ? (
                <div className="flex items-start space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="text-xs sm:text-sm">🤖</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl rounded-tl-md p-3 sm:p-4 shadow-md border border-gray-100 max-w-[85%] sm:max-w-[240px]">
                      <p className="text-gray-800 text-sm whitespace-pre-line leading-relaxed" data-testid={`text-bot-message-${message.id}`}>
                        {message.content}
                      </p>
                    </div>
                    {message.options && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3 max-w-[85%] sm:max-w-[240px]">
                        {message.options.map((option) => (
                          <Button
                            key={option.id}
                            variant="secondary"
                            size="sm"
                            onClick={() => handleQuickReply(option.action || option.id)}
                            className="text-xs bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-sm transition-all duration-200 hover:shadow-md"
                            data-testid={`button-quick-reply-${option.id}`}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-2 ml-1">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end mb-3 sm:mb-4">
                  <div className="flex flex-col items-end max-w-[85%] sm:max-w-[240px]">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-md p-2.5 sm:p-3 shadow-md">
                      <p className="text-sm font-medium" data-testid={`text-user-message-${message.id}`}>
                        {message.content}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 mt-2 mr-1">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start space-x-3 animate-fade-in mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center shadow-sm animate-pulse">
                <span className="text-sm">🤖</span>
              </div>
              <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-md border border-gray-100">
                <div className="flex space-x-1 items-center">
                  <span className="text-gray-500 text-sm mr-2">Bot is typing</span>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-typing" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <CardContent className="border-t border-gray-200 p-3 sm:p-4 bg-white rounded-b-2xl">
          {getBreadcrumb()}
          
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question here... 💬"
                className="pr-10 sm:pr-12 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 hover:bg-white transition-colors shadow-sm text-sm sm:text-base min-h-[40px] sm:min-h-[44px]"
                data-testid="input-chat-message"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSendMessage}
                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-1.5 sm:p-2 h-7 w-7 sm:h-8 sm:w-8 rounded-full transition-all duration-200 active:scale-95 touch-manipulation"
                data-testid="button-send-message"
              >
                <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>

          {currentMenu !== 'main' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="mt-2 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-1 h-auto rounded-full transition-colors"
              data-testid="button-back-menu"
            >
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back to Previous Menu
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
