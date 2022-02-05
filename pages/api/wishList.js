// import NextConnect from "next-connect";
// import middleware from "../../middleware/database";

// const wishlist = NextConnect();
// wishlist.use(middleware)

// /* Get */
// wishlist.get(async (req, res) => {
//   const email = req.query.email
//   let doc = await req.db.collection('wishlist').findOne({ email })

//   if (doc !== null) {
//     res.json(doc);
//   } else {
//     res.json({
//       email,
//       wishlist:[]
//     })
//   }
// });

// /* Post */
// wishlist.post(async (req, res) => {
//   try {    
//     let shoe = req.body
//     shoe = JSON.parse(shoe)
//     let email = shoe.email
//     delete shoe.email
    
//     if (shoe.price === undefined) {
//       let doc = await req.db.collection('wishlist').update({ email }, {$pull: {wishlist: {id: shoe.id}}})
//       res.json(doc)
//     } else {
//       let doc = await req.db.collection('wishlist').update({ email }, {$push: {wishlist: shoe}})
//       if (doc.result.nModified === 0) {
//         let insert = await req.db.collection('wishlist').insertOne({ email, wishlist: [shoe] })
//         res.json(insert)
//       } else {
//         res.json(doc)
//       }
//     }

//   } catch (error) {
//     console.log(error)
//   }
// })


// /* Delete */
// wishlist.delete(async (req, res) => {
//   try {
//     let data = JSON.parse(req.body)
//     const {id, email} = data
    
//     let doc = await req.db.collection('wishlist').update({ email}, { $pull: { wishlist: { id }}})
//     res.json(doc)

//   } catch (error) {
//     console.log(error.response)
//   }
// })

// export default wishlist;