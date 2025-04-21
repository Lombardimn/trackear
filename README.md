# Trackear

**Trackear** es una aplicación fullstack orientada a la gestión de presupuestos y gastos personales. El sistema permite a los usuarios registrar ingresos y egresos, visualizar estadísticas financieras y llevar un control detallado de sus finanzas. Además, incluye un sistema completo de autenticación y autorización para garantizar la seguridad de los datos.

Este repositorio contiene tanto el **backend** como el **frontend** de la aplicación.

---

## Índice

1. [Tecnologías utilizadas](#tecnologías-utilizadas)
   - [Backend](#backend)
   - [Frontend](#frontend)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Instalación y configuración](#instalación-y-configuración)
4. [Contribuciones](#contribuciones)
5. [Licencia](#licencia)

---

## Tecnologías utilizadas

### Backend

El backend ha sido desarrollado con una arquitectura RESTfull escalable, orientada a facilitar futuras ampliaciones del sistema. Las tecnologías principales son:

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework minimalista para la creación de APIs robustas.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar la información financiera y de usuarios.
- **Mongoose**: Librería ODM que permite definir esquemas y modelos para MongoDB.
- **JWT (JSON Web Tokens)**: Sistema de autenticación basado en tokens para proteger los endpoints.
- **dotenv**: Gestión de variables de entorno para una configuración segura y flexible.

> El backend está diseñado con principios de seguridad y rendimiento, incorporando validaciones de datos y control de acceso por roles.

### Frontend

La interfaz de usuario está construida utilizando renderizado del lado del servidor (SSR) mediante Next.js, con un enfoque en rendimiento, experiencia de usuario e interfaz moderna. Tecnologías utilizadas:

- **Next.js**: Framework basado en React con soporte para SSR y SSG.
- **TypeScript**: Tipado estático que mejora la mantenibilidad y reduce errores.
- **Tailwind CSS**: Framework de utilidad para estilos rápidos y responsivos.

> El frontend se comunica con la API de forma segura, y ofrece una experiencia fluida en diferentes dispositivos.

---

## Estructura del proyecto

El repositorio está organizado en dos carpetas principales:

```bash
  /backend # Código fuente del servidor (API REST, controladores, modelos, rutas) 
  /frontend # Aplicación cliente (componentes, páginas, hooks, estilos)
```

---

## Instalación y configuración

Sigue los pasos a continuación para levantar el proyecto en entorno local:

1. Clonar el repositorio

  ```bash
    git clone https://github.com/tu-usuario/trackear.git
    cd trackear
  ```

2. Configuración del backend

  ```bash
    cd backend
    npm install
    cp .env.example .env   # Crear archivo .env con las variables necesarias
    npm run dev
  ```

3. Configuración del frontend

En otra terminal:

  ```bash
    cd frontend
    npm install
    npm run dev
  ```

> Nota: Asegúrate de tener Node.js y MongoDB instalados en tu máquina local.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas proponer mejoras, reportar errores o agregar nuevas funcionalidades:

Abre un issue con la descripción del cambio.

Crea un fork del repositorio.

Envía un pull request con tus cambios y una breve explicación.

Por favor, sigue las buenas prácticas de código y formato para mantener la calidad del proyecto.

## Licencia

Este proyecto está licenciado bajo la licencia MIT.
