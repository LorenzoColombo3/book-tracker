import React from 'react';
import { FormGroup, Input } from 'reactstrap';

//Componente UI che permette all'utente di switchare tra la modalità di visualizzazione a griglia e a elenco

const ViewModeToggle = ({ viewMode, setViewMode }) => {
  const toggleView = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  return (
    <div className="view-switch-container">
      <span className={viewMode === 'grid' ? 'text-primary' : 'text-muted'}>Griglia</span>
      <FormGroup switch className="mb-0 mx-2">
        <Input 
          type="switch" 
          checked={viewMode === 'list'} 
          onChange={toggleView} 
          style={{ cursor: 'pointer' }}
        />
      </FormGroup>
      <span className={viewMode === 'list' ? 'text-primary' : 'text-muted'}>Elenco</span>
    </div>
  );
};

export default ViewModeToggle;