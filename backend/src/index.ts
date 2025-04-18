import colors from 'colors'
import server from './connection/server'
import { PORT } from './connection/config'

server.listen(PORT, () => {
  console.log( colors.cyan.bold( `API REST running on port: ${PORT}` ))
  console.log( colors.cyan.bold( `http://localhost:${PORT}` ))
})
