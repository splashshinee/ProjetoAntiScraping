fetch('https://respawn-news-backend.vercel.app/')
    .then(response => {
        if (response.status === 429) {
            alert('Você fez muitas solicitações. Tente novamente mais tarde.');
            document.body.innerHTML = '';
        } else {
            if (getCookie('hcaptcha-verified')) {
                document.getElementById('captcha-container').style.display = 'none';
                document.getElementById('content').style.display = 'block';
            } else {
                document.getElementById('captcha-container').style.display = 'flex';
                document.getElementById('content').style.display = 'none';
            }
        }
    })
    .catch(error => {
        console.error('Erro ao verificar rate limiting:', error);
    });
