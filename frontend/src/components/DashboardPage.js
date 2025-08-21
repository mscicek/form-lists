import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import SiparisYonetimiFormu from './forms/SiparisYonetimiFormu'; 
import EtiketKontrolFormu from './forms/EtiketKontrolFormu';
import PersonelYonetimiFormu from './forms/PersonelYonetimiFormu';
import FinansMuhasebeFormu from './forms/FinansMuhasebeFormu';

function DashboardPage() {
  const { user } = useAuth();
  const [selectedForm, setSelectedForm] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(`https://localhost:7070/api/permissions/${user.id}`);
        console.log("Backend'den gelen permission verileri:", response.data);
        
        // Backend'den gelen verilere yeni formları ekle
        const backendPermissions = response.data || [];
        const newPermissions = [
          { permissionId: 3, formKey: 'PersonnelManagement', formDisplayName: 'Personel Yönetimi' },
          { permissionId: 4, formKey: 'FinanceAccounting', formDisplayName: 'Finans & Muhasebe' }
        ];
        
        // Mevcut permission'ları kontrol et ve eksik olanları ekle
        const allPermissions = [...backendPermissions];
        
        // Yeni formları ekle (eğer yoksa)
        newPermissions.forEach(newPerm => {
          const exists = allPermissions.find(p => p.formKey === newPerm.formKey);
          if (!exists) {
            allPermissions.push(newPerm);
          }
        });
        
        console.log("Birleştirilmiş permission verileri:", allPermissions);
        setPermissions(allPermissions);
      } catch (err) {
        console.log("Backend'den permission verileri alınamadı, geçici veriler kullanılıyor.");
        const tempPermissions = [
          { permissionId: 1, formKey: 'LabelInputControl', formDisplayName: 'Etiket Kontrol Formu' },
          { permissionId: 2, formKey: 'OrderManagement', formDisplayName: 'Sipariş Yönetimi' },
          { permissionId: 3, formKey: 'PersonnelManagement', formDisplayName: 'Personel Yönetimi' },
          { permissionId: 4, formKey: 'FinanceAccounting', formDisplayName: 'Finans & Muhasebe' }
        ];
        setPermissions(tempPermissions);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPermissions();
  }, [user]);

  const handleFormSelect = (formKey) => {
    setSelectedForm(formKey);
  };
  
  const getSelectedFormName = () => {
    const selectedPermission = permissions.find(p => p.formKey === selectedForm);
    return selectedPermission ? selectedPermission.formDisplayName : "Ana Sayfa";
  };

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case 'LabelInputControl':
        return <EtiketKontrolFormu />;
      case 'OrderManagement':
        return <SiparisYonetimiFormu />;
      case 'PersonnelManagement':
        return <PersonelYonetimiFormu />;
      case 'FinanceAccounting':
        return <FinansMuhasebeFormu />;
      default:
        return <h2>Lütfen soldaki menüden bir işlem seçiniz.</h2>;
    }
  };

  if (!user) return <Navigate to="/" />;

  if (isLoading) return <div>Yükleniyor...</div>;

  if (error) return <div>Hata: {error}</div>;

  return (
    <div className="dashboard-container">
      <Sidebar permissions={permissions} onFormSelect={handleFormSelect} />
      <div className="content-wrapper">
        <header className="dashboard-header">
          <div className="header-title">
            <h3>{getSelectedFormName()}</h3>
          </div>
          <div className="user-info">
            <span>Hoş geldiniz, {user.fullName}</span>
          </div>
        </header>
        
        <main className="main-content">
          <div className="content-area">
            {renderSelectedForm()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;