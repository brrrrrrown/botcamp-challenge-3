const deleteShortUrl = async (urlId) => {
    const API_BASE_URL = 'https://www.shorten-url-api.infobrains.club/api/private/urls';
    const token = localStorage.getItem('token');

    if (!urlId) {
        showAlert("Invalid URL ID!", "error");
        return;
    }

const confirmDelete=confirm("are you sure you want to delete this url?");


    if (!confirmDelete===true) return;

    try {
        const response = await fetch(`${API_BASE_URL}/${urlId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            showAlert(`Error: ${errorData.message || response.statusText}`, "error");
            return;
        }

        alert("URL deleted successfully.");

        location.reload(); 

    } catch (error) {
        console.error("Delete failed:", error);
        showAlert("Failed to delete URL. Try again.", "error");
    }
};
