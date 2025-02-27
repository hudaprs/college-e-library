import mongoose from 'mongoose'
import { hashPassword } from '@/app/utils/common.util'

export interface UserBuildAttrs {
  name: string
  email: string
  password: string
}

export interface UserDocument extends mongoose.Document {
  name: string
  email: string
  password: string
  isUserVerified: boolean
}

interface UserModel extends mongoose.Model<UserDocument> {
  build: (attrs: UserBuildAttrs) => UserDocument
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isUserVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id
        delete ret._id
        delete ret.__v
        delete ret.password
      }
    },
    timestamps: true
  }
)

userSchema.statics.build = (attrs: UserBuildAttrs) => {
  return new User(attrs)
}

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const encryptedPassword = await hashPassword(this.get('password'))
    this.set('password', encryptedPassword)
  }

  done()
})

const User = mongoose.model<UserDocument, UserModel>('User', userSchema)

export { User }
