import React from 'react';

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Política de Privacidad</h1>
        <p className="text-sm text-slate-500 mb-8">Última actualización: Abril de 2026</p>
        
        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Recopilación de Información</h2>
            <p>En FGSTOREEC recopilamos información personal que usted nos proporciona directamente, como su nombre, dirección de correo electrónico y dirección de envío cuando se registra, realiza una compra o se comunica con nuestro servicio de atención al cliente.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Uso de la Información</h2>
            <p>Utilizamos la información recopilada para:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Procesar y despachar sus pedidos.</li>
              <li>Enviarle actualizaciones sobre el estado de su compra.</li>
              <li>Mejorar nuestra plataforma y experiencia de usuario.</li>
              <li>Prevenir actividades fraudulentas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Protección de Datos</h2>
            <p>Implementamos medidas de seguridad de nivel empresarial (como la autenticación mediante Supabase Auth) para proteger su información personal contra acceso no autorizado, alteración o destrucción. Sus contraseñas se almacenan de forma encriptada y nunca tenemos acceso a ellas en texto plano.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Compartir Información con Terceros</h2>
            <p>No vendemos, comercializamos ni transferimos a terceros su información personal identificable. Esto no incluye a terceros de confianza que nos asisten en la operación de nuestro sitio web o la realización de nuestros servicios (por ejemplo, empresas de envío), siempre y cuando dichas partes acuerden mantener esta información confidencial.</p>
          </section>
        </div>
      </div>
    </div>
  );
}