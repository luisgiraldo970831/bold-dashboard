import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Panel de control principal
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards de métricas */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Total de Transacciones
            </h3>
            <p className="text-3xl font-bold text-primary">
              $0
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Transacciones del Mes
            </h3>
            <p className="text-3xl font-bold text-accent">
              0
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Promedio Diario
            </h3>
            <p className="text-3xl font-bold text-success">
              $0
            </p>
          </div>
        </div>

        {/* Sección principal de contenido */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Transacciones Recientes
            </h2>
            <div className="text-center py-12 text-gray-500">
              <p>No hay transacciones para mostrar</p>
              <p className="text-sm mt-2">
                Las transacciones aparecerán aquí cuando estén disponibles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
