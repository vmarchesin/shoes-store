import { SHOES_DATA } from "../data/shoesData"

export const addDataShoe = (data) => {
  let newOrder = SHOES_DATA
  let newOrderFilter = []

  for (let index = 0; index < SHOES_DATA.length; index++) {
    for (let z = 0; z < data.length; z++) {
      if (SHOES_DATA[index].id === data[z].id) {
        newOrder[index].quantity = data[z].quantity
      }
    }
  }
  newOrderFilter = newOrder.filter(item => {
    if (item.quantity !== undefined) {
      return item
    }
  })
}