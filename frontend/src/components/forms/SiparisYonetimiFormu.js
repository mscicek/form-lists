import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SiparisFormu.css';

function SiparisYonetimiFormu() {
  // Gerçekçi müşteri verileri
  const [musteriler] = useState([
    { id: 1, ad: 'ABC Tekstil A.Ş.', telefon: '0212 555 0101', email: 'info@abctekstil.com' },
    { id: 2, ad: 'XYZ Konfeksiyon Ltd.', telefon: '0216 444 0202', email: 'siparis@xyzkonfeksiyon.com' },
    { id: 3, ad: 'Moda Dünyası Ticaret', telefon: '0532 333 0303', email: 'iletisim@modadunyasi.com' },
    { id: 4, ad: 'Elite Giyim Sanayi', telefon: '0555 222 0404', email: 'siparis@elitegiyim.com' },
    { id: 5, ad: 'Trend Moda A.Ş.', telefon: '0214 111 0505', email: 'info@trendmoda.com' }
  ]);

  // Gerçekçi ürün verileri
  const [urunler] = useState([
    { id: 1, ad: 'Pamuklu Kumaş - Beyaz', kategori: 'Kumaş', birimFiyat: 45.50, stok: 1500, birim: 'metre' },
    { id: 2, ad: 'Polyester Kumaş - Siyah', kategori: 'Kumaş', birimFiyat: 32.75, stok: 2200, birim: 'metre' },
    { id: 3, ad: 'Denim Kumaş - Mavi', kategori: 'Kumaş', birimFiyat: 78.90, stok: 800, birim: 'metre' },
    { id: 4, ad: 'İpek Kumaş - Kırmızı', kategori: 'Kumaş', birimFiyat: 125.00, stok: 300, birim: 'metre' },
    { id: 5, ad: 'Yün Kumaş - Gri', kategori: 'Kumaş', birimFiyat: 95.25, stok: 600, birim: 'metre' },
    { id: 6, ad: 'Düğme - Beyaz Plastik', kategori: 'Aksesuar', birimFiyat: 0.85, stok: 5000, birim: 'adet' },
    { id: 7, ad: 'Fermuar - Metal', kategori: 'Aksesuar', birimFiyat: 12.50, stok: 1200, birim: 'adet' },
    { id: 8, ad: 'İplik - Polyester', kategori: 'Aksesuar', birimFiyat: 8.75, stok: 3000, birim: 'makara' }
  ]);

  // Form state'leri
  const [seciliMusteri, setSeciliMusteri] = useState('');
  const [yeniMusteriAdi, setYeniMusteriAdi] = useState('');
  const [musteriSecimTipi, setMusteriSecimTipi] = useState('mevcut'); // 'mevcut' veya 'yeni'
  const [siparisTarihi, setSiparisTarihi] = useState(new Date().toISOString().slice(0, 10));
  const [teslimTarihi, setTeslimTarihi] = useState('');
  const [siparisNotu, setSiparisNotu] = useState('');
  const [odemeSekli, setOdemeSekli] = useState('nakit');
  const [siparisSatirlari, setSiparisSatirlari] = useState([
    { id: 1, urunId: '', miktar: 1, birimFiyat: 0, satirToplam: 0 }
  ]);

  // Seçili müşteri bilgileri
  const seciliMusteriBilgileri = musteriler.find(m => m.id === parseInt(seciliMusteri));
  
  // Müşteri seçim tipini değiştir
  const handleMusteriSecimTipiDegisimi = (tip) => {
    setMusteriSecimTipi(tip);
    setSeciliMusteri('');
    setYeniMusteriAdi('');
  };

  // Ürün seçildiğinde fiyatı güncelle
  const handleUrunSecimi = (index, urunId) => {
    const urun = urunler.find(u => u.id === parseInt(urunId));
    const yeniSatirlar = [...siparisSatirlari];
    yeniSatirlar[index] = {
      ...yeniSatirlar[index],
      urunId: urunId,
      birimFiyat: urun ? urun.birimFiyat : 0,
      satirToplam: urun ? urun.birimFiyat * yeniSatirlar[index].miktar : 0
    };
    setSiparisSatirlari(yeniSatirlar);
  };

  // Miktar değiştiğinde satır toplamını güncelle
  const handleMiktarDegisimi = (index, miktar) => {
    const yeniSatirlar = [...siparisSatirlari];
    yeniSatirlar[index] = {
      ...yeniSatirlar[index],
      miktar: parseInt(miktar) || 0,
      satirToplam: yeniSatirlar[index].birimFiyat * (parseInt(miktar) || 0)
    };
    setSiparisSatirlari(yeniSatirlar);
  };

  // Yeni satır ekle
  const handleSiparisSatiriEkle = () => {
    const yeniId = Math.max(...siparisSatirlari.map(s => s.id)) + 1;
    setSiparisSatirlari([...siparisSatirlari, { 
      id: yeniId, 
      urunId: '', 
      miktar: 1, 
      birimFiyat: 0, 
      satirToplam: 0 
    }]);
  };

  // Satır sil
  const handleSatirSil = (index) => {
    if (siparisSatirlari.length > 1) {
      const yeniSatirlar = siparisSatirlari.filter((_, i) => i !== index);
      setSiparisSatirlari(yeniSatirlar);
    }
  };

  // Genel toplam hesapla
  const genelToplam = siparisSatirlari.reduce((toplam, satir) => toplam + satir.satirToplam, 0);
  const kdvOrani = 0.18; // %18 KDV
  const kdvTutari = genelToplam * kdvOrani;
  const kdvDahilToplam = genelToplam + kdvTutari;

  // Sipariş kaydet
  const handleKaydet = () => {
    if (musteriSecimTipi === 'mevcut' && !seciliMusteri) {
      alert('Lütfen müşteri seçiniz!');
      return;
    }

    if (musteriSecimTipi === 'yeni' && !yeniMusteriAdi.trim()) {
      alert('Lütfen yeni müşteri adını giriniz!');
      return;
    }

    if (siparisSatirlari.some(satir => !satir.urunId)) {
      alert('Lütfen tüm ürünleri seçiniz!');
      return;
    }

    const siparisData = {
      musteriTipi: musteriSecimTipi,
      musteriId: musteriSecimTipi === 'mevcut' ? seciliMusteri : null,
      yeniMusteriAdi: musteriSecimTipi === 'yeni' ? yeniMusteriAdi : null,
      siparisTarihi: siparisTarihi,
      teslimTarihi: teslimTarihi,
      siparisNotu: siparisNotu,
      odemeSekli: odemeSekli,
      satirlar: siparisSatirlari,
      genelToplam: genelToplam,
      kdvTutari: kdvTutari,
      kdvDahilToplam: kdvDahilToplam
    };

    console.log('Sipariş verileri:', siparisData);
    alert('Sipariş başarıyla kaydedildi!');
    
    // Formu temizle
    setSeciliMusteri('');
    setYeniMusteriAdi('');
    setMusteriSecimTipi('mevcut');
    setTeslimTarihi('');
    setSiparisNotu('');
    setOdemeSekli('nakit');
    setSiparisSatirlari([{ id: 1, urunId: '', miktar: 1, birimFiyat: 0, satirToplam: 0 }]);
  };

  return (
    <div className="siparis-formu-container">
      <h3>📋 Yeni Sipariş Oluştur</h3>
      
      {/* Müşteri ve Sipariş Bilgileri */}
      <div className="form-section">
        <h4>👤 Müşteri ve Sipariş Bilgileri</h4>
        <div className="form-row">
          <div className="form-group">
            <label>Müşteri Seçimi *</label>
            <div className="musteri-secim-container">
              <div className="musteri-secim-tipi">
                <label>
                  <input 
                    type="radio" 
                    name="musteriSecimTipi" 
                    value="mevcut"
                    checked={musteriSecimTipi === 'mevcut'}
                    onChange={() => handleMusteriSecimTipiDegisimi('mevcut')}
                  />
                  Mevcut Müşteri
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="musteriSecimTipi" 
                    value="yeni"
                    checked={musteriSecimTipi === 'yeni'}
                    onChange={() => handleMusteriSecimTipiDegisimi('yeni')}
                  />
                  Yeni Müşteri
                </label>
              </div>
              
              {musteriSecimTipi === 'mevcut' ? (
                <select 
                  value={seciliMusteri} 
                  onChange={(e) => setSeciliMusteri(e.target.value)}
                  className="form-select"
                >
                  <option value="">Müşteri Seçiniz...</option>
                  {musteriler.map(musteri => (
                    <option key={musteri.id} value={musteri.id}>
                      {musteri.ad}
                    </option>
                  ))}
                </select>
              ) : (
                <input 
                  type="text" 
                  value={yeniMusteriAdi} 
                  onChange={(e) => setYeniMusteriAdi(e.target.value)}
                  className="form-input"
                  placeholder="Yeni müşteri adını giriniz..."
                />
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Sipariş Tarihi</label>
            <input 
              type="date" 
              value={siparisTarihi} 
              onChange={(e) => setSiparisTarihi(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Teslim Tarihi</label>
            <input 
              type="date" 
              value={teslimTarihi} 
              onChange={(e) => setTeslimTarihi(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Seçili Müşteri Bilgileri */}
        {musteriSecimTipi === 'mevcut' && seciliMusteriBilgileri && (
          <div className="musteri-bilgileri">
            <h5>Müşteri Bilgileri:</h5>
            <div className="bilgi-grid">
              <div><strong>Firma:</strong> {seciliMusteriBilgileri.ad}</div>
              <div><strong>Telefon:</strong> {seciliMusteriBilgileri.telefon}</div>
              <div><strong>E-posta:</strong> {seciliMusteriBilgileri.email}</div>
            </div>
          </div>
        )}
        
        {musteriSecimTipi === 'yeni' && yeniMusteriAdi && (
          <div className="musteri-bilgileri">
            <h5>Yeni Müşteri Bilgileri:</h5>
            <div className="bilgi-grid">
              <div><strong>Firma:</strong> {yeniMusteriAdi}</div>
              <div><strong>Not:</strong> Yeni müşteri kaydı oluşturulacak</div>
            </div>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>Ödeme Şekli</label>
            <select 
              value={odemeSekli} 
              onChange={(e) => setOdemeSekli(e.target.value)}
              className="form-select"
            >
              <option value="nakit">Nakit</option>
              <option value="krediKarti">Kredi Kartı</option>
              <option value="havale">Havale/EFT</option>
              <option value="cek">Çek</option>
              <option value="vadeli">Vadeli</option>
            </select>
          </div>
          <div className="form-group full-width">
            <label>Sipariş Notu</label>
            <textarea 
              value={siparisNotu} 
              onChange={(e) => setSiparisNotu(e.target.value)}
              placeholder="Sipariş ile ilgili özel notlarınızı buraya yazabilirsiniz..."
              className="form-textarea"
              rows="3"
            />
          </div>
        </div>
      </div>

      {/* Sipariş Detayları */}
      <div className="form-section">
        <h4>🛍️ Sipariş Detayları</h4>
        <div className="siparis-detay-tablosu">
          {siparisSatirlari.map((satir, index) => (
            <div key={satir.id} className="form-row satir-row">
              <div className="form-group urun-secim">
                <label>Ürün *</label>
                <select 
                  value={satir.urunId} 
                  onChange={(e) => handleUrunSecimi(index, e.target.value)}
                  className="form-select"
                >
                  <option value="">Ürün Seçiniz...</option>
                  {urunler.map(urun => (
                    <option key={urun.id} value={urun.id}>
                      {urun.ad} - {urun.kategori} (Stok: {urun.stok} {urun.birim})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group miktar">
                <label>Miktar</label>
                <input 
                  type="number" 
                  value={satir.miktar} 
                  onChange={(e) => handleMiktarDegisimi(index, e.target.value)}
                  min="1" 
                  className="form-input"
                />
              </div>
              <div className="form-group fiyat">
                <label>Birim Fiyat</label>
                <input 
                  type="text" 
                  value={`${satir.birimFiyat.toFixed(2)} TL`} 
                  readOnly 
                  className="form-input readonly"
                />
              </div>
              <div className="form-group satir-toplam">
                <label>Satır Toplamı</label>
                <input 
                  type="text" 
                  value={`${satir.satirToplam.toFixed(2)} TL`} 
                  readOnly 
                  className="form-input readonly"
                />
              </div>
              <div className="form-group action-buttons">
                <button 
                  onClick={() => handleSatirSil(index)}
                  className="sil-button"
                  disabled={siparisSatirlari.length === 1}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleSiparisSatiriEkle} className="yeni-satir-button">
          ➕ Yeni Satır Ekle
        </button>
      </div>
      
      {/* Toplam Bilgileri */}
      <div className="form-section">
        <h4>💰 Toplam Bilgileri</h4>
        <div className="toplam-bilgileri">
          <div className="toplam-satir">
            <span>Ara Toplam:</span>
            <span>{genelToplam.toFixed(2)} TL</span>
          </div>
          <div className="toplam-satir">
            <span>KDV (%18):</span>
            <span>{kdvTutari.toFixed(2)} TL</span>
          </div>
          <div className="toplam-satir toplam-final">
            <span><strong>Genel Toplam:</strong></span>
            <span><strong>{kdvDahilToplam.toFixed(2)} TL</strong></span>
          </div>
        </div>
      </div>
      
      {/* Aksiyon Butonları */}
      <div className="form-actions">
        <button onClick={handleKaydet} className="kaydet-button">
          💾 Siparişi Kaydet
        </button>
        <button className="iptal-button">
          ❌ İptal
        </button>
      </div>
    </div>
  );
}

export default SiparisYonetimiFormu;