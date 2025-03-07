import dotenv from 'dotenv'
dotenv.config({
  path: '../../../.env'
})
import mongoose from 'mongoose'
import { System, type SystemBuildAttrs } from '@/app/models/system.model'
import { User } from '@/app//models/user.model'
import { SystemApprovalStatus } from '../types/system.type'

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

const systemManagerUser = await User.findOne({
  $text: { $search: 'system manager' }
})
const staffWidyatamaUser = await User.findOne({
  $text: { $search: 'staff widyatama' }
})

const users: SystemBuildAttrs[] = [
  {
    name: 'Widyatama Library',
    address:
      'Jl. Cikutra No.204A, Sukapada, Kec. Cibeunying Kidul, Kota Bandung, Jawa Barat 40125',
    phoneNumber: '(022) 7275855',
    requestedBy: new mongoose.Types.ObjectId(systemManagerUser?.id as string),
    status: SystemApprovalStatus.APPROVE,
    staffs: [new mongoose.Types.ObjectId(staffWidyatamaUser?.id as string)]
  }
]

const seedSystems = async () => {
  try {
    await System.deleteMany()
    await System.insertMany(users)
    console.log('Systems seeded successfully!')
    mongoose.connection.close()
  } catch (error) {
    console.error(error)
    mongoose.connection.close()
  }
}

seedSystems()
