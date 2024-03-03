import { Router } from "express";

import { login, register } from "../controllers/authenticate";

export default (router: Router): Router => {  
  router.post('/auth/login', login );
  router.post('/auth/register', register );
  return router
}