import db from "../../../src/lib/supaBaseConfig";

export default async function Register(req, res) {
  const {user, error} = await db.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  });

  if (error) {
    res.status(505).json(error);
  }
  res.status(201).json(user);
}
