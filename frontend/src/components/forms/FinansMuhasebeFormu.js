import React, { useState } from 'react';
import './FinansMuhasebeFormu.css';

function FinansMuhasebeFormu() {
  // Kategori verileri
  const [gelirKategorileri] = useState([
    { id: 1, ad: 'Satış Gelirleri', tip: 'gelir' },
    { id: 2, ad: 'Hizmet Gelirleri', tip: 'gelir' },
    { id: 3, ad: 'Faiz Gelirleri', tip: 'gelir' },
    { id: 4, ad: 'Kira Gelirleri', tip: 'gelir' },
    { id: 5, ad: 'Diğer Gelirler', tip: 'gelir' }
  ]);

  const [giderKategorileri] = useState([
    { id: 1, ad: 'Personel Giderleri', tip: 'gider' },
    { id: 2, ad: 'Malzeme Giderleri', tip: 'gider' },
    { id: 3, ad: 'Enerji Giderleri', tip: 'gider' },
    { id: 4, ad: 'Kira Giderleri', tip: 'gider' },
    { id: 5, ad: 'Vergi Giderleri', tip: 'gider' },
    { id: 6, ad: 'Sigorta Giderleri', tip: 'gider' },
    { id: 7, ad: 'Bakım Onarım', tip: 'gider' },
    { id: 8, ad: 'Diğer Giderler', tip: 'gider' }
  ]);

  // Hesap verileri
  const [hesaplar] = useState([
    { id: 1, ad: 'Nakit', tip: 'varlik', bakiye: 50000 },
    { id: 2, ad: 'Banka Hesabı', tip: 'varlik', bakiye: 150000 },
    { id: 3, ad: 'Alıcılar', tip: 'varlik', bakiye: 75000 },
    { id: 4, ad: 'Satıcılar', tip: 'yukumluluk', bakiye: 45000 },
    { id: 5, ad: 'Kısa Vadeli Krediler', tip: 'yukumluluk', bakiye: 100000 }
  ]);

  // Form state'leri
  const [activeTab, setActiveTab] = useState('gelir-gider');
  const [gelirGiderData, setGelirGiderData] = useState({
    tip: 'gelir',
    kategoriId: '',
    tutar: '',
    tarih: new Date().toISOString().slice(0, 10),
    aciklama: '',
    hesapId: ''
  });

  // Sahte işlem geçmişi
  const [islemGecmisi] = useState([
    { id: 1, tarih: '2024-01-15', tip: 'gelir', kategori: 'Satış Gelirleri', tutar: 25000, aciklama: 'ABC Tekstil satışı' },
    { id: 2, tarih: '2024-01-14', tip: 'gider', kategori: 'Personel Giderleri', tutar: -15000, aciklama: 'Ocak maaş ödemesi' },
    { id: 3, tarih: '2024-01-13', tip: 'gelir', kategori: 'Hizmet Gelirleri', tutar: 8000, aciklama: 'Danışmanlık hizmeti' },
    { id: 4, tarih: '2024-01-12', tip: 'gider', kategori: 'Enerji Giderleri', tutar: -3500, aciklama: 'Elektrik faturası' },
    { id: 5, tarih: '2024-01-11', tip: 'gider', kategori: 'Malzeme Giderleri', tutar: -12000, aciklama: 'Hammadde alımı' }
  ]);



  // Gelir/Gider kaydet
  const handleGelirGiderKaydet = () => {
    if (!gelirGiderData.kategoriId || !gelirGiderData.tutar || !gelirGiderData.hesapId) {
      alert('Lütfen zorunlu alanları doldurunuz!');
      return;
    }

    console.log('Gelir/Gider verileri:', gelirGiderData);
    alert('İşlem başarıyla kaydedildi!');
    
    setGelirGiderData({
      tip: 'gelir',
      kategoriId: '',
      tutar: '',
      tarih: new Date().toISOString().slice(0, 10),
      aciklama: '',
      hesapId: ''
    });
  };



  // Toplam hesaplamalar
  const toplamGelir = islemGecmisi.filter(i => i.tip === 'gelir').reduce((toplam, islem) => toplam + islem.tutar, 0);
  const toplamGider = Math.abs(islemGecmisi.filter(i => i.tip === 'gider').reduce((toplam, islem) => toplam + islem.tutar, 0));
  const netKar = toplamGelir - toplamGider;

  return (
    <div className="finans-formu-container">
      <h3>💰 Finans ve Muhasebe Sistemi</h3>
      
      {/* Tab Menüsü */}
      <div className="tab-menu">
        <button 
          className={`tab-button ${activeTab === 'gelir-gider' ? 'active' : ''}`}
          onClick={() => setActiveTab('gelir-gider')}
        >
          💰 Gelir/Gider Kayıt
        </button>

        <button 
          className={`tab-button ${activeTab === 'rapor' ? 'active' : ''}`}
          onClick={() => setActiveTab('rapor')}
        >
          📈 Finansal Raporlar
        </button>
      </div>

      {/* Gelir/Gider Kayıt Formu */}
      {activeTab === 'gelir-gider' && (
        <div className="form-section">
          <h4>💰 Gelir/Gider Kaydı</h4>
          
          <div className="form-row">
            <div className="form-group">
              <label>İşlem Tipi *</label>
              <select 
                value={gelirGiderData.tip} 
                onChange={(e) => setGelirGiderData({...gelirGiderData, tip: e.target.value, kategoriId: ''})}
                className="form-select"
              >
                <option value="gelir">Gelir</option>
                <option value="gider">Gider</option>
              </select>
            </div>
            <div className="form-group">
              <label>Kategori *</label>
              <select 
                value={gelirGiderData.kategoriId} 
                onChange={(e) => setGelirGiderData({...gelirGiderData, kategoriId: e.target.value})}
                className="form-select"
              >
                <option value="">Kategori Seçiniz...</option>
                {gelirGiderData.tip === 'gelir' 
                  ? gelirKategorileri.map(kat => (
                      <option key={kat.id} value={kat.id}>{kat.ad}</option>
                    ))
                  : giderKategorileri.map(kat => (
                      <option key={kat.id} value={kat.id}>{kat.ad}</option>
                    ))
                }
              </select>
            </div>
            <div className="form-group">
              <label>Tutar (TL) *</label>
              <input 
                type="number" 
                value={gelirGiderData.tutar} 
                onChange={(e) => setGelirGiderData({...gelirGiderData, tutar: e.target.value})}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tarih</label>
              <input 
                type="date" 
                value={gelirGiderData.tarih} 
                onChange={(e) => setGelirGiderData({...gelirGiderData, tarih: e.target.value})}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Hesap *</label>
              <select 
                value={gelirGiderData.hesapId} 
                onChange={(e) => setGelirGiderData({...gelirGiderData, hesapId: e.target.value})}
                className="form-select"
              >
                <option value="">Hesap Seçiniz...</option>
                {hesaplar.map(hesap => (
                  <option key={hesap.id} value={hesap.id}>
                    {hesap.ad} - {hesap.bakiye.toLocaleString()} TL
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Açıklama</label>
            <textarea 
              value={gelirGiderData.aciklama} 
              onChange={(e) => setGelirGiderData({...gelirGiderData, aciklama: e.target.value})}
              className="form-textarea"
              rows="3"
              placeholder="İşlem detayları..."
            />
          </div>

          <div className="form-actions">
            <button onClick={handleGelirGiderKaydet} className="kaydet-button">
              💾 İşlemi Kaydet
            </button>
          </div>
        </div>
      )}



      {/* Finansal Raporlar */}
      {activeTab === 'rapor' && (
        <div className="form-section">
          <h4>📈 Finansal Raporlar</h4>
          
          {/* Özet Kartları */}
          <div className="ozet-kartlari">
            <div className="ozet-kart gelir">
              <h5>💰 Toplam Gelir</h5>
              <div className="tutar">{toplamGelir.toLocaleString()} TL</div>
            </div>
            <div className="ozet-kart gider">
              <h5>💸 Toplam Gider</h5>
              <div className="tutar">{toplamGider.toLocaleString()} TL</div>
            </div>
            <div className="ozet-kart kar">
              <h5>📊 Net Kar/Zarar</h5>
              <div className={`tutar ${netKar >= 0 ? 'pozitif' : 'negatif'}`}>
                {netKar >= 0 ? '+' : ''}{netKar.toLocaleString()} TL
              </div>
            </div>
          </div>

          {/* İşlem Geçmişi */}
          <div className="islem-gecmisi">
            <h5>📋 Son İşlemler</h5>
            <div className="islem-tablosu">
              <table>
                <thead>
                  <tr>
                    <th>Tarih</th>
                    <th>Tip</th>
                    <th>Kategori</th>
                    <th>Tutar</th>
                    <th>Açıklama</th>
                  </tr>
                </thead>
                <tbody>
                  {islemGecmisi.map(islem => (
                    <tr key={islem.id}>
                      <td>{islem.tarih}</td>
                      <td>
                        <span className={`tip-badge ${islem.tip}`}>
                          {islem.tip === 'gelir' ? '💰 Gelir' : '💸 Gider'}
                        </span>
                      </td>
                      <td>{islem.kategori}</td>
                      <td className={islem.tutar >= 0 ? 'pozitif' : 'negatif'}>
                        {islem.tutar >= 0 ? '+' : ''}{islem.tutar.toLocaleString()} TL
                      </td>
                      <td>{islem.aciklama}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


        </div>
      )}
    </div>
  );
}

export default FinansMuhasebeFormu; 