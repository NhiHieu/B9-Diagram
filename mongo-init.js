db.createUser(
  {
    user: 'b9user',
    pwd: 'passwordforb9',
    roles: [
      {
        role: 'readWrite',
        db: 'b9db'
      }
    ]
  }
)
