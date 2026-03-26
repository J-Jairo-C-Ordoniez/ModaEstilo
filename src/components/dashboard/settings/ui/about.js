'use client';

import { useState, useEffect } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Save, Upload, Image as ImageIcon, AlignLeft, Smartphone } from 'lucide-react';

export default function AboutForm({ initialData, saveAction, onNotify }) {
  const [loading, setLoading] = useState(false);
  const [textParagraphs, setTextParagraphs] = useState('');
  const [formData, setFormData] = useState({
    contact: initialData?.contact || '',
    logo: initialData?.logo || '',
    photo: initialData?.photo || ''
  });

  useEffect(() => {
    if (Array.isArray(initialData?.content)) {
      setTextParagraphs(initialData.content.join('\n\n'));
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const contentArray = textParagraphs
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const result = await saveAction({ ...formData, content: contentArray });
    onNotify(result.error ? 'error' : 'success', result.error || 'Información actualizada');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-10 text-left animate-in fade-in duration-500">
      {/* Header con estilo Minimal */}
      <header className="border-b border-primary/5 pb-6">
        <h3 className="text-xl font-bold text-primary tracking-tight">Identidad del Negocio</h3>
        <p className="text-sm text-secondary/60 mt-1">Configura la presencia visual y narrativa de tu marca.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* COLUMNA IZQUIERDA: Configuración y Texto */}
        <div className="lg:col-span-7 space-y-8">

          {/* Input de Contacto */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 ml-1">
              <Smartphone className="h-4 w-4 text-secondary/40" />
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">WhatsApp de Contacto</label>
            </div>
            <input
              type="text"
              placeholder="Ej: 310..."
              className="w-full bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-secondary/30"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>

          {/* Editor de Historia */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 ml-1">
              <AlignLeft className="h-4 w-4 text-secondary/40" />
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Nuestra Historia / Contenido</label>
            </div>
            <textarea
              rows={10}
              placeholder="Escribe los párrafos de tu marca aquí..."
              className="w-full bg-primary/5 border border-primary/10 rounded-xl p-6 text-sm leading-relaxed text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none shadow-inner"
              value={textParagraphs}
              onChange={(e) => setTextParagraphs(e.target.value)}
            />
            <div className="flex justify-between px-2">
              <p className="text-[9px] text-secondary/40 italic uppercase tracking-wider">Un salto de línea = Un párrafo nuevo</p>
              <p className="text-[9px] text-primary/40 font-bold uppercase tracking-widest">{textParagraphs.split('\n').filter(p => p.trim()).length} Párrafos</p>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Imágenes (El corazón visual) */}
        <div className="lg:col-span-5 space-y-8">

          {/* Logo Section */}
          <UploadSection
            label="Logo de Marca"
            value={formData.logo}
            preset="landing"
            aspect="aspect-square"
            onSuccess={(url) => setFormData({ ...formData, logo: url })}
          />

          {/* Portada Section */}
          <UploadSection
            label="Imagen de Portada / Banner"
            value={formData.photo}
            preset="landing"
            aspect="aspect-video"
            onSuccess={(url) => setFormData({ ...formData, photo: url })}
          />

        </div>
      </div>

      {/* Footer de Acción */}
      <div className="pt-6 border-t border-primary/5 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="group bg-primary text-foreground px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-3 disabled:opacity-50 active:scale-95"
        >
          {loading ? (
            <span className="animate-pulse">Guardando...</span>
          ) : (
            <>
              <Save className="h-4 w-4 group-hover:scale-110 transition-transform" />
              Actualizar Información
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/**
 * Sub-componente para los bloques de carga de imagen.
 * Prioriza la visualización de la imagen sobre el botón.
 */
function UploadSection({ label, value, preset, onSuccess, aspect }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary ml-1">{label}</label>

      <div className={`relative group w-full ${aspect} bg-primary/5 border-2 border-dashed border-primary/10 rounded-xl overflow-hidden transition-all hover:border-primary/30 shadow-sm`}>

        {/* Preview de la imagen (Grande) */}
        {value ? (
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary/30">
            <ImageIcon className="h-10 w-10 mb-2 stroke-[1px]" />
            <span className="text-[10px] font-medium tracking-tighter uppercase">Sin archivo seleccionado</span>
          </div>
        )}

        {/* Overlay del botón (Solo aparece al hacer hover o si no hay imagen) */}
        <div className={`absolute inset-0 bg-primary/90 flex flex-col items-center justify-center transition-all duration-300 ${value ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          <CldUploadWidget
            uploadPreset={preset}
            onSuccess={(result) => onSuccess(result.info.secure_url)}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="bg-foreground text-primary px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-2xl transform transition-transform active:scale-90"
              >
                {value ? 'Reemplazar Imagen' : 'Subir Archivo'}
              </button>
            )}
          </CldUploadWidget>
          <p className="text-[8px] text-foreground/50 mt-4 uppercase font-bold tracking-tighter">Cloudinary Secure Upload</p>
        </div>
      </div>
    </div>
  );
}