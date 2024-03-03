import { Router } from "express";

import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import { isAuthenticated , isOwner} from "../middleware";

export default (router: Router): Router => {  
  router.get('/users', isAuthenticated, getAllUsers );
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser );
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser );
  return router
}