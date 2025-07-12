"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAuth } from '@/providers/AuthProvider';
import { authService } from '@/lib/api/auth';
import { 
  Home, 
  Sparkles, 
  Activity, 
  LayoutDashboard, 
  Gem, 
  Users, 
  Info, 
  Phone, 
  Book, 
  HelpCircle, 
  Menu, 
  X,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
  LogIn,
  UserPlus,
  Settings,
  LogOut,
  User,
  PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Check if current page is an auth page
  const isAuthPage = pathname === '/signin' || pathname === '/signup';

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      authService.logout();
      logout(); // Update the auth context
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const mainNavItems = [
    { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Pricing', href: '/pricing', icon: <Gem className="w-4 h-4" /> },
  ];

  const accountNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Create Design', href: '/design/create', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Activities', href: '/activities', icon: <Activity className="w-4 h-4" /> },
    { name: 'Community', href: '/community', icon: <Users className="w-4 h-4" /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <Settings className="w-4 h-4" /> },
    { 
      name: 'Logout', 
      href: '#', 
      icon: <LogOut className="w-4 h-4" />,
      onClick: handleLogout 
    },
  ];

  const moreNavItems = [
    { name: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
    { name: 'Contact', href: '/contact', icon: <Phone className="w-4 h-4" /> },
    { name: 'Blog', href: '/blog', icon: <Book className="w-4 h-4" /> },
    { name: 'Help', href: '/help', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const legalNavItems = [
    { name: 'Privacy Policy', href: '/legal/privacy', icon: <Info className="w-4 h-4" /> },
    { name: 'Terms of Service', href: '/legal/terms', icon: <Gem className="w-4 h-4" /> },
    { name: 'Cookie Policy', href: '/legal/cookies', icon: <Book className="w-4 h-4" /> },
    { name: 'GDPR', href: '/legal/gdpr', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold inline-block">Diamond Art</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1 transition-colors hover:text-foreground/80 ${
                  pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Account Dropdown - Only show when authenticated */}
            {isAuthenticated && (
              <DropdownMenu onOpenChange={(open) => setIsAccountOpen(open)}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 text-foreground/60 hover:text-foreground hover:bg-transparent">
                    <span>Account</span>
                    {isAccountOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {accountNavItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link 
                        href={item.href} 
                        className="flex items-center gap-2 w-full"
                        onClick={item.onClick}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* More Dropdown */}
            <DropdownMenu onOpenChange={(open) => setIsMoreOpen(open)}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-foreground/60 hover:text-foreground hover:bg-transparent">
                  <span>More</span>
                  {isMoreOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {moreNavItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-2 w-full">
                      {item.icon}
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Legal Dropdown */}
            <DropdownMenu onOpenChange={(open) => setIsLegalOpen(open)}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-foreground/60 hover:text-foreground hover:bg-transparent">
                  <span>Legal</span>
                  {isLegalOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {legalNavItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-2 w-full">
                      {item.icon}
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Mobile menu button */}
        <button
          ref={mobileMenuButtonRef}
          className="inline-flex items-center justify-center p-2 rounded-md text-foreground/60 hover:text-foreground focus:outline-none md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <div className="flex-1 flex items-center justify-end space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          {!isAuthPage && !isAuthenticated && (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/signin" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              </Button>
              <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                <Link href="/signup" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Get Started
                </Link>
              </Button>
            </>
          )}
          {!isAuthPage && isAuthenticated && (
            <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
              <Link href="/design/create" className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                Create
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t"
        >
          <div className="pt-2 pb-3 space-y-1">
            {/* Main Navigation Items */}
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium ${
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground/60 hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </div>
              </Link>
            ))}

            {/* Account Dropdown - Only show when authenticated */}
            {isAuthenticated && (
              <div className="px-3 py-2">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="flex items-center justify-between w-full text-base font-medium text-foreground/60 hover:text-foreground"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Account</span>
                  </div>
                  {isAccountOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {isAccountOpen && (
                  <div className="mt-2 pl-6 space-y-1">
                    {accountNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-3 py-2 text-sm font-medium rounded-md ${
                          pathname === item.href
                            ? 'bg-accent text-accent-foreground'
                            : 'text-foreground/60 hover:bg-accent hover:text-accent-foreground'
                        }`}
                        onClick={(e) => {
                          if (item.onClick) {
                            item.onClick(e);
                          }
                          setMobileMenuOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {item.icon}
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* More Dropdown */}
            <div className="px-3 py-2">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center justify-between w-full text-base font-medium text-foreground/60 hover:text-foreground"
              >
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  <span>More</span>
                </div>
                {isMoreOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {isMoreOpen && (
                <div className="mt-2 pl-6 space-y-1">
                  {moreNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-3 py-2 text-sm font-medium rounded-md ${
                        pathname === item.href
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground/60 hover:bg-accent hover:text-accent-foreground'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Legal Dropdown */}
            <div className="px-3 py-2">
              <button
                onClick={() => setIsLegalOpen(!isLegalOpen)}
                className="flex items-center justify-between w-full text-base font-medium text-foreground/60 hover:text-foreground"
              >
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  <span>Legal</span>
                </div>
                {isLegalOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {isLegalOpen && (
                <div className="mt-2 pl-6 space-y-1">
                  {legalNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-3 py-2 text-sm font-medium rounded-md ${
                        pathname === item.href
                          ? 'bg-accent text-accent-foreground'
                          : 'text-foreground/60 hover:bg-accent hover:text-accent-foreground'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}