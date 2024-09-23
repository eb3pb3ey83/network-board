import { CMQuality } from '@/model/dashboard.model';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  faq: CMQuality;
  children: ReactNode;
  onClick?: () => void;
}

export const Faq = ({ faq, children, onClick }: Props) => {
  return faq.url?.type === 'link' ? (
    <Link to={faq.url?.value} target={faq.url?.target} style={{ textDecoration: 'inherit', color: 'inherit' }}>
      {children}
    </Link>
  ) : (
    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={onClick}>
      {children}
    </button>
  );
};
