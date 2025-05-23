// contact.js
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const response = await fetch('https://formspree.io/f/your-form-id', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      successMessage.textContent = 'Message sent successfully!';
      form.parentNode.insertBefore(successMessage, form.nextSibling);
      setTimeout(() => successMessage.remove(), 3000);
    } else {
      alert('Error sending message. Please try again.');
    }
  });
});