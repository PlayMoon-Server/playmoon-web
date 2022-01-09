export type registerData = {
  verifyToken: String,
  pw: String,
  pw2: String,
  email?: String
}

export type loginData = {
  name: String,
  pw: String
}

export type user = {
  name: String,
  createdAt: Date,
  updatedAt: Date
}