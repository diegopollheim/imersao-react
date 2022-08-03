import db from "../../../src/lib/supaBaseConfig";

export default async function Logout(req, res) {
  const {error} = await db.auth.signOut();

  if (error) {
    res.status(505).json(error);
  }
  res.status(200).json({status: "success"});
}
