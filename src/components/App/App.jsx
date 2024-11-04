import '@/components/App/App.scss';

import { useRef } from 'react';
import { Route } from 'react-router-dom';

import Router from '@/components/features/Router';
import Header from '@/components/shared/Header';
import Toaster from '@/components/shared/Toaster/Toaster';
import TermsAndConditions from '@/components/system-pages/TermsAndConditions';
import HomeLayout from '@/modules/home/HomeLayout';

const App = () => {
  const headerRef = useRef();
  return (
    <>
      <Toaster />
      <div className="app">
        <div className="container">
          <div className="app__header-layout-wrapper">
            <Header ref={headerRef} />
            <div className="app__layout-wrapper">
              <Router>
                <Route
                  exact
                  path="/"
                  element={
                    <div className="app__home-layout-wrapper">
                      <div className="app__home-layout-inner">
                        <HomeLayout headerRef={headerRef} />
                      </div>
                    </div>
                  }
                />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              </Router>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
