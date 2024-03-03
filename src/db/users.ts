import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  authentication : {
    password: { type: String, select: false, required: true },
    salt: { type: String, select: false },
    sessionToken : { type: String, select: false }
  }
})

export const User = mongoose.model('User', UserSchema)

// functions
export const getUsers = () => User.find()
export const getUserByEmail = (email: string) => User.findOne({ email })
export const getUserBySessionToken = (sessionToken: string) => User.findOne({ 'authentication.sessionToken': sessionToken })
export const getUserById = (id: string) => User.findById(id)
export const createUser = (user: Record<string, any>) => new User(user).save().then((user: any) => user.toObject())
export const updateUser = (id: string, user: Record<string, any>) => User.findByIdAndUpdate(id, user)
export const deleteUserById = (id: string) => User.findOneAndDelete({ _id: id })