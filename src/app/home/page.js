// src/app/home/page.js
'use client';

import React from 'react';
import AuthStatus from '../../components/AuthStatus';  // Adjusted import path

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      
      {/* Render the AuthStatus component */}
      <AuthStatus />
    </div>
  );
}


