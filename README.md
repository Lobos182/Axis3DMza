# E-commerce Axis3DMendoza

Este proyecto es un E-commerce, de venta de articulos impresos en 3D.



## Correrlo Localmente

Si se quiere descargar el proyecto y probar local, una vez realizada la clonacion se debe ejecutar `npm install`, luego se puede hacer uso de los scripts disponibles.

Tambien es necesario configurar una base de datos de Firebase.

Clonar el proyecto

```bash
  git clone https://github.com/Lobos182/Axis3DMza
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Scripts Disponibles

Se pueden ejecutar los siguientes scripts:

### `npm start`

Con este comando se levanta la app en modo desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) en el navegador.

La pagina se actualiza cada vez que se hace un cambio.\
Tambien muestra errores en consola para poder debugear.

### `npm test`

Para ejecutar test (no aplicado por el momento).\

### `npm run build`

Para creaer la carpeta `build` y poder subirlo a produccion.\

Mas informacion [deployment](https://facebook.github.io/create-react-app/docs/deployment).



## Variables de Entorno

Para poder correr este proyecto es necesario configurar las variables de entorno, la cuales son las credenciales de la base de datos Firebase
Tambien hay un archivo de ejemplo .env.example


`REACT_APP_FIREBASE_apiKey`

`REACT_APP_FIREBASE_authDomain`

`REACT_APP_FIREBASE_projectId`

`REACT_APP_FIREBASE_storageBucket`

`REACT_APP_FIREBASE_messagingSenderId`

`REACT_APP_FIREBASE_appId`


## Demo
[Axis-3d-Mendoza-copia.webm](https://user-images.githubusercontent.com/97643619/177225992-f34c2259-ca30-4ab5-88b5-433b58eb7d60.webm)
    
## Documentación 
Las Rutas de mi aplicación son:
- root (/): muestra el ItemListContainer el cual muestra el listado de todos los productos que tenemos en nuestra base de datos.
- Filtrados por categoria (/categoria/categoriaId) muestra segun la categoria de prodcuto elegida el listado de esos productos.
- Filtrados por Id (/detalle/ProductId) este es el boton que esta en cada Card, el cual se llama detalle y al hacer click lleva a la pagina en la cual solo muestra el producto selsccionado con todos sus detalles.
- Nosotros (/about) muestra la pagina sobre nosotros.

## Built Using

- [Create-React-App](https://create-react-app.dev/)
- [Firebase](https://firebase.com)

## Autor

- [@Lobos182](https://github.com/Lobos182)


![Logo](https://raw.githubusercontent.com/Lobos182/FinalJS2022/master/images/axis3d.jpg)


