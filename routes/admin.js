import { adminLogin, registerAdmin } from "../controllers/admin.js";

const router = express.Router();

//register admin
router.post("/register", registerAdmin);

//admin login
router.post("/login", adminLogin);

export default router;
