const signinform = document.getElementById('signinform');

signinform.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = signinform.querySelector('#signinform > input[name="email"]').value;
    const password = signinform.querySelector('#signinform > input[name="password"]').value;

    const url = 'https://www.shorten-url-api.infobrains.club/api/public/auth/login'

    const result = await fetch(url, {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'

        },
    
        body: JSON.stringify({
            email,
            password
        })

    });

    const jsonResponse = await result.json();

    if (result.status === 500) {

        alert('Internal server error');

    }

    if (result.status === 400) {

        alert(jsonResponse.error.details);

    }

    if (result.status === 200) {

        const token = jsonResponse.data.accessToken;
        localStorage.setItem('token', token);
        window.location.href = '/pages/home.html';

    }

});
