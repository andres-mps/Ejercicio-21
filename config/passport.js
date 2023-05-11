const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

function passportConfig() {
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
        return done(null, false, {
          message: "Ocurrió un error inesperado. Por favor, reintentar.",
        });
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
}

module.exports = { passport, passportConfig };
