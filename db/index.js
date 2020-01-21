const mongoose = require('mongoose')

module.exports = () => {
  console.log('hihi')
  const DB_URI = process.env.DB_URI
  console.log(DB_URI)
  mongoose.set('debug', false);
  mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) {
      console.log('Connect database failed...')
    } else {
      console.log('Connected database ...')
    }
  })
}
