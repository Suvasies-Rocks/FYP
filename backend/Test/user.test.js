const request = require("supertest");
const app = require("../app");

//Register Test
describe("POST /register", () => {
  
  
  it("should return 200 and success message when user is registered", async () => {
    const response = await request(app).post("/register").send({
      firstName: "John",
      lastName: "Doe",
      email: `test${Date.now()}@gmail.com`, 
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Registered successfully");
  });


  it("should return 400 if user already exists", async () => {
    const existingEmail = `existing${Date.now()}@example.com`;

    
    await request(app).post("/register").send({
      firstName: "Existing",
      lastName: "User",
      email: existingEmail,
      password: "password123",
    });

    
    const response = await request(app).post("/register").send({
      firstName: "Existing",
      lastName: "User",
      email: existingEmail,
      password: "password123",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "User already exists");
  });

  
  it("should return 500 if required fields are missing", async () => {
    const response = await request(app).post("/register").send({
      firstName: "Test",
      lastName: "User",
      password: "password123",
    });

    expect(response.statusCode).toBe(500); 
    expect(response.body).toHaveProperty("message", "Internal server error");
  });

  
  it("should return 500 for empty request body", async () => {
    const response = await request(app).post("/register").send({});

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("message", "Internal server error");
  });
});





//Login Test
// describe("POST /login", () => {

  
//   it("should return 200 and token when credentials are valid", async () => {
//     const uniqueEmail = `user${Date.now()}@gmail.com`;

    
//     await request(app).post("/register").send({
//       firstName: "John",
//       lastName: "Doe",
//       email: uniqueEmail,
//       password: "password123",
//     });

   
//     const response = await request(app).post("/login").send({
//       email: uniqueEmail,
//       password: "password123",
//     });

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("message", "Logged in successfully!");
//     expect(response.body).toHaveProperty("token");
//     expect(response.body).toHaveProperty("data");
//   });

  
//   it("should return 400 if password is incorrect", async () => {
//     const uniqueEmail = `wrongpass${Date.now()}@gmail.com`;

    
//     await request(app).post("/register").send({
//       firstName: "Jane",
//       lastName: "Smith",
//       email: uniqueEmail,
//       password: "correctpassword",
//     });

   
//     const response = await request(app).post("/login").send({
//       email: uniqueEmail,
//       password: "wrongpassword",
//     });

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toHaveProperty("message", "Invalid Password");
//   });

  
//   it("should return 400 if no user found with email", async () => {
//     const response = await request(app).post("/login").send({
//       email: `nonexistent${Date.now()}@gmail.com`,
//       password: "somepassword",
//     });

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toHaveProperty("message", "No user found registered with this email");
//   });

  
//   it("should return 500 if email or password is missing", async () => {
//     const response = await request(app).post("/login").send({});

//     expect(response.statusCode).toBe(500); 
//   });

// });


//Reset password test.......................................................................................................................
// describe("POST /reset-password", () => {

  
//   it("should reset password and return 200 with success message", async () => {
//     const uniqueEmail = `reset${Date.now()}@gmail.com`;

    
//     await request(app).post("/register").send({
//       firstName: "Reset",
//       lastName: "Test",
//       email: uniqueEmail,
//       password: "oldPassword123",
//     });

    
//     const response = await request(app).post("/reset-password").send({
//       email: uniqueEmail,
//       password: "newPassword456",
//     });

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("message", "Password has been successfully reset");
//   });

  
//   it("should return 400 if email is not found", async () => {
//     const response = await request(app).post("/reset-password").send({
//       email: `nouser${Date.now()}@gmail.com`,
//       password: "anyPassword123",
//     });

//     expect(response.statusCode).toBe(400);
//     expect(response.text).toBe("User not found");
//   });

  
//   it("should return 500 if email or password is missing", async () => {
//     const response = await request(app).post("/reset-password").send({});

//     expect(response.statusCode).toBe(500); 
//     expect(response.text).toBe("Failed to reset password");
//   });

// });

//Payment testing........................................................................................................



// const db = require("../model/index.js"); 
// const enroll = db.enroll;
// const payment = db.payment;
// const sequelize = db.sequelize;

// describe("POST /payment/:id", () => {

//   it("should add payment and return 200 with success message", async () => {
//     const uniqueEmail = `payment${Date.now()}@gmail.com`;

//     await request(app).post("/register").send({
//       firstName: "Payment",
//       lastName: "User",
//       email: uniqueEmail,
//       password: "password123",
//     });

//     const loginResponse = await request(app).post("/login").send({
//       email: uniqueEmail,
//       password: "password123",
//     });

//     const token = loginResponse.body.token;
//     const userId = loginResponse.body.data.id;

    
//     const enrollRecord = await enroll.create({
//       enrollDate: new Date().toISOString(),
//     });

//     const response = await request(app)
//       .post(`/payment/${enrollRecord.id}`)
//       .set("Authorization", `Bearer ${token}`)
//       .set("userId", userId);                 

    
//     if (response.statusCode === 200) {
//       expect(response.body).toHaveProperty("message", "Payment successfully added");
//     } else {
//       console.log("Actual Response:", response.body); 
//     }

//     expect([200, 404]).toContain(response.statusCode);
//   });

  
//   it("should return 404 if enrollment is not found", async () => {
//     const uniqueEmail = `notfound${Date.now()}@gmail.com`;

//     await request(app).post("/register").send({
//       firstName: "NotFound",
//       lastName: "User",
//       email: uniqueEmail,
//       password: "password123",
//     });

//     const loginResponse = await request(app).post("/login").send({
//       email: uniqueEmail,
//       password: "password123",
//     });

//     const token = loginResponse.body.token;
//     const userId = loginResponse.body.data.id;

//     const response = await request(app)
//       .post("/payment/9999999")
//       .set("Authorization", `Bearer ${token}`)
//       .set("userId", userId);

//     expect(response.statusCode).toBe(404);
//     if (response.body.message) {
//       expect(response.body.message).toContain("Enrollment not found");
//     }
//   });

  
//   it("should return 404 if something goes wrong with bad id", async () => {
//     const response = await request(app)
//       .post("/payment/invalidid");

//     expect(response.statusCode).toBe(404);
//   });

// });

// afterAll(async () => {
//   await sequelize.close();
// });



//Profile api testing.............................................................................................................

// const db = require("../model/index.js");
// const profile = db.profile;
// const users = db.users;
// const sequelize = db.sequelize;


// describe("GET /profile", () => {

//   it("should return 200 if profile exists", async () => {
//     const uniqueEmail = `profile${Date.now()}@gmail.com`;


//     await request(app).post("/register").send({
//       firstName: "Profile",
//       lastName: "Test",
//       email: uniqueEmail,
//       password: "password123",
//     });

//     const loginResponse = await request(app).post("/login").send({
//       email: uniqueEmail,
//       password: "password123",
//     });

//     const token = loginResponse.body.token;
//     const userId = loginResponse.body.data.id;

//     await profile.create({ userId });

//     const response = await request(app)
//       .get("/profile")
//       .set("Authorization", `Bearer ${token}`);

//     expect([200, 404]).toContain(response.statusCode);

//     if (response.statusCode === 200) {
//       expect(response.body).toHaveProperty("id");
//       expect(response.body).toHaveProperty("userId", userId);
//       expect(response.body).toHaveProperty("user");
//     }
//   });

  
//   it("should return 404 if profile does not exist", async () => {
//     const uniqueEmail = `noprofile${Date.now()}@gmail.com`;

//     await request(app).post("/register").send({
//       firstName: "NoProfile",
//       lastName: "User",
//       email: uniqueEmail,
//       password: "password123",
//     });

//     const loginResponse = await request(app).post("/login").send({
//       email: uniqueEmail,
//       password: "password123",
//     });

//     const token = loginResponse.body.token;

//     const response = await request(app)
//       .get("/profile")
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.statusCode).toBe(404);
//   });

  
//   it("should return 404 if no token is provided", async () => {
//     const response = await request(app)
//       .get("/profile");

//     expect(response.statusCode).toBe(404);
    
//   });

// });

// afterAll(async () => {
//   await sequelize.close();
// });


//Enrollment testing ........................................................................................................
// const express = require("express");
// const request = require("supertest");


// jest.mock("../model", () => ({
//   enroll: {
//     findAll: jest.fn(),
//   },
// }));


// jest.mock("../middleware/isAuthenticated", () => ({
//   isAuthenticated: (req, res, next) => {
//     req.userId = 1;
//     next();
//   },
// }));

// const { enroll } = require("../model");


// const { getEnrollments } = require("../controllers/userController");


// const app = express();
// app.use(express.json());
// app.get("/getId/:courseId", require("../middleware/isAuthenticated").isAuthenticated, getEnrollments);

// describe("GET /getId/:courseId", () => {

//   it("should return 200 and enrollments if enrollments exist", async () => {
//     enroll.findAll.mockResolvedValue([
//       { id: 1, userId: 1, courseId: 1 },
//     ]);

//     const response = await request(app)
//       .get("/getId/1")
//       .set("Authorization", `Bearer dummyToken`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("message", "Enrollments retrieved successfully");
//     expect(Array.isArray(response.body.data)).toBe(true);
//   });

//   it("should return 404 if no enrollments found", async () => {
//     enroll.findAll.mockResolvedValue([]);

//     const response = await request(app)
//       .get("/getId/1")
//       .set("Authorization", `Bearer dummyToken`);

//     expect(response.statusCode).toBe(404);
//     expect(response.body).toHaveProperty("message", "No enrollments found");
//   });

//   it("should return 500 if there is a server error", async () => {
//     enroll.findAll.mockRejectedValue(new Error("Database error"));

//     const response = await request(app)
//       .get("/getId/1")
//       .set("Authorization", `Bearer dummyToken`);

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("message", "Failed to retrieve enrollments");
//   });

// });

// const express = require("express");
// const request = require("supertest");


// jest.mock("../model", () => ({
//   categories: {
//     create: jest.fn(),
//   },
// }));


// jest.mock("../middleware/isAuthenticated", () => ({
//   isAuthenticated: (req, res, next) => {
//     req.userId = 1; 
//     next();
//   },
// }));

// jest.mock("../middleware/restrictTo", () => () => (req, res, next) => {
//   next(); 
// });

// const { categories } = require("../model");
// const { addCourseCategory } = require("../controllers/admin/courseController");


// const app = express();
// app.use(express.json());
// app.post(
//   "/add-category",
//   require("../middleware/isAuthenticated").isAuthenticated,
//   require("../middleware/restrictTo")("admin"),
//   addCourseCategory
// );

// describe("POST /add-category", () => {
  
//   it("should return 200 and success message when category is added", async () => {
//     categories.create.mockResolvedValue({});

//     const response = await request(app)
//       .post("/add-category")
//       .set("Authorization", `Bearer dummyToken`)
//       .send({ categoryName: "Technology" });

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("message", "Category added successfully");
//   });

//   it("should return 500 if there is a server error", async () => {
//     categories.create.mockRejectedValue(new Error("Database error"));

//     const response = await request(app)
//       .post("/add-category")
//       .set("Authorization", `Bearer dummyToken`)
//       .send({ categoryName: "Technology" });

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("message", "Internal server error");
//   });

// });


//update category testing ...............................................................................
// const express = require("express");
// const request = require("supertest");


// jest.mock("../model", () => ({
//   categories: {
//     findByPk: jest.fn(),
//   },
// }));


// jest.mock("../middleware/isAuthenticated", () => ({
//   isAuthenticated: (req, res, next) => {
//     req.userId = 1;
//     next();
//   },
// }));

// jest.mock("../middleware/restrictTo", () => () => (req, res, next) => {
//   next();
// });

// const { categories } = require("../model");
// const { updateCourseCategory } = require("../controllers/admin/courseController"); 


// const app = express();
// app.use(express.json());
// app.patch(
//   "/update-category/:id",
//   require("../middleware/isAuthenticated").isAuthenticated,
//   require("../middleware/restrictTo")("admin"),
//   updateCourseCategory
// );

// describe("PATCH /update-category/:id", () => {

//   it("should return 200 and success message if category updated", async () => {
//     const mockCategory = { 
//       id: 1, 
//       categoryName: "Old Name", 
//       save: jest.fn().mockResolvedValue() 
//     };

//     categories.findByPk.mockResolvedValue(mockCategory);

//     const response = await request(app)
//       .patch("/update-category/1")
//       .set("Authorization", `Bearer dummyToken`)
//       .send({ categoryName: "New Category Name" });

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("message", "Category updated successfully");
//     expect(response.body).toHaveProperty("category");
//     expect(mockCategory.save).toHaveBeenCalled();
//   });

//   it("should return 404 if category not found", async () => {
//     categories.findByPk.mockResolvedValue(null);

//     const response = await request(app)
//       .patch("/update-category/999")
//       .set("Authorization", `Bearer dummyToken`)
//       .send({ categoryName: "Anything" });

//     expect(response.statusCode).toBe(404);
//     expect(response.body).toHaveProperty("message", "Category not found");
//   });

//   it("should return 500 if server error occurs", async () => {
//     categories.findByPk.mockRejectedValue(new Error("Database error"));

//     const response = await request(app)
//       .patch("/update-category/1")
//       .set("Authorization", `Bearer dummyToken`)
//       .send({ categoryName: "Test Category" });

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("error", "Internal server error");
//   });

// });


//delete course category testing.............................................................................

// const express = require("express");
// const request = require("supertest");

// jest.mock("../model", () => ({
//   categories: {
//     findByPk: jest.fn(),
//   },
// }));

// jest.mock("../middleware/isAuthenticated", () => ({
//   isAuthenticated: (req, res, next) => {
//     req.userId = 1;
//     next();
//   },
// }));

// jest.mock("../middleware/restrictTo", () => () => (req, res, next) => {
//   next();
// });

// const { categories } = require("../model");
// const { deleteCourseCategory } = require("../controllers/admin/courseController");

// const app = express();
// app.use(express.json());
// app.delete(
//   "/delete-category/:id",
//   require("../middleware/isAuthenticated").isAuthenticated,
//   require("../middleware/restrictTo")("admin"),
//   deleteCourseCategory
// );

// describe("DELETE /delete-category/:id", () => {

//   it("should return 200 and success message when category is deleted", async () => {
//     const mockCategory = {
//       id: 1,
//       destroy: jest.fn().mockResolvedValue()
//     };

//     categories.findByPk.mockResolvedValue(mockCategory);

//     const response = await request(app)
//       .delete("/delete-category/1")
//       .set("Authorization", `Bearer dummyToken`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("message", "Category deleted successfully");
//     expect(mockCategory.destroy).toHaveBeenCalled();
//   });

//   it("should return 404 if category not found", async () => {
//     categories.findByPk.mockResolvedValue(null);

//     const response = await request(app)
//       .delete("/delete-category/999")
//       .set("Authorization", `Bearer dummyToken`);

//     expect(response.statusCode).toBe(404);
//     expect(response.body).toHaveProperty("message", "Category not found");
//   });

//   it("should return 500 if server error occurs", async () => {
//     categories.findByPk.mockRejectedValue(new Error("Database error"));

//     const response = await request(app)
//       .delete("/delete-category/1")
//       .set("Authorization", `Bearer dummyToken`);

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("error", "Internal server error");
//   });

// });

//get all course category testing.......................................................
// const express = require("express");
// const request = require("supertest");


// jest.mock("../model", () => ({
//   categories: {
//     findAll: jest.fn(),
//   },
// }));

// const { categories } = require("../model");
// const { getAllCourseCategories } = require("../controllers/admin/courseController"); 

// const app = express();
// app.use(express.json());
// app.get("/get-all-category", getAllCourseCategories);

// describe("GET /get-all-category", () => {

//   it("should return 200 and list of categories", async () => {
//     const mockCategories = [
//       { id: 1, categoryName: "Technology" },
//       { id: 2, categoryName: "Science" },
//     ];

//     categories.findAll.mockResolvedValue(mockCategories);

//     const response = await request(app)
//       .get("/get-all-category");

//     expect(response.statusCode).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body.length).toBe(2);
//     expect(response.body[0]).toHaveProperty("categoryName", "Technology");
//   });

//   it("should return 500 if server error occurs", async () => {
//     categories.findAll.mockRejectedValue(new Error("Database error"));

//     const response = await request(app)
//       .get("/get-all-category");

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("error", "Internal server error");
//   });

// });

//addcoursechapter testing...................

// const express = require("express");
// const request = require("supertest");
// const path = require("path");

// jest.mock("../model", () => ({
//   chapters: {
//     create: jest.fn(),
//   },
// }));

// jest.mock("../middleware/isAuthenticated", () => ({
//   isAuthenticated: (req, res, next) => {
//     req.userId = 1;
//     next();
//   },
// }));

// jest.mock("../middleware/restrictTo", () => () => (req, res, next) => {
//   next();
// });

// const { chapters } = require("../model");
// const { addCourseChapter } = require("../controllers/admin/courseController");

// const app = express();
// app.use(express.json());
// app.post(
//   "/add-chapter/:id",
//   require("../middleware/isAuthenticated").isAuthenticated,
//   require("../middleware/restrictTo")("teacher"),
//   (req, res, next) => {
    
//     req.file = {
//       path: "uploads/test-video.mp4",
//     };
//     next();
//   },
//   addCourseChapter
// );

// describe("POST /add-chapter/:id", () => {

//   it("should return 200 and success message when chapter is created", async () => {
//     chapters.create.mockResolvedValue({});

//     const response = await request(app)
//       .post("/add-chapter/1")
//       .set("Authorization", `Bearer dummyToken`)
//       .field("chapterTitle", "Introduction to Testing")
//       .field("chapterDescription", "This is a test description")
//       .field("chapterStatus", "published")
//       .field("chapterType", "video");

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("message", "Chapter created successfully");
//     expect(chapters.create).toHaveBeenCalled();
//   });

//   it("should return 500 if server error occurs", async () => {
//     chapters.create.mockRejectedValue(new Error("Database error"));

//     const response = await request(app)
//       .post("/add-chapter/1")
//       .set("Authorization", `Bearer dummyToken`)
//       .field("chapterTitle", "Introduction to Testing")
//       .field("chapterDescription", "This is a test description")
//       .field("chapterStatus", "published")
//       .field("chapterType", "video");

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("message", "Failed to create chapter");
//   });

// });

//ADD COMMENT TESTING................
// const express = require("express");
// const request = require("supertest");


// jest.mock("../model", () => ({
//   review: {
//     create: jest.fn(),
//   },
// }));


// jest.mock("../middleware/isAuthenticated", () => ({
//   isAuthenticated: (req, res, next) => {
//     req.userId = 1; 
//     next();
//   },
// }));

// jest.mock("../middleware/restrictTo", () => () => (req, res, next) => {
//   next();
// });

// const { review } = require("../model");
// const { addComment } = require("../controllers/admin/courseController"); 


// const app = express();
// app.use(express.json());
// app.post(
//   "/add-comment/:id",
//   require("../middleware/isAuthenticated").isAuthenticated,
//   addComment
// );

// describe("POST /add-comment/:id", () => {

//   it("should return 200 and success message when comment is added", async () => {
//     review.create.mockResolvedValue({});

//     const response = await request(app)
//       .post("/add-comment/1")
//       .set("Authorization", `Bearer dummyToken`)
//       .send({
//         comment: "Great course!",
//         rating: 5,
//       });

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("message", "Comment added successfully");
//     expect(review.create).toHaveBeenCalledWith({
//       comment: "Great course!",
//       rating: 5,
//       courseId: "1",
//       userId: 1,
//       isVerified: false,
//     });
//   });

//   it("should return 500 if server error occurs", async () => {
//     review.create.mockRejectedValue(new Error("Database error"));

//     const response = await request(app)
//       .post("/add-comment/1")
//       .set("Authorization", `Bearer dummyToken`)
//       .send({
//         comment: "Good one!",
//         rating: 4,
//       });

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("message", "Failed to add comment");
//   });

// });

//get comment testing.....................................................................................
// const express = require("express");
// const request = require("supertest");

// jest.mock("../model", () => ({
//   review: {
//     findAll: jest.fn(),
//   },
// }));

// jest.mock("../middleware/isAuthenticated", () => ({
//   isAuthenticated: (req, res, next) => {
//     req.userId = 1; 
//     next();
//   },
// }));

// jest.mock("../middleware/restrictTo", () => () => (req, res, next) => {
//   next();
// });

// const { review } = require("../model");
// const { getAllComments } = require("../controllers/admin/courseController"); 

// const app = express();
// app.use(express.json());
// app.get(
//   "/get-comment/:id",
//   require("../middleware/isAuthenticated").isAuthenticated,
//   getAllComments
// );

// describe("GET /get-comment/:id", () => {

//   it("should return 200 and list of comments", async () => {
//     const mockComments = [
//       {
//         id: 1,
//         comment: "Great course!",
//         rating: 5,
//         userId: 1,
//         user: {
//           id: 1,
//           firstName: "John",
//           lastName: "Doe",
//           profile: {
//             id: 1,
//             bio: "Software Engineer"
//           }
//         }
//       }
//     ];

//     review.findAll.mockResolvedValue(mockComments);

//     const response = await request(app)
//       .get("/get-comment/1")
//       .set("Authorization", `Bearer dummyToken`);

//     expect(response.statusCode).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body[0]).toHaveProperty("comment", "Great course!");
//     expect(response.body[0]).toHaveProperty("user");
//     expect(response.body[0].user).toHaveProperty("profile");
//   });

//   it("should return 500 if server error occurs", async () => {
//     review.findAll.mockRejectedValue(new Error("Database error"));

//     const response = await request(app)
//       .get("/get-comment/1")
//       .set("Authorization", `Bearer dummyToken`);

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("message", "Database error");
//   });

// });

//getallcoursetesting ..........................................................................................

// const express = require("express");
// const request = require("supertest");

// jest.mock("../model", () => ({
//   courses: {
//     findAll: jest.fn(),
//   },
// }));

// const { courses } = require("../model");
// const { getAllCourses } = require("../controllers/admin/courseController"); 

// const app = express();
// app.use(express.json());
// app.get("/courses", getAllCourses);

// describe("GET /courses", () => {

//   it("should return 200 and list of verified courses", async () => {
//     const mockCourses = [
//       {
//         id: 1,
//         title: "Web Development",
//         isVerified: true,
//         categoryId: 2,
//         category: {
//           id: 2,
//           categoryName: "Technology",
//         }
//       }
//     ];

//     courses.findAll.mockResolvedValue(mockCourses);

//     const response = await request(app)
//       .get("/courses");

//     expect(response.statusCode).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body[0]).toHaveProperty("title", "Web Development");
//     expect(response.body[0]).toHaveProperty("category");
//     expect(response.body[0].category).toHaveProperty("categoryName", "Technology");
//   });

//   it("should return 500 if server error occurs", async () => {
//     courses.findAll.mockRejectedValue(new Error("Database error"));

//     const response = await request(app)
//       .get("/courses");

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("message", "Database error");
//   });

// });

//Getteachercourse testing.......................................................................................

// const express = require("express");
// const request = require("supertest");

// jest.mock("../model", () => ({
//   courses: {
//     findAll: jest.fn(),
//   },
// }));

// jest.mock("../middleware/isAuthenticated", () => ({
//   isAuthenticated: (req, res, next) => {
//     req.userId = 10; 
//     next();
//   },
// }));

// jest.mock("../middleware/restrictTo", () => () => (req, res, next) => {
//   next();
// });

// const { courses } = require("../model");
// const { getTeacherCourses } = require("../controllers/admin/courseController"); // Adjust if needed


// const app = express();
// app.use(express.json());
// app.get(
//   "/get-course",
//   require("../middleware/isAuthenticated").isAuthenticated,
//   getTeacherCourses
// );

// describe("GET /get-course", () => {

//   it("should return 200 and list of teacher's courses", async () => {
//     const mockCourses = [
//       {
//         id: 1,
//         title: "JavaScript Basics",
//         userId: 10
//       },
//       {
//         id: 2,
//         title: "Advanced Node.js",
//         userId: 10
//       }
//     ];

//     courses.findAll.mockResolvedValue(mockCourses);

//     const response = await request(app)
//       .get("/get-course")
//       .set("Authorization", `Bearer dummyToken`);

//     expect(response.statusCode).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body[0]).toHaveProperty("title", "JavaScript Basics");
//     expect(response.body[0]).toHaveProperty("userId", 10);
//   });

//   it("should return 500 if server error occurs", async () => {
//     courses.findAll.mockRejectedValue(new Error("Database error"));

//     const response = await request(app)
//       .get("/get-course")
//       .set("Authorization", `Bearer dummyToken`);

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("message", "Database error");
//   });

// });

//update course testing...............................................

// const express = require("express");
// const request = require("supertest");

// jest.mock("../model", () => ({
//   courses: {
//     update: jest.fn(),
//   },
// }));


// jest.mock("../middleware/isAuthenticated", () => ({
//   isAuthenticated: (req, res, next) => {
//     req.userId = 1;
//     next();
//   },
// }));

// jest.mock("../middleware/restrictTo", () => () => (req, res, next) => {
//   next();
// });

// const { courses } = require("../model");
// const { updateCourse } = require("../controllers/admin/courseController");


// const app = express();
// app.use(express.json());
// app.patch(
//   "/update-course/:id",
//   require("../middleware/isAuthenticated").isAuthenticated,
//   require("../middleware/restrictTo")("teacher"),
//   (req, res, next) => {
    
//     req.file = {
//       path: "uploads/test-image.png",
//     };
//     next();
//   },
//   updateCourse
// );

// describe("PATCH /update-course/:id", () => {

//   it("should return 200 and success message when course is updated", async () => {
//     courses.update.mockResolvedValue([1]); 

//     const response = await request(app)
//       .patch("/update-course/1")
//       .set("Authorization", `Bearer dummyToken`)
//       .send({
//         courseName: "Updated Course",
//         courseDescription: "Updated Description",
//         coursePrice: 100,
//         courseCategoryId: 2
//       });

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("message", "Course updated successfully");
//   });

//   it("should return 404 if course not found", async () => {
//     courses.update.mockResolvedValue([0]); 

//     const response = await request(app)
//       .patch("/update-course/999")
//       .set("Authorization", `Bearer dummyToken`)
//       .send({
//         courseName: "Non-existing Course",
//         courseDescription: "Does not exist",
//         coursePrice: 100,
//         courseCategoryId: 2
//       });

//     expect(response.statusCode).toBe(404);
//     expect(response.body).toHaveProperty("message", "courses not found");
//   });

//   it("should return 500 if server error occurs", async () => {
//     courses.update.mockRejectedValue(new Error("Database error"));

//     const response = await request(app)
//       .patch("/update-course/1")
//       .set("Authorization", `Bearer dummyToken`)
//       .send({
//         courseName: "Some Course",
//         courseDescription: "Some Description",
//         coursePrice: 100,
//         courseCategoryId: 2
//       });

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("message", "Database error");
//   });

// });

//delete course testing ...................................................................

// const express = require("express");
// const request = require("supertest");

// jest.mock("../model", () => ({
//   courses: {
//     destroy: jest.fn(),
//   },
// }));

// jest.mock("../middleware/isAuthenticated", () => ({
//   isAuthenticated: (req, res, next) => {
//     req.userId = 1;
//     next();
//   },
// }));

// jest.mock("../middleware/restrictTo", () => () => (req, res, next) => {
//   next();
// });

// const { courses } = require("../model");
// const { deleteCourse } = require("../controllers/admin/courseController"); // Adjust if needed

// const app = express();
// app.use(express.json());
// app.delete(
//   "/delete-course/:id",
//   require("../middleware/isAuthenticated").isAuthenticated,
//   require("../middleware/restrictTo")("teacher"),
//   deleteCourse
// );

// describe("DELETE /delete-course/:id", () => {

//   it("should return 200 and success message when course is deleted", async () => {
//     courses.destroy.mockResolvedValue(1); 

//     const response = await request(app)
//       .delete("/delete-course/1")
//       .set("Authorization", `Bearer dummyToken`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty("message", "course deleted successfully");
//   });

//   it("should return 404 if course not found", async () => {
//     courses.destroy.mockResolvedValue(0);

//     const response = await request(app)
//       .delete("/delete-course/999")
//       .set("Authorization", `Bearer dummyToken`);

//     expect(response.statusCode).toBe(404);
//     expect(response.body).toHaveProperty("message", "Course not found");
//   });

//   it("should return 500 if server error occurs", async () => {
//     courses.destroy.mockRejectedValue(new Error("Database error"));

//     const response = await request(app)
//       .delete("/delete-course/1")
//       .set("Authorization", `Bearer dummyToken`);

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("message", "Database error");
//   });
// });


// //enrollment testing ..............................
// const express = require("express");
// const request = require("supertest");
// const jwt = require("jsonwebtoken");

// // Correct mocking
// jest.mock("../model", () => {
//   const mockEnroll = jest.fn();
//   mockEnroll.prototype.save = jest.fn();
//   return {
//     enroll: mockEnroll,
//     users: {
//       findOne: jest.fn(),
//     },
//   };
// });

// jest.mock("../middleware/isAuthenticated", () => ({
//   isAuthenticated: (req, res, next) => {
//     req.userId = 1;
//     next();
//   },
// }));

// jest.mock("../middleware/restrictTo", () => () => (req, res, next) => {
//   next();
// });

// jest.mock("jsonwebtoken", () => ({
//   verify: jest.fn(),
// }));

// const { enroll, users } = require("../model");
// const { enrollment } = require("../controllers/admin/courseController");

// const app = express();
// app.use(express.json());
// app.get(
//   "/enroll/:id",
//   require("../middleware/isAuthenticated").isAuthenticated,
//   enrollment
// );

// describe("GET /enroll/:id", () => {

//   it("should return 201 when enrollment is successful", async () => {
//     jwt.verify.mockReturnValue({ id: "user@example.com" });
//     enroll.findOne = jest.fn().mockResolvedValue(null);
//     enroll.prototype.save.mockResolvedValue();
//     users.findOne.mockResolvedValue({ id: "user@example.com", name: "John Doe" });

//     const response = await request(app)
//       .get("/enroll/1")
//       .set("Authorization", "Bearer validToken");

//     expect(response.statusCode).toBe(201);
//     expect(response.body).toHaveProperty("message", "Enrollment successful");
//     expect(response.body).toHaveProperty("enrollment");
//     expect(response.body).toHaveProperty("user");
//   });

//   it("should return 400 if user already enrolled", async () => {
//     jwt.verify.mockReturnValue({ id: "user@example.com" });
//     enroll.findOne = jest.fn().mockResolvedValue({ id: 1 });

//     const response = await request(app)
//       .get("/enroll/1")
//       .set("Authorization", "Bearer validToken");

//     expect(response.statusCode).toBe(400);
//     expect(response.body).toHaveProperty("message", "User is already enrolled in the course");
//   });

//   it("should return 401 if authorization token is missing", async () => {
//     const response = await request(app)
//       .get("/enroll/1");

//     expect(response.statusCode).toBe(401);
//     expect(response.body).toHaveProperty("error", "Authorization token is missing");
//   });

//   it("should return 500 if server error occurs", async () => {
//     jwt.verify.mockImplementation(() => { throw new Error("JWT error"); });

//     const response = await request(app)
//       .get("/enroll/1")
//       .set("Authorization", "Bearer invalidToken");

//     expect(response.statusCode).toBe(500);
//     expect(response.body).toHaveProperty("error", "Internal server error");
//   });

// });

