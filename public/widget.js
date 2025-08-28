(function() {
  // This creates the chatbot and puts it on any website
  
  // 1. Create the chatbot HTML
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'chatbot-widget-container';
  
  // 2. Add the chatbot styles and code
  chatbotContainer.innerHTML = `
    <div id="chatbot-widget"></div>
    <link rel="stylesheet" href="https://your-chatbot.replit.app/widget-styles.css">
  `;
  
  // 3. Put the chatbot on the website
  document.body.appendChild(chatbotContainer);
  
  // 4. Load the chatbot functionality
  const script = document.createElement('script');
  script.src = 'https://your-chatbot.replit.app/chatbot-bundle.js';
  document.head.appendChild(script);
})();