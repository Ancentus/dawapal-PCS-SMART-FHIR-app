import './App.css';
import { useState } from 'react';
import PatientData from './components/Patient';

import FHIR from 'fhirclient';

function App() {
  const [fhirClient, setFhirClient] = useState(null);
  // const [fhirServerUrl, setFhirServerUrl] = useState(null);
  //const [patientId, setPatientId] = useState(null);

  async function connection() {
    console.log('clicked');
    const client = FHIR.client('http://hapi.fhir.org/baseDstu3');
    setFhirClient(client);
    // setFhirServerUrl('http://hapi.fhir.org/baseDstu3');

    const test = client.request('Patient/1215443');
    console.log(test);
  }

  // function handlePatientId(e) {
  //   setPatientId(e.target.value.trim());
  //   console.log(patientId);
  // }

  if (!fhirClient) {
    return (
      <div className='conncetion'>
        <p>Conncect to FHIR server</p>
        <button onClick={connection}>Connect</button>
      </div>
    );
  }

  // if (fhirClient) {
  //   return (
  //     <div>
  //       <p>Connection Succesful...</p>
  //       <form>
  //         <label htmlFor='patientId'>Enter Patient ID:</label>
  //         <input type='text' onChange={handlePatientId} />
  //       </form>
  //     </div>
  //   );
  // }
  // if (patientId) {
  //   console.log('hello');
  return (
    <div className='App'>
      <PatientData
        fhirClient={fhirClient}
        // fhirServerUrl={fhirServerUrl}
        patientId='525AFD34-2D55-45C7-A445-8C1FAFFCEF7A'
      />
    </div>
  );
  //}
}

export default App;
