# 💪 My Trainer

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

**Aplicación web progresiva para entrenamientos personalizados con temporizador inteligente**

[Ver Demo](#) • [Reportar Bug](../../issues) • [Solicitar Feature](../../issues)

</div>

---

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Despliegue](#-despliegue)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 🎯 Acerca del Proyecto

**My Trainer** es una Progressive Web App (PWA) diseñada para ayudarte a realizar rutinas de ejercicio con un sistema de temporizador inteligente. Perfecta para entrenamientos en casa, yoga, estiramientos o cualquier actividad que requiera seguimiento temporal.

### ¿Por qué My Trainer?

- ✅ **Sin instalación requerida**: Funciona directamente en el navegador
- ✅ **Instalable como app**: Compatible con dispositivos móviles y escritorio
- ✅ **Funciona offline**: Una vez cargada, no necesitas conexión a internet
- ✅ **Sin anuncios ni suscripciones**: Completamente gratuita
- ✅ **Personalizable**: Crea tus propias rutinas con más de 70 ejercicios

---

## ✨ Características

### 🏋️ Sistema de Rutinas

- **Rutinas predefinidas**: Incluye 3 rutinas listas para usar:
  - Activación de piernas y core
  - Estiramientos antes de dormir
  - Estiramientos post-trabajo sentado

- **Creador de rutinas personalizado**: 
  - Catálogo de 70+ ejercicios con imágenes
  - Organización por categorías (Core, Planchas, Piernas, Glúteos, Brazos, Espalda, Yoga, Estiramientos)
  - Ajuste individual de tiempo por ejercicio
  - Reordenamiento de ejercicios con arrastrar y soltar
  - Tiempo de transición configurable

### ⏱️ Temporizador Inteligente

- **Contador descendente** con visualización clara (minutos:segundos)
- **Barra de progreso visual** para cada ejercicio
- **Alertas sonoras**: 3 pitidos en los últimos 3 segundos de cada ejercicio/transición
- **Controles completos**: Iniciar, pausar, reiniciar y saltar ejercicios
- **Vista previa**: Muestra el siguiente ejercicio mientras entrenas

### 🎨 Interfaz de Usuario

- **Diseño moderno y minimalista** con gradientes y sombras suaves
- **Totalmente responsive**: Optimizada para móvil, tablet y escritorio
- **Animaciones fluidas** y transiciones suaves
- **Indicadores de estado**: Badges para fase actual (Ejercicio/Transición/Finalizado)
- **Imágenes ilustrativas** para cada ejercicio

### 💾 Gestión de Datos

- **Almacenamiento local**: Tus rutinas se guardan automáticamente en el navegador
- **Edición de rutinas**: Modifica ejercicios, tiempos y configuraciones en cualquier momento
- **Eliminación segura**: Modal de confirmación para evitar borrados accidentales
- **Sin registro**: No necesitas crear cuenta ni iniciar sesión

### 📱 PWA Features

- **Instalable**: Añade la app a tu pantalla de inicio
- **Offline first**: Funciona sin conexión después de la primera carga
- **Service Worker**: Caché inteligente de recursos
- **Iconos adaptables**: Para iOS y Android

---

## 🛠️ Tecnologías

### Frontend

- **[React 19](https://react.dev/)** - Biblioteca de UI con las últimas mejoras
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Tipado estático para JavaScript
- **[Vite 7.2](https://vitejs.dev/)** - Build tool ultrarrápida
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Framework de utilidades CSS

### PWA & Build

- **[Vite Plugin PWA](https://vite-pwa-org.netlify.app/)** - Generación de Service Worker
- **[Workbox](https://developer.chrome.com/docs/workbox/)** - Estrategias de caché PWA

### Audio

- **Web Audio API** - Generación de pitidos sin dependencias externas

### Deployment

- **[GitHub Actions](https://github.com/features/actions)** - CI/CD automatizado
- **[GitHub Pages](https://pages.github.com/)** - Hosting estático gratuito

---

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clona el repositorio**

```bash
git clone https://github.com/tu-usuario/My-Trainer.git
cd My-Trainer
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

4. **Abre tu navegador**

Visita `http://localhost:5173` (o el puerto que Vite indique)

---

## 🎮 Uso

### Inicio Rápido

1. **Selecciona una rutina**: En la pantalla principal, elige una de las rutinas predefinidas
2. **Haz clic en "Empezar"**: El temporizador comenzará automáticamente
3. **Sigue el temporizador**: Escucha los pitidos cuando queden 3, 2 y 1 segundos
4. **Controla tu sesión**: Usa los botones para pausar, reiniciar o saltar ejercicios

### Crear una Rutina Personalizada

1. **Haz clic en "Crear Nueva Rutina"**
2. **Configura los detalles**:
   - Nombre de la rutina
   - Tiempo de transición entre ejercicios
3. **Añade ejercicios**:
   - Haz clic en "Añadir ejercicio"
   - Filtra por categoría
   - Selecciona ejercicios del catálogo
4. **Ajusta tiempos**: Modifica la duración de cada ejercicio
5. **Reordena**: Usa las flechas para cambiar el orden
6. **Guarda**: Tu rutina se almacenará automáticamente

### Editar Rutinas

1. **Despliega los detalles**: Haz clic en el acordeón de la rutina
2. **Modifica**:
   - Tiempo de transición
   - Duración de ejercicios individuales
3. **Elimina**: Usa el botón al final del acordeón (requiere confirmación)

---

## 📁 Estructura del Proyecto

```
My-Trainer/
├── public/
│   ├── exercises/          # Imágenes de ejercicios (70+ archivos)
│   └── icons/              # Iconos PWA
├── src/
│   ├── components/
│   │   ├── DeleteRoutineModal.tsx    # Modal de confirmación
│   │   ├── ExerciseImage.tsx         # Componente de imagen
│   │   ├── ExerciseItem.tsx          # Item de ejercicio en lista
│   │   ├── PhaseBadge.tsx            # Badge de fase actual
│   │   ├── RoutineCard.tsx           # Tarjeta de rutina
│   │   ├── RoutineCreator.tsx        # Creador de rutinas
│   │   ├── TimerDisplay.tsx          # Display del temporizador
│   │   ├── WorkoutControls.tsx       # Controles del entrenamiento
│   │   └── WorkoutPlayer.tsx         # Reproductor principal
│   ├── data/
│   │   ├── defaultRoutines.ts        # Rutinas predefinidas
│   │   └── exerciseCatalog.ts        # Catálogo de 70+ ejercicios
│   ├── lib/
│   │   ├── beep.ts                   # Generador de sonidos
│   │   └── imagePath.ts              # Utilidades de rutas
│   ├── stores/
│   │   └── routines.ts               # Gestión de localStorage
│   ├── App.tsx                       # Componente principal
│   ├── types.ts                      # Definiciones TypeScript
│   └── main.tsx                      # Punto de entrada
├── .github/
│   └── workflows/
│       └── deploy.yml                # CI/CD para GitHub Pages
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🌐 Despliegue

### GitHub Pages (Recomendado)

El proyecto está configurado para desplegarse automáticamente con GitHub Actions.

1. **Habilita GitHub Pages**:
   - Ve a `Settings` > `Pages`
   - En `Source`, selecciona `GitHub Actions`

2. **Push a main**:
   ```bash
   git push origin main
   ```

3. **Accede a tu app**:
   ```
   https://tu-usuario.github.io/My-Trainer/
   ```

### Build Manual

```bash
# Genera build de producción
npm run build

# Previsualiza el build
npm run preview
```

Los archivos se generarán en la carpeta `dist/`.

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar My Trainer:

1. **Fork** el proyecto
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### Ideas para Contribuir

- 🎨 Nuevos temas de color o modo oscuro
- 🏋️ Más ejercicios en el catálogo
- 📊 Sistema de estadísticas y seguimiento
- 🔊 Más opciones de audio (voces, diferentes sonidos)
- 🌍 Internacionalización (i18n)
- ♿ Mejoras de accesibilidad

---

## 📝 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

---

## 👤 Autor

**Tu Nombre**

- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

---

## 🙏 Agradecimientos

- Imágenes de ejercicios inspiradas en recursos de fitness
- Diseño de UI inspirado en las mejores prácticas de apps de fitness
- Comunidad de React y Vite por las excelentes herramientas

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella ⭐**

Hecho con ❤️ y mucho café ☕

</div>
