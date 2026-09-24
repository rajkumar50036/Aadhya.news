'use client';

import React from 'react';
import { PhoneCall } from 'lucide-react';
import { CONFIG, getDialerUri } from '@/lib/config';

interface Props {
  className?: string;
  showText?: boolean;
}

export const ContactDialerButton: React.FC<Props> = ({ className = '', showText = true }) => {
  return (
    <a
      href={getDialerUri()}
      aria-label={`Call us at ${CONFIG.contactPhone}`}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-all shadow-md shadow-red-500/20 ${className}`}
    >
      <PhoneCall className="w-4 h-4 animate-bounce" />
      {showText && <span>CALL US ({CONFIG.contactPhone})</span>}
    </a>
  );
};
