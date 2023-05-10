const models = require("./models");
require("dotenv").config();
const { User } = require("./models");
const express = require("express");
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;
const routes = require("./routes/routes.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

/*======================== MODULOS AUTENTICACIÓN: ==================================*/
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "milanesa",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

// passport.use(
//   new LocalStrategy({ usernameField: "email" }, async function (
//     email,
//     password,
//     done
//   ) => {
//     try {
//       const user = await User.findOne({ where: { email: email } });
//       if (!user) {
//         console.log("Nombre de usuario no existe.");
//         return done(null, false, { message: "Credenciales incorrectas." });
//       }
//       //const match = await bcrypt.compare(password, user.password);
//       if (password !== user.password) {
//         console.log("La contraseña es inválida.");
//         return done(null, false, { message: "Credenciales incorrectas." });
//       }
//       console.log("Credenciales verificadas correctamente");
//       return done(null, user);
//     } catch (error) {
//       console.log(error);
//       return done(error);
//     }
//   }));

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        console.log("El usuario no existe.");
        return done(null, false, { message: "Credenciales incorrectas." });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("La contraseña es inválida.");
        return done(null, false, { message: "Credenciales incorrectas." });
      }

      console.log("Credenciales verificadas correctamente");
      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user); // Usuario queda disponible en req.user.
  } catch (err) {
    done(err);
  }
});

app.get("/login", (req, res) => res.render("login"));

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "back",
    failureRedirect: "/login",
  })
);
// app.post("/login", (req, res, next) => {
//   passport.authenticate("local", (error, usuario, info) => {
//     if (error) {
//       return next(error);
//     }
//     if (!usuario) {
//       return res.redirect("/login");
//     }
//     req.logIn(usuario, (error) => {
//       if (error) {
//         return next(error);
//       }
//       req.session.save(() => {
//         res.redirect(req.session.returnTo || "/");
//       });
//     });
//   })(req, res, next);
// });

app.get("/register", (req, res) => res.render("register"));

app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const [user, created] = await User.findOrCreate({
    where: { email: email },
    defaults: {
      firstname,
      lastname,
      email,
      password: await bcrypt.hash(password, 5),
    },
  });
  if (created) {
    req.login(user, () => res.redirect("/login"));
  } else {
    res.redirect("back");
  }
});

/*======================== MODULOS AUTENTICACIÓN: ==================================*/

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(routes);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
