import React, { useState } from 'react';
import { CountryFlag } from 'country-flags-lib';
import { decodeJWT, isValidJWT, isTokenExpired, getTokenExpiration } from 'jwt-token-decoder';
import { generateUUID, generateUUIDs, isValidUUID, generatePrefixedUUID } from 'uuid-generator-lib';
import './App.css';

function App() {
  const [jwtToken, setJwtToken] = useState('');
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const [uuidCount, setUuidCount] = useState(1);
  const [generatedUuids, setGeneratedUuids] = useState<string[]>([]);
  const [singleUuid, setSingleUuid] = useState('');
  const [prefix, setPrefix] = useState('user');

  // JWT Token Testing
  const handleDecodeJWT = () => {
    const result = decodeJWT(jwtToken);
    setDecodedToken(result);
  };

  // UUID Generation Testing
  const handleGenerateSingleUUID = () => {
    setSingleUuid(generateUUID());
  };

  const handleGenerateMultipleUUIDs = () => {
    setGeneratedUuids(generateUUIDs(uuidCount));
  };

  const handleGeneratePrefixedUUID = () => {
    setSingleUuid(generatePrefixedUUID(prefix));
  };

  const handleValidateUUID = (uuid: string) => {
    return isValidUUID(uuid);
  };

  return (
    <div className="App">
      <h1>Package Testing Application</h1>

      {/* Country Flags Library Test */}
      <section className="package-section">
        <h2>Country Flags Library</h2>
        <div className="flag-examples">
          <div className="flag-item">
            <h3>United States</h3>
            <CountryFlag countryCode="US" size="large" />
          </div>
          <div className="flag-item">
            <h3>Germany</h3>
            <CountryFlag countryCode="DE" size="large" />
          </div>
          <div className="flag-item">
            <h3>Japan</h3>
            <CountryFlag countryCode="JP" size="large" />
          </div>
        </div>
      </section>

      {/* JWT Token Decoder Test */}
      <section className="package-section">
        <h2>JWT Token Decoder</h2>
        <div className="jwt-section">
          <textarea
            placeholder="Paste your JWT token here..."
            value={jwtToken}
            onChange={(e) => setJwtToken(e.target.value)}
            rows={4}
            cols={50}
          />
          <button onClick={handleDecodeJWT}>Decode JWT</button>

          {decodedToken && (
            <div className="decoded-result">
              {decodedToken.error ? (
                <p className="error">Error: {decodedToken.error}</p>
              ) : (
                <div>
                  <h3>Decoded Token:</h3>
                  <div className="token-parts">
                    <div>
                      <h4>Header:</h4>
                      <pre>{JSON.stringify(decodedToken.header, null, 2)}</pre>
                    </div>
                    <div>
                      <h4>Payload:</h4>
                      <pre>{JSON.stringify(decodedToken.payload, null, 2)}</pre>
                    </div>
                  </div>
                  <div className="token-info">
                    <p>Valid JWT: {isValidJWT(jwtToken) ? 'Yes' : 'No'}</p>
                    <p>Expired: {isTokenExpired(jwtToken) ? 'Yes' : 'No'}</p>
                    <p>Expiration: {getTokenExpiration(jwtToken) ? new Date(getTokenExpiration(jwtToken)! * 1000).toLocaleString() : 'N/A'}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* UUID Generator Test */}
      <section className="package-section">
        <h2>UUID Generator</h2>
        <div className="uuid-section">
          <div className="uuid-controls">
            <button onClick={handleGenerateSingleUUID}>Generate Single UUID</button>
            <div className="uuid-input-group">
              <label>Count:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={uuidCount}
                onChange={(e) => setUuidCount(parseInt(e.target.value))}
              />
              <button onClick={handleGenerateMultipleUUIDs}>Generate Multiple</button>
            </div>
            <div className="uuid-input-group">
              <label>Prefix:</label>
              <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              />
              <button onClick={handleGeneratePrefixedUUID}>Generate Prefixed</button>
            </div>
          </div>

          {singleUuid && (
            <div className="uuid-result">
              <h3>Generated UUID:</h3>
              <p className={handleValidateUUID(singleUuid) ? 'valid-uuid' : 'invalid-uuid'}>
                {singleUuid}
              </p>
              <p>Valid: {handleValidateUUID(singleUuid) ? 'Yes' : 'No'}</p>
            </div>
          )}

          {generatedUuids.length > 0 && (
            <div className="uuid-result">
              <h3>Generated UUIDs ({generatedUuids.length}):</h3>
              <ul>
                {generatedUuids.map((uuid, index) => (
                  <li key={index} className={handleValidateUUID(uuid) ? 'valid-uuid' : 'invalid-uuid'}>
                    {uuid}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;