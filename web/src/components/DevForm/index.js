import React, { useState, useEffect} from 'react';
import axios from 'axios'
import { FaGithub, FaCode, FaThumbtack, FaCloudDownloadAlt } from 'react-icons/fa';
import './styles.css';

function DevForm({ onSubmit, editFields }) {
  const [edit, setEdit] = useState(false);
  const [githubUsername, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [ip, setIp] = useState('');

  useEffect(() => {  

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (success) => {
        axios.get("https://api.ipify.org/?format=json")
        .then(response => {
          setIp(response.data.ip);
        });

        axios.get(`http://www.geoplugin.net/json.gp?ip=${ip}`)
        .then(response => {
          setLatitude(response.data.geoplugin_latitude);
          setLongitude(response.data.geoplugin_longitude);
        });
        console.log(success);
        
      },
      (err) => { 
        axios.get("https://api.ipify.org/?format=json")
        .then(response => {
          setIp(response.data.ip);
        });

        axios.get(`https://geoplugin.net/json.gp?ip=${ip}`)
        .then(response => {
          setLatitude(response.data.geoplugin_latitude);
          setLongitude(response.data.geoplugin_longitude);
        });
       
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  useEffect(() => {
    setEdit(true);
    const { techs, github_username } = editFields;

    setTechs(editFields ? techs : '');
    setGithubUsername(editFields ? github_username : '');
    //setLatitude(editFields ? latitude : '' );
    //setLongitude(editFields ? longitude : '' );
  }, [editFields]);

 async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username: githubUsername,
      techs,
      latitude,
      longitude,
    });

    setGithubUsername('');
    setTechs('');
  }

  async function handleEdit(e) {
    const { _id } = editFields;

    e.preventDefault();

    await onSubmit({
      github_username: githubUsername,
      techs,
      latitude,
      longitude,
      _id,
    });

    setGithubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={edit ? handleEdit : handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">
          {/* Usuário do Github */}
          <FaGithub color="#6ff3d6" size={14} />
          </label>
        <input 
          name="github_username"
          id="github_username"
          placeholder="Seu usuário no Github"
          value={githubUsername || ''}
          onChange={e => setGithubUsername(e.target.value)}
          required
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">
          <FaCode color="#6ff3d6" size={14} />
        </label>
        <input
          name="techs"
          id="techs"
          placeholder="Tecnologias que você domina"          
          value={techs || ''}
          onChange={e => setTechs(e.target.value)}
          required
        />
      </div>

      {/* <div className="input-group"> */}
        <div className="input-block">
          <label htmlFor="latitude">
            <FaThumbtack color="#6ff3d6" size={14} />
          </label>
          <input 
            // type="number" 
            name="latitude" 
            id="latitude"
            placeholder="Latitude"              
            value={latitude || ''}
            onChange={e => setLatitude(e.target.value)}
            required
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">
            <FaThumbtack color="#6ff3d6" size={14} />
          </label>
          <input
            // type="number"
            name="longitude"
            id="longitude"
            placeholder="Longitude"            
            value={longitude || ''}
            onChange={e => setLongitude(e.target.value)}
            required
          />
        </div>
      {/* </div> */}

      <button type="submit">Salvar</button> 
      <a href='https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40brites_h/BuscaDevs-d86b0a76e64c46849d3a7f5ce260fd4e-signed.apk' download className="download">
        <label htmlFor="download-icon">
            <FaCloudDownloadAlt color="#6ff3d6" size={14} />
        </label>
        Download app
      </a>
      
    </form>
  );
}

export default DevForm;