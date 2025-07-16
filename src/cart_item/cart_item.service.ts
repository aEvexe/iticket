import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItem, CartItemDocument } from './schemas/cart_item.schema';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';


@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem.name) private cartItemModel: Model<CartItemDocument>
  ) {}

  create(createCartItemDto: CreateCartItemDto) {
    return this.cartItemModel.create(createCartItemDto);
  }

  findAll() {
    return this.cartItemModel.find().populate(['ticket_id', 'cart_id']);
  }

  async findOne(id: string) {
    const item = await this.cartItemModel.findById(id).populate(['ticket_id', 'cart_id']);
    if (!item) throw new NotFoundException('Cart item not found');
    return item;
  }

  async update(id: string, updateDto: UpdateCartItemDto) {
    const updated = await this.cartItemModel.findByIdAndUpdate(id, updateDto, { new: true });
    if (!updated) throw new NotFoundException('Cart item not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.cartItemModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Cart item not found');
    return { message: 'Deleted successfully' };
  }
}
