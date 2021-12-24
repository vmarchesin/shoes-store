import NextConnect from "next-connect";
import middleware from "../../middleware/database";


const bestSellers = NextConnect()
bestSellers.use(middleware)

/* Get */
bestSellers.get(async (req, res) => {
  let doc = await req.db.collection('bestSellers').find().sort( {quantity: -1}).toArray()
  doc.length = 5
  res.json(doc)
})

/* Post */
bestSellers.post(async (req, res) => {
  try {
    let order = req.body
    order = JSON.parse(order)

    let doc = req.db.collection('bestSellers').update({ id: order.id }, { $inc: { "quantity": order.quantity }})
    res.json(doc)

  } catch (error) {
    console.log(error.response)
  }
})

export default bestSellers;