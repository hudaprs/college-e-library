import dotenv from 'dotenv'
dotenv.config({
  path: '../../../.env'
})
import mongoose from 'mongoose'
import { Permission } from '@/app/models/permission.model'
import { Role, type RoleBuildAttrs } from '@/app/models/role.model'
import { PermissionCode, PermissionGroup } from '../types/permission.type'

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

const allPermissions = await Permission.find()
const systemPermissions = await Permission.find({
  group: PermissionGroup.SYSTEM
})

const roles: RoleBuildAttrs[] = [
  {
    name: 'Super Admin',
    permissions: allPermissions
  },
  {
    name: 'Common',
    permissions: []
  },
  {
    name: 'System Manager',
    permissions: systemPermissions.filter(
      permission =>
        permission.code !== PermissionCode.ADMIN_SYSTEM &&
        !permission.code.includes('staff')
    )
  },
  {
    name: 'System Admin',
    permissions: systemPermissions
  },
  {
    name: 'Staff',
    permissions: systemPermissions.filter(permission =>
      permission.code.toLowerCase().includes('staff')
    )
  }
]

const seedRoles = async () => {
  try {
    await Role.deleteMany()
    await Role.insertMany(roles)
    console.log('Roles seeded successfully!')
    mongoose.connection.close()
  } catch (error) {
    console.error(error)
    mongoose.connection.close()
  }
}

seedRoles()
