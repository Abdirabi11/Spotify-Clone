import {Routes, Route} from 'react-router-dom'
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import AuthCallbackPage from './pages/auth-callback/AuthCallback'
import HomePage from './pages/home/HomePage'
import MainLayout from './layout/MainLayout';
import ChatPage from './pages/chat/ChatPage';
import AlbumPage from './pages/album/AlbumPage';
import AdminPage from './pages/admin/AdminPage';
import { Toaster } from 'react-hot-toast';
import NotFoundPage from './pages/404/NotFoundPage';


const App = () => {
  return (
    <>
    <Routes>
      <Route
				path='/sso-callback'
				element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
			/>
      <Route path="/auth-callback" element={ <AuthCallbackPage/>}/>
      <Route path="/admin" element={ <AdminPage/>}/>
      <Route element={<MainLayout/>}>
        <Route path="/" element={ <HomePage/>}/>
        <Route path="/chat" element={ <ChatPage/>}/>
        <Route path="/albums/:albumId" element={ <AlbumPage/>}/>
        <Route path="*" element={ <NotFoundPage/>}/>
      </Route>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
