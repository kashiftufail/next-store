// import Navbar from '../components/Navbar';




// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <Navbar />
//         <main>{children}</main>
//       </body>
//     </html>
//   );
// }


// src/app/provider.js or _app.js (Client Component)\


'use client';  // Ensure it's a Client Component

import { Provider } from 'react-redux'; 
import { useEffect } from 'react';
//import store from '../store/store';  // Import the Redux store
import store from '../store/store';  // Import the Redux store
import { setAuthStateFromStorage } from '../store/authSlice';
import Navbar from '../components/Navbar';
import './globals.css';
// export const metadata = {
//   title: 'My Next.js App',
//   description: 'A scalable Next.js project',
// };


export default function RootLayout({ children }) {


  useEffect(() => {
    // Only dispatch on the client-side
    store.dispatch(setAuthStateFromStorage());
  }, []);
  
  return (
    <html lang="en">
      <body>
        <Provider store={store}>  {/* Wrap the components that use Redux */}
          <Navbar />  {/* Only the components that need Redux hooks */}
          {children}
        </Provider>
    </body>
    </html>
  );
}


