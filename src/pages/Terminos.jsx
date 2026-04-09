import React from 'react';

export default function Terminos() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Términos y Condiciones</h1>
        <p className="text-sm text-slate-500 mb-8">Última actualización: Abril de 2026</p>
        
        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Aceptación de los Términos</h2>
            <p>Al acceder y utilizar el sitio web de FGSTOREEC, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá utilizar nuestros servicios.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Productos y Disponibilidad</h2>
            <p>FGSTOREEC se especializa en la venta de vehículos a escala y accesorios. Todos los pedidos están sujetos a la disponibilidad de los productos. Nos reservamos el derecho de descontinuar cualquier producto en cualquier momento.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Precios y Pagos</h2>
            <p>Todos los precios mostrados están en dólares estadounidenses (USD). Ofrecemos la opción de pago contraentrega exclusivo para la ciudad de Quito. Para envíos a otras provincias del Ecuador, el pago debe realizarse por anticipado mediante transferencia o depósito bancario.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Envíos y Entregas</h2>
            <p>Realizamos envíos seguros a todo el Ecuador. Los tiempos de entrega son estimados y pueden variar dependiendo del servicio de mensajería y la ubicación del destino. FGSTOREEC no se hace responsable por demoras causadas por terceros.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Devoluciones y Garantías</h2>
            <p>Se aceptarán devoluciones únicamente si el producto entregado presenta defectos de fábrica o daños ocurridos durante el transporte, reportados dentro de las primeras 24 horas tras la recepción del producto. El producto debe devolverse en su empaque original.</p>
          </section>
        </div>
      </div>
    </div>
  );
}