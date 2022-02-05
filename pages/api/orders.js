// import NextConnect from "next-connect";
// import middleware from "../../middleware/database";

// const orders = NextConnect()
// orders.use(middleware)

// /* Get */
// orders.get(async (req, res) => {
//   try {
//     const email = req.query.email
//     let doc = await req.db.collection('orders').find({email}).toArray();
//     res.json(doc)
//   } catch (error) {
//     console.log(error.response)
//   }
// })

// /* Post */
// orders.post(async (req, res) => {
//   try {
//     let order = req.body
//     order = JSON.parse(order)

//     let email = order.email
//     delete order.email

//     let doc = await req.db.collection('orders').insertOne({email, order})
//     res.json(doc)
//   } catch {
//     console.log(error.response)
//   }
// })

// export default orders;