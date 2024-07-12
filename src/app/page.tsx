"use client";
import { Amplify } from "aws-amplify";
import output from "../../amplify_outputs.json";
import { ChangeEvent, useState } from "react";
import { uploadData } from "aws-amplify/storage";

Amplify.configure(output, { ssr: true });

export default function Home() {
  const [fileToUpload, setFileToUpload] = useState<File>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFileToUpload(file);
    }
  };

  const handleFileUpload = () => {
    if (fileToUpload) {
      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(fileToUpload);

      fileReader.onload = async (event) => {
        console.log("Complete File Read Successfully", event.target?.result);
        if (event.target) {
          try {
            const output = uploadData({
              data: event.target.result as any,
              path: `picture-submissions/${fileToUpload.name}`,
            });

            console.log("output result", output.result);
            const outputWithPath = await output.result;
          } catch (error) {
            console.error(error);
            setErrorMessage((error as Error).message)
          }
        }
      };
    }
  };

  return (
    <main>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleFileUpload}>
        Upload
      </button>
      {errorMessage}
    </main>
  );
}
