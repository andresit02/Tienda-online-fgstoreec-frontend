import { tr } from "framer-motion/client";

export const INVENTARIO_ACCESORIOS = [
  {
    id: 1,
    nombre: "RELOJ CASIO PARA HOMBRE MTP-V005L-7B5",
    precio: 45,
    categoria: "Relojes", // Esto actuará como el filtro "Tipo"
    stock: 1,
    destacado: true,
    imagenes: {
      principal: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769328057/imgi_4_image_clr4nt.png",
      galeria: []
    },
    descripcion: "Reloj CASIO totalmente nuevo y original",
    caracteristicas: [
      "Acero inoxidable",  
      "Tamaño de la caja: 47 × 40 × 8.1 mm", 
      "Correa de cuero",
      "Duración aproximada de la batería: 3 años",
      "Resistente al agua"
    ]
  },
  {
    id: 2,
    nombre: "RELOJ CASIO PARA HOMBRE MTP-V005L-7B5",
    precio: 45,
    categoria: "Relojes",
    stock: 2,
    destacado: true,
    imagenes: {
      principal: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769328064/imgi_22_MTP-V005L-7B-1_ki3fkh.png",
      galeria: []
    },
    descripcion: "Reloj CASIO totalmente nuevo y original",
    caracteristicas: [
      "Acero inoxidable",  
      "Tamaño de la caja: 47 × 40 × 8.1 mm", 
      "Correa de cuero",
      "Duración aproximada de la batería: 3 años",
      "Resistente al agua"
    ]
  },
  {
    id: 3,
    nombre: "GUANTES DE MOTOCICLETA",
    precio: 15.00,
    categoria: "Guantes",
    stock: 0, // Agotado para probar filtro
    destacado: false,
    imagenes: {
      principal: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325409/imgi_83_store_01JPB7BHTY6WKC6WA5QMHVK4B6_assets_1742786088251-sf63ee134f31e41ecbae2d8605ec404e3t.jpg_960x960q75.jpg__fe5y2x.jpg",
      galeria: [
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325416/imgi_103_store_01JPB7BHTY6WKC6WA5QMHVK4B6_assets_1743273391509-373e9133-62ad-4fe7-9dfb-9a5c2fb71b8d_vflwjz.jpg",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325418/imgi_104_store_01JPB7BHTY6WKC6WA5QMHVK4B6_assets_1743273391510-f492fd02-f038-4617-be98-e61a3d1675cd_g2at57.jpg",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325413/imgi_105_store_01JPB7BHTY6WKC6WA5QMHVK4B6_assets_1743273391508-ced2bf94-4799-47fb-bb19-0343cd31e4a8_rb20ab.jpg",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325413/imgi_106_store_01JPB7BHTY6WKC6WA5QMHVK4B6_assets_1743273391507-7b553fa9-3e0e-4b79-a017-3387510714d5_djgmwj.jpg",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325409/imgi_107_store_01JPB7BHTY6WKC6WA5QMHVK4B6_assets_1743273391509-3b549dd8-842b-4cc1-adf4-2e228e92b914_g1mqfp.jpg"
      ]
    },
    descripcion: "Guantes de motocicleta con diseño plegable y protecciones.",
    caracteristicas: [
      "Poliester + Nylon + Esponja ",
      "Diseño plegable con protecciones",
      "Ajustable a la muñeca ",
      "Antideslizantes"
    ]
  },

  {
    id: 4,
    nombre: "LLAVERO BIKER",
    precio: 4,
    categoria: "Llaveros",
    stock: 0, // Agotado para probar filtro
    destacado: false,
    imagenes: {
      principal: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325425/imgi_86_store_01JPB7BHTY6WKC6WA5QMHVK4B6_assets_1742780072708-whatsappimage2025-03-08at4.41.42pm1_bj8of9.jpg",
      galeria: []
    },
    descripcion: "Mensaje: Conduce con cuidado, recuerda que te necesito aquí conmigo. Te amo ❤️",
    caracteristicas: []
  },

  {
    id: 5,
    nombre: "CAMPANA BIKER",
    precio: 4,
    categoria: "Llaveros",
    stock: 0, // Agotado para probar filtro
    destacado: false,
    imagenes: {
      principal: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325424/imgi_85_store_01JPB7BHTY6WKC6WA5QMHVK4B6_assets_1742781408060-whatsappimage2025-03-08at5.10.29pm_tebjms.jpg",
      galeria: []
    },
    descripcion: "Instala una Campana Biker en tu motocicleta y ahuyenta a los espíritus malos, atrapa la mala suerte y los problemas mecánicos",
    caracteristicas: []
  },

  {
    id: 6,
    nombre: "LLAVERO BIKER",
    precio: 4,
    categoria: "Llaveros",
    stock: 0, // Agotado para probar filtro
    destacado: false,
    imagenes: {
      principal: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325698/imgi_43_store_01JPB7BHTY6WKC6WA5QMHVK4B6_2Fassets_2F1745338659602-9fc58f43-9852-4dd2-8820-064ee263f3e8_xzpcla.png",
      galeria: [
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325659/imgi_103_store_01JPB7BHTY6WKC6WA5QMHVK4B6_2Fassets_2F1745338659602-96f9fc31-b8e8-4445-8d34-9d65c4afbea0_ww2osz.png",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325700/imgi_102_store_01JPB7BHTY6WKC6WA5QMHVK4B6_2Fassets_2F1745338659601-716e04a0-9fa6-4dae-9453-11604901970c_smydtk.png",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325656/imgi_104_store_01JPB7BHTY6WKC6WA5QMHVK4B6_assets_1745338659602-webp_cdgoar.jpg"
      ]
    },
    descripcion: "",
    caracteristicas: ["Llavero de goma", "perfecto para regalo", "accesorio de bolso y/o mochila"]
  },

  {
    id: 7,
    nombre: "LLAVERO BIKER",
    precio: 4,
    categoria: "Llaveros",
    stock: 0, // Agotado para probar filtro
    destacado: false,
    imagenes: {
      principal: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769327050/store_01JPB7BHTY6WKC6WA5QMHVK4B6_assets_1742781792001-whatsappimage2025-03-08at4.41.42pm_we6nfl.avif",
      galeria: []
    },
    descripcion: "Llavero de tela con bordado",
    caracteristicas: []
  },

  {
    id: 8,
    nombre: "LLAVERO BIKER",
    precio: 4,
    categoria: "Llaveros",
    stock: 0, // Agotado para probar filtro
    destacado: false,
    imagenes: {
      principal: "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325647/imgi_106_store_01JPB7BHTY6WKC6WA5QMHVK4B6_2Fassets_2F1745339263426-b763cfb1-d989-4987-948d-560ef2c75d35_pqpjp5.png",
      galeria: [
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325652/imgi_102_store_01JPB7BHTY6WKC6WA5QMHVK4B6_2Fassets_2F1745339296535-789921f9-5a4c-4d06-aee6-98db167dd162_luxop4.png",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325650/imgi_103_store_01JPB7BHTY6WKC6WA5QMHVK4B6_2Fassets_2F1745339263427-webp1_afiilv.png",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325654/imgi_104_store_01JPB7BHTY6WKC6WA5QMHVK4B6_2Fassets_2F1745339263427-db5957db-1f64-420c-a8be-3b3bb8da3fe5_ojvsry.png",
        "https://res.cloudinary.com/dx0dmthm2/image/upload/v1769325646/imgi_105_store_01JPB7BHTY6WKC6WA5QMHVK4B6_2Fassets_2F1745339263427-webp_un7imn.jpg"
      ]
    },
    descripcion: "LLavero de motocicleta",
    caracteristicas: [
        "Manubrio funcional",
        "Ruedas giratorias",
        "Posee pata de apoyo lateral"
    ]
  }
];