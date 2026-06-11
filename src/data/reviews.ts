export interface Review {
  text: string;
  author: string;
  rating: number;
}

export const reviews: Review[] = [
  {
    text: "Uno de los mejores restaurantes en los que he comido. El steak tartar en tuétano es espectacular y el arroz de carabinero, de escándalo. Volveremos sin duda.",
    author: "María G.",
    rating: 5,
  },
  {
    text: "El trato es exquisito y la comida está a un nivel altísimo. El ambiente es acogedor y elegante justo lo que se busca para una velada especial.",
    author: "Carlos M.",
    rating: 5,
  },
  {
    text: "Descubrimiento increíble en Mairena. Producto de primera, cocina cuidada y un servicio que te hace sentir como en casa. El solomillo Wellington, de los mejores que he probado.",
    author: "Ana R.",
    rating: 5,
  },
  {
    text: "Repetimos cada vez que podemos. Los arroces son una pasada y el tartar de atún rojo es difícil de superar. Un lujo tener esto en el Aljarafe.",
    author: "Javier L.",
    rating: 5,
  },
  {
    text: "Celebramos nuestro aniversario y fue una experiencia maravillosa. Cada plato está cuidado al detalle, se nota el trabajo y la pasión que hay detrás.",
    author: "Laura S.",
    rating: 5,
  },
  {
    text: "Impresionante la presa ibérica con puré de boniato ahumado. Combinación de sabores perfecta. El personal es muy atento y sabe recomendar.",
    author: "David P.",
    rating: 5,
  },
];
