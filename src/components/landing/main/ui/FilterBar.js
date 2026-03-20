'use client';

import { useState, useEffect } from 'react';
import { FilterDropdown } from './FilterDropdown';
import useFilterCatalogStore from '../../../../store/filterCatalog';

export default function FilterBar() {
  const { color, category, setColor, setCategory } = useFilterCatalogStore();

  const [colorOptions, setColorOptions] = useState([
    { id: 'negro', label: 'Negro', checked: false },
    { id: 'blanco', label: 'Blanco', checked: false },
    { id: 'azul', label: 'Azul', checked: false },
    { id: 'beige', label: 'Beige', checked: true },
    { id: 'cafe', label: 'Café', checked: false },
  ]);

  const [categoryOptions, setCategoryOptions] = useState([
    { id: 'camisetas', label: 'Camisetas', checked: true },
    { id: 'pantalones', label: 'Pantalones', checked: false },
    { id: 'sudaderas', label: 'Sudaderas', checked: false },
    { id: 'suertes', label: 'Suertes', checked: true },
    { id: 'gorras', label: 'Gorras', checked: false },
  ]);

  useEffect(() => {
    setColor(colorOptions.filter(opt => opt.checked));
  }, [colorOptions]);

  useEffect(() => {
    setCategory(categoryOptions.filter(opt => opt.checked));
  }, [categoryOptions]);

  console.log(color, category)

  return (
    <section className="w-full py-2">
      <div className="flex items-center justify-between">
        <FilterDropdown 
            title="COLOR" 
            options={colorOptions} 
            setOptions={setColorOptions} 
            align="left"
        />
        
        <FilterDropdown 
            title="CLASIFICAR POR" 
            options={categoryOptions} 
            setOptions={setCategoryOptions} 
            align="right"
        />
      </div>
    </section>
  );
}
