# Sistema de Gestión de Inventario y Catálogo Digital

## Descripción
Este proyecto consiste en el desarrollo de una plataforma web enfocada en la **gestión de inventario y catálogo digital** para un negocio de ropa y calzado.

La solución busca reemplazar procesos manuales (papel y lápiz) por un sistema digital que permita:
- Controlar el inventario de manera eficiente
- Visualizar productos en un catálogo público
- Registrar ventas para análisis del negocio
- Facilitar la interacción con clientes mediante contacto directo

## Objetivo
Construir una solución **simple, escalable y sin costos operativos**, que mejore la organización interna del negocio y aumente su visibilidad digital.

## Enfoque del Proyecto
Este sistema fue diseñado bajo principios de:
- Pensamiento de diseño (Design Thinking)
- UX centrado en el usuario
- Arquitectura modular escalable
- Simplicidad operativa para el cliente

## Arquitectura
El proyecto implementa una arquitectura:

Monolito modular orientado a dominio

### Características:
- Separación por módulos (catálogo, inventario, ventas, etc.)
- Capas internas:
  - Domain (lógica del negocio)
  - Application (servicios)
  - Infrastructure (base de datos)
  - Presentation (API)
- Backend y frontend integrados usando Next.js

## Módulos principales
- **Auth** → autenticación del administrador
- **Catalog** → productos, variantes y categorías
- **Inventory** → control de stock
- **Sales** → registro de ventas
- **Interaction** → intención de compra (WhatsApp)
- **Config** → información del negocio

## Base de Datos
Modelo relacional optimizado para:
- Productos y variantes (color, talla)
- Inventario independiente
- Registro de ventas
- Imágenes por variante
- Métricas de popularidad

## Tecnologías
- **Next.js** → frontend + backend
- **TailwindCSS** → estilos
- **Prisma ORM** → acceso a base de datos
- **MySQL / TiDB Cloud** → base de datos
- **JWT + Auth.js** → autenticación
- **Vercel** → despliegue

## UX / UI
El diseño se enfoca en:
- Minimalismo visual
- Facilidad de uso
- Baja fricción en interacción
- Flujo claro de navegación
- Adaptación al contexto real del negocio

## Flujo principal
### Cliente:
Explorar catálogo → Ver producto → Contactar por WhatsApp
### Administrador:
Login → Gestionar productos → Controlar inventario → Registrar ventas

## Estado del Proyecto
Actualmente en desarrollo bajo metodología ágil por sprints:

- ✔ Definición del problema
- ✔ Arquitectura
- ✔ Modelo de datos
- ✔ Wireframes
- Desarrollo backend
- Desarrollo frontend

## Investigación UX
El sistema se construye con base en:
- Observación del negocio real
- Interacción con usuarios
- Iteración continua sobre prototipos

## Alcance
Este proyecto no busca transformar completamente el negocio, sino:
mejorar procesos existentes de forma eficiente y sin fricción

## Autor
Desarrollado por:
**J Jairo C Ordoñez**
Proyecto creado como parte de portafolio profesional y solución real para negocio local.

## Licencia
Este proyecto está bajo licencia MIT.