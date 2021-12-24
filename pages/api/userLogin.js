import NextConnect from "next-connect";
import middleware from "../../middleware/database";


const user = NextConnect()
user.use(middleware)

/* Get */
user.get(async (req, res) => {
  console.log('req', req);
  const email = req.query.email
  console.log('email', email);

  let doc = await req.db.collection('users').findOne({email})
  if (doc === null) {
    res.json({ exist: false })
  } else {
    res.json(doc)
  }
  
})

/* Post */
user.post(async (req, res) => {
  try {
    let data = req.body
    data = JSON.parse(data)

    let doc = await req.db.collection('users').insertOne(data)
    res.json(doc)

  } catch (error) {
    console.log(error.response)
  }
})

export default user;