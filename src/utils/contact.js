const BASE_URL = 'https://plutox-a02j.onrender.com/api';

// Send contact form data to backend
export async function sendContactEmail(formData) {
  const res = await fetch(`${BASE_URL}/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error('❌ Contact error:', errorData);
    throw new Error('Something went wrong');
  }

  return res.json();
}
