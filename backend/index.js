const express = require("express");
const multer = require("multer");
const Jwt = require("jsonwebtoken");
const User = require("./db/User");
const Product = require("./db/Product");
require("./db/config");
const cors = require("cors");
const app = express();
const jwtKey = "e-commerce";

app.use(express.json());
app.use(cors());
app.use("/images", express.static(__dirname + "/images"));
//Register User
app.post("/register", async (req, resp) => {
  const user = new User(req.body);
  const result = await user.save();
  const data = result.toObject();
  delete data.password;
  if (data) {
    Jwt.sign({ data }, jwtKey, (err, token) => {
      if (err) {
        resp.send("Something went wrong");
      } else {
        resp.send({ data, auth: token });
      }
    });
  } else {
    resp.send("Something went wrong");
  }
});

//Login User
app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, (err, token) => {
        if (err) {
          resp.send("Something went wrong");
        } else {
          resp.send({ user, auth: token });
        }
      });
    } else {
      resp.send("No user found");
    }
  } else {
    resp.send("Fill all fields");
  }
});

//Get Products
app.get("/products", verifyToken, async (req, resp) => {
  const products = await Product.find();
  if (products.length) {
    resp.send(products);
  } else {
    resp.send("No products found");
  }
});

//Delete Product
app.delete("/product/:id", verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

//Get One Product
app.get("/product/:id", verifyToken, async (req, resp) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    resp.send(product);
  } else {
    resp.send("No product found");
  }
});

//Update Product
app.put("/update/:id", verifyToken, async (req, resp) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

//Search Product
app.get("/search/:key", verifyToken, async (req, resp) => {
  const data = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  resp.send(data);
});

//Middleware of token
function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send("Please provide valid token");
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send("Please provide token");
  }
}

//Upload file
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const filter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: fileStorageEngine,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: filter,
});

//Add Product
app.post(
  "/add-product",
  upload.single("image"),
  verifyToken,
  async (req, resp) => {
    let product = new Product({ ...req.body, image: req.file.filename });
    let result = await product.save();
    resp.send(req.file.filename);
  }
);

app.listen(2000);
