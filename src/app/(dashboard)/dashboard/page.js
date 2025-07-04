import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, Activity, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      description: '+20.1% from last month',
      icon: Users,
      gradient: 'gradient-primary'
    },
    {
      title: 'Active Users',
      value: '1,180',
      description: '+15.3% from last month',
      icon: Activity,
      gradient: 'gradient-success'
    },
    {
      title: 'New Registrations',
      value: '54',
      description: '+12.5% from last month',
      icon: UserPlus,
      gradient: 'gradient-accent'
    },
    {
      title: 'Growth Rate',
      value: '12.5%',
      description: '+2.1% from last month',
      icon: TrendingUp,
      gradient: 'gradient-warning'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your users.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.gradient}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 font-medium">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-effect border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest user activities and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center space-x-4 p-3 rounded-lg bg-white/50">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      New user registered
                    </p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-lg gradient-primary text-white hover:opacity-90 transition-opacity">
                <UserPlus className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Add User</span>
              </button>
              <button className="p-4 rounded-lg gradient-accent text-white hover:opacity-90 transition-opacity">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Manage Users</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
