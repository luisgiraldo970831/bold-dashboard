# Bold Dashboard - Ejercicio Técnico

## 🌐 Demo en Vivo

**🚀 [Ver aplicación desplegada en Vercel](https://bold-dashboard-sigma.vercel.app/)**

## 📋 Descripción del Proyecto

Este es un dashboard de transacciones desarrollado como ejercicio técnico para Bold. La aplicación permite visualizar el total de ventas diarias, filtrar transacciones por diferentes rangos de tiempo y aplicar filtros específicos mediante un modal interactivo.

## ✨ Características Principales

### 🎯 Dashboard Interactivo
- **Visualización en tiempo real** de totales de ventas
- **Estadísticas dinámicas** que se actualizan con los filtros
- **Diseño responsive** que funciona en móviles y desktop

### 🔍 Sistema de Filtros Avanzado
- **Filtros por rango de tiempo**: Hoy, Esta semana, Mes
- **Filtros por tipo de venta**: Datáfono, Link de pago
- **Búsqueda en tiempo real** por ID o referencia de transacción
- **Modal de filtros** con interfaz intuitiva
- **Persistencia completa** - Los filtros se mantienen al actualizar la página
- **Sincronización automática** entre componentes usando Context API

### 📊 Tabla de Transacciones
- **Información completa** de cada transacción
- **Estados visuales** (exitoso, rechazado, pendiente)
- **Formateo automático** de moneda y fechas
- **Datos de deducciones** cuando aplican

### 🎨 Diseño y UX
- **Sistema de tokens** CSS para consistencia visual
- **Animaciones suaves** y transiciones
- **Estados de carga** y manejo de errores
- **Accesibilidad** con atributos ARIA

## 🛠️ Tecnologías Utilizadas

### Frontend Core
- **React 19** - Biblioteca principal para la interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez del código
- **Vite** - Herramienta de build rápida y moderna

### Styling & UI
- **Tailwind CSS v3.4.0** - Framework de CSS utility-first
- **PostCSS** - Procesador de CSS para optimización
- **CSS Variables** - Para tokens de diseño consistentes

### Gestión de Estado
- **Context API** - Estado global compartido entre componentes
- **useReducer** - Manejo de estado complejo con acciones tipadas
- **Custom Hooks** - Lógica reutilizable encapsulada

### Herramientas de Desarrollo
- **Yarn** - Gestor de paquetes
- **ESLint** - Linter para calidad de código
- **Hot Module Replacement (HMR)** - Recarga rápida en desarrollo

## 🏗️ Arquitectura y Patrones

### Estructura de Carpetas
```
bold-dashboard/
├── public/                    # Archivos estáticos
│   └── vite.svg
├── src/
│   ├── api/                   # Cliente API
│   │   └── client.ts
│   ├── assets/                # Imágenes y recursos
│   │   ├── banner-bold.png
│   │   └── react.svg
│   ├── features/              # Funcionalidades por dominio
│   │   └── transactions/      # Módulo de transacciones
│   │       └── components/    # Componentes específicos
│   │           ├── RangeBar.tsx
│   │           ├── FiltersPanel.tsx
│   │           ├── TransactionsTable.tsx
│   │           └── ...
│   ├── hooks/                 # Custom hooks reutilizables
│   │   ├── useTransactions.ts
│   │   └── useOnClickOutside.ts
│   ├── pages/                 # Páginas principales
│   │   └── Dashboard.tsx
│   ├── services/              # Lógica de negocio y API
│   │   └── transactionsApi.ts
│   ├── stores/                # Gestión de estado global
│   │   └── FiltersContext.tsx
│   ├── styles/                # Tokens de diseño
│   │   └── tokens.css
│   ├── types/                 # Definiciones TypeScript
│   │   └── api.ts
│   ├── App.tsx               # Componente raíz
│   ├── main.tsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── package.json              # Dependencias y scripts
├── tailwind.config.ts       # Configuración de Tailwind
├── vite.config.ts           # Configuración de Vite
└── tsconfig.json            # Configuración de TypeScript
```

### Patrón de Diseño: Feature-Based Architecture

**¿Por qué este patrón?**

1. **Escalabilidad**: Cada feature es independiente y puede crecer sin afectar otras
2. **Mantenibilidad**: Fácil localizar código relacionado con una funcionalidad específica
3. **Reutilización**: Componentes organizados por dominio de negocio
4. **Colaboración**: Equipos pueden trabajar en features separadas sin conflictos

### Gestión de Estado: Context API con useReducer

**¿Por qué elegí Context API?**

1. **Estado compartido real**: Necesitaba que los filtros se sincronizaran entre todos los componentes
2. **Simplicidad**: Para este proyecto, Context API es más directo que Redux/Zustand
3. **Performance optimizada**: Uso `useReducer` + `useCallback` para minimizar re-renders
4. **Escalabilidad**: Fácil agregar más estado global si el proyecto crece

```typescript
// Ejemplo del patrón implementado
export function FiltersProvider({ children }: FiltersProviderProps) {
  const [state, dispatch] = useReducer(filtersReducer, initialFilters);

  const setRange = useCallback((range: RangeKey) => {
    dispatch({ type: 'SET_RANGE', payload: range });
  }, []);

  return (
    <FiltersContext.Provider value={{ state, setRange, ... }}>
      {children}
    </FiltersContext.Provider>
  );
}
```

## 🎨 Sistema de Diseño

### Tokens de Diseño
- **Colores**: Variables CSS para consistencia (`--color-primary`, `--color-accent`)
- **Tipografía**: Montserrat como fuente principal
- **Espaciado**: Sistema de spacing consistente
- **Sombras**: Elevación visual con `box-shadow`

### Responsive Design Strategy

**Breakpoints utilizados:**
- **Móvil**: `< 640px` - Layout vertical, componentes apilados
- **Desktop**: `≥ 640px` - Layout horizontal, tres columnas

**Técnicas implementadas:**
- **Mobile-first**: Diseño base para móvil, mejoras progresivas
- **Flexbox**: Para layouts flexibles y centrado
- **Grid**: Para estructuras complejas (cuando sea necesario)
- **Clases condicionales**: `sm:hidden`, `hidden sm:flex`

## 🔧 Configuración Técnica

### Tailwind CSS Setup
```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        // ... más tokens
      }
    }
  }
}
```

### PostCSS Configuration
```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 📱 Componentes Principales

### 1. Dashboard (`src/pages/Dashboard.tsx`)
- **Responsabilidad**: Layout principal y coordinación de componentes
- **Estado**: Manejo del modal de filtros
- **Responsive**: Dos layouts diferentes (móvil/desktop)

### 2. RangeBar (`src/features/transactions/components/RangeBar.tsx`)
- **Responsabilidad**: Selección de rangos de tiempo
- **Características**: Tabs responsive con anchos adaptativos
- **Estado**: Conectado al hook `useFilters`

### 3. FiltersPanel (`src/features/transactions/components/FiltersPanel.tsx`)
- **Responsabilidad**: Modal de filtros avanzados
- **Posicionamiento**: Esquina superior derecha con overlay
- **Interactividad**: Cierre por click fuera o botón X

### 4. FiltersContext (`src/stores/FiltersContext.tsx`)
- **Responsabilidad**: Estado global compartido de filtros
- **Patrón**: Context API con `useReducer` y `useCallback`
- **Optimización**: Acciones memoizadas para evitar re-renders innecesarios

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- Yarn (recomendado) o npm

### Pasos para ejecutar el proyecto

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd bold-dashboard
   ```

2. **Instalar dependencias**
   ```bash
   yarn install
   # o con npm
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   yarn dev
   # o con npm
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

### Comandos disponibles

```bash
# Desarrollo
yarn dev          # Servidor de desarrollo con HMR
npm run dev

# Build para producción
yarn build        # Genera archivos optimizados en /dist
npm run build

# Preview del build
yarn preview      # Sirve el build localmente
npm run preview

# Linting
yarn lint         # Ejecuta ESLint
npm run lint
```

## 🔧 Troubleshooting

### Problemas comunes

**Puerto ocupado:**
```bash
# Si el puerto 5173 está ocupado, Vite automáticamente usará otro puerto
# Revisa la consola para ver el puerto correcto
```

**Error de dependencias:**
```bash
# Limpiar caché y reinstalar
rm -rf node_modules yarn.lock
yarn install
```

**Problemas con TypeScript:**
```bash
# Verificar tipos
yarn tsc --noEmit
```

**API no responde:**
- Verifica tu conexión a internet
- La API externa puede estar temporalmente fuera de servicio
- Los datos se cargan desde `https://bold-fe-api.vercel.app/api`

## 🎮 Cómo Usar la Aplicación

### 1. Visualizar Totales
- Los totales se muestran automáticamente en la parte superior
- Se actualizan en tiempo real según los filtros aplicados

### 2. Filtrar por Tiempo
- Haz clic en los tabs: **Hoy**, **Esta semana**, **Mes**
- Los datos se filtran automáticamente

### 3. Usar Filtros Avanzados
- Haz clic en el botón **"Filtrar"** (esquina superior derecha)
- Selecciona los tipos de venta que desees:
  - ☑️ **Cobro con datáfono** (transacciones TERMINAL)
  - ☑️ **Cobro con link de pago** (transacciones PAYMENT_LINK)
  - ☑️ **Ver todos** (sin filtros)
- Haz clic en **"Aplicar"** para confirmar

### 4. Buscar Transacciones
- Usa el campo de búsqueda para encontrar transacciones por:
  - ID de transacción
  - Número de referencia

### 5. Limpiar Filtros
- En el modal de filtros, haz clic en **"Limpiar"**
- O selecciona **"Ver todos"** para mostrar todas las transacciones

### 6. Persistencia Automática
- **Los filtros se guardan automáticamente** en el navegador
- **Se mantienen al actualizar la página** o cerrar/abrir el navegador
- **Solo se guardan filtros relevantes** (no estados de UI como modales abiertos)
- **Funciona de forma transparente** - no necesitas hacer nada especial

## 💡 Proceso de Desarrollo

### Enfoque Iterativo
1. **Análisis inicial**: Identifiqué los requerimientos y diseñé la arquitectura
2. **Prototipo rápido**: Comencé con componentes básicos usando Tailwind
3. **Implementación de estado**: Comencé con Custom Hooks, luego migré a Context API cuando vi que necesitaba sincronización real
4. **Refinamiento**: Mejoré la UX y agregué detalles como estados de carga y manejo de errores
5. **Optimización**: Implementé memoización y optimicé el rendimiento

### Desafíos Encontrados
- **Sincronización de filtros**: Inicialmente cada componente tenía su propio estado, luego migré a Context API
- **Responsive design**: Adaptar el layout para móviles requirió repensar la estructura
- **Performance**: Optimicé con `useCallback` y `useMemo` para evitar re-renders innecesarios

## 🎯 Decisiones Técnicas Clave

### 1. ¿Por qué Tailwind CSS?
- **Rapid prototyping**: Desarrollo rápido de UI
- **Consistencia**: Sistema de diseño integrado
- **Performance**: CSS optimizado automáticamente
- **Mantenibilidad**: Clases utility fáciles de entender

### 2. ¿Por qué TypeScript?
- **Type safety**: Previene errores en tiempo de desarrollo
- **IntelliSense**: Mejor experiencia de desarrollo
- **Refactoring**: Cambios seguros en código
- **Documentación**: Los tipos sirven como documentación

### 3. ¿Por qué Vite?
- **Velocidad**: Build y HMR extremadamente rápidos
- **Moderno**: Soporte nativo para ES modules
- **Simplicidad**: Configuración mínima requerida
- **Ecosystem**: Excelente integración con React y TypeScript

### 4. ¿Por qué Context API en lugar de Custom Hooks?
- **Sincronización**: Los filtros necesitaban compartirse entre múltiples componentes
- **Estado global**: Una sola fuente de verdad para todos los filtros
- **Performance**: `useReducer` + `useCallback` optimizan los re-renders
- **Escalabilidad**: Fácil agregar más estado global si el proyecto crece

### 5. ¿Por qué localStorage para persistencia de filtros?

**Problema identificado**: Los filtros se perdían al actualizar la página, causando mala experiencia de usuario.

**Solución elegida**: Persistencia automática con `localStorage`.

**Implementación**:
```typescript
// Carga automática al inicializar
const loadFiltersFromStorage = (): FilterState => {
  try {
    const saved = localStorage.getItem('bold-dashboard-filters');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...initialFilters, ...parsed };
    }
  } catch (error) {
    console.warn('Error loading filters:', error);
  }
  return initialFilters;
};

// Guardado automático en cada cambio
useEffect(() => {
  saveFiltersToStorage(state);
}, [state]);
```

**Beneficios**:
- **Experiencia de usuario mejorada**: Los filtros se mantienen entre sesiones
- **Persistencia inteligente**: Solo guarda filtros relevantes, no estados de UI
- **Manejo de errores**: Fallback graceful si localStorage falla
- **Transparente**: El usuario no nota la persistencia, simplemente funciona

## 📊 Métricas de Calidad

- **Bundle size**: Optimizado con Vite
- **Performance**: Componentes memoizados con `useCallback`
- **Accessibility**: Atributos ARIA implementados
- **Responsive**: Funciona en todos los dispositivos
- **Type safety**: 100% TypeScript coverage

## 🔮 Posibles Mejoras Futuras

1. **Testing**: Implementar Jest + React Testing Library para mayor confiabilidad
2. **Estado global**: Considerar Zustand si el estado se vuelve más complejo
3. **Animaciones**: Añadir transiciones suaves con Framer Motion
4. **PWA**: Convertir en Progressive Web App para mejor experiencia móvil
5. **Internacionalización**: Soporte multiidioma con react-i18next
6. **Caching**: Implementar React Query para mejor manejo de datos

## 📝 Conclusión

Este ejercicio técnico demuestra mi capacidad para:

- **Arquitectura escalable**: Implementé una estructura modular que facilita el crecimiento del proyecto
- **Código limpio**: Mantuve buenas prácticas de React y TypeScript en todo el código
- **Diseño responsive**: Creé una interfaz que funciona perfectamente en móviles y desktop
- **Gestión de estado**: Elegí Context API porque necesitaba sincronización real entre componentes
- **Persistencia inteligente**: Implementé localStorage para mantener filtros entre sesiones
- **Sistema de diseño**: Implementé tokens CSS consistentes para mantener la coherencia visual
- **Experiencia de usuario**: Creé filtros intuitivos con persistencia automática y navegación fluida

El proyecto está listo para producción y puede escalarse fácilmente agregando nuevas funcionalidades siguiendo los patrones establecidos. Cada decisión técnica fue tomada considerando el contexto específico del proyecto y las necesidades de los usuarios.