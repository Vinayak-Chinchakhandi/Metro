import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function QRScanner({ onScan }) {

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText);
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };

  }, [onScan]);

  return <div id="reader" className="w-full"></div>;
}

export default QRScanner;