// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controller/courseController")


// Categories Controllers Import
const {
  getAllCategory,
  createCategory,
  categoryPageDetails,
} = require("../controller/categoryController")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controller/sectionController")

// Sub-Sections Controllers Import
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controller/subSectionController")

// Rating Controllers Import
const {
  createRatingAndReview,
  getAverageRating,
  getAllRating,
} = require("../controller/ratingAndReviewController")

// Importing Middlewares
const { authentication, isInstructor, isStudent, isAdmin } = require("../middleware/authentication")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", authentication, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", authentication, isInstructor, createSection)
// Update a Section
router.post("/updateSection", authentication, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", authentication, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", authentication, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", authentication, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", authentication, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", authentication, isAdmin, createCategory)
router.get("/showAllCategories", getAllCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", authentication, isStudent, createRatingAndReview)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router