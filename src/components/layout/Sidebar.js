import React from 'react';
import NuevaMaleta from '../maleta/NuevaMaleta';
import ListadoMaletas from '../maleta/ListadoMaleta';

const Sidebar = () => {
    return ( 
        <aside>
            <h1>Konan <span>sma</span></h1>
            <NuevaMaleta/>
            <div className="productos">
                <h2>Tus Grupos</h2>
                <ListadoMaletas/>
            </div>
        </aside>
     );
}
 
export default Sidebar;