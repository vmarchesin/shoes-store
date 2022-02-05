// import NextConnect from "next-connect";
// import middleware from "../../middleware/database";

// const cartlist = NextConnect();
// cartlist.use(middleware)

// /* Get */
// cartlist.get(async (req, res) => {
//   const email = req.query.email
//   let doc = await req.db.collection('cart').find({email}).toArray()

//   if (doc === null) {
//     let insert = await req.db.collection('cart').insertOne({ email, cartlist: [] })
//     res.json(insert)
//   } else {
//     res.json(doc)
//   }

// });

// /* Post */
// cartlist.post(async (req, res) => {
//   try {
//     let shoe = req.body
//     shoe = JSON.parse(shoe)
//     let email = shoe.email
//     delete shoe.email

//     if (shoe?.exist === true) {
//       // si existe sobreescribe la cantidad a la nueva que se le pasa
//       let doc = await req.db.collection('cart').update({ email, "cartlist.id": shoe.id }, {$set:{"cartlist.$.quantity":shoe.quantity}})
//       res.json(doc)
//     } else {
//       // no existe en el cartlist
//       if (shoe.isNew) {
//         let insert = await req.db.collection('cart').insertOne({ email, cartlist: [] })
//       }
//       let doc = await req.db.collection('cart').update({ email }, {$push: {cartlist: shoe}})
//       res.json(doc)
//     }
    
//   } catch (error) {
//     console.log(error)
//   }
// })

// cartlist.put(async (req, res) => {
//   try {
//     // Recibimos el email
//     let data = req.body

//     let doc = await req.db.collection('cart').update({ email: data }, { $set: { cartlist: [] } })
//     res.json(doc)

//   } catch (error) {
//     console.log(error.response)
//   }
// })

// /* Delete */
// cartlist.delete(async (req, res) => {
//   try {
//     let data = req.body
//     data = JSON.parse(data)
//     let shoeId = data.id
//     let email = data.email
    
//     let doc = await req.db.collection('cart').update({ email, "cartlist.id": shoeId }, { $pull: { cartlist: { id:shoeId }}})
//     res.json(doc)
    
//   } catch (error) {
//     console.log(error)
//   }
// })

// export default cartlist;