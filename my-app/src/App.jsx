import React from 'react';
import Header from './componentes/folderHeader/header';
import './componentes/folderFooter/footer.tsx'
import Footer from './componentes/folderFooter/footer.tsx';
import Card from './componentes/folderCard/card.tsx';
import Search from './componentes/folderSearch/search.tsx';
import { useSelector } from 'react-redux';
import LoginUser from './componentes/FolderLoginUser/loginUser.jsx';

const App = () => { 
  const user = useSelector((state) => state.user); // Obtener el usuario del estado de Redux

  return (
    <>
      <header>
        <Header />
        {/* Si no hay usuario, mostrar el formulario de inicio de sesión */}
        {user ? <p>Bienvenido, {user.name}!</p> : <LoginUser />}
      </header>
      <main>
        <Search />
        <Card />
      </main>
      <footer className='contenedorPadre'>
        <Footer />
      </footer>
    </>
  );
}

export default App;
