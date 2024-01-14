import { locales, localePrefix } from './navigation'
import { withAuth } from 'next-auth/middleware'
import { NextRequest } from 'next/server'
import { adminRoutes, privateRoutes } from './constants/routes'
import createMiddleware from 'next-intl/middleware'

const privatePages = Object.values(privateRoutes)
const adminPages = Object.values(adminRoutes)
const protectedPages = [...privatePages, ...adminPages]

const intlMiddleware = createMiddleware({
  defaultLocale: locales[0],
  localePrefix,
  locales,
})

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const adminPathnameRegex = RegExp(`^(/(${locales.join('|')}))?(${adminPages.join('|')})?/?$`, 'i')
        const isAdminPage = adminPathnameRegex.test(req.nextUrl.pathname)
        if (isAdminPage) {
          return token?.role === 'admin'
        }
        return token != null
      },
    },
    pages: {
      signIn: '/user/login',
    },
  }
)

export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] }

export default function middleware(req: NextRequest) {
  const protectedPathnameRegex = RegExp(`^(/(${locales.join('|')}))(${protectedPages.join('|')})/?$`, 'i')
  const isProtectedPage = protectedPathnameRegex.test(req.nextUrl.pathname)
  if (isProtectedPage) {
    return (authMiddleware as any)(req)
  } else {
    return intlMiddleware(req)
  }
}
