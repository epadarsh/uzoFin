// Shared primary navigation data, consumed by both the desktop nav in
// Header.jsx and the slide-in panel in MobileNav.jsx, so link content stays
// in sync between the two views.
//
// Each entry is either:
//  - a plain link: { label, href, active? } — rendered as a single <a>.
//  - a dropdown:   { label, items: string[] } — rendered as a Dropdown
//    (desktop) or an expandable accordion section (mobile), where `items`
//    are just display labels (not yet wired to real destination URLs).
export const NAV_LINKS = [
  { label: 'AI Banking', href: '#ai-banking', active: true },
  { label: 'Payments', items: ['Payment Links', 'Checkout', 'Invoicing'] },
  { label: 'Payouts', items: ['Bulk Payouts', 'Vendor Payments', 'Settlements'] },
  { label: 'Support', href: '#support' },
]
