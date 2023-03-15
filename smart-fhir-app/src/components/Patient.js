import { useEffect, useState } from 'react';
import { getPath } from 'fhirclient/lib/lib';
import Loading from './subcomponents/loading';

function PatientData(props) {
  const [patientData, setPatientdata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [netError, setNetError] = useState(null);

  useEffect(() => {
    async function fetchingData() {
      console.log('hi');
      setIsLoading(true);
      setNetError(null);

      try {
        const client = props.fhirclient;
        const patient = client.request(`Patient/${props.patientId}`);
        setPatientdata(getPath(patient, 'entry.0.resource'));
      } catch (error) {
        setNetError(error.message);
      }

      setIsLoading(false);
    }

    fetchingData();
  }, [props.fhirclient, props.patientId]);

  if (isLoading) {
    return (
      <div className='loading-page'>
        <Loading />
      </div>
    );
  }

  if (netError) {
    return (
      <div className='ErrorPage'>
        <p>Error: {netError}</p>
      </div>
    );
  }

  if (patientData) {
    return (
      <div className='patient-data'>
        <h1>{patientData.name[0].text}</h1>
        <p>Gender: {patientData.Gender}</p>
        <p>Birth Date: {patientData.birthDate}</p>
      </div>
    );
  }
}

export default PatientData;
