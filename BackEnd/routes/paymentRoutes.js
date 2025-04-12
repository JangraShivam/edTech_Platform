// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature } = require("../controller/paymentController")
const { authentication, isInstructor, isStudent, isAdmin } = require("../middleware/authentication")
router.post("/capturePayment", authentication, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)

module.exports = router