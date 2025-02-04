'use client';
import { useState } from 'react';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match
    if (password !== passwordConfirm) {
      setMessage("Passwords don't match.");
      return;
    }
  
    try {
      // Send POST request to Rails API
      const response = await fetch('http://localhost:3003/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: passwordConfirm,
        }),
      });
  
      if (response.ok) {
        // Get the token from the response headers
        const accessToken = response.headers.get('access-token');
        const client = response.headers.get('client');
        const expiry = response.headers.get('expiry');
        const uid = response.headers.get('uid');
        const bearer = response.headers.get('bearer');
  
        if (accessToken) {
          setMessage('Sign Up Successful!');
          console.log('Access Token:', accessToken);
          console.log('Client:', client);
          console.log('Expiry:', expiry);
          console.log('UID:', uid);
          console.log('Bearer:', bearer);
  
          // Optionally store the token in localStorage
          localStorage.setItem('auth_token', accessToken);
          localStorage.setItem('client', client);
          localStorage.setItem('expiry', expiry);
          localStorage.setItem('uid', uid);
          localStorage.setItem('bearer', bearer);
        } else {
          setMessage('Token not found in response headers.');
        }
      } else {
        const error = await response.json();
        setMessage(error.errors || 'Error during sign up');
      }
    } catch (error) {
      setMessage('An error occurred while signing up.');
    }
  };
  

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="passwordConfirm" style={{ display: 'block', marginBottom: '0.5rem' }}>Confirm Password</label>
          <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}>Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
