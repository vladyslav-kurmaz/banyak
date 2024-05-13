export const mapItemsToObjects = (itemsArray: string[]) => {
  return itemsArray.map((item) => ({
    name: item,
  }))
}
