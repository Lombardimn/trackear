"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChangeEvent, ReactNode } from "react"

type TabItem = {
  name: string,
  href: string,
  icon: ReactNode
}

interface TabsNavigationProps {
  tabs: TabItem[]
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function TabsNavigation({ tabs }: TabsNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const currentTab = tabs.filter(tab => tab.href === pathname)[0]

  return (
    <div className="mb-4">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          name="tabs"
          id="tabs"
          value={currentTab.href.toString()}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => router.push(e.target.value)}
          className="block w-full rounded-md border-gray-300 focus:border-green-700 focus:ring-green-700"
        >
          {
            tabs.map((tab)=>(
              <option
                key={tab.name}
                value={tab.href}
              >
                {tab.name}
              </option>
            ))
          }
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-300">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            {
              tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    pathname === tab.href
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                  )}
                >
                  <span
                    aria-hidden="true" 
                    className={classNames(
                      pathname === tab.href
                        ? 'text-green-500'
                        : 'text-gray-400 group-hover:text-gray-500', '-ml-0.5 mr-2 h-5 w-5'
                    )}
                  >
                    {tab.icon}
                  </span>
                  <span>{tab.name}</span>
                </Link>
              ))
            }
          </nav>
        </div>
      </div>
    </div>
  )
}