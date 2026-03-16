import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  Activity,
  CreditCard,
  FileBox,
  FileText,
  Megaphone,
  Headphones,
  FolderGit2,
  MessageSquare,
  Shield,
  ChevronDown
} from 'lucide-react';

// Central sidebar configuration for easy developer customization
// Set `hidden: true` to hide an item, adjust `allowed` to control RBAC visibility,
// and `defaultOpen: true` to expand a collapsible group on load.
const sidebarConfig = [
  {
    title: 'OVERVIEW',
    titleKey: 'overview',
    items: [
      { path: '/', icon: LayoutDashboard, label: 'Dashboard', labelKey: 'dashboard' },
      { path: '/analytics', icon: BarChart3, label: 'Analytics', labelKey: 'analytics' },
      { path: '/reports', icon: FileText, label: 'Reports', labelKey: 'reports' },
    ]
  },
  {
    title: 'PEOPLE & CONTENT',
    titleKey: 'peopleContent',
    items: [
      { 
        path: '/users', icon: Users, label: 'Users', labelKey: 'users', key: 'users', defaultOpen: false,
        children: [
          { path: '/users', label: 'All users', labelKey: 'allUsers' },
          { path: '/users/roles', label: 'Roles & permissions', labelKey: 'roles' },
          { path: '/users/activity', label: 'Activity logs', labelKey: 'activityLogs' },
          { path: '/users/blocked', label: 'Blocked users', labelKey: 'blockedUsers' },
        ]
      },
      { path: '/customers', icon: Headphones, label: 'Customers', labelKey: 'customers' },
      { 
        path: '/content', icon: FileBox, label: 'Content', labelKey: 'content', key: 'content', defaultOpen: false,
        children: [
          { path: '/content/posts', label: 'Posts / articles', labelKey: 'posts' },
          { path: '/content/media', label: 'Media library', labelKey: 'media' },
          { path: '/content/pages', label: 'Pages', labelKey: 'pages' },
          { path: '/content/comments', label: 'Comments', labelKey: 'comments' },
        ]
      },
      { path: '/support', icon: MessageSquare, label: 'Support', labelKey: 'support', allowed: ['support', 'admin'] },
    ]
  },
  {
    title: 'COMMERCE',
    titleKey: 'commerce',
    items: [
      { 
        path: '/products', icon: ShoppingBag, label: 'Products', labelKey: 'products', key: 'products', defaultOpen: false,
        children: [
          { path: '/products', label: 'All products', labelKey: 'allProducts' },
          { path: '/products/categories', label: 'Categories', labelKey: 'categories' },
          { path: '/products/stock', label: 'Inventory', labelKey: 'inventory' },
          { path: '/products/reviews', label: 'Reviews', labelKey: 'reviews' },
        ]
      },
      { 
        path: '/orders', icon: CreditCard, label: 'Orders', labelKey: 'orders', key: 'orders', defaultOpen: false,
        children: [
          { path: '/orders', label: 'All orders', labelKey: 'allOrders' },
          { path: '/orders/pending', label: 'Pending', labelKey: 'pending' },
          { path: '/orders/completed', label: 'Completed', labelKey: 'completed' },
          { path: '/orders/refunds', label: 'Refunds', labelKey: 'refunds' },
          { path: '/orders/payments', label: 'Payments', labelKey: 'payments' },
        ]
      },
      { 
        path: '/marketing', icon: Megaphone, label: 'Marketing', labelKey: 'marketing', key: 'marketing', allowed: ['manager', 'admin'], defaultOpen: false,
        children: [
          { path: '/marketing/campaigns', label: 'Campaigns', labelKey: 'campaigns' },
          { path: '/marketing/coupons', label: 'Coupons', labelKey: 'coupons' },
          { path: '/marketing/affiliates', label: 'Affiliates', labelKey: 'affiliates' },
          { path: '/marketing/notifications', label: 'Push / email', labelKey: 'notifications' },
        ]
      },
    ]
  },
  {
    title: 'SYSTEM',
    titleKey: 'system',
    items: [
      { path: '/files', icon: FolderGit2, label: 'File Manager', labelKey: 'files' },
      { 
        path: '/system', icon: Shield, label: 'System', labelKey: 'system', key: 'system', allowed: ['admin'], defaultOpen: false,
        children: [
          { path: '/system/api', label: 'API keys', labelKey: 'api' },
          { path: '/system/integrations', label: 'Integrations', labelKey: 'integrations' },
          { path: '/system/logs', label: 'Logs', labelKey: 'logs' },
          { path: '/system/backup', label: 'Backup', labelKey: 'backup' },
        ]
      },
      { path: '/tasks', icon: Activity, label: 'Tasks', labelKey: 'tasks' },
      { path: '/settings', icon: Settings, label: 'Settings', labelKey: 'settings', allowed: ['admin', 'manager'] },
    ]
  },
];

export { ChevronDown, sidebarConfig };
