// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// // import React from 'react';

// import AuthStatus from '../../components/AuthStatus'; // Move one level up to import from 'components'

// export default function SignInPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const router = useRouter(); // Initialize router for redirection

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send the credentials to the backend for authentication
//       const response = await fetch('http://localhost:3003/auth/sign_in', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Invalid email or password');
//       }

//       // Get the token and other headers from the response headers
//       const accessToken = response.headers.get('access-token');
//       const client = response.headers.get('client');
//       const expiry = response.headers.get('expiry');
//       const uid = response.headers.get('uid');
//       const bearer = response.headers.get('bearer');

//       if (accessToken) {
//         setMessage('Sign in Successful!');
//         console.log('Access Token:', accessToken);
//         console.log('Client:', client);
//         console.log('Expiry:', expiry);
//         console.log('UID:', uid);
//         console.log('Bearer:', bearer);

//         // Optionally store the token in localStorage
//         localStorage.setItem('auth_token', accessToken);
//         localStorage.setItem('client', client);
//         localStorage.setItem('expiry', expiry);
//         localStorage.setItem('uid', uid);
//         localStorage.setItem('bearer', bearer);

//         // Redirect to the /home page
//         router.push('/home'); // Navigate to /home using Next.js router
//       } else {
//         setError('Token not found in response headers.');
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Sign In</h1>
//       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             required
//             style={{ width: '100%', padding: '0.5rem' }}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             required
//             style={{ width: '100%', padding: '0.5rem' }}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button
//           type="submit"
//           style={{
//             padding: '0.5rem 1rem',
//             backgroundColor: '#0070f3',
//             color: '#fff',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           Sign In
//         </button>
//       </form>
//       {message && <p style={{ color: 'green' }}>{message}</p>}
//     </div>
//   );
// }













'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';  // Import useDispatch for dispatching actions
import { signIn } from '../../store/authSlice';  // Import the signIn action
import AuthStatus from '../../components/AuthStatus'; // Import AuthStatus component

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();  // Initialize dispatch
  const router = useRouter(); // Initialize router for redirection

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the credentials to the backend for authentication
      const response = await fetch('http://localhost:3003/auth/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      // Get the token and other headers from the response headers
      const accessToken = response.headers.get('access-token');
      const client = response.headers.get('client');
      const expiry = response.headers.get('expiry');
      const uid = response.headers.get('uid');
      const bearer = response.headers.get('bearer');

      if (accessToken) {
        setMessage('Sign in Successful!');
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

        // Dispatch the signIn action to update Redux state
        dispatch(signIn());  // Set isAuthenticated to true

        // Redirect to the /home page
        router.push('/home'); // Navigate to /home using Next.js router
      } else {
        setError('Token not found in response headers.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            style={{ width: '100%', padding: '0.5rem' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            style={{ width: '100%', padding: '0.5rem' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}

      {/* Display AuthStatus component */}
      <AuthStatus />
    </div>
  );
}
