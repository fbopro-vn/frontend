// utils/menuHighlight.ts

export const getActiveMenuKey = (pathname: string): string | null => {
    if (pathname === '/') return 'overview';
    if (pathname.startsWith('/hang_hoa')) return 'product';
    if (pathname.startsWith('/dat_hang')) return 'order';
    if (pathname.startsWith('/van_hanh')) return 'operate';
    if (pathname === '/nhap_chi' || pathname === '/nhap_thu') return 'accountant';
    if (pathname.startsWith('/giao_dich')) return 'transaction';
    if (pathname.startsWith('/bao_cao')) return 'report';
    if (pathname.startsWith('/doi_tac')) return 'partner';
  
    return null;
  };
  