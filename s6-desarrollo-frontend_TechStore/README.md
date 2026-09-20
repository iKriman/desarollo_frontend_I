# TechStore - Desarrollo Frontend I (Semana 6)

## 📌 Descripción del Proyecto
Proyecto sumativo para la asignatura Desarrollo Frontend I (PFY2201). Se trata de una página web orientada a eCommerce ("TechStore") que implementa Bootstrap 5 para el diseño responsivo y JavaScript Vanilla para la lógica dinámica, validaciones y manipulación del DOM.

## 🛠️ Tecnologías Utilizadas
- **HTML5** (Semántica y estructura)
- **CSS3** (Personalización ligera)
- **Bootstrap 5.3** (Componentes, Grid, Navbar, Cards)
- **JavaScript (ES6+)** (Manipulación del DOM, Eventos)
- **Fetch API** (Consumo de datos JSON)

## ⚙️ Funcionalidades Implementadas
1. **Interfaz Responsiva:** Diseño completamente adaptable (móvil, tablet, escritorio) usando Bootstrap 5.
2. **Consumo de JSON (Fetch API):** Carga dinámica de 6 productos desde un archivo local con manejo de errores (bloque `try...catch`).
3. **Buscador Dinámico (Evento `submit`):** Permite filtrar los productos evitando la recarga con `preventDefault()`.
4. **Carrito de Compras (Evento `click`):** Botones en las tarjetas que modifican dinámicamente un resumen de carrito y calculan el total totalizando cantidades.
5. **Código Modularizado:** Funciones de JS separadas (cargar, renderizar, agregar, eventos) y correctamente comentadas.

## 🚀 Cómo ejecutar el proyecto de forma local
1. Clona o descarga este repositorio.
2. Dado que el proyecto usa `Fetch API` para leer un archivo local (`productos.json`), **NO** puedes simplemente hacer doble clic en el archivo `index.html` (los navegadores bloquean Fetch por CORS).
3. **Solución:** Utiliza la extensión de Visual Studio Code llamada **"Live Server"**. 
4. Haz clic derecho en `index.html` y selecciona `Open with Live Server`. El proyecto se abrirá en `http://127.0.0.1:5500/index.html`.

## 🌍 URL del Despliegue Público
- Despliegue: 