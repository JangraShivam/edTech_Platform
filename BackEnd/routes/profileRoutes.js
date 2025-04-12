const express = require("express")
const router = express.Router()
const { authentication } = require("../middleware/authentication")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controller/profileController")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", deleteAccount)
router.put("/updateProfile", authentication, updateProfile)
router.get("/getUserDetails", authentication, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", authentication, getEnrolledCourses)
router.put("/updateDisplayPicture", authentication, updateDisplayPicture)

module.exports = router