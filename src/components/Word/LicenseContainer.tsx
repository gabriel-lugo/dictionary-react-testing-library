interface LicenseContainerProps {
  name: string;
  url: string;
}

function LicenseContainer({ name, url }: LicenseContainerProps) {
  return (
    <div className="license-container">
      <h3>License</h3>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>URL:</strong> {url}
      </p>
    </div>
  );
}

export default LicenseContainer;
