'use client'

import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-between items-start">
          {/* Logo */}
          <div>
            <Logo />
          </div>

          {/* Right side links and copyright */}
          <div className="flex flex-col items-end space-y-4">
            {/* Links */}
            <div className="flex items-center gap-6">
              <Link 
                href="/tos" 
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                이용약관
              </Link>
              <Link 
                href="/pp" 
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link 
                href="https://github.com/joshephan/cocoa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                소스코드
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} COCOA. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 