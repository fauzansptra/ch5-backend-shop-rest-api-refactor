const router = require("express").Router();

const { productController } = require("../controllers");
const authenticate = require("../middlewares/authenticate");

router.post("", productController.createProduct);
router.get("", productController.getAllProduct);
// router.get("/:id", productController.getProductById);
router.get("/:id", authenticate, productController.getProductById);
// router.get(
//   "/:id",
//   (req, res, next) => {
//     authenticate(req, res, next);
//   },
//   productController.getProductById
// );

router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
