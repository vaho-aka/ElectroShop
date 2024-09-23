import React from 'react';
import { Item } from '../interface/interfaces';

const CarouselItem: React.FC<{ item: Item }> = ({ item }) => {
  return <div>{item.name}</div>;
};

export default CarouselItem;
