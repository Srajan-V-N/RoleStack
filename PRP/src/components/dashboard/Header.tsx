import { CircleUserRound } from 'lucide-react';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-lg font-semibold text-gray-900">Placement Prep</h1>
      <CircleUserRound size={32} className="text-gray-400" />
    </header>
  );
}
