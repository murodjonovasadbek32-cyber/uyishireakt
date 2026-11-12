# CLICON - eCommerce do'koni (useParams Demo)

Ushbu loyiha Figma'dagi **CLICON** elektronika do'koni dizayni asosida **React**, **Tailwind CSS** va **React Router (`useParams`)** yordamida yaratildi.

## 🚀 Ishga tushirish (Run project)

Terminalda loyiha papkasiga o'ting:
```bash
cd C:\Users\user\.gemini\antigravity\scratch\clicon-shop
```

Loyiha serverini ishga tushiring:
```bash
npm run dev
```

Brauzerda oching:
👉 `http://localhost:5173`

---

## 🎯 Loyihada `useParams` qanday ishlatilgan?

1. **Router sozlamasi (`src/App.jsx`)**:
   ```jsx
   <Route path="/product/:id" element={<ProductDetail />} />
   ```
   Bu yerda `:id` o'zgaruvchi parametr hisoblanadi.

2. **Katalog sahifasi (`src/pages/Shop.jsx`)**:
   Har bir mahsulot kartochkasi o'zining ID raqami bilan link qilingan:
   ```jsx
   <Link to={`/product/${product.id}`}>
     <h3>{product.title}</h3>
   </Link>
   ```

3. **Batafsil sahifa (`src/pages/ProductDetail.jsx`)**:
   `useParams()` orqali URL'dagi `id` o'qib olinadi va tegishli mahsulot ekranga chiqariladi:
   ```jsx
   import { useParams } from "react-router-dom";
   import { products } from "../data/products";

   export default function ProductDetail() {
     const { id } = useParams(); // masalan: "1"

     // Shu id bo'yicha mahsulotni topamiz:
     const product = products.find((p) => p.id === id);

     return (
       <div>
         <h1>{product.title}</h1>
         <p>Narxi: ${product.price}</p>
       </div>
     );
   }
   ```

---

## 🎨 Dizayn va texnologiyalar
- **React 18**
- **Vite**
- **Tailwind CSS**
- **React Router Dom v6**
- **Lucide Icons**
