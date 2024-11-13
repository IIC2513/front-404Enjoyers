# 404Enjoyers

## Integrantes

- Nicolás Araya
- Matías Harrison
- Benjamín Martinez

## Ejecución

Si no has instalado las dependencias, utiliza el siguiente comando en consola
```console
    yarn
```

Recuerda crear un ```.env``` que contenga las siguientes variables de entorno
```js
    VITE_BACKEND_URL = backend_url
```

Luego, para iniciar la página localmente, utiliza el siguiente comando en consola
```console
    yarn dev
```
Abre el link que se muestra en la consola.
Además, este proyecto funciona en conjunto al backend, sigue los pasos de ejecución de [dicho repositorio](https://github.com/IIC2513/back-404Enjoyers)

## Conjunto de Pruebas Recomendado

1. Puedes navegar sin sesión por las vistas de Guide, Wiki y About Us.
2. Una vez iniciada la sesión puedes acceder a Play
3. Puedes usar Create a Match para crear una nueva partida
4. Puedes unirte a alguna partida de Waiting Matches apretando Join
5. Puedes ir a la sala de espera clickeando una partida a la que pertenezcas
6. Puedes elegir personaje en la sala de espera
7. Si eres el creador, puedes empezar la partida
8. Una vez la partida empezada, de nuevo en la pestaña de todas las partidas, puedes entrar al tablero del juego clickeando una partida en progreso
9. Una vez en el tablero, puedes clickear la casilla a la que te quieras mover y el personaje se moverá a esta si es posible.
10. En el apartado de abajo se encuentran los eventos de la celda en que has caído


## Documentos
Los .pdf de las entregas se encuentran en ```docs```

## Tablero KanBan
Este es el enlace al [kanban](https://github.com/users/nicolasaat/projects/1/views/1)

## Estructura base

Para este proyecto se uso la plantilla de **React + Vite**, que incluye HMR y ESLint.

Los plugins oficiales son:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh