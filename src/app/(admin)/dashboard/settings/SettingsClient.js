'use client';

import React, { useState } from 'react';
import { saveAboutUs, savePolicy } from './actions';
import { Save, Info, ShieldCheck, CheckCircle2 } from 'lucide-react';

const inputClass = "w-full px-3 py-2.5 text-sm outline-none transition-all";
const inputStyle = {
  backgroundColor: 'var(--dash-bg-muted)',
  border: '1px solid var(--dash-border)',
  color: 'var(--dash-text)',
  borderRadius: '0.5rem',
};
const textMuted = { color: 'var(--dash-text-muted)' };
const textStrong = { color: 'var(--dash-text-strong)' };
const labelClass = "text-xs font-medium uppercase tracking-wider block mb-1.5";

export function SettingsClient({ initialAboutUs, initialPolicy }) {
  const [activeTab, setActiveTab] = useState('about');
  const [contact, setContact] = useState(initialAboutUs?.contact || '');
  const [logo, setLogo] = useState(initialAboutUs?.logo || '');
  const [photo, setPhoto] = useState(initialAboutUs?.photo || '');
  const [aboutContent, setAboutContent] = useState(
    initialAboutUs?.content ? JSON.stringify(initialAboutUs.content, null, 2) : '{\n  "title": "Sobre nosotros",\n  "description": ""\n}'
  );
  const [policyContent, setPolicyContent] = useState(
    initialPolicy?.content ? JSON.stringify(initialPolicy.content, null, 2) : '{\n  "terms": "..."\n}'
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSaveAboutUs = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    const formData = new FormData();
    formData.append('contact', contact);
    formData.append('logo', logo);
    formData.append('photo', photo);
    formData.append('content', aboutContent);
    const result = await saveAboutUs(formData);
    setMessage(result.error
      ? { type: 'error', text: result.error }
      : { type: 'success', text: 'Información guardada correctamente.' });
    setLoading(false);
  };

  const handleSavePolicy = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    const formData = new FormData();
    formData.append('content', policyContent);
    const result = await savePolicy(formData);
    setMessage(result.error
      ? { type: 'error', text: result.error }
      : { type: 'success', text: 'Políticas guardadas correctamente.' });
    setLoading(false);
  };

  const tabs = [
    { id: 'about', label: 'Nosotros', icon: Info },
    { id: 'policy', label: 'Políticas', icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Tabs sidebar */}
      <div className="w-full md:w-56 flex flex-col gap-1 shrink-0">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); setMessage({ type: '', text: '' }); }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-colors"
            style={activeTab === id
              ? { backgroundColor: 'var(--dash-primary)', color: '#fff' }
              : { color: 'var(--dash-text-muted)' }}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div
        className="flex-1 rounded-xl overflow-hidden"
        style={{ backgroundColor: 'var(--dash-bg-card)', border: '1px solid var(--dash-border)' }}
      >
        {/* Message Banner */}
        {message.text && (
          <div
            className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium"
            style={message.type === 'error'
              ? { backgroundColor: 'var(--dash-danger-subtle)', color: 'var(--dash-danger)', borderBottom: '1px solid var(--dash-border)' }
              : { backgroundColor: 'var(--dash-success-subtle)', color: 'var(--dash-success)', borderBottom: '1px solid var(--dash-border)' }}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {message.text}
          </div>
        )}

        {/* About Us Tab */}
        {activeTab === 'about' && (
          <form onSubmit={handleSaveAboutUs} className="p-6 space-y-5">
            <div>
              <h3 className="text-base font-semibold" style={textStrong}>Información de la Empresa</h3>
              <p className="text-xs mt-1" style={textMuted}>Configura los datos que se muestran en la landing page.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass} style={textMuted}>Teléfono / WhatsApp</label>
                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} className={inputClass} style={inputStyle} maxLength={10} />
              </div>
              <div>
                <label className={labelClass} style={textMuted}>URL del Logo</label>
                <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} className={inputClass} style={inputStyle} placeholder="https://..." />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} style={textMuted}>URL Foto Principal</label>
                <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} className={inputClass} style={inputStyle} placeholder="https://..." />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} style={textMuted}>Contenido (JSON)</label>
                <textarea
                  rows={8}
                  value={aboutContent}
                  onChange={(e) => setAboutContent(e.target.value)}
                  className={inputClass + " font-mono resize-none"}
                  style={inputStyle}
                />
                <p className="text-xs mt-1" style={textMuted}>El contenido debe ser un objeto JSON válido.</p>
              </div>
            </div>
            <div className="flex justify-end pt-2" style={{ borderTop: '1px solid var(--dash-border)', marginTop: '1.5rem' }}>
              <button type="submit" disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                style={{ backgroundColor: 'var(--dash-primary)', color: 'var(--dash-primary-fg)' }}>
                <Save className="h-4 w-4" />
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        )}

        {/* Policy Tab */}
        {activeTab === 'policy' && (
          <form onSubmit={handleSavePolicy} className="p-6 space-y-5">
            <div>
              <h3 className="text-base font-semibold" style={textStrong}>Políticas de la Empresa</h3>
              <p className="text-xs mt-1" style={textMuted}>Actualiza los términos y condiciones mostrados en la plataforma.</p>
            </div>
            <div>
              <label className={labelClass} style={textMuted}>Contenido de Políticas (JSON)</label>
              <textarea
                rows={14}
                value={policyContent}
                onChange={(e) => setPolicyContent(e.target.value)}
                className={inputClass + " font-mono resize-none"}
                style={inputStyle}
              />
              <p className="text-xs mt-1" style={textMuted}>Estructura tus políticas en formato JSON para el renderizado dinámico.</p>
            </div>
            <div className="flex justify-end pt-2" style={{ borderTop: '1px solid var(--dash-border)', marginTop: '1.5rem' }}>
              <button type="submit" disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                style={{ backgroundColor: 'var(--dash-primary)', color: 'var(--dash-primary-fg)' }}>
                <Save className="h-4 w-4" />
                {loading ? 'Guardando...' : 'Guardar Políticas'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
