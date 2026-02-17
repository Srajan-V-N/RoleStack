import { Card } from '@/components/ui';

export function Profile() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
      <Card className="mt-6">
        <p className="text-gray-600">
          Manage your account settings and view your activity history.
        </p>
      </Card>
    </div>
  );
}
