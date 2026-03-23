# Kiosk-Service

## Descripción

**Kiosk-Service** es un microservicio especializado que gestiona la operación y funcionalidad de los kioscos de autoservicio de la plataforma. Los kioscos son terminales de atención al público ubicadas en puntos estratégicos que permiten a los afiliados y beneficiarios realizar consultas, trámites y transacciones de forma autónoma sin necesidad de asistencia presencial. Forma parte de una arquitectura de microservicios basada en **NestJS** y utiliza **NATS** para la comunicación asincrónica entre servicios.

Maneja datos como:
- Gestión de transacciones en kioscos
- Control de dispositivos y terminales
- Sincronización de información en puntos de atención
- Reportes de operación de kioscos
- Autenticación y validación de usuarios en terminales
- Gestión de sesiones y seguridad en kioscos

---

## Estructura del Proyecto

```
src/
├── app.module.ts                 # Módulo raíz que organiza todos los módulos de la aplicación
├── main.ts                       # Punto de entrada principal de la aplicación
├── kiosk/                        # Módulo principal de gestión de kioscos
│   ├── controllers/              # Controladores que manejan las operaciones de kiosk
│   ├── services/                 # Servicios con la lógica de negocio
│   └── dto/                      # Data Transfer Objects para validación de datos
├── transactions/                 # Módulo de transacciones en kioscos
│   ├── controllers/              # Controladores de transacciones
│   ├── services/                 # Servicios de procesamiento de transacciones
│   └── dto/                      # Validación de datos de transacciones
├── device-management/            # Módulo de control de dispositivos físicos
│   ├── controllers/              # Controladores de estado de dispositivos
│   ├── services/                 # Servicios de monitoreo y control
│   └── dto/                      # Validación de datos de dispositivos
├── common/                       # Código compartido reutilizable en toda la aplicación
│   ├── filters/                  # Filtros para manejo de excepciones
│   ├── guards/                   # Guards para proteger rutas
│   └── decorators/               # Decoradores personalizados
├── config/                       # Archivos de configuración (BD, variables ENV, etc)
│   └── database.config.ts        # Configuración específica de PostgreSQL
├── database/                     # Gestión de base de datos, migraciones y datos iniciales
│   ├── migrations/               # Migraciones TypeORM para cambios en el esquema BD
│   ├── seeds/                    # Seeders para llenar BD con datos de prueba
│   └── entities/                 # Entidades (modelos) que representan tablas de la BD
```

---

## Clonar el repositorio y agregarle un nombre nuevo del nuevo proyecto

```bash
git clone https://github.com/MUTUAL-DE-SERVICIOS-AL-POLICIA/Kiosk-Service.git nombre-kiosk-service
```

## Inicializar proyecto

```bash
# Entrar al repositorio clonado con el nuevo nombre del proyecto
cd nombre-kiosk-service

# Elimina el origen remoto actual
git remote remove origin

# Crear el archivo .env en base al .env.template
cp .env.template .env

# Instalar las dependencias
pnpm install

# Correr proyecto en modo desarrollo
pnpm start:dev

# Crear nuevo Módulo
nest g res nombreModulo

# Para enlazar a un nuevo repositorio
git remote add origin https://github.com/tu-usuario/{nombre-kiosk-service}.git
git add .
git commit -m "Inicialización del nuevo proyecto"
git branch -M main
git push -u origin main
```