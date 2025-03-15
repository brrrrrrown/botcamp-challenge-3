// sign up form
const signupForm = document.getElementById('signupform');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = signupForm.querySelector('input[name="name"]').value.trim();
    const email = signupForm.querySelector('input[name="email"]').value.trim();
    const password = signupForm.querySelector('input[name="password"]').value.trim();

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    console.log(name, email, password);
 
    const url = 'https://www.shorten-url-api.infobrains.club/api/public/auth/register';

    try {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await result.json();
        console.log(data); 

        if (result.status === 500) {
            alert('Internal server error');
            return;
        }

        if (result.status === 409) {
            alert('Email already exists');
            return;
        }

        if (result.status === 400) {
            alert(data.message || 'Invalid request. Please check your details.');
            return;
        }

        if (result.status === 201) {

           
            const token = jsonResponse.data.accessToken;

            if (token) {
                localStorage.setItem('token', token);
                window.location.href = '/pages/home.html'; 
            } 
            
            else {
                alert("Signup successful, but token is missing.");
            }

        }

    } 
    
    catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");

    }

});
