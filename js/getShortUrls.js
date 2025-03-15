const API_DB_URL = 'https://www.shorten-url-api.infobrains.club/api/private/urls';
const shortenUrlList = document.getElementById('shorten-list');


const historyList = document.createElement('div');

historyList.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
        <span>Loading URLs...</span>
    </div>
`;

const getAllShortUrls = async () => {
    const token = localStorage.getItem('token');
    let page = 1;
    let allUrls = [];

    shortenUrlList.innerHTML = '';
    shortenUrlList.appendChild(historyList);
    
    try {
        while (true) {
            const response = await fetch(`${API_DB_URL}?page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    alert('Unauthorized. Redirecting to login.');
                    localStorage.removeItem('token');
                    window.location.href = '/index.html';
                } else if (response.status === 500) {
                    alert('Internal Server Error. Please try again later.');
                } else {
                    alert(`Error: ${response.statusText}`);
                }
                return;
            }

            const jsonResponse = await response.json();
            const data = jsonResponse.data;

            if (!data || data.length === 0) break; 

            allUrls = allUrls.concat(data);
            page++; 
        }

        if (!shortenUrlList) return;
        shortenUrlList.innerHTML = '';
        allUrls.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));


        allUrls.forEach((shortUrl, index) => {
            const li = document.createElement('li');
            li.style.listStyle = "none";
            li.style.backgroundColor ='#f6f5f7';
            li.style.transform = "translateY(10px)"; 

            li.innerHTML = `
                <div class="shorten-url">
                    <p  style="color:#4a2f24;"><b>${index + 1}. Shortened:</b> 
                        <a href="${shortUrl.shortUrl}" target="_blank" style="color:black;">${shortUrl.shortUrl}</a>
                    </p>
                    <p style="color:#4a2f24;"><b>Original:</b> ${shortUrl.originalUrl}</p>
                    <p style="color:#4a2f24;"><b>Clicks:</b> ${shortUrl.clicks}</p>
                    <p style="color:#4a2f24;"><b>Created At:</b> ${new Date(shortUrl.createdAt).toLocaleString()}</p>
                    <p style="color:#4a2f24;"><b>Updated At:</b> ${new Date(shortUrl.updatedAt).toLocaleString()}
                    
                    <!-- Buttons for Delete, Update, and Analytics -->
                    <button onclick="deleteShortUrl('${shortUrl.id}')" class="hidden">Delete</button>
                    <button onclick="updateShortUrl('${shortUrl.id}')" class="hidden">Update</button>
                </div>
            `;
            shortenUrlList.appendChild(li);

            setTimeout(() => {
                li.style.opacity = "1";
                li.style.transform = "translateY(0)";
            }, 100 * index);
           
        });

    } catch (error) {
        console.error('Error fetching URLs:', error);
        alert('Failed to load URLs. Please check your internet connection.');
    }
};

getAllShortUrls();

