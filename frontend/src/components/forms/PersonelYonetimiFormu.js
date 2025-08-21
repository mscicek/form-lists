import React, { useState } from 'react';
import './PersonelYonetimiFormu.css';

function PersonelYonetimiFormu() {
  // Departman verileri
  const [departmanlar] = useState([
    { id: 1, ad: 'Üretim', yonetici: 'Ahmet Yılmaz' },
    { id: 2, ad: 'Kalite Kontrol', yonetici: 'Fatma Demir' },
    { id: 3, ad: 'Satış', yonetici: 'Mehmet Kaya' },
    { id: 4, ad: 'Muhasebe', yonetici: 'Ayşe Özkan' },
    { id: 5, ad: 'İnsan Kaynakları', yonetici: 'Ali Çelik' },
    { id: 6, ad: 'Bilgi Teknolojileri', yonetici: 'Zeynep Arslan' }
  ]);

  // Pozisyon verileri
  const [pozisyonlar] = useState([
    { id: 1, ad: 'Üretim Operatörü', departman: 'Üretim', maas: 8500 },
    { id: 2, ad: 'Kalite Kontrol Uzmanı', departman: 'Kalite Kontrol', maas: 9500 },
    { id: 3, ad: 'Satış Temsilcisi', departman: 'Satış', maas: 8000 },
    { id: 4, ad: 'Muhasebe Uzmanı', departman: 'Muhasebe', maas: 10000 },
    { id: 5, ad: 'İK Uzmanı', departman: 'İnsan Kaynakları', maas: 11000 },
    { id: 6, ad: 'Yazılım Geliştirici', departman: 'Bilgi Teknolojileri', maas: 15000 },
    { id: 7, ad: 'Üretim Sorumlusu', departman: 'Üretim', maas: 12000 },
    { id: 8, ad: 'Satış Müdürü', departman: 'Satış', maas: 18000 }
  ]);

  // Vardiya verileri
  const [vardiyalar] = useState([
    { id: 1, ad: 'Sabah Vardiyası', baslangic: '08:00', bitis: '16:00' },
    { id: 2, ad: 'Akşam Vardiyası', baslangic: '16:00', bitis: '00:00' },
    { id: 3, ad: 'Gece Vardiyası', baslangic: '00:00', bitis: '08:00' },
    { id: 4, ad: 'Esnek Çalışma', baslangic: '09:00', bitis: '18:00' }
  ]);

  // Form state'leri
  const [activeTab, setActiveTab] = useState('personel-kayit');
  const [personelData, setPersonelData] = useState({
    tcNo: '',
    ad: '',
    soyad: '',
    dogumTarihi: '',
    telefon: '',
    email: '',
    adres: '',
    departmanId: '',
    pozisyonId: '',
    iseBaslamaTarihi: '',
    maas: '',
    vardiyaId: '',
    durum: 'aktif'
  });

  const [izinData, setIzinData] = useState({
    personelId: '',
    izinTuru: 'yillik',
    baslangicTarihi: '',
    bitisTarihi: '',
    aciklama: ''
  });

  // Sahte personel listesi
  const [personelListesi] = useState([
    { id: 1, tcNo: '12345678901', ad: 'Ahmet', soyad: 'Yılmaz', departman: 'Üretim', pozisyon: 'Üretim Operatörü', durum: 'aktif' },
    { id: 2, tcNo: '23456789012', ad: 'Fatma', soyad: 'Demir', departman: 'Kalite Kontrol', pozisyon: 'Kalite Kontrol Uzmanı', durum: 'aktif' },
    { id: 3, tcNo: '34567890123', ad: 'Mehmet', soyad: 'Kaya', departman: 'Satış', pozisyon: 'Satış Temsilcisi', durum: 'izinli' },
    { id: 4, tcNo: '45678901234', ad: 'Ayşe', soyad: 'Özkan', departman: 'Muhasebe', pozisyon: 'Muhasebe Uzmanı', durum: 'aktif' }
  ]);

  // Personel kaydet
  const handlePersonelKaydet = () => {
    if (!personelData.tcNo || !personelData.ad || !personelData.soyad) {
      alert('Lütfen zorunlu alanları doldurunuz!');
      return;
    }

    console.log('Personel verileri:', personelData);
    alert('Personel başarıyla kaydedildi!');
    
    // Formu temizle
    setPersonelData({
      tcNo: '', ad: '', soyad: '', dogumTarihi: '', telefon: '', email: '', adres: '',
      departmanId: '', pozisyonId: '', iseBaslamaTarihi: '', maas: '', vardiyaId: '', durum: 'aktif'
    });
  };

  // İzin kaydet
  const handleIzinKaydet = () => {
    if (!izinData.personelId || !izinData.baslangicTarihi || !izinData.bitisTarihi) {
      alert('Lütfen zorunlu alanları doldurunuz!');
      return;
    }

    console.log('İzin verileri:', izinData);
    alert('İzin talebi başarıyla kaydedildi!');
    
    setIzinData({
      personelId: '', izinTuru: 'yillik', baslangicTarihi: '', bitisTarihi: '', aciklama: ''
    });
  };

  // Seçili departmana göre pozisyonları filtrele
  const filteredPozisyonlar = personelData.departmanId 
    ? pozisyonlar.filter(p => p.departman === departmanlar.find(d => d.id === parseInt(personelData.departmanId))?.ad)
    : [];

  return (
    <div className="personel-formu-container">
      <h3>👥 Personel Yönetimi Sistemi</h3>
      
      {/* Tab Menüsü */}
      <div className="tab-menu">
        <button 
          className={`tab-button ${activeTab === 'personel-kayit' ? 'active' : ''}`}
          onClick={() => setActiveTab('personel-kayit')}
        >
          👤 Personel Kayıt
        </button>
        <button 
          className={`tab-button ${activeTab === 'izin-takip' ? 'active' : ''}`}
          onClick={() => setActiveTab('izin-takip')}
        >
          📅 İzin Takibi
        </button>

        <button 
          className={`tab-button ${activeTab === 'personel-listesi' ? 'active' : ''}`}
          onClick={() => setActiveTab('personel-listesi')}
        >
          📋 Personel Listesi
        </button>
      </div>

      {/* Personel Kayıt Formu */}
      {activeTab === 'personel-kayit' && (
        <div className="form-section">
          <h4>👤 Yeni Personel Kaydı</h4>
          
          <div className="form-row">
            <div className="form-group">
              <label>TC Kimlik No *</label>
              <input 
                type="text" 
                value={personelData.tcNo} 
                onChange={(e) => setPersonelData({...personelData, tcNo: e.target.value})}
                className="form-input"
                maxLength="11"
                placeholder="12345678901"
              />
            </div>
            <div className="form-group">
              <label>Ad *</label>
              <input 
                type="text" 
                value={personelData.ad} 
                onChange={(e) => setPersonelData({...personelData, ad: e.target.value})}
                className="form-input"
                placeholder="Ahmet"
              />
            </div>
            <div className="form-group">
              <label>Soyad *</label>
              <input 
                type="text" 
                value={personelData.soyad} 
                onChange={(e) => setPersonelData({...personelData, soyad: e.target.value})}
                className="form-input"
                placeholder="Yılmaz"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Doğum Tarihi</label>
              <input 
                type="date" 
                value={personelData.dogumTarihi} 
                onChange={(e) => setPersonelData({...personelData, dogumTarihi: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Telefon</label>
              <input 
                type="tel" 
                value={personelData.telefon} 
                onChange={(e) => setPersonelData({...personelData, telefon: e.target.value})}
                className="form-input"
                placeholder="0532 123 45 67"
              />
            </div>
            <div className="form-group">
              <label>E-posta</label>
              <input 
                type="email" 
                value={personelData.email} 
                onChange={(e) => setPersonelData({...personelData, email: e.target.value})}
                className="form-input"
                placeholder="ahmet@firma.com"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Adres</label>
            <textarea 
              value={personelData.adres} 
              onChange={(e) => setPersonelData({...personelData, adres: e.target.value})}
              className="form-textarea"
              rows="3"
              placeholder="Tam adres bilgisi..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Departman *</label>
              <select 
                value={personelData.departmanId} 
                onChange={(e) => setPersonelData({...personelData, departmanId: e.target.value, pozisyonId: ''})}
                className="form-select"
              >
                <option value="">Departman Seçiniz...</option>
                {departmanlar.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.ad} (Yönetici: {dept.yonetici})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Pozisyon *</label>
              <select 
                value={personelData.pozisyonId} 
                onChange={(e) => {
                  const pozisyon = pozisyonlar.find(p => p.id === parseInt(e.target.value));
                  setPersonelData({
                    ...personelData, 
                    pozisyonId: e.target.value, 
                    maas: pozisyon ? pozisyon.maas.toString() : ''
                  });
                }}
                className="form-select"
                disabled={!personelData.departmanId}
              >
                <option value="">Pozisyon Seçiniz...</option>
                {filteredPozisyonlar.map(poz => (
                  <option key={poz.id} value={poz.id}>
                    {poz.ad} - {poz.maas.toLocaleString()} TL
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Maaş (TL)</label>
              <input 
                type="number" 
                value={personelData.maas} 
                onChange={(e) => setPersonelData({...personelData, maas: e.target.value})}
                className="form-input"
                placeholder="8500"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>İşe Başlama Tarihi</label>
              <input 
                type="date" 
                value={personelData.iseBaslamaTarihi} 
                onChange={(e) => setPersonelData({...personelData, iseBaslamaTarihi: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Vardiya</label>
              <select 
                value={personelData.vardiyaId} 
                onChange={(e) => setPersonelData({...personelData, vardiyaId: e.target.value})}
                className="form-select"
              >
                <option value="">Vardiya Seçiniz...</option>
                {vardiyalar.map(vardiya => (
                  <option key={vardiya.id} value={vardiya.id}>
                    {vardiya.ad} ({vardiya.baslangic}-{vardiya.bitis})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Durum</label>
              <select 
                value={personelData.durum} 
                onChange={(e) => setPersonelData({...personelData, durum: e.target.value})}
                className="form-select"
              >
                <option value="aktif">Aktif</option>
                <option value="pasif">Pasif</option>
                <option value="izinli">İzinli</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button onClick={handlePersonelKaydet} className="kaydet-button">
              💾 Personeli Kaydet
            </button>
          </div>
        </div>
      )}

      {/* İzin Takibi Formu */}
      {activeTab === 'izin-takip' && (
        <div className="form-section">
          <h4>📅 İzin Talebi Oluştur</h4>
          
          <div className="form-row">
            <div className="form-group">
              <label>Personel *</label>
              <select 
                value={izinData.personelId} 
                onChange={(e) => setIzinData({...izinData, personelId: e.target.value})}
                className="form-select"
              >
                <option value="">Personel Seçiniz...</option>
                {personelListesi.map(personel => (
                  <option key={personel.id} value={personel.id}>
                    {personel.ad} {personel.soyad} - {personel.pozisyon}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>İzin Türü</label>
              <select 
                value={izinData.izinTuru} 
                onChange={(e) => setIzinData({...izinData, izinTuru: e.target.value})}
                className="form-select"
              >
                <option value="yillik">Yıllık İzin</option>
                <option value="hastalik">Hastalık İzni</option>
                <option value="dogum">Doğum İzni</option>
                <option value="babalik">Babalar İçin İzin</option>
                <option value="ucretsiz">Ücretsiz İzin</option>
                <option value="mazeret">Mazeret İzni</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Başlangıç Tarihi *</label>
              <input 
                type="date" 
                value={izinData.baslangicTarihi} 
                onChange={(e) => setIzinData({...izinData, baslangicTarihi: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Bitiş Tarihi *</label>
              <input 
                type="date" 
                value={izinData.bitisTarihi} 
                onChange={(e) => setIzinData({...izinData, bitisTarihi: e.target.value})}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>İzin Açıklaması</label>
            <textarea 
              value={izinData.aciklama} 
              onChange={(e) => setIzinData({...izinData, aciklama: e.target.value})}
              className="form-textarea"
              rows="3"
              placeholder="İzin talebinin detayları..."
            />
          </div>

          <div className="form-actions">
            <button onClick={handleIzinKaydet} className="kaydet-button">
              📅 İzin Talebini Kaydet
            </button>
          </div>
        </div>
      )}

      {/* Personel Listesi */}
      {activeTab === 'personel-listesi' && (
        <div className="form-section">
          <h4>📋 Personel Listesi</h4>
          
          <div className="personel-tablosu">
            <table>
              <thead>
                <tr>
                  <th>TC No</th>
                  <th>Ad Soyad</th>
                  <th>Departman</th>
                  <th>Pozisyon</th>
                  <th>Durum</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {personelListesi.map(personel => (
                  <tr key={personel.id}>
                    <td>{personel.tcNo}</td>
                    <td>{personel.ad} {personel.soyad}</td>
                    <td>{personel.departman}</td>
                    <td>{personel.pozisyon}</td>
                    <td>
                      <span className={`durum-badge ${personel.durum}`}>
                        {personel.durum === 'aktif' ? '✅ Aktif' : 
                         personel.durum === 'izinli' ? '📅 İzinli' : '❌ Pasif'}
                      </span>
                    </td>
                    <td>
                      <button className="action-button edit">✏️</button>
                      <button className="action-button delete">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonelYonetimiFormu; 