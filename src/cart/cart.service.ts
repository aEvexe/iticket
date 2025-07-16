import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>
  ) {}

  create(createCartDto: CreateCartDto) {
    return this.cartModel.create(createCartDto);
  }

  findAll() {
    return this.cartModel.find();
  }

  async findOne(id: string) {
    const cart = await this.cartModel.findById(id);
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.cartModel.findByIdAndUpdate(id, updateCartDto, {
      new: true,
    });
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async remove(id: string) {
    const cart = await this.cartModel.findByIdAndDelete(id);
    if (!cart) throw new NotFoundException('Cart not found');
    return `Cart ${id} deleted`;
  }
}
