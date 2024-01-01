export enum routes {
  home = '/',
  about = '/about',
  components = '/components',
  tasks = '/tasks',
}

export enum privateRoutes {}

export enum adminRoutes {}

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
    slug: routes.components,
    title: 'Components',
  },
  {
    slug: routes.tasks,
    title: 'Tasks',
  },
]
