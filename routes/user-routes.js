 import express from 'express';
 import {getAllUser, getUser, login} from "../controller/user-controller";
 import  {signup} from "../controller/user-controller";

 const router = express.Router();

 router.get("/", getAllUser);
 router.get("/singleUser", getUser)
 router.post("/signup", signup);
 router.post("/login", login);

export default router;