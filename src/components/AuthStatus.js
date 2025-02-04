// components/AuthStatus.js
// 'use client';
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { signIn, signOut } from '../store/authSlice';

// export default function AuthStatus() {
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Access state from the Redux store

//   return (
//     <div>
//       <h2>Authentication Status</h2>
//       <p>{isAuthenticated ? 'You are signed in!' : 'You are not signed in.'}</p>
//       <button
//         onClick={() => {
//           if (isAuthenticated) {
//             dispatch(signOut()); // Dispatch signOut if already authenticated
//           } else {
//             dispatch(signIn()); // Dispatch signIn to update state
//           }
//         }}
//       >
//         {isAuthenticated ? 'Sign Out' : 'Sign In'}
//       </button>
//     </div>
//   );
// }




// src/components/AuthStatus.js
'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';  // Use useSelector and useDispatch from react-redux
import { signIn, signOut } from '../store/authSlice';  // Import signIn and signOut actions

export default function AuthStatus() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);  // Get isAuthenticated from Redux

  return (
    <div>
      <h2>Authentication Status</h2>
      <p>{isAuthenticated ? 'You are signed in!' : 'You are not signed in.'}</p>
      <button
        onClick={() => {
          if (isAuthenticated) {
            dispatch(signOut());  // If signed in, dispatch signOut action
          } else {
            dispatch(signIn());  // If not signed in, dispatch signIn action
          }
        }}
      >
        {isAuthenticated ? 'Sign Out' : 'Sign In'}
      </button>
    </div>
  );
}
