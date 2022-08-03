import db from "../../../src/lib/supaBaseConfig";

export default async function Login(req, res) {
  const {user, error} = await db.auth.signIn({
    email: req.body.email,
    password: req.body.password,
  });

  if (error) {
    res.status(505).json(error);
  }

  res.status(200).json(user);
}
