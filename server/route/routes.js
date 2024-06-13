var express=require("express");

var userController=require("../src/controller");
var {setMark,getMark}=require("../src/markController");
const router=express.Router();

router.route('/user/login').post(userController.loginUserControllerFn);
router.route('/user/create').post(userController.createUserControllerFn);

router.route('/marks/create').post(setMark);
router.route('/marks/read').get(userController.authenticateToken,getMark);

module.exports=router