# Maqueta 3D · Cartografía de Lenguas Indígenas del Cauca

Página web para mostrar la maqueta: visor 3D interactivo, video de 360°, render final y descargas.

## Estructura

```
index.html      Página
styles.css      Estilos
script.js       Controles del visor, video y ampliación de imagen
assets/
  maqueta-cauca.glb          Modelo 3D
  maqueta-cauca-360.mp4      Video de 360°
  maqueta-cauca-render.png   Render en alta resolución (descarga)
  maqueta-cauca-render.jpg   Render optimizado para la web
  poster.jpg                 Imagen mientras carga el modelo
```

## Publicar gratis en GitHub Pages

1. Crea una cuenta en github.com (gratis) e inicia sesión.
2. Pulsa **New repository**. Ponle un nombre, por ejemplo `maqueta-cauca`, déjalo en **Public** y pulsa **Create repository**.
3. En el repositorio vacío, haz clic en **uploading an existing file**.
4. Arrastra **todo el contenido** de esta carpeta (index.html, styles.css, script.js y la carpeta assets). No arrastres la carpeta contenedora, sino lo que hay dentro.
5. Pulsa **Commit changes** y espera a que termine la subida.
6. Ve a **Settings → Pages**. En *Branch* elige `main` y la carpeta `/ (root)`, y pulsa **Save**.
7. Espera 1 o 2 minutos y recarga. Arriba aparecerá el enlace:
   `https://TU-USUARIO.github.io/maqueta-cauca/`

Ese es el enlace que envías al cliente.

## Actualizar archivos

Si vuelves a exportar la maqueta, el video o el render, súbelos al repositorio con **el mismo nombre** dentro de `assets/` (Add file → Upload files). La página se actualiza sola en uno o dos minutos. Si el cliente sigue viendo la versión anterior, que recargue con Ctrl+F5.

## Personalizar

- Autoría: cambia el texto del pie de página al final de `index.html`.
- Pesos de archivo: si cambian, actualiza los textos de la sección *Descargas* en `index.html`.

## Probar en tu computador

Al abrir `index.html` con doble clic, el modelo 3D puede no cargar porque el navegador bloquea archivos locales. Pruébalo ya publicado en GitHub Pages, o con la extensión *Live Server* de VS Code.
