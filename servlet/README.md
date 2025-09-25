# Nomenclaturas Web App

Aplicación web desarrollada con Servlet y JSP para gestionar nomenclaturas por generación.

## 🚀 Características

- **Gestión de Generaciones**: Vista principal con todas las generaciones disponibles
- **Nomenclaturas por Generación**: Visualización detallada de nomenclaturas por generación
- **CRUD Básico**: Agregar y modificar nomenclaturas
- **Interfaz Moderna**: Diseño responsive con Bootstrap 5
- **Aplicación Sincrónica**: Sin AJAX, recarga completa de páginas

## 📁 Estructura del Proyecto

```
servlet/
├── pom.xml
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── nomenclaturas/
        │           └── servlet/
        │               ├── Generacion.java
        │               ├── Nomenclatura.java
        │               └── GeneracionesServlet.java
        └── webapp/
            └── WEB-INF/
                ├── web.xml
                └── jsp/
                    ├── generaciones.jsp
                    ├── nomenclaturas.jsp
                    └── error.jsp
```

## 🛠️ Requisitos

- **Java**: JDK 11 o superior
- **Maven**: 3.6 o superior
- **Servidor**: Tomcat 9 o superior

## 📦 Instalación y Despliegue

### 1. Compilar el proyecto
```bash
cd servlet
mvn clean compile
```

### 2. Empaquetar como WAR
```bash
mvn clean package
```

### 3. Desplegar en Tomcat
- Copiar `target/nomenclaturas.war` a la carpeta `webapps` de Tomcat
- Iniciar Tomcat
- Acceder a: `http://localhost:8080/nomenclaturas/generaciones`

### 4. Desarrollo con Maven (opcional)
```bash
mvn tomcat7:run
```

## 🎯 Funcionalidades

### Vista Principal - Generaciones
- Lista todas las generaciones disponibles
- Muestra: ID, Nombre, Mes y Año
- Navegación mediante clic

### Vista de Nomenclaturas
- Información de la generación seleccionada
- Tabla con nomenclaturas: #, V.Numérico, V.Letra, Acción
- Botón "+" para agregar nomenclaturas
- Botón "M" para modificar nomenclaturas existentes

### Modales
- **Agregar**: Formulario para crear nueva nomenclatura
- **Modificar**: Formulario pre-llenado para editar nomenclatura

## 🌐 URLs de la Aplicación

- **Principal**: `/nomenclaturas/generaciones`
- **Ver Nomenclaturas**: `/nomenclaturas/generaciones?action=ver&generacionId=X`
- **Agregar**: POST a `/nomenclaturas/generaciones` con `action=agregar`
- **Modificar**: POST a `/nomenclaturas/generaciones` con `action=modificar`

## 👨‍💻 Desarrollado por

**Kevin Zúñiga**  
10mo Cuatrimestre - Aplicaciones Web Progresivas

---

## 📄 Notas Técnicas

- Los datos se almacenan en memoria (listas estáticas)
- Para producción, implementar persistencia con base de datos
- La aplicación es completamente sincrónica (sin AJAX)
- Diseño responsive compatible con dispositivos móviles