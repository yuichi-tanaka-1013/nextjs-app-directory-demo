import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

export const nextConnectRouter = () => {
  const router = createRouter<NextApiRequest, NextApiResponse>()
  return router
}
type Router = ReturnType<typeof nextConnectRouter>

export const errorHandler = (error: unknown, res: NextApiResponse) => {
  let message: string
  if (error instanceof Error) {
    message = error.message
  } else {
    message = 'Internal server error'
  }
  res.json({ message })
}

export const getHandler = (router: Router): NextApiHandler =>
  router.handler({
    onError: (err, _req: NextApiRequest, res: NextApiResponse) => {
      errorHandler(err, res)
    },
  })
