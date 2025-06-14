document.addEventListener("DOMContentLoaded", function() {
    let currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab

    function showTab(n) {
        // This function will display the specified tab of the form...
        let tabs = document.getElementsByClassName("tab");
        tabs[n].style.display = "block"; // Show the current tab
        // Hide Previous button on first tab
        document.getElementById("prevBtn").style.display = n === 0 ? "none" : "inline";
        // Change Next button to Submit on last tab
        document.getElementById("nextBtn").innerHTML = n === (tabs.length - 1) ? "Submit" : "Next";
    }

    function nextPrev(n) {
        // This function will figure out which tab to display
        let tabs = document.getElementsByClassName("tab");
        // Hide the current tab
        tabs[currentTab].style.display = "none";
        // Increase or decrease the current tab by n
        currentTab += n;
        // If you have reached the end of the form... :
        if (currentTab >= tabs.length) {
            document.getElementById("multiStepForm").submit(); // Submit the form
            return false;
        }
        // Otherwise, display the correct tab
        showTab(currentTab);
    }

    // Hide all tabs except the first on page load
    window.onload = function() {
        let tabs = document.getElementsByClassName("tab");
        for (let i = 1; i < tabs.length; i++) {
            tabs[i].style.display = "none";
        }
    };

    // Attach event listeners to the buttons
    document.getElementById("nextBtn").addEventListener("click", function() {
        nextPrev(1); // Move to the next tab
    });

    document.getElementById("prevBtn").addEventListener("click", function() {
        nextPrev(-1); // Move to the previous tab
    });
});