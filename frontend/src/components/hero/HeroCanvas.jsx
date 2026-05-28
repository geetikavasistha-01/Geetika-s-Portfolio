import React from 'react';
import LeftClutter from './LeftClutter';
import RightClutter from './RightClutter';
import CRTMonitor from './CRTMonitor';

export default function HeroCanvas() {
  return (
    <main className="flex-grow pt-24 pb-12 px-margin-mobile md:px-margin-desktop bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEHAYDlBnaQ7X1eQnMTZTZ3BD4CLDsmFgqa70Lb0hOWxPSjMUx1QrHmomemGH4ZjzAfBPz-3ZmuwbJXrCXEqj9QKO8pd2dhMJK0BUR3_gNe7FNGPMNssP8oM4fnfBITDXs0LgH90SJ1q-L41xTFN1ysm3xK7giqvYE8PpMYVEq0uCPC0ivrhW7ADtFG3eS-k3gvRAWGNqQai0XFJHg-Hh8U4_TMWmnnJ2VN10256K1klhmZSz5AV-mqe3p80-EwbXzvSwYpAQqHyCv')] bg-cover bg-center bg-no-repeat relative halftone-bg min-h-[90vh] flex items-center justify-center flex-1">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-gutter relative z-10">
        <LeftClutter />
        <CRTMonitor />
        <RightClutter />
      </div>
    </main>
  );
}
