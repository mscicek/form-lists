import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './EtiketKontrolFormu.css';

const KONTROL_LISTESI = [
    "Ambalajlama ve işaretleme şartnameye uygun mu?",
    "Renk ve dizayn şahit numuneye uygun mu?",
    "Yazı ve işaretler şahit numuneye uygun mu?",
    "Renk kayması var mı?",
    "Barkod okunabiliyor mu?",
    "Etiket kesimi düzgün ve çapaksız mı?",
    "Etiketler birbirinden kolay ayrılabilir özellikte mi?",
    "Tedarikçi analiz raporunu göndermiş mi?",
    "Etiket ebatları toleranslar içerisinde mi?",
    "Bıçak izi ve eğim açısı referans ile aynı mı?",
    "Etiket dış ve ambalajında yırtık,deformasyon var mı?",
    "Etiket kalınlığı toleranslar içerisinde mi?",
    "Etiket gramajı nedir?",
    "Etiketlerde herhangi bir olumsuz koku var mı?",
    "Boya çıkma testi sonucu boya çıkıyor mu?",
    "Etiketler nemli mi?",
    "Farklı ürün karmaşası var mı?",
    "Gelen etiketlerin adeti irsaliyedeki adet ile uyumlu mu?",
    "Marullama,kavisleme,katlanma var mı?",
];

const createInitialDetaylar = () => {
    return KONTROL_LISTESI.map(soru => ({
        kontrolOzelligi: soru, olcumSonucu: '', kabulKriteriEvetMi: false,
        tolerans: '', sonuc: 'Kabul', kontrolSorumlusu: '',
    }));
};

function EtiketKontrolFormu() {
    const { user } = useAuth();
    const initialHeaderState = {
        tarih: new Date().toISOString().slice(0, 10),
        irsaliyeNo: '', tedarikciAdi: '', urunAdi: '', adet: 0
    };

    const [headerData, setHeaderData] = useState(initialHeaderState);
    const [detaylar, setDetaylar] = useState(createInitialDetaylar());
    const [isSaving, setIsSaving] = useState(false);

    const handleHeaderChange = (e) => {
        const { name, value } = e.target;
        setHeaderData(prev => ({ ...prev, [name]: value }));
    };

    const handleDetayChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const yeniDetaylar = [...detaylar];
        yeniDetaylar[index][name] = type === 'checkbox' ? checked : value;
        setDetaylar(yeniDetaylar);
    };

    const handleKaydet = async () => {
        if (!headerData.irsaliyeNo || !headerData.tedarikciAdi || !headerData.urunAdi || !headerData.adet) {
            alert("Lütfen üst bölümdeki tüm alanları doldurunuz.");
            return;
        }
        setIsSaving(true);
        const formDataToSubmit = {
            tarih: headerData.tarih, irsaliyeNo: headerData.irsaliyeNo,
            tedarikciAdi: headerData.tedarikciAdi, urunAdi: headerData.urunAdi,
            adet: parseInt(headerData.adet, 10) || 0,
            olusturanKullaniciId: user.id,
            detaylar: detaylar,
        };
        try {
            const response = await axios.post('https://localhost:7070/api/etiketkontrol', formDataToSubmit);
            alert(`Form başarıyla kaydedildi! Veritabanı ID: ${response.data.formId}`);
            setHeaderData(initialHeaderState);
            setDetaylar(createInitialDetaylar());
        } catch (error) {
            console.error("Kayıt sırasında hata:", error.response || error);
            // Backend'den gelen detaylı InnerException mesajını göstermeye çalış
            const errorMessage = error.response?.data?.includes("İç Hata:") 
                ? error.response.data 
                : "Form kaydedilirken bir hata oluştu. Lütfen girdiğiniz verileri kontrol edin.";
            alert(errorMessage);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="etiket-form-container">
            <h2>Etiket Girdi Kontrol Formu</h2>
            <div className="form-header">
                <div className="form-group">
                    <label>Tarih</label>
                    <input type="date" name="tarih" value={headerData.tarih} onChange={handleHeaderChange} />
                </div>
                <div className="form-group">
                    <label>İrsaliye No</label>
                    <input type="text" name="irsaliyeNo" value={headerData.irsaliyeNo} onChange={handleHeaderChange} maxLength="50" />
                </div>
                <div className="form-group">
                    <label>Tedarikçi Adı</label>
                    <input type="text" name="tedarikciAdi" value={headerData.tedarikciAdi} onChange={handleHeaderChange} maxLength="200" />
                </div>
                 <div className="form-group">
                    <label>Ürün Adı</label>
                    <input type="text" name="urunAdi" value={headerData.urunAdi} onChange={handleHeaderChange} maxLength="200" />
                </div>
                <div className="form-group">
                    <label>Adet</label>
                    <input type="number" name="adet" value={headerData.adet} onChange={handleHeaderChange} />
                </div>
            </div>

            <table className="kontrol-tablosu">
                <thead>
                    <tr>
                        <th className="col-ozellik">Kontrol Edilebilecek Özellikler</th>
                        <th className="col-sonuc">Ölçüm Sonucu</th>
                        <th className="col-kriter">Kabul Kriterleri (E/H)</th>
                        <th className="col-tolerans">Tolerans</th>
                        <th className="col-ksr">K/ŞK/R</th>
                        <th className="col-sorumlu">Kontrol Sorumlusu</th>
                    </tr>
                </thead>
                <tbody>
                    {detaylar.map((detay, index) => (
                        <tr key={index}>
                            <td className="sabit-ozellik">{detay.kontrolOzelligi}</td>
                            <td><input type="text" name="olcumSonucu" value={detay.olcumSonucu} onChange={(e) => handleDetayChange(index, e)} maxLength="100" /></td>
                            <td style={{ textAlign: 'center' }}><input type="checkbox" name="kabulKriteriEvetMi" checked={detay.kabulKriteriEvetMi} onChange={(e) => handleDetayChange(index, e)} /></td>
                            <td><input type="text" name="tolerans" value={detay.tolerans} onChange={(e) => handleDetayChange(index, e)} maxLength="50" /></td>
                            <td>
                                <select name="sonuc" value={detay.sonuc} onChange={(e) => handleDetayChange(index, e)}>
                                    <option value="Kabul">Kabul</option>
                                    <option value="Şartlı Kabul">Şartlı Kabul</option>
                                    <option value="Ret">Ret</option>
                                </select>
                            </td>
                            <td><input type="text" name="kontrolSorumlusu" value={detay.kontrolSorumlusu} onChange={(e) => handleDetayChange(index, e)} maxLength="100" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div className="aciklamalar">
                <h4>Açıklamalar</h4>
                <div className="aciklamalar-grid">
                    <ul>
                        <li><strong>K/ŞK/R:</strong> Kabul / Şartlı Kabul / Ret</li>
                        <li><strong>B.G.U:</strong> Baskı Geliştirme Uzmanı</li>
                        <li><strong>G.K.S:</strong> Girdi Kontrol Sorumlusu</li>
                    </ul>
                    <ul>
                        <li><strong>S.S.Ş:</strong> Stok Sevkiyat Şefi</li>
                        <li><strong>P.U:</strong> Planlama Uzmanı</li>
                    </ul>
                </div>
            </div>

            <div className="form-actions">
                <button onClick={handleKaydet} disabled={isSaving} className="kaydet-button">
                    {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
            </div>
        </div>
    );
}

export default EtiketKontrolFormu;