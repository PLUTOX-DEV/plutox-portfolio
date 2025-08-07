'use client';

import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { useMemo } from 'react';

const iconPacks = { ...FaIcons, ...SiIcons };

export default function IconRenderer({ name, className = '' }) {
  const IconComponent = useMemo(() => {
    const icon = iconPacks[name];
    if (!icon) {
      console.warn(`❌ Icon "${name}" not found in iconPacks`);
    }
    return icon || FaIcons.FaQuestion; // fallback icon
  }, [name]);

  return (
    <IconComponent className={`text-xl text-neon-purple ${className}`} />
  );
}
