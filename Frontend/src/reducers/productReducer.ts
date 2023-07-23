import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Item } from '../interface/interfaces';

const productsData = [
  {
    _id: 'p1',
    name: 'Roccat Vulcan 121',
    price: '129 000',
    description:
      'Clavier de Jeu Noir, gaming mécanique RGB, Rétro-Éclarage LED Aimo Multicolore touche par touche, Switchs Titan Linear, Conception Durable (Plaque Supérieure en aluminium)',
    brand: 'Roccat',
    category: 'Clavier',
    countInStock: 7,
    imageUrl: '/images/Keyboard_Roccat.png',
  },
  {
    _id: 'p2',
    name: 'OnePlus 11',
    price: '1 259 000',
    description:
      'OnePlus 11 5G 16 Go de RAM 256 Go de Stockage, smartphone sans carte SIM avec Appareil photo Hasselblad de 3ème génération pour mobile - Garantie Fabricant de 2 ans - Titan Black',
    brand: 'OnePlus',
    category: 'Smartphone',
    countInStock: 5,
    imageUrl: '/images/Smartphone_OnePlus.png',
  },
  {
    _id: 'p3',
    name: 'Razer DeathAdder Essential',
    price: '75 000',
    description:
      'Souris de Jeu Essentielle avec capteur Optique 6 400 DPI (Capteur Optique 6 400 DPI réels, boîtier Ergonomique, Extra-résistant) Noir',
    brand: 'Razer',
    category: 'Accessoires informatiques',
    countInStock: 5,
    imageUrl: '/images/Mouse_Razer.png',
  },
  {
    _id: 'p4',
    name: 'Xiaomi Smart Band 7',
    price: '220 000',
    description:
      "Xiaomi Smart Band 7 Noir tracker d'activité sport, suivi santé, 110 modes d'exercices, 14 jours d'autonomie, 100 cadrans, version française ",
    brand: 'Xiaomi',
    category: 'Smartwatch',
    countInStock: 6,
    imageUrl: '/images/Smartwatch_xiaomi.png',
  },
  {
    _id: 'p5',
    name: 'Dell Xps 13 9315',
    price: '2 550 000',
    description: `Dell Xps 13 9315 Intel Core Evo i7-1250U Ordinateur Portable 13.4" Full HD+ Sky 16 Go de RAM SSD 512 Go ADL-P P28 UMA Iris Windows 11 Home Plus Clavier AZERTY Français rétroéclairé`,
    brand: 'Dell',
    category: 'Ordinateur',
    countInStock: 1,
    imageUrl: '/images/Computer_Dell.png',
  },
  {
    _id: 'p6',
    name: 'ASUS Chromebook',
    price: '1 450 000',
    description: `ASUS Chromebook C433TA-AJ0016 Ordinateur Portable Tactile et Convertible 14" FHD (M3 8100Y, RAM 4 Go, 64 Go eMMC, Chrome OS) Clavier AZERTY Français Argent`,
    brand: 'Assus',
    category: 'Ordinateur',
    countInStock: 4,
    imageUrl: '/images/Computer_Assus.png',
  },
];

interface ProductState {
  products: Array<Item>;
  loading: boolean;
  error: string;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: '',
};

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    GET_PRODUCT_REQUEST(state) {
      state.loading = true;
    },
    GET_PRODUCT_SUCCESS(state, action: PayloadAction<Item[]>) {
      state.loading = false;
      state.products = action.payload;
      state.error = '';
    },
    GET_PRODUCT_FAIL(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productActions = productReducer.actions;
export default productReducer.reducer;
