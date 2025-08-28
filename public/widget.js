(function () {
  // Create button to toggle chatbot
  const button = document.createElement("button");
  button.innerText = "💬";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.width = "50px";
  button.style.height = "50px";
  button.style.borderRadius = "50%";
  button.style.border = "none";
  button.style.backgroundColor = "#4f46e5"; // Indigo color
  button.style.color = "white";
  button.style.fontSize = "24px";
  button.style.cursor = "pointer";
  button.style.zIndex = "9999";
  button.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";

  // Create chatbot iframe (hidden by default)
  const iframe = document.createElement("iframe");
  iframe.src = "https://college-chatbot-app.onrender.com"; // 👈 deployed chatbot URL
  iframe.style.position = "fixed";
  iframe.style.bottom = "80px";
  iframe.style.right = "20px";
  iframe.style.width = "350px";
  iframe.style.height = "500px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "12px";
  iframe.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  iframe.style.zIndex = "9999";
  iframe.style.display = "none"; // hidden initially

  // Toggle iframe when button clicked
  button.addEventListener("click", () => {
    iframe.style.display = iframe.style.display === "none" ? "block" : "none";
  });

  // Append elements to body
  document.body.appendChild(button);
  document.body.appendChild(iframe);
})();
