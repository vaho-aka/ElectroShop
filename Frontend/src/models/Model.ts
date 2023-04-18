export class Item {
  _id: string;
  name: string;
  price: string;
  description: string;
  brand: string;
  category: string;
  countInStock: number;
  imageUrl: string;

  constructor(
    id: string,
    name: string,
    price: string,
    description: string,
    brand: string,
    category: string,
    countInStock: number,
    imageUrl: string
  ) {
    this._id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.countInStock = countInStock;
    this.imageUrl = imageUrl;
    this.brand = brand;
  }
}

export class CartItem extends Item {
  amount: number;

  constructor(item: Item, amount: number) {
    const {
      _id,
      name,
      price,
      description,
      category,
      countInStock,
      imageUrl,
      brand,
    } = item;

    super(
      _id,
      name,
      price,
      description,
      brand,
      category,
      countInStock,
      imageUrl
    );
    this.amount = amount;
  }
}
