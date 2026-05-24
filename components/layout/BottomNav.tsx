'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Info, MessageCircle } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/gallery', label: 'Shop', Icon: ShoppingBag },
  { href: '/about', label: 'About', Icon: Info },
  { href: '/order', label: 'Order', Icon: MessageCircle },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden"
      style={{
        height: 'calc(56px + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
        backgroundColor: '#12121A',
        borderTop: '1px solid #2A2A3A',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {navItems.map(({ href, label, Icon }) => {
        const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className="flex flex-1 flex-col items-center justify-center"
            style={{
              color: active ? '#D4A843' : '#5A5450',
              transition: 'color 150ms ease',
              minHeight: '44px',
              minWidth: '44px',
              position: 'relative',
              paddingTop: active ? '0' : '2px',
            }}
          >
            {active && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '32px',
                  height: '2px',
                  backgroundColor: '#D4A843',
                  borderRadius: '0 0 2px 2px',
                }}
              />
            )}
            <Icon
              size={22}
              strokeWidth={active ? 2.5 : 1.5}
              aria-hidden="true"
            />
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontWeight: active ? 600 : 400,
                lineHeight: '1.3',
                marginTop: '2px',
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
