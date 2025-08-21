import React from 'react';
import logo from '../assets/logo5.png'; // Logoyu Sidebar'a import ediyoruz

function Sidebar({ permissions, onFormSelect }) {
  return (
    <div className="sidebar">
      <div> {/* Bu sarmalayıcı div, logoyu aşağıya itmek için */}
        <h2>İşlemler</h2>
        <ul>
          {Array.isArray(permissions) && permissions.map(perm => (
            <li key={perm.permissionId} onClick={() => onFormSelect(perm.formKey)}>
              {perm.formDisplayName}
            </li>
          ))}
        </ul>
      </div>
      
      {/* --- YENİ LOGO ALANI BURADA --- */}
      <div className="sidebar-logo-container">
        <img src={logo} alt="Şirket Logosu" className="sidebar-logo" />
      </div>
      {/* ------------------------------- */}
    </div>
  );
}

export default Sidebar;