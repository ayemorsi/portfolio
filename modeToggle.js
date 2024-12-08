document.addEventListener("DOMContentLoaded", () => {
    // Get saved mode from localStorage
    const savedMode = localStorage.getItem("portfolioMode");
    const currentPage = window.location.pathname.split('/').pop();
  
    // Redirect logic
    if (savedMode && currentPage === "modeSelection.html") {
      redirectToMode(savedMode);
    }
  
    // Add event listeners for mode selection
    document.getElementById("conventional-mode")?.addEventListener("click", () => {
      setMode("conventional");
    });
  
    document.getElementById("windows95-mode")?.addEventListener("click", () => {
      setMode("windows95");
    });
  });
  
  // Save the selected mode and redirect
  function setMode(mode) {
    localStorage.setItem("portfolioMode", mode);
    redirectToMode(mode);
  }
  
  // Redirect based on the selected mode
  function redirectToMode(mode) {
    if (mode === "conventional") {
      window.location.href = "conventional.html";
    } else if (mode === "windows95") {
      window.location.href = "windows95.html";
    }
  }
  
  // Toggle between modes from within a portfolio
  function toggleMode() {
    const currentMode = localStorage.getItem("portfolioMode");
    const newMode = currentMode === "conventional" ? "windows95" : "conventional";
    setMode(newMode);
  }
  