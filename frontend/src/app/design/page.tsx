import { redirect } from 'next/navigation';

export default function DesignPage() {
  redirect('/design/create');
  return null;
}
