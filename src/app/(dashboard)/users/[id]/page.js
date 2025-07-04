import UserForm from '@/features/users/components/UserForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EditUserPage({ params }) {
  const { id } = params;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/users">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Edit User
          </h1>
          <p className="text-gray-600 mt-2">
            Update user information and settings
          </p>
        </div>
      </div>

      <Card className="glass-effect border-0 shadow-lg max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            User Information
          </CardTitle>
          <CardDescription>
            Update the user details below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm userId={id} />
        </CardContent>
      </Card>
    </div>
  );
}
