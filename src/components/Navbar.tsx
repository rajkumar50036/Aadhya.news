'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Radio, Flame, ShieldAlert, PhoneCall, Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';
import { LogoPlaceholder } from './LogoPlaceholder';
import { ContactDialerButton } from './ContactDialerButton';
import { CONFIG } from '@/lib/config';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalDropdownOpen, setGlobalDropdownOpen] = useState(false);
  const [indiaDropdownOpen, setIndiaDropdownOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Global', href: '/global', hasDropdown: 'global' },
    { name: 'India', href: '/india', hasDropdown: 'india' },
    { name: 'Student', href: '/student' },
    { name: 'Exams', href: '/exams' },
    { name: 'Live', href: '/live', icon: Radio, isLive: true },
    { name: 'Trending', href: '/trending', icon: Flame },
  ];

  const globalSubRoutes = [
    { name: 'World', href: '/global/world' },
    { name: 'USA', href: '/global/usa' },
    { name: 'UK', href: '/global/uk' },
    { name: 'Europe', href: '/global/europe' },
    { name: 'Asia', href: '/global/asia' },
    { name: 'Middle East', href: '/global/middle-east' },
    { name: 'Africa', href: '/global/africa' },
    { name: 'Australia', href: '/global/australia' },
    { name: 'Politics', href: '/global/politics' },
    { name: 'Business', href: '/global/business' },
    { name: 'Technology', href: '/global/technology' },
    { name: 'Science & Space', href: '/global/science-space' },
    { name: 'Sports', href: '/global/sports' },
    { name: 'Breaking', href: '/global/breaking' },
  ];

  const indiaSubRoutes = [
    { name: 'India Breaking', href: '/india/breaking' },
    { name: 'Politics & Govt', href: '/india/politics' },
    { name: 'Economy & Business', href: '/india/economy' },
    { name: 'Education', href: '/india/education' },
    { name: 'Technology', href: '/india/technology' },
    { name: 'Jobs & Careers', href: '/india/jobs-careers' },
    { name: 'State News', href: '/india/state' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left: Logo & Brand Placeholder */}
          <Link href="/" className="shrink-0 flex items-center">
            <LogoPlaceholder />
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search news, topics, exams, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          </form>

          {/* Right Actions: Dark Mode, Dialer Button, Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ContactDialerButton className="hidden sm:inline-flex text-xs px-3 py-1.5" showText={true} />

            <button
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links Row */}
        <nav className="hidden md:flex items-center gap-1 py-2 text-sm font-semibold border-t border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-none">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;

            if (link.hasDropdown === 'global') {
              return (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setGlobalDropdownOpen(true)}
                  onMouseLeave={() => setGlobalDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                      isActive
                        ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
                  </Link>

                  {/* Mega Dropdown */}
                  {globalDropdownOpen && (
                    <div className="absolute top-full left-0 w-[480px] bg-white dark:bg-slate-900 shadow-xl rounded-xl border border-slate-200 dark:border-slate-800 p-4 grid grid-cols-2 gap-2 z-50">
                      {globalSubRoutes.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (link.hasDropdown === 'india') {
              return (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setIndiaDropdownOpen(true)}
                  onMouseLeave={() => setIndiaDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                      isActive
                        ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
                  </Link>

                  {/* Dropdown */}
                  {indiaDropdownOpen && (
                    <div className="absolute top-full left-0 w-64 bg-white dark:bg-slate-900 shadow-xl rounded-xl border border-slate-200 dark:border-slate-800 p-3 flex flex-col gap-1 z-50">
                      {indiaSubRoutes.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="px-3 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {Icon && <Icon className={`w-4 h-4 ${link.isLive ? 'text-red-500 animate-pulse' : ''}`} />}
                <span>{link.name}</span>
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="ml-auto px-3 py-1.5 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Contact
          </Link>
          <Link
            href="/admin"
            className="px-3 py-1.5 rounded-md bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs"
          >
            Admin Portal
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-950/50"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <ContactDialerButton className="w-full justify-center" showText={true} />
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 text-center rounded-lg bg-slate-800 text-white font-bold text-xs"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
