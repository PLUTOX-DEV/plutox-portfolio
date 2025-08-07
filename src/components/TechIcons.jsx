'use client';

import React from 'react';

export default function TechIcons({ icons }) {
  return (
    <div className="flex gap-4 text-3xl mb-6">
      {icons.map((Icon, index) =>
        Icon ? <Icon key={index} className="text-neon-blue" /> : null
      )}
    </div>
  );
}
