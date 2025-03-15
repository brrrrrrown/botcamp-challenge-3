const updateShortUrl = async (urlId) => {



    if (!urlId) {
   alert("Invalid URL!");
        return;
    }

    const newUrl=prompt("Enter the new URL");
    try {
        const testResponse = await fetch(newUrl, { method: 'HEAD', mode: 'no-cors' });
    
    } catch (error) {
        alert("Invalid URL!");
        return;
    }
    


    if (!newUrl) return; // If user cancels, do nothing
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`https://www.shorten-url-api.infobrains.club/api/private/urls/${urlId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ url: newUrl })
        });

        if (!response.ok) {
            const errorData = await response.json();
           alert("invalid URL");
            return;
        }

        alert("URL updated successfully.");

        location.reload(); // Reload the page to show changes

    } catch (error) {
        console.error("Error updating URL:", error);
       alert("Failed to update URL. Try again.");
    }
};
