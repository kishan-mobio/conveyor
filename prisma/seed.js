const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@conveyorbelt.com' },
    update: {},
    create: {
      email: 'admin@conveyorbelt.com',
      password: adminPassword,
      name: 'System Administrator',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create sample users
  const users = [
    {
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'USER',
    },
    {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      role: 'ADMIN',
    },
    {
      email: 'bob.wilson@example.com',
      name: 'Bob Wilson',
      role: 'USER',
    },
  ];

  const defaultPassword = await bcrypt.hash('password123', 12);

  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password: defaultPassword,
        isActive: true,
      },
    });
    console.log('✅ Created user:', user.email);
  }

  // Create sample audit logs
  const auditLogs = [
    {
      userId: admin.id,
      action: 'LOGIN',
      resource: 'AUTH',
      details: { method: 'email_password' },
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    {
      userId: admin.id,
      action: 'CREATE_USER',
      resource: 'USER',
      details: { targetUserId: 'sample-user-id' },
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  ];

  for (const logData of auditLogs) {
    await prisma.auditLog.create({
      data: logData,
    });
  }

  console.log('✅ Created audit logs');
  console.log('🎉 Database seeding completed!');
  console.log('\n📋 Default credentials:');
  console.log('Admin: admin@conveyorbelt.com / admin123');
  console.log('Users: [email] / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
