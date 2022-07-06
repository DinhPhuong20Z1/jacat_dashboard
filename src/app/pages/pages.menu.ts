import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Home',
        icon: 'archive-outline',
        link: '/pages/home',
        home: true,
    },
    {
        title: 'user management',
        icon: 'folder-outline',
        link: '/pages/user',
        home: true,
    },
    {
        title: 'Media',
        icon: 'folder-outline',
        link: '/pages/media',
        home: true,
    },
    {
        title: 'Menu',
        icon: 'folder-outline',
        link: '/pages/menu',
        home: true,
    },
    // {
    //     title: 'Page',
    //     icon: 'folder-outline',
    //     link: '/pages/page',
    //     home: true,
    // },
    {
        title: 'Component',
        icon: 'folder-outline',
        link: '/pages/component',
        home: true,
    },
];

export const MENU_ITEMS_BOTTOM: NbMenuItem[] = [
    {
        title: 'Profile',
        icon: 'person-outline',
        link: '/pages/profile',
    },
];
