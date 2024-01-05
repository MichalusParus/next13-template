export enum routes {
  home = '/',
  about = '/about',
  login = '/user/login',
  signup = '/user/sign-up',
}

export enum privateRoutes {
  components = '/components',
  tasks = '/tasks',
  profile = '/user/profile',
}

export enum adminRoutes {
  admin = '/user/admin',
}

export const navLinks = [
  {
    slug: routes.home,
    title: 'Home',
  },
  {
    slug: routes.about,
    title: 'About',
  },
  {
    slug: privateRoutes.components,
    title: 'Components',
    private: true,
  },
  {
    slug: privateRoutes.tasks,
    title: 'Tasks',
    private: true,
  },
]
